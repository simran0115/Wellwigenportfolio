export const PROVIDER_TYPES = {
  VENDOR: 'VENDOR',
  DOCTOR: 'DOCTOR',
  LAB: 'LAB',
  PHARMACY: 'PHARMACY',
  TRAINER: 'TRAINER',
  NUTRITION: 'NUTRITION'
};

export const PROVIDER_STATUS = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED'
};

export const PROVIDER_CONFIG = {
  [PROVIDER_TYPES.VENDOR]: {
    label: 'Retail Vendor',
    description: 'Sell health and wellness products',
    icon: 'Store',
    requiredDocs: ['FSSAI License', 'Business PAN'],
    themeColor: 'blue',
    instructions: 'Register your business to start selling health products and supplements.',
    onboardingSteps: [
      'Basic business details',
      'FSSAI & GST documentation',
      'Inventory & delivery setup',
      'Admin verification (24h)'
    ],
    terms: [
      'As a vendor, you agree to sell only authentic products. We have zero tolerance for counterfeit or expired health goods.',
      'Maintain adequate stock levels to prevent order cancellations. Persistent cancellations may lead to account suspension.',
      'FSSAI compliance is mandatory for all food items. You must keep your license valid and updated on the platform.',
      'Our standard return policy applies to all products sold. Vendors are responsible for reverse logistics for defective items.',
      'All payments will be settled within T+3 working days after successful delivery and completion of the return window.'
    ]
  },
  [PROVIDER_TYPES.DOCTOR]: {
    label: 'Medical Professional',
    description: 'Offer consultations and prescriptions',
    icon: 'Stethoscope',
    requiredDocs: ['Medical Degree', 'NMC Registration', 'Clinic License'],
    themeColor: 'emerald',
    instructions: 'Complete your medical profile to start offering virtual or physical consultations.',
    onboardingSteps: [
      'Degree & Registration proof',
      'Consultation fee setup',
      'Specialization details',
      'Identity verification (48h)'
    ],
    terms: [
      'Doctors must provide valid NMC registration. Any lapse in registration must be reported immediately.',
      'Telemedicine guidelines as issued by the health ministry must be followed strictly during all virtual consultations.',
      'All prescriptions must be digitally signed and contain the registration number of the consulting professional.',
      'Patient confidentiality is paramount. Sharing patient data outside the platform is a violation of HIPAA/Digital Health standards.',
      'Consultation fees are subject to platform commissions as agreed upon during this onboarding process.'
    ]
  },
  [PROVIDER_TYPES.LAB]: {
    label: 'Diagnostic Lab',
    description: 'Provide testing and health checkups',
    icon: 'FlaskConical',
    requiredDocs: ['NABL Accreditation', 'Trade License'],
    themeColor: 'purple',
    instructions: 'List your diagnostic center to provide lab tests and health packages.',
    onboardingSteps: [
      'Lab certification upload',
      'Test catalog setup',
      'Home collection coverage',
      'Facility audit (optional)'
    ],
    terms: [
      'Labs must maintain NABL or equivalent standards for all diagnostic tests listed on the platform.',
      'Home collection professionals must follow strict hygiene protocols and use sterilized equipment at all times.',
      'Reports must be delivered within the specified Turnaround Time (TAT) to maintain platform ratings.',
      'Pricing for tests must be transparent. Hidden charges during sample collection are strictly prohibited.',
      'Digital reports must be uploaded to the patient dashboard in a clear, legible PDF format.'
    ]
  },
  [PROVIDER_TYPES.PHARMACY]: {
    label: 'Pharmacy',
    description: 'Dispense medicines and healthcare items',
    icon: 'Pill',
    requiredDocs: ['Drug License', 'Pharmacist Reg'],
    themeColor: 'rose',
    instructions: 'Connect your pharmacy to provide medicines and wellness essentials to patients.',
    onboardingSteps: [
      'Drug license verification',
      'Pharmacist registration',
      'Delivery radius setup',
      'Inventory sync'
    ],
    terms: [
      'Pharmacies must verify all prescriptions manually before dispensing any scheduled medicines.',
      'All medicines must be within the expiry period. Selling expired or near-expiry goods will result in immediate termination.',
      'A registered pharmacist must be present during the dispensing process as per legal requirements.',
      'Storage conditions for temperature-sensitive medicines must be strictly maintained during storage and transit.',
      'Drug license and Pharmacist registration must be kept updated in the platform records at all times.'
    ]
  },
  [PROVIDER_TYPES.NUTRITION]: {
    label: 'Nutrition & Diet',
    description: 'Fresh fruits, healthy meals & supplements',
    icon: 'Apple',
    requiredDocs: ['Food Safety Cert', 'GST Details'],
    themeColor: 'orange',
    instructions: 'Provide healthy eating options and nutritional supplements to our health-conscious community.',
    onboardingSteps: [
      'Food category selection',
      'Sourcing & freshness proof',
      'Kitchen/Store verification',
      'Delivery logistics'
    ],
    terms: [
      'Nutrition providers must ensure the highest quality and freshness of all fresh produce and fruits.',
      'Prepared meals must follow local food safety and hygiene guidelines. Kitchen audits may be conducted periodically.',
      'All health supplements must be FSSAI approved. Claims regarding health benefits must be scientifically backed.',
      'Packaging must be eco-friendly where possible and ensure the integrity of the food during transit.',
      'Delivery times for prepared meals must be adhered to strictly to ensure nutritional value and taste.'
    ]
  }
};
