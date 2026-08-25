/**
 * Harvest Editorial photo gallery page: interactive lightbox, category filtering,
 * zoom controls, direct product enquiry panels, and refined editorial captions.
 */
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Share2, ZoomIn, ZoomOut, Check, ArrowUpRight, MessageCircle, Phone, Sparkles } from "lucide-react";
import { assetPath } from "@/lib/sitePaths";
import SiteLayout, { whatsappHref } from "@/components/SiteLayout";
import SEOHead from "@/components/SEOHead";
import { pricingTiers } from "@/lib/commercialData";

type GalleryCommercial = {
  packSize: string;
  priceGuide: string;
  orderRange: string;
  note: string;
};

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  caption: string;
  src: string;
  mobileSrc: string;
  commercial?: GalleryCommercial;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Flagship Red Palm Oil Bottle & Fresh Palm Fruits",
    category: "Palm Oil",
    caption: "Our signature red palm oil presented alongside freshly harvested palm nuts. Pure, unadulterated, and rich in natural nutrients—crafted to bring authentic West African heritage to your table.",
    src: assetPath("/manus-storage/palmoil-960_3430c348.jpg"),
    mobileSrc: assetPath("/manus-storage/palmoil-480_f3103087.jpg"),
    commercial: {
      packSize: "1L retail bottle",
      priceGuide: "₦2,500 retail rate",
      orderRange: "1–4 units",
      note: "Current delivered pricing and stock availability are confirmed directly on WhatsApp.",
    },
  },
  {
    id: 2,
    title: "Editorial Brand Still Life & Botanicals",
    category: "Brand Story",
    caption: "A sunlit Harvest Editorial composition capturing botanical elements, warm morning light, and our core belief that good things are worth sharing with family and friends.",
    src: assetPath("/manus-storage/hero-960_46c9d711.jpg"),
    mobileSrc: assetPath("/manus-storage/hero-480_085fccc1.jpg"),
  },
  {
    id: 3,
    title: "Pure Vegetable Oil & Kitchen Staples",
    category: "Vegetable Oil",
    caption: "Crystal-clear vegetable oil bottles and cooking essentials selected for everyday frying, baking, and culinary excellence across home kitchens and food businesses.",
    src: assetPath("/manus-storage/vegetable-960_60063ee3.jpg"),
    mobileSrc: assetPath("/manus-storage/vegetable-480_cc52e48e.jpg"),
    commercial: {
      packSize: "Retail bottles or carton supply",
      priceGuide: "Standard & volume rate",
      orderRange: "1–49 units",
      note: "Vegetable oil pack availability and current rate-card pricing are confirmed instantly on WhatsApp.",
    },
  },
  {
    id: 4,
    title: "Delta State Yellow Garri",
    category: "Yellow Garri",
    caption: "Golden yellow garri sourced directly from Delta State. Exceptionally crisp and clean, serving as a versatile pantry staple for family meals, soaking, and traditional garri eba.",
    src: assetPath("/manus-storage/chi-zaram-yellow-garri-delta-state_d15b1171.jpg"),
    mobileSrc: assetPath("/manus-storage/chi-zaram-yellow-garri-delta-state_d15b1171.jpg"),
    commercial: {
      packSize: "Retail pouch, family pack, or bulk sack",
      priceGuide: "Product-specific quote",
      orderRange: "Confirm on enquiry",
      note: "Share your preferred quantity and destination for current yellow garri pricing and delivery options.",
    },
  },
  {
    id: 5,
    title: "Premium Denim & Tailored Fabrics",
    category: "Fabrics",
    caption: "Durable indigo denim jeans and tailored apparel from our lifestyle collection. Designed with robust stitching, timeless colour, and everyday comfort in mind.",
    src: assetPath("/manus-storage/fabrics-960_7ed6ba51.jpg"),
    mobileSrc: assetPath("/manus-storage/fabrics-480_2edf7bc1.jpg"),
    commercial: {
      packSize: "Item-specific sizes and lengths",
      priceGuide: "Product-specific quote",
      orderRange: "Confirm on enquiry",
      note: "Available fabric specifications, quantities, and delivered pricing are confirmed on WhatsApp.",
    },
  },
  {
    id: 6,
    title: "Home Fragrance & Cleaning Essentials",
    category: "Home & Fragrance",
    caption: "Amber glass home care bottles and concentrated oil perfumes for daily living. Thoughtfully formulated to bring lasting freshness and comfort into your personal space.",
    src: assetPath("/manus-storage/home-960_f88ac88a.jpg"),
    mobileSrc: assetPath("/manus-storage/home-480_b710d4e4.jpg"),
    commercial: {
      packSize: "Product-specific bottles or formats",
      priceGuide: "Product-specific quote",
      orderRange: "Confirm on enquiry",
      note: "Ask for the current product format, price, availability, and delivery options.",
    },
  },
  {
    id: 7,
    title: "1-Litre Retail Bottle Format",
    category: "Palm Oil",
    caption: "Convenient tamper-evident retail bottle format (₦2,500). Perfectly sized for everyday household cooking and single-unit pantry restocking.",
    src: assetPath("/manus-storage/pack-1l-960_b48dd7f7.jpg"),
    mobileSrc: assetPath("/manus-storage/pack-1l-480_6a33c6dd.jpg"),
    commercial: {
      packSize: "1L retail bottle",
      priceGuide: "₦2,500 retail rate",
      orderRange: "1–4 units",
      note: "Ask for the current unit price and delivered total for your location.",
    },
  },
  {
    id: 8,
    title: "3-Litre Family Pack Format",
    category: "Palm Oil",
    caption: "Mid-size family pack (₦8,500) offering exceptional value for regular kitchen use. Designed to keep your pantry well-stocked with premium unrefined red palm oil.",
    src: assetPath("/manus-storage/pack-3l-960_26cd8620.jpg"),
    mobileSrc: assetPath("/manus-storage/pack-3l-480_29e5f033.jpg"),
    commercial: {
      packSize: "3L family pack",
      priceGuide: "₦8,500 standard rate",
      orderRange: "1–19 units",
      note: "Current pricing is confirmed by quantity, availability, and delivery destination.",
    },
  },
  {
    id: 9,
    title: "5-Litre Jerrycan Format",
    category: "Palm Oil",
    caption: "Robust 5L value jerrycan (₦12,500) featuring a secure handle for extended home use, catering businesses, and families who appreciate lasting quality.",
    src: assetPath("/manus-storage/pack-5l-960_065d3c96.jpg"),
    mobileSrc: assetPath("/manus-storage/pack-5l-480_34c6d045.jpg"),
    commercial: {
      packSize: "5L value jerrycan",
      priceGuide: "₦12,500 value rate",
      orderRange: "1–19 units",
      note: "Ask for the current unit price, carton options, and delivered total for your location.",
    },
  },
  {
    id: 10,
    title: "Wholesale Bulk Container & Carton Supply",
    category: "Bulk Supply",
    caption: "Commercial wholesale container and carton packaging (₦60,000 for 25L) engineered for distributors, market traders, caterers, and bulk supply partners.",
    src: assetPath("/manus-storage/pack-bulk-960_02d289c8.jpg"),
    mobileSrc: assetPath("/manus-storage/pack-bulk-480_021937f5.jpg"),
    commercial: {
      packSize: "25L wholesale container / carton",
      priceGuide: "₦60,000 wholesale rate",
      orderRange: "20+ units",
      note: "Bulk pricing, MOQ, logistics, and dispatch timing are confirmed with the Wholesale Desk.",
    },
  },
];

const categories = ["All", "Palm Oil", "Vegetable Oil", "Yellow Garri", "Fabrics", "Home & Fragrance", "Bulk Supply", "Brand Story"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;
  const pricingGuide = pricingTiers.map((tier) => `${tier.rate} · ${tier.volume}`).join("  /  ");

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setZoom(1);
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setZoom(1);
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setZoom(1);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const handleShare = async () => {
    if (!activeLightboxItem) return;
    const shareData = {
      title: `${activeLightboxItem.title} | CHI-ZARAM`,
      text: activeLightboxItem.caption,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} (${window.location.href})`);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    } catch {
      // Ignore clipboard errors
    }
  };

  return (
    <SiteLayout activePath="/gallery">
      <SEOHead
        title="Visual Gallery & Product Photography"
        description="Explore high-resolution photography of CHI-ZARAM red palm oil packs, yellow garri, fabrics, and home essentials. Click any image to view details and enquire on WhatsApp."
        path="/gallery"
      />
      <main>
        <section className="inner-hero inner-hero--gallery">
          <div className="container inner-hero__grid">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Visual gallery</p>
              <h1>Good things are<br /><em>worth capturing.</em></h1>
              <p className="inner-hero__intro">Explore our high-resolution visual collection. Click any item in the gallery to inspect package details, pricing guides, and start an instant WhatsApp enquiry.</p>
            </div>
            <div className="inner-hero__visual">
              <img src={assetPath("/manus-storage/hero-960_46c9d711.jpg")} alt="CHI-ZARAM editorial brand visual" />
              <span className="inner-hero__stamp">Captured<br /><strong>authentically.</strong></span>
            </div>
          </div>
        </section>

        <section className="gallery-page section-pad">
          <div className="container">
            <div className="gallery-intro-story">
              <div className="section-kicker"><span className="section-kicker__number">01</span><span>Curated collection</span></div>
              <h2>Rooted in nature, <em>styled for everyday life.</em></h2>
              <p className="body-copy">From our flagship unrefined red palm oil and Delta State yellow garri to lifestyle apparel and home essentials, every image in our collection tells a story of quality, care, and direct connection. Select a category below to explore specific pack sizes, pricing guides, and brand chapters.</p>
            </div>
            <div className="gallery-filter-bar" role="tablist" aria-label="Gallery category filters">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="gallery-masonry">
              {filteredItems.map((item, index) => (
                <article className="gallery-item-card" key={item.id}>
                  <div className="gallery-item-card__media">
                    <img
                      src={item.src}
                      srcSet={`${item.mobileSrc} 480w, ${item.src} 960w`}
                      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={item.title}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = assetPath("/manus-storage/chi-zaram-gen-hero_3991ab64.jpg");
                      }}
                    />
                    <div className="gallery-item-card__overlay">
                      <span className="gallery-badge">{item.category}</span>
                      <button
                        type="button"
                        className="button button--white button--sm"
                        onClick={() => { setLightboxIndex(index); setZoom(1); }}
                      >
                        View large &amp; enquire <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="gallery-item-card__info">
                    <h3>{item.title}</h3>
                    <p>{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {activeLightboxItem && lightboxIndex !== null && (
          <div
            className="lightbox-backdrop"
            onClick={() => setLightboxIndex(null)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const diff = e.changedTouches[0].clientX - touchStartX.current;
              if (diff > 50) handlePrev();
              if (diff < -50) handleNext();
              touchStartX.current = null;
            }}
          >
            <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
              >
                <X size={22} />
              </button>

              <div className="lightbox-content-grid">
                <div className="lightbox-stage">
                  <div className="lightbox-viewport">
                    <img
                      className="lightbox-image"
                      src={activeLightboxItem.src}
                      alt={activeLightboxItem.title}
                      decoding="async"
                      style={{ transform: `scale(${zoom})` }}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = assetPath("/manus-storage/hero-960_46c9d711.jpg");
                      }}
                    />
                  </div>
                  <div className="lightbox-controls-bar">
                    <button type="button" className="lightbox-zoom-btn" onClick={() => setZoom((z) => Math.max(1, z - 0.5))} aria-label="Zoom out">
                      <ZoomOut size={16} />
                    </button>
                    <span className="lightbox-zoom-indicator">{Math.round(zoom * 100)}%</span>
                    <button type="button" className="lightbox-zoom-btn" onClick={() => setZoom((z) => Math.min(3, z + 0.5))} aria-label="Zoom in">
                      <ZoomIn size={16} />
                    </button>
                  </div>
                  <div className="lightbox-nav-arrows">
                    <button type="button" className="lightbox-arrow" onClick={handlePrev} aria-label="Previous image">
                      <ChevronLeft size={20} />
                    </button>
                    <button type="button" className="lightbox-arrow" onClick={handleNext} aria-label="Next image">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="lightbox-sidebar">
                  <div className="lightbox-sidebar-header">
                    <span className="gallery-badge">{activeLightboxItem.category}</span>
                    <span className="lightbox-counter">{lightboxIndex + 1} of {filteredItems.length}</span>
                  </div>
                  <h2>{activeLightboxItem.title}</h2>
                  <p className="lightbox-desc">{activeLightboxItem.caption}</p>

                  {activeLightboxItem.commercial && (
                    <div className="lightbox-commercial-box">
                      <div className="lightbox-commercial-row">
                        <span>Pack Format</span>
                        <strong>{activeLightboxItem.commercial.packSize}</strong>
                      </div>
                      <div className="lightbox-commercial-row">
                        <span>Price Guide</span>
                        <strong>{activeLightboxItem.commercial.priceGuide}</strong>
                      </div>
                      <div className="lightbox-commercial-row">
                        <span>Order Range</span>
                        <strong>{activeLightboxItem.commercial.orderRange}</strong>
                      </div>
                      <p className="lightbox-commercial-note">{activeLightboxItem.commercial.note}</p>
                    </div>
                  )}

                  <div className="lightbox-actions">
                    <a
                      className="button button--crimson"
                      href={whatsappHref(`Hello CHI-ZARAM, I am viewing the gallery item "${activeLightboxItem.title}" (${activeLightboxItem.category}). Please share current pricing, pack options, and availability.`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle size={16} /> Enquire on WhatsApp <ArrowUpRight size={15} />
                    </a>
                    <button
                      type="button"
                      className="button button--outline"
                      onClick={handleShare}
                    >
                      {shareFeedback ? <Check size={16} /> : <Share2 size={16} />}
                      <span>{shareFeedback ? "Link Copied!" : "Share Image"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="lightbox-thumbnails">
                <div className="lightbox-thumbnails-track">
                  {filteredItems.map((thumb, idx) => (
                    <button
                      type="button"
                      key={thumb.id}
                      className={`lightbox-thumb ${idx === lightboxIndex ? "active" : ""}`}
                      onClick={() => { setLightboxIndex(idx); setZoom(1); }}
                      aria-label={`Jump to ${thumb.title}`}
                    >
                      <img src={thumb.mobileSrc} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </SiteLayout>
  );
}
