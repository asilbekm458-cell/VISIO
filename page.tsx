"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import ColorAdvisor from "@/components/ColorAdvisor";
import StyleAdvisor from "@/components/StyleAdvisor";
import ApartmentViewer3D from "@/components/ApartmentViewer3D";
import PortfolioGallery from "@/components/PortfolioGallery";
import Testimonials from "@/components/Testimonials";
import ROICalculator from "@/components/ROICalculator";
import TechArchitecture from "@/components/TechArchitecture";
import Pricing from "@/components/Pricing";
import InvestorPitch from "@/components/InvestorPitch";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);

  const handleDemoClick = useCallback(() => setDemoOpen(true), []);

  return (
    <>
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Asosiy kontentga o&apos;tish
      </a>

      <Navbar onDemoClick={handleDemoClick} />

      <main id="main-content" className="min-h-screen bg-[#070B14]">
        <ErrorBoundary><Hero onDemoClick={handleDemoClick} /></ErrorBoundary>
        <ErrorBoundary><ProblemSolution /></ErrorBoundary>
        <ErrorBoundary><Features /></ErrorBoundary>
        <ErrorBoundary><ColorAdvisor /></ErrorBoundary>
        <ErrorBoundary><StyleAdvisor /></ErrorBoundary>
        <ErrorBoundary><ApartmentViewer3D /></ErrorBoundary>
        <ErrorBoundary><PortfolioGallery /></ErrorBoundary>
        <ErrorBoundary><Testimonials /></ErrorBoundary>
        <ErrorBoundary><ROICalculator /></ErrorBoundary>
        <ErrorBoundary><TechArchitecture /></ErrorBoundary>
        <ErrorBoundary><Pricing onDemoClick={handleDemoClick} /></ErrorBoundary>
        <ErrorBoundary><InvestorPitch /></ErrorBoundary>
        <ErrorBoundary><CTA onDemoClick={handleDemoClick} /></ErrorBoundary>
      </main>

      <Footer />

      {/* Single global DemoModal */}
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
