import React, { useState } from 'react';
import { Sparkles, Scan, HeartHandshake, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { SHADE_GUIDE } from '../data/dentalData';

interface InteractiveSmileExperienceProps {
  onOpenBooking: () => void;
}

export const InteractiveSmileExperience: React.FC<InteractiveSmileExperienceProps> = ({
  onOpenBooking,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedShade, setSelectedShade] = useState(SHADE_GUIDE[0]);
  const [activePathway, setActivePathway] = useState<'cosmetic' | 'restorative' | 'preventive'>('cosmetic');

  const pathways = {
    cosmetic: {
      title: 'Cosmetic & Aesthetic Transformation',
      desc: 'Achieve radiant symmetry, eliminate coffee/tea stains, and align teeth invisibly.',
      steps: [
        {
          num: '01',
          name: '3D Aesthetic Digital Consultation',
          detail: 'High-speed intraoral optical scan captures your teeth in full 3D color in 90 seconds.',
        },
        {
          num: '02',
          name: 'Virtual Smile Trajectory Preview',
          detail: 'Test-drive your planned veneers or aligners on 4K screens before touching a tooth.',
        },
        {
          num: '03',
          name: 'Micro-Preparation & Whitening',
          detail: 'Gentle laser enamel brightening and hand-sculpted biocompatible ceramic artistry.',
        },
        {
          num: '04',
          name: 'Luminous Reveal & Seal',
          detail: 'Biomimetic bonding with fluoride remineralization for long-lasting enamel vitality.',
        },
      ],
    },
    restorative: {
      title: 'Restorative & Implant Precision',
      desc: 'Rebuild broken or missing teeth with computer-guided surgical accuracy and lifelike ceramic strength.',
      steps: [
        {
          num: '01',
          name: 'Low-Dose 3D CBCT Tomography',
          detail: 'Sub-millimeter 3D bone and nerve mapping ensures absolute safety and precision.',
        },
        {
          num: '02',
          name: 'Robotic & Computer Surgical Guide',
          detail: 'Pre-planned 3D surgical guide directs implant placement with sub-millimeter tolerances.',
        },
        {
          num: '03',
          name: 'Biocompatible Titanium / Zirconia Integration',
          detail: 'Natural bone integration preserves your facial jawline and adjacent healthy teeth.',
        },
        {
          num: '04',
          name: 'Custom Shade-Matched Crown Milling',
          detail: 'Same-day or lab-sculpted ceramic crown that functions exactly like your natural tooth.',
        },
      ],
    },
    preventive: {
      title: 'Preventive Wellness & Longevity',
      desc: 'Stop decay before it starts with warm Air-Flow biofilm removal and enamel remineralization.',
      steps: [
        {
          num: '01',
          name: 'Fluorescence Plaque Detection',
          detail: 'Identifies microscopic biofilm colonies invisible to traditional visual checkups.',
        },
        {
          num: '02',
          name: 'Warm Ultrasonic Biofilm Therapy',
          detail: 'Comfortable erythritol spray removes 100% of plaque without sharp scraping or pain.',
        },
        {
          num: '03',
          name: 'Deep Remineralization Therapy',
          detail: 'Infuses hydroxyapatite minerals to seal open dentin tubules and eliminate cold shock.',
        },
        {
          num: '04',
          name: 'Personalized Home Care Blueprint',
          detail: 'Customized sonic brush head recommendations and pH-neutral maintenance rinse.',
        },
      ],
    },
  };

  const currentPathway = pathways[activePathway];

  return (
    <section id="smile-experience" className="py-20 md:py-28 bg-[#F8FCFF] relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#54D6D0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#087F8C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#54D6D0]" />
            <span>Interactive Smile Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142C43] tracking-tight mb-4">
            Your Journey to a Healthier, Radiantly Confident Smile
          </h2>
          <p className="text-base text-[#142C43]/70">
            Explore how modern 3D dentistry removes anxiety, preserves natural tooth structure, and
            empowers you to co-design your dream aesthetic.
          </p>

          {/* Pathway Category Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-white rounded-2xl border border-[#142C43]/10 shadow-sm inline-flex">
            <button
              onClick={() => setActivePathway('cosmetic')}
              className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                activePathway === 'cosmetic'
                  ? 'bg-[#087F8C] text-white shadow-sm'
                  : 'text-[#142C43]/70 hover:text-[#087F8C] hover:bg-[#F8FCFF]'
              }`}
            >
              Cosmetic Dentistry
            </button>
            <button
              onClick={() => setActivePathway('restorative')}
              className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                activePathway === 'restorative'
                  ? 'bg-[#087F8C] text-white shadow-sm'
                  : 'text-[#142C43]/70 hover:text-[#087F8C] hover:bg-[#F8FCFF]'
              }`}
            >
              Restorative & Implants
            </button>
            <button
              onClick={() => setActivePathway('preventive')}
              className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                activePathway === 'preventive'
                  ? 'bg-[#087F8C] text-white shadow-sm'
                  : 'text-[#142C43]/70 hover:text-[#087F8C] hover:bg-[#F8FCFF]'
              }`}
            >
              Preventive Wellness
            </button>
          </div>
        </div>

        {/* 2-Column Split: Interactive Comparison & Shade Studio + 4-Step Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Interactive Enamel Whitening & Before/After Simulator */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#087F8C]/15 shadow-lg shadow-[#087F8C]/5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wide">
                  Enamel Whitening Simulator
                </span>
                <span className="text-xs font-semibold text-[#142C43]/70">
                  Slide to compare transformation
                </span>
              </div>

              {/* Before / After Interactive Split Card */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-inner select-none bg-slate-900">
                {/* After Side (Laser Whitening Result) */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${selectedShade.hex} 0%, #E8F9F8 100%)`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-24 mb-3 flex items-center justify-center">
                      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-md">
                        <path
                          d="M 22 25 C 22 10, 48 8, 50 18 C 52 8, 78 10, 78 25 C 80 48, 86 65, 75 105 C 70 115, 62 110, 58 92 C 55 80, 52 75, 50 75 C 48 75, 45 80, 42 92 C 38 110, 30 115, 25 105 C 14 65, 20 48, 22 25 Z"
                          fill="#FFFFFF"
                          stroke="#54D6D0"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wider">
                      After: {selectedShade.name}
                    </span>
                    <span className="text-[11px] text-[#142C43]/70 mt-0.5">
                      Target shade {selectedShade.code}
                    </span>
                  </div>
                </div>

                {/* Before Side (Natural Baseline Shade) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden flex items-center justify-center"
                  style={{
                    width: `${sliderPosition}%`,
                    background: 'linear-gradient(135deg, #E2D3BB 0%, #D8C3A5 100%)',
                    borderRight: '3px solid #087F8C',
                  }}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                    style={{ width: '100%', minWidth: '320px' }}
                  >
                    <div className="w-20 h-24 mb-3 flex items-center justify-center opacity-85">
                      <svg viewBox="0 0 100 120" className="w-full h-full">
                        <path
                          d="M 22 25 C 22 10, 48 8, 50 18 C 52 8, 78 10, 78 25 C 80 48, 86 65, 75 105 C 70 115, 62 110, 58 92 C 55 80, 52 75, 50 75 C 48 75, 45 80, 42 92 C 38 110, 30 115, 25 105 C 14 65, 20 48, 22 25 Z"
                          fill="#E6DAC4"
                          stroke="#C4B294"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-[#4A3B2C] uppercase tracking-wider">
                      Before: Baseline (A3.5)
                    </span>
                    <span className="text-[11px] text-[#4A3B2C]/80 mt-0.5">
                      Natural tea, coffee & age stains
                    </span>
                  </div>
                </div>

                {/* Slider Handle Knob */}
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Before and after comparison slider"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />

                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#087F8C] shadow-lg pointer-events-none z-10 flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-1.5 h-3 flex items-center justify-between">
                    <span className="w-0.5 h-full bg-[#087F8C] rounded" />
                    <span className="w-0.5 h-full bg-[#087F8C] rounded" />
                  </div>
                </div>
              </div>

              {/* Shade Selector Palette */}
              <div className="mt-6">
                <span className="text-xs font-semibold text-[#142C43] block mb-2">
                  Select Desired VITA Enamel Target:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {SHADE_GUIDE.map((shade) => (
                    <button
                      key={shade.code}
                      onClick={() => setSelectedShade(shade)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        selectedShade.code === shade.code
                          ? 'border-[#087F8C] bg-[#DDF8F0] shadow-sm ring-1 ring-[#087F8C]'
                          : 'border-slate-200 hover:border-slate-300 bg-[#F8FCFF]'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-lg border border-slate-300 mb-1"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="text-[11px] font-bold text-[#142C43] block">{shade.code}</span>
                      <span className="text-[9px] text-[#142C43]/60 truncate block">{shade.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#142C43]/50 italic mt-4 pt-3 border-t border-slate-100">
              *Demonstrative visualization of clinical enamel whitening potential. Individual outcomes vary based on dental enamel thickness and genetics.
            </p>
          </div>

          {/* Right Column: 4-Step Clinical Journey Roadmap */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#087F8C]/15 shadow-lg shadow-[#087F8C]/5">
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wide block mb-1">
                  Step-by-Step Experience
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#142C43]">
                  {currentPathway.title}
                </h3>
                <p className="text-xs text-[#142C43]/70 mt-1">{currentPathway.desc}</p>
              </div>

              {/* 4 Roadmap Steps */}
              <div className="space-y-4">
                {currentPathway.steps.map((step) => (
                  <div
                    key={step.num}
                    className="p-4 rounded-2xl bg-[#F8FCFF] border border-[#142C43]/6 hover:border-[#54D6D0] hover:bg-white transition-all flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#DDF8F0] text-[#087F8C] font-bold text-sm flex items-center justify-center shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#142C43] mb-0.5">{step.name}</h4>
                      <p className="text-xs text-[#142C43]/70 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pathway CTA */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-[#142C43]/70">
                Ready to plan your personal smile pathway?
              </span>
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#087F8C] hover:bg-[#076a75] rounded-xl shadow-sm transition-all"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
