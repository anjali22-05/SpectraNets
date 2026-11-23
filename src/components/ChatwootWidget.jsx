import { useEffect } from 'react';

/** Loads the Chatwoot website widget when its public settings are configured. */
export default function ChatwootWidget() {
  const websiteToken = import.meta.env.VITE_CHATWOOT_WEBSITE_TOKEN?.trim();
  const baseUrl = import.meta.env.VITE_CHATWOOT_BASE_URL?.trim()?.replace(/\/$/, '');

  useEffect(() => {
    if (!websiteToken || !baseUrl) return undefined;

    // Avoid adding the widget more than once during React Strict Mode remounts.
    if (document.querySelector('script[data-chatwoot-widget]')) return undefined;

    window.chatwootSettings = {
      hideMessageBubble: false,
      // Keep the Chatwoot launcher on the left, clear of the site's call and
      // WhatsApp actions, which are anchored at the bottom right.
      position: 'left',
      locale: 'en',
      type: 'expanded_bubble',
      launcherTitle: 'Talk to Spectranets',
      welcomeTitle: 'Business connectivity support',
      welcomeTagline: 'Tell us what your business needs. Our team is here to help.',
    };

    const script = document.createElement('script');
    script.src = `${baseUrl}/packs/js/sdk.js`;
    script.async = true;
    script.defer = true;
    script.dataset.chatwootWidget = 'true';
    script.onload = () => {
      window.chatwootSDK?.run({
        websiteToken,
        baseUrl,
      });
    };

    const addPageContext = () => {
      window.$chatwoot?.setCustomAttributes({
        website: 'Spectranets',
        page_url: window.location.href,
        page_title: document.title,
      });
    };
    window.addEventListener('chatwoot:ready', addPageContext);
    document.body.appendChild(script);

    return () => {
      // Chatwoot is a page-lifetime widget. Keep its ready listener across
      // React Strict Mode's development remount.
    };
  }, [websiteToken, baseUrl]);

  return null;
}
