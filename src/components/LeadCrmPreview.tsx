import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LeadSubmission } from '../types';
import {
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  UserCheck,
  Search,
  Filter,
  ArrowUpRight,
  Zap,
  Sparkles,
  PhoneForwarded,
} from 'lucide-react';

interface LeadCrmPreviewProps {
  newlySubmittedLead?: LeadSubmission | null;
}

export const LeadCrmPreview: React.FC<LeadCrmPreviewProps> = ({ newlySubmittedLead }) => {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  // Fetch initial leads from Express server API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads');
        const data = await response.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      } catch (err) {
        console.warn('Could not fetch server leads, using local state:', err);
      }
    };
    fetchLeads();
  }, []);

  // Prepend newly submitted lead from widget demo
  useEffect(() => {
    if (newlySubmittedLead) {
      setLeads((prev) => {
        const exists = prev.some(
          (l) => l.phone === newlySubmittedLead.phone && l.contractorTrade === newlySubmittedLead.contractorTrade
        );
        if (exists) return prev;
        return [
          {
            ...newlySubmittedLead,
            id: `lead-${Date.now()}`,
            status: 'New Quote',
            submittedAt: new Date().toISOString(),
          },
          ...prev,
        ];
      });
    }
  }, [newlySubmittedLead]);

  // Handle call action simulation
  const handleSimulateCall = (leadId: string) => {
    setActiveCallId(leadId);
    setTimeout(() => {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: 'Called (<1m)' } : l))
      );
      setActiveCallId(null);
    }, 1800);
  };

  const filteredLeads = leads.filter((l) => {
    if (filterStatus === 'All') return true;
    return l.status === filterStatus;
  });

  return (
    <section id="crm-preview" className="py-20 md:py-24 bg-[#07090e] border-t border-white/[0.12] text-[#f8fafc] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[rgba(255,85,0,0.1)] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[rgba(255,34,0,0.06)] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Fully Responsive */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.12)] border border-[rgba(255,85,0,0.25)] text-[#ff8800] text-xs font-semibold mb-3 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Speed-To-Call Contractor CRM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#f8fafc] tracking-tight font-sans">
              Instant Quote Leads <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">Pushed To Your Phone</span>
            </h2>
            <p className="text-[#94a3b8] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
              When a homeowner finishes their instant quote calculation, their details appear here in real-time. You receive an instant SMS notification so you can call them in under 60 seconds while their intent is highest.
            </p>
          </div>

          {/* CRM Quick Stats */}
          <div className="flex items-center gap-3 sm:gap-4 bg-[#151a24] p-3.5 sm:p-4 rounded-2xl border border-white/[0.12] shadow-xl backdrop-blur-md self-start lg:self-auto shrink-0">
            <div className="text-center px-2.5 sm:px-3 border-r border-white/[0.1]">
              <p className="text-[10px] uppercase text-[#8092a8] font-bold tracking-wider">Avg Speed To Call</p>
              <p className="text-base sm:text-lg font-mono font-extrabold text-[#ff8800]">38 Seconds</p>
            </div>
            <div className="text-center px-2.5 sm:px-3">
              <p className="text-[10px] uppercase text-[#8092a8] font-bold tracking-wider">Quote To Call Lock</p>
              <p className="text-base sm:text-lg font-mono font-extrabold text-emerald-400">84.2%</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive CRM Dashboard Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl bg-[#0e121a] border border-white/[0.12] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-xl"
        >
          
          {/* CRM Navigation & Filter Bar - Smooth Touch Horizontal Scroll */}
          <div className="p-3.5 sm:p-5 bg-[#090c12] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-thin">
              {(['All', 'New Quote', 'Called (<1m)', 'Site Visit', 'Signed'] as const).map((status) => (
                <button
                  key={status}
                  id={`crm-filter-${status.replace(/\s+/g, '-')}`}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] text-white shadow-md shadow-[rgba(255,85,0,0.3)]'
                      : 'bg-[#151a24] text-[#cbd5e1] hover:text-white border border-white/[0.08] hover:border-white/[0.18]'
                  }`}
                >
                  {status === 'All' ? 'All Live Leads' : status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#8092a8] font-medium shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[#cbd5e1]">Live Feed Active</span>
            </div>
          </div>

          {/* Lead Cards Grid - Fully Responsive */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.length === 0 ? (
              <div className="col-span-full py-12 text-center text-[#8092a8] text-sm">
                No leads found for status &quot;{filterStatus}&quot;. Test the Instant Quote tool above to generate a new live lead!
              </div>
            ) : (
              filteredLeads.map((lead, index) => {
                const isCalling = activeCallId === lead.id;
                return (
                  <motion.div
                    key={lead.id || lead.phone}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="p-4 sm:p-5 rounded-2xl bg-[#151a24] border border-white/[0.1] hover:border-[#ff5500]/50 transition-all flex flex-col justify-between group relative shadow-md"
                  >
                    {/* Card Top Header */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[rgba(255,85,0,0.12)] text-[#ff8800] border border-[rgba(255,85,0,0.25)] truncate max-w-[150px]">
                          {lead.contractorTrade}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                            lead.status === 'New Quote'
                              ? 'bg-[#ff2200]/20 text-[#ff8800] border-[#ff2200]/40 animate-pulse'
                              : lead.status === 'Called (<1m)'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : lead.status === 'Signed'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          }`}
                        >
                          {lead.status || 'New Quote'}
                        </span>
                      </div>

                      {/* Homeowner Name & Budget */}
                      <div className="mb-4">
                        <h4 className="text-base font-extrabold text-white group-hover:text-[#ff8800] transition-colors truncate">
                          {lead.homeownerName}
                        </h4>
                        <p className="text-xs text-[#8092a8] mt-0.5 font-medium truncate">
                          Zip: {lead.zipCode} • Scope: {lead.projectScope}
                        </p>
                        
                        <div className="mt-3 p-3 rounded-xl bg-[#0e121a] border border-white/[0.08] flex justify-between items-center">
                          <div>
                            <p className="text-[10px] text-[#8092a8] uppercase font-semibold">Estimated Budget</p>
                            <p className="text-sm font-extrabold text-[#ff8800] font-mono">
                              {lead.estimatedBudget.formatted}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold text-[#cbd5e1] bg-[#1a212e] px-2 py-0.5 rounded border border-white/[0.06]">
                            {lead.tier} Tier
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Speed Call Action Button */}
                    <div className="pt-3 border-t border-white/[0.08] space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono text-[#cbd5e1]">
                        <span className="font-bold">{lead.phone}</span>
                        <span className="text-[10px] text-[#8092a8] font-sans font-medium">
                          {lead.submittedAt ? 'Just now' : 'Recent'}
                        </span>
                      </div>

                      <button
                        id={`crm-call-btn-${lead.id}`}
                        onClick={() => handleSimulateCall(lead.id || 'lead-1')}
                        disabled={isCalling}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer"
                      >
                        {isCalling ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Dialing Lead Phone...</span>
                          </>
                        ) : (
                          <>
                            <PhoneForwarded className="w-3.5 h-3.5" />
                            <span>Instant Call Homeowner</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
