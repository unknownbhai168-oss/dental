import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  ExternalLink,
  Shield,
  Instagram,
  Facebook,
  Linkedin,
  Map,
  X,
} from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <footer className="bg-[#142C43] text-white pt-16 pb-12 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#087F8C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Pre-Footer CTA Strip */}
        <div className="mb-14 p-8 rounded-3xl bg-gradient-to-r from-[#087F8C] to-[#0a6c77] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-[#DDF8F0] uppercase tracking-wider block mb-1">
              Begin Your Smile Journey
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to experience modern, painless dentistry?
            </h3>
            <p className="text-xs text-white/80 mt-1 max-w-xl">
              Appointments include a 3D digital oral scan, co-diagnosis review, and a personalized wellness plan.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-[#142C43] bg-white hover:bg-[#DDF8F0] rounded-xl shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4 text-[#087F8C]" />
            <span>Book Your Consultation</span>
          </button>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#087F8C] to-[#54D6D0] flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4c-3.5 0-5.5 2-5.5 4.5 0 2.5 1 5 1.5 7.5.5 2 1.5 4 4 4s3.5-2 4-4c.5-2.5 1.5-5 1.5-7.5C17.5 6 15.5 4 12 4z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{CLINIC_INFO.name}</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mb-5">
              San Francisco's premier biomimetic dental practice specializing in 3D digital diagnosis,
              minimally-invasive aesthetic restorations, and gentle patient-first care.
            </p>
            <div className="flex items-center gap-3 text-white/60">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#54D6D0] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#54D6D0] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[#54D6D0] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#54D6D0] uppercase tracking-wider mb-4">
              Practice Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  Treatments & Procedures
                </a>
              </li>
              <li>
                <a href="#smile-experience" className="hover:text-white transition-colors">
                  Interactive 3D Smile Studio
                </a>
              </li>
              <li>
                <a href="#dentists" className="hover:text-white transition-colors">
                  Our Dental Specialists
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  Clinic Technology & Comfort
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Patient Reviews & Outcomes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours of Operation */}
          <div>
            <h4 className="text-xs font-bold text-[#54D6D0] uppercase tracking-wider mb-4">
              Hours of Care
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              {CLINIC_INFO.hours.map((h, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-semibold text-white/90">{h.days}</span>
                  <span className="text-white/60">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#54D6D0] uppercase tracking-wider mb-4">
              Clinic Location
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#54D6D0] shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#54D6D0] shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#54D6D0] shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </div>

              <button
                onClick={() => setShowMapModal(true)}
                className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-[#54D6D0] font-medium transition-colors"
              >
                <Map className="w-3.5 h-3.5" />
                <span>View Interactive Location Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} AuraDent Dental Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Care
            </a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>

      {/* Map Preview Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white text-[#142C43] rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setShowMapModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close map"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-[#087F8C] uppercase mb-1">
              <MapPin className="w-4 h-4" />
              <span>Downtown San Francisco</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{CLINIC_INFO.name}</h3>
            <p className="text-xs text-slate-600 mb-4">{CLINIC_INFO.address}</p>

            {/* Stylized Map View Box */}
            <div className="w-full h-56 rounded-2xl bg-gradient-to-tr from-slate-100 via-teal-50 to-blue-50 border border-slate-200 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-[#087F8C] text-white flex items-center justify-center shadow-lg mb-2">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#142C43]">Sutter Medical Pavilion</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Valet Parking & Powell BART Nearby</span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-slate-500">Suite 1400, 14th Floor</span>
              <button
                onClick={() => setShowMapModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#087F8C] rounded-xl hover:bg-[#076a75]"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
