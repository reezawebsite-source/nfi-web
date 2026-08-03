import {
  PortfolioItem,
  NewsPost,
  ServiceOffering,
  TeamMember,
  ContactInquiry,
  MediaFile,
  GeneralSettings,
  UserAccount,
} from '../types';

// Default API Base URL (Dapat dikonfigurasi lewat VITE_API_BASE_URL)
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Service API terintegrasi untuk menghubungkan React Frontend dengan MySQL Database (Laravel REST API)
 * Menyediakan dukungan penuh operasi CRUD (Create, Read, Update, Delete) untuk seluruh modul CMS.
 */
export const apiService = {
  // Check Health status MySQL API
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      return data.status === 'online';
    } catch {
      return false;
    }
  },

  // ==================== 1. PORTFOLIO ====================
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

  async updatePortfolio(id: string, item: Partial<PortfolioItem>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(item),
      });
      return await res.json();
    } catch (err) {
      console.error('Error update portfolio MySQL:', err);
      return null;
    }
  },

  async deletePortfolio(id: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      console.error('Error delete portfolio MySQL:', err);
      return null;
    }
  },

  // ==================== 2. NEWS POSTS ====================
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

  async createNews(post: Omit<NewsPost, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(post),
      });
      return await res.json();
    } catch (err) {
      console.error('Error create news MySQL:', err);
      return null;
    }
  },

  async updateNews(id: string, post: Partial<NewsPost>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(post),
      });
      return await res.json();
    } catch (err) {
      console.error('Error update news MySQL:', err);
      return null;
    }
  },

  async deleteNews(id: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      console.error('Error delete news MySQL:', err);
      return null;
    }
  },

  // ==================== 3. SERVICES ====================
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

  async createService(service: Omit<ServiceOffering, 'id' | 'uuid'>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(service),
      });
      return await res.json();
    } catch (err) {
      console.error('Error create service MySQL:', err);
      return null;
    }
  },

  async updateService(id: string, service: Partial<ServiceOffering>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(service),
      });
      return await res.json();
    } catch (err) {
      console.error('Error update service MySQL:', err);
      return null;
    }
  },

  async deleteService(id: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      console.error('Error delete service MySQL:', err);
      return null;
    }
  },

  // ==================== 4. TEAM MEMBERS ====================
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

  async createTeamMember(member: Omit<TeamMember, 'id' | 'uuid'>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(member),
      });
      return await res.json();
    } catch (err) {
      console.error('Error create team member MySQL:', err);
      return null;
    }
  },

  async updateTeamMember(id: string, member: Partial<TeamMember>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(member),
      });
      return await res.json();
    } catch (err) {
      console.error('Error update team member MySQL:', err);
      return null;
    }
  },

  async deleteTeamMember(id: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      console.error('Error delete team member MySQL:', err);
      return null;
    }
  },

  // ==================== 5. INQUIRIES ====================
  async getInquiries(): Promise<ContactInquiry[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /inquiries:', err);
      return null;
    }
  },

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

  async updateInquiryStatus(id: string, status: ContactInquiry['status'], token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (err) {
      console.error('Error update inquiry status MySQL:', err);
      return null;
    }
  },

  async deleteInquiry(id: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      console.error('Error delete inquiry MySQL:', err);
      return null;
    }
  },

  // ==================== 6. MEDIA FILES ====================
  async getMedia(): Promise<MediaFile[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/media`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /media:', err);
      return null;
    }
  },

  async createMedia(media: Omit<MediaFile, 'id'>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(media),
      });
      return await res.json();
    } catch (err) {
      console.error('Error upload media MySQL:', err);
      return null;
    }
  },

  async deleteMedia(id: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/media/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      console.error('Error delete media MySQL:', err);
      return null;
    }
  },

  // ==================== 7. SITE SETTINGS ====================
  async getSettings(): Promise<GeneralSettings | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /settings:', err);
      return null;
    }
  },

  async updateSettings(settings: Partial<GeneralSettings>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(settings),
      });
      return await res.json();
    } catch (err) {
      console.error('Error update settings MySQL:', err);
      return null;
    }
  },

  // ==================== 8. USERS ====================
  async getUsers(): Promise<UserAccount[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Gagal koneksi MySQL API /users:', err);
      return null;
    }
  },

  async createUser(user: Omit<UserAccount, 'id'>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(user),
      });
      return await res.json();
    } catch (err) {
      console.error('Error create user MySQL:', err);
      return null;
    }
  },

  async updateUser(id: string, user: Partial<UserAccount>, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(user),
      });
      return await res.json();
    } catch (err) {
      console.error('Error update user MySQL:', err);
      return null;
    }
  },

  async deleteUser(id: string, token?: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      console.error('Error delete user MySQL:', err);
      return null;
    }
  },

  // ==================== 9. AUTH ====================
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
