export const PRODUCT_IDS = ["pos", "crm", "school"] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export const SECTION_IDS = [
  "top",
  "services",
  "solutions",
  "pricing",
  "testimonials",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const NAV_LINKS = [
  { label: "Services", href: "#services", id: "services" as const },
  { label: "Solutions", href: "#solutions", id: "solutions" as const },
  { label: "Pricing", href: "#pricing", id: "pricing" as const },
  { label: "Testimonials", href: "#testimonials", id: "testimonials" as const },
  { label: "Contact", href: "#contact", id: "contact" as const },
] as const;

export const MOBILE_NAV = [
  { label: "Home", href: "#top", id: "top" as const },
  ...NAV_LINKS,
] as const;

export function isProductId(id: string): id is ProductId {
  return PRODUCT_IDS.includes(id as ProductId);
}

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "") || "top";

  if (id === "top") {
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (isProductId(id)) {
    window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new CustomEvent("nav:product", { detail: id }));
    const solutions = document.getElementById("solutions");
    if (solutions) {
      solutions.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  window.history.pushState(null, "", `#${id}`);

  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

export function getActiveSection(): SectionId {
  const hash = window.location.hash.replace("#", "");
  if (isProductId(hash)) return "solutions";

  if (window.scrollY < 80) return "top";

  const scrollY = window.scrollY + 160;
  let current: SectionId = "top";

  for (const id of SECTION_IDS) {
    if (id === "top") continue;
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) {
      current = id;
    }
  }

  return current;
}
