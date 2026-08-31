import React from 'react';
import { motion } from 'motion/react';

export const WavingBanner: React.FC = () => {
  // Repeating text items for seamless continuous ticker
  const items = Array(8).fill('Done-for-you service by AsOurs');

  return (
    <div className="w-full overflow-hidden py-5 sm:py-7 bg-[#07090e] border-y border-white/[0.08] relative z-20 select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff5500]/12 via-transparent to-[#ff2200]/12 pointer-events-none" />

      {/* Marquee Track with continuous animation */}
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 24,
            repeat: Infinity,
          }}
          className="flex items-center gap-10 sm:gap-16 whitespace-nowrap"
        >
          {items.map((text, idx) => (
            <div key={idx} className="flex items-center gap-7 sm:gap-10">
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] drop-shadow-[0_2px_16px_rgba(255,85,0,0.35)]">
                {text}
              </span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5500] shadow-[0_0_12px_#ff5500] shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
