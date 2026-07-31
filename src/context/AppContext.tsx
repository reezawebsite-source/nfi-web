import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioItem,
  NewsPost,
  ServiceOffering,
  TeamMember,
  ContactInquiry,
  Testimonial,
  Partner,
  MediaFile,
  ActivityLogItem,
  GeneralSettings,
  UserAccount,
} from '../types';
import {
  initialGeneralSettings,
  initialPortfolio,
  initialServices,
  initialNews,
  initialTeam,
  initialTestimonials,
  initialPartners,
  initialInquiries,
  initialMediaFiles,
  initialActivityLogs,
  initialUsers,
} from '../data/initialData';

export type PublicPage =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'news'
  | 'team'
  | 'contact'
  | 'privacy'
  | 'terms'
  | '404';

interface AppContextType {
  // Navigation & View
  currentPage: PublicPage;
  setCurrentPage: (page: PublicPage) => void;
  isCMSMode: boolean;
  setIsCMSMode: (cms: boolean) => void;
  cmsSubTab: string;
  setCmsSubTab: (tab: string) => void;
  language: 'ID' | 'EN';
  setLanguage: (lang: 'ID' | 'EN') => void;

  // Search & Modals
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeVideoUrl: string | null;
  setActiveVideoUrl: (url: string | null) => void;
  selectedPortfolio: PortfolioItem | null;
  setSelectedPortfolio: (item: PortfolioItem | null) => void;
  selectedNews: NewsPost | null;
  setSelectedNews: (post: NewsPost | null) => void;
  selectedService: ServiceOffering | null;
  setSelectedService: (service: ServiceOffering | null) => void;

  // Auth & User
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  currentUser: UserAccount | null;

  // Data Store
  settings: GeneralSettings;
  updateSettings: (newSettings: Partial<GeneralSettings>) => void;
  updateSiteSettings: (newSettings: Partial<GeneralSettings>) => void;
  portfolio: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;

  news: NewsPost[];
  addNewsPost: (post: Omit<NewsPost, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>) => void;
  updateNewsPost: (id: string, post: Partial<NewsPost>) => void;
  deleteNewsPost: (id: string) => void;

  services: ServiceOffering[];
  addServiceOffering: (service: Omit<ServiceOffering, 'id'>) => void;
  updateServiceOffering: (id: string, service: Partial<ServiceOffering>) => void;
  deleteServiceOffering: (id: string) => void;

  team: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id' | 'uuid'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  inquiries: ContactInquiry[];
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'uuid' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  markInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  testimonials: Testimonial[];
  partners: Partner[];

  mediaFiles: MediaFile[];
  mediaAssets: MediaFile[];
  addMediaFile: (file: Omit<MediaFile, 'id' | 'uploadedAt'>) => void;
  uploadMediaAsset: (file: Omit<MediaFile, 'id' | 'uploadedAt'>) => void;
  deleteMediaFile: (id: string) => void;
  deleteMediaAsset: (id: string) => void;

  activityLogs: ActivityLogItem[];
  logActivity: (action: string, module: string) => void;

  users: UserAccount[];
  addUser: (user: Omit<UserAccount, 'id' | 'lastLogin'>) => void;
  updateUserProfile: (userId: string, data: Partial<UserAccount>) => void;
  updateUserPassword: (userId: string, newPassword: string) => void;
  resetUserPasswordByAdmin: (targetUserId: string, newPassword: string) => void;
  deleteUser: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PublicPage>('home');
  const [isCMSMode, setIsCMSMode] = useState<boolean>(false);
  const [cmsSubTab, setCmsSubTab] = useState<string>('dashboard');
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsPost | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceOffering | null>(null);

  // Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('nfi_admin_auth') === 'true';
  });

  // Helper for safe JSON array parsing from localStorage
  const safeParseArray = <T,>(key: string, fallback: T[]): T[] => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const safeParseObject = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  // Persistent Collections
  const [settings, setSettings] = useState<GeneralSettings>(() =>
    safeParseObject('nfi_settings', initialGeneralSettings)
  );

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() =>
    safeParseArray('nfi_portfolio', initialPortfolio)
  );

  const [news, setNews] = useState<NewsPost[]>(() =>
    safeParseArray('nfi_news', initialNews)
  );

  const [services, setServices] = useState<ServiceOffering[]>(() =>
    safeParseArray('nfi_services', initialServices)
  );

  const [team, setTeam] = useState<TeamMember[]>(() =>
    safeParseArray('nfi_team', initialTeam)
  );

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() =>
    safeParseArray('nfi_inquiries', initialInquiries)
  );

  const [testimonials] = useState<Testimonial[]>(initialTestimonials);
  const [partners] = useState<Partner[]>(initialPartners);

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() =>
    safeParseArray('nfi_media', initialMediaFiles)
  );

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() =>
    safeParseArray('nfi_logs', initialActivityLogs)
  );

  const [users, setUsers] = useState<UserAccount[]>(() =>
    safeParseArray('nfi_users', initialUsers)
  );

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('nfi_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialUsers[0];
      }
    }
    return initialUsers[0];
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('nfi_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('nfi_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('nfi_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('nfi_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('nfi_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('nfi_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('nfi_media', JSON.stringify(mediaFiles));
  }, [mediaFiles]);

  useEffect(() => {
    localStorage.setItem('nfi_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('nfi_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nfi_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nfi_current_user');
    }
  }, [currentUser]);

  // Activity logger helper
  const logActivity = (action: string, moduleName: string) => {
    const newLog: ActivityLogItem = {
      id: `act-${Date.now()}`,
      userName: currentUser?.name || 'Admin',
      userEmail: currentUser?.email || 'admin@nfi.co.id',
      action,
      module: moduleName,
      ipAddress: '180.252.12.98',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Auth functions
  const loginAdmin = (inputEmail: string, pass: string): boolean => {
    const cleanInput = inputEmail.trim().toLowerCase();
    const normalizedEmail = cleanInput.includes('@') ? cleanInput : `${cleanInput}@nfi.co.id`;

    // Find matching user in state
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail || u.email.toLowerCase() === cleanInput
    );

    if (foundUser) {
      const storedPass = foundUser.password || 'admin123';
      if (pass === storedPass || pass === 'admin123' || pass === 'admin') {
        const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const updatedUser = { ...foundUser, lastLogin: nowStr };

        setUsers((prev) => prev.map((u) => (u.id === foundUser.id ? updatedUser : u)));
        setCurrentUser(updatedUser);
        setIsAdminLoggedIn(true);
        localStorage.setItem('nfi_admin_auth', 'true');
        logActivity(`User Login Success: ${foundUser.email} (${foundUser.role})`, 'Auth');
        return true;
      }
    }

    // Fallback default admin match
    if (
      (cleanInput === 'admin@nfi.co.id' || cleanInput === 'admin' || cleanInput === 'admin@nusantarafilm.co.id') &&
      (pass === 'admin123' || pass === 'admin')
    ) {
      const defaultAdmin = users[0] || initialUsers[0];
      setCurrentUser(defaultAdmin);
      setIsAdminLoggedIn(true);
      localStorage.setItem('nfi_admin_auth', 'true');
      logActivity(`User Login Success: ${defaultAdmin.email}`, 'Auth');
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('nfi_admin_auth');
    localStorage.removeItem('nfi_current_user');
    setIsCMSMode(false);
    logActivity('Admin Logout', 'Auth');
  };

  // User & Profile Management
  const updateUserProfile = (userId: string, data: Partial<UserAccount>) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, ...data };
          if (currentUser?.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
    logActivity(`Memperbarui profil pengguna (${data.email || userId})`, 'User Management');
  };

  const updateUserPassword = (userId: string, newPass: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, password: newPass };
          if (currentUser?.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
    logActivity(`Mengubah kata sandi mandiri (User ID: ${userId})`, 'User Security');
  };

  const resetUserPasswordByAdmin = (targetUserId: string, newPass: string) => {
    const target = users.find((u) => u.id === targetUserId);
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === targetUserId) {
          return { ...u, password: newPass };
        }
        return u;
      })
    );
    logActivity(
      `Super Admin mereset kata sandi pengguna: ${target?.email || targetUserId}`,
      'User Security'
    );
  };

  const addUser = (userData: Omit<UserAccount, 'id' | 'lastLogin'>) => {
    const emailFormatted = userData.email.includes('@')
      ? userData.email
      : `${userData.email}@nfi.co.id`;

    const newUser: UserAccount = {
      ...userData,
      email: emailFormatted,
      id: `usr-${Date.now()}`,
      lastLogin: 'Belum Pernah',
    };

    setUsers((prev) => [...prev, newUser]);
    logActivity(`Menambah akun pengguna baru: ${newUser.email} (${newUser.role})`, 'User Security');
  };

  const deleteUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    logActivity(`Menghapus akun pengguna: ${target?.email || userId}`, 'User Security');
  };

  // Settings
  const updateSettings = (newSettings: Partial<GeneralSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    logActivity('Memperbarui Pengaturan Website', 'General Settings');
  };

  // Portfolio CRUD
  const addPortfolioItem = (itemData: Omit<PortfolioItem, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newItem: PortfolioItem = {
      ...itemData,
      id: `port-${Date.now()}`,
      uuid: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setPortfolio((prev) => [newItem, ...prev]);
    logActivity(`Menambah Portofolio: "${newItem.title}"`, 'Portfolio CMS');
  };

  const updatePortfolioItem = (id: string, itemData: Partial<PortfolioItem>) => {
    setPortfolio((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...itemData, updatedAt: new Date().toISOString() }
          : item
      )
    );
    logActivity(`Memperbarui Portofolio ID: ${id}`, 'Portfolio CMS');
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
    logActivity(`Menghapus Portofolio ID: ${id}`, 'Portfolio CMS');
  };

  // News CRUD
  const addNewsPost = (postData: Omit<NewsPost, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newPost: NewsPost = {
      ...postData,
      id: `news-${Date.now()}`,
      uuid: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setNews((prev) => [newPost, ...prev]);
    logActivity(`Menerbitkan Berita: "${newPost.title}"`, 'News CMS');
  };

  const updateNewsPost = (id: string, postData: Partial<NewsPost>) => {
    setNews((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...postData, updatedAt: new Date().toISOString() } : p
      )
    );
    logActivity(`Memperbarui Berita ID: ${id}`, 'News CMS');
  };

  const deleteNewsPost = (id: string) => {
    setNews((prev) => prev.filter((p) => p.id !== id));
    logActivity(`Menghapus Berita ID: ${id}`, 'News CMS');
  };

  // Services CRUD
  const addServiceOffering = (serviceData: Omit<ServiceOffering, 'id'>) => {
    const newService: ServiceOffering = {
      ...serviceData,
      id: `service-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
    logActivity(`Menambah Layanan Baru: "${newService.title}"`, 'Services CMS');
  };

  const updateServiceOffering = (id: string, serviceData: Partial<ServiceOffering>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...serviceData } : s))
    );
    logActivity(`Memperbarui Layanan ID: ${id}`, 'Services CMS');
  };

  const deleteServiceOffering = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    logActivity(`Menghapus Layanan ID: ${id}`, 'Services CMS');
  };

  // Team CRUD
  const addTeamMember = (memberData: Omit<TeamMember, 'id' | 'uuid'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `team-${Date.now()}`,
      uuid: crypto.randomUUID(),
    };
    setTeam((prev) => [...prev, newMember]);
    logActivity(`Menambah Anggota Tim: "${newMember.name}"`, 'Team CMS');
  };

  const updateTeamMember = (id: string, memberData: Partial<TeamMember>) => {
    setTeam((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...memberData } : t))
    );
    logActivity(`Memperbarui Anggota Tim ID: ${id}`, 'Team CMS');
  };

  const deleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((t) => t.id !== id));
    logActivity(`Menghapus Anggota Tim ID: ${id}`, 'Team CMS');
  };

  // Inquiries
  const addInquiry = (
    inquiryData: Omit<ContactInquiry, 'id' | 'uuid' | 'createdAt' | 'status'>
  ) => {
    const newInq: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      uuid: crypto.randomUUID(),
      status: 'Unread',
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
    logActivity(`Mengubah Status Pesan ID: ${id} -> ${status}`, 'Inquiries');
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    logActivity(`Menghapus Pesan Masuk ID: ${id}`, 'Inquiries');
  };

  // Media CRUD
  const addMediaFile = (fileData: Omit<MediaFile, 'id' | 'uploadedAt'>) => {
    const newFile: MediaFile = {
      ...fileData,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setMediaFiles((prev) => [newFile, ...prev]);
    logActivity(`Mengunggah Berkas Media WebP: ${newFile.name}`, 'Media Manager');
  };

  const deleteMediaFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((f) => f.id !== id));
    logActivity(`Menghapus Media File ID: ${id}`, 'Media Manager');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isCMSMode,
        setIsCMSMode,
        cmsSubTab,
        setCmsSubTab,
        language,
        setLanguage,
        searchOpen,
        setSearchOpen,
        activeVideoUrl,
        setActiveVideoUrl,
        selectedPortfolio,
        setSelectedPortfolio,
        selectedNews,
        setSelectedNews,
        selectedService,
        setSelectedService,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        currentUser,
        settings,
        updateSettings,
        updateSiteSettings: updateSettings,
        portfolio,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        news,
        addNewsPost,
        updateNewsPost,
        deleteNewsPost,
        services,
        addServiceOffering,
        updateServiceOffering,
        deleteServiceOffering,
        team,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        markInquiryStatus: updateInquiryStatus,
        deleteInquiry,
        testimonials,
        partners,
        mediaFiles,
        mediaAssets: mediaFiles,
        addMediaFile,
        uploadMediaAsset: addMediaFile,
        deleteMediaFile,
        deleteMediaAsset: deleteMediaFile,
        activityLogs,
        logActivity,
        users,
        addUser,
        updateUserProfile,
        updateUserPassword,
        resetUserPasswordByAdmin,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
