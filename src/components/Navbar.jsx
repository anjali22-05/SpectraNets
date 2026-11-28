import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck,
  ArrowUpRight,
  Mail,
} from 'lucide-react';
import { companyInfo } from '../data/contentData';

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section
      const sections = ['home', 'about', 'services', 'solutions', 'industries', 'infrastructure', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Solutions', href: '#solutions', id: 'solutions' },
    { name: 'Industries', href: '#industries', id: 'industries' },
    { name: 'Network Infrastructure', href: '#infrastructure', id: 'infrastructure' },
    { name: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    // Let the browser follow the anchor href so mobile taps consistently reach
    // the requested section, even while the menu is closing.
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Enterprise Information Bar - Desktop & Laptop */}
      <div className="hidden md:block bg-slate-50/90 text-[#17233D] text-[11px] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[#0756D9] font-bold tracking-[0.12em] uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Business connectivity, built for business
          </span>
          <div className="flex items-center gap-5 shrink-0">
            <a 
              href={companyInfo.callUrl} 
              className="flex items-center gap-1.5 text-slate-600 hover:text-[#0756D9] transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#0756D9]" />
              <span>{companyInfo.formattedPhone}</span>
            </a>
            <a 
              href={companyInfo.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden lg:flex items-center gap-1.5 text-green-700 hover:text-green-800 transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-600" />
              <span>WhatsApp</span>
            </a>
            <a
              href={companyInfo.emailUrl}
              className="hidden xl:flex items-center gap-1.5 text-slate-600 hover:text-[#0756D9] transition-colors font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-[#2684F7]" />
              <span>{companyInfo.contactEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(7,27,73,0.28)] border-b border-slate-200' 
          : 'bg-white border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between gap-5">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')} 
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="SPECTRANETS Home"
            >
              <div className="relative flex items-center py-1">
                <img 
                  src="/spectranets-logo.png" 
                  alt="SPECTRANETS Enterprise Logo" 
                  className="h-10 sm:h-11 w-auto max-w-[190px] sm:max-w-[220px] object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    // Fall back to the alternate logo asset if needed.
                    e.target.src = '/spectranets-logo-white.png';
                  }}
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-2.5 2xl:px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 relative ${
                      isActive 
                        ? 'text-[#0756D9] bg-blue-50/90' 
                        : 'text-slate-600 hover:text-[#0756D9] hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-[#2684F7] rounded-full"></span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right CTA Button */}
            <div className="hidden xl:flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-[#0756D9] to-[#2684F7] hover:from-[#0648b8] hover:to-[#0756D9] transition-all duration-300 shadow-md shadow-blue-900/15 hover:shadow-lg group cursor-pointer"
              >
                <span>Talk to Our Experts</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center xl:hidden gap-2">
              <a
                href={companyInfo.callUrl}
                className="p-2 rounded-lg bg-blue-50 text-[#071B49] sm:hidden"
                aria-label="Call Spectranets"
              >
                <Phone className="w-5 h-5 text-[#2684F7]" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-[#0756D9] focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav aria-label="Mobile navigation" className="xl:hidden fixed inset-x-0 top-[4.25rem] z-[60] max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain touch-pan-y bg-white border-t border-slate-100 px-4 pt-4 pb-6 space-y-2 shadow-[0_24px_40px_-24px_rgba(7,27,73,0.3)]">
            {/* Mobile Header with Logo */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
              <img 
                src="/spectranets-logo.png" 
                alt="SPECTRANETS" 
                className="h-9 w-auto max-w-[180px] object-contain"
                onError={(e) => {
                  e.target.src = '/spectranets-logo-white.png';
                }}
              />
              <span className="text-[10px] font-mono font-bold text-[#0756D9] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                B2B ENTERPRISE
              </span>
            </div>

            <div className="p-2.5 mb-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0756D9] shrink-0" />
              <span className="leading-snug">
                Dedicated Internet Leased Line • SIP Trunking • Managed Wi-Fi, Cloud & Security
              </span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative z-[61] block min-h-11 touch-manipulation px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'text-white bg-[#0756D9]'
                    : 'text-slate-700 hover:text-[#0756D9] hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center py-3 px-4 rounded-lg bg-gradient-to-r from-[#0756D9] to-[#2684F7] text-white font-bold text-sm shadow-md"
              >
                Talk to Our Experts
              </a>
              <div className="flex gap-2">
                <a
                  href={companyInfo.callUrl}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#2684F7]" />
                  Call: {companyInfo.contactPhone}
                </a>
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-600/20 border border-green-500/30 text-green-300 text-xs font-semibold hover:bg-green-600/30 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  WhatsApp
                </a>
              </div>
              <a href={companyInfo.emailUrl} className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-50 text-[#0756D9] text-xs font-semibold hover:bg-blue-100 transition-colors">
                <Mail className="w-4 h-4" />
                {companyInfo.contactEmail}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
