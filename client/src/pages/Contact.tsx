/**
 * Harvest Editorial contact page: concise contact routes, direct ordering,
 * a structured FAQ section, and a low-friction enquiry path.
 */
import { ArrowUpRight, ChevronDown, Instagram, MessageCircle, Phone } from "lucide-react";
import { assetPath } from "@/lib/sitePaths";
import { FormEvent, useState } from "react";
import SiteLayout, { BusinessStatusBadge, whatsappHref } from "@/components/SiteLayout";
import SEOHead from "@/components/SEOHead";

const faqs = [
  {
    q: "What delivery areas do you cover for retail and bulk orders?",
    a: "We offer local doorstep dispatch within direct operating hubs and coordinate interstate bulk transport via partner logistics and motor-park networks for regional buyers. Specific delivery coverage and dispatch costs are confirmed directly on WhatsApp based on your destination address.",
  },
  {
    q: "What are the minimum order quantities (MOQ) for wholesale supply?",
    a: "MOQ varies by product and supply tier. Single household units are available under Retail (1–4 units), while carton and volume reselling start at Reseller level (5–19 units). Wholesale orders begin at 20 units, and custom distributor supply covers 50+ units. Contact our wholesale desk on WhatsApp for exact batch MOQs.",
  },
  {
    q: "What payment methods are accepted for purchases?",
    a: "We accept verified bank transfers and direct deposit arrangements agreed upon during order confirmation. Payment details and account verification are handled directly with our sales team through our secure WhatsApp channels before dispatch.",
  },
  {
    q: "How can I check current stock availability and pricing?",
    a: "Because our stock moves quickly between retail dispatch and wholesale restocking, the fastest way to check live availability, current pack prices, and delivery terms is to message us directly on WhatsApp at 0803 736 5227.",
  },
  {
    q: "Do you supply both individual households and business resellers?",
    a: "Yes. Whether you need a single 5L container of pure red palm oil for your family kitchen, wholesale cartons for your retail shop, or bulk supplies for food service and distribution, we support both retail shoppers and commercial buyers.",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hello CHI-ZARAM, I would like to make an enquiry.\n\n• Name: ${form.get("name")}\n• Product or service: ${form.get("product")}\n• Message: ${form.get("message")}\n\nPlease share current availability, pricing, and next steps.`;
    setSent(true);
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  };

  return (
    <SiteLayout activePath="/contact">
      <SEOHead
        title="Contact Us & Frequently Asked Questions"
        description="Get in touch with CHI-ZARAM Palm Oil & More Enterprises. Find answers about delivery coverage, minimum order quantities (MOQ), payment methods, and start a WhatsApp enquiry."
        path="/contact"
      />
      <main>
        <section className="inner-hero inner-hero--contact">
          <div className="container inner-hero__grid">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Contact CHI-ZARAM</p>
              <h1>Good things are<br /><em>worth sharing.</em></h1>
              <p className="inner-hero__intro">Ask about products, pack sizes, pricing, delivery coverage, wholesale supply, or the next item on your list.</p>
            </div>
            <div className="inner-hero__visual">
              <img src={assetPath("/manus-storage/brand-story-palm-oil-3l_e75b6dec.jpeg")} alt="CHI-ZARAM 3L red palm oil packs with palm fruits in a warm editorial setting" />
              <span className="inner-hero__stamp">Start a<br /><strong>conversation.</strong></span>
            </div>
          </div>
        </section>

        <section className="contact-page section-pad">
          <div className="container contact-page__grid">
            <div className="contact-page__copy">
              <p className="eyebrow">Reach the team</p>
              <h2>Need more<br /><em>to go around?</em></h2>
              <p className="body-copy">WhatsApp is the quickest way to confirm current products, quantities, rates, and delivery options. You can also follow the brand for product updates and everyday inspiration.</p>
              <div className="contact-routes">
                <a href={whatsappHref()} target="_blank" rel="noreferrer">
                  <MessageCircle size={19} />
                  <span><small>WhatsApp ordering</small><strong>0803 736 5227</strong></span>
                  <ArrowUpRight size={16} />
                </a>
                <a href="tel:08037365227" aria-label="Call the CHI-ZARAM sales line at 0803 736 5227">
                  <Phone size={19} />
                  <span><small>Phone</small><strong>Call the sales line</strong></span>
                  <ArrowUpRight size={16} />
                </a>
                <a href="https://www.tiktok.com/@ogonwibe" target="_blank" rel="noreferrer">
                  <Instagram size={19} />
                  <span><small>TikTok</small><strong>@ogonwibe</strong></span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <p className="contact-location"><small>Shop address</small><strong>Shop 5 Faronbi Plaza</strong><span>Opposite Isolo General Hospital, Lagos</span><span>Mon–Fri, 9 AM–5 PM</span><BusinessStatusBadge /></p>
            </div>

            <form className="contact-form" onSubmit={submit}>
              <span className="enquiry-card__label">Quick enquiry</span>
              <h3>Start with a note.</h3>
              <p>Tell us what you’re looking for and we’ll continue the conversation on WhatsApp.</p>
              <label>Your name<input name="name" placeholder="Your name" required /></label>
              <label>What can we help with?
                <select name="product" defaultValue="Product availability">
                  <option>Product availability</option>
                  <option>Pack sizes and pricing</option>
                  <option>Wholesale / bulk supply</option>
                  <option>Delivery coverage</option>
                  <option>Other enquiry</option>
                </select>
              </label>
              <label>Your message<textarea name="message" placeholder="Tell us what you need" rows={4} required /></label>
              <button className="button button--crimson button--full" type="submit">
                {sent ? "Opening WhatsApp…" : "Send enquiry"} <ArrowUpRight size={16} />
              </button>
              <a className="button button--quiet button--full contact-form__call" href="tel:08037365227" aria-label="Call CHI-ZARAM sales at 0803 736 5227">
                <Phone size={16} /> Call Now · 0803 736 5227
              </a>
            </form>
          </div>
        </section>

        <section className="faq-section section-pad">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Frequently Asked Questions</p>
              <h2>Everything you need<br /><em>to know before ordering.</em></h2>
              <p>Clear answers regarding delivery areas, minimum order quantities, payments, and stock availability.</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.q}>
                    <button className="faq-question" type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className={isOpen ? "rotate-180" : ""} />
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
