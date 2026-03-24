import { lazy, Suspense } from "react";
import StickyRibbon from "@/components/StickyRibbon";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GridVulnerable from "@/components/GridVulnerable";
import OutageStats from "@/components/OutageStats";
import GovernmentBacking from "@/components/GovernmentBacking";
import EnergyFlow from "@/components/EnergyFlow";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const ChatWidget = lazy(() => import("@/components/ChatWidget"));

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber focus:text-navy focus:font-heading focus:font-semibold focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <StickyRibbon />
      <Header />
      <main id="main-content">
        <Hero />
        <GridVulnerable />
        <OutageStats />
        <GovernmentBacking />
        <EnergyFlow />
        <FinalCTA />
      </main>
      <Footer />
      <Suspense><ChatWidget /></Suspense>
    </div>
  );
}
