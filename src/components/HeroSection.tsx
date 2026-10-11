import React from 'react';
import { ArrowRight, Calendar, Sparkles, Shield, Cpu, Clock } from 'lucide-react';
import { Hero3DTooth } from './Hero3DTooth';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreTreatments,
}) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Subtle Gradient Accents & Geometric Curves */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-10 w-[550px] h-[550px] bg-gradient-to-br from-[#54D6D0]/15 to-[#087F8C]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[480px] h-[480px] bg-gradient-to-tr from-[#DDF8F0]/40 to-[#DCEFFF]/50 rounded-full blur-3xl" />
        {/* Subtle curved background lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30 stroke-[#087F8C]/15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100 200 C 400 120, 800 380, 1500 240"
            fill="none"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M 100 480 C 600 350, 1000 650, 1600 420"
            fill="none"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Clean Editorial Kicker (No static pill!) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#087F8C] tracking-wide mb-4 uppercase">
              <Sparkles className="w-4 h-4 text-[#54D6D0]" />
              <span>Aesthetic & Micro-Invasive Dentistry</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-[#142C43]/70 font-medium">San Francisco</span>
            </div>

            {/* Oversized Refined Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#142C43] tracking-tight leading-[1.12] mb-6">
              Your Smile Deserves{' '}
              <span className="bg-gradient-to-r from-[#087F8C] via-[#0b9dae] to-[#54D6D0] bg-clip-text text-transparent">
                Extraordinary Care.
              </span>
            </h1>

            {/* Supporting Prose */}
            <p className="text-lg text-[#142C43]/80 leading-relaxed mb-8 max-w-xl font-normal">
              Experience modern dentistry with advanced 3D diagnostic technology, gentle
              micro-invasive treatments, and personalized care designed for your brightest,
              healthiest smile.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#076a75] rounded-xl shadow-md shadow-[#087F8C]/20 hover:shadow-lg hover:shadow-[#087F8C]/30 transform active:scale-[0.98] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onExploreTreatments}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#087F8C] bg-white hover:bg-[#DDF8F0]/30 rounded-xl border border-[#087F8C]/20 hover:border-[#087F8C]/40 shadow-sm transition-all group"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-4 h-4 text-[#087F8C] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#142C43]/8 text-xs text-[#142C43]/80">
              <div className="flex flex-col">
                <span className="font-semibold text-[#087F8C] text-sm">3D Intraoral</span>
                <span className="text-[#142C43]/60 mt-0.5">Radiation-reduced scan</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#087F8C] text-sm">Painless Tech</span>
                <span className="text-[#142C43]/60 mt-0.5">Gentle computer wand</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#087F8C] text-sm">Class B Clean</span>
                <span className="text-[#142C43]/60 mt-0.5">Hospital autoclave</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Floating Tooth Wow Factor Scene */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full relative rounded-3xl bg-gradient-to-b from-white/60 via-[#F8FCFF]/40 to-[#DDF8F0]/20 p-2 border border-white/80 shadow-xl shadow-[#087F8C]/5 backdrop-blur-sm">
              <Hero3DTooth />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
