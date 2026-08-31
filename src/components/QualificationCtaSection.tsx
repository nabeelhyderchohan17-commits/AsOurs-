import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRADES_DATA } from '../data/tradesData';
import { ContractorQualificationLead } from '../types';
import { sendEmailNotification } from '../utils/emailService';
import {
  Sparkles,
  Send,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Mail,
  Building,
  Target
} from 'lucide-react';

export const QualificationCtaSection: React.FC = () => {
  const [contractorName, setContractorName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [trade, setTrade] = useState('Roofing');
  const [monthlyRevenue, setMonthlyRevenue] = useState('$30k - $75k / mo');
  const [adBudget, setAdBudget] = useState('$2,000 - $4,000 / mo');
  const [serviceArea, setServiceArea] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [biggestChallenge, setBiggestChallenge] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<ContractorQualificationLead | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractorName || !phone || !email || !serviceArea) return;

    setIsSubmitting(true);
    const payload: ContractorQualificationLead = {
      contractorName,
      companyName: companyName || `${contractorName}'s Contracting Co.`,
      trade,
      monthlyRevenue,
      adBudget,
      serviceArea,
      phone,
      email,
      biggestChallenge,
      submittedAt: new Date().toISOString(),
    };

    // Client-side direct email dispatch to nabeelhyderchohan767@gmail.com
    sendEmailNotification({
      formType: 'Territory Qualification Application',
      subject: `New Contractor Application: ${contractorName} - ${payload.companyName} (${serviceArea})`,
      fields: {
        'Contractor Name': contractorName,
        'Company Name': payload.companyName,
        'Trade / Specialty': trade,
        'Current Monthly Revenue': monthlyRevenue,
        'Monthly Ad Budget': adBudget,
        'Service Territory': serviceArea,
        'Phone Number': phone,
        'Email Address': email,
        'Growth Bottleneck / Goals': biggestChallenge || 'Looking for predictable leads and quote widget',
      },
    }).catch((e) => console.warn('Direct notification dispatched:', e));

    try {
      const res = await fetch('/api/contractor-qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedLead(payload);
      } else {
        setSubmittedLead(payload);
      }
    } catch (err) {
      console.error('Qualification submit error:', err);
      setSubmittedLead(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setContractorName('');
    setCompanyName('');
    setServiceArea('');
    setPhone('');
    setEmail('');
    setBiggestChallenge('');
  };

  return (
    <section id="qualify" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#07090e] via-[#0e121a] to-[#07090e] text-[#f8fafc] relative overflow-hidden border-t border-white/[0.12]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[rgba(255,85,0,0.15)] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[rgba(255,85,0,0.1)] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.12)] border border-[rgba(255,85,0,0.25)] text-[#ff8800] text-xs font-semibold mb-4 backdrop-blur-md">
            <Target className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
            <span>Territory Exclusivity Application</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight font-sans mb-3 sm:mb-4">
            Build Another Source of <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">Regular Jobs.</span>
          </h2>
          <p className="text-[#94a3b8] text-xs sm:text-sm md:text-base leading-relaxed">
            Tell us a little about your business and we&apos;ll show you how we&apos;d approach building another source of homeowner enquiries around your service, market and current capacity.
          </p>
        </motion.div>

        {/* Qualification Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl bg-[#151a24] border border-white/[0.12] shadow-2xl p-5 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {submittedLead ? (
              /* Success confirmation state */
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 sm:py-10 space-y-6"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[rgba(255,85,0,0.15)] border border-[rgba(255,85,0,0.3)] flex items-center justify-center text-[#ff5500] mx-auto shadow-lg">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#ff8800] uppercase tracking-widest bg-[rgba(255,85,0,0.12)] px-3 py-1 rounded border border-[rgba(255,85,0,0.25)]">
                    Application Received & Routed to Nabeel
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#f8fafc] mt-4">
                    Thank You, {submittedLead.contractorName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8092a8] max-w-md mx-auto mt-2 leading-relaxed">
                    Your business qualification for <strong className="text-[#cbd5e1]">{submittedLead.companyName}</strong> in <strong className="text-[#ff8800]">{submittedLead.serviceArea}</strong> is currently being reviewed by Nabeel.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0e121a] border border-white/[0.12] max-w-md mx-auto text-left text-xs space-y-2.5 shadow-inner">
                  <div className="flex justify-between">
                    <span className="text-[#8092a8]">Selected Trade:</span>
                    <span className="font-bold text-[#f8fafc]">{submittedLead.trade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8092a8]">Target Territory:</span>
                    <span className="font-bold text-[#ff8800]">{submittedLead.serviceArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8092a8]">Response Method:</span>
                    <span className="font-bold text-emerald-400">Direct Phone/SMS to {submittedLead.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8092a8]">Estimated Response:</span>
                    <span className="font-bold text-[#f8fafc]">&lt; 30 Minutes</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                  <a
                    href="tel:18005550199"
                    className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(255,85,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 shrink-0" />
                    <span>Call Direct Hotline: (800) 555-0199</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-[#0e121a] hover:bg-[#1c2230] text-[#cbd5e1] border border-white/[0.16] text-xs font-bold transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Qualification Form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5 sm:space-y-6"
              >
                <div className="border-b border-white/[0.12] pb-4 mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#f8fafc]">Contractor Qualification Application</h3>
                    <p className="text-xs text-[#8092a8] mt-0.5">
                      Direct review by Nabeel • No obligation • 30-minute territory analysis
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#ff8800] bg-[rgba(255,85,0,0.12)] px-3 py-1.5 rounded-xl border border-[rgba(255,85,0,0.25)] font-semibold shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                    <span>Average Review Time: 15–30 Mins</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="qual-contractor-name"
                      type="text"
                      required
                      value={contractorName}
                      onChange={(e) => setContractorName(e.target.value)}
                      placeholder="e.g. Jason Miller"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Company / Business Name *
                    </label>
                    <input
                      id="qual-company-name"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Roofing & Remodeling"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Primary Trade / Specialty *
                    </label>
                    <select
                      id="qual-trade"
                      value={trade}
                      onChange={(e) => setTrade(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none cursor-pointer"
                    >
                      {TRADES_DATA.map((t) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                      <option value="General Contracting / Multiple Trades">General Contracting</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Current Monthly Revenue *
                    </label>
                    <select
                      id="qual-revenue"
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none cursor-pointer"
                    >
                      <option value="Under $25k / mo">Under $25k / mo</option>
                      <option value="$25k - $50k / mo">$25k - $50k / mo</option>
                      <option value="$50k - $100k / mo">$50k - $100k / mo</option>
                      <option value="$100k - $250k / mo">$100k - $250k / mo</option>
                      <option value="$250k+ / mo">$250k+ / mo</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Monthly Ad Budget Plan *
                    </label>
                    <select
                      id="qual-budget"
                      value={adBudget}
                      onChange={(e) => setAdBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none cursor-pointer"
                    >
                      <option value="$1,500 - $3,000 / mo">$1,500 - $3,000 / mo</option>
                      <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / mo</option>
                      <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                      <option value="$10,000+ / mo">$10,000+ / mo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Primary Service Territory (City, State, Zip) *
                    </label>
                    <input
                      id="qual-territory"
                      type="text"
                      required
                      value={serviceArea}
                      onChange={(e) => setServiceArea(e.target.value)}
                      placeholder="e.g. Austin, TX & surrounding 30 miles"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Direct Phone Number (Cell) *
                    </label>
                    <input
                      id="qual-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(512) 555-0199"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="qual-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jason@apexroofing.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#cbd5e1] block mb-1.5">
                    What is your biggest current growth bottleneck? (Optional)
                  </label>
                  <input
                    id="qual-bottleneck"
                    type="text"
                    value={biggestChallenge}
                    onChange={(e) => setBiggestChallenge(e.target.value)}
                    placeholder="e.g. Unsteady lead volume between seasons, need more qualified kitchen remodel jobs..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0e121a] border border-white/[0.16] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="qual-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-4 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_35px_rgba(255,85,0,0.4)] transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>Submitting Application to Nabeel...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 shrink-0" />
                        <span className="text-center">Submit For Territory Qualification & Free Strategy Blueprint</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-[#8092a8] pt-3 border-t border-white/[0.12]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                    <span>100% Confidential</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                    <span>No Shared Leads / 1 Contractor Per Territory</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                    <span>Delivered Directly to Founder</span>
                  </div>
                </div>

              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
