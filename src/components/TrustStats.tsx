import React from 'react';
import { Scan, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const clinicalPillars = [
    {
      icon: Scan,
      title: '3D Optical Scanning',
      subtitle: 'Zero messy impressions',
      description: 'Ultra-fast sub-millimeter digital scanning without discomfort or gag reflex.',
    },
    {
      icon: Sparkles,
      title: 'Gentle Anesthesia',
      subtitle: 'Computer-assisted wand',
      description: 'Virtually unnoticeable localized numbing tailored for sensitive and anxious patients.',
    },
    {
      icon: ShieldCheck,
      title: 'Hospital Sterilization',
      subtitle: 'Class B fractional vacuum',
      description: 'Hospital-grade autoclaves with digital biological monitoring on every instrument cycle.',
    },
    {
      icon: HeartHandshake,
      title: 'Transparent Care',
      subtitle: 'Co-diagnosis on 4K screens',
      description: 'You review your 3D tooth scans directly with your dentist before any treatment begins.',
    },
  ];

  return (
    <section className="py-12 bg-white/70 border-y border-[#087F8C]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clinicalPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-6 rounded-2xl bg-[#F8FCFF] border border-[#142C43]/6 hover:border-[#54D6D0]/50 hover:bg-white hover:shadow-lg hover:shadow-[#087F8C]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#087F8C] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#142C43] mb-1">{pillar.title}</h3>
                <p className="text-xs font-semibold text-[#087F8C] mb-2">{pillar.subtitle}</p>
                <p className="text-xs text-[#142C43]/70 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
