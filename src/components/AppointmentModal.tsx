import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TREATMENTS, DENTISTS, CLINIC_INFO } from '../data/dentalData';
import { AppointmentData } from '../types/dental';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: string;
  initialDentistId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialTreatment = '',
  initialDentistId = '',
}) => {
  const [formData, setFormData] = useState<AppointmentData>({
    patientName: '',
    phone: '',
    email: '',
    treatment: initialTreatment || TREATMENTS[0].title,
    dentistId: initialDentistId || 'any',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM – 12:00 PM)',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedBooking, setSubmittedBooking] = useState<AppointmentData | null>(null);

  useEffect(() => {
    if (initialTreatment) {
      setFormData((prev) => ({ ...prev, treatment: initialTreatment }));
    }
    if (initialDentistId) {
      setFormData((prev) => ({ ...prev, dentistId: initialDentistId }));
    }
  }, [initialTreatment, initialDentistId]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Valid contact phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#087F8C', '#54D6D0', '#DDF8F0'],
      });
    } catch {
      // fallback safe
    }

    // Save to local storage for patient convenience
    const existingBookings = JSON.parse(localStorage.getItem('auradent_requests') || '[]');
    const newRecord = { ...formData, id: 'req_' + Date.now(), createdAt: new Date().toISOString() };
    localStorage.setItem('auradent_requests', JSON.stringify([newRecord, ...existingBookings]));

    setSubmittedBooking(formData);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setSubmittedBooking(null);
    onClose();
  };

  // WhatsApp Pre-filled quick dispatch
  const doctorName =
    formData.dentistId === 'any'
      ? 'Next Available Specialist'
      : DENTISTS.find((d) => d.id === formData.dentistId)?.name || 'Next Specialist';

  const waMessage = encodeURIComponent(
    `Hello AuraDent Studio, I would like to request an appointment:\n• Patient: ${formData.patientName}\n• Treatment: ${formData.treatment}\n• Preferred Doctor: ${doctorName}\n• Preferred Date: ${formData.preferredDate}\n• Time Window: ${formData.preferredTime}\n• Phone: ${formData.phone}`
  );
  const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${waMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#087F8C]/20 p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#142C43]/60 hover:text-[#087F8C] hover:bg-[#F8FCFF] transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#087F8C] uppercase tracking-wide mb-1">
                <Sparkles className="w-4 h-4 text-[#54D6D0]" />
                <span>Priority Patient Request</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#142C43]">
                Schedule Your Consultation
              </h3>
              <p className="text-xs text-[#142C43]/70 mt-1">
                Our concierge team reviews and confirms your appointment within 2 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-[#142C43] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F8C]/60" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border ${
                      errors.patientName ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-[#087F8C]'
                    } focus:outline-none transition-colors`}
                  />
                </div>
                {errors.patientName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.patientName}</p>
                )}
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142C43] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F8C]/60" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (415) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border ${
                        errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-[#087F8C]'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142C43] mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F8C]/60" />
                    <input
                      type="email"
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#087F8C] focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Treatment Selection */}
              <div>
                <label className="block text-xs font-bold text-[#142C43] mb-1">
                  Treatment of Interest
                </label>
                <select
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#087F8C] bg-white focus:outline-none"
                >
                  {TREATMENTS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} ({t.duration})
                    </option>
                  ))}
                  <option value="General Consultation & 3D Exam">General Consultation & 3D Exam</option>
                </select>
              </div>

              {/* Preferred Dentist */}
              <div>
                <label className="block text-xs font-bold text-[#142C43] mb-1">
                  Preferred Specialist
                </label>
                <select
                  value={formData.dentistId}
                  onChange={(e) => setFormData({ ...formData, dentistId: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#087F8C] bg-white focus:outline-none"
                >
                  <option value="any">First Available Specialist (Earliest Appointment)</option>
                  {DENTISTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142C43] mb-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F8C]/60" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border ${
                        errors.preferredDate ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-[#087F8C]'
                      } focus:outline-none`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142C43] mb-1">
                    Time Window
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#087F8C]/60" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#087F8C] bg-white focus:outline-none"
                    >
                      <option value="Morning (8:30 AM – 11:30 AM)">Morning (8:30 AM – 11:30 AM)</option>
                      <option value="Midday (11:30 AM – 2:30 PM)">Midday (11:30 AM – 2:30 PM)</option>
                      <option value="Afternoon (2:30 PM – 5:30 PM)">Afternoon (2:30 PM – 5:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold text-[#142C43] mb-1">
                  Special Notes or Dental Concerns <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sensitivity to cold water, dental anxiety, interested in clear aligners..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#087F8C] focus:outline-none resize-none"
                />
              </div>

              {/* Form Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#087F8C] hover:bg-[#076a75] rounded-xl shadow-md shadow-[#087F8C]/20 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Submit Appointment Request</span>
                </button>
              </div>

              <p className="text-[11px] text-[#142C43]/60 text-center leading-normal">
                By submitting, your request is logged with our clinical scheduling system. We confirm all
                times by telephone or SMS to protect patient privacy.
              </p>
            </form>
          </div>
        ) : (
          /* Submission Confirmation View */
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-[#DDF8F0] text-[#087F8C] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-[#087F8C] uppercase tracking-wide">
              Request Received
            </span>
            <h3 className="text-2xl font-extrabold text-[#142C43] mt-1 mb-2">
              Thank You, {submittedBooking?.patientName}!
            </h3>

            <p className="text-xs text-[#142C43]/70 max-w-md mx-auto mb-6 leading-relaxed">
              Your appointment request has been safely logged with our concierge desk. One of our
              patient coordinators will contact you at <strong className="text-[#142C43]">{submittedBooking?.phone}</strong> within
              2 business hours to finalize your exact slot and verify any insurance details.
            </p>

            {/* Request Summary Receipt */}
            <div className="text-left p-4 rounded-2xl bg-[#F8FCFF] border border-[#087F8C]/15 mb-6 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#142C43]/60">Treatment:</span>
                <span className="font-semibold text-[#142C43]">{submittedBooking?.treatment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#142C43]/60">Requested Date:</span>
                <span className="font-semibold text-[#142C43]">{submittedBooking?.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#142C43]/60">Time Slot:</span>
                <span className="font-semibold text-[#142C43]">{submittedBooking?.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#142C43]/60">Provider:</span>
                <span className="font-semibold text-[#087F8C]">{doctorName}</span>
              </div>
            </div>

            {/* Quick WhatsApp Expedite Action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Expedite via WhatsApp Concierge</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-3 text-xs font-semibold text-[#142C43]/80 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
