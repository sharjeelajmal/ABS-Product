"use client";

import { useEffect, useState } from "react";
import { getActiveSection, type SectionId } from "@/lib/navigation";

export function useScrollSpy() {
  const [active, setActive] = useState<SectionId>("top");

  useEffect(() => {
    const update = () => setActive(getActiveSection());

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    window.addEventListener("nav:product", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("nav:product", update);
    };
  }, []);

  return active;
}
