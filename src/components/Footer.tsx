import React from 'react';
import { PhoneCall, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onOpenBookCall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenBookCall }) => {
  return (
    <footer className="bg-[#07090e] border-t border-white/[0.12] text-[#8092a8] text-xs py-14 sm:py-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#ff5500]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.1]">
          
          {/* Brand & Agency Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer group select-none w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#ff2a00] flex items-center justify-center p-1.5 shadow-lg shadow-[#ff5500]/25 group-hover:scale-105 transition-transform">
                <img
                  src="./asours-logo-white.png"
                  alt="AsOurs Logo"
                  className="w-full h-full object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-[#f8fafc] tracking-tight flex items-center gap-1.5">
                  AsOurs <span className="text-[#ff5500] text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#ff5500]/15 border border-[#ff5500]/30">Agency</span>
                </span>
                <span className="text-xs text-[#ff8800] font-medium tracking-wide">
                  Taken Personally. And built Seriously.
                </span>
              </div>
            </div>

            <p className="text-[#94a3b8] text-xs sm:text-[13px] leading-relaxed max-w-md">
              We don't believe in standing outside your business and simply delivering work. We get close, understand what matters, and build with the same care and responsibility we would give our own.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#ff8800] font-medium pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#ff5500]" />
              <span>1 Contractor Per Metro Territory • Zero Shared Leads</span>
            </div>
          </div>

          {/* Core Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Systems & Platform</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('instant-quote-demo')}
                  className="text-[#94a3b8] hover:text-[#ff8800] transition-colors cursor-pointer text-left"
                >
                  Instant Quote Widget/Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('paid-ads-engine')}
                  className="text-[#94a3b8] hover:text-[#ff8800] transition-colors cursor-pointer text-left"
                >
                  Paid Ads Engine (Meta & Google)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('roi-calculator')}
                  className="text-[#94a3b8] hover:text-[#ff8800] transition-colors cursor-pointer text-left"
                >
                  Trade ROI Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('case-studies')}
                  className="text-[#94a3b8] hover:text-[#ff8800] transition-colors cursor-pointer text-left"
                >
                  Verified Contractor Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('meet-nabeel')}
                  className="text-[#94a3b8] hover:text-[#ff8800] transition-colors cursor-pointer text-left"
                >
                  Meet Nabeel (Founder & Direct Partner)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq')}
                  className="text-[#94a3b8] hover:text-[#ff8800] transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Action Center - Single High-Impact Book a Call Button (4 cols) */}
          <div className="md:col-span-4 space-y-4 flex flex-col justify-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-1">Direct Strategy & Territory</p>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Speak directly with our growth team to verify exclusive territory availability in your metro area.
              </p>
            </div>

            {/* Single Prominent Book a Call Button */}
            <button
              id="footer-book-call"
              onClick={onOpenBookCall}
              className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#ff5500] via-[#ff6b00] to-[#ff2a00] hover:from-[#ff6b00] hover:to-[#ff3a00] active:scale-[0.99] text-white font-extrabold text-xs tracking-wide shadow-[0_0_22px_rgba(255,85,0,0.35)] hover:shadow-[0_0_28px_rgba(255,85,0,0.55)] transition-all cursor-pointer hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Strategy Call</span>
              <ArrowUpRight className="w-4 h-4 opacity-90" />
            </button>

            <button
              onClick={() => onScrollToSection('qualify')}
              className="text-xs text-[#ff8800] hover:text-[#ff5500] font-semibold text-center hover:underline cursor-pointer transition-colors py-1 inline-flex items-center justify-center gap-1"
            >
              <span>Or check territory eligibility online</span>
              <span>→</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Trust Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8092a8] font-medium">
          <p>© {new Date().getFullYear()} AsOurs Agency. Engineered for US Trade Contractors.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#cbd5e1] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#cbd5e1] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="text-[#8092a8]">Exclusive Territory Protection</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
