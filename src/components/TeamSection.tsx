"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "'Jameel Noori Nastaleeq', 'Jameel Noori Nastaleeq Regular', 'jameel-noori-nastaleeq-regular', serif";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

const TEAM_MEMBERS = [
  {
    name: "Moeed Azam",
    nameUr: "معید اعظم",
    role: "CEO & Founder",
    roleUr: "سی ای او اور بانی",
    description: "With 5+ years of experience in technology leadership, Moeed leads our vision for continuous innovation.",
    descriptionUr: "ٹیکنالوجی کی قیادت میں 5 سال سے زیادہ کے تجربے کے ساتھ، معید مسلسل جدت طرازی کے لیے ہمارے وژن کی قیادت کرتے ہیں۔",
    image: "/danny.png"
  },
  {
    name: "Muhammad Haris",
    nameUr: "محمد حارث",
    role: "HR Manager",
    roleUr: "ایچ آر مینیجر",
    description: "A dynamic executive excelling in client acquisition, relationship building, and driving revenue growth.",
    descriptionUr: "ایک متحرک ایگزیکٹو جو کلائنٹس کے حصول، تعلقات استوار کرنے اور آمدنی میں اضافے کے حوالے سے بہترین صلاحیتیں رکھتے ہیں۔",
    image: "/Micheal.png"
  },
  {
    name: "Sharry Yar",
    nameUr: "شہریار",
    role: "Development Manager",
    roleUr: "ڈویلپمنٹ مینیجر",
    description: "An innovative Website Developer specializing in full-stack architecture and AI-integrated solutions.",
    descriptionUr: "ایک جدید ویب سائٹ ڈیولپر جو فل اسٹیک آرکیٹیکچر اور اے آئی سے لیس سسٹمز میں مہارت رکھتے ہیں۔",
    image: "/Harry.png"
  }
];

function TeamCard({ member, delay, isUrdu }: { member: any; delay: number; isUrdu?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      {...fadeUp(delay)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3 / 4",
        borderRadius: "24px",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(197,255,0,0.35)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered 
          ? "0 30px 60px rgba(0,0,0,0.6), 0 0 50px rgba(197,255,0,0.15)"
          : "0 20px 40px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-12px)" : "translateY(0)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        background: "radial-gradient(circle at center, #111 0%, #050505 100%)",
        cursor: "default"
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            filter: hovered ? "contrast(1.05) brightness(1.1)" : "contrast(1.05) brightness(0.85)",
            transform: hovered ? "translateY(-15px) scale(1)" : "translateY(-15px) scale(0.92)",
            transformOrigin: "top center",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Deep Gradient Overlay for text readability */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: hovered 
            ? "linear-gradient(180deg, transparent 10%, rgba(10,10,12,0.8) 55%, rgba(10,10,12,0.95) 100%)"
            : "linear-gradient(180deg, transparent 20%, rgba(10,10,12,0.9) 65%, rgba(10,10,12,1) 100%)",
          zIndex: 1,
          transition: "all 0.6s ease"
        }}
      />
      
      {/* Lime Accent Glow at the bottom */}
      <div 
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "20%",
          right: "20%",
          height: "120px",
          background: LIME,
          filter: "blur(70px)",
          opacity: hovered ? 0.2 : 0,
          zIndex: 1,
          transition: "opacity 0.6s ease",
          pointerEvents: "none"
        }}
      />

      {/* Content Wrapper */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "40px 32px",
        }}
      >
        <motion.div
          style={{
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <div
            style={{
              fontSize: isUrdu ? "14px" : "12px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 700,
              color: LIME,
              letterSpacing: isUrdu ? "0.02em" : "0.1em",
              textTransform: isUrdu ? "none" : "uppercase",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <div 
              style={{
                width: "5px", 
                height: "5px", 
                borderRadius: "50%", 
                background: LIME,
                boxShadow: hovered ? `0 0 12px ${LIME}` : "none",
                transition: "box-shadow 0.4s ease"
              }} 
            />
            {isUrdu ? member.roleUr : member.role}
          </div>
          
          <h3
            style={{
              fontSize: isUrdu ? "36px" : "32px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              lineHeight: 1.1,
              textShadow: "0 4px 12px rgba(0,0,0,0.5)"
            }}
          >
            {isUrdu ? member.nameUr : member.name}
          </h3>

          <p
            style={{
              fontSize: isUrdu ? "17px" : "15px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              margin: 0,
              opacity: hovered ? 1 : 0.6,
              transition: "all 0.6s ease",
            }}
          >
            {isUrdu ? member.descriptionUr : member.description}
          </p>
        </motion.div>
      </div>

      {/* Animated Top Border Accent */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent 0%, ${LIME} 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 3
        }}
      />
    </motion.div>
  );
}

export function TeamSection() {
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

  return (
    <section
      id="team"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(16px, 5vw, 24px)",
        maxWidth: "1440px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "800px",
          background: "radial-gradient(ellipse, rgba(197,255,0,0.02) 0%, transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            textAlign: "center",
            maxWidth: "640px",
            margin: "0 auto 64px auto",
          }}
        >
          <motion.div {...fadeUp(0)} style={{ display: "inline-block" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                background: "rgba(197,255,0,0.07)",
                border: "1px solid rgba(197,255,0,0.22)",
                borderRadius: "100px",
                padding: "7px 18px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: LIME,
                  boxShadow: `0 0 9px ${LIME}`,
                }}
              />
              <span
                style={{
                  fontSize: isUrdu ? "15px" : "13px",
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: 500,
                  color: LIME,
                  letterSpacing: "0.02em",
                }}
              >
                {isUrdu ? "ہماری قیادت" : "Our Leadership"}
              </span>
            </div>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: isUrdu ? "clamp(34px, 3.8vw, 54px)" : "clamp(28px, 3.2vw, 48px)",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "0 0 18px 0",
            }}
          >
            {isUrdu ? "وہ ٹیم جو آپ کے " : "Meet Our "}
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {isUrdu ? "ویژن کو بناتی ہے" : "Team"}
            </span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.15)}
            style={{
              fontSize: isUrdu ? "18px" : "16px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.47)",
              lineHeight: 1.78,
              margin: "0 auto",
              maxWidth: "540px",
            }}
          >
            {isUrdu ? "مقامی ٹیلنٹ، عالمی معیار۔ ہماری قیادت اس بات کو یقینی بناتی ہے کہ ہر پروڈکٹ آپ کے کاروبار کے لیے بہترین ہو۔" : "The visionary minds behind our innovative solutions, driving growth and creating premium digital experiences."}
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={0.2 + i * 0.15} isUrdu={isUrdu ?? false} />
          ))}
        </div>
      </div>
    </section>
  );
}
