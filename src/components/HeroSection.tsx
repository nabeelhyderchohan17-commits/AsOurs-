import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, PhoneCall, Zap, TrendingUp, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenBookCall: () => void;
  onScrollToDemo: () => void;
  onScrollToRoi: () => void;
  onScrollToQualify?: () => void;
}

interface RotatingSlide {
  id: number;
  label: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix?: string;
  supportingText: string;
}

const ROTATING_SLIDES: RotatingSlide[] = [
  {
    id: 1,
    label: '01',
    headlinePrefix: 'Still Hunting Facebook Groups for the ',
    headlineHighlight: 'Next Job?',
    headlineSuffix: '',
    supportingText:
      'Build another source of regular homeowner enquiries instead of waiting for the next “looking for a contractor” post.',
  },
  {
    id: 2,
    label: '02',
    headlinePrefix: 'Referrals Are Great. But You ',
    headlineHighlight: "Can't Schedule Your Next Job",
    headlineSuffix: ' Around Them.',
    supportingText:
      "Build another source of regular jobs so your pipeline doesn't depend entirely on past customers sending the next one your way.",
  },
  {
    id: 3,
    label: '03',
    headlinePrefix: "Good Months Shouldn't Be Followed by ",
    headlineHighlight: '“Where’s the Next Job?”',
    headlineSuffix: '',
    supportingText:
      'Build a more consistent source of homeowner enquiries you can turn up when you have room for more work.',
  },
  {
    id: 4,
    label: '04',
    headlinePrefix: 'Getting Leads But Still ',
    headlineHighlight: 'Chasing Too Many Dead Ends?',
    headlineSuffix: '',
    supportingText:
      'Give homeowners a rough price range before they contact you, so you can spend more time talking to people who are actually comfortable with the project.',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBookCall,
  onScrollToDemo,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rotation duration: 5 seconds (within the 4-6s requirement)
  const ROTATION_INTERVAL = 5000;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % ROTATING_SLIDES.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = ROTATING_SLIDES[currentSlideIndex];

  return (
    <section
      className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#07090e] via-[#0e121a] to-[#07090e] text-[#f8fafc]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Glowing Radial Background Accents - Enhanced subtle warm orange ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[rgba(255,85,0,0.22)] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[rgba(255,107,0,0.16)] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-5 left-1/4 w-[350px] h-[250px] bg-[rgba(255,50,0,0.10)] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left w-full"
          >
            {/* Top Eyebrow Badge - Fully Responsive Pill with adaptive wrap and sizing */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#151a24]/95 border border-[#ff5500]/40 text-[#cbd5e1] text-[11px] sm:text-xs font-semibold tracking-wide shadow-[0_0_25px_rgba(255,85,0,0.3)] mb-4 sm:mb-6 backdrop-blur-md max-w-full overflow-hidden">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#ff5500] animate-pulse shrink-0" />
                <span className="text-[#ff8800] font-bold tracking-wide uppercase text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] whitespace-nowrap">
                  High-Intent Acquisition
                </span>
              </div>
              <span className="text-white/20 select-none">•</span>
              <span className="text-[#cbd5e1] text-[10px] xs:text-[11px] sm:text-xs font-medium truncate">
                Paid Ads + 1-Click Quote Tech
              </span>
            </div>

            {/* Rotating Progress Step Indicators with Smooth Fill */}
            <div className="flex items-center gap-2 mb-6">
              {ROTATING_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer bg-white/15 hover:bg-white/30"
                    style={{ width: isActive ? '44px' : '14px' }}
                    aria-label={`Go to headline ${idx + 1}`}
                  >
                    {isActive && (
                      <motion.div
                        key={`bar-${currentSlideIndex}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isPaused ? '100%' : '100%' }}
                        transition={{
                          duration: isPaused ? 0 : ROTATION_INTERVAL / 1000,
                          ease: 'linear',
                        }}
                        className="h-full bg-gradient-to-r from-[#ff8800] to-[#ff5500]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Animated Rotating Headline Block - Dynamic Responsive Heights */}
            <div className="min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col justify-start w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full"
                >
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight leading-[1.18] sm:leading-[1.14] mb-4 sm:mb-5 font-sans text-[#f8fafc] break-words">
                    {currentSlide.headlinePrefix}
                    <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">
                      {currentSlide.headlineHighlight}
                    </span>
                    {currentSlide.headlineSuffix}
                  </h1>

                  {/* Supporting Text */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#cbd5e1] font-normal leading-relaxed max-w-2xl">
                    {currentSlide.supportingText}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Feature Value Highlights - Fully Responsive Grid with shrink-0 icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl my-6 sm:my-8">
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#151a24] border border-white/[0.1] backdrop-blur-sm shadow-sm min-w-0">
                <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl bg-[rgba(255,85,0,0.15)] flex items-center justify-center shrink-0 border border-[rgba(255,85,0,0.3)]">
                  <Zap className="w-4 h-4 text-[#ff5500] shrink-0" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#f8fafc] truncate">Instant Estimates</p>
                  <p className="text-[11px] text-[#8092a8] truncate">Price clarity upfront</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#151a24] border border-white/[0.1] backdrop-blur-sm shadow-sm min-w-0">
                <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl bg-[rgba(255,136,0,0.15)] flex items-center justify-center shrink-0 border border-[rgba(255,136,0,0.3)]">
                  <PhoneCall className="w-4 h-4 text-[#ff8800] shrink-0" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#f8fafc] truncate">Fast Dispatch</p>
                  <p className="text-[11px] text-[#8092a8] truncate">Instant SMS & phone alert</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#151a24] border border-white/[0.1] backdrop-blur-sm shadow-sm min-w-0">
                <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl bg-[rgba(16,185,129,0.15)] flex items-center justify-center shrink-0 border border-[#10b981]/30">
                  <TrendingUp className="w-4 h-4 text-[#10b981] shrink-0" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#f8fafc] truncate">Predictable Growth</p>
                  <p className="text-[11px] text-[#8092a8] truncate">Turn up pipeline anytime</p>
                </div>
              </div>
            </div>

            {/* CTAs - Responsive full-width on mobile, auto on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <button
                id="hero-test-widget-btn"
                onClick={onScrollToDemo}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(255,85,0,0.35)] hover:shadow-[0_0_40px_rgba(255,85,0,0.5)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform shrink-0" />
                <span>Test Instant Quote Tool</span>
              </button>

              <button
                id="hero-book-strategy-btn"
                onClick={onOpenBookCall}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#151a24] hover:bg-[#1c2230] text-[#f8fafc] border border-white/[0.16] font-extrabold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Book 15-Min Strategy Call</span>
                <ArrowRight className="w-4 h-4 text-[#ff8800] shrink-0" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Enhanced 3D Ambient Geometric Object & Live Status Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative flex items-center justify-center w-full mt-6 lg:mt-0"
          >
            {/* Multi-layered Ambient Glow Ring */}
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[rgba(255,85,0,0.25)] via-[rgba(255,107,0,0.18)] to-[rgba(255,34,0,0.2)] blur-3xl animate-pulse pointer-events-none" />

            {/* Glowing Dark Glass Container Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-md aspect-square rounded-3xl bg-[#151a24] border border-white/[0.12] p-4 sm:p-6 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] overflow-hidden group">
              {/* Floating ambient subtle matrix dots */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

              {/* Orbital Ring Geometry */}
              <div className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-white/[0.08] pointer-events-none animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#ff5500]/15 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />

              {/* Central Glowing Geometric 3D Star / Crystal Object */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-36 h-36 sm:w-52 sm:h-52 flex items-center justify-center"
              >
                {/* Layered metallic glowing star SVG geometry */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_35px_rgba(255,85,0,0.5)]">
                  <defs>
                    <linearGradient id="heroStarGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff8800" />
                      <stop offset="50%" stopColor="#ff5500" />
                      <stop offset="100%" stopColor="#ff2200" />
                    </linearGradient>
                    <linearGradient id="heroStarGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#ff7a1a" />
                      <stop offset="100%" stopColor="#ff3300" />
                    </linearGradient>
                  </defs>

                  {/* Outer glowing star blades */}
                  <path
                    d="M100 10 L122 78 L190 100 L122 122 L100 190 L78 122 L10 100 L78 78 Z"
                    fill="url(#heroStarGrad1)"
                    className="opacity-95"
                  />
                  {/* Inner faceted metallic crystal geometric overlay */}
                  <path
                    d="M100 35 L115 85 L165 100 L115 115 L100 165 L85 115 L35 100 L85 85 Z"
                    fill="url(#heroStarGrad2)"
                    className="opacity-90"
                  />
                  {/* Center glowing core diamond */}
                  <polygon
                    points="100,70 130,100 100,130 70,100"
                    fill="#ffffff"
                    className="opacity-95 shadow-2xl"
                  />
                </svg>
              </motion.div>

              {/* Floating Live Badge Overlay 1 */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#0e121a]/95 border border-white/[0.12] text-white text-[10px] sm:text-xs font-semibold shadow-xl flex items-center gap-1.5 sm:gap-2 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-ping shrink-0" />
                <span>Paid Ads: <strong className="text-[#ff5500]">Meta & Google</strong></span>
              </motion.div>

              {/* Floating Live Badge Overlay 2 */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#0e121a]/95 border border-[rgba(255,85,0,0.4)] text-[10px] sm:text-xs font-semibold text-[#cbd5e1] shadow-xl flex items-center gap-1.5 sm:gap-2 backdrop-blur-md"
              >
                <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#ff5500] shrink-0" />
                <span>1-Click Quote Engine</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
