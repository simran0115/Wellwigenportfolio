/**
 * Mock data for the Vendor Dashboard V2
 * Provides realistic data for different provider types.
 */

export const MOCK_PROVIDERS = {
  DOCTOR: {
    name: "Dr. Sarah Mitchell",
    type: "DOCTOR",
    specialization: "Cardiologist",
    rating: 4.9,
    acceptanceRate: 98,
    performanceScore: 92,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  FRUIT_VENDOR: {
    name: "Fresh Orchard Hub",
    type: "FRUIT_VENDOR",
    specialization: "Organic Fruits",
    rating: 4.7,
    acceptanceRate: 94,
    performanceScore: 88,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fresh",
  },
  TRAINER: {
    name: "Alex Rivera",
    type: "TRAINER",
    specialization: "Personal Fitness",
    rating: 4.8,
    acceptanceRate: 96,
    performanceScore: 90,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  LAB: {
    name: "Precision Labs",
    type: "LAB",
    specialization: "Pathology & Diagnostics",
    rating: 4.9,
    acceptanceRate: 99,
    performanceScore: 95,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lab",
  },
  PHARMACY: {
    name: "Wellness Pharma",
    type: "PHARMACY",
    specialization: "Medicines & Supplements",
    rating: 4.6,
    acceptanceRate: 92,
    performanceScore: 85,
    verified: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pharmacy",
  }
};

export const MOCK_ORDERS = [
  {
    id: "ORD-7281",
    customer: "John Doe",
    service: "Regular Consultation",
    time: "10:30 AM",
    date: "Today",
    distance: "2.4 km",
    priority: "High",
    status: "pending",
    amount: "₹800",
    timeLeft: 120, // seconds
  },
  {
    id: "ORD-7282",
    customer: "Jane Smith",
    service: "Emergency Session",
    time: "11:45 AM",
    date: "Today",
    distance: "1.2 km",
    priority: "Urgent",
    status: "accepted",
    amount: "₹1200",
    timeLeft: 0,
  },
  {
    id: "ORD-7283",
    customer: "Mike Johnson",
    service: "Follow-up",
    time: "02:15 PM",
    date: "Today",
    distance: "4.8 km",
    priority: "Medium",
    status: "in-progress",
    amount: "₹500",
    timeLeft: 0,
  },
  {
    id: "ORD-7284",
    customer: "Emily Davis",
    service: "Initial Assessment",
    time: "09:00 AM",
    date: "Tomorrow",
    distance: "3.5 km",
    priority: "Low",
    status: "pending",
    amount: "₹1000",
    timeLeft: 300,
  }
];

export const MOCK_ACTIVITY = [
  { id: 1, type: "order", message: "New consultation request from John Doe", time: "2 mins ago" },
  { id: 2, type: "review", message: "Jane Smith left a 5-star rating", time: "1 hour ago" },
  { id: 3, type: "system", message: "Daily revenue report is ready", time: "3 hours ago" },
  { id: 4, type: "payout", message: "Weekly payout processed successfully", time: "5 hours ago" },
];

export const MOCK_REVENUE_DATA = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 5000, orders: 30 },
  { name: 'Thu', revenue: 2780, orders: 15 },
  { name: 'Fri', revenue: 6890, orders: 42 },
  { name: 'Sat', revenue: 2390, orders: 12 },
  { name: 'Sun', revenue: 3490, orders: 20 },
];

export const MOCK_INVENTORY = {
  DOCTOR: [
    { id: 1, name: "Consultation Slot", price: "₹800", availability: true },
    { id: 2, name: "Specialized Cardiac Checkup", price: "₹2500", availability: true },
    { id: 3, name: "Tele-consultation", price: "₹600", availability: false },
  ],
  FRUIT_VENDOR: [
    { id: 1, name: "Organic Alphonso Mangoes", price: "₹500/kg", stock: 24, availability: true },
    { id: 2, name: "Australian Apples", price: "₹220/kg", stock: 15, availability: true },
    { id: 3, name: "Himalayan Cherries", price: "₹450/box", stock: 0, availability: false },
  ],
  LAB: [
    { id: 1, name: "Full Body Checkup", price: "₹1500", availability: true },
    { id: 2, name: "Blood Sugar Test", price: "₹200", availability: true },
    { id: 3, name: "Home Sample Collection", price: "₹100", availability: true },
  ],
  PHARMACY: [
    { id: 1, name: "Paracetamol 500mg", price: "₹20/strip", stock: 100, availability: true },
    { id: 2, name: "N95 Mask", price: "₹50", stock: 50, availability: true },
    { id: 3, name: "Hand Sanitizer 500ml", price: "₹150", stock: 10, availability: true },
  ]
};
