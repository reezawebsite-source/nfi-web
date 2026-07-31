import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Film,
  Newspaper,
  Layers,
  Users,
  Inbox,
  Image,
  Settings,
  ShieldCheck,
  LogOut,
  Lock,
  Globe,
  User,
  Activity,
  CheckCircle,
} from 'lucide-react';

// Sub components
import { DashboardOverview } from './DashboardOverview';
import { PortfolioCMS } from './PortfolioCMS';
import { NewsCMS } from './NewsCMS';
import { ServicesCMS } from './ServicesCMS';
import { TeamCMS } from './TeamCMS';
import { InquiriesCMS } from './InquiriesCMS';
import { MediaManagerCMS } from './MediaManagerCMS';
import { SettingsCMS } from './SettingsCMS';
import { UserSecurityCMS } from './UserSecurityCMS';
import { UserProfileCMS } from './UserProfileCMS';

export const CMSLayout: React.FC = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    cmsSubTab,
    setCmsSubTab,
    currentUser,
    setIsCMSMode,
    setCurrentPage,
  } = useApp();

  // Login form state (Empty by default for production security)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(loginEmail, loginPassword);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  // If not logged in, show Secure Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#0A0A0B]">
        <div className="w-full max-w-md bg-[#121214] border border-white/15 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-black/80 border border-[#C5A059]/40 rounded-2xl p-2 flex items-center justify-center mx-auto shadow-xl">
              <img src="/nfi-logo.svg" alt="NFI Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold font-display uppercase text-white tracking-wider">
              Portal Akses Terintegrasi NFI
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              PT. Nusantara Film Indonesia — Internal Corporate Portal
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-500/20 border border-red-500/40 rounded text-red-200 text-xs text-center font-mono">
              Kredensial tidak valid. Silakan periksa email @nfi.co.id & kata sandi terdaftar.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-gray-400 mb-1">Email Resmi Staff (@nfi.co.id)</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="nama@nfi.co.id"
                className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059] font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Kata Sandi Akun</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase tracking-widest rounded transition-colors shadow-lg cursor-pointer"
            >
              Autentikasi & Masuk CMS
            </button>
          </form>

          <div className="pt-3 border-t border-white/10 text-center space-y-2">
            <span className="text-[10px] text-gray-500 font-mono block">
              Sistem Akses Terenkripsi SSL/TLS • Domain Terverifikasi PT. Nusantara Film Indonesia
            </span>
            <button
              onClick={() => {
                setIsCMSMode(false);
                setCurrentPage('home');
              }}
              className="text-xs text-gray-400 hover:text-[#C5A059] font-mono underline transition-colors cursor-pointer"
            >
              &larr; Kembali ke Website Utama
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Navigation Tabs
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Profil Saya', icon: <User className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Kelola Portofolio', icon: <Film className="w-4 h-4" /> },
    { id: 'news', label: 'Kelola Berita & CMS', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'services', label: 'Kelola Layanan', icon: <Layers className="w-4 h-4" /> },
    { id: 'team', label: 'Kelola Tim & Direksi', icon: <Users className="w-4 h-4" /> },
    { id: 'inquiries', label: 'Pesan Masuk (Inbox)', icon: <Inbox className="w-4 h-4" /> },
    { id: 'media', label: 'Media Manager (WebP)', icon: <Image className="w-4 h-4" /> },
    { id: 'settings', label: 'Pengaturan & SEO', icon: <Settings className="w-4 h-4" /> },
    { id: 'security', label: 'Role & Activity Logs', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#080809] text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0E0E10] border-r border-white/10 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-1 bg-black/80 rounded border border-[#C5A059]/40">
                <img src="/nfi-logo.svg" alt="NFI Logo" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <span className="block text-sm font-bold font-display uppercase tracking-widest text-[#C5A059]">
                  NFI CMS CONSOLE
                </span>
                <span className="text-[10px] text-gray-500 font-mono">v12.4 Laravel Dynamic</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCMSMode(false);
                setCurrentPage('home');
              }}
              className="p-1 text-gray-400 hover:text-white"
              title="Lihat Website Public"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>

          {/* User Badge */}
          <button
            type="button"
            onClick={() => setCmsSubTab('profile')}
            className="w-full p-4 bg-white/5 hover:bg-white/10 border-b border-white/5 flex items-center space-x-3 text-left transition-colors cursor-pointer group"
            title="Klik untuk Kelola Profil Saya"
          >
            <img
              src={currentUser?.avatar}
              alt="Admin Avatar"
              className="w-9 h-9 rounded-full object-cover border border-[#C5A059] flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold truncate text-white group-hover:text-[#C5A059] transition-colors">
                {currentUser?.name}
              </span>
              <span className="block text-[10px] text-[#C5A059] font-mono font-bold truncate">
                {currentUser?.email}
              </span>
              <span className="block text-[9px] text-gray-400 font-mono">
                Role: {currentUser?.role}
              </span>
            </div>
          </button>

          {/* Menu Items */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCmsSubTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  cmsSubTab === item.id
                    ? 'bg-[#C5A059] text-black font-bold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={logoutAdmin}
            className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-mono font-bold rounded flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main CMS View Body */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {cmsSubTab === 'dashboard' && <DashboardOverview />}
        {cmsSubTab === 'profile' && <UserProfileCMS />}
        {cmsSubTab === 'portfolio' && <PortfolioCMS />}
        {cmsSubTab === 'news' && <NewsCMS />}
        {cmsSubTab === 'services' && <ServicesCMS />}
        {cmsSubTab === 'team' && <TeamCMS />}
        {cmsSubTab === 'inquiries' && <InquiriesCMS />}
        {cmsSubTab === 'media' && <MediaManagerCMS />}
        {cmsSubTab === 'settings' && <SettingsCMS />}
        {cmsSubTab === 'security' && <UserSecurityCMS />}
      </main>
    </div>
  );
};
