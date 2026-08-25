/**
 * Harvest Editorial deployment paths: keep root hosting and the GitHub Pages
 * repository subpath in sync for internal routes, asset URLs, and social previews.
 */
const configuredBase = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
const browserBase = typeof window !== "undefined" && window.location.pathname.startsWith("/chi-zaram-enterprises")
  ? "/chi-zaram-enterprises"
  : "";

export const siteBase = browserBase || configuredBase;

export function assetPath(path: string) {
  return `${siteBase}${path.startsWith("/") ? path : `/${path}`}`;
}

export function routePath(path: string) {
  return `${siteBase}${path.startsWith("/") ? path : `/${path}`}`;
}
