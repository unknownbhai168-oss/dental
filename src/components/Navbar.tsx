import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Treatments', href: '#treatments' },
    { label: '3D Studio', href: '#smile-experience' },
    { label: 'Dentists', href: '#dentists' },
    { label: 'Technology', href: '#technology' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-sm py-3'
          : 'bg-[#F8FCFF]/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#142C43] whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#087F8C] to-[#54D6D0] flex items-center justify-center text-white shadow-sm shadow-[#087F8C]/20 group-hover:scale-105 transition-transform">
              {/* Modern anatomical tooth vector mark */}
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4c-3.5 0-5.5 2-5.5 4.5 0 2.5 1 5 1.5 7.5.5 2 1.5 4 4 4s3.5-2 4-4c.5-2.5 1.5-5 1.5-7.5C17.5 6 15.5 4 12 4z" />
                <path d="M10 8.5c0 1.5.8 2.5 2 2.5s2-1 2-2.5" />
              </svg>
            </div>
            <span className="font-bold text-[#142C43]">AuraDent</span>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#142C43]/80">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-[#087F8C] transition-colors whitespace-nowrap shrink-0 relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#087F8C] transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#087F8C] rounded-xl hover:bg-[#076a75] shadow-sm shadow-[#087F8C]/20 hover:shadow-md hover:shadow-[#087F8C]/30 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#087F8C] rounded-lg"
            >
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#142C43] hover:text-[#087F8C] rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-[#087F8C]/15 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#142C43] hover:text-[#087F8C] py-2 px-2 rounded-lg hover:bg-[#DDF8F0]/40 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#087F8C] rounded-xl shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
