import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/dentalData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F8FCFF] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
            <span>Verified Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142C43] tracking-tight mb-4">
            Real Stories, Genuine Smiles
          </h2>
          <p className="text-base text-[#142C43]/70">
            Read how gentle technology and attentive care converted dental fear into lifelong confidence.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative rounded-3xl bg-white border border-[#087F8C]/15 p-8 sm:p-12 shadow-xl shadow-[#087F8C]/5 transition-all">
          <Quote className="w-12 h-12 text-[#54D6D0]/30 absolute top-8 left-8 -z-0" />

          <div className="relative z-10">
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-6 text-amber-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Quote Body */}
            <p className="text-lg sm:text-xl text-[#142C43] font-medium leading-relaxed mb-8">
              "{current.quote}"
            </p>

            {/* Patient Metadata (Zero Pill Compliance) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-base font-bold text-[#142C43] flex items-center gap-2">
                  <span>{current.patientName}</span>
                  {current.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-[#087F8C] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#087F8C]" />
                      Verified Patient
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#142C43]/60 mt-0.5">
                  <span>{current.treatmentReceived}</span>
                  <span aria-hidden="true">·</span>
                  <span>{current.date}</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#087F8C] text-[#142C43] hover:text-[#087F8C] hover:bg-[#F8FCFF] transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#087F8C] text-[#142C43] hover:text-[#087F8C] hover:bg-[#F8FCFF] transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? 'w-8 bg-[#087F8C]' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
