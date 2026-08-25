/**
 * Harvest Editorial story page: source-backed brand narrative, warm pacing,
 * practical product context, and SEO metadata.
 */
import { ArrowUpRight, Check, Leaf, Sparkles } from "lucide-react";
import { assetPath } from "@/lib/sitePaths";
import { Link } from "wouter";
import SiteLayout from "@/components/SiteLayout";
import SEOHead from "@/components/SEOHead";

export default function Story() {
  return (
    <SiteLayout activePath="/story">
      <SEOHead
        title="Our Story & Brand Values"
        description="Discover the story behind CHI-ZARAM Palm Oil & More Enterprises. Explore our commitment to purity, family value, quality-minded consumer products, and direct ordering."
        path="/story"
      />
      <main>
        <section className="inner-hero inner-hero--story">
          <div className="container inner-hero__grid">
            <div>
              <p className="eyebrow"><span className="eyebrow__line" /> Our story</p>
              <h1>A brand with room<br /><em>to grow.</em></h1>
              <p className="inner-hero__intro">CHI-ZARAM is a Nigerian consumer-products and retail/bulk-supply brand focused on bringing quality everyday products closer to customers.</p>
            </div>
            <div className="inner-hero__visual">
              <img src={assetPath("/manus-storage/story-team-palm-oil-sharp_103a02c5.jpeg")} alt="CHI-ZARAM team member presenting palm oil pack sizes alongside retail and bulk containers" />
              <span className="inner-hero__stamp">Rooted<br /><strong>here.</strong></span>
            </div>
          </div>
        </section>

        <section className="story-page-section story-page-section--dark section-pad">
          <div className="container story-page-grid">
            <div className="section-kicker"><span className="section-kicker__number">01</span><span>What we believe</span></div>
            <div className="story-page-copy">
              <p className="eyebrow">Good goods, honestly presented</p>
              <h2>Quality everyday goods, <em>closer to home.</em></h2>
              <p className="body-copy">Our range begins with products people use, share, and return to: red palm oil, vegetable oil, groundnut oil, fabrics, cleaning essentials, and oil perfumes. We are building a master brand that makes everyday buying feel more considered without making it complicated.</p>
              <div className="story-page-actions">
                <div className="story-page-callout" style={{ marginTop: 0 }}>
                  <Sparkles size={19} />
                  <span>One master brand.<br /><strong>Many ways to live well.</strong></span>
                </div>
                <Link className="button button--gold button--sm" href="/catalogue">
                  Explore our products <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="story-human section-pad">
          <div className="container story-human__grid">
            <div className="story-human__visual">
              <img src={assetPath("/manus-storage/story-team-palm-oil-sharp_103a02c5.jpeg")} alt="CHI-ZARAM team member presenting palm oil pack sizes alongside retail and bulk containers" loading="lazy" />
              <span className="story-human__tag">The people behind the source</span>
            </div>
            <div className="story-human__copy">
              <div className="section-kicker"><span className="section-kicker__number">02</span><span>From source to supply</span></div>
              <p className="eyebrow">Good products need good people</p>
              <h2>There is a face behind <em>every good order.</em></h2>
              <p className="body-copy">From family bottles to larger supply formats, CHI-ZARAM is built around real conversations with the people who cook, sell, share, and grow with our products. This is the human side of a brand made to stay close to everyday life.</p>
              <div className="story-founder-card">
                <div className="story-founder-card__role">Founder &amp; Principal — Nwibe Ogochukwu Ekene</div>
                <h3>Led by commitment to quality and community trust.</h3>
                <p>“We started CHI-ZARAM to ensure that every household and business looking for pure palm oil and everyday essentials has a direct, reliable partner they can trust.”</p>
              </div>
              <p className="story-human__note">Retail, reseller, and bulk enquiries are welcomed directly on WhatsApp.</p>
              <Link className="text-link" href="/bulk-supply">Talk to the supply team <ArrowUpRight size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="story-values section-pad">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">The CHI-ZARAM standard</p>
                <h2>Chosen with care,<br /><em>shared with confidence.</em></h2>
              </div>
              <p className="section-heading__aside">Every product line is presented with the same promise: practical value, clear communication, and a direct path from enquiry to dispatch.</p>
            </div>
            <div className="story-values-grid">
              <article>
                <Leaf size={20} />
                <span>01</span>
                <h3>Quality-minded</h3>
                <p>We keep quality, purity, and dependable presentation at the center of the customer experience.</p>
              </article>
              <article>
                <Check size={20} />
                <span>02</span>
                <h3>Family value</h3>
                <p>Pack sizes and supply options are shaped around households, retailers, resellers, and growing businesses.</p>
              </article>
              <article>
                <ArrowUpRight size={20} />
                <span>03</span>
                <h3>Direct ordering</h3>
                <p>WhatsApp gives customers a simple way to confirm availability, pricing, quantities, and delivery options.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="story-quote section-pad">
          <div className="container story-quote__inner">
            <p className="eyebrow eyebrow--gold">Our point of view</p>
            <blockquote>“Pure goodness is not only about where a product begins. It is also about how clearly it reaches the people who need it.”</blockquote>
            <span>— CHI-ZARAM, Palm Oil &amp; More</span>
            <Link className="button button--gold" href="/catalogue">Explore what we carry <ArrowUpRight size={17} /></Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
