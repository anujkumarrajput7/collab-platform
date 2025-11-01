const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface ApiError {
  message: string;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'An error occurred');
  }

  return data as T;
}

// Auth API
export const authApi = {
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    role: 'influencer' | 'company' | 'admin';
    bio?: string;
  }) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: { email: string; password: string }) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Startups API
export const startupsApi = {
  create: async (data: {
    name: string;
    industry: string;
    location?: string;
    description?: string;
    website?: string;
  }) => {
    return apiCall('/startups', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Campaigns API
export const campaignsApi = {
  getAll: async (params?: Record<string, string>) => {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return apiCall(`/campaigns${queryString}`, { method: 'GET' });
  },

  getOne: async (id: string) => {
    return apiCall(`/campaigns/${id}`, { method: 'GET' });
  },

  create: async (data: {
    title: string;
    description?: string;
    startupId: string;
    platforms: string[];
    minFollowers?: number;
    category?: string;
    budget?: number;
    isPaid?: boolean;
    requirements?: string;
  }) => {
    return apiCall('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Applications API
export const applicationsApi = {
  create: async (data: {
    campaignId: string;
    coverMessage?: string;
    proposedPrice?: number;
  }) => {
    return apiCall('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Payments API
export const paymentsApi = {
  create: async (data: { campaignId: string; amount: number }) => {
    return apiCall('/payments/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  complete: async (paymentId: string) => {
    return apiCall(`/payments/complete/${paymentId}`, {
      method: 'POST',
    });
  },
};

// Messages API
export const messagesApi = {
  send: async (data: { to: string; text: string }) => {
    return apiCall('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getThread: async (userId: string) => {
    return apiCall(`/messages/thread/${userId}`, {
      method: 'GET',
    });
  },
};

// Influencers API
export const influencersApi = {
  getAll: async () => {
    return apiCall('/influencers', { method: 'GET' });
  },
  
  addSocialProfile: async (data: {
    platform: string;
    handle: string;
    followersCount: number;
    proofUrl?: string;
  }) => {
    return apiCall('/influencers/social', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
