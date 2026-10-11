import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Anchor,
  Smile,
  Activity,
  Gem,
  Droplets,
  HeartHandshake,
  ArrowRight,
  Clock,
  CheckCircle,
  X,
  Calendar,
} from 'lucide-react';
import { TREATMENTS } from '../data/dentalData';
import { Treatment } from '../types/dental';

interface TreatmentsSectionProps {
  onBookTreatment: (treatmentName: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Sparkles,
  Anchor,
  Smile,
  Activity,
  Gem,
  Droplets,
  HeartHandshake,
};

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onBookTreatment }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'preventive', label: 'Preventive & Hygiene' },
    { id: 'cosmetic', label: 'Aesthetic & Whitening' },
    { id: 'restorative', label: 'Restorative & Implants' },
    { id: 'orthodontics', label: 'Aligners & Ortho' },
  ];

  const filteredTreatments =
    activeCategory === 'all'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.category === activeCategory);

  return (
    <section id="treatments" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
            <span>Specialized Clinical Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142C43] tracking-tight mb-4">
            World-Class Dental Care, Tailored to You
          </h2>
          <p className="text-base text-[#142C43]/70">
            From routine biomimetic wellness to comprehensive smile makeovers, our digital workflow
            ensures every procedure is gentle, precise, and completely transparent.
          </p>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-white rounded-2xl border border-[#142C43]/10 shadow-sm inline-flex">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#087F8C] text-white shadow-sm'
                    : 'text-[#142C43]/70 hover:text-[#087F8C] hover:bg-[#F8FCFF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Treatment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTreatments.map((treatment) => {
            const Icon = iconMap[treatment.iconName] || ShieldCheck;
            return (
              <div
                key={treatment.id}
                className="group relative rounded-2xl bg-white border border-[#142C43]/8 hover:border-[#54D6D0] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-[#087F8C]/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Visual Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center group-hover:bg-[#087F8C] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#087F8C] bg-[#F8FCFF] px-2.5 py-1 rounded-full border border-[#087F8C]/15">
                      {treatment.painLevel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#142C43] mb-2 group-hover:text-[#087F8C] transition-colors leading-snug">
                    {treatment.title}
                  </h3>

                  <p className="text-xs text-[#142C43]/70 leading-relaxed mb-4 line-clamp-3">
                    {treatment.shortDesc}
                  </p>
                </div>

                {/* Bottom Meta & Action */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center justify-between text-xs mb-3 text-[#142C43]/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#54D6D0]" />
                      <span>{treatment.duration}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTreatment(treatment)}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#087F8C] bg-[#F8FCFF] hover:bg-[#DDF8F0] rounded-xl border border-[#087F8C]/20 transition-all group-hover:border-[#087F8C]"
                  >
                    <span>View Treatment Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Treatment Modal Drawer */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#54D6D0]/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#142C43]/60 hover:text-[#087F8C] hover:bg-[#F8FCFF] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center">
                {React.createElement(iconMap[selectedTreatment.iconName] || ShieldCheck, {
                  className: 'w-6 h-6',
                })}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#087F8C] uppercase tracking-wide">
                  Clinical Care Blueprint
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#142C43]">
                  {selectedTreatment.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#142C43]/80 leading-relaxed mb-6">
              {selectedTreatment.fullDesc}
            </p>

            {/* Procedure Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#F8FCFF] border border-[#087F8C]/10 text-xs">
              <div>
                <span className="text-[#142C43]/60 block mb-0.5">Estimated Duration</span>
                <span className="font-bold text-[#142C43] text-sm">{selectedTreatment.duration}</span>
              </div>
              <div>
                <span className="text-[#142C43]/60 block mb-0.5">Patient Comfort</span>
                <span className="font-bold text-[#087F8C] text-sm">{selectedTreatment.painLevel}</span>
              </div>
            </div>

            {/* Key Clinical Benefits */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#142C43] uppercase tracking-wide mb-3">
                Key Advantages & Technologies
              </h4>
              <div className="space-y-2">
                {selectedTreatment.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#142C43]/80">
                    <CheckCircle className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Candidates */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-[#142C43] uppercase tracking-wide mb-2">
                Recommended For
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-[#142C43]">
                {selectedTreatment.idealFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#DDF8F0]/60 text-[#087F8C] font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Action CTA */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  const treatmentName = selectedTreatment.title;
                  setSelectedTreatment(null);
                  onBookTreatment(treatmentName);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#076a75] rounded-xl shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
              <button
                onClick={() => setSelectedTreatment(null)}
                className="px-5 py-3.5 text-sm font-semibold text-[#142C43]/70 hover:text-[#142C43] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
