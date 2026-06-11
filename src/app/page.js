import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import StatsBanner from "@/components/landing/StatsBanner";
import TechStack from "@/components/landing/TechStack";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-yellow-950 selection:text-yellow-400 font-sans relative overflow-x-hidden">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] rounded-full opacity-[0.04] bg-gradient-to-r from-yellow-400 to-purple-400 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-[0.02] bg-blue-400 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full opacity-[0.02] bg-green-400 blur-[100px]" />
      </div>

      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <HowItWorks />
        <StatsBanner />
        <TechStack />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
