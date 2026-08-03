import { BackgroundDecor } from "@/components/BackgroundDecor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { VideoSection } from "@/components/VideoSection";
import { WhyAuraSection } from "@/components/WhyAuraSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TeamSection } from "@/components/TeamSection";
import { EngagementSection } from "@/components/EngagementSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { Hairline } from "@/components/Hairline";

export default function Home() {
  return (
    <div
      className="app-shell min-h-screen relative overflow-x-hidden text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-black font-sans"
      style={{
        background: "linear-gradient(150deg, #050505 0%, #070707 50%, #0B0B0B 100%)",
      }}
    >
      <BackgroundDecor />
      <Navbar />
      <WhatsAppFloatingButton />

      <main className="relative z-[1] pt-[64px] md:pt-[72px]">
        <HeroSection />
        <Hairline />
        <ServicesSection />
        <Hairline />
        <ProcessSection />
        <Hairline />
        <ComparisonSection />
        <Hairline />
        <PortfolioSection />
        <Hairline />
        <VideoSection />
        <Hairline />
        <WhyAuraSection />
        <Hairline />
        <TeamSection />
        <Hairline />
        <TestimonialsSection />
        <Hairline />
        <EngagementSection />
        <Hairline />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
