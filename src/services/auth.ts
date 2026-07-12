import { api } from '@/lib/api';
import { AuthResponse } from '@/types/api';

export const authService = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),

  register: (email: string, password: string, role: string) =>
    api.post<AuthResponse>('/auth/register', { email, password, role }),

  getProfile: () => api.get<AuthResponse>('/auth/me'),
};
