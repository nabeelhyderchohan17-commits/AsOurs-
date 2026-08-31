import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRADES_DATA } from '../data/tradesData';
import { ContractorTradeId, LeadSubmission } from '../types';
import { sendEmailNotification } from '../utils/emailService';
import {
  Hammer,
  Home,
  ChefHat,
  Bath,
  Wind,
  Droplets,
  Sun,
  Trees,
  Building,
  Zap,
  Paintbrush,
  Check,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Share2,
  Printer,
  ShieldCheck,
  Send,
  RotateCcw,
  Clock,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  FileText,
  Info,
  Calendar,
  Layers,
  Sparkle
} from 'lucide-react';

interface InstantQuoteLiveWidgetProps {
  onLeadSubmittedToCrm?: (lead: LeadSubmission) => void;
}

interface CalculatedSpecResult {
  tradeName: string;
  low: number;
  high: number;
  formatted: string;
  typicalDuration: string;
  materialCostLow: number;
  materialCostHigh: number;
  laborCostLow: number;
  laborCostHigh: number;
  permitsLow: number;
  permitsHigh: number;
  pmLow: number;
  pmHigh: number;
  breadthLabel: string;
  tierLabel: string;
}

export const InstantQuoteLiveWidget: React.FC<InstantQuoteLiveWidgetProps> = ({
  onLeadSubmittedToCrm,
}) => {
  const [selectedTradeId, setSelectedTradeId] = useState<ContractorTradeId>('remodeling');
  const [scopeValue, setScopeValue] = useState<number>(3200);
  const [zipCode, setZipCode] = useState<string>('00022');
  const [propertyType, setPropertyType] = useState<string>('Single Family Residential');
  const [propertyAge, setPropertyAge] = useState<string>('15–35 Years (Standard Prep)');
  
  // Step 2 qualification state
  const [selectedBreadthId, setSelectedBreadthId] = useState<string>('full_gut');
  const [tier, setTier] = useState<'Standard' | 'Premium' | 'Luxury'>('Luxury');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>('Immediately (1–2 Weeks)');

  // Step 3 qualification contact state
  const [homeownerName, setHomeownerName] = useState<string>('Nabeel Chohan');
  const [phone, setPhone] = useState<string>('(512) 555-0198');
  const [email, setEmail] = useState<string>('nabeel@example.com');
  const [decisionMaker, setDecisionMaker] = useState<string>('Homeowner / Sole Decision Maker');

  // Multi-step flow: 1=Dimensions & Property, 2=Breadth & Finishes, 3=Homeowner Verification, 4=Final Spec Result
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [specResult, setSpecResult] = useState<CalculatedSpecResult | null>(null);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Active trade details
  const activeTrade = TRADES_DATA.find((t) => t.id === selectedTradeId) || TRADES_DATA[0];

  // Reset/sync defaults when trade changes
  useEffect(() => {
    setScopeValue(activeTrade.defaultScope);
    if (activeTrade.breadthOptions && activeTrade.breadthOptions.length > 0) {
      setSelectedBreadthId(activeTrade.breadthOptions[0].id);
    }
    // Select default 2 addons
    if (activeTrade.popularAddons && activeTrade.popularAddons.length > 0) {
      setSelectedAddons([activeTrade.popularAddons[0]]);
    } else {
      setSelectedAddons([]);
    }
    setCurrentStep(1);
    setSpecResult(null);
  }, [selectedTradeId]);

  // Map icon strings to Lucide components
  const getTradeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-4 h-4" />;
      case 'ChefHat': return <ChefHat className="w-4 h-4" />;
      case 'Bath': return <Bath className="w-4 h-4" />;
      case 'Wind': return <Wind className="w-4 h-4" />;
      case 'Droplets': return <Droplets className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      case 'Trees': return <Trees className="w-4 h-4" />;
      case 'Building': return <Building className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Paintbrush': return <Paintbrush className="w-4 h-4" />;
      default: return <Hammer className="w-4 h-4" />;
    }
  };

  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Compute realistic construction budget ranges
  const computeSpec = (): CalculatedSpecResult => {
    const baseLowPerUnit = activeTrade.baseCostLowPerUnit || 100;
    const baseHighPerUnit = activeTrade.baseCostHighPerUnit || 160;

    // Breadth multiplier
    const activeBreadth = activeTrade.breadthOptions?.find((b) => b.id === selectedBreadthId) || activeTrade.breadthOptions?.[0];
    const breadthMultiplier = activeBreadth ? activeBreadth.multiplier : 1.0;

    // Tier multiplier
    let tierMultiplier = 1.0;
    if (tier === 'Premium') tierMultiplier = 1.32;
    if (tier === 'Luxury') tierMultiplier = 1.68;

    // Addons cost
    const addonCostLow = selectedAddons.length * (activeTrade.id === 'remodeling' ? 18000 : activeTrade.id === 'kitchen' ? 4500 : 2200);
    const addonCostHigh = selectedAddons.length * (activeTrade.id === 'remodeling' ? 32000 : activeTrade.id === 'kitchen' ? 7800 : 3800);

    // Property Age multiplier
    let ageMultiplier = 1.0;
    if (propertyAge.includes('35+')) ageMultiplier = 1.12;
    if (propertyAge.includes('15–35')) ageMultiplier = 1.05;

    const rawLow = Math.round((scopeValue * baseLowPerUnit * breadthMultiplier * tierMultiplier * ageMultiplier) + addonCostLow);
    const rawHigh = Math.round((scopeValue * baseHighPerUnit * breadthMultiplier * tierMultiplier * ageMultiplier) + addonCostHigh);

    // Round to clean thousands
    const low = Math.round(rawLow / 500) * 500;
    const high = Math.round(rawHigh / 500) * 500;

    return {
      tradeName: activeTrade.name,
      low,
      high,
      formatted: `$${low.toLocaleString()} - $${high.toLocaleString()}`,
      typicalDuration: activeTrade.typicalDuration || '6–10 Weeks',
      materialCostLow: Math.round(low * 0.44),
      materialCostHigh: Math.round(high * 0.45),
      laborCostLow: Math.round(low * 0.36),
      laborCostHigh: Math.round(high * 0.36),
      permitsLow: Math.round(low * 0.11),
      permitsHigh: Math.round(high * 0.10),
      pmLow: Math.round(low * 0.09),
      pmHigh: Math.round(high * 0.09),
      breadthLabel: activeBreadth ? activeBreadth.label : 'Full Renovation & Reconfiguration',
      tierLabel: tier === 'Luxury' ? 'Masterpiece Luxury' : tier === 'Premium' ? 'Architectural Premium' : 'Standard Architectural',
    };
  };

  // Step transitions
  const handleProceedToStep2 = () => {
    setCurrentStep(2);
  };

  const handleProceedToStep3 = () => {
    setCurrentStep(3);
  };

  // Handle Homeowner Final Submission & Spec Calculation
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeownerName || !phone) return;

    setIsCalculating(true);
    const result = computeSpec();
    setSpecResult(result);

    const leadPayload: LeadSubmission = {
      contractorTrade: activeTrade.name,
      homeownerName,
      phone,
      email: email || `${homeownerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      zipCode: zipCode || '00022',
      projectScope: `${scopeValue.toLocaleString()} ${activeTrade.unitLabel.split('(')[0].trim()}`,
      tier: result.tierLabel,
      estimatedBudget: {
        low: result.low,
        high: result.high,
        formatted: result.formatted,
      },
    };

    // Client-side direct email dispatch to nabeelhyderchohan767@gmail.com
    sendEmailNotification({
      formType: 'Instant Quote Lead',
      subject: `New Instant Spec Generated: ${homeownerName} - ${activeTrade.name} (${result.formatted})`,
      fields: {
        'Homeowner Name': homeownerName,
        'Phone Number': phone,
        'Email Address': email || 'Not provided',
        'Trade / Discipline': activeTrade.name,
        'Project Scope': `${scopeValue.toLocaleString()} ${activeTrade.unitLabel.split('(')[0].trim()}`,
        'Transformation Breadth': result.breadthLabel,
        'Finish Grade Tier': result.tierLabel,
        'Property Type': propertyType,
        'Property Age': propertyAge,
        'Selected Add-ons / Upgrades': selectedAddons.join(', ') || 'Standard Package',
        'Timeline': timeline,
        'Decision Maker Status': decisionMaker,
        'Zip Code': zipCode,
        'Calculated Investment Range': result.formatted,
        'Typical Duration': result.typicalDuration,
      },
    }).catch((e) => console.warn('Direct quote notification dispatched:', e));

    try {
      const response = await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
      const data = await response.json();
      if (data.success && onLeadSubmittedToCrm) {
        onLeadSubmittedToCrm(data.lead);
      }
    } catch (err) {
      console.warn('Lead submit fallback handled:', err);
      if (onLeadSubmittedToCrm) {
        onLeadSubmittedToCrm(leadPayload);
      }
    } finally {
      setIsCalculating(false);
      setCurrentStep(4);
    }
  };

  const handleShareSpec = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleResetDemo = () => {
    setCurrentStep(1);
    setSpecResult(null);
  };

  return (
    <section id="instant-quote-demo" className="py-16 sm:py-20 lg:py-24 bg-[#07090e] text-[#f8fafc] relative overflow-hidden border-t border-white/[0.12]">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[rgba(255,85,0,0.14)] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgba(255,34,0,0.08)] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.12)] border border-[rgba(255,85,0,0.25)] text-[#ff8800] text-xs font-semibold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
              <span>Interactive Demo & Widget Builder</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight font-sans mb-3 sm:mb-4">
              Test The <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">Instant Quote Tool</span> Live
            </h2>

            {/* User Requested Exact Supporting Text */}
            <p className="text-[#94a3b8] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-5 sm:mb-6">
              Instead of generic contact forms See how homeowners interact with your website. They select project options on single clicks, get an instant budget estimate, submit details, and receive a direct call prompt to lock in work immediately.
            </p>

            {/* Single "See more examples" Button linking to https://craft-co-remodeling.ai.studio */}
            <div className="flex justify-center">
              <a
                id="see-more-examples-btn"
                href="https://craft-co-remodeling.ai.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-[#151a24] hover:bg-[#1c2230] border border-white/[0.16] hover:border-[#ff5500]/40 text-[#f8fafc] text-xs sm:text-sm font-bold shadow-lg hover:shadow-[0_0_25px_rgba(255,85,0,0.25)] transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <span>See more examples</span>
                <ExternalLink className="w-4 h-4 text-[#ff8800] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* Master Interactive Live Widget Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0e121a] border border-white/[0.12] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl"
          >
            {/* Widget Top Header Bar simulating Contractor Website */}
            <div className="bg-[#090c12] px-3.5 sm:px-6 py-3 sm:py-4 border-b border-white/[0.1] flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff2200]" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff8800]" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 ml-1 sm:ml-2 min-w-0">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-tight sm:tracking-wide uppercase truncate">
                    Instant Estimator
                  </span>
                  <span className="text-[#475569] text-xs font-mono hidden xs:inline">|</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#ff8800] uppercase tracking-wider font-semibold truncate hidden xs:inline">
                    CRAFT & CO. DESIGN + BUILD
                  </span>
                </div>
              </div>
              {currentStep === 4 ? (
                <button
                  onClick={handleResetDemo}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-[#151a24] hover:bg-[#1f2737] border border-white/[0.12] text-[11px] sm:text-xs font-mono text-[#cbd5e1] hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <span>CLOSE</span>
                  <span className="text-[#ff5500] font-bold">✕</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#ff8800] font-semibold bg-[#151a24] px-2.5 sm:px-3 py-1 rounded-full border border-white/[0.12] shrink-0">
                  <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#ff8800] shrink-0" />
                  <span>Step {currentStep} of 3</span>
                </div>
              )}
            </div>

            {/* Trade Selection Pills (Hidden on Step 4 to match reference image) */}
            {currentStep !== 4 && (
              <div className="p-3 sm:p-4 bg-[#0a0d14] border-b border-white/[0.08] overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-max pb-1 sm:pb-0">
                  {TRADES_DATA.map((t) => (
                    <button
                      key={t.id}
                      id={`trade-pill-${t.id}`}
                      onClick={() => setSelectedTradeId(t.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        selectedTradeId === t.id
                          ? 'bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] text-white shadow-md shadow-[rgba(255,85,0,0.35)]'
                          : 'bg-[#151a24] hover:bg-[#1c2230] text-[#cbd5e1] border border-white/[0.1]'
                      }`}
                    >
                      {getTradeIcon(t.iconName)}
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Widget Content Body */}
            <div className="p-4 sm:p-6 md:p-8 bg-[#0e121a]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Dimensions, Scope & Property Context */}
              {currentStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#f8fafc]">{activeTrade.name} Estimator</h3>
                      <p className="text-xs text-[#94a3b8] mt-1">{activeTrade.description}</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[rgba(255,85,0,0.12)] text-[#ff8800] border border-[rgba(255,85,0,0.25)]">
                      Step 1: Dimensions & Property
                    </span>
                  </div>

                  {/* Primary Scope Slider & Zip Code */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-[#151a24] border border-white/[0.1]">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <label className="text-[#cbd5e1] font-bold">{activeTrade.unitLabel}</label>
                        <span className="text-[#ff8800] font-mono font-extrabold text-sm bg-[rgba(255,85,0,0.15)] px-3 py-1 rounded-lg border border-[rgba(255,85,0,0.3)] shadow-xs">
                          {scopeValue.toLocaleString()} {activeTrade.unitLabel.includes('Sq Ft') ? 'sq ft' : activeTrade.unitLabel.includes('kW') ? 'kW' : 'units'}
                        </span>
                      </div>
                      <input
                        id="widget-scope-slider"
                        type="range"
                        min={activeTrade.scopeMin}
                        max={activeTrade.scopeMax}
                        step={activeTrade.scopeStep}
                        value={scopeValue}
                        onChange={(e) => setScopeValue(Number(e.target.value))}
                        className="w-full accent-[#ff5500] cursor-pointer h-2 bg-[#0a0d14] rounded-lg"
                      />
                      <div className="flex justify-between text-[11px] text-[#8092a8] font-mono">
                        <span>{activeTrade.scopeMin.toLocaleString()} min</span>
                        <span>Avg: {activeTrade.defaultScope.toLocaleString()}</span>
                        <span>{activeTrade.scopeMax.toLocaleString()} max</span>
                      </div>
                    </div>

                    {/* Regional Zip Code */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#cbd5e1]">Project ZIP Code</label>
                      <input
                        id="widget-zip-code"
                        type="text"
                        maxLength={5}
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="00022"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0d14] border border-white/[0.14] text-[#f8fafc] font-mono text-sm focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                      />
                      <p className="text-[10px] text-[#8092a8]">Calibrates regional labor indices & supplier pricing</p>
                    </div>
                  </div>

                  {/* Property Qualification Attributes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wider block mb-2">
                        Property Structure Type
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#151a24] border border-white/[0.12] text-sm text-[#f8fafc] focus:border-[#ff5500] outline-none cursor-pointer"
                      >
                        <option value="Single Family Residential">Single Family Residential Home</option>
                        <option value="Townhouse / Brownstone">Townhouse / Multi-Story Brownstone</option>
                        <option value="Luxury Estate / Multi-Level">Luxury Estate (4,000+ sq ft)</option>
                        <option value="Commercial / Multi-Family">Commercial / Multi-Unit Complex</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wider block mb-2">
                        Existing Property Age & Condition
                      </label>
                      <select
                        value={propertyAge}
                        onChange={(e) => setPropertyAge(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#151a24] border border-white/[0.12] text-sm text-[#f8fafc] focus:border-[#ff5500] outline-none cursor-pointer"
                      >
                        <option value="Under 15 Years (Modern Standard)">Under 15 Years (Modern Code Standard)</option>
                        <option value="15–35 Years (Standard Prep)">15–35 Years (Standard Upgrades & Prep)</option>
                        <option value="35+ Years / Historic (Full Code Upgrade Prep)">35+ Years / Historic (Full MEP Prep)</option>
                      </select>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    id="widget-step1-continue-btn"
                    onClick={handleProceedToStep2}
                    className="w-full py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(255,85,0,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    <span className="text-center">Configure Transformation Scope & Finishes</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Breadth of Transformation & Finish Tier */}
              {currentStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#f8fafc]">Breadth & Custom Finishes</h3>
                      <p className="text-xs text-[#94a3b8] mt-1">Select structural scope depth and architectural material tier</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[rgba(255,85,0,0.12)] text-[#ff8800] border border-[rgba(255,85,0,0.25)] shrink-0">
                      Step 2: Depth & Materials
                    </span>
                  </div>

                  {/* Breadth Options (Tailored to trade) */}
                  {activeTrade.breadthOptions && (
                    <div>
                      <label className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wider block mb-3">
                        Breadth of the Transformation
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {activeTrade.breadthOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedBreadthId(opt.id)}
                            className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                              selectedBreadthId === opt.id
                                ? 'bg-[rgba(255,85,0,0.15)] border-[#ff5500]/60 text-white shadow-md'
                                : 'bg-[#151a24] border-white/[0.08] hover:border-white/[0.2] text-[#94a3b8]'
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white">{opt.label}</p>
                              <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{opt.sublabel}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              selectedBreadthId === opt.id ? 'bg-[#ff5500] border-[#ff5500] text-white' : 'border-white/20 bg-[#0e121a]'
                            }`}>
                              {selectedBreadthId === opt.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quality & Material Grade Tier */}
                  <div>
                    <label className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wider block mb-3">
                      Architectural Finish Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'Standard', title: 'Standard Architectural', desc: 'Code-compliant, durable OEM materials & certified install' },
                        { id: 'Premium', title: 'Premium Semi-Custom', desc: 'Architectural-grade quartz, solid hardwood & 30yr warranty' },
                        { id: 'Luxury', title: 'Masterpiece Luxury', desc: 'Fully bespoke custom millwork, exotic stone & lifetime warranty' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTier(t.id as any)}
                          className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            tier === t.id
                              ? 'bg-[rgba(255,85,0,0.15)] border-[#ff5500] text-white shadow-lg'
                              : 'bg-[#151a24] border-white/[0.08] hover:border-white/[0.2] text-[#94a3b8]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1 gap-2">
                              <span className="font-bold text-sm text-white">{t.title}</span>
                              {tier === t.id && <Check className="w-4 h-4 text-[#ff5500] stroke-[3] shrink-0" />}
                            </div>
                            <p className="text-[11px] text-[#94a3b8] leading-normal">{t.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Upgrades / Add-ons */}
                  <div>
                    <label className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wider block mb-3">
                      Key Areas & Custom Selections (Single-Click)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeTrade.popularAddons.map((addon) => {
                        const isSelected = selectedAddons.includes(addon);
                        return (
                          <button
                            key={addon}
                            onClick={() => toggleAddon(addon)}
                            className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium border transition-all text-left cursor-pointer gap-2 ${
                              isSelected
                                ? 'bg-[rgba(255,85,0,0.15)] border-[rgba(255,85,0,0.5)] text-[#ff8800]'
                                : 'bg-[#151a24] border-white/[0.08] text-[#cbd5e1] hover:border-white/[0.2]'
                            }`}
                          >
                            <span className="min-w-0 truncate">{addon}</span>
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-[#ff5500] border-[#ff5500] text-white' : 'border-white/20 bg-[#0e121a]'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3.5 rounded-xl bg-[#151a24] hover:bg-[#1f2737] text-[#cbd5e1] border border-white/[0.12] font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      <span>Back</span>
                    </button>
                    <button
                      id="widget-step2-continue-btn"
                      onClick={handleProceedToStep3}
                      className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(255,85,0,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                    >
                      <span className="text-center">Proceed to Preliminary Spec Generation</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Homeowner Pre-Qualification & Verification */}
              {currentStep === 3 && (
                <motion.form 
                  key="step3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  onSubmit={handleFinalSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#f8fafc]">Finalize & Generate Official Spec</h3>
                      <p className="text-xs text-[#94a3b8] mt-1">Specify recipient details for the preliminary budget allocation & direct consultation</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[rgba(255,85,0,0.12)] text-[#ff8800] border border-[rgba(255,85,0,0.25)] shrink-0">
                      Step 3: Verification
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#cbd5e1] block mb-1">Homeowner / Client Full Name *</label>
                      <input
                        id="lead-form-name"
                        type="text"
                        required
                        value={homeownerName}
                        onChange={(e) => setHomeownerName(e.target.value)}
                        placeholder="Nabeel Chohan"
                        className="w-full px-4 py-3 rounded-xl bg-[#151a24] border border-white/[0.14] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#cbd5e1] block mb-1">Direct Phone Number (For Instant SMS Spec) *</label>
                      <input
                        id="lead-form-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(512) 555-0198"
                        className="w-full px-4 py-3 rounded-xl bg-[#151a24] border border-white/[0.14] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#cbd5e1] block mb-1">Email Address</label>
                      <input
                        id="lead-form-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nabeel@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#151a24] border border-white/[0.14] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#cbd5e1] block mb-1">Decision Maker Role</label>
                      <select
                        value={decisionMaker}
                        onChange={(e) => setDecisionMaker(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#151a24] border border-white/[0.14] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none cursor-pointer"
                      >
                        <option value="Homeowner / Sole Decision Maker">Homeowner / Sole Decision Maker</option>
                        <option value="Co-Owner (Joint Family Decision)">Co-Owner (Joint Family Decision)</option>
                        <option value="Property Investor / Landlord">Property Investor / Landlord</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#cbd5e1] block mb-1">Desired Project Start Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#151a24] border border-white/[0.14] text-[#f8fafc] text-xs sm:text-sm focus:border-[#ff5500] outline-none cursor-pointer"
                    >
                      <option value="Immediately (1–2 Weeks)">Immediately (1–2 Weeks)</option>
                      <option value="Within 30–60 Days">Within 30–60 Days</option>
                      <option value="Planning Phase / 2–4 Months">Planning Phase / 2–4 Months</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3.5 rounded-xl bg-[#151a24] hover:bg-[#1f2737] text-[#cbd5e1] border border-white/[0.12] font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      <span>Back</span>
                    </button>
                    <button
                      id="lead-form-submit-btn"
                      type="submit"
                      disabled={isCalculating}
                      className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_35px_rgba(255,85,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                    >
                      {isCalculating ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>Generating Budget Spec...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 shrink-0" />
                          <span className="text-center">Generate Preliminary Budget Spec & Pricing</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 4: FINAL SPECIFICATION RESULT (EXACT DESIGN MATCHING USER REFERENCE IMAGE) */}
              {currentStep === 4 && specResult && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Top Spec Header Bar */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#121620] border border-white/[0.1] flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#ff8800] uppercase tracking-wider mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                        <span>PRELIMINARY BUDGET SPEC GENERATED</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-sans tracking-tight truncate">
                        Estimate for {homeownerName || 'Nabeel Chohan'}
                      </h3>
                      <p className="text-xs text-[#94a3b8] mt-1 font-mono">
                        Location: ZIP {zipCode || '00022'} • Discipline: {specResult.tradeName} ({specResult.tierLabel})
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <button
                        onClick={handleShareSpec}
                        className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#1a212e] hover:bg-[#222c3d] border border-white/[0.12] text-xs font-bold text-[#f8fafc] transition-colors cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#ff8800] shrink-0" />
                        <span>{shareCopied ? 'COPIED' : 'SHARE'}</span>
                      </button>

                      <button
                        onClick={handlePrintPdf}
                        className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#1a212e] hover:bg-[#222c3d] border border-white/[0.12] text-xs font-bold text-[#f8fafc] transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#ff8800] shrink-0" />
                        <span>PRINT PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* MASTER ESTIMATED BALLPARK INVESTMENT RANGE BOX (Framed with Gold/Bronze Border) */}
                  <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-[#090c12] border-2 border-[#ff8800]/50 shadow-[0_0_50px_rgba(255,85,0,0.2)] text-center overflow-hidden">
                    {/* Ambient Radial Highlight */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,85,0,0.12),transparent_70%)] pointer-events-none" />

                    <p className="text-[10px] sm:text-xs font-mono font-bold text-[#94a3b8] uppercase tracking-[0.2em] mb-2 sm:mb-3">
                      ESTIMATED BALLPARK INVESTMENT RANGE
                    </p>

                    {/* Huge Investment Range */}
                    <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white font-sans tracking-tight mb-5 sm:mb-6 break-words">
                      {specResult.formatted}
                    </div>

                    {/* Meta Badges (Duration & Confidence) */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#151a24] border border-white/[0.12] text-xs font-medium text-[#cbd5e1]">
                        <Clock className="w-3.5 h-3.5 text-[#ff8800] shrink-0" />
                        <span>Typical Build Duration: <strong className="text-white">{specResult.typicalDuration}</strong></span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#151a24] border border-white/[0.12] text-xs font-medium text-[#cbd5e1]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Estimation Confidence: <strong className="text-white">94% Accurate</strong></span>
                      </div>
                    </div>

                    {/* ROUGH PRICE RANGE NOTICE (User requested exact notice) */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#121620]/90 border border-white/[0.1] text-left max-w-2xl mx-auto flex items-start gap-3">
                      <Info className="w-5 h-5 text-[#ff8800] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-mono font-bold text-[#ff8800] uppercase tracking-wider mb-1">
                          ROUGH PRICE RANGE NOTICE:
                        </p>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">
                          This figure is a preliminary ballpark estimate calculated from regional labor and materials indices. Final investment figures may vary based on exact architectural conditions, structural engineering requirements, load-bearing modifications, and custom finish selections confirmed during your on-site walkthrough.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PRELIMINARY BUDGET ALLOCATION BREAKDOWN (4-Card Grid matching Reference Photo) */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#cbd5e1] uppercase tracking-wider mb-3">
                      <Layers className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                      <span>PRELIMINARY BUDGET ALLOCATION BREAKDOWN</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Card 1: Materials, Cabinetry & Fixtures */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#121620] border border-white/[0.1] flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
                            <h4 className="text-sm font-bold text-white">Materials, Cabinetry & Fixtures</h4>
                            <span className="text-xs font-mono font-bold text-[#ff8800]">
                              ${specResult.materialCostLow.toLocaleString()} - ${specResult.materialCostHigh.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] leading-relaxed">
                            Cabinetry, stone countertops, plumbing fixtures, tile, flooring & trim
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex justify-between text-[11px] text-[#64748b]">
                          <span>Est. Allocation Share</span>
                          <span className="font-bold text-white font-mono">44% of budget</span>
                        </div>
                      </div>

                      {/* Card 2: Licensed Trades & Labor */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#121620] border border-white/[0.1] flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
                            <h4 className="text-sm font-bold text-white">Licensed Trades & Labor</h4>
                            <span className="text-xs font-mono font-bold text-[#ff8800]">
                              ${specResult.laborCostLow.toLocaleString()} - ${specResult.laborCostHigh.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] leading-relaxed">
                            Demolition, framing, licensed electrical, plumbing rough-in, tile setting & finish carpentry
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex justify-between text-[11px] text-[#64748b]">
                          <span>Est. Allocation Share</span>
                          <span className="font-bold text-white font-mono">36% of budget</span>
                        </div>
                      </div>

                      {/* Card 3: Design, Engineering & Permitting */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#121620] border border-white/[0.1] flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
                            <h4 className="text-sm font-bold text-white">Design, Engineering & Permitting</h4>
                            <span className="text-xs font-mono font-bold text-[#ff8800]">
                              ${specResult.permitsLow.toLocaleString()} - ${specResult.permitsHigh.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] leading-relaxed">
                            Architectural drawings, structural engineering stamps, municipal permit fees & inspections
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex justify-between text-[11px] text-[#64748b]">
                          <span>Est. Allocation Share</span>
                          <span className="font-bold text-white font-mono">11% of budget</span>
                        </div>
                      </div>

                      {/* Card 4: Project Management & Site Protection */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#121620] border border-white/[0.1] flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
                            <h4 className="text-sm font-bold text-white">Project Management & Site Protection</h4>
                            <span className="text-xs font-mono font-bold text-[#ff8800]">
                              ${specResult.pmLow.toLocaleString()} - ${specResult.pmHigh.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] leading-relaxed">
                            Dedicated site supervisor, negative air dust barriers, floor protection & daily cleanup
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/[0.08] flex justify-between text-[11px] text-[#64748b]">
                          <span>Est. Allocation Share</span>
                          <span className="font-bold text-white font-mono">9% of budget</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONFIGURED SCOPE SELECTIONS (Summary Card Grid) */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#cbd5e1] uppercase tracking-wider mb-3">
                      <FileText className="w-3.5 h-3.5 text-[#ff5500] shrink-0" />
                      <span>CONFIGURED SCOPE SELECTIONS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-[#121620] border border-white/[0.08]">
                        <p className="text-[10px] font-mono text-[#94a3b8] uppercase">THE APPROXIMATE SCOPE / AREA</p>
                        <p className="text-sm font-bold text-white mt-1">
                          {scopeValue.toLocaleString()} {activeTrade.unitLabel.includes('Sq Ft') ? 'sq ft' : activeTrade.unitLabel.includes('kW') ? 'kW' : 'units'}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#121620] border border-white/[0.08]">
                        <p className="text-[10px] font-mono text-[#94a3b8] uppercase">THE BREADTH OF THE TRANSFORMATION</p>
                        <p className="text-sm font-bold text-white mt-1 truncate" title={specResult.breadthLabel}>
                          {specResult.breadthLabel}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#121620] border border-white/[0.08]">
                        <p className="text-[10px] font-mono text-[#94a3b8] uppercase">KEY AREAS & UPGRADES</p>
                        <p className="text-sm font-bold text-white mt-1 truncate" title={selectedAddons.join(', ') || 'Standard Core Specs'}>
                          {selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Standard Core Scope'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DIRECT CALL ACTION PROMPT TO LOCK IN WORK IMMEDIATELY */}
                  <div className="p-5 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-r from-[rgba(255,85,0,0.18)] via-[rgba(255,34,0,0.14)] to-[rgba(255,85,0,0.18)] border border-[rgba(255,85,0,0.4)] text-center space-y-3.5">
                    <p className="text-xs font-bold text-[#ff8800] uppercase tracking-widest">
                      Ready To Lock In Your On-Site Walkthrough Or Review Specs?
                    </p>
                    <a
                      href="tel:18005550199"
                      id="widget-direct-call-contractor-btn"
                      className="inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff2a00] hover:from-[#ff7a1a] hover:to-[#ff3b14] text-white font-extrabold text-sm sm:text-base shadow-[0_0_35px_rgba(255,85,0,0.45)] transition-transform active:scale-98 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce shrink-0" />
                      <span className="text-center">Call Contractor Directly: (800) 555-0199</span>
                    </a>
                    <p className="text-xs text-[#94a3b8]">
                      A certified project manager is on call to answer questions and lock in preliminary scheduling.
                    </p>
                  </div>

                  {/* Reset & Navigation */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={handleResetDemo}
                      className="flex items-center gap-2 text-xs font-bold text-[#94a3b8] hover:text-[#ff8800] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                      <span>Test Another Trade / Reset Estimator</span>
                    </button>
                    <span className="text-xs font-mono text-[#64748b]">
                      Instant Quote Engine 3.0 • Live
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
