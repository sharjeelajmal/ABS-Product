"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[var(--primary)]"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ text, image, name, role }: TestimonialItem) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="group relative z-0 hover:z-20 p-5 rounded-2xl border border-[var(--glass-border)] bg-gradient-to-b from-[#111113] to-[#0a0a0c] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[var(--primary)]/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_32px_rgba(197,255,0,0.08)] max-w-[280px] w-full cursor-default overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/[0.04] rounded-full blur-2xl pointer-events-none group-hover:bg-[var(--primary)]/[0.08] transition-colors duration-500" />

      <div className="flex items-start justify-between gap-3 mb-3 relative">
        <Stars />
        <span className="text-3xl leading-none text-[var(--primary)]/20 group-hover:text-[var(--primary)]/35 transition-colors font-serif select-none" aria-hidden>
          &ldquo;
        </span>
      </div>

      <p className="type-caption text-gray-400 leading-relaxed line-clamp-4 relative">{text}</p>

      <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/[0.06] relative">
        <div className="relative shrink-0">
          <Image
            src={image}
            alt={name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-[var(--primary)]/20 group-hover:ring-[var(--primary)]/40 transition-all"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-[#0a0a0c]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--foreground)] truncate">{name}</p>
          <p className="type-eyebrow text-gray-500 truncate">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={cn("overflow-hidden h-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={cn(
          "testimonials-marquee flex flex-col gap-[10px] pb-[10px]",
          paused && "is-paused"
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map((item, i) => (
              <TestimonialCard key={`${index}-${i}`} {...item} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
