/**
 * Harvest Editorial packs and pricing page: pack-size clarity, interactive multi-pack calculator
 * with customer contact fields, phone validation, zone-based delivery fees, printable order summary, and WhatsApp export.
 */
import { useState, useMemo, useEffect } from "react";
import { ArrowUpRight, Check, Calculator, MessageCircle, MapPin, Truck, User, Phone, Printer, FileText, X, AlertCircle } from "lucide-react";
import { assetPath } from "@/lib/sitePaths";
import SiteLayout, { whatsappHref } from "@/components/SiteLayout";
import SEOHead from "@/components/SEOHead";
import { packVariants, pricingTiers } from "@/lib/commercialData";

type PackKey = "1L" | "3L" | "5L" | "25L";

const packPrices: Record<PackKey, number> = {
  "1L": 2500,
  "3L": 8500,
  "5L": 12500,
  "25L": 60000,
};

const packNames: Record<PackKey, string> = {
  "1L": "1L Retail bottle",
  "3L": "3L Family pack",
  "5L": "5L Value jerrycan",
  "25L": "25L Wholesale container",
};

const deliveryZones: Record<string, { name: string; fee: number }> = {
  "Isolo, Lagos (Depot)": { name: "Isolo, Lagos (Depot)", fee: 1500 },
  "Ikeja / Oshodi, Lagos": { name: "Ikeja / Oshodi, Lagos", fee: 2500 },
  "Surulere / Yaba, Lagos": { name: "Surulere / Yaba, Lagos", fee: 2500 },
  "Lekki / Victoria Island, Lagos": { name: "Lekki / Victoria Island, Lagos", fee: 4000 },
  "Ajah / Epe, Lagos": { name: "Ajah / Epe, Lagos", fee: 4500 },
  "Ikorodu / Ojota, Lagos": { name: "Ikorodu / Ojota, Lagos", fee: 3500 },
  "Abuja (FCT) / Interstate Depot": { name: "Abuja (FCT) / Interstate Depot", fee: 8500 },
  "Port Harcourt / Rivers State": { name: "Port Harcourt / Rivers State", fee: 9000 },
  "Other / Custom Location": { name: "Other / Custom Location", fee: 3000 },
};

export default function PacksPricing() {
  const [quantities, setQuantities] = useState<Record<PackKey, number>>({
    "1L": 0,
    "3L": 0,
    "5L": 0,
    "25L": 0,
  });
  const [selectedPreset, setSelectedPreset] = useState<string>("Isolo, Lagos (Depot)");
  const [customLocation, setCustomLocation] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [phoneTouched, setPhoneTouched] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.hash !== "#calculator") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleQtyChange = (key: PackKey, val: string) => {
    const num = parseInt(val, 10);
    setQuantities((prev) => ({
      ...prev,
      [key]: isNaN(num) || num < 0 ? 0 : num,
    }));
  };

  const effectiveLocation = useMemo(() => {
    if (selectedPreset === "Other / Custom Location") {
      return customLocation.trim() || "Custom Delivery Location";
    }
    return selectedPreset;
  }, [selectedPreset, customLocation]);

  const deliveryFee = useMemo(() => {
    return deliveryZones[selectedPreset]?.fee || 3000;
  }, [selectedPreset]);

  // Phone validation: allows Nigerian numbers (0803..., +234..., 10-11 digits) or general phone strings >= 7 digits
  const isPhoneValid = useMemo(() => {
    const clean = customerPhone.replace(/[\s\-\(\)\+]/g, "");
    return clean.length >= 7 && /^\d+$/.test(clean);
  }, [customerPhone]);

  const { totalUnits, itemsTotal, appliedDeliveryFee, finalTotal, whatsAppMessage } = useMemo(() => {
    let units = 0;
    let sub = 0;
    const summaryParts: string[] = [];

    (Object.keys(quantities) as PackKey[]).forEach((key) => {
      const q = quantities[key];
      if (q > 0) {
        units += q;
        const lineSub = q * packPrices[key];
        sub += lineSub;
        summaryParts.push(`${q} x ${packNames[key]} (₦${packPrices[key].toLocaleString()} ea = ₦${lineSub.toLocaleString()})`);
      }
    });

    const appliedFee = sub > 0 ? deliveryFee : 0;
    const total = sub > 0 ? sub + appliedFee : 0;
    const nameStr = customerName.trim() ? `Customer Name: ${customerName.trim()}` : "";
    const phoneStr = customerPhone.trim() ? `Phone: ${customerPhone.trim()}` : "";

    const contactLine = [nameStr, phoneStr].filter(Boolean).join(" | ");

    const msg = summaryParts.length > 0
      ? `Hello CHI-ZARAM, I would like to order/enquire about the following multi-pack combination:\n\n${summaryParts.join("\n")}\n\nProducts Subtotal: ₦${sub.toLocaleString()}\nEstimated Delivery Fee (${effectiveLocation}): ₦${appliedFee.toLocaleString()}\nTotal Estimated Cost: ₦${total.toLocaleString()} (${units} total units).\nDelivery Destination: ${effectiveLocation}\n${contactLine ? contactLine + "\n" : ""}\nPlease confirm availability, final delivery logistics, and payment details.`
      : `Hello CHI-ZARAM, I would like to inquire about red palm oil wholesale and retail pack pricing (1L ₦2,500, 3L ₦8,500, 5L ₦12,500, 25L ₦60,000). Delivery Destination: ${effectiveLocation}.\n${contactLine ? contactLine + "\n" : ""}Please share availability and delivery options.`;

    return { totalUnits: units, itemsTotal: sub, appliedDeliveryFee: appliedFee, finalTotal: total, whatsAppMessage: msg };
  }, [quantities, effectiveLocation, deliveryFee, customerName, customerPhone]);

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPhoneTouched(true);
    if (!isPhoneValid) {
      e.preventDefault();
      alert("Please enter a valid phone number (at least 7 digits) before submitting your WhatsApp enquiry.");
    }
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <SiteLayout activePath="/packs-pricing">
      <SEOHead
        title="Pack Sizes & Wholesale Price Guide with Cost Calculator"
        description="Explore CHI-ZARAM red palm oil pack formats (1L, 3L, 5L, and bulk), calculate custom order estimates with automatic delivery fees and phone validation, and order via WhatsApp."
        path="/packs-pricing"
      />
      <main>
        <section className="inner-hero inner-hero--pricing">
          <div className="container inner-hero__grid">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Packs &amp; pricing</p>
              <h1>Built for households,<br /><em>priced for value.</em></h1>
              <p className="inner-hero__intro">Choose the pack format and supply level that fits your need. Final rates are confirmed directly because availability, location, and logistics can affect delivered pricing.</p>
            </div>
            <div className="inner-hero__visual">
              <img src={assetPath("/manus-storage/chi-zaram-pack-5l_b3198c6e.jpg")} alt="CHI-ZARAM five litre palm oil value pack" />
              <span className="inner-hero__stamp">Pack<br /><strong>your way.</strong></span>
            </div>
          </div>
        </section>

        <section className="pack-page section-pad">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Palm oil formats</p>
                <h2>One trusted line,<br /><em>four useful ways.</em></h2>
              </div>
              <p className="section-heading__aside">Select the format that matches your kitchen, shelf, shop, restaurant, or distribution plan. Product availability is confirmed on enquiry.</p>
            </div>
            <div className="pack-variant-page-grid">
              {packVariants.map((pack) => (
                <article className="pack-variant-page-card" key={pack.label}>
                  <div className="pack-variant-page-card__image">
                    <img src={pack.src} alt={`${pack.label} ${pack.title}`} loading="lazy" />
                  </div>
                  <div className="pack-variant-page-card__body">
                    <div className="pack-variant-header">
                      <span>{pack.label}</span>
                      <strong className="pack-variant-price">{pack.exactPrice}</strong>
                    </div>
                    <h3>{pack.title}</h3>
                    <p>{pack.copy}</p>
                    <a className="text-link" href={whatsappHref(`Hello CHI-ZARAM, I would like to enquire about the ${pack.label} ${pack.title} red palm oil pack. Please share current pricing and availability.`)} target="_blank" rel="noreferrer">
                      Ask about this pack <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Quick Multi-Pack Calculator */}
            <div className="pack-calculator-section" id="calculator">
              <div className="pack-calculator-header">
                <p className="eyebrow"><Calculator size={14} /> Multi-pack cost estimator</p>
                <h3>Calculate your order in seconds</h3>
                <p>Enter your desired quantities for each pack size below, add your contact details (with phone verification) and delivery zone for automatic shipping calculations, and review your order summary before submitting via WhatsApp.</p>
              </div>

              {/* Customer Contact Inputs */}
              <div className="pack-calculator-contacts">
                <div className="pack-calc-field">
                  <label htmlFor="calc-customer-name">
                    <User size={14} /> Full Name or Business Name
                  </label>
                  <input
                    id="calc-customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Mrs. Chioma Okeke or Green Valley Stores"
                    aria-label="Full Name or Business Name"
                  />
                </div>
                <div className="pack-calc-field">
                  <label htmlFor="calc-customer-phone">
                    <Phone size={14} /> Phone Number (WhatsApp / Mobile) *
                  </label>
                  <input
                    id="calc-customer-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      if (!phoneTouched) setPhoneTouched(true);
                    }}
                    onBlur={() => setPhoneTouched(true)}
                    placeholder="e.g. 0803 736 5227"
                    aria-label="Phone Number"
                    className={phoneTouched && !isPhoneValid ? "input-error" : ""}
                  />
                  {phoneTouched && !isPhoneValid && (
                    <small className="field-error-text">
                      <AlertCircle size={12} /> Please enter a valid phone number (at least 7 digits).
                    </small>
                  )}
                </div>
              </div>

              <div className="pack-calculator-grid">
                {(["1L", "3L", "5L", "25L"] as PackKey[]).map((key) => {
                  const unitPrice = packPrices[key];
                  const count = quantities[key];
                  const subtotal = count * unitPrice;
                  return (
                    <div className="pack-calc-card" key={key}>
                      <div className="pack-calc-card__top">
                        <span>{key}</span>
                        <strong>₦{unitPrice.toLocaleString()} ea</strong>
                      </div>
                      <label htmlFor={`calc-${key}`}>{packNames[key].split(" ")[1]}</label>
                      <input
                        id={`calc-${key}`}
                        type="number"
                        min="0"
                        max="999"
                        value={count}
                        onChange={(e) => handleQtyChange(key, e.target.value)}
                        aria-label={`Quantity of ${key} packs`}
                      />
                      <div className="pack-calc-card__subtotal">
                        Subtotal: <strong>₦{subtotal.toLocaleString()}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Zone Presets & Custom Location */}
              <div className="pack-calculator-location">
                <div className="pack-calculator-location__row">
                  <div>
                    <label htmlFor="calc-delivery-preset">
                      <Truck size={14} /> Select Delivery Zone / Area (Includes Dynamic Fee)
                    </label>
                    <select
                      id="calc-delivery-preset"
                      value={selectedPreset}
                      onChange={(e) => setSelectedPreset(e.target.value)}
                      aria-label="Delivery Zone Preset"
                    >
                      {Object.keys(deliveryZones).map((zoneKey) => (
                        <option key={zoneKey} value={zoneKey}>
                          {zoneKey} (Est. Fee: ₦{deliveryZones[zoneKey].fee.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedPreset === "Other / Custom Location" && (
                  <div className="pack-calculator-custom-input">
                    <label htmlFor="calc-custom-location">
                      <MapPin size={14} /> Enter Specific Town, Street or Landmark
                    </label>
                    <input
                      id="calc-custom-location"
                      type="text"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="e.g. Festac Town, Lagos or Asaba, Delta State"
                      aria-label="Custom Delivery Location"
                    />
                  </div>
                )}
              </div>

              <div className="pack-calculator-summary">
                <div className="pack-calculator-totals">
                  <span>Estimated total with delivery</span>
                  <strong>₦{finalTotal.toLocaleString()}</strong>
                  <small>
                    Products: ₦{itemsTotal.toLocaleString()} + Delivery ({effectiveLocation}): ₦{appliedDeliveryFee.toLocaleString()} ({totalUnits} units)
                  </small>
                </div>
                <div className="pack-calculator-actions-group">
                  <button
                    type="button"
                    className="button button--outline"
                    onClick={() => setShowSummaryModal(true)}
                  >
                    <FileText size={16} /> Review Order Summary
                  </button>
                  <a
                    className={`button button--crimson ${!isPhoneValid ? "button--disabled" : ""}`}
                    href={whatsappHref(whatsAppMessage)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle size={16} /> Submit via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Printable Order Review Modal / Dialog */}
        {showSummaryModal && (
          <div className="order-modal-overlay" onClick={() => setShowSummaryModal(false)}>
            <div className="order-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="order-modal-header">
                <div>
                  <span className="eyebrow">CHI-ZARAM FOODS</span>
                  <h3>Provisional Order Summary</h3>
                </div>
                <button
                  type="button"
                  className="order-modal-close"
                  onClick={() => setShowSummaryModal(false)}
                  aria-label="Close Summary"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="order-modal-body">
                <div className="order-receipt-box">
                  <div className="order-receipt-meta">
                    <div>
                      <strong>Date:</strong> {new Date().toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                    </div>
                    <div>
                      <strong>Customer:</strong> {customerName.trim() || "Valued Customer"}
                    </div>
                    <div>
                      <strong>Phone:</strong> {customerPhone.trim() || "Not provided"}
                    </div>
                    <div>
                      <strong>Destination:</strong> {effectiveLocation}
                    </div>
                  </div>

                  <table className="order-receipt-table">
                    <thead>
                      <tr>
                        <th>Pack Description</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(["1L", "3L", "5L", "25L"] as PackKey[]).map((key) => {
                        const q = quantities[key];
                        if (q <= 0) return null;
                        const sub = q * packPrices[key];
                        return (
                          <tr key={key}>
                            <td>{packNames[key]}</td>
                            <td>{q}</td>
                            <td>₦{packPrices[key].toLocaleString()}</td>
                            <td>₦{sub.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                      {totalUnits === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">
                            No packs selected yet. Adjust quantities in the calculator.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <div className="order-receipt-totals">
                    <div><span>Products Subtotal:</span><strong>₦{itemsTotal.toLocaleString()}</strong></div>
                    <div><span>Estimated Delivery Fee:</span><strong>₦{appliedDeliveryFee.toLocaleString()}</strong></div>
                    <div className="order-receipt-grand"><span>Estimated Grand Total:</span><strong>₦{finalTotal.toLocaleString()}</strong></div>
                  </div>
                </div>

                <p className="order-modal-note">
                  This summary is a preliminary cost estimate. Final availability, exact delivery schedules, and payment instructions will be confirmed directly with our sales desk on WhatsApp.
                </p>
              </div>

              <div className="order-modal-footer">
                <button
                  type="button"
                  className="button button--outline"
                  onClick={handlePrintSummary}
                >
                  <Printer size={16} /> Print / Save PDF
                </button>
                <a
                  className={`button button--crimson ${!isPhoneValid ? "opacity-60" : ""}`}
                  href={whatsappHref(whatsAppMessage)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    setPhoneTouched(true);
                    if (!isPhoneValid) {
                      e.preventDefault();
                      alert("Please enter a valid phone number before submitting your WhatsApp enquiry.");
                      return;
                    }
                    setShowSummaryModal(false);
                  }}
                >
                  <MessageCircle size={16} /> Send This Summary via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        <section className="pricing-section section-pad">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Wholesale price guide</p>
                <h2>More volume,<br /><em>better value.</em></h2>
              </div>
              <p className="section-heading__aside">The guide below explains the supply structure for red palm oil and vegetable oil. Current prices, minimum order quantities, and delivered costs are confirmed on WhatsApp.</p>
            </div>
            <div className="multi-page-price-table">
              <table>
                <thead>
                  <tr>
                    <th>Supply tier</th>
                    <th>Order volume</th>
                    <th>Guide rate</th>
                    <th>Best suited to</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers.map((tier) => (
                    <tr key={tier.tier}>
                      <td><strong>{tier.tier}</strong></td>
                      <td>{tier.volume}</td>
                      <td><span>{tier.rate}</span><small>Confirm on WhatsApp</small></td>
                      <td>{tier.suitedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pricing-availability-banner">
              <strong>(Wholesale &amp; Retail Available)</strong>
              <span>Direct delivery &amp; depot pickup options available for all pack volumes.</span>
            </div>
            <div className="pricing-page-actions">
              <span><Check size={16} /> Wholesale &amp; Retail Available</span>
              <a className="button button--crimson" href={whatsappHref("Hello CHI-ZARAM Wholesale Desk, I would like the current red palm oil and vegetable oil rate card (1L ₦2,500, 3L ₦8,500, 5L ₦12,500, 25L ₦60,000). Please share MOQ and delivery options.")} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Request the current rate card
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
