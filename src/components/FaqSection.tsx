import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/dentalData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8FCFF] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
            <span>Patient Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142C43] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#142C43]/70">
            Clear, transparent answers regarding treatments, digital appointments, and our gentle care philosophy.
          </p>

          {/* FAQ Search Bar */}
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F8C]/60" />
            <input
              type="text"
              placeholder="Search by topic or treatment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#087F8C]/15 focus:border-[#087F8C] focus:outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all border ${
                    isOpen
                      ? 'bg-white border-[#54D6D0] shadow-md shadow-[#087F8C]/5'
                      : 'bg-white/80 border-[#142C43]/6 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleOpen(faq.id)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#142C43]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#087F8C] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#142C43]/75 leading-relaxed border-t border-slate-50 animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300">
              <HelpCircle className="w-8 h-8 text-[#087F8C]/50 mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#142C43]">No matching answers found</p>
              <p className="text-xs text-[#142C43]/60 mt-1">
                Try searching for "booking", "whitening", or "painless".
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
