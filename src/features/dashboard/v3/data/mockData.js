export const PROVIDER_TYPES = {
  FRUIT_VENDOR: 'fruit-vendor',
  DOCTOR: 'doctor',
  TRAINER: 'trainer',
  PHARMACY: 'pharmacy',
  LAB: 'lab',
};

export const PROVIDER_INFO = {
  'fruit-vendor': {
    id: 'vendor-01',
    title: 'Fresh Produce Partner',
    name: 'Ramesh Fruits & Vegetables',
    location: 'Gomti Nagar, Lucknow',
    roleLabel: 'Fruit Vendor',
    status: 'Verified',
    rating: 4.6,
    acceptance: 94,
    capacity: 82,
    tagline: 'Daily orders, inventory and delivery operations in one place.',
  },
  doctor: {
    id: 'provider-02',
    title: 'Healthcare Practitioner',
    name: 'Dr. Nidhi Sharma',
    location: 'Sector 18, Noida',
    roleLabel: 'Doctor',
    status: 'Verified',
    rating: 4.7,
    acceptance: 91,
    capacity: 76,
    tagline: 'Consultation slots, patient flow and performance tracking.',
  },
  trainer: {
    id: 'provider-03',
    title: 'Wellness Coach',
    name: 'Amit Singh',
    location: 'Koramangala, Bangalore',
    roleLabel: 'Trainer',
    status: 'Verified',
    rating: 4.8,
    acceptance: 89,
    capacity: 68,
    tagline: 'Class schedules, bookings and group sessions at a glance.',
  },
  pharmacy: {
    id: 'provider-04',
    title: 'Healthcare Pharmacy',
    name: 'HealthMart Pharmacy',
    location: 'MG Road, Pune',
    roleLabel: 'Pharmacy',
    status: 'Verified',
    rating: 4.5,
    acceptance: 93,
    capacity: 88,
    tagline: 'Medicine inventory, prescriptions and delivery readiness.',
  },
  lab: {
    id: 'provider-05',
    title: 'Diagnostic Lab',
    name: 'Pristine Labs',
    location: 'HSR Layout, Bangalore',
    roleLabel: 'Lab',
    status: 'Verified',
    rating: 4.6,
    acceptance: 90,
    capacity: 80,
    tagline: 'Tests, slots and sample pickups managed from one screen.',
  },
};

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'orders', label: 'Orders / Requests' },
  { id: 'schedule', label: 'Schedule Calendar' },
  { id: 'inventory', label: 'Inventory / Services' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'customers', label: 'Customers' },
  { id: 'performance', label: 'Performance Score' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'profile', label: 'Profile & Verification' },
];

export const DASHBOARD_METRICS = {
  'fruit-vendor': [
    { label: 'Pending Requests', value: '12', detail: 'Action needed in 45m' },
    { label: "Today's Schedule", value: '18', detail: 'Deliveries / pickups' },
    { label: 'Acceptance Rate', value: '94%', detail: 'Stable performance' },
    { label: 'Provider Score', value: '82', detail: 'Strong operations' },
  ],
  doctor: [
    { label: 'Pending Requests', value: '9', detail: 'Review new consults' },
    { label: "Today's Schedule", value: '14', detail: 'Appointments confirmed' },
    { label: 'Acceptance Rate', value: '91%', detail: 'High response rate' },
    { label: 'Provider Score', value: '76', detail: 'Consistent care' },
  ],
  trainer: [
    { label: 'Pending Requests', value: '8', detail: 'New training requests' },
    { label: "Today's Schedule", value: '12', detail: 'Personal & group classes' },
    { label: 'Acceptance Rate', value: '89%', detail: 'Strong follow-up' },
    { label: 'Provider Score', value: '68', detail: 'Room to improve' },
  ],
  pharmacy: [
    { label: 'Pending Requests', value: '7', detail: 'Prescriptions waiting' },
    { label: "Today's Schedule", value: '10', detail: 'Deliveries / pickups' },
    { label: 'Acceptance Rate', value: '93%', detail: 'Reliable fulfillment' },
    { label: 'Provider Score', value: '88', detail: 'Very good operations' },
  ],
  lab: [
    { label: 'Pending Requests', value: '11', detail: 'Reports pending review' },
    { label: "Today's Schedule", value: '15', detail: 'Sample collections' },
    { label: 'Acceptance Rate', value: '90%', detail: 'On-time coordination' },
    { label: 'Provider Score', value: '80', detail: 'Solid control' },
  ],
};

export const ORDERS = {
  'fruit-vendor': [
    { id: 'FV-101', customer: 'Priya Sharma', service: 'Fruit basket', slot: 'Today 10:30 AM', distance: '2.3 km', status: 'Pending', priority: 'High', countdown: 2200 },
    { id: 'FV-102', customer: 'Mohit Gupta', service: 'Seasonal pack', slot: 'Today 11:00 AM', distance: '1.1 km', status: 'Accepted', priority: 'Medium', countdown: 8400 },
    { id: 'FV-103', customer: 'Sunita Verma', service: 'Green bundle', slot: 'Today 12:15 PM', distance: '3.8 km', status: 'In Progress', priority: 'Low', countdown: 0 },
  ],
  doctor: [
    { id: 'DR-201', customer: 'Asha Patel', service: 'Consultation', slot: 'Today 09:30 AM', distance: 'Clinic', status: 'Pending', priority: 'High', countdown: 1800 },
    { id: 'DR-202', customer: 'Rohan Mehta', service: 'Follow-up', slot: 'Today 11:00 AM', distance: 'Clinic', status: 'Accepted', priority: 'Medium', countdown: 3200 },
    { id: 'DR-203', customer: 'Meera Joshi', service: 'Teleconsult', slot: 'Today 01:00 PM', distance: 'Online', status: 'Completed', priority: 'Low', countdown: 0 },
  ],
  trainer: [
    { id: 'TR-301', customer: 'Sonal Khanna', service: 'Yoga session', slot: 'Today 07:00 AM', distance: 'Gym', status: 'Pending', priority: 'High', countdown: 1300 },
    { id: 'TR-302', customer: 'Vikram Singh', service: 'Strength training', slot: 'Today 09:00 AM', distance: 'Home', status: 'In Progress', priority: 'High', countdown: 0 },
    { id: 'TR-303', customer: 'Ria Nair', service: 'Diet coaching', slot: 'Today 05:00 PM', distance: 'Online', status: 'Accepted', priority: 'Medium', countdown: 4600 },
  ],
  pharmacy: [
    { id: 'PH-401', customer: 'Karan Verma', service: 'Prescription refill', slot: 'Today 10:00 AM', distance: '2.0 km', status: 'Pending', priority: 'High', countdown: 1900 },
    { id: 'PH-402', customer: 'Nina Kapoor', service: 'Medicines delivery', slot: 'Today 12:30 PM', distance: '3.5 km', status: 'Accepted', priority: 'Medium', countdown: 5400 },
    { id: 'PH-403', customer: 'David Paul', service: 'Health pack', slot: 'Today 04:00 PM', distance: '1.5 km', status: 'Completed', priority: 'Low', countdown: 0 },
  ],
  lab: [
    { id: 'LB-501', customer: 'Neha Singh', service: 'Blood test', slot: 'Today 09:45 AM', distance: 'Home pickup', status: 'Pending', priority: 'High', countdown: 1600 },
    { id: 'LB-502', customer: 'Amit Yadav', service: 'Thyroid panel', slot: 'Today 11:15 AM', distance: 'Center', status: 'Accepted', priority: 'Medium', countdown: 3800 },
    { id: 'LB-503', customer: 'Preeti Rao', service: 'COVID test', slot: 'Today 02:30 PM', distance: 'Home pickup', status: 'In Progress', priority: 'Medium', countdown: 0 },
  ],
};

export const SCHEDULE = {
  'fruit-vendor': [
    { day: 'Mon', tasks: ['Market pickup', 'Inventory refresh', '4 deliveries'], highlight: true },
    { day: 'Tue', tasks: ['Farm pickup', '7 orders', 'Quality checks'] },
    { day: 'Wed', tasks: ['Seasonal stock review', '5 orders'] },
    { day: 'Thu', tasks: ['Fresh arrivals', '8 deliveries'] },
    { day: 'Fri', tasks: ['Supplier meeting', '9 orders'] },
    { day: 'Sat', tasks: ['Weekend demand prep', '12 deliveries'] },
    { day: 'Sun', tasks: ['Restock planning', '6 pickups'] },
  ],
  doctor: [
    { day: 'Mon', tasks: ['9 appointments', 'Patient follow ups'], highlight: true },
    { day: 'Tue', tasks: ['7 appointments', 'Week review'] },
    { day: 'Wed', tasks: ['Lab reports', '4 teleconsults'] },
    { day: 'Thu', tasks: ['10 appointments', 'Admin review'] },
    { day: 'Fri', tasks: ['8 appointments', 'Case notes'] },
    { day: 'Sat', tasks: ['Medical camp', '6 consults'] },
    { day: 'Sun', tasks: ['Research review', 'Slot planning'] },
  ],
  trainer: [
    { day: 'Mon', tasks: ['Bootcamp class', '5 sessions'], highlight: true },
    { day: 'Tue', tasks: ['Personal training', '3 group classes'] },
    { day: 'Wed', tasks: ['Recovery sessions', '6 bookings'] },
    { day: 'Thu', tasks: ['Nutrition review', '4 sessions'] },
    { day: 'Fri', tasks: ['Weekend prep', '7 classes'] },
    { day: 'Sat', tasks: ['Outdoor bootcamp', '8 bookings'] },
    { day: 'Sun', tasks: ['Rest day', 'Schedule updates'] },
  ],
  pharmacy: [
    { day: 'Mon', tasks: ['24 orders', 'Inventory audit'], highlight: true },
    { day: 'Tue', tasks: ['18 orders', 'Delivery packing'] },
    { day: 'Wed', tasks: ['20 orders', 'Stock receiving'] },
    { day: 'Thu', tasks: ['22 orders', 'Prescription check'] },
    { day: 'Fri', tasks: ['26 orders', 'Vendor call'] },
    { day: 'Sat', tasks: ['28 orders', 'Premium deliveries'] },
    { day: 'Sun', tasks: ['Inventory review', 'Staff rota'] },
  ],
  lab: [
    { day: 'Mon', tasks: ['30 samples', 'Report validation'], highlight: true },
    { day: 'Tue', tasks: ['25 samples', 'Collection drive'] },
    { day: 'Wed', tasks: ['28 samples', 'Test review'] },
    { day: 'Thu', tasks: ['32 samples', 'Lab cleaning'] },
    { day: 'Fri', tasks: ['35 samples', 'Priority reports'] },
    { day: 'Sat', tasks: ['20 samples', 'Weekend pick-ups'] },
    { day: 'Sun', tasks: ['15 samples', 'Planning'] },
  ],
};

export const INVENTORY_SERVICES = {
  'fruit-vendor': [
    { id: '1', label: 'Apples', status: 'In stock', quantity: '39 kg', available: true },
    { id: '2', label: 'Bananas', status: 'In stock', quantity: '26 kg', available: true },
    { id: '3', label: 'Oranges', status: 'Low stock', quantity: '20 kg', available: true },
    { id: '4', label: 'Spinach', status: 'Critical', quantity: '4 kg', available: false },
    { id: '5', label: 'Strawberries', status: 'Critical', quantity: '3 kg', available: false },
  ],
  doctor: [
    { id: '1', label: 'General Consultation', status: 'Available', schedule: '9:00 AM - 3:00 PM', available: true },
    { id: '2', label: 'Cardiology Review', status: 'Booked', schedule: '11:00 AM - 1:00 PM', available: false },
    { id: '3', label: 'Telemedicine', status: 'Available', schedule: '4:00 PM - 7:00 PM', available: true },
  ],
  trainer: [
    { id: '1', label: 'HIIT Session', status: 'Open', capacity: '12/15', available: true },
    { id: '2', label: 'Yoga Class', status: 'Open', capacity: '8/12', available: true },
    { id: '3', label: 'Nutrition Coaching', status: 'Booked', capacity: '1/1', available: false },
  ],
  pharmacy: [
    { id: '1', label: 'Paracetamol', status: 'In stock', quantity: '120 pcs', available: true },
    { id: '2', label: 'Antibiotics', status: 'Running low', quantity: '18 boxes', available: true },
    { id: '3', label: 'Blood pressure kit', status: 'Available', quantity: '8 pcs', available: true },
  ],
  lab: [
    { id: '1', label: 'Full Body Checkup', status: 'Open', slots: '08:00 AM - 04:00 PM', available: true },
    { id: '2', label: 'COVID PCR', status: 'Booked', slots: '10:00 AM - 02:00 PM', available: false },
    { id: '3', label: 'Thyroid Panel', status: 'Open', slots: '09:00 AM - 01:00 PM', available: true },
  ],
};

export const ANALYTICS = {
  'fruit-vendor': {
    revenueTrend: [
      { name: 'Mon', value: 4.1 },
      { name: 'Tue', value: 4.8 },
      { name: 'Wed', value: 5.2 },
      { name: 'Thu', value: 5.0 },
      { name: 'Fri', value: 5.5 },
      { name: 'Sat', value: 6.2 },
      { name: 'Sun', value: 5.8 },
    ],
    ordersTrend: [
      { name: 'Mon', value: 24 },
      { name: 'Tue', value: 28 },
      { name: 'Wed', value: 32 },
      { name: 'Thu', value: 30 },
      { name: 'Fri', value: 38 },
      { name: 'Sat', value: 42 },
      { name: 'Sun', value: 34 },
    ],
    ratingTrend: [
      { name: 'Jan', value: 4.2 },
      { name: 'Feb', value: 4.4 },
      { name: 'Mar', value: 4.5 },
      { name: 'Apr', value: 4.6 },
      { name: 'May', value: 4.6 },
      { name: 'Jun', value: 4.6 },
    ],
    peakTimes: ['10 AM', '12 PM', '5 PM'],
  },
    revenueTrend: []
  }
};