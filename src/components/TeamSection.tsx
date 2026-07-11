"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IconBrandLinkedin, IconBrandTwitter, IconMail } from "@tabler/icons-react";

const teamMembers = [
  {
    name: "Danny Stone",
    role: "CEO & Founder",
    image: "/danny.png",
    description: "With 5+ years of experience in technology leadership, Danny Stone leads our vision for innovation."
  },
  {
    name: "Michael Castillo",
    role: "HR Manager",
    image: "/Micheal.png",
    description: "A dynamic Sales Executive, excels in client acquisition, relationship building, and driving revenue growth for business success."
  },
  {
    name: "Harry Wilson",
    role: "Development Manager",
    image: "/Harry.png",
    description: "An innovative Website Developer, excels in full-stack architecture, AI-integrated solutions, and creating premium digital experiences for business growth."
  }
];

export function TeamSection() {
  return (
    <section id="team" className="page-section px-4 md:px-12 scroll-mt-24 relative overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-64 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] type-eyebrow text-gray-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Meet Our Leadership
            </span>
            <h2 className="type-h2 mb-3">
              The Minds Behind <span className="text-[var(--primary)] italic">Our Success</span>
            </h2>
            <p className="type-body-muted">
              Our dedicated team of professionals brings years of experience and passion to deliver exceptional results for your business.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.name} direction="up" delay={i * 120}>
              <div className="group relative rounded-[2rem] bg-[#0c0c0e]/60 backdrop-blur-2xl border border-[var(--glass-border)] hover:border-[var(--primary)]/40 hover:shadow-[0_0_40px_rgba(197,255,0,0.05)] transition-all duration-500 overflow-hidden flex flex-col h-full">
                
                {/* Image Section */}
                <div className="relative h-80 w-full overflow-hidden bg-[#111115]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/95 via-[#0c0c0e]/40 to-transparent z-10" />
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 ease-out grayscale-[30%] group-hover:grayscale-0"
                  />
                  
                  {/* Floating Elements on Hover */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center text-[var(--primary)]">
                       <IconBrandLinkedin size={18} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative z-20 flex-grow px-8 pb-8 pt-0 -mt-16 flex flex-col">
                  <div className="inline-block px-5 py-2 rounded-full bg-[var(--primary)] text-black type-eyebrow font-bold shadow-[0_0_20px_rgba(197,255,0,0.3)] self-start mb-5 tracking-wider">
                    {member.role}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <p className="type-body-muted text-sm leading-relaxed flex-grow">
                    {member.description}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-[var(--glass-border)] flex items-center gap-4">
                     <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300">
                        <IconBrandLinkedin size={18} />
                     </a>
                     <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300">
                        <IconBrandTwitter size={18} />
                     </a>
                     <a href="#" aria-label="Email" className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-gray-400 hover:text-black hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all duration-300">
                        <IconMail size={18} />
                     </a>
                  </div>
                </div>
                
                {/* Hover Glow Ring */}
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/0 group-hover:ring-[var(--primary)]/20 transition-all duration-500 pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
