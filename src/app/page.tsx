import { Navbar } from "@/components/Navbar";
import { AnimatedShapes } from "@/components/AnimatedShapes";
import { ServiceCategories } from "@/components/ServiceCategories";
import { SoftwareSolutions } from "@/components/SoftwareSolutions";
import { ProductsPricing } from "@/components/ProductsPricing";
import { ClientTestimonials } from "@/components/ClientTestimonials";
import { TeamSection } from "@/components/TeamSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { PageFooter } from "@/components/PageFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

export default function Home() {
  return (
    <div className="app-shell min-h-screen relative overflow-x-hidden text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-black font-sans bg-[var(--background)]">

      <AnimatedShapes />
      <Navbar />
      <MobileBottomNav />
      <WhatsAppFloatingButton />

      <main className="pt-[calc(4.5rem+env(safe-area-inset-top))] md:pt-20 relative z-10 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">

        <HeroSection />
        <ServiceCategories />
        <SoftwareSolutions />
        <ProductsPricing />
        <ClientTestimonials />
        <TeamSection />
        <ContactSection />
        <PageFooter />

      </main>
    </div>
  );
}
