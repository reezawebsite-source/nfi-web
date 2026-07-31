import { PortfolioItem, NewsPost, ServiceOffering, TeamMember, ContactInquiry } from '../types';

// Default API Base URL (Dapat dikonfigurasi lewat VITE_API_BASE_URL)
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Service API terintegrasi untuk menghubungkan React Frontend dengan MySQL Database (Laravel REST API)
 */
export const apiService = {
  // Check Health status MySQL API
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      const data = await res.json();
      return data.status === 'online';
    } catch {
      return false;
    }
  },

  // 1. Portfolio
  async getPortfolio(): Promise<PortfolioItem[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /portfolio, menggunakan data lokal:', err);
      return null;
    }
  },

  async createPortfolio(item: Omit<PortfolioItem, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(item),
      });
      return await res.json();
    } catch (err) {
      console.error('Error create portfolio MySQL:', err);
      return null;
    }
  },

  // 2. News Posts
  async getNews(): Promise<NewsPost[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/news`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /news:', err);
      return null;
    }
  },

  // 3. Services
  async getServices(): Promise<ServiceOffering[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /services:', err);
      return null;
    }
  },

  // 4. Team Members
  async getTeam(): Promise<TeamMember[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/team`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /team:', err);
      return null;
    }
  },

  // 5. Contact Inquiries (Submit Pesan ke MySQL)
  async createInquiry(inquiry: Omit<ContactInquiry, 'id' | 'uuid' | 'createdAt' | 'status'>) {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
      return await res.json();
    } catch (err) {
      console.warn('Kirim inquiry ke MySQL gagal, tersimpan lokal:', err);
      return null;
    }
  },

  // 6. Admin Authentication Login ke MySQL
  async loginAdmin(email: string, pass: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Login MySQL API offline, menggunakan fallback lokal:', err);
      return null;
    }
  },
};
