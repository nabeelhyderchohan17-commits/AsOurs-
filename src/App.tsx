import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WavingBanner } from './components/WavingBanner';
import { MeetNabeelSection } from './components/MeetNabeelSection';
import { InstantQuoteLiveWidget } from './components/InstantQuoteLiveWidget';
import { PaidAdsEngineSection } from './components/PaidAdsEngineSection';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { QualificationCtaSection } from './components/QualificationCtaSection';
import { BookCallModal } from './components/BookCallModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f8fafc] font-sans selection:bg-[#ff5500] selection:text-white relative overflow-x-hidden">
      {/* Scroll Progress Bar at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5500] via-[#ff6b00] to-[#ff2200] z-50 origin-left shadow-[0_0_12px_rgba(255,85,0,0.6)]"
        style={{ scaleX }}
      />

      {/* Navigation Header */}
      <Navbar
        onOpenBookCall={() => setIsBookCallOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBookCall={() => setIsBookCallOpen(true)}
          onScrollToDemo={() => handleScrollToSection('instant-quote-demo')}
          onScrollToRoi={() => handleScrollToSection('roi-calculator')}
          onScrollToQualify={() => handleScrollToSection('qualify')}
        />

        {/* Continuous Waving Banner */}
        <WavingBanner />

        {/* 2. Meet Nabeel Section */}
        <MeetNabeelSection
          onOpenBookCall={() => setIsBookCallOpen(true)}
          onScrollToQualify={() => handleScrollToSection('qualify')}
        />

        {/* 3. Interactive Instant Quote Live Widget Showcase */}
        <InstantQuoteLiveWidget />

        {/* 5. Paid Ads Engine Deep Dive */}
        <PaidAdsEngineSection />

        {/* 6. Contractor ROI Growth Calculator */}
        <RoiCalculator onOpenBookCall={() => setIsBookCallOpen(true)} />

        {/* 7. Real US Contractors with Predictable Work (Realistic Numbers, No Images) */}
        <CaseStudiesSection />

        {/* 8. FAQ Accordion */}
        <TestimonialsFaq />

        {/* 9. Qualification CTA Block (Before the Footer) */}
        <QualificationCtaSection />
      </main>

      {/* 10. Simplified Clean Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenBookCall={() => setIsBookCallOpen(true)}
      />

      {/* Booking Modal */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
      />
    </div>
  );
}
