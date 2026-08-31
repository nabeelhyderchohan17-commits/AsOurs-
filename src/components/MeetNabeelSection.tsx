import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Linkedin,
  PhoneCall,
  ArrowUpRight,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Send,
} from 'lucide-react';

interface MeetNabeelSectionProps {
  onOpenBookCall: () => void;
  onScrollToQualify?: () => void;
}

export const MeetNabeelSection: React.FC<MeetNabeelSectionProps> = ({
  onOpenBookCall,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [imgLoadFailed, setImgLoadFailed] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const imageSources = [
    '/nabeel.png',
    '/ChatGPT Image Jun 13, 2026, 12_59_04 PM.png',
    '/image.png',
    '/nabeel.jpg',
    '/founder.png',
  ];

  const founderEmail = 'nabeelhyderchohan767@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/nabeelhyderchohandigitaltrategist/';
  const whatsappUrl = 'https://wa.me/923173927787';
  const telegramUrl = 'https://t.me/+923173927787';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(founderEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="meet-nabeel" className="py-20 md:py-28 bg-[#07090e] border-t border-white/[0.08] text-[#f8fafc] relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[rgba(255,85,0,0.14)] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[rgba(255,34,0,0.08)] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12 flex flex-col items-center"
        >
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151a24] border border-[#ff5500]/30 text-[#ff8800] text-xs font-semibold uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(255,85,0,0.2)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>THE PERSON BEHIND IT</span>
          </div>

          {/* Main Headline with White & Signature Gradient Mix */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#f8fafc] tracking-tight leading-[1.18] font-sans mb-5">
            I&apos;m Nabeel. I Built This Around a{' '}
            <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">
              Problem I Kept Seeing With Contractors.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#94a3b8] max-w-2xl leading-relaxed mb-7">
            A system that puts your business in front of homeowners, lets them understand the likely cost of their project, and gives you a better-qualified conversation when they&apos;re ready to talk and that&apos;s what this service is built around.
          </p>

          {/* CTA Button Under Supporting Text */}
          <button
            id="meet-nabeel-quick-call-btn"
            onClick={onOpenBookCall}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(255,85,0,0.4)] hover:shadow-[0_0_40px_rgba(255,85,0,0.55)] transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Book 15-Min Quick Call</span>
          </button>
        </motion.div>

        {/* Centered Founder Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-[#0e121a] border border-white/[0.1] p-6 sm:p-7 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            
            {/* Permanent Locked Photo Frame */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#151a24] border border-white/[0.12] shadow-inner mb-5">
              {!imgLoadFailed ? (
                <img
                  src={imageSources[currentImgIdx] || '/nabeel.png'}
                  alt="Nabeel - Strategist, AsOurs"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (currentImgIdx < imageSources.length - 1) {
                      setCurrentImgIdx(prev => prev + 1);
                    } else {
                      setImgLoadFailed(true);
                    }
                  }}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                /* High-Resolution Executive Portrait Placeholder Fallback */
                <div className="w-full h-full bg-gradient-to-b from-[#18202d] via-[#10141d] to-[#07090e] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,85,0,0.18),transparent_65%)]" />
                  
                  <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-[#ff8800] via-[#ff5500] to-[#ff2200] p-1 mb-4 shadow-[0_0_35px_rgba(255,85,0,0.45)]">
                    <div className="w-full h-full rounded-full bg-[#0e121a] flex items-center justify-center border border-white/10">
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-white via-[#ff8800] to-white bg-clip-text text-transparent">
                        NH
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-lg font-bold text-white tracking-tight">Nabeel</p>
                    <p className="text-xs font-semibold text-[#ff8800] uppercase tracking-wider mt-0.5">
                      Strategist, AsOurs
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Founder Info & Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Nabeel</h3>
                <p className="text-xs font-semibold text-[#ff8800]">Strategist, AsOurs</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151a24] border border-white/[0.08] text-xs text-[#cbd5e1]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500]" />
                <span className="font-medium">Direct Growth Partner</span>
              </div>
            </div>

            {/* Quick Connect & Contact Actions */}
            <div className="pt-4 space-y-2.5">
              {/* LinkedIn Button */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/30 text-[#60a5fa] hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer group"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5] group-hover:text-white transition-colors" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Email Button with 1-Click Copy */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${founderEmail}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#151a24] hover:bg-[#1c2230] border border-white/[0.1] text-xs font-medium text-[#cbd5e1] hover:text-white transition-colors cursor-pointer truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                  <span className="truncate">{founderEmail}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                  className="p-2.5 rounded-xl bg-[#151a24] hover:bg-[#1c2230] border border-white/[0.1] text-[#cbd5e1] hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#10b981]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* WhatsApp & Telegram Direct Chat Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#34d399] hover:text-white text-xs font-semibold transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(37,211,102,0.25)]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 shrink-0" />
                </a>

                {/* Telegram Button */}
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 text-[#38bdf8] hover:text-white text-xs font-semibold transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(34,158,217,0.25)]"
                >
                  <Send className="w-3.5 h-3.5 text-[#229ED9] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">Telegram</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 shrink-0" />
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

