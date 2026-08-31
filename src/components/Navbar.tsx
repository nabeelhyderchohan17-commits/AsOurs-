import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBookCall: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookCall, onScrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on desktop viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open on small devices
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Instant Quote Tool', id: 'instant-quote-demo' },
    { label: 'Ads System', id: 'paid-ads-engine' },
    { label: 'ROI Estimator', id: 'roi-calculator' },
    { label: 'Case Studies', id: 'case-studies' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-transparent backdrop-blur-md border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="navbar-logo"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#1c2230] to-[#0e121a] border border-white/15 flex items-center justify-center p-1.5 group-hover:border-[#ff5500] group-hover:shadow-[0_0_16px_rgba(255,85,0,0.5)] transition-all shrink-0">
            <img
              src="./asours-logo-orange.png"
              alt="AsOurs Logo"
              className="w-full h-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1 leading-none">
              AsOurs <span className="text-[#ff5500] text-xs sm:text-sm font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#ff5500]/10 border border-[#ff5500]/25">Agency</span>
            </span>
            <span className="text-[10px] text-[#94a3b8] font-medium tracking-wide hidden xs:inline-block">
              Contractor Growth Systems
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className="group relative text-xs lg:text-[13px] font-semibold text-[#cbd5e1] hover:text-white transition-colors cursor-pointer py-1.5 px-1"
            >
              <span className="relative z-10 group-hover:text-[#ff8800] transition-colors">
                {link.label}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff5500] to-[#ff8800] group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => onScrollToSection('qualify')}
            className="text-xs sm:text-[13px] font-semibold text-[#cbd5e1] hover:text-white px-3 sm:px-3.5 py-2 transition-colors cursor-pointer hover:bg-white/[0.06] rounded-xl border border-transparent hover:border-white/10"
          >
            Territory Check
          </button>

          <button
            id="navbar-book-call-btn"
            onClick={onOpenBookCall}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff2a00] hover:from-[#ff6b00] hover:to-[#ff3a00] text-white font-bold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(255,85,0,0.35)] hover:shadow-[0_0_25px_rgba(255,85,0,0.55)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <span>Book Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
          </button>
        </div>

        {/* Mobile Action + Hamburger Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Mini CTA on Mobile Header */}
          <button
            onClick={onOpenBookCall}
            className="sm:hidden px-3 py-1.5 rounded-lg bg-[#ff5500] text-white font-bold text-[11px] tracking-wide shadow-[0_0_12px_rgba(255,85,0,0.4)] flex items-center gap-1"
          >
            <span>Book Call</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 sm:p-2.5 rounded-xl text-[#cbd5e1] hover:text-white bg-[#121620] hover:bg-[#181f2c] border border-white/15 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#ff5500]" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#07090e]/98 border-b border-white/[0.12] backdrop-blur-2xl shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Navigation Links list */}
              <div className="flex flex-col space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] px-3 mb-1">
                  Navigation
                </p>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className="w-full text-left px-3.5 py-3 text-sm font-semibold text-[#cbd5e1] hover:text-white hover:bg-white/[0.06] active:bg-[#ff5500]/10 rounded-xl transition-all cursor-pointer min-h-[44px]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/[0.1] space-y-2.5">
                <button
                  onClick={() => {
                    handleLinkClick('qualify');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/15 bg-[#121620] hover:bg-[#1a202c] active:bg-[#202738] text-sm font-bold text-[#e2e8f0] hover:text-white transition-all cursor-pointer min-h-[46px]"
                >
                  <span>Apply for Exclusive Territory</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookCall();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5500] via-[#ff6b00] to-[#ff2a00] hover:from-[#ff6b00] hover:to-[#ff3a00] active:scale-[0.99] text-white text-sm font-extrabold shadow-[0_0_24px_rgba(255,85,0,0.4)] transition-all cursor-pointer min-h-[48px]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Strategy Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Tag */}
              <div className="pt-2 pb-1 text-center">
                <p className="text-[11px] text-[#64748b] font-medium">
                  Done-for-you ads & instant quote software for US trade contractors
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


