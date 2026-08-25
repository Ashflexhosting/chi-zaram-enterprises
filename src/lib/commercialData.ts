/**
 * Harvest Editorial commercial vocabulary: pack formats and exact retail/wholesale pricing shared across product touchpoints.
 */
import { assetPath } from "@/lib/sitePaths";

export type PricingGuide = {
  tier: string;
  volume: string;
  rate: string;
  suitedTo: string;
};

export type PackVariant = {
  label: string;
  title: string;
  src: string;
  copy: string;
  pricing: PricingGuide;
  exactPrice: string;
};

export const packVariants: PackVariant[] = [
  {
    label: "1L",
    title: "Retail bottle",
    src: assetPath("/manus-storage/chi-zaram-pack-1l_6e672af6.jpg"),
    copy: "A practical entry size for household cooking and everyday retail shelves.",
    exactPrice: "₦2,500",
    pricing: { tier: "Retail / Wholesale", volume: "1 unit+", rate: "₦2,500", suitedTo: "Households and direct consumers" },
  },
  {
    label: "3L",
    title: "Family pack",
    src: assetPath("/manus-storage/chi-zaram-pack-3l_733459fa.jpg"),
    copy: "A family-size option for regular kitchens and small food businesses.",
    exactPrice: "₦8,500",
    pricing: { tier: "Retail / Wholesale", volume: "1 unit+", rate: "₦8,500", suitedTo: "Family kitchens and small food businesses" },
  },
  {
    label: "5L",
    title: "Value jerrycan",
    src: assetPath("/manus-storage/chi-zaram-pack-5l_b3198c6e.jpg"),
    copy: "The documented flagship household size for lasting everyday value.",
    exactPrice: "₦12,500",
    pricing: { tier: "Retail / Wholesale", volume: "1 unit+", rate: "₦12,500", suitedTo: "Shops, vendors, and regular household use" },
  },
  {
    label: "25L",
    title: "Wholesale container",
    src: assetPath("/manus-storage/chi-zaram-pack-bulk_ffbd7e5f.jpg"),
    copy: "Bulk jerrycan packaging built for resellers, caterers, and distributors.",
    exactPrice: "₦60,000",
    pricing: { tier: "Wholesale & Retail", volume: "Bulk / carton", rate: "₦60,000", suitedTo: "Resellers, caterers, and commercial distributors" },
  },
];

export const pricingTiers: PricingGuide[] = [
  { tier: "1 Liter", volume: "Retail bottle", rate: "₦2,500", suitedTo: "Individual household cooking & single units" },
  { tier: "3 Liters", volume: "Family pack", rate: "₦8,500", suitedTo: "Regular family kitchens & everyday meals" },
  { tier: "5 Liters", volume: "Value jerrycan", rate: "₦12,500", suitedTo: "Extended family use & pantry restocking" },
  { tier: "25 Liters", volume: "Wholesale container", rate: "₦60,000", suitedTo: "Resellers, caterers & commercial distribution (Wholesale & Retail Available)" },
];
