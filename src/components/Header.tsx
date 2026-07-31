import React, { useState } from 'react';
import { useApp, PublicPage } from '../context/AppContext';
import { Search, Film, Shield, Lock, Menu, X, Globe, PhoneCall } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    isCMSMode,
    setIsCMSMode,
    isAdminLoggedIn,
    language,
    setLanguage,
    setSearchOpen,
    settings,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PublicPage }[] = [
    { label: 'Beranda', page: 'home' },
    { label: 'Tentang Kami', page: 'about' },
    { label: 'Layanan', page: 'services' },
    { label: 'Portofolio', page: 'portfolio' },
    { label: 'Berita', page: 'news' },
    { label: 'Tim Kami', page: 'team' },
    { label: 'Kontak', page: 'contact' },
  ];

  const handleNavClick = (page: PublicPage) => {
    setCurrentPage(page);
    setIsCMSMode(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 transition-all">
      {/* Top Utility Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-[#050505] text-[11px] border-b border-white/5 text-gray-400 font-mono">
        <div className="flex items-center space-x-6">
          <span className="flex items-center text-[#C5A059]">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse mr-2"></span>
            PRODUKSI SINEMA & ADVOKASI MEDIA HUKUM TERPADU
          </span>
          <span>|</span>
          <a
            href={`tel:${settings.jakartaOfficePhone.split('/')[0].trim()}`}
            className="hover:text-white transition-colors"
          >
            JKT: {settings.jakartaOfficePhone.split('/')[0].trim()}
          </a>
          <span>|</span>
          <a
            href={`tel:${settings.surabayaOfficePhone}`}
            className="hover:text-white transition-colors"
          >
            SBY: {settings.surabayaOfficePhone}
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'ID' ? 'EN' : 'ID')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <Globe className="w-3 h-3 text-[#C5A059]" />
            <span>{language === 'ID' ? 'ID (Indonesia)' : 'EN (English)'}</span>
          </button>
          <span>|</span>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center space-x-1 hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <Search className="w-3 h-3" />
            <span>Cari Portofolio / Berita</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="p-1 bg-black/60 rounded border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors shadow-md">
            <img
              src="/nfi-logo.svg"
              alt="NFI Gunungan Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain text-white transition-transform group-hover:scale-105"
            />
          </div>
          <div className="leading-none">
            <span className="block text-base sm:text-lg font-bold tracking-widest text-white uppercase font-display">
              NUSANTARA
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#C5A059] font-sans font-medium">
              Film Indonesia
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[12px] font-semibold tracking-widest uppercase">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`transition-colors py-1 cursor-pointer relative ${
                currentPage === item.page && !isCMSMode
                  ? 'text-[#C5A059] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C5A059]'
                  : 'text-gray-300 hover:text-[#C5A059]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA / Admin CMS Toggle */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            title="Cari"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsCMSMode(!isCMSMode);
              if (isCMSMode) setCurrentPage('home');
            }}
            className={`px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider rounded border transition-all flex items-center space-x-1.5 ${
              isCMSMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'border-white/20 text-white hover:bg-white/10 hover:border-[#C5A059]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isCMSMode ? 'Exit CMS' : 'Admin CMS'}</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 py-2 bg-[#C5A059] text-black text-[11px] font-bold uppercase tracking-widest hover:bg-[#DBC07D] transition-all rounded-sm shadow-sm"
          >
            Konsultasi Proyek
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-gray-300"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-200 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C5A059]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0B] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left text-sm font-semibold tracking-wider uppercase py-2 border-b border-white/5 ${
                  currentPage === item.page && !isCMSMode
                    ? 'text-[#C5A059]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col space-y-3">
            <button
              onClick={() => {
                setIsCMSMode(!isCMSMode);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-zinc-800 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isCMSMode ? 'Kembali ke Website' : 'Masuk Admin CMS'}</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 bg-[#C5A059] text-black text-xs font-bold uppercase tracking-widest rounded text-center"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
