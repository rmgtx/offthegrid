import StickyRibbon from "@/components/StickyRibbon";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GridVulnerable from "@/components/GridVulnerable";
import OutageStats from "@/components/OutageStats";
import GovernmentBacking from "@/components/GovernmentBacking";
import EnergyFlow from "@/components/EnergyFlow";
import FinalCTA from "@/components/FinalCTA";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <StickyRibbon />
      <Header />
      <main>
        <Hero />
        <GridVulnerable />
        <OutageStats />
        <GovernmentBacking />
        <EnergyFlow />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
