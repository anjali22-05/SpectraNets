import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X, Headphones } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const suggestions = [
  'Are you looking for commercial connectivity?',
  'Are you looking for home internet?',
  'Are you looking for enterprise connectivity?',
  'What services do you offer?',
  'How can I get a business internet quote?',
  'Do you provide support for multiple branches?',
];

const responses = [
  {
    match: /service|offer|solution|provide/i,
    reply: 'Spectranets provides business connectivity, internet leased lines, business broadband, SD-WAN, cloud connectivity, managed security, SIP and messaging solutions. Which service would you like to know more about?',
  },
  {
    match: /quote|price|cost|pricing|plan|bandwidth/i,
    reply: 'We can help size a solution around your locations and bandwidth needs. Share your business name, city and approximate bandwidth, or use the Contact Us form and our enterprise team will follow up.',
  },
  {
    match: /branch|multi.?site|multiple location|locations/i,
    reply: 'Yes. We support multi-branch connectivity with managed internet, SD-WAN, secure site-to-site links and centralized support. Tell us how many locations you need to connect.',
  },
  {
    match: /home|residential/i,
    reply: 'Spectranets focuses on commercial and enterprise connectivity rather than home internet. If you are looking for a business or office connection, tell us about your location and requirements.',
  },
  {
    match: /commercial|enterprise|business/i,
    reply: 'Yes, Spectranets provides commercial and enterprise connectivity, including dedicated leased lines, managed internet, SD-WAN, cloud connectivity and security. Which service or location would you like help with?',
  },
  {
    match: /support|help|contact|speak|call|phone/i,
    reply: 'Our enterprise team can help. Call 9891406594, email info@spectranets.in, message us on WhatsApp, or use the Contact Us form on this page.',
  },
  {
    match: /hello|hi|hey|good morning|good afternoon/i,
    reply: 'Hello! I can help you explore Spectranets business connectivity services. What would you like to know?',
  },
];

const makeMessage = (role, text) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  text,
  time: new Date(),
});

export default function BusinessChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => [
    makeMessage('bot', 'Hi there! 👋 Welcome to Spectranets. I can help you find the right connectivity solution for your business.'),
  ]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = (value = draft) => {
    const text = value.trim();
    if (!text || isTyping) return;

    setMessages((current) => [...current, makeMessage('user', text)]);
    setDraft('');
    setIsTyping(true);

    // Keep this local response layer easy to replace with an AI API later.
    window.setTimeout(() => {
      const match = responses.find((item) => item.match.test(text));
      const reply = match?.reply || 'Thanks for reaching out! I can help with business internet, connectivity, cloud and communication services. For a tailored answer, share a few details or contact our team at 9891406594.';
      setMessages((current) => [...current, makeMessage('bot', reply)]);
      setIsTyping(false);
    }, 750);
  };

  return (
    <div className="fixed bottom-24 right-3 z-[60] flex flex-col items-end gap-3 sm:bottom-28 sm:right-6">
      <section
        aria-label="Spectranets business chat"
        aria-hidden={!isOpen}
        className={`business-chat-window ${isOpen ? 'business-chat-window-open' : ''} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <header className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#071B49] to-[#0756D9] px-4 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Spectranets Assistant</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Here to help your business
              </p>
            </div>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close chat">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div ref={scrollRef} className="business-chat-messages flex-1 space-y-4 overflow-y-auto bg-[#F5F8FF] px-4 py-4" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <p className={`whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${message.role === 'user' ? 'rounded-br-md bg-[#0756D9] text-white' : 'rounded-bl-md border border-slate-100 bg-white text-slate-700'}`}>
                  {message.text}
                </p>
                <time className="mt-1 px-1 text-[10px] text-slate-400" dateTime={message.time.toISOString()}>
                  {message.time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </time>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start" role="status" aria-label="Assistant is typing">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                <span className="chat-typing-dot" /><span className="chat-typing-dot chat-typing-dot-delay-1" /><span className="chat-typing-dot chat-typing-dot-delay-2" />
              </div>
            </div>
          )}
          {messages.length === 1 && !isTyping && (
            <div className="space-y-2 pt-1">
              <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick questions</p>
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="block w-full rounded-xl border border-blue-100 bg-white px-3 py-2 text-left text-xs font-medium text-[#0756D9] transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                  {suggestion}
                </button>
              ))}
              <p className="px-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Our services</p>
              {servicesData.map((service) => (
                <button key={service.id} type="button" onClick={() => sendMessage(`Tell me about ${service.title}`)} className="block w-full rounded-xl border border-blue-100 bg-white px-3 py-2 text-left text-xs font-medium text-[#0756D9] transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                  {service.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
          onSubmit={(event) => { event.preventDefault(); sendMessage(); }}
        >
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask us anything..."
            aria-label="Type your message"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2684F7] focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <button type="submit" disabled={!draft.trim() || isTyping} aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0756D9] text-white shadow-md shadow-blue-900/15 transition hover:bg-[#0648b8] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </section>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close Spectranets chat' : 'Open Spectranets chat'}
        className={`group relative flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#0756D9] to-[#2684F7] px-3 text-white shadow-xl shadow-blue-900/25 ring-2 ring-white transition duration-200 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${isOpen ? 'w-11' : 'w-auto'}`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!isOpen && <span className="whitespace-nowrap text-xs font-semibold">Help</span>}
        {!isOpen && <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />}
      </button>
    </div>
  );
}
