import { Treatment, Dentist, Testimonial, FaqItem, GalleryItem } from '../types/dental';

export const CLINIC_INFO = {
  name: 'AuraDent',
  tagline: '3D Aesthetic & Precision Dental Studio',
  headline: 'Your Smile Deserves Extraordinary Care.',
  subheadline:
    'Experience modern dentistry with advanced 3D diagnostic technology, gentle micro-invasive treatments, and personalized care designed for your brightest, healthiest smile.',
  address: '450 Sutter Medical Pavilion, Suite 1400, San Francisco, CA 94108',
  phone: '+1 (415) 890-3344',
  emergencyPhone: '+1 (415) 890-3399',
  email: 'concierge@auradentstudio.com',
  whatsappNumber: '+14158903344',
  hours: [
    { days: 'Monday – Thursday', time: '8:00 AM – 6:00 PM' },
    { days: 'Friday', time: '8:00 AM – 4:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 2:00 PM (By Appointment)' },
    { days: 'Sunday', time: 'Emergency Coverage Only' },
  ],
};

export const TREATMENTS: Treatment[] = [
  {
    id: 'general-dentistry',
    title: 'Comprehensive Oral Wellness',
    category: 'preventive',
    shortDesc: 'Precision digital exams, high-resolution intraoral imaging, and biomimetic prevention.',
    fullDesc:
      'Our comprehensive oral evaluations utilize 3D digital imaging rather than abrasive tools. We examine tooth micro-structure, gum health, bite dynamics, and early enamel demineralization before issues arise.',
    duration: '45 – 60 min',
    painLevel: 'Virtually Painless',
    idealFor: ['Routine checkups', 'Early decay detection', 'Oral cancer screenings'],
    keyBenefits: ['Radiation-reduced digital sensors', 'Immediate 3D display review', 'Biomimetic preventative plan'],
    iconName: 'ShieldCheck',
    accentColor: '#087F8C',
  },
  {
    id: 'teeth-whitening',
    title: 'Laser & Enamel Whitening',
    category: 'cosmetic',
    shortDesc: 'Gentle, zero-sensitivity laser whitening brightening enamel up to 8 shades in one session.',
    fullDesc:
      'Using pH-balanced active carbamide and hydrogen peroxide formulas accelerated by cold-spectrum light, we eliminate deep coffee, tea, and aging stains without eroding healthy enamel prism crystals.',
    duration: '60 min',
    painLevel: 'Virtually Painless',
    idealFor: ['Deep staining', 'Pre-wedding or events', 'Uniform enamel shade lift'],
    keyBenefits: ['Up to 8 shades brighter in 1 hour', 'Integrated desensitizing remineralizer', 'Custom home maintenance trays included'],
    iconName: 'Sparkles',
    accentColor: '#54D6D0',
  },
  {
    id: 'dental-implants',
    title: '3D Computer-Guided Implants',
    category: 'restorative',
    shortDesc: 'Permanent titanium and zirconia root replacements placed with sub-millimeter surgical accuracy.',
    fullDesc:
      'We utilize Cone Beam Computed Tomography (CBCT) 3D scans and surgical computer guides to position biocompatible implants. This preserves adjacent healthy teeth, prevents bone loss, and restores 100% natural chewing force.',
    duration: '60 – 90 min per fixture',
    painLevel: 'Comfort Managed',
    idealFor: ['Single missing tooth', 'Multiple tooth gaps', 'Implant-supported arches'],
    keyBenefits: ['Lifelong durability', 'Zero compromise to adjacent teeth', 'Custom ceramic crown color-matched seamlessly'],
    iconName: 'Anchor',
    accentColor: '#087F8C',
  },
  {
    id: 'orthodontics-aligners',
    title: 'Clear Aligners & Orthodontics',
    category: 'orthodontics',
    shortDesc: 'Custom transparent aligners engineered with 3D tooth movement simulation for discreet correction.',
    fullDesc:
      'Straighten crowding, crossbites, and spacing without metal brackets. We map every fraction of a millimeter of tooth movement using our 3D digital studio, letting you preview your final smile before starting treatment.',
    duration: 'Checkups every 6 – 8 weeks',
    painLevel: 'Gentle / Localized',
    idealFor: ['Adult teeth alignment', 'Relapsed spacing', 'Overbites & mild underbites'],
    keyBenefits: ['Removable for dining and hygiene', 'Virtually invisible matte finish', 'Digital smile trajectory preview'],
    iconName: 'Smile',
    accentColor: '#54D6D0',
  },
  {
    id: 'root-canal',
    title: 'Microscopic Endodontics',
    category: 'restorative',
    shortDesc: 'Gentle root canal therapy utilizing high-power surgical microscopes to preserve natural teeth.',
    fullDesc:
      'Modern endodontics is completely gentle. With high-magnification surgical optics and computerized rotary nickel-titanium instruments, infected nerve pulp is cleaned painlessly while preserving your natural tooth root foundation.',
    duration: '60 – 75 min',
    painLevel: 'Comfort Managed',
    idealFor: ['Deep infection', 'Severe hot/cold sensitivity', 'Trauma cracked tooth'],
    keyBenefits: ['Saves the natural tooth permanently', 'Instant relief from nerve ache', 'Bioceramic sealed against future bacteria'],
    iconName: 'Activity',
    accentColor: '#087F8C',
  },
  {
    id: 'cosmetic-veneers',
    title: 'Ultra-Thin Porcelain Veneers',
    category: 'cosmetic',
    shortDesc: 'Handcrafted ultra-thin ceramic veneers tailored to harmonize with facial features and skin tone.',
    fullDesc:
      'Crafted from master-grade feldspathic and lithium disilicate porcelain, our veneers recreate natural enamel translucency, light reflection, and surface texture with minimal preparation of your natural tooth structure.',
    duration: '2 visits across 10 days',
    painLevel: 'Gentle / Localized',
    idealFor: ['Chipped or worn teeth', 'Permanent discoloration', 'Gaps and uneven lengths'],
    keyBenefits: ['Stain-resistant glass ceramic', 'Individually sculpted by master ceramists', 'Long-lasting 15+ year aesthetic beauty'],
    iconName: 'Gem',
    accentColor: '#54D6D0',
  },
  {
    id: 'hygiene-polishing',
    title: 'Guided Biofilm Therapy (Air-Flow)',
    category: 'preventive',
    shortDesc: 'State-of-the-art warm water ultrasonic hygiene and erythritol powder gentle polishing.',
    fullDesc:
      'Say goodbye to uncomfortable scraping. Guided Biofilm Therapy uses temperature-regulated water and micro-fine powder to comfortably remove plaque biofilm, calculus, and surface discoloration from teeth and gum pockets.',
    duration: '45 min',
    painLevel: 'Virtually Painless',
    idealFor: ['Routine prophylaxis', 'Sensitive gums & recession', 'Implant and bracket maintenance'],
    keyBenefits: ['Warm water prevents sensitivity shocks', 'Reaches deep interdental spaces safely', 'Silky-smooth post-polish feel'],
    iconName: 'Droplets',
    accentColor: '#087F8C',
  },
  {
    id: 'pediatric-dentistry',
    title: 'Gentle Pediatric Dental Care',
    category: 'preventive',
    shortDesc: 'A positive, fear-free dental experience for children and teens with gentle habit coaching.',
    fullDesc:
      'We foster lifelong healthy dental attitudes in children. From gentle decay prevention sealants to fluoride remineralization and bite development monitoring, every visit is gentle, playful, and completely pressure-free.',
    duration: '30 – 45 min',
    painLevel: 'Virtually Painless',
    idealFor: ['First dental visits (ages 1+)', 'Cavity prevention sealants', 'Sports mouthguards'],
    keyBenefits: ['Anxiety-free friendly atmosphere', 'Protective dental fissure sealants', 'Fun dental education for parents and kids'],
    iconName: 'HeartHandshake',
    accentColor: '#54D6D0',
  },
];

export const DENTISTS: Dentist[] = [
  {
    id: 'dr-elena-vance',
    name: 'Dr. Elena Vance',
    credentials: 'DDS, FACP',
    role: 'Lead Prosthodontist & Aesthetic Director',
    specialty: 'Cosmetic Dentistry & Porcelain Veneers',
    experienceYears: 16,
    bio: 'Dr. Vance completed her residency at Columbia University and specialized fellowship in Advanced Aesthetic Dentistry. She is renowned for her biomimetic approach, focusing on preserving tooth vitality while achieving natural, radiant smiles.',
    education: 'Columbia University College of Dental Medicine',
    languages: ['English', 'French', 'Italian'],
    avatarBg: 'from-[#087F8C]/20 to-[#54D6D0]/30',
  },
  {
    id: 'dr-marcus-chen',
    name: 'Dr. Marcus Chen',
    credentials: 'DMD, MS',
    role: 'Orthodontic Specialist & 3D Diagnostics Lead',
    specialty: 'Clear Aligners & Digital Orthodontics',
    experienceYears: 12,
    bio: 'Pioneering computer-modeled tooth movement, Dr. Chen utilizes real-time 3D smile design software to eliminate guesswork. His patients appreciate his meticulous detail and discreet, non-invasive aligner protocols.',
    education: 'Harvard School of Dental Medicine',
    languages: ['English', 'Mandarin'],
    avatarBg: 'from-[#54D6D0]/20 to-[#DDF8F0]',
  },
  {
    id: 'dr-sarah-al-mansoor',
    name: 'Dr. Sarah Al-Mansoor',
    credentials: 'BDS, MSc Endodontics',
    role: 'Restorative & Endodontic Specialist',
    specialty: 'Microscopic Root Canal & Biocompatible Restorations',
    experienceYears: 14,
    bio: 'Dedicated to virtually painless dentistry, Dr. Al-Mansoor specializes in micro-endodontics using high-powered surgical illumination. Her gentle bedside manner puts even the most anxious patients completely at ease.',
    education: 'King’s College London Dental Institute',
    languages: ['English', 'Arabic', 'Spanish'],
    avatarBg: 'from-[#087F8C]/15 to-[#DCEFFF]',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Sophia Montgomery',
    treatmentReceived: 'Porcelain Veneers & Laser Whitening',
    date: 'February 2026',
    quote:
      'I was self-conscious about my chipped front teeth for over a decade. Dr. Vance gave me a smile that looks completely natural — not bulky or artificially white. The 3D preview made me feel confident before we even touched a tooth.',
    rating: 5,
    verified: true,
  },
  {
    id: 't-2',
    patientName: 'David K. Ross',
    treatmentReceived: 'Guided Biofilm Therapy & Implant Crown',
    date: 'January 2026',
    quote:
      'I used to dread cleanings because of extreme cold sensitivity. The warm water Air-Flow cleaning was an absolute revelation — zero pain, no scraping sounds. The entire clinic feels like a modern wellness retreat.',
    rating: 5,
    verified: true,
  },
  {
    id: 't-3',
    patientName: 'Claire Lin-Thorne',
    treatmentReceived: 'Clear Aligner Smile Correction',
    date: 'December 2025',
    quote:
      'Dr. Chen completed my alignment in 7 months without anyone at work noticing I had aligners in. The 3D scan took two minutes without any messy putty trays. Professionalism at the highest tier.',
    rating: 5,
    verified: true,
  },
  {
    id: 't-4',
    patientName: 'Julian Sterling',
    treatmentReceived: 'Microscopic Root Canal Therapy',
    date: 'November 2025',
    quote:
      'I went in with acute nerve pain, terrified of getting a root canal. Dr. Al-Mansoor was extraordinary. I literally fell asleep during the procedure, and left with zero pain. I cannot recommend AuraDent enough.',
    rating: 5,
    verified: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book an appointment, and how quickly will I be confirmed?',
    answer:
      'You can submit an appointment request through our interactive online form or reach out directly via WhatsApp. Our patient concierge team confirms all requests within 2 business hours, verifying your preferred treatment, provider, and insurance benefits.',
    category: 'booking',
  },
  {
    id: 'faq-2',
    question: 'What should I expect during my first visit to AuraDent?',
    answer:
      'Your first visit includes a 360-degree digital consultation, gentle high-definition 3D intraoral scan, full periodontal wellness check, and oral cancer screening. You will sit with your dentist to review your 3D tooth scans together on high-definition displays with zero rush.',
    category: 'comfort',
  },
  {
    id: 'faq-3',
    question: 'Are dental procedures truly painless?',
    answer:
      'Yes. We utilize computer-regulated local anesthesia (The Wand), topical pre-numbing gels, warm ultrasonic instruments, and needle-free options whenever clinically feasible. For patients with elevated dental anxiety, we offer soothing noise-canceling headphones, warm scented towels, and gentle sedation options.',
    category: 'comfort',
  },
  {
    id: 'faq-4',
    question: 'What is the difference between Laser Whitening and over-the-counter strips?',
    answer:
      'Over-the-counter strips contain low-concentration, acidic formulas that frequently irritate gums and only address surface enamel. Our in-office laser whitening uses safe, buffered pH gels activated by specific wavelengths to dissolve deep internal chromophores while depositing remineralizing minerals to seal dentin tubules and prevent sensitivity.',
    category: 'treatments',
  },
  {
    id: 'faq-5',
    question: 'Do you accept dental insurance or offer flexible payment plans?',
    answer:
      'We accept most major PPO dental insurance providers and handle all direct claims processing on your behalf. For elective cosmetic and orthodontic procedures, we partner with CareCredit and provide transparent 0% interest monthly installment plans.',
    category: 'insurance',
  },
  {
    id: 'faq-6',
    question: 'How do 3D digital impressions differ from traditional impressions?',
    answer:
      'We have completely retired gooey, nauseating silicone impression trays. Our intraoral scanner captures 6,000 optical frames per second, building an exact, micrometer-precise 3D color model of your teeth in under two minutes with zero gag reflex.',
    category: 'treatments',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Operatory Sanctuary',
    category: 'operatory',
    caption: 'Designed with floor-to-ceiling daylight, ergonomic memory-foam chairs, and ceiling screens.',
    tag: 'Treatment Suite',
  },
  {
    id: 'g-2',
    title: '3D CBCT Diagnostics Suite',
    category: 'technology',
    caption: 'Ultra-low radiation cone beam tomographic scanner for sub-millimeter anatomical precision.',
    tag: '3D Imaging',
  },
  {
    id: 'g-3',
    title: 'Patient Lounge & Consultation',
    category: 'interior',
    caption: 'An environment designed for relaxation with warm herbal teas, acoustic dampening, and calm.',
    tag: 'Welcome Lounge',
  },
  {
    id: 'g-4',
    title: 'Biomimetic Ceramic Studio',
    category: 'technology',
    caption: 'On-site dental milling and custom tinting for same-day precision ceramic inlays and crowns.',
    tag: 'Dental Lab',
  },
  {
    id: 'g-5',
    title: 'Sterilization Cleanroom',
    category: 'operatory',
    caption: 'Hospital-grade Class B vacuum autoclaves with digital cycle validation for every patient instrument.',
    tag: 'Infection Control',
  },
  {
    id: 'g-6',
    title: 'Aesthetic Smile Analysis',
    category: 'results',
    caption: 'Digital photographic smile mapping studio analyzing facial symmetry and lip dynamics.',
    tag: 'Smile Studio',
  },
];

export const SHADE_GUIDE = [
  { code: 'BL1', name: 'Ultra Diamond White', hex: '#FFFFFF', desc: 'Hollywood bright, ultra-clean luminescence' },
  { code: 'B1', name: 'Bright Natural Enamel', hex: '#FAF9F5', desc: 'Highest natural shade, luminous & youthful' },
  { code: 'A1', name: 'Pure Classic Pearl', hex: '#F5F2EB', desc: 'Most popular aesthetic restoration shade' },
  { code: 'A2', name: 'Natural Medium Ivory', hex: '#EEE7DA', desc: 'Standard adult natural tooth shade' },
  { code: 'A3', name: 'Warm Golden Dentin', hex: '#E4D9C5', desc: 'Warm natural shade prior to whitening' },
];
