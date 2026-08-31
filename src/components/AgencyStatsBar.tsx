import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Zap, PhoneCall, TrendingUp, ShieldCheck } from 'lucide-react';

export const AgencyStatsBar: React.FC = () => {
  const stats = [
    {
      icon: DollarSign,
      value: '$18,400,000+',
      label: 'Contractor Pipeline Built',
      subtext: 'Across US roofing, remodeling & HVAC partners',
    },
    {
      icon: Zap,
      value: '3.2x',
      label: 'Higher Form Conversion',
      subtext: 'Compared to standard static "Free Estimate" forms',
    },
    {
      icon: PhoneCall,
      value: '< 60 Secs',
      label: 'Speed-to-Call Response',
      subtext: 'Instant SMS & phone dispatch to contractor',
    },
    {
      icon: TrendingUp,
      value: '8+ Trades',
      label: 'US Specialty Categories',
      subtext: 'Custom priced for your exact local market',
    },
  ];

  return (
    <section className="bg-[#07090e] border-y border-white/[0.12] py-10 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-[#151a24] border border-white/[0.12] hover:border-[rgba(255,85,0,0.45)] transition-all group backdrop-blur-sm shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,85,0,0.15)] border border-[rgba(255,85,0,0.3)] flex items-center justify-center text-[#ff5500] group-hover:bg-gradient-to-r group-hover:from-[#ff6b00] group-hover:to-[#ff2a00] group-hover:text-white transition-all shadow-[0_0_15px_rgba(255,85,0,0.2)]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] font-mono tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm font-bold text-[#f8fafc] mb-1">{stat.label}</p>
                <p className="text-xs text-[#8092a8] leading-relaxed">{stat.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
