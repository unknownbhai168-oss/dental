/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStats } from './components/TrustStats';
import { TreatmentsSection } from './components/TreatmentsSection';
import { InteractiveSmileExperience } from './components/InteractiveSmileExperience';
import { DentistsSection } from './components/DentistsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { FloatingActions } from './components/FloatingActions';
import { CLINIC_INFO } from './data/dentalData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTreatment, setBookingTreatment] = useState('');
  const [bookingDentistId, setBookingDentistId] = useState('');

  const handleOpenBooking = (treatment = '', dentistId = '') => {
    setBookingTreatment(treatment);
    setBookingDentistId(dentistId);
    setIsBookingOpen(true);
  };

  const handleExploreTreatments = () => {
    const el = document.getElementById('treatments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Structured DentalClinic Schema.org JSON-LD
  const clinicSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: CLINIC_INFO.name,
    description: CLINIC_INFO.subheadline,
    telephone: CLINIC_INFO.phone,
    email: CLINIC_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '450 Sutter Medical Pavilion, Suite 1400',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94108',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '08:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$$',
    medicalSpecialty: ['Dentistry', 'Orthodontics', 'Prosthodontics', 'Endodontics'],
  };

  return (
    <div className="min-h-screen bg-[#F8FCFF] text-[#142C43] flex flex-col font-sans selection:bg-[#54D6D0]/30 selection:text-[#087F8C]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />

      {/* Top Sticky Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 1. Hero Section with 3D Anatomical Tooth Canvas */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExploreTreatments={handleExploreTreatments}
        />

        {/* 2. Clinical Pillars & Verified Standards */}
        <TrustStats />

        {/* 3. Comprehensive Treatments & Interactive Filter Cards */}
        <TreatmentsSection
          onBookTreatment={(treatmentName) => handleOpenBooking(treatmentName)}
        />

        {/* 4. Interactive 3D Smile Experience & Enamel Shade Simulator */}
        <InteractiveSmileExperience onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Meet Our Specialist Dentists */}
        <DentistsSection
          onBookWithDentist={(dentistId) => handleOpenBooking('', dentistId)}
        />

        {/* 6. Why Choose Us / Technology & Patient Comfort */}
        <WhyChooseUs />

        {/* 7. Patient Testimonials & Case Reviews */}
        <TestimonialsSection />

        {/* 8. Architecture & Operatory Gallery */}
        <GallerySection />

        {/* 9. Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTreatment={bookingTreatment}
        initialDentistId={bookingDentistId}
      />

      {/* Floating Concierge Action Buttons */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
