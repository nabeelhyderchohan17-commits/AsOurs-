import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Zap,
  Users,
  DollarSign,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export const CaseStudiesSection: React.FC = () => {
  const caseStudies = [
    {
      companyName: 'Apex Roofing & Exterior',
      contractorName: 'Marcus Vance',
      trade: 'Roofing & Siding',
      location: 'Dallas, TX',
      image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=900&q=80',
      revenueGrowth: '+108%',
      monthlyRevenue: '$142k/mo',
      previousRevenue: '$68k/mo',
      monthlyLeads: '38 Leads',
      costPerLead: '$58.40',
      speedToLead: '42s response',
      highlightQuote: 'Homeowners get accurate roof ballpark estimates in 10s. When we call, they are already pre-sold and ready to book inspections.',
      tags: ['Meta Ads', 'Instant Calculator', 'Speed-to-Lead'],
    },
    {
      companyName: 'Precision Kitchen & Bath',
      contractorName: 'David Miller',
      trade: 'Kitchen & Bath',
      location: 'Orlando, FL',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      revenueGrowth: '+162%',
      monthlyRevenue: '$118k/mo',
      previousRevenue: '$45k/mo',
      monthlyLeads: '26 Leads',
      costPerLead: '$74.20',
      speedToLead: '35s response',
      highlightQuote: 'Eliminated $5k tire-kickers. The quote experience pre-qualifies their $30k+ budget upfront before we ever drive out.',
      tags: ['Google Search', 'High-Ticket Remodel', 'Custom Scope'],
    },
    {
      companyName: 'Desert Climate HVAC',
      contractorName: 'Carlos Rodriguez',
      trade: 'HVAC & Heat Pumps',
      location: 'Phoenix, AZ',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
      revenueGrowth: '+159%',
      monthlyRevenue: '$135k/mo',
      previousRevenue: '$52k/mo',
      monthlyLeads: '44 Leads',
      costPerLead: '$49.80',
      speedToLead: '28s response',
      highlightQuote: 'Instant SMS notifications allow our dispatch to reach homeowners while their AC breakdown is top-of-mind.',
      tags: ['Meta + Google', 'Instant SMS Alert', 'High-Volume'],
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-[#07090e] text-[#f8fafc] relative overflow-hidden border-t border-white/[0.12]">
      {/* Background Lighting Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[rgba(255,85,0,0.1)] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[rgba(255,34,0,0.06)] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.12)] border border-[rgba(255,85,0,0.25)] text-[#ff8800] text-xs font-semibold mb-4 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Verified Contractor Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight font-sans mb-4">
            US Contractors with <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">Predictable Work Every Month</span>
          </h2>
          <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
            Direct performance benchmarks from trade businesses leveraging dedicated paid ads and instant quote conversion technology.
          </p>
        </motion.div>

        {/* Sleek, Image-Enriched Responsive Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.companyName}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-[#0e131d] border border-white/[0.12] hover:border-[#ff5500]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl group"
            >
              <div>
                {/* Visual Image Header with Badges Overlay */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden bg-[#151c28]">
                  <img
                    src={study.image}
                    alt={study.companyName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e131d] via-[#0e131d]/40 to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#ff8800] text-xs font-bold font-mono tracking-tight flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-[#ff5500]" />
                      {study.trade}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#cbd5e1] text-[11px] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#ff5500]" />
                      {study.location}
                    </span>
                  </div>

                  {/* Growth Transformation Pill (Bottom Right of Image) */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] text-white font-extrabold text-xs font-mono shadow-lg flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{study.revenueGrowth} Rev</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  {/* Company & Owner Header */}
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-[#ff8800] transition-colors">
                      {study.companyName}
                    </h3>
                    <p className="text-xs text-[#94a3b8] font-medium mt-0.5">
                      Contractor: <span className="text-[#cbd5e1] font-semibold">{study.contractorName}</span>
                    </p>
                  </div>

                  {/* Revenue Growth Box */}
                  <div className="p-3.5 rounded-2xl bg-[#141b27] border border-white/[0.08] grid grid-cols-2 gap-3 mb-4 items-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8092a8] tracking-wider block">Before Ads</span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-[#cbd5e1]">{study.previousRevenue}</span>
                    </div>
                    <div className="border-l border-white/[0.08] pl-3">
                      <span className="text-[10px] uppercase font-bold text-[#ff8800] tracking-wider block">With System</span>
                      <span className="text-sm sm:text-base font-extrabold font-mono text-emerald-400">{study.monthlyRevenue}</span>
                    </div>
                  </div>

                  {/* Concise Quote (Not text-heavy) */}
                  <p className="text-xs text-[#cbd5e1] leading-relaxed italic line-clamp-3 relative pl-3 border-l-2 border-[#ff5500] mb-5">
                    &quot;{study.highlightQuote}&quot;
                  </p>

                  {/* Tags Pill Row */}
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2.5 py-0.5 rounded-lg bg-[#151c28] text-[#94a3b8] border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metrics Strip */}
              <div className="p-4 sm:px-6 bg-[#090c12] border-t border-white/[0.08] grid grid-cols-3 gap-2 text-center text-[10px]">
                <div>
                  <span className="text-[#8092a8] uppercase font-semibold block">Volume</span>
                  <span className="font-mono font-bold text-white text-xs mt-0.5 block">{study.monthlyLeads}</span>
                </div>
                <div className="border-x border-white/[0.08]">
                  <span className="text-[#8092a8] uppercase font-semibold block">Cost/Lead</span>
                  <span className="font-mono font-bold text-[#ff8800] text-xs mt-0.5 block">{study.costPerLead}</span>
                </div>
                <div>
                  <span className="text-[#8092a8] uppercase font-semibold block">Response</span>
                  <span className="font-mono font-bold text-emerald-400 text-xs mt-0.5 block">{study.speedToLead}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
