import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const TestimonialsFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do I need a new website?',
      answer:
        'No. The instant quote experience can be built into your existing website or deployed through a suitable dedicated experience depending on your setup.',
    },
    {
      question: 'Does the quote tool give homeowners an exact price?',
      answer:
        'No. It provides a rough price range based on the information the homeowner provides. The final estimate still comes from you after reviewing the project.',
    },
    {
      question: 'Can this work with Facebook and Instagram ads?',
      answer:
        'Yes. Meta ads can send homeowners directly into the quote experience, where they can provide project details and see a preliminary price range.',
    },
    {
      question: 'Can it work with Google?',
      answer:
        'Yes. Google and Meta can serve different roles. Google can capture homeowners actively searching for your service, while Meta can help put your business in front of relevant local homeowners.',
    },
    {
      question: 'Do I have to stop using referrals?',
      answer:
        'No. Referrals are valuable. The goal is to build another source of opportunities alongside what\'s already working.',
    },
    {
      question: "What if I'm already running ads?",
      answer:
        'That\'s fine. In some cases, the biggest opportunity isn\'t getting more traffic — it\'s improving what happens after someone clicks.',
    },
    {
      question: "What if I'm already booked for the next few months?",
      answer:
        'That\'s actually a good position to be in. The system doesn\'t need to run at full capacity when you\'re booked. The goal is to have another acquisition channel ready to turn up when your current workload starts opening up.',
    },
    {
      question: 'How much does it cost?',
      answer:
        'Every setup depends on your service, market, website and advertising requirements. We\'ll show you exactly what\'s included before you commit.',
    },
    {
      question: 'Do you guarantee a certain number of jobs?',
      answer:
        'No. We don\'t promise a fixed number of jobs because results depend on the market, service, offer, competition, advertising budget and sales process. We build and optimize the system around measurable data.',
    },
  ];

  const toggleFaq = (idx: number) => {
    if (openFaqIndex === idx) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(idx);
    }
  };

  return (
    <section id="faq" className="py-24 bg-[#07090e] text-[#f8fafc] relative overflow-hidden border-t border-white/[0.12]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,85,0,0.12)] border border-[rgba(255,85,0,0.25)] text-[#ff8800] text-xs font-semibold mb-4 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight font-sans mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-[#ff8800] via-[#ff5500] to-[#ff2200] bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-[#8092a8] text-sm sm:text-base leading-relaxed">
            Everything you need to know about our paid ads acquisition system and custom quote experience.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl bg-[#151a24] border border-white/[0.12] overflow-hidden transition-all backdrop-blur-xl shadow-xl hover:border-white/[0.22]"
              >
                <button
                  id={`faq-item-toggle-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#f8fafc] hover:text-[#ff8800] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-[#0e121a] border border-white/[0.16] flex items-center justify-center text-[#ff8800] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#94a3b8] leading-relaxed border-t border-white/[0.12] pt-4 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
