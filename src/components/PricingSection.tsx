import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ShieldCheck, Zap, PhoneCall } from 'lucide-react';

interface PricingSectionProps {
  onOpenBookCall: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBookCall }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Instant Quote Widget Only',
      badge: 'Software Tool',
      priceMonthly: 299,
      priceAnnual: 239,
      description: 'For contractors who already run their own ads but need our high-converting Instant Quote tool on their site.',
      features: [
        'Embeddable Instant Quote Widget',
        'Custom Trade Pricing Logic',
        'Unlimited Homeowner Quote Submissions',
        'Instant SMS & Email Lead Notifications',
        'Works on WordPress, Webflow, Squarespace, Wix',
        'Direct "Call Contractor" Button Integration',
      ],
      ctaText: 'Install Quote Widget',
      popular: false,
    },
    {
      id: 'growth',
      name: 'Growth Ads + Quote Engine',
      badge: 'Most Popular for Contractors',
      priceMonthly: 1499,
      priceAnnual: 1199,
      description: 'Full agency service. We run high-intent Paid Ads and install the Instant Quote Tool to fill your monthly job calendar.',
      features: [
        'Everything in Instant Quote Widget',
        'Google LSA & Search Ads Management',
        'Meta (Facebook/Instagram) Retargeting Ads',
        'Geo-Fenced US ZIP Code Targeting',
        'Negative Keyword Exclusion Lists',
        'Speed-to-Call Contractor CRM Access',
        'Dedicated Campaign Manager',
        'Guaranteed Lead Volume Target',
      ],
      ctaText: 'Claim Growth Partnership',
      popular: true,
    },
    {
      id: 'scale',
      name: 'Scale Dominance',
      badge: 'Multi-Location / Franchise',
      priceMonthly: 2999,
      priceAnnual: 2399,
      description: 'For large contracting firms operating across multiple territories or managing multiple crews.',
      features: [
        'Everything in Growth Partnership',
        'Multi-Territory & Multi-ZIP Geo-Fencing',
        'Custom Multi-Step Quote Logic & API Hooks',
        'Automated AI Lead Qualifier & SMS Bot',
        'Weekly Strategy & Pipeline Review Calls',
        'Priority 1-on-1 Direct Support',
        'Dedicated Creative & Video Ad Production',
      ],
      ctaText: 'Apply For Dominance Tier',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-200/90 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold mb-4 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-700" />
            <span>Transparent Contractor Partnership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans mb-4">
            Flexible Growth Plans For <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">Every Contracting Stage</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No long-term contracts. Transparent pricing designed to deliver immediate ROI within your first 30 days.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-300 shadow-md">
            <button
              id="billing-toggle-monthly"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              id="billing-toggle-annual"
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all relative backdrop-blur-xl ${
                  plan.popular
                    ? 'bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-white border-amber-400 shadow-xl lg:-translate-y-2'
                    : 'bg-slate-50/90 border-slate-200/90 hover:border-slate-300 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    {!plan.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                        {plan.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-extrabold text-slate-900 mt-2">{plan.name}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-slate-200">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold font-mono text-slate-900">${price}</span>
                      <span className="text-xs font-medium text-slate-500">/ month</span>
                    </div>
                    {plan.id !== 'starter' && (
                      <p className="text-[11px] text-amber-800 font-semibold mt-1">
                        + Recommended Ad Spend ($1,500 - $5,000/mo)
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`pricing-cta-${plan.id}`}
                  onClick={onOpenBookCall}
                  className={`w-full py-4 rounded-2xl font-extrabold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{plan.ctaText}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

