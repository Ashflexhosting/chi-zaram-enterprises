/**
 * Chi-Zaram Harvest Editorial system: asymmetrical storytelling, Palm Crimson accents,
 * warm natural imagery, DM Serif Display headlines, and Manrope utility copy.
 * This page is the public-facing brand narrative and WhatsApp-first conversion path.
 */
import { FormEvent, TouchEvent as ReactTouchEvent, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  House,
  Images,
  Music2,
  Share2,
  Leaf,
  Menu,
  MessageCircle,
  MoveRight,
  PackageOpen,
  Phone,
  Sparkles,
  Tags,
  Truck,
  X,
} from "lucide-react";
import { BackToTop, BusinessStatusBadge, FloatingWhatsAppChat, shopDirectionsHref } from "@/components/SiteLayout";
import { assetPath, routePath, siteBase } from "@/lib/sitePaths";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const whatsappNumber = "2348037365227";

const categories = [
  {
    title: "Red Palm Oil",
    label: "CHI-ZARAM FOODS",
    copy: "Our flagship red palm oil, presented in family and bulk sizes for authentic Nigerian cooking.",
    details: "100% pure, fresh, and natural red palm oil extracted from premium palm fruits. Hygienically processed with no artificial additives or preservatives, rich in natural vitamins A and E.",
    specs: ["Available sizes: 1L, 2L, 3L, 4L, 5L & Bulk Jerrycans", "100% natural red palm oil with rich aroma", "Ideal for soups, stews, and traditional dishes", "Family-size value and bulk supply available"],
    image: assetPath("/manus-storage/chi-zaram-gen-palmoil_d61695e1.jpg"),
    className: "category-card category-card--large category-card--palm",
  },
  {
    title: "Vegetable Oil & More",
    label: "CHI-ZARAM FOODS",
    copy: "Pure Nigerian vegetable oil, groundnut oil, and pantry staples for healthy daily meals.",
    details: "Premium vegetable and cooking oils filtered for purity and clean taste. Perfect for frying, general cooking, and wholesome family nutrition.",
    specs: ["Available in 1L, 3L, 5L and wholesale cartons", "Pure, natural, and nutrient-rich", "Great for frying, baking, and all cooking", "Affordable price with trusted quality"],
    image: assetPath("/manus-storage/chi-zaram-gen-vegetable_e13416ab.jpg"),
    className: "category-card category-card--cleaning category-card--vegetable",
  },
  {
    title: "Delta State Yellow Garri",
    label: "CHI-ZARAM FOODS",
    copy: "Golden yellow garri sourced from Delta State for quick family meals, snacks, and everyday pantry value.",
    details: "A clean, bright, and versatile cassava staple with the familiar texture and sunny colour that belongs in every well-stocked Nigerian pantry.",
    specs: ["Retail, family, and bulk formats available on enquiry", "Sourced from Delta State", "Ideal for soaking, garri eba, and pantry use", "Current pricing and delivery confirmed via WhatsApp"],
    image: assetPath("/manus-storage/chi-zaram-yellow-garri-delta-state_d15b1171.jpg"),
    className: "category-card category-card--garri category-card--yellow-garri",
  },
  {
    title: "Fabrics Collection",
    label: "CHI-ZARAM FABRICS",
    copy: "Expertly tailored premium denim jeans and fabrics with durable stitching and lasting comfort.",
    details: "An exclusive collection of blue and black denim jeans designed for timeless style, superior durability, and everyday comfort.",
    specs: ["Premium denim and cotton fabrics", "Expert tailoring with durable stitching", "Modern fit for lasting comfort", "Available in blue and black styles"],
    image: assetPath("/manus-storage/chi-zaram-gen-fabrics_b7f05a2b.jpg"),
    className: "category-card category-card--fabrics category-card--fabric",
  },
  {
    title: "Cleaning Essentials & Fragrance",
    label: "CHI-ZARAM HOME & FRAGRANCE",
    copy: "Practical home care essentials and concentrated oil perfumes for daily lifestyle needs.",
    details: "Dependable household helpers and long-lasting oil perfumes selected for freshness, quality, and everyday value.",
    specs: ["Home care and cleaning essentials", "Concentrated oil perfumes / fragrances", "Great for personal use and gifting", "Wholesale reselling options available"],
    image: assetPath("/manus-storage/chi-zaram-gen-home_7c839812.jpg"),
    className: "category-card category-card--wide category-card--fragrance category-card--home",
  },
];

const galleryImages = [
  { title: "Red Palm Oil", src: assetPath("/manus-storage/chi-zaram-gen-palmoil_d61695e1.jpg"), desc: "Warm, natural product storytelling for the flagship line" },
      { title: "Vegetable Oil", src: assetPath("/manus-storage/chi-zaram-gen-vegetable_e13416ab.jpg"), desc: "Clean golden pantry styling for everyday meals" },
  { title: "Delta State Yellow Garri", src: assetPath("/manus-storage/chi-zaram-yellow-garri-delta-state_d15b1171.jpg"), desc: "Golden cassava staple sourced from Delta State" },
    { title: "Fabrics Collection", src: assetPath("/manus-storage/chi-zaram-gen-fabrics_b7f05a2b.jpg"), desc: "Indigo denim and textured fabric direction" },
  { title: "Home & Fragrance", src: assetPath("/manus-storage/chi-zaram-gen-home_7c839812.jpg"), desc: "Warm shelf-life styling for home essentials" },
  { title: "The CHI-ZARAM World", src: assetPath("/manus-storage/chi-zaram-gen-hero_3991ab64.jpg"), desc: "The brand's natural, editorial point of view" },
];

const packVariants = [
  { label: "1L", title: "Retail bottle", src: assetPath("/manus-storage/chi-zaram-pack-1l_6e672af6.jpg"), quantity: "1L retail pack" },
  { label: "3L", title: "Family pack", src: assetPath("/manus-storage/chi-zaram-pack-3l_733459fa.jpg"), quantity: "3L family pack" },
  { label: "5L", title: "Value jerrycan", src: assetPath("/manus-storage/chi-zaram-pack-5l_b3198c6e.jpg"), quantity: "5L family pack" },
  { label: "Bulk", title: "Wholesale supply", src: assetPath("/manus-storage/chi-zaram-pack-bulk_ffbd7e5f.jpg"), quantity: "Bulk jerrycan / carton" },
];

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`gallery-image-frame ${loaded ? "is-loaded" : ""}`}>
      <span className="gallery-image-frame__loader" aria-hidden="true" />
      <img src={src} alt={alt} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
    </div>
  );
}

const pricingTiers = [
  { tier: "Retail", volume: "1–4 units", redPalm: "Standard rate", vegetable: "Standard rate", note: "Single-unit household orders" },
  { tier: "Reseller", volume: "5–19 units", redPalm: "Volume rate", vegetable: "Volume rate", note: "For shops, vendors & small resellers" },
  { tier: "Wholesale", volume: "20–49 units", redPalm: "Preferred rate", vegetable: "Preferred rate", note: "Best value for regular bulk buyers", featured: true },
  { tier: "Distributor", volume: "50+ units", redPalm: "Custom quote", vegetable: "Custom quote", note: "Dedicated pricing & logistics" },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [footerForm, setFooterForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<typeof categories[0] | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState("5L family pack");
  const [activePackVariant, setActivePackVariant] = useState(packVariants[2]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [rateCardOpen, setRateCardOpen] = useState(false);
  const [rateCardSuccess, setRateCardSuccess] = useState(false);
  const [rateCardCountdown, setRateCardCountdown] = useState(3);
  const [rateCardErrors, setRateCardErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [copiedClipboard, setCopiedClipboard] = useState(false);
  const [rateCardValues, setRateCardValues] = useState({ name: "", email: "", company: "", buyerType: "Retail Household", product: "Palm Oil", quantity: "", location: "", message: "" });
  const [commercialRevealReady, setCommercialRevealReady] = useState(false);
  const lightboxTouchStart = useRef<number | null>(null);
  const commercialCardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCommercialRevealReady(true);
    const grid = commercialCardsRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".commercial-card"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;

    if (!isMobile || prefersReducedMotion) {
      cards.forEach((card) => card.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    cards.forEach((card, index) => {
      card.style.setProperty("--card-reveal-delay", `${index * 90}ms`);
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const openProductWhatsApp = (product: string, quantity: string) => {
    openWhatsApp(`Hello CHI-ZARAM, I would like to enquire about the following product.\n\n• Product: ${product}\n• Selected Quantity: ${quantity}\n\nPlease share the current price, availability, and delivery options.`);
  };

  const submitFooterEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hello CHI-ZARAM, I would like to make an enquiry.\n\nName: ${footerForm.name}\nEmail: ${footerForm.email || "Not provided"}\nMessage: ${footerForm.message}`;
    openWhatsApp(message);
    setFooterForm({ name: "", email: "", message: "" });
  };

  const shiftGallery = (direction: number) => {
    setActiveGalleryIndex((current) => {
      if (current === null) return current;
      return (current + direction + galleryImages.length) % galleryImages.length;
    });
  };

  useEffect(() => {
    if (activeGalleryIndex === null && activeCategory === null && !rateCardOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGalleryIndex(null);
        setActiveCategory(null);
        setRateCardOpen(false);
        setRateCardSuccess(false);
        setRateCardCountdown(3);
        setGeneratedMessage("");
        setCopiedClipboard(false);
      }
      if (activeGalleryIndex !== null && event.key === "ArrowRight") shiftGallery(1);
      if (activeGalleryIndex !== null && event.key === "ArrowLeft") shiftGallery(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeGalleryIndex, activeCategory, rateCardOpen]);

  const handleLightboxTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    lightboxTouchStart.current = event.touches[0]?.clientX ?? null;
  };

  const handleLightboxTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (lightboxTouchStart.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? lightboxTouchStart.current;
    const distance = endX - lightboxTouchStart.current;
    if (Math.abs(distance) > 45) shiftGallery(distance < 0 ? 1 : -1);
    lightboxTouchStart.current = null;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const product = form.get("product") || "Palm Oil";
    const quantity = form.get("quantity") || "Standard bulk order";
    const location = form.get("location") || "Not specified";
    const tier = form.get("tier") || "General Wholesale";
    const message = `Hello CHI-ZARAM Wholesale Desk, I would like to request a bulk supply quotation.\n\n• Product: ${product}\n• Tier/Category: ${tier}\n• Required Quantity: ${quantity}\n• Delivery Location: ${location}\n\nPlease share current wholesale pricing, availability, and delivery arrangements.`;
    setSubmitted(true);
    openWhatsApp(message);
  };

  const validateRateCardField = (name: string, value: string) => {
    const errors = { ...rateCardErrors };
    if (name === "rate-name") {
      if (!value.trim() || value.trim().length < 2) errors.name = "Please enter a valid name (at least 2 characters).";
      else delete errors.name;
    }
    if (name === "rate-email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) errors.email = "Please enter a valid email address.";
      else delete errors.email;
    }
    if (name === "rate-quantity") {
      if (!value.trim() || value.trim().length < 2) errors.quantity = "Please specify an estimated quantity or pack size.";
      else delete errors.quantity;
    }
    if (name === "rate-location") {
      if (!value.trim() || value.trim().length < 2) errors.location = "Please enter a delivery city or area.";
      else delete errors.location;
    }
    setRateCardErrors(errors);
  };

  const handleRateCardSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = (form.get("rate-name") as string) || "";
    const email = (form.get("rate-email") as string) || "";
    const company = (form.get("rate-company") as string) || "Not specified";
    const buyerType = (form.get("rate-buyer-type") as string) || "Retail Household";
    const product = (form.get("rate-product") as string) || "Multiple products";
    const quantity = (form.get("rate-quantity") as string) || "";
    const location = (form.get("rate-location") as string) || "";
    const message = (form.get("rate-message") as string) || "Please share your current rate card.";

    const errors: { [key: string]: string } = {};
    if (!name.trim() || name.trim().length < 2) errors.name = "Please enter a valid name.";
    if (!quantity.trim()) errors.quantity = "Please specify an estimated quantity.";
    if (!location.trim()) errors.location = "Please enter a delivery city or area.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Please enter a valid email address.";

    if (Object.keys(errors).length > 0) {
      setRateCardErrors(errors);
      setToastMessage("Please complete all required fields (Name, Quantity, and Delivery Location) before submitting.");
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    const msg = `Hello CHI-ZARAM, I would like to request the current rate card.\n\n• Name: ${name}\n• Company: ${company}\n• Buyer Type: ${buyerType}\n• Email: ${email || "Not provided"}\n• Product focus: ${product}\n• Estimated quantity: ${quantity}\n• Delivery location: ${location}\n• Enquiry: ${message}\n\nPlease share current retail, reseller, and wholesale pricing with delivery options.`;
    setGeneratedMessage(msg);
    setRateCardSuccess(true);
    setRateCardCountdown(3);

    const timer = setInterval(() => {
      setRateCardCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      setRateCardOpen(false);
      setRateCardSuccess(false);
      setRateCardCountdown(3);
      openWhatsApp(msg);
    }, 3000);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(generatedMessage).then(() => {
      setCopiedClipboard(true);
      setToastMessage("Enquiry copied to clipboard! You can paste it anywhere.");
      setTimeout(() => setToastMessage(null), 3500);
    });
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent("CHI-ZARAM Rate Card Enquiry");
    const body = encodeURIComponent(generatedMessage);
    window.open(`mailto:chizarampalmoil@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const modalQuantityOptions = activeCategory?.title === "Red Palm Oil" ? packVariants.map((variant) => variant.quantity) : activeCategory?.title === "Vegetable Oil & More" ? ["1L retail pack", "3L family pack", "5L family pack", "Wholesale carton"] : activeCategory?.title === "Delta State Yellow Garri" ? ["Retail pouch", "5kg family pack", "Bulk sack", "Wholesale quantity"] : ["1 unit", "5 units", "Wholesale carton"];

  return (
    <div className="site-shell">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>Retail <i /> Bulk Supply <i /> Consumer Products</span>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
            WhatsApp ordering <ArrowUpRight size={13} strokeWidth={1.8} />
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand-lockup" href="#top" aria-label="CHI-ZARAM home">
            <img src={assetPath("/manus-storage/chizaram-logo-cz_cdd4320b.webp")} alt="CHI-ZARAM Palm Oil & More" className="brand-lockup__mark" />
            <span className="brand-lockup__type">
              <strong>CHI-ZARAM</strong>
              <small>Palm Oil &amp; More</small>
            </span>
          </a>

            <nav className={`main-nav ${mobileOpen ? "main-nav--open" : ""}`} aria-label="Primary navigation">
            <a className="is-active" href={`${siteBase}/`} onClick={() => setMobileOpen(false)}><House className="main-nav__icon" size={14} strokeWidth={1.8} aria-hidden="true" /><span>Home</span></a>
            <a href={`${siteBase}/story`} onClick={() => setMobileOpen(false)}><BookOpen className="main-nav__icon" size={14} strokeWidth={1.8} aria-hidden="true" /><span>Our story</span></a>
            <a href={`${siteBase}/catalogue`} onClick={() => setMobileOpen(false)}><PackageOpen className="main-nav__icon" size={14} strokeWidth={1.8} aria-hidden="true" /><span>What we carry</span></a>
            <a href={`${siteBase}/packs-pricing`} onClick={() => setMobileOpen(false)}><Tags className="main-nav__icon" size={14} strokeWidth={1.8} aria-hidden="true" /><span>Packs &amp; Pricing</span></a>
            <a href={`${siteBase}/bulk-supply`} onClick={() => setMobileOpen(false)}><Truck className="main-nav__icon" size={14} strokeWidth={1.8} aria-hidden="true" /><span>Bulk supply</span></a>
            <a href={`${siteBase}/contact`} onClick={() => setMobileOpen(false)}><Phone className="main-nav__icon" size={14} strokeWidth={1.8} aria-hidden="true" /><span>Contact</span></a>
            <a href={`${siteBase}/gallery`} onClick={() => setMobileOpen(false)}><Images className="main-nav__icon" size={14} strokeWidth={1.8} aria-hidden="true" /><span>Gallery</span></a>
            <a className="main-nav__mobile-cta" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello CHI-ZARAM, I would like to place an order. Please share current product availability and delivery terms.")}`} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
              Order on WhatsApp <ArrowUpRight size={16} />
            </a>
          </nav>

          <a className="header-cta" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
            <MessageCircle size={16} />
            <span>Order on WhatsApp</span>
          </a>
          <button className="menu-toggle" type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-section__grain" aria-hidden="true" />
          <div className="container hero-section__inner">
            <div className="hero-copy">
              <p className="eyebrow hero-copy__eyebrow"><span className="eyebrow__line" /> Pure goodness from nature</p>
              <h1>Good things<br /><em>begin at the source.</em></h1>
              <p className="hero-copy__intro">Discover CHI-ZARAM Palm Oil and a growing range of everyday consumer products. Made to be chosen with confidence, ordered with ease, and shared generously.</p>
              <div className="hero-actions">
                <a className="button button--crimson" href="#palm-oil">Shop Palm Oil <ArrowUpRight size={17} /></a>
                <a className="button button--quiet" href="#supply">Buy in bulk <MoveRight size={18} /></a>
              </div>

              <div className="hero-note">
                <span className="hero-note__dot" />
                <span>Retail &amp; bulk supply across everyday needs</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual__image-wrap">
                <picture>
                  <source media="(min-width: 1280px)" srcSet={assetPath("/manus-storage/hero-products_4f9a2b10.jpg")} />
                  <img src={assetPath("/manus-storage/hero-products_4f9a2b10.jpg")} alt="CHI-ZARAM flagship showcase featuring Red Palm Oil, Vegetable Oil, and Yellow Garri" fetchPriority="high" decoding="async" />
                </picture>
                <div className="hero-visual__stamp"><span>100%</span><small>Pure<br />natural</small></div>
              </div>
              <div className="hero-visual__caption"><span>From the palm</span><span className="caption-rule" /><span>To your table</span></div>
              <div className="hero-delivery-badge" aria-label="Delivery coverage across Lagos and nationwide">
                <Truck size={15} />
                <div>
                  <strong>Lagos &amp; Nationwide</strong>
                  <span>Rapid depot dispatch &amp; doorstep delivery</span>
                </div>
              </div>
              <div className="hero-visual__leaf" aria-hidden="true"><Leaf size={112} strokeWidth={0.65} /></div>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true"><span>Scroll to explore</span><div /></div>
        </section>

        <section className="brand-strip" aria-label="Brand pillars">
          <div className="container brand-strip__inner">
            <div className="brand-strip__intro"><span className="brand-strip__mark">✳</span><span>Rooted in<br />everyday life</span></div>
            <div className="brand-strip__item"><strong>01</strong><span>Quality-minded</span></div>
            <div className="brand-strip__item"><strong>02</strong><span>Family value</span></div>
            <div className="brand-strip__item"><strong>03</strong><span>Direct ordering</span></div>
            <div className="brand-strip__item"><strong>04</strong><span>Retail &amp; bulk</span></div>
          </div>
        </section>

        <section className="cooking-inspiration section-pad" id="inspiration" style={{ display: "none" }}>
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow"><span className="eyebrow__line" /> Kitchen &amp; lifestyle inspiration</p>
                <h2>Cook with confidence,<br /><em>savor every meal.</em></h2>
              </div>
              <p className="section-heading__aside">From rich Nigerian stews to golden fried yams and wholesome daily dishes, discover how pure CHI-ZARAM red palm oil and cooking essentials elevate your kitchen.</p>
            </div>
            <div className="cooking-inspiration-grid">
              {[
                {
                  title: "Authentic Nigerian Stews",
                  tag: "RED PALM OIL CLASSIC",
                  desc: "A rich base of fresh tomatoes, peppers, and onions simmered to perfection in pure CHI-ZARAM red palm oil for unmatched aroma and depth.",
                  time: "45 mins",
                  level: "Medium",
                  image: assetPath("/manus-storage/recipe-stew_72a1b9fc_d55128ee.jpg"),
                  whatsapp: "Hello CHI-ZARAM, I'm inspired to cook authentic Nigerian stew! Please let me know the best palm oil pack size to order for family cooking."
                },
                {
                  title: "Crispy Fried Yam & Plantain",
                  tag: "VEGETABLE OIL ESSENTIAL",
                  desc: "Golden fried yam slices and ripe plantains cooked clean and crispy using pure CHI-ZARAM vegetable and groundnut oil.",
                  time: "25 mins",
                  level: "Easy",
                  image: assetPath("/manus-storage/recipe-yam_81c2d8fe_d8358d1a.jpg"),
                  whatsapp: "Hello CHI-ZARAM, I'd love to order vegetable oil for crispy frying and daily cooking. Please share your current pack options."
                },
                {
                  title: "Traditional Delta Palm Oil Rice",
                  tag: "PANTRY MASTERCLASS",
                  desc: "A fragrant native delicacy featuring seasoned stockfish, crayfish, smoked fish, and rich unadulterated palm oil from Delta State.",
                  time: "55 mins",
                  level: "Special",
                  image: assetPath("/manus-storage/recipe-rice_32e4f7ac_5155926e.jpg"),
                  whatsapp: "Hello CHI-ZARAM, I'm planning to make native palm oil rice! Please share pricing and availability for your 3L and 5L palm oil packs."
                }
              ].map((recipe, idx) => (
                <article key={idx} className={`cooking-card cooking-card--${idx + 1}`}>
                  <div className="cooking-card__image">
                    <img src={recipe.image} alt={recipe.title} loading="lazy" />
                    <span className="cooking-card__tag">{recipe.tag}</span>
                  </div>
                  <div className="cooking-card__body">
                    <div className="cooking-card__meta">
                      <span>⏱ {recipe.time}</span>
                      <span>•</span>
                      <span>Level: {recipe.level}</span>
                    </div>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.desc}</p>
                    <a className="button button--quiet button--sm" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(recipe.whatsapp)}`} target="_blank" rel="noreferrer">
                      Get ingredients on WhatsApp <ArrowUpRight size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story-section story-section--editorial section-pad" id="story">
          <div className="container story-editorial">
            <div className="story-editorial__rail">
              <div className="section-kicker"><span className="section-kicker__number">01</span><span>Our story</span></div>
              <span className="story-editorial__rail-line" aria-hidden="true" />
              <span className="story-editorial__rail-caption">Rooted in Nigeria<br />made for everyday life</span>
            </div>
            <div className="story-editorial__copy">
              <p className="eyebrow">A brand with room to grow</p>
              <h2>Quality everyday goods, <em>closer to home.</em></h2>
              <p className="story-editorial__lead">CHI-ZARAM is building a considered Nigerian consumer-products brand around the things people reach for every day — with honest presentation, practical value, and a direct line from our hands to yours.</p>
              <div className="story-editorial__facts">
                <article><span>01</span><strong>Selected with care</strong><p>Products chosen for usefulness, quality, and everyday confidence.</p></article>
                <article><span>02</span><strong>Room to grow</strong><p>One master brand expanding from pantry staples into lifestyle essentials.</p></article>
                <article><span>03</span><strong>Closer to home</strong><p>Retail and bulk supply made simpler through direct WhatsApp ordering.</p></article>
              </div>
              <div className="story-editorial__footer"><div className="story-callout"><Sparkles size={19} /><span>One master brand.<br /><strong>Many ways to live well.</strong></span></div><a className="text-link" href="#portfolio">Explore our collection <ArrowUpRight size={17} /></a></div>
            </div>
            <div className="story-editorial__visual" aria-label="CHI-ZARAM products and point of view">
              <div className="story-editorial__image story-editorial__image--main"><img src={assetPath("/manus-storage/chi-zaram-pack-5l_b3198c6e.jpg")} alt="CHI-ZARAM 5L red palm oil value pack styled with fresh palm fruits" loading="lazy" /></div>
              <div className="story-editorial__image story-editorial__image--inset"><img src={assetPath("/manus-storage/brand-story-palm-oil-3l_e75b6dec.jpeg")} alt="CHI-ZARAM 3L palm oil bottles with palm fruits and the Palm Oil product backdrop" loading="lazy" /></div>
              <div className="story-editorial__seal"><span>CHI-ZARAM</span><strong>Good things<br /><em>worth sharing.</em></strong></div>
            </div>
          </div>
        </section>

        <section className="brand-showcase section-pad">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">The CHI-ZARAM standard</p>
                <h2>From nature's source<br /><em>to your family table.</em></h2>
              </div>
              <p className="section-heading__aside">Every CHI-ZARAM product is selected and packaged with care. Whether you are buying single retail units or wholesale bulk supplies, our commitment to purity and value remains constant.</p>
            </div>
            <div className="brand-showcase__grid">
              <div className="brand-showcase__card">
                <img src={assetPath("/manus-storage/brand-story-palm-oil-3l_e75b6dec.jpeg")} alt="CHI-ZARAM 3L red palm oil packs with palm fruits in a warm editorial setting" loading="lazy" />
                <div className="brand-showcase__tag">Direct Representation</div>
                <h4>Trusted quality from our hands to yours</h4>
                <p>We take pride in transparent presentation, consistent pack sizes, and direct customer engagement.</p>
              </div>
              <div className="brand-showcase__card">
                <img src={assetPath("/manus-storage/chi-zaram-gen-vegetable_e13416ab.jpg")} alt="CHI-ZARAM Palm Oil and More roundel" loading="lazy" />
                <div className="brand-showcase__tag">Palm Oil &amp; More</div>
                <h4>A growing pantry and lifestyle ecosystem</h4>
                <p>From palm and vegetable oils to groundnut oil, grains, and fabrics — explore our complete range.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section section-pad" id="portfolio">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><p className="eyebrow">What we carry</p><h2 className="portfolio-section__title"><span>A little more of</span><em>the good stuff.</em></h2></div>
              <p className="section-heading__aside">From the kitchen to the home, from personal style to thoughtful gifting — we’re building a considered range of products for real, everyday life.</p>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  type="button"
                  className={category.className}
                  key={category.title}
                  onClick={() => { setSelectedQuantity(category.title === "Red Palm Oil" ? "5L family pack" : category.title === "Delta State Yellow Garri" ? "5kg family pack" : "1 unit"); setActivePackVariant(packVariants[2]); setActiveCategory(category); }}
                  style={{ textAlign: "left", border: 0, padding: 0 }}
                >
                  <div className="category-card__image"><img src={category.image} alt="" loading="lazy" /></div>
                  <div className="category-card__overlay" />
                  <img className="category-card__mark" src={assetPath("/manus-storage/category-emblem-transparent_9f8a2c11.png")} alt="" />
                  <div className="category-card__content"><span className="category-card__label">{category.label}</span><h3>{category.title}</h3><p>{category.copy}</p><span className="category-card__link">View product details <ArrowUpRight size={16} /></span></div>
                </button>
              ))}
            </div>
            <div className="category-grid__footer">
              <p>Explore the full CHI-ZARAM range, including pack formats, household essentials, fabrics, and direct supply options.</p>
              <a className="button button--quiet" href={`${siteBase}/catalogue`}>View all products <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="palm-section section-pad" id="palm-oil">
          <div className="container palm-section__inner">
            <div className="palm-section__visual"><img src={assetPath("/manus-storage/chi-zaram-pack-5l_b3198c6e.jpg")} alt="CHI-ZARAM 5 Litre red palm oil value pack with palm fruits" loading="lazy" /><img className="palm-section__brand-stamp" src={assetPath("/manus-storage/chizaram-logo-cz-mark_6dff130a.webp")} alt="" /><div className="palm-section__badge"><span>Family size</span><strong>5L</strong><small>lasting value</small></div></div>
            <div className="palm-section__copy"><div className="section-kicker section-kicker--light"><span className="section-kicker__number">02</span><span>The flagship</span></div><p className="eyebrow eyebrow--gold">CHI-ZARAM Foods</p><h2>Pure, fresh,<br /><em>naturally better.</em></h2><p className="body-copy body-copy--light">Our red palm oil is available in 1L, 2L, 3L, 4L, and 5L containers as well as bulk jerrycans. Rich in vitamins A and E with no artificial additives.</p><div className="palm-points"><span><Check size={16} /> 100% pure &amp; natural red palm oil</span><span><Check size={16} /> Multiple pack sizes (1L to 5L &amp; Bulk)</span><span><Check size={16} /> Hygienically processed for soups &amp; stews</span></div><button className="button button--gold" type="button" onClick={() => openWhatsApp("Hello CHI-ZARAM, I would like to enquire about palm oil pack sizes (1L to 5L and bulk). Please share current pricing and availability.")}>Enquire about Palm Oil <ArrowUpRight size={17} /></button><p className="micro-note">Current availability and pricing are confirmed on enquiry.</p></div>
          </div>
        </section>

        <section className="gallery-section section-pad">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Visual Catalogue</p>
              <h2>Explore our packages &amp; products.</h2>
              <p>A closer look at our certified pack sizes, fabric collections, and everyday essentials.</p>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((item, idx) => (
                <button className="gallery-card" type="button" key={idx} onClick={() => setActiveGalleryIndex(idx)} aria-label={`Open ${item.title} image`}>
                  <div className="gallery-card__img"><GalleryImage src={item.src} alt={item.title} /></div>
                  <div className="gallery-card__info">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeGalleryIndex !== null && (
          <div className="lightbox-backdrop" onClick={() => setActiveGalleryIndex(null)}>
            <div className="lightbox" onClick={(e) => e.stopPropagation()} onTouchStart={handleLightboxTouchStart} onTouchEnd={handleLightboxTouchEnd}>
              <button className="lightbox__close" type="button" onClick={() => setActiveGalleryIndex(null)} aria-label="Close image gallery"><X size={22} /></button>
              <button className="lightbox__arrow lightbox__arrow--left" type="button" onClick={() => shiftGallery(-1)} aria-label="Previous image"><ArrowLeft size={24} /></button>
              <div className="lightbox__media"><img src={galleryImages[activeGalleryIndex].src} alt={galleryImages[activeGalleryIndex].title} loading="eager" decoding="async" /></div>
              <button className="lightbox__arrow lightbox__arrow--right" type="button" onClick={() => shiftGallery(1)} aria-label="Next image"><ArrowRight size={24} /></button>
              <div className="lightbox__caption"><strong>{galleryImages[activeGalleryIndex].title}</strong><span>{galleryImages[activeGalleryIndex].desc}</span><small>{activeGalleryIndex + 1} / {galleryImages.length}</small></div>
              <div className="lightbox__dots" aria-label="Gallery image selector">{galleryImages.map((item, index) => <button key={item.title} className={index === activeGalleryIndex ? "is-active" : ""} type="button" onClick={() => setActiveGalleryIndex(index)} aria-label={`View ${item.title}`} />)}</div>
            </div>
          </div>
        )}

        <section className="commercial-section section-pad" id="commercial">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Pack sizes &amp; supply structure</p>
                <h2>Built for households,<br /><em>priced for value.</em></h2>
              </div>
              <p className="section-heading__aside">We offer flexible packaging for household cooking, retail shelves, and commercial kitchens. All pricing and batch availability are confirmed directly through WhatsApp to ensure accuracy.</p>
            </div>

            <div className="commercial-pack-chips" aria-label="Available pack sizes">
              <span>1L Retail Bottle</span>
              <span>2L Family Pack</span>
              <span>3L Value Pack</span>
              <span>4L Kitchen Pack</span>
              <span>5L Hero Container</span>
              <span>Bulk Jerrycans</span>
            </div>

            <div ref={commercialCardsRef} className={`commercial-grid ${commercialRevealReady ? "commercial-grid--reveal" : ""}`}>
              <div className="commercial-card">
                <span className="commercial-card__tag">Flagship Product</span>
                <h3>CHI-ZARAM Palm Oil</h3>
                <p className="commercial-card__desc">Pure red palm oil with no additives, hygienically processed for rich flavour and nutritional value.</p>
                <ul className="commercial-specs">
                  <li><strong>Primary Pack:</strong> 5 Litres (Hero household family size)</li>
                  <li><strong>Bulk Options:</strong> Jerrycans &amp; Cartons available on request</li>
                  <li><strong>Pricing Model:</strong> Tiered wholesale / retail pricing confirmed via WhatsApp</li>
                </ul>
                <button className="button button--crimson button--full" type="button" onClick={() => openWhatsApp("Hello CHI-ZARAM, I would like to check current pack prices and availability for Palm Oil.")}>
                  Enquire Palm Oil Pricing <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="commercial-card">
                <span className="commercial-card__tag">Wholesale Tiers</span>
                <h3>Supply Structure</h3>
                <p className="commercial-card__desc">Designed to support individual shoppers, local retailers, restaurants, and commercial distributors.</p>
                <ul className="commercial-specs">
                  <li><strong>Tier 1 (Retail):</strong> Single units for households &amp; direct consumers</li>
                  <li><strong>Tier 2 (Reseller):</strong> Carton / bundle quantities for shops &amp; vendors</li>
                  <li><strong>Tier 3 (Commercial):</strong> High-volume pallet or bulk distribution supply</li>
                </ul>
                <button className="button button--quiet button--full" type="button" onClick={() => openWhatsApp("Hello CHI-ZARAM Wholesale Desk, I would like to request the wholesale tier rate card and MOQ details.")}>
                  Request Wholesale Rate Card <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="commercial-card">
                <span className="commercial-card__tag">Logistics &amp; Fulfillment</span>
                <h3>Delivery Coverage</h3>
                <p className="commercial-card__desc">Reliable dispatch from our operating hubs with structured delivery options for local and regional orders.</p>
                <ul className="commercial-specs">
                  <li><strong>Local Delivery:</strong> Direct doorstep dispatch within operating zones</li>
                  <li><strong>Interstate Bulk:</strong> Partner transport and motor-park logistics for regional buyers</li>
                  <li><strong>Pickup Option:</strong> Direct depot / warehouse collection by arrangement</li>
                </ul>
                <button className="button button--quiet button--full" type="button" onClick={() => openWhatsApp("Hello CHI-ZARAM Logistics, I want to confirm delivery coverage and dispatch cost for my location.")}>
                  Confirm Delivery Coverage <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            <div className="commercial-rate-banner">
              <div>
                <span className="commercial-rate-banner__tag">Direct Rate Card</span>
                <h4>Need a complete rate card for retail or wholesale distribution?</h4>
                <p>We’ll share current unit prices, bulk carton discounts, and delivery estimates directly on WhatsApp.</p>
              </div>
              <button
                className="button button--gold"
                type="button"
                onClick={() => setRateCardOpen(true)}
              >
                Request current rate card <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>



        <section className="supply-section section-pad" id="supply">
          <div className="container supply-section__inner">
            <div className="supply-section__copy"><div className="section-kicker"><span className="section-kicker__number">03</span><span>Retail &amp; bulk supply</span></div><p className="eyebrow">For the home, shop, or growing business</p><h2>Need more<br /><em>to go around?</em></h2><p className="body-copy">Buying for resale, a food business, or larger household needs? Tell us what you need, the quantity, and your location. Our team can confirm current availability and supply options.</p><div className="supply-feature"><div className="supply-feature__icon"><Truck size={20} /></div><div><strong>Quality + value + convenience</strong><span>A direct path from enquiry to dispatch.</span></div></div></div>
            <form className="enquiry-card" onSubmit={handleSubmit}><div className="enquiry-card__top"><span className="enquiry-card__label">Wholesale desk</span><span className="enquiry-card__status"><i /> WhatsApp first</span></div><h3>Start an enquiry</h3><p>Share the basics. We’ll take it from there.</p><label>What are you looking for?<select name="product" defaultValue="Palm Oil"><option>Palm Oil</option><option>Vegetable Oil</option><option>Delta State Yellow Garri</option><option>Cleaning Essentials</option><option>Fabrics Collections</option><option>Oil Perfume</option><option>Multiple categories</option></select></label><label>Estimated quantity<input name="quantity" placeholder="e.g. 20 units / 2 cartons" /></label><label>Delivery location<input name="location" placeholder="City or area" required /></label><button className="button button--crimson button--full" type="submit">{submitted ? "Opening WhatsApp…" : "Send enquiry on WhatsApp"}<ArrowUpRight size={17} /></button><span className="enquiry-card__fineprint">No fixed prices are published here — live availability and logistics are confirmed directly.</span></form>
          </div>
        </section>

        <section className="testimonial-placeholder section-pad" aria-labelledby="testimonial-title">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Customer voices</p>
              <h2 id="testimonial-title">Real experiences,<br /><em>when they’re ready to share.</em></h2>
              <p>This space is reserved for verified feedback from CHI-ZARAM customers. We will only publish names, comments, and ratings with permission.</p>
            </div>
            <div className="testimonial-placeholder__card">
              <div className="testimonial-placeholder__mark">✳</div>
              <div><span className="testimonial-placeholder__label">Verified feedback coming soon</span><h3>A better buying experience starts with listening.</h3><p>Have you ordered from CHI-ZARAM? Share your experience with our team and, with your permission, it can help future customers buy with confidence.</p></div>
              <button className="button button--crimson" type="button" onClick={() => openWhatsApp("Hello CHI-ZARAM, I would like to share feedback about my recent order. Please let me know how to submit it.")}>Share feedback <ArrowUpRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="closing-section" id="contact">
          <div className="closing-section__leaf closing-section__leaf--one" aria-hidden="true"><Leaf size={170} /></div><div className="closing-section__leaf closing-section__leaf--two" aria-hidden="true"><Leaf size={95} /></div>
          <div className="container closing-section__inner"><p className="eyebrow eyebrow--gold">Let’s make the next order easy</p><h2>Good things are<br /><em>worth sharing.</em></h2><p>Have a question, a restock in mind, or a larger supply need? We’re one message away.</p><button className="button button--gold" type="button" onClick={() => openWhatsApp("Hello CHI-ZARAM, I would like to make an enquiry. Please assist me with current products, availability and delivery options.")}>Talk to CHI-ZARAM <ArrowUpRight size={17} /></button></div>
        </section>
      </main>

      {activeCategory && (
        <div className="product-modal-backdrop" onClick={() => setActiveCategory(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="product-modal__close" type="button" onClick={() => setActiveCategory(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="product-modal__image">
              <img src={activeCategory.title === "Red Palm Oil" ? activePackVariant.src : activeCategory.image} alt={activeCategory.title === "Red Palm Oil" ? `CHI-ZARAM ${activePackVariant.label} red palm oil pack` : activeCategory.title} loading="eager" decoding="async" />
              <span className="product-modal__badge">{activeCategory.label}</span>
            </div>
            <div className="product-modal__body">
              <h3>{activeCategory.title}</h3>
              <p className="product-modal__desc">{activeCategory.details}</p>
              <div className="product-modal__specs-title">Key Specifications &amp; Offerings</div>
              <ul className="product-modal__specs">
                {activeCategory.specs.map((spec, i) => (
                  <li key={i}><Check size={14} /> {spec}</li>
                ))}
              </ul>
              {activeCategory.title === "Red Palm Oil" && <div className="pack-variant-strip" aria-label="Red palm oil pack-size variants">
                {packVariants.map((variant) => <button className={`pack-variant ${activePackVariant.label === variant.label ? "is-active" : ""}`} type="button" key={variant.label} onClick={() => { setActivePackVariant(variant); setSelectedQuantity(variant.quantity); }}>
                  <span className="pack-variant__image"><img src={variant.src} alt={`${variant.label} ${variant.title}`} loading="lazy" decoding="async" /></span><strong>{variant.label}</strong><small>{variant.title}</small>
                </button>)}
              </div>}
              <label className="product-modal__quantity">Selected quantity
                <select value={selectedQuantity} onChange={(e) => { const next = e.target.value; setSelectedQuantity(next); const variant = packVariants.find((item) => item.quantity === next); if (variant) setActivePackVariant(variant); }}>
                  {modalQuantityOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <div className="product-modal__actions">
                <button
                  className="button button--crimson button--full"
                  type="button"
                  onClick={() => {
                    const msg = `Hello CHI-ZARAM, I am interested in ${activeCategory.title} (${activeCategory.label}).\n\n• Selected Quantity: ${selectedQuantity}\n\nPlease share current pricing, pack sizes, and availability details.`;
                    setActiveCategory(null);
                    openWhatsApp(msg);
                  }}
                >
                  Enquire via WhatsApp <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {rateCardOpen && (
        <div className="product-modal-backdrop" role="presentation" onClick={() => setRateCardOpen(false)}>
          <div className={`rate-card-modal ${rateCardSuccess ? "is-success" : ""}`} role="dialog" aria-modal="true" aria-labelledby="rate-card-title" aria-describedby="rate-card-description" onClick={(event) => event.stopPropagation()}>
            {rateCardSuccess ? (
              <div className="rate-card-success-state">
                <div className="rate-card-success-icon"><Check size={32} /></div>
                <h3>Rate card ready</h3>
                <p>Opening WhatsApp in <strong>{rateCardCountdown}</strong> second{rateCardCountdown === 1 ? "" : "s"}…</p>
                <div className="rate-card-countdown-bar" style={{ width: `${(rateCardCountdown / 3) * 100}%` }} />
                
                <div className="rate-card-preview">
                  <span>Generated Message Preview:</span>
                  <pre>{generatedMessage}</pre>
                </div>

                <div className="rate-card-success-actions">
                  <button className="button button--crimson" type="button" onClick={() => openWhatsApp(generatedMessage)}>
                    Open WhatsApp Now <ArrowUpRight size={15} />
                  </button>
                  <button className="button button--quiet" type="button" onClick={handleCopyClipboard}>
                    {copiedClipboard ? "Copied to Clipboard!" : "Copy to Clipboard"}
                  </button>
                  <button className="button button--quiet" type="button" onClick={handleSendEmail}>
                    Send via Email
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="rate-card-modal__header">
                  <div>
                    <span className="commercial-rate-banner__tag">Direct rate card</span>
                    <h3 id="rate-card-title">Let’s price the next order clearly.</h3>
                    <p id="rate-card-description">Share your order details. Real-time validation ensures your request is accurate before we open WhatsApp.</p>
                  </div>
                  <button className="product-modal__close" type="button" onClick={() => setRateCardOpen(false)} aria-label="Close rate card enquiry">
                    <X size={20} />
                  </button>
                </div>
                <form className="rate-card-form" onSubmit={handleRateCardSubmit} noValidate>
                  <div className="rate-card-form__grid">
                    <label>
                      <span>Your name</span>
                      <input
                        name="rate-name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        value={rateCardValues.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRateCardValues((prev) => ({ ...prev, name: val }));
                          validateRateCardField("rate-name", val);
                        }}
                      />
                      {rateCardErrors.name && <small className="form-error">{rateCardErrors.name}</small>}
                    </label>

                    <label>
                      <span>Email address <small>(optional)</small></span>
                      <input
                        name="rate-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={rateCardValues.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRateCardValues((prev) => ({ ...prev, email: val }));
                          validateRateCardField("rate-email", val);
                        }}
                      />
                      {rateCardErrors.email && <small className="form-error">{rateCardErrors.email}</small>}
                    </label>

                    <label>
                      <span>Buyer Type</span>
                      <select
                        name="rate-buyer-type"
                        value={rateCardValues.buyerType}
                        onChange={(e) => setRateCardValues((prev) => ({ ...prev, buyerType: e.target.value }))}
                      >
                        <option value="Retail Household">Retail Household (1–4 units)</option>
                        <option value="Shop Reseller">Shop Reseller / Vendor (5–19 units)</option>
                        <option value="Wholesale Buyer">Wholesale Buyer (20–49 units)</option>
                        <option value="Commercial Distributor">Commercial Distributor (50+ units)</option>
                      </select>
                    </label>

                    <label>
                      <span>Company / Store Name <small>(optional)</small></span>
                      <input
                        name="rate-company"
                        placeholder="e.g. Adeola Stores / Home"
                        value={rateCardValues.company}
                        onChange={(e) => setRateCardValues((prev) => ({ ...prev, company: e.target.value }))}
                      />
                    </label>

                    <label>
                      <span>Product focus</span>
                      <select
                        name="rate-product"
                        value={rateCardValues.product}
                        onChange={(e) => setRateCardValues((prev) => ({ ...prev, product: e.target.value }))}
                      >
                        <option value="Palm Oil">Palm Oil (All pack sizes)</option>
                        <option value="Vegetable Oil">Vegetable Oil</option>
                        <option value="Delta State Yellow Garri">Delta State Yellow Garri</option>
                        <option value="Multiple products">Multiple products</option>
                      </select>
                    </label>

                    <label>
                      <span>Estimated quantity</span>
                      <input
                        name="rate-quantity"
                        required
                        placeholder="e.g. 20 units / 2 cartons"
                        value={rateCardValues.quantity}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRateCardValues((prev) => ({ ...prev, quantity: val }));
                          validateRateCardField("rate-quantity", val);
                        }}
                      />
                      {rateCardErrors.quantity && <small className="form-error">{rateCardErrors.quantity}</small>}
                    </label>
                  </div>

                  <label>
                    <span>Delivery location</span>
                    <input
                      name="rate-location"
                      required
                      placeholder="City or area"
                      autoComplete="address-level2"
                      value={rateCardValues.location}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRateCardValues((prev) => ({ ...prev, location: val }));
                        validateRateCardField("rate-location", val);
                      }}
                    />
                    {rateCardErrors.location && <small className="form-error">{rateCardErrors.location}</small>}
                  </label>

                  <label>
                    <span>What would you like priced?</span>
                    <textarea
                      name="rate-message"
                      rows={3}
                      placeholder="Tell us the pack sizes, order type, or delivery needs you have in mind."
                      value={rateCardValues.message}
                      onChange={(e) => setRateCardValues((prev) => ({ ...prev, message: e.target.value }))}
                    />
                  </label>

                  <div className="rate-card-form__footer">
                    <span>Verified details open WhatsApp instantly.</span>
                    <button className="button button--crimson" type="submit">Continue to WhatsApp <ArrowUpRight size={16} /></button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="validation-toast" role="alert" aria-live="assertive">
          <span className="validation-toast__dot" />
          <span>{toastMessage}</span>
        </div>
      )}

      <AccessibilityWidget />
      <BackToTop />
      <FloatingWhatsAppChat />
      <footer className="site-footer"><div className="container site-footer__top"><div className="site-footer__identity"><a className="brand-lockup brand-lockup--footer" href="#top"><img src={assetPath("/manus-storage/chizaram-logo-cz_cdd4320b.webp")} alt="CHI-ZARAM Palm Oil & More" className="brand-lockup__mark" /><span className="brand-lockup__type"><strong>CHI-ZARAM</strong><small>Palm Oil &amp; More</small></span></a><div className="footer-tagline">Pure goodness.<br /><em>Naturally better.</em></div></div><div className="footer-contact"><span>Start a conversation</span><a href="tel:+2348037365227"><Phone size={15} /> 0803 736 5227</a><span className="footer-contact__location"><strong>Shop 5 Faronbi Plaza</strong><span>Opposite Isolo General Hospital, Lagos</span><a className="shop-directions-link" href={shopDirectionsHref} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={12} /></a><span className="footer-contact__hours">Mon–Fri, 9 AM–5 PM</span><BusinessStatusBadge /></span><div className="footer-socials" aria-label="Social media links"><a href="https://www.tiktok.com/@ogonwibe" target="_blank" rel="noreferrer" aria-label="CHI-ZARAM on TikTok"><Music2 size={15} /><span>TikTok</span></a><a href="https://web.facebook.com/ogoonwokoye/photos" target="_blank" rel="noreferrer" aria-label="CHI-ZARAM on Facebook"><Share2 size={15} /><span>Facebook</span></a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Chat with CHI-ZARAM on WhatsApp"><MessageCircle size={15} /><span>WhatsApp</span></a></div></div><div className="footer-enquiry"><span className="footer-enquiry__eyebrow">Quick enquiry</span><form onSubmit={submitFooterEnquiry}><div className="footer-enquiry__row"><label><span className="sr-only">Your name</span><input required value={footerForm.name} onChange={(event) => setFooterForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your name" autoComplete="name" /></label><label><span className="sr-only">Email address</span><input type="email" value={footerForm.email} onChange={(event) => setFooterForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email (optional)" autoComplete="email" /></label></div><label><span className="sr-only">Your message</span><textarea required value={footerForm.message} onChange={(event) => setFooterForm((current) => ({ ...current, message: event.target.value }))} placeholder="How can we help?" rows={2} /></label><button className="footer-enquiry__submit" type="submit">Send on WhatsApp <ArrowUpRight size={14} /></button></form></div></div><div className="container site-footer__bottom"><span>© 2026 CHI-ZARAM Palm Oil &amp; More Enterprises</span><span>Retail &amp; Bulk Supply</span><span>Built by <a href="https://ashflexwebdesign.com" target="_blank" rel="noreferrer">Ashflex Web Design</a></span><a href="#top">Back to top <ChevronDown size={14} className="rotate-180" /></a></div></footer>

      {/* replaced by FloatingWhatsAppChat */}
    </div>
  );
}

// Parallax scroll effect for hero visual
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty("--scroll-y", String(scrollY));
  }, { passive: true });
}
