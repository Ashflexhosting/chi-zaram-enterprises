/**
 * Harvest Editorial SEO helper: updates document title, meta description,
 * OpenGraph, Twitter card tags, and canonical links per route.
 */
import { useEffect } from "react";
import { assetPath, routePath } from "@/lib/sitePaths";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export default function SEOHead({ title, description, path, image = "/manus-storage/palm-oil-hero_b2969ba2.jpg" }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | CHI-ZARAM Palm Oil & More Enterprises`;

    const setMeta = (propertyAttr: string, propertyValue: string, content: string) => {
      let element = document.querySelector(`meta[${propertyAttr}="${propertyValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(propertyAttr, propertyValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", `${title} | CHI-ZARAM`);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", window.location.origin + routePath(path));
    const socialImage = window.location.origin + assetPath(image);
    setMeta("property", "og:image", socialImage);
    setMeta("property", "og:image:alt", "CHI-ZARAM palm-fruit emblem with the message Pure goodness. Naturally better.");
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", `${title} | CHI-ZARAM`);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", socialImage);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", window.location.origin + routePath(path));

    let scriptLd = document.querySelector('script[type="application/ld+json"]');
    if (!scriptLd) {
      scriptLd = document.createElement("script");
      scriptLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptLd);
    }
    const siteUrl = window.location.origin;
    const logoUrl = siteUrl + assetPath("/manus-storage/chizaram-logo-cz_cdd4320b.webp");
    const shopDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Shop 5 Faronbi Plaza, Opposite Isolo General Hospital, Lagos")}`;
    const openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    };
    const shopAddress = {
      "@type": "PostalAddress",
      "streetAddress": "Shop 5 Faronbi Plaza, Opposite Isolo General Hospital",
      "addressLocality": "Isolo",
      "addressRegion": "Lagos",
      "addressCountry": "NG"
    };
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          "name": "CHI-ZARAM Palm Oil & More Enterprises",
          "url": siteUrl,
          "logo": logoUrl,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+234-803-736-5227",
            "contactType": "sales",
            "availableLanguage": ["English"]
          },
          "sameAs": ["https://www.tiktok.com/@ogonwibe"]
        },
        {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#localbusiness`,
          "name": "CHI-ZARAM Palm Oil & More Enterprises",
          "description": "Palm oil, vegetable oil, and everyday consumer products from CHI-ZARAM in Isolo, Lagos.",
          "url": siteUrl,
          "logo": logoUrl,
          "telephone": "+234-803-736-5227",
          "parentOrganization": { "@id": `${siteUrl}/#organization` },
          "address": shopAddress,
          "hasMap": shopDirectionsUrl,
          "openingHoursSpecification": openingHoursSpecification
        }
      ]
    };
    scriptLd.textContent = JSON.stringify(structuredData);
  }, [title, description, path, image]);

  return null;
}
