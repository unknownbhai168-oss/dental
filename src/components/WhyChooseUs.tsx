import React from 'react';
import {
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Sparkles,
  Headphones,
  Eye,
  Tv,
  ThermometerSnowflake,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const advantages = [
    {
      title: 'Digital Co-Diagnosis',
      desc: 'You see your teeth in high-magnification 3D on overhead 4K monitors, understanding every detail before making decisions.',
      icon: Eye,
    },
    {
      title: 'Comfort-First Sensory Suite',
      desc: 'Noise-canceling Bose headphones, curated streaming cinema on ceiling screens, and warming blankets for total tranquility.',
      icon: Headphones,
    },
    {
      title: 'Single-Visit Restorations',
      desc: 'Chairside 3D scanning and computer milling produce durable ceramic inlays and crowns in a single appointment.',
      icon: Cpu,
    },
    {
      title: 'Pain-Free Anesthesia Technology',
      desc: 'Computer-flow regulated anesthesia eliminates the stinging pressure sensation of conventional dental injections.',
      icon: ThermometerSnowflake,
    },
    {
      title: 'Zero-Wait Concierge Scheduling',
      desc: 'We limit daily appointments so your doctor devotes 100% focused attention without clinical rush or lobby waiting.',
      icon: Sparkles,
    },
    {
      title: 'Hospital-Grade Cleanroom Standards',
      desc: 'Class B fractional vacuum autoclaves and individualized sterile cassettes sealed for every single patient.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="technology" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Technology & Comfort Feature Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl bg-gradient-to-br from-[#F8FCFF] to-[#DDF8F0]/40 border border-[#087F8C]/15 p-8 shadow-xl shadow-[#087F8C]/5 relative overflow-hidden">
              {/* Decorative background light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#54D6D0]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wide mb-3">
                <Cpu className="w-4 h-4 text-[#54D6D0]" />
                <span>Next-Gen Dental Suite</span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#142C43] mb-4">
                Redefining the Dental Environment
              </h3>

              <p className="text-xs text-[#142C43]/75 leading-relaxed mb-6">
                We have eliminated cold, sterile anxiety. AuraDent is designed around human comfort,
                utilizing aerospace ergonomics, daylight architecture, and gentle digital robotics.
              </p>

              {/* Feature Highlights Card */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center shrink-0">
                    <Tv className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#142C43] block">Ceiling Streaming Monitors</span>
                    <span className="text-[11px] text-[#142C43]/60">Watch films or calming visuals during care</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center shrink-0">
                    <ThermometerSnowflake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#142C43] block">Warmed Hydro-Sonic Hygiene</span>
                    <span className="text-[11px] text-[#142C43]/60">Zero cold water sensitivity shocks</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#142C43] block">ISO Cleanroom Certified</span>
                    <span className="text-[11px] text-[#142C43]/60">Medical grade air filtration & sterilization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Core Clinical Standards */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wide block mb-2">
                Why Patients Trust Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142C43] tracking-tight mb-4">
                Dentistry Designed for Peace of Mind
              </h2>
              <p className="text-base text-[#142C43]/70">
                Every detail of our practice — from our microscopic illumination tools to our
                needle-free numbing — has been chosen to eliminate fear and protect your natural enamel.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advantages.map((adv) => {
                const Icon = adv.icon;
                return (
                  <div key={adv.title} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#142C43] mb-1">{adv.title}</h4>
                      <p className="text-xs text-[#142C43]/70 leading-relaxed">{adv.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
