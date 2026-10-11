import React from 'react';
import { Award, GraduationCap, Globe, Calendar, ArrowRight } from 'lucide-react';
import { DENTISTS } from '../data/dentalData';
import { Dentist } from '../types/dental';

interface DentistsSectionProps {
  onBookWithDentist: (dentistId: string, dentistName: string) => void;
}

export const DentistsSection: React.FC<DentistsSectionProps> = ({ onBookWithDentist }) => {
  return (
    <section id="dentists" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wider mb-2">
            <span>Specialist Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142C43] tracking-tight mb-4">
            Meet Your Clinical Care Specialists
          </h2>
          <p className="text-base text-[#142C43]/70">
            Our team pairs ivy-league training with advanced sub-specializations in biomimetic
            dentistry, computer-guided aesthetics, and micro-endodontics.
          </p>
        </div>

        {/* Dentists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DENTISTS.map((dentist) => (
            <div
              key={dentist.id}
              className="group rounded-3xl bg-white border border-[#142C43]/8 hover:border-[#54D6D0] p-6 shadow-sm hover:shadow-xl hover:shadow-[#087F8C]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Visual Portrait Frame with Resilient Stylized Canvas */}
                <div className={`relative h-64 rounded-2xl bg-gradient-to-tr ${dentist.avatarBg} overflow-hidden mb-6 flex flex-col items-center justify-center border border-white/60 shadow-inner group-hover:scale-[1.02] transition-transform duration-300`}>
                  {/* Stylized Doctor Medical Avatar Silhouette & Monogram */}
                  <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#54D6D0]/40 mb-3">
                    <span className="text-2xl font-black text-[#087F8C]">
                      {dentist.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>

                  <div className="text-center px-4">
                    <span className="text-xs font-bold text-[#087F8C] block uppercase tracking-wide">
                      {dentist.role}
                    </span>
                    <span className="text-[11px] text-[#142C43]/70 font-medium">
                      {dentist.experienceYears} Years Specialized Practice
                    </span>
                  </div>
                </div>

                {/* Name & Credentials */}
                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-[#142C43] group-hover:text-[#087F8C] transition-colors flex items-baseline gap-2">
                    <span>{dentist.name}</span>
                    <span className="text-xs font-semibold text-[#087F8C]">{dentist.credentials}</span>
                  </h3>
                  <p className="text-xs font-semibold text-[#54D6D0] mt-0.5">{dentist.specialty}</p>
                </div>

                {/* Biography */}
                <p className="text-xs text-[#142C43]/75 leading-relaxed mb-5">
                  {dentist.bio}
                </p>

                {/* Unboxed Metadata (Zero Pill Rule Compliant) */}
                <div className="space-y-2 text-xs text-[#142C43]/70 pt-4 border-t border-slate-100 mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#087F8C] shrink-0" />
                    <span className="truncate">{dentist.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#54D6D0] shrink-0" />
                    <span>Languages: {dentist.languages.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Booking CTA for this Dentist */}
              <button
                onClick={() => onBookWithDentist(dentist.id, dentist.name)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#087F8C] hover:bg-[#076a75] rounded-xl shadow-sm transition-all group-hover:shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation with {dentist.name.split(' ')[1]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
