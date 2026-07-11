"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconClock,
  IconSend,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const services = [
  "POS System",
  "CRM Software",
  "School Management",
  "Custom Software",
  "Not Sure Yet",
] as const;

type Service = (typeof services)[number];

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: Service;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "Not Sure Yet",
  message: "",
};

const contactMethods = [
  {
    icon: IconMail,
    label: "Email Us",
    value: "hello@aurabusiness.com",
    href: "mailto:hello@aurabusiness.com",
  },
  {
    icon: IconPhone,
    label: "Call Us",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
  },
  {
    icon: IconMapPin,
    label: "Visit Us",
    value: "Karachi, Pakistan",
    href: "#",
  },
  {
    icon: IconClock,
    label: "Response Time",
    value: "Within 24 hours",
    href: "#",
  },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = "Please enter your name";
  else if (data.name.trim().length < 2) errors.name = "Name is too short";

  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";

  if (data.phone && !/^[\d\s+\-()]{7,}$/.test(data.phone))
    errors.phone = "Enter a valid phone number";

  if (!data.message.trim()) errors.message = "Tell us about your project";
  else if (data.message.trim().length < 20)
    errors.message = "Please add a bit more detail (20+ characters)";

  return errors;
}

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  error,
  onChange,
  onBlur,
  optional,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  optional?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        placeholder=" "
        className={cn(
          "peer w-full rounded-xl border bg-[#0a0a0c]/80 px-4 pt-6 pb-2.5 text-[var(--foreground)] outline-none transition-all duration-300",
          "placeholder-transparent",
          error
            ? "border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
            : "border-[var(--glass-border)] focus:border-[var(--primary)]/60 focus:shadow-[0_0_0_3px_rgba(197,255,0,0.1)]"
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200",
          active
            ? "top-2 text-[0.6875rem] font-medium tracking-wide uppercase"
            : "top-1/2 -translate-y-1/2 text-sm",
          error
            ? "text-red-400"
            : active
              ? "text-[var(--primary)]"
              : "text-gray-500"
        )}
      >
        {label}
        {optional && !active && (
          <span className="normal-case tracking-normal text-gray-600 ml-1">(optional)</span>
        )}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactMethodCard({
  icon: Icon,
  label,
  value,
  href,
  delay,
}: {
  icon: typeof IconMail;
  label: string;
  value: string;
  href: string;
  delay: number;
}) {
  const inner = (
    <div className="group flex items-start gap-4 p-4 rounded-2xl border border-[var(--glass-border)] bg-[#0c0c0e]/60 hover:bg-[#111114]/80 hover:border-[var(--primary)]/25 transition-all duration-300">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] group-hover:scale-105 transition-transform duration-300">
        <Icon size={18} stroke={1.75} />
      </div>
      <div className="min-w-0">
        <p className="type-eyebrow text-gray-500 mb-0.5">{label}</p>
        <p className="type-caption font-medium text-[var(--foreground)] truncate">{value}</p>
      </div>
      {href !== "#" && (
        <IconArrowRight
          size={16}
          className="shrink-0 ml-auto text-gray-600 group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all duration-300 mt-1"
        />
      )}
    </div>
  );

  return (
    <ScrollReveal direction="up" delay={delay}>
      {href !== "#" ? (
        <a href={href} className="block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </ScrollReveal>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-12 px-6 min-h-[420px]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        >
          <IconCheck size={36} className="text-[var(--primary)]" stroke={2.5} />
        </motion.div>
      </motion.div>
      <h3 className="type-h3 mb-2">Message Sent Successfully</h3>
      <p className="type-body-muted max-w-sm mb-8">
        Thanks for reaching out! Our team will review your inquiry and get back to you within 24 hours.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="type-btn text-[var(--primary)] hover:underline underline-offset-4 transition-colors"
      >
        Send another message
      </button>
    </motion.div>
  );
}

export function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => {
        const next = validate({ ...form, [key]: value });
        const updated = { ...prev };
        if (next[key]) updated[key] = next[key];
        else delete updated[key];
        return updated;
      });
    }
  };

  const touch = (key: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const fieldErrors = validate(form);
    if (fieldErrors[key]) {
      setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1600));
    setStatus("success");
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="page-section px-4 md:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] type-eyebrow text-gray-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Get In Touch
            </span>
            <h2 className="type-h2 mb-3">
              Let&apos;s Build Something{" "}
              <span className="text-[var(--primary)] italic">Great Together</span>
            </h2>
            <p className="type-body-muted">
              Have a project in mind or need a demo? Fill out the form and our team will reach out with a tailored solution for your business.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-[10px]">
          {/* Left — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-[10px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-[10px]">
              {contactMethods.map((method, i) => (
                <ContactMethodCard key={method.label} {...method} delay={i * 60} />
              ))}
            </div>

            <ScrollReveal direction="up" delay={280}>
              <div className="mobile-card md:rounded-2xl md:border md:border-[var(--glass-border)] md:bg-[#0c0c0e]/60 p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent" />
                <p className="type-label text-gray-500 mb-4">Why businesses choose us</p>
                <ul className="space-y-3">
                  {[
                    "Free consultation & live demo",
                    "Custom solutions, not templates",
                    "Dedicated support after launch",
                    "Transparent pricing, no surprises",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 type-caption text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center shrink-0">
                        <IconCheck size={11} className="text-[var(--primary)]" stroke={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal direction="up" delay={120} className="lg:col-span-3">
            <div className="mobile-card md:rounded-2xl md:border md:border-[var(--glass-border)] md:bg-[#0c0c0e]/75 md:backdrop-blur-xl p-5 sm:p-7 md:p-8 relative overflow-hidden h-full">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[var(--primary)]/[0.04] blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[var(--primary)]/[0.03] blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessState key="success" onReset={resetForm} />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-5"
                    noValidate
                  >
                    <div className="mb-1">
                      <h3 className="type-h3 mb-1">Send us a message</h3>
                      <p className="type-caption text-gray-500">All fields marked with * are required</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FloatingInput
                        id="name"
                        label="Full Name *"
                        value={form.name}
                        error={touched.name ? errors.name : undefined}
                        onChange={(v) => update("name", v)}
                        onBlur={() => touch("name")}
                      />
                      <FloatingInput
                        id="email"
                        label="Work Email *"
                        type="email"
                        value={form.email}
                        error={touched.email ? errors.email : undefined}
                        onChange={(v) => update("email", v)}
                        onBlur={() => touch("email")}
                      />
                      <FloatingInput
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        value={form.phone}
                        error={touched.phone ? errors.phone : undefined}
                        onChange={(v) => update("phone", v)}
                        onBlur={() => touch("phone")}
                        optional
                      />
                      <FloatingInput
                        id="company"
                        label="Company Name"
                        value={form.company}
                        onChange={(v) => update("company", v)}
                        optional
                      />
                    </div>

                    <div>
                      <p className="type-label text-gray-500 mb-3">Interested In</p>
                      <div className="flex flex-wrap gap-2">
                        {services.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => update("service", service)}
                            className={cn(
                              "px-3.5 py-2 rounded-xl type-tag border transition-all duration-300 active:scale-[0.97]",
                              form.service === service
                                ? "bg-[var(--primary)]/15 border-[var(--primary)]/40 text-[var(--primary)] shadow-[0_0_16px_rgba(197,255,0,0.08)]"
                                : "bg-[#0a0a0c]/60 border-[var(--glass-border)] text-gray-400 hover:border-[var(--primary)]/25 hover:text-gray-300"
                            )}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value.slice(0, 500))}
                        onBlur={() => touch("message")}
                        rows={4}
                        maxLength={500}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className={cn(
                          "w-full rounded-xl border bg-[#0a0a0c]/80 px-4 py-3.5 text-[var(--foreground)] outline-none transition-all duration-300 resize-none",
                          "placeholder:text-gray-600",
                          touched.message && errors.message
                            ? "border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
                            : "border-[var(--glass-border)] focus:border-[var(--primary)]/60 focus:shadow-[0_0_0_3px_rgba(197,255,0,0.1)]"
                        )}
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        <AnimatePresence>
                          {touched.message && errors.message ? (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-red-400"
                            >
                              {errors.message}
                            </motion.p>
                          ) : (
                            <span />
                          )}
                        </AnimatePresence>
                        <span className="type-eyebrow text-gray-600">
                          {form.message.length}/500
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group relative w-full overflow-hidden bg-[var(--primary)] text-black px-8 py-4 rounded-2xl md:rounded-xl type-btn border border-[var(--primary)] transition-all duration-300 active:scale-[0.98] shadow-[0_0_24px_rgba(197,255,0,0.2)] hover:shadow-[0_0_36px_rgba(197,255,0,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 w-0 bg-[#111] group-hover:w-full group-disabled:group-hover:w-0 transition-all duration-[400ms] ease-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[var(--primary)] group-disabled:group-hover:text-black transition-colors duration-300">
                        {status === "submitting" ? (
                          <>
                            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <IconSend size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>

                    <p className="type-eyebrow text-gray-600 text-center">
                      By submitting, you agree to our privacy policy. We never share your data.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
