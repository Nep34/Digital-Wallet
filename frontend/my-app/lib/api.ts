import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;

  const token = window.localStorage.getItem('digital-wallet-token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export type ApiError = {
  message: string;
};

export default api;
