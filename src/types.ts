export interface PortfolioItem {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  category: 'Film' | 'Iklan' | 'Video Korporat' | 'Konten Digital' | 'Musik';
  client: string;
  year: number;
  thumbnail: string;
  gallery: string[];
  youtubeUrl: string;
  description: string;
  synopsis?: string;
  director?: string;
  cast?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  featuredImage: string;
  featured: boolean;
  publishedAt: string;
  readingTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceOffering {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  sampleImage: string;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  uuid: string;
  name: string;
  position: string;
  department: string;
  photo: string;
  biography: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
  order: number;
}

export interface ContactInquiry {
  id: string;
  uuid: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  officeTarget: 'Jakarta' | 'Surabaya';
  status: 'Unread' | 'Replied' | 'Archived';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  sizeKb: number;
  format: 'webp' | 'png' | 'jpg' | 'mp4' | 'svg';
  folder: string;
  uploadedAt: string;
  dimensions?: string;
}

export interface ActivityLogItem {
  id: string;
  userName: string;
  userEmail: string;
  action: string;
  module: string;
  ipAddress: string;
  timestamp: string;
}

export interface GeneralSettings {
  websiteName: string;
  tagline: string;
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  companyDescription: string;
  jakartaOfficeAddress: string;
  jakartaOfficePhone: string;
  surabayaOfficeAddress: string;
  surabayaOfficePhone: string;
  contactEmail: string;
  workingHours: string;
  whatsappNumber: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  googleMapsEmbedJakarta: string;
  googleMapsEmbedSurabaya: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  maintenanceMode: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string; // formatted as username@nfi.co.id
  password?: string;
  role: 'Super Admin' | 'Editor' | 'Legal Auditor' | 'Producer';
  avatar: string;
  phone?: string;
  bio?: string;
  lastLogin: string;
}
