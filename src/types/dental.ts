export interface Treatment {
  id: string;
  title: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'orthodontics';
  shortDesc: string;
  fullDesc: string;
  duration: string;
  painLevel: 'Virtually Painless' | 'Gentle / Localized' | 'Comfort Managed';
  idealFor: string[];
  keyBenefits: string[];
  iconName: string;
  accentColor: string;
}

export interface Dentist {
  id: string;
  name: string;
  credentials: string;
  role: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  education: string;
  languages: string[];
  avatarBg: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatmentReceived: string;
  date: string;
  quote: string;
  rating: number;
  verified: boolean;
}

export interface AppointmentData {
  patientName: string;
  phone: string;
  email?: string;
  treatment: string;
  dentistId: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'treatments' | 'comfort' | 'insurance';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'technology' | 'operatory' | 'results';
  caption: string;
  tag: string;
}
