/**
 * Harvest Editorial catalogue page: practical product storytelling, distinct
 * category moments, quality assurance notes, and SEO metadata.
 */
import { ArrowUpRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { assetPath } from "@/lib/sitePaths";
import { Link } from "wouter";
import SiteLayout, { whatsappHref } from "@/components/SiteLayout";
import SEOHead from "@/components/SEOHead";

const featuredPalmOil = {
  title: "CHI-ZARAM Red Palm Oil — 3L Family Pack",
  label: "Featured pack · CHI-ZARAM FOODS",
  copy: "A generous family-size pack of pure, richly coloured palm oil for soups, stews, traditional dishes, and small food businesses. The 3L format balances everyday value with an easy-to-handle size.",
  image: assetPath("/manus-storage/brand-story-palm-oil-3l_e75b6dec.jpeg"),
  details: ["3L family-size bottle", "Pure, fresh, and naturally rich in flavour", "Suitable for household kitchens and small food businesses"],
  pricing: [
    { tier: "1 Liter", volume: "Retail bottle", rate: "₦2,500" },
    { tier: "3 Liters", volume: "Family pack", rate: "₦8,500" },
    { tier: "5 Liters", volume: "Value jerrycan", rate: "₦12,500" },
    { tier: "25 Liters", volume: "Wholesale / bulk", rate: "₦60,000" },
  ],
};

const products = [
  { number: "01", title: "Red Palm Oil", label: "CHI-ZARAM FOODS", copy: "Our flagship red palm oil for soups, stews, traditional dishes, family kitchens, and bulk supply.", image: assetPath("/manus-storage/chi-zaram-gen-palmoil_d61695e1.jpg"), details: ["1L, 3L, 5L, and bulk formats", "Pure, fresh, and natural product line", "Retail, reseller, and wholesale enquiries"], accent: "crimson" },
  { number: "02", title: "Vegetable Oil & More", label: "CHI-ZARAM FOODS", copy: "Vegetable oil, groundnut oil, and pantry staples for frying, baking, everyday cooking, and food businesses.", image: assetPath("/manus-storage/chi-zaram-gen-vegetable_e13416ab.jpg"), details: ["Retail and carton quantities", "Everyday cooking and food-service use", "Availability confirmed on enquiry"], accent: "gold" },
  { number: "03", title: "Delta State Yellow Garri", label: "CHI-ZARAM FOODS", copy: "Golden yellow garri sourced from Delta State for family meals, snacks, soaking, garri eba, and everyday pantry use.", image: assetPath("/manus-storage/chi-zaram-yellow-garri-delta-state_d15b1171.jpg"), details: ["Retail pouch, family pack, and bulk formats", "Sourced from Delta State", "Current price and availability confirmed on enquiry"], accent: "yellow-garri" },
  { number: "04", title: "Fabrics Collection", label: "CHI-ZARAM FABRICS", copy: "Premium denim jeans and fabrics with durable stitching, timeless colour, and everyday comfort.", image: assetPath("/manus-storage/chi-zaram-gen-fabrics_b7f05a2b.jpg"), details: ["Blue and black denim styles", "Tailored and ready-to-wear direction", "Individual and reseller enquiries"], accent: "green" },
  { number: "05", title: "Cleaning Essentials & Fragrance", label: "CHI-ZARAM HOME & FRAGRANCE", copy: "Practical home care products and concentrated oil perfumes for daily living, gifting, and resale.", image: assetPath("/manus-storage/chi-zaram-gen-home_7c839812.jpg"), details: ["Home care and cleaning essentials", "Concentrated oil perfumes", "Personal, gifting, and wholesale use"], accent: "cream" },
];

export default function Catalogue() {
  return (
    <SiteLayout activePath="/catalogue">
      <SEOHead
        title="Product Catalogue: Red Palm Oil, Yellow Garri, Vegetable Oil, Fabrics & Home"
        description="Explore the CHI-ZARAM product catalogue featuring pure red palm oil, Delta State yellow garri, vegetable oil, premium denim jeans, cleaning essentials, and oil perfumes. Retail and bulk supply available."
        path="/catalogue"
      />
      <main>
        <section className="inner-hero inner-hero--catalogue">
          <div className="container inner-hero__grid">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> What we carry</p>
              <h1>A little more of<br /><em>the good stuff.</em></h1>
              <p className="inner-hero__intro">From the kitchen to the home, from personal style to thoughtful gifting — explore the CHI-ZARAM range for real, everyday life.</p>
            </div>
            <div className="inner-hero__visual">
              <img src={assetPath("/manus-storage/chi-zaram-gen-home_7c839812.jpg")} alt="CHI-ZARAM home and fragrance product styling" />
              <span className="inner-hero__stamp">Retail<br /><strong>&amp; bulk.</strong></span>
            </div>
          </div>
        </section>

        <section className="catalogue-page section-pad">
          <div className="container">
            <div className="catalogue-intro">
              <p className="eyebrow">The catalogue</p>
              <p>Our product family is intentionally broad, but the buying experience stays simple. Select a category, review the available formats, and message the team for current stock, pricing, and delivery options.</p>
            </div>
            <article className="catalogue-feature catalogue-feature--palm">
              <div className="catalogue-feature__image"><img src={featuredPalmOil.image} alt="CHI-ZARAM 3L palm oil bottles with palm fruits and product backdrop" loading="lazy" /></div>
              <div className="catalogue-feature__body">
                <div className="catalogue-feature__meta"><span>01</span><small>{featuredPalmOil.label}</small></div>
                <h2>{featuredPalmOil.title}</h2>
                <p>{featuredPalmOil.copy}</p>
                <ul className="catalogue-feature__details">{featuredPalmOil.details.map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}</ul>
                <div className="catalogue-feature__pricing" aria-label="Palm oil exact pricing guide">
                  <div className="catalogue-feature__pricing-head"><span>Exact pack prices</span><small>Wholesale &amp; Retail Available</small></div>
                  <div className="catalogue-feature__pricing-grid">{featuredPalmOil.pricing.map((tier) => <div key={tier.tier}><strong>{tier.tier}</strong><span>{tier.volume}</span><em>{tier.rate}</em></div>)}</div>
                </div>
                <div className="catalogue-product__actions"><a className="button button--crimson" href={whatsappHref("Hello CHI-ZARAM, I would like to order red palm oil (1L ₦2,500, 3L ₦8,500, 5L ₦12,500, 25L ₦60,000). Please share availability and delivery options.")} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Enquire about Palm Oil Pricing</a><Link className="text-link" href="/packs-pricing">See all pack sizes <ArrowUpRight size={16} /></Link></div>
              </div>
            </article>
            <div className="catalogue-list">
              {products.map((product) => (
                <article className={`catalogue-product catalogue-product--${product.accent}`} key={product.title}>
                  <div className="catalogue-product__image">
                    <img src={product.image} alt={product.title} loading="lazy" />
                  </div>
                  <div className="catalogue-product__body">
                    <div className="catalogue-product__meta">
                      <span>{product.number}</span>
                      <small>{product.label}</small>
                    </div>
                    <h2>{product.title}</h2>
                    <p>{product.copy}</p>
                    <ul>
                      {product.details.map((detail) => (
                        <li key={detail}><Check size={14} />{detail}</li>
                      ))}
                    </ul>
                    <div className="catalogue-product__actions">
                      <a className="button button--crimson" href={whatsappHref(`Hello CHI-ZARAM, I would like to enquire about ${product.title}. Please share the current products, quantities, prices, and delivery options.`)} target="_blank" rel="noreferrer">
                        <MessageCircle size={16} /> Enquire about this range
                      </a>
                      <Link className="text-link" href="/packs-pricing">See packs &amp; pricing <ArrowUpRight size={16} /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="catalogue-trust section-pad">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Quality Guarantee</p>
              <h2>The CHI-ZARAM assurance.<br /><em>Pure products, transparent supply.</em></h2>
              <p>We believe trust is earned through consistent presentation, verified pack sizes, and direct conversations with our retail and wholesale buyers.</p>
            </div>
            <div className="catalogue-trust__grid">
              <div className="catalogue-trust__card">
                <ShieldCheck size={26} />
                <h3>Hygienically Processed</h3>
                <p>All red palm oil and food products are sourced and packaged under clean, quality-controlled conditions with no artificial additives.</p>
              </div>
              <div className="catalogue-trust__card">
                <Check size={26} />
                <h3>Consistent Pack Sizes</h3>
                <p>Whether you choose our 1L retail bottle, 3L family pack, 5L jerrycan, or bulk wholesale carton, quantities and volumes are strictly maintained.</p>
              </div>
              <div className="catalogue-trust__card">
                <MessageCircle size={26} />
                <h3>Direct WhatsApp Support</h3>
                <p>We discuss every retail order and bulk quotation directly with you to ensure availability, pricing, and delivery terms are clear before dispatch.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="catalogue-cta section-pad">
          <div className="container catalogue-cta__inner">
            <div>
              <p className="eyebrow eyebrow--gold">Not sure where to start?</p>
              <h2>Tell us what you<br /><em>have in mind.</em></h2>
            </div>
            <a className="button button--gold" href={whatsappHref("Hello CHI-ZARAM, I would like help choosing from your product catalogue. Please share recommendations and current availability.")} target="_blank" rel="noreferrer">
              Ask the team <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
