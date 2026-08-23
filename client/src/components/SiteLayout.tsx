/**
 * Harvest Editorial shared shell: warm cream space, Palm Crimson accents,
 * deep leaf green, editorial serif headlines, WhatsApp-first conversion,
 * a concise footer enquiry form, social links, and a shared Back to Top affordance across every page.
 */
import { ArrowUpRight, ChevronUp, Menu, MessageCircle, Music2, Phone, Share2, X } from "lucide-react";
import { assetPath } from "@/lib/sitePaths";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import type { FormEvent, ReactNode } from "react";

const whatsappNumber = "2348037365227";
const defaultMessage = "Hello CHI-ZARAM, I would like to explore your products and current availability.";

export function whatsappHref(message = defaultMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function isBusinessOpen(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Lagos",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday);
  const afterOpening = hour > 9 || (hour === 9 && minute >= 0);
  const beforeClosing = hour < 17;
  return isWeekday && afterOpening && beforeClosing;
}

export function BusinessStatusBadge() {
  const [open, setOpen] = useState(() => isBusinessOpen());

  useEffect(() => {
    const refresh = () => setOpen(isBusinessOpen());
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return <span className={`business-status-badge ${open ? "is-open" : "is-closed"}`} aria-live="polite"><i aria-hidden="true" /> {open ? "Open Now" : "Closed"}</span>;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 480);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button className={`back-to-top ${visible ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
      <ChevronUp size={16} />
      <span>Top</span>
    </button>
  );
}

export function FloatingWhatsAppChat() {
  return (
    <a
      className="floating-whatsapp-widget"
      href={whatsappHref("Hello CHI-ZARAM, I have a question about products, pack sizes, or pricing. Please assist.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with CHI-ZARAM on WhatsApp"
    >
      <div className="floating-whatsapp-widget__icon">
        <MessageCircle size={22} />
      </div>
      <div className="floating-whatsapp-widget__tooltip">
        <strong>Chat with sales</strong>
        <span>Ask about pricing &amp; orders</span>
      </div>
    </a>
  );
}

export default function SiteLayout({ children, activePath }: { children: ReactNode; activePath?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [footerForm, setFooterForm] = useState({ name: "", email: "", message: "" });

  const submitFooterEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hello CHI-ZARAM, I would like to make an enquiry.\n\nName: ${footerForm.name}\nEmail: ${footerForm.email || "Not provided"}\nMessage: ${footerForm.message}`;
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    setFooterForm({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activePath]);

  return (
    <div className="site-shell page-shell">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>Retail <i /> Bulk Supply <i /> Consumer Products</span>
          <a href={whatsappHref()} target="_blank" rel="noreferrer">WhatsApp ordering <ArrowUpRight size={13} strokeWidth={1.8} /></a>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link className="brand-lockup" href="/" aria-label="CHI-ZARAM home">
            <img src={assetPath("/manus-storage/chizaram-logo-cz_cdd4320b.webp")} alt="CHI-ZARAM Palm Oil & More" className="brand-lockup__mark" />
            <span className="brand-lockup__type"><strong>CHI-ZARAM</strong><small>Palm Oil &amp; More</small></span>
          </Link>
          <nav className={`main-nav page-nav ${mobileOpen ? "main-nav--open" : ""}`} aria-label="Primary navigation">
            <Link onClick={() => setMobileOpen(false)} className={activePath === "/" ? "is-active" : ""} href="/">Home</Link>
            <Link onClick={() => setMobileOpen(false)} className={activePath === "/story" ? "is-active" : ""} href="/story">Our story</Link>
            <Link onClick={() => setMobileOpen(false)} className={activePath === "/catalogue" ? "is-active" : ""} href="/catalogue">What we carry</Link>
            <Link onClick={() => setMobileOpen(false)} className={activePath === "/packs-pricing" ? "is-active" : ""} href="/packs-pricing">Packs &amp; Pricing</Link>
            <Link onClick={() => setMobileOpen(false)} className={activePath === "/bulk-supply" ? "is-active" : ""} href="/bulk-supply">Bulk supply</Link>
            <Link onClick={() => setMobileOpen(false)} className={activePath === "/contact" ? "is-active" : ""} href="/contact">Contact</Link>
            <Link onClick={() => setMobileOpen(false)} className={activePath === "/gallery" ? "is-active" : ""} href="/gallery">Gallery</Link>
            <a className="mobile-nav-call" href="tel:08037365227" aria-label="Call CHI-ZARAM at 0803 736 5227"><Phone size={17} /><span>Call 0803 736 5227</span><ArrowUpRight size={14} /></a>
          </nav>
          <a className="header-cta" href={whatsappHref()} target="_blank" rel="noreferrer"><MessageCircle size={16} /><span>Order on WhatsApp</span></a>
          <button className="menu-toggle page-menu-toggle" type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>
      {children}
      <AccessibilityWidget />
      <BackToTop />
      <FloatingWhatsAppChat />
      <footer className="site-footer page-footer">
        <div className="container site-footer__top">
          <div className="site-footer__identity">
            <Link className="brand-lockup brand-lockup--footer" href="/">
              <img src={assetPath("/manus-storage/chizaram-logo-cz_cdd4320b.webp")} alt="CHI-ZARAM Palm Oil & More" className="brand-lockup__mark" />
              <span className="brand-lockup__type"><strong>CHI-ZARAM</strong><small>Palm Oil &amp; More</small></span>
            </Link>
            <div className="footer-tagline">Good things are<br /><em>worth sharing.</em></div>
          </div>
          <div className="footer-contact">
            <span>Start a conversation</span>
            <a href="tel:+2348037365227"><Phone size={15} /> 0803 736 5227</a><span className="footer-contact__location"><strong>Shop 5 Faronbi Plaza</strong><span>Opposite Isolo General Hospital, Lagos</span><span className="footer-contact__hours">Mon–Fri, 9 AM–5 PM</span> <BusinessStatusBadge /></span>
            <div className="footer-socials" aria-label="Social media links">
              <a href="https://www.tiktok.com/@ogonwibe" target="_blank" rel="noreferrer" aria-label="CHI-ZARAM on TikTok"><Music2 size={15} /><span>TikTok</span></a>
              <a href="https://web.facebook.com/ogoonwokoye/photos" target="_blank" rel="noreferrer" aria-label="CHI-ZARAM on Facebook"><Share2 size={15} /><span>Facebook</span></a>
              <a href={whatsappHref()} target="_blank" rel="noreferrer" aria-label="Chat with CHI-ZARAM on WhatsApp"><MessageCircle size={15} /><span>WhatsApp</span></a>
            </div>
          </div>
          <div className="footer-enquiry">
            <span className="footer-enquiry__eyebrow">Quick enquiry</span>
            <form onSubmit={submitFooterEnquiry}>
              <div className="footer-enquiry__row">
                <label><span className="sr-only">Your name</span><input required value={footerForm.name} onChange={(event) => setFooterForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your name" autoComplete="name" /></label>
                <label><span className="sr-only">Email address</span><input type="email" value={footerForm.email} onChange={(event) => setFooterForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email (optional)" autoComplete="email" /></label>
              </div>
              <label><span className="sr-only">Your message</span><textarea required value={footerForm.message} onChange={(event) => setFooterForm((current) => ({ ...current, message: event.target.value }))} placeholder="How can we help?" rows={2} /></label>
              <button className="footer-enquiry__submit" type="submit">Send on WhatsApp <ArrowUpRight size={14} /></button>
            </form>
          </div>
        </div>
        <div className="container site-footer__bottom"><span>© 2026 CHI-ZARAM Palm Oil &amp; More Enterprises</span><span>Retail &amp; Bulk Supply</span><span>Built by <a href="https://ashflexwebdesign.com" target="_blank" rel="noreferrer">Ashflex Web Design</a></span><Link href="/contact">Talk to the team <ArrowUpRight size={14} /></Link></div>
      </footer>
    </div>
  );
}
