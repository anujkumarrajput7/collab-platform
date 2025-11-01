const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  mine: async () => {
    return apiCall('/startups/mine', { method: 'GET' });
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

  remove: async (id: string) => {
    return apiCall(`/campaigns/${id}`, { method: 'DELETE' });
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
  list: async () => {
    return apiCall('/applications', { method: 'GET' });
  },
  decide: async (id: string, action: 'accept' | 'reject') => {
    return apiCall(`/applications/${id}/decide`, { method: 'POST', body: JSON.stringify({ action }) });
  },
};

// Posts API
export const postsApi = {
  feed: async () => apiCall('/posts', { method: 'GET' }),
  mine: async () => apiCall('/posts/me', { method: 'GET' }),
  getOne: async (id: string) => apiCall(`/posts/${id}`, { method: 'GET' }),
  create: async (data: { text?: string; mediaUrl?: string; type?: 'post' | 'reel'; visibility?: 'public' | 'followers'; audioUrl?: string; songTitle?: string; songArtist?: string }) =>
    apiCall('/posts', { method: 'POST', body: JSON.stringify(data) }),
  like: async (id: string) => apiCall(`/posts/${id}/like`, { method: 'POST' }),
  getComments: async (id: string) => apiCall(`/posts/${id}/comments`, { method: 'GET' }),
  addComment: async (id: string, text: string) => apiCall(`/posts/${id}/comments`, { method: 'POST', body: JSON.stringify({ text }) }),
};

// Admin API
export const adminApi = {
  listPendingVerifications: async () => apiCall('/influencers/pending-verifications', { method: 'GET' }),
  verifySocialProfile: async (userId: string, index: number) =>
    apiCall(`/influencers/social/${userId}/${index}/verify`, { method: 'POST' }),
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

  contacts: async () => {
    return apiCall('/influencers?contacts=1', { method: 'GET' });
  },
};

// Upload API
export const uploadApi = {
  upload: async (file: File) => {
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('media', file);
    const resp = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: form,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error((data as any).message || 'Upload failed');
    return data as { url: string };
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

  updateMe: async (data: { name?: string; bio?: string; avatarUrl?: string }) => {
    return apiCall('/influencers/me', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Proof Submission API
export const proofApi = {
  submit: async (applicationId: string, data: { proofUrl: string; caption: string }) => {
    return apiCall(`/applications/${applicationId}/proof`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  verify: async (applicationId: string, approved: boolean) => {
    return apiCall(`/applications/${applicationId}/verify`, {
      method: 'POST',
      body: JSON.stringify({ approved }),
    });
  },
};

// Leaderboard API
export const leaderboardApi = {
  getAll: async (params?: { timeframe?: string; limit?: number }) => {
    const queryString = params
      ? '?' + new URLSearchParams(params as any).toString()
      : '';
    return apiCall(`/leaderboard${queryString}`, { method: 'GET' });
  },
  getMyRank: async () => {
    return apiCall('/leaderboard/my-rank', { method: 'GET' });
  },
  getLiveActivity: async (limit?: number) => {
    const queryString = limit ? `?limit=${limit}` : '';
    return apiCall(`/leaderboard/activity${queryString}`, { method: 'GET' });
  },
};

// Reviews API
export const reviewsApi = {
  create: async (data: { campaign?: string; reviewee: string; rating: number; comment?: string }) => {
    return apiCall('/reviews', { method: 'POST', body: JSON.stringify(data) });
  },
};

export { apiCall, API_BASE_URL };
