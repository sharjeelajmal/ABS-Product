"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { scrollToHash } from "@/lib/navigation";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden pb-0 pt-4 md:pt-12 px-4 md:px-12 min-h-[calc(100dvh-5rem)] md:min-h-[90vh]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="md:hidden mobile-card p-5 mb-4">
          <ScrollReveal direction="scale" delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[var(--glass-border)] type-eyebrow text-gray-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Let&apos;s Grow Together
            </div>
            <h1 className="type-h1 mb-3">
              Custom Software for{" "}
              <span className="text-[var(--primary)] italic">Modern Business</span>
            </h1>
            <p className="type-body-muted">
              Precision-engineered POS, CRM &amp; ERP systems. Built for scale, crafted for elegance.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <ScrollReveal direction="up" delay={0} className="hidden md:block space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] type-eyebrow text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              Let&apos;s Grow Together
            </div>
            <h1 className="type-h1">
              Custom Software Solutions for{" "}
              <span className="italic text-[var(--primary)]">Modern Business</span>
            </h1>
            <p className="type-body-muted max-w-xl">
              Empower your enterprise with precision-engineered POS, CRM, and ERP systems. Designed for scale, crafted for elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <HeroButton primary onClick={() => scrollToHash("#solutions")}>View Live Demo</HeroButton>
              <HeroButton onClick={() => scrollToHash("#contact")}>Get a Free Consultation</HeroButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <div className="mobile-card md:bg-transparent md:border-0 md:p-0 md:rounded-none p-4 md:p-0">
              <div className="relative w-full aspect-[4/3] md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
                <div className="relative w-full max-w-lg md:transform md:hover:scale-105 transition-transform duration-700">
                  <img
                    alt="Aura Business Solution Dashboard Interface"
                    className="w-full h-auto rounded-2xl shadow-2xl border border-white/15"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIiupbReqH4wSHOy9o15h0-tQ5Gi1UrSSwp5ObmxhLoI0PFUi2SOmgjRpH1M4_-idkGDiDAb6lZN8PC9pkUlsH5MmdJg5TdqoiV_g9f5T3w2CgeXGHeFcXh7XK0PoBagIOONGL0aeVECLebWheivnA-FzrY_9dzhn0xiBqH8H4hh7FoJxe-En73V6Or96NFN_2f9z731UEXCKA2JxG9EpSVyE9AHxLFhBm4N168k8_UB3429MlPDs4bs9QFqXVhqy2Hriul0PJtLM"
                  />
                  <div className="absolute -left-1 sm:-left-8 top-1/4 bg-[var(--glass-bg)] backdrop-blur-2xl p-2.5 sm:p-4 rounded-xl border border-[var(--glass-border)] animate-float delay-100">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="bg-[var(--primary)]/10 text-[var(--primary)] p-1.5 sm:p-2 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                      </span>
                      <div>
                        <p className="type-caption font-semibold text-[var(--foreground)]">+45% Revenue</p>
                        <p className="type-eyebrow text-gray-400">This Quarter</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-1 sm:-right-12 bottom-1/4 bg-[var(--glass-bg)] backdrop-blur-2xl p-2.5 sm:p-4 rounded-xl border border-[var(--glass-border)] animate-float delay-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--primary)] flex items-center justify-center border-2 border-[var(--background)] text-black">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-500 flex items-center justify-center border-2 border-[var(--background)] text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                      </div>
                      <div>
                        <p className="type-caption font-semibold text-[var(--foreground)]">120+ Clients</p>
                        <p className="type-eyebrow text-gray-400">Active Global</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} className="md:hidden flex flex-col gap-3 pt-2">
            <HeroButton primary fullWidth onClick={() => scrollToHash("#solutions")}>View Live Demo</HeroButton>
            <HeroButton fullWidth onClick={() => scrollToHash("#contact")}>Get a Free Consultation</HeroButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function HeroButton({
  children,
  primary,
  fullWidth,
  onClick,
}: {
  children: ReactNode;
  primary?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  if (primary) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative group overflow-hidden bg-[var(--primary)] text-black px-6 py-4 rounded-2xl md:rounded-full type-btn transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,255,0,0.3)] border border-[var(--primary)] ${fullWidth ? "w-full" : "w-full sm:w-auto"}`}
      >
        <div className="absolute inset-0 w-0 bg-[#111] transition-all duration-[400ms] ease-out group-hover:w-full z-0" />
        <span className="relative z-10 flex items-center gap-2 group-hover:text-[var(--primary)] transition-colors duration-300">
          {children}
          <ArrowIcon />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative group overflow-hidden bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] text-[var(--foreground)] px-6 py-4 rounded-2xl md:rounded-full type-btn transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${fullWidth ? "w-full" : "w-full sm:w-auto"}`}
    >
      <div className="absolute inset-0 w-0 bg-[var(--primary)] transition-all duration-[400ms] ease-out group-hover:w-full z-0" />
      <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
        {children}
        <ArrowIcon />
      </span>
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
