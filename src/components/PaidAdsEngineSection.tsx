import React from 'react';
import { motion } from 'motion/react';
import {
  Megaphone,
  SlidersHorizontal,
  Calculator,
  UserCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const PaidAdsEngineSection: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'GET FOUND',
      description:
        'We use Meta and/or Google advertising to put your business in front of homeowners in the areas you actually serve.',
      icon: Megaphone,
      isGradient: false,
    },
    {
      stepNumber: '02',
      title: 'START THE CONVERSATION',
      description:
        'Instead of sending every click to a generic contact form, homeowners enter a quote experience built around your service.',
      icon: SlidersHorizontal,
      isGradient: true,
    },
    {
      stepNumber: '03',
      title: 'SET EXPECTATIONS',
      description:
        'Homeowners answer project-specific questions and receive a rough price range based on the information they provide.',
      icon: Calculator,
      isGradient: false,
    },
    {
      stepNumber: '04',
      title: 'GET THE ENQUIRY',
      description:
        'Homeowners who are comfortable with the project and estimated range can submit their details and request the next step.',
      icon: UserCheck,
      isGradient: true,
    },
  ];

  return (
    <section id="paid-ads-engine" className="py-16 sm:py-20 lg:py-24 bg-[#07090e] text-[#f8fafc] relative overflow-hidden border-t border-white/[0.12]">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[rgba(255,85,0,0.14)] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[rgba(255,34,0,0.08)] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.12)] border border-[rgba(255,85,0,0.25)] text-[#ff8800] text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
            <span>The 4-Step Acquisition Mechanism</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight font-sans mb-3 sm:mb-4">
            How We Keep Your Contracting Business <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">Full Every Month</span>
          </h2>
          <p className="text-[#94a3b8] text-xs sm:text-sm md:text-base leading-relaxed">
            A proven step-by-step acquisition engine designed to replace dead-end inquiries with pre-qualified, high-intent homeowner consultations.
          </p>
        </motion.div>

        {/* 4-Step Mechanism Cards Grid - Inspired by Reference Design (Alternating Solid & Full Vibrant Gradient) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.stepNumber}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`p-5 sm:p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  item.isGradient
                    ? 'bg-gradient-to-br from-[#ff7a00] via-[#ff5500] to-[#e63600] text-white border border-[#ffa04d]/50 shadow-[0_25px_60px_-15px_rgba(255,85,0,0.5)] hover:shadow-[0_30px_70px_-12px_rgba(255,85,0,0.65)]'
                    : 'bg-[#0e131d] border border-white/[0.12] hover:border-white/[0.24] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)]'
                }`}
              >
                {/* Visual Glow overlay for gradient cards */}
                {item.isGradient && (
                  <>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/15 blur-2xl rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.22),transparent_70%)] pointer-events-none" />
                  </>
                )}

                <div className="relative z-10">
                  {/* Step Header with Badge and Icon */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-xs font-extrabold tracking-wider ${
                        item.isGradient
                          ? 'bg-white/20 border border-white/40 text-white shadow-sm'
                          : 'bg-[#151c28] border border-white/[0.12] text-[#cbd5e1]'
                      }`}
                    >
                      STEP {item.stepNumber}
                    </span>
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                        item.isGradient
                          ? 'bg-white/20 border border-white/30 text-white shadow-inner backdrop-blur-sm'
                          : 'bg-[#151c28] border border-white/[0.1] text-[#ff8800] group-hover:bg-[#1d2738]'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`text-sm sm:text-base md:text-lg font-extrabold tracking-tight uppercase mb-2 sm:mb-3 leading-snug ${
                      item.isGradient ? 'text-white drop-shadow-sm' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Step Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-medium ${
                      item.isGradient ? 'text-white/90' : 'text-[#94a3b8]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Visual Workflow Comparison: Old Way vs ContractorFlow Engine */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#131722] via-[#0d1017] to-[#080a0f] border border-white/[0.14] grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 shadow-2xl backdrop-blur-xl mb-10 sm:mb-12"
        >
          
          {/* Old Way Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#2a0e0e] via-[#1a0808] to-[#0f0506] border border-[#ff2200]/40 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 gap-2">
                <span className="text-xs font-bold uppercase text-[#ff5500] tracking-wider">The Old Unpredictable Way</span>
                <span className="text-[10px] bg-[#ff2200]/25 text-[#ff8800] font-bold px-2.5 py-0.5 rounded-full border border-[#ff2200]/40 shrink-0">High Drop-Off</span>
              </div>
              <ul className="space-y-3 text-xs text-[#cbd5e1] font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff2200] font-bold shrink-0">✕</span>
                  <span>Generic Ads sending traffic to an empty &quot;Contact Us&quot; form</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff2200] font-bold shrink-0">✕</span>
                  <span>Homeowners bounce because they don&apos;t know if prices fit their budget</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff2200] font-bold shrink-0">✕</span>
                  <span>Slow response times (2-24 hours) — homeowner hires someone else first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff2200] font-bold shrink-0">✕</span>
                  <span>Unpredictable income with seasonal quiet months</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ContractorFlow Engine Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#2e1308] via-[#1d0d08] to-[#100812] border border-[#ff5500]/50 relative shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 gap-2">
                <span className="text-xs font-extrabold uppercase text-[#ff8800] tracking-wider flex items-center gap-1.5 min-w-0">
                  <Sparkles className="w-4 h-4 text-[#ff5500] shrink-0" />
                  <span className="truncate">The AsOurs Acquisition Engine</span>
                </span>
                <span className="text-[10px] bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] text-white font-bold px-2.5 py-0.5 rounded-full shadow-xs shrink-0">
                  High Conversion
                </span>
              </div>
              <ul className="space-y-3 text-xs text-[#f1f5f9] font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold shrink-0">✓</span>
                  <span>Hyper-targeted Meta & Google ads geo-fenced to your active service territories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold shrink-0">✓</span>
                  <span>Instant Quote Experience on site captures budget & scope preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold shrink-0">✓</span>
                  <span>Homeowners see realistic ballpark numbers and understand the true cost upfront</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold shrink-0">✓</span>
                  <span>Vetted inquiries submit verified details ready for an on-site walkthrough</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sleek Bottom Visual: Acquisition Pipeline Flow */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#131722] via-[#0d1017] to-[#080a0f] border border-white/[0.14] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,85,0,0.08),transparent_70%)] pointer-events-none" />

          {/* Simple Headline in exact matching style */}
          <div className="text-center mb-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.14)] border border-[rgba(255,85,0,0.3)] text-[#ff8800] text-xs font-mono font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
              <span>Acquisition Pipeline Flow</span>
            </span>
          </div>

          {/* Sleek Minimalist Pipeline Flow Items */}
          <div className="grid grid-cols-1 sm:grid-cols-7 items-center gap-3 sm:gap-2 text-center relative z-10 max-w-4xl mx-auto">
            {/* Step 1: Paid Traffic */}
            <div className="sm:col-span-1 py-3.5 sm:py-4 px-3 rounded-2xl bg-gradient-to-br from-[#1b202e] to-[#11141e] border border-white/[0.14] hover:border-[#ff5500]/50 transition-colors flex flex-col items-center justify-center shadow-md">
              <Megaphone className="w-4 h-4 text-[#ff5500] mb-2 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">Paid Traffic</span>
            </div>

            {/* Arrow 1 */}
            <div className="sm:col-span-1 flex items-center justify-center text-[#ff8800] py-1 sm:py-0">
              <ArrowRight className="w-4 h-4 hidden sm:block stroke-[2.5] shrink-0" />
              <span className="text-xs font-bold sm:hidden">↓</span>
            </div>

            {/* Step 2: Project Details */}
            <div className="sm:col-span-1 py-3.5 sm:py-4 px-3 rounded-2xl bg-gradient-to-br from-[#24130d] via-[#180d09] to-[#0f0912] border border-[#ff5500]/40 hover:border-[#ff5500]/70 transition-colors flex flex-col items-center justify-center shadow-md">
              <SlidersHorizontal className="w-4 h-4 text-[#ff8800] mb-2 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">Project Details</span>
            </div>

            {/* Arrow 2 */}
            <div className="sm:col-span-1 flex items-center justify-center text-[#ff8800] py-1 sm:py-0">
              <ArrowRight className="w-4 h-4 hidden sm:block stroke-[2.5] shrink-0" />
              <span className="text-xs font-bold sm:hidden">↓</span>
            </div>

            {/* Step 3: Price Range */}
            <div className="sm:col-span-1 py-3.5 sm:py-4 px-3 rounded-2xl bg-gradient-to-br from-[#1b202e] to-[#11141e] border border-white/[0.14] hover:border-[#ff5500]/50 transition-colors flex flex-col items-center justify-center shadow-md">
              <Calculator className="w-4 h-4 text-[#ff8800] mb-2 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">Price Range</span>
            </div>

            {/* Arrow 3 */}
            <div className="sm:col-span-1 flex items-center justify-center text-[#ff8800] py-1 sm:py-0">
              <ArrowRight className="w-4 h-4 hidden sm:block stroke-[2.5] shrink-0" />
              <span className="text-xs font-bold sm:hidden">↓</span>
            </div>

            {/* Step 4: Qualified Enquiry */}
            <div className="sm:col-span-1 py-3.5 sm:py-4 px-3 rounded-2xl bg-gradient-to-br from-[rgba(255,85,0,0.3)] via-[rgba(255,50,0,0.2)] to-[rgba(16,185,129,0.1)] border border-[#ff5500]/70 shadow-[0_0_25px_rgba(255,85,0,0.3)] flex flex-col items-center justify-center">
              <UserCheck className="w-4 h-4 text-emerald-400 mb-2 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight">Qualified Enquiry</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
