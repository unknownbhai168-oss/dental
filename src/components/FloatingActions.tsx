import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, Calendar, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello AuraDent Studio, I would like to inquire about booking an appointment.'
  )}`;

  return (
    <aside aria-label="Quick contact and navigation" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-full bg-white text-[#142C43] hover:text-[#087F8C] shadow-lg border border-slate-200 hover:border-[#087F8C] transition-all transform hover:-translate-y-0.5"
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* WhatsApp Concierge Direct Action */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow-xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all group"
        aria-label="Chat directly on WhatsApp"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp Concierge</span>
      </a>
    </aside>
  );
};
