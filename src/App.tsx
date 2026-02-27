import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OutageStats from "@/components/OutageStats";
import GovernmentBacking from "@/components/GovernmentBacking";
import EnergyFlow from "@/components/EnergyFlow";
import FinalCTA from "@/components/FinalCTA";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
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
