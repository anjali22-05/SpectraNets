# SPECTRANETS — Enterprise Internet & Business Connectivity Solutions

A modern, premium, and professional B2B website built for **SPECTRANETS**, an Internet Service Provider and Business Connectivity Solutions company.

---

## 🏢 Business Overview

This website is engineered strictly for the **B2B (Business-to-Business)** enterprise segment. 
- **Target Audience:** Corporate enterprises, IT companies, commercial office parks, banking & financial institutions, healthcare providers, educational campuses, manufacturing plants, and SMEs.
- **Zero Retail / B2C:** No residential connections, no consumer broadband, and no retail pricing tables or subscription plans.

---

## 🎨 Design Theme & Colors

- **Primary Blue:** `#0756D9`
- **Dark Navy:** `#071B49`
- **Secondary Blue:** `#2684F7`
- **Light Background:** `#F5F8FF`
- **Dark Text:** `#17233D`
- **Accent Cyan:** `#00D2FF`
- **Typography:** Plus Jakarta Sans

---

## 🚀 Key Sections

1. **Top Enterprise Hotline Bar:** Direct calling to `9891406594`, WhatsApp support link, and B2B exclusivity indicator.
2. **Sticky Navigation:** SPECTRANETS logo, smooth in-page navigation, and high-conversion "Talk to Our Experts" CTA.
3. **Hero Section:** "Powering Businesses with Next-Generation Connectivity" with interactive enterprise core router & optical ring simulation, 1:1 dedicated metrics, and dual CTAs.
4. **Why Choose Spectranets:** 4 premium feature cards:
   - Enterprise-Grade Connectivity
   - Reliable Network Infrastructure
   - Dedicated Business Support
   - Scalable Technology Solutions
5. **Our Business Services (11 B2B Services Grid):**
   - Managed Internet Leased Line
   - SIP Line
   - Security Services
   - Cloud Services
   - Internet Leased Line
   - Smart Internet
   - Business Broadband
   - IVR Solutions
   - Bulk WhatsApp Marketing
   - Bulk SMS Services
   - Voice Call Solutions
   - *Includes an interactive **Service Detail Modal** for deep technical specs and instant enquiry preloading.*
6. **Enterprise Solutions:** "Connectivity Solutions That Drive Business Growth" showcasing Dedicated Bandwidth, High-Speed Connectivity, Secure Networking, Business Continuity, Scalable Infrastructure, and Enterprise Communication.
7. **Industries We Serve:** Sector-specific solutions for IT & Technology, Corporate Offices, Banking & Finance, Healthcare, Education, Manufacturing, Hospitality, and Commercial Enterprises.
8. **Network Infrastructure:** Carrier-grade showcase featuring Fiber Optic Network, Metro Ethernet, Hardened Security, High Availability Self-Healing Rings, and 24/7/365 NOC Monitoring.
9. **About Us:** "Building Stronger Connections for Modern Businesses" highlighting dedicated enterprise networking values.
10. **Business Enquiry & Lead Generation:** Professional multi-field form with service dropdown, input validation, success modal, and one-click WhatsApp forwarding to `9891406594`.
11. **Corporate Dark Navy Footer:** Logo, quick links, full 11 services index, verified phone hotline, and copyright.
12. **Floating Action Hub:** Quick call, WhatsApp, and scroll-to-top floating buttons.

---

## 🛠️ Technology Stack

- **Framework:** React.js 18
- **Bundler:** Vite 5 / 6
- **Styling:** Tailwind CSS + Custom Corporate Glassmorphism & Mesh Gradients
- **Icons:** SVG icon system (Lucide React compatible)
- **Deployment:** Production static assets built in `/dist`

---

## 📦 How to Run

### Chatwoot live chat

Create a **Website** inbox in Chatwoot and copy its Website Token. For Chatwoot Cloud, the base URL is `https://app.chatwoot.com`; for a self-hosted instance, use your Chatwoot domain. Set these variables in a local `.env` file (see `.env.example`) and in your hosting provider's build environment:

```env
VITE_CHATWOOT_BASE_URL=https://app.chatwoot.com
VITE_CHATWOOT_WEBSITE_TOKEN=your_website_inbox_token
```

Restart the Vite dev server after changing `.env`. Vite embeds `VITE_` values into the client bundle, so use only the public Website Token here, never an API access token. When configured, the Chatwoot support bubble appears on the site. The existing WhatsApp action remains available separately.

The launcher is branded **Talk to Spectranets**, uses a business connectivity welcome message, and opens on the left to keep clear of the call and WhatsApp buttons. The widget also sends the current page URL and title as contact custom attributes so the support team can see where a visitor started the conversation. To finish matching the site, open the Website inbox settings in Chatwoot and set the widget color to `#0756D9`, the header title to **Spectranets Business Support**, and the welcome message / availability text for your team's actual support hours. Chatwoot's widget appearance controls are managed in the inbox and should be configured there.

### Development Server:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```
