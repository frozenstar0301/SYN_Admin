// src/services/api.ts
import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {  
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/users/login', credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/users/register', credentials);
    return data;
  },

  verifyEmail: async (token: string): Promise<void> => {
    await api.get(`/users/verify-email/${token}`);
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    await api.post('/users/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await api.post(`/users/reset-password/${token}`, { password });
  },

  getProfile: async (): Promise<User> => {
    const { data } = await api.get('/users/profile');
    return data.user;
  },
};

export default api;
