import { apiCall } from './api';

export const reviewsApi = {
  create: async (data: { campaign?: string; reviewee: string; rating: number; comment?: string }) => {
    return apiCall('/reviews', { method: 'POST', body: JSON.stringify(data) });
  },
};
