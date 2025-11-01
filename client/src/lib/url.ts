export const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';
export const API_ORIGIN = API_BASE_URL.replace(/\/?api\/?$/, '');

export function assetUrl(path?: string | null) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('/')) return `${API_ORIGIN}${path}`;
  return `${API_ORIGIN}/${path}`;
}
