"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { scrollToHash } from "@/lib/navigation";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToHash(href);
      }}
      className="type-caption text-gray-400 hover:text-[var(--primary)] transition-colors py-1"
    >
      {children}
    </a>
  );
}

export function PageFooter() {
  return (
    <footer
      className="page-section mx-4 md:mx-auto md:mobile-card-none md:bg-[#111] border border-[var(--glass-border)] md:border-t md:border-x-0 md:rounded-none w-auto md:w-full py-8 md:py-16 px-5 md:px-12 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 max-w-7xl"
    >
      <ScrollReveal direction="up" delay={0}>
        <div className="flex flex-col gap-3 md:gap-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#top");
            }}
            className="type-h3 hover:text-[var(--primary)] transition-colors"
          >
            Aura Business Solution
          </a>
          <p className="type-caption text-gray-400 max-w-xs">
            © 2026 Aura Business Solution. Precision in every pixel.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <div className="flex flex-wrap gap-8 md:gap-16 w-full md:w-auto">
          <div className="flex flex-col gap-2.5 md:gap-3 flex-1 min-w-[120px]">
            <span className="type-caption font-semibold text-[var(--foreground)]">Products</span>
            <FooterLink href="#pos">POS Suite</FooterLink>
            <FooterLink href="#crm">CRM Pro</FooterLink>
            <FooterLink href="#school">School Management</FooterLink>
          </div>
          <div className="flex flex-col gap-2.5 md:gap-3 flex-1 min-w-[120px]">
            <span className="type-caption font-semibold text-[var(--foreground)]">Company</span>
            <FooterLink href="#contact">Contact</FooterLink>
            <FooterLink href="#testimonials">Testimonials</FooterLink>
            <FooterLink href="#pricing">Pricing</FooterLink>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
