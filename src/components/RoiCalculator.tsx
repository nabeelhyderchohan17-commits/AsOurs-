import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TRADES_DATA } from '../data/tradesData';
import { ContractorTradeId } from '../types';
import { Calculator, DollarSign, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBookCall: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBookCall }) => {
  const [selectedTradeId, setSelectedTradeId] = useState<ContractorTradeId>('roofing');
  const [adSpend, setAdSpend] = useState<number>(3500);
  const [avgJobValue, setAvgJobValue] = useState<number>(12800);
  const [closeRate, setCloseRate] = useState<number>(30);

  const activeTrade = TRADES_DATA.find((t) => t.id === selectedTradeId) || TRADES_DATA[0];

  // Calculations
  const costPerLead = 65;
  const projectedLeads = Math.floor(adSpend / costPerLead);
  const instantQuotesGenerated = Math.floor(projectedLeads * 0.85);
  const closedJobs = Math.max(1, Math.floor((projectedLeads * (closeRate / 100))));
  const projectedGrossRevenue = closedJobs * avgJobValue;
  const netProfitEstimated = projectedGrossRevenue - adSpend;
  const roasMultiple = (projectedGrossRevenue / adSpend).toFixed(1);

  return (
    <section id="roi-calculator" className="py-24 bg-[#07090e] border-t border-white/[0.12] text-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.12)] border border-[rgba(255,85,0,0.25)] text-[#ff8800] text-xs font-semibold mb-4 backdrop-blur-md">
            <Calculator className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Interactive Growth Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight font-sans mb-4">
            Calculate Your <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">Monthly ROI Potential</span>
          </h2>
          <p className="text-[#8092a8] text-sm sm:text-base leading-relaxed">
            See how much revenue your contracting business can generate each month when combining targeted US paid ads with our instant quote widget.
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#151a24] border border-white/[0.12] space-y-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
            
            {/* Trade Selector */}
            <div>
              <label className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wider block mb-2">
                1. Select Your Trade
              </label>
              <select
                id="roi-trade-select"
                value={selectedTradeId}
                onChange={(e) => {
                  const id = e.target.value as ContractorTradeId;
                  setSelectedTradeId(id);
                  const t = TRADES_DATA.find((x) => x.id === id);
                  if (t) {
                    const numVal = parseInt(t.avgTicket.replace(/[^0-9]/g, ''), 10);
                    if (!isNaN(numVal)) setAvgJobValue(numVal);
                  }
                }}
                className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] font-semibold text-sm focus:border-[#ff5500] outline-none cursor-pointer"
              >
                {TRADES_DATA.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (Avg Job ~ {t.avgTicket})
                  </option>
                ))}
              </select>
            </div>

            {/* Ad Spend Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-[#cbd5e1]">2. Monthly Paid Ad Budget</label>
                <span className="text-[#ff8800] font-mono font-bold text-base bg-[rgba(255,85,0,0.12)] px-3 py-1 rounded border border-[rgba(255,85,0,0.25)]">
                  ${adSpend.toLocaleString()} / mo
                </span>
              </div>
              <input
                id="roi-adspend-slider"
                type="range"
                min={500}
                max={15000}
                step={250}
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-[#ff5500] cursor-pointer h-2 bg-[#1c2230] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#8092a8] font-mono">
                <span>$500 / mo</span>
                <span>$15,000 / mo</span>
              </div>
            </div>

            {/* Average Job Value Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-[#cbd5e1]">3. Average Job Revenue / Ticket</label>
                <span className="text-[#ff8800] font-mono font-bold text-base bg-[rgba(255,85,0,0.12)] px-3 py-1 rounded border border-[rgba(255,85,0,0.25)]">
                  ${avgJobValue.toLocaleString()}
                </span>
              </div>
              <input
                id="roi-jobvalue-slider"
                type="range"
                min={2500}
                max={45000}
                step={500}
                value={avgJobValue}
                onChange={(e) => setAvgJobValue(Number(e.target.value))}
                className="w-full accent-[#ff5500] cursor-pointer h-2 bg-[#1c2230] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#8092a8] font-mono">
                <span>$2,500</span>
                <span>$45,000</span>
              </div>
            </div>

            {/* Close Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-[#cbd5e1]">4. Estimated Lead Close Rate</label>
                <span className="text-[#ff8800] font-mono font-bold text-base bg-[rgba(255,85,0,0.12)] px-3 py-1 rounded border border-[rgba(255,85,0,0.25)]">
                  {closeRate}%
                </span>
              </div>
              <input
                id="roi-closerate-slider"
                type="range"
                min={15}
                max={50}
                step={5}
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full accent-[#ff5500] cursor-pointer h-2 bg-[#1c2230] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#8092a8] font-mono">
                <span>15% (Conservative)</span>
                <span>50% (High Speed-to-Call)</span>
              </div>
            </div>
          </div>

          {/* Results Output Column (5 cols) - Fully Responsive */}
          <div className="lg:col-span-5 p-5 sm:p-7 md:p-8 pt-10 sm:pt-9 rounded-3xl bg-gradient-to-br from-[#151a24] via-[#0e121a] to-[#151a24] border border-[rgba(255,85,0,0.35)] flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Top Gradient Badge - Fully Responsive with fluid font, padding and border radius */}
            <div className="absolute top-0 right-0 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] text-white font-extrabold text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-wider rounded-bl-xl sm:rounded-bl-2xl shadow-md select-none shrink-0">
              Calculated Projection
            </div>

            <div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ff8800] mb-1">
                {activeTrade.name} Growth
              </p>
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#f8fafc] mb-4 sm:mb-6 leading-tight">
                Estimated Monthly Return
              </h3>

              <div className="space-y-3.5 sm:space-y-4 mb-6 sm:mb-8">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0e121a] border border-white/[0.12] flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#8092a8] font-medium">Qualified Monthly Leads</p>
                    <p className="text-base sm:text-lg font-bold font-mono text-[#f8fafc]">~ {projectedLeads} Leads</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#ff8800] bg-[rgba(255,85,0,0.12)] px-2.5 py-1 rounded border border-[rgba(255,85,0,0.25)] shrink-0">
                    ~{instantQuotesGenerated} Quotes
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0e121a] border border-white/[0.12] flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#8092a8] font-medium">Estimated Closed Contracts</p>
                    <p className="text-base sm:text-lg font-bold font-mono text-emerald-400">{closedJobs} Closed Jobs / mo</p>
                  </div>
                  <span className="text-xs font-bold text-[#cbd5e1] shrink-0">At {closeRate}% Close</span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0e121a] border border-[rgba(255,85,0,0.3)] text-center shadow-lg">
                  <p className="text-[11px] sm:text-xs text-[#ff8800] font-bold uppercase tracking-wider mb-1">
                    Projected Gross Monthly Revenue
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ff8800] font-mono tracking-tight break-all sm:break-normal">
                    ${projectedGrossRevenue.toLocaleString()}
                  </p>
                  <p className="text-[11px] sm:text-xs text-emerald-400 font-bold mt-1">
                    ~ {roasMultiple}x Estimated Return on Ad Spend (ROAS)
                  </p>
                </div>
              </div>
            </div>

            <button
              id="roi-claim-plan-btn"
              onClick={onOpenBookCall}
              className="w-full py-3.5 sm:py-4 px-4 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_35px_rgba(255,85,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="text-center">Claim This Growth Plan For Your Business</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </motion.div>

        {/* Realistic Market Disclosure Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-6 p-4 sm:p-5 rounded-2xl bg-[#0e121a]/90 border border-white/[0.1] flex items-start gap-3.5 backdrop-blur-md shadow-md"
        >
          <Info className="w-4 h-4 text-[#ff8800] shrink-0 mt-0.5" />
          <div className="text-xs text-[#94a3b8] leading-relaxed space-y-1">
            <p>
              <span className="text-[#cbd5e1] font-semibold">Please Note:</span> Required ad budgets and lead costs vary based on local market competition, population density, and target service areas.
            </p>
            <p>
              Actual revenue and final ROI depend directly on your team’s speed-to-lead, on-site walkthroughs, and in-person closing rate. These figures represent mathematical scenario models based on industry averages and do not constitute a performance guarantee.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
