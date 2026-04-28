export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const ENDPOINTS = {
  // Existing
  register: '/consultation',
  
  // Subscription Feature
  subscriptionCreate: '/api/subscription/create',
  subscriptionVerify: '/api/subscription/verify',
  subscriptionMe: (userId) => `/api/subscription/me/${userId}`,
  subscriptionCancel: (id) => `/api/subscription/cancel/${id}`,
  subscriptionPause: (id) => `/api/subscription/pause/${id}`,

  // Provider Feature
  providerRegister: '/api/provider/register',
  providerUploadDocs: '/api/provider/upload-documents',
  providerMe: (id) => `/api/provider/me/${id}`,
  providerAvailability: (id) => `/api/provider/availability/${id}`,
};
