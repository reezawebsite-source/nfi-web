import React from 'react';
import { useApp, PublicPage } from '../context/AppContext';
import { Film, MapPin, Phone, Mail, Instagram, Youtube, Facebook, Linkedin, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsCMSMode, settings } = useApp();

  const navigateTo = (page: PublicPage) => {
    setCurrentPage(page);
    setIsCMSMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-[#E5E5E7] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Heritage (2 Cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="p-1 bg-black/80 rounded border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                <img
                  src="/nfi-logo.svg"
                  alt="NFI Gunungan Logo"
                  className="w-9 h-9 object-contain text-white transition-transform group-hover:scale-105"
                />
              </div>
              <div className="leading-none">
                <span className="block text-lg font-bold tracking-widest text-white uppercase font-display">
                  NUSANTARA
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] font-sans">
                  Film Indonesia
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              PT. Nusantara Film Indonesia (bermula dari GH Production era 1980-an) adalah rumah produksi independen yang menghadirkan karya sinema layar lebar, film iklan, video korporat, promotor musik, dan layanan advokasi hukum media terpadu.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-mono flex items-center">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] mr-1.5" />
                Protected by Handiwiyanto Law Office
              </span>
            </div>

            <div className="flex items-center space-x-4 pt-2 text-gray-400">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-black transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-black transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-black transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] hover:text-black transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] font-mono">
              Navigasi Utama
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#C5A059] transition-colors">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#C5A059] transition-colors">
                  Tentang Kami
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-[#C5A059] transition-colors">
                  Layanan Kami
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('portfolio')} className="hover:text-[#C5A059] transition-colors">
                  Portofolio & Film
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('news')} className="hover:text-[#C5A059] transition-colors">
                  Berita & Artikel
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('team')} className="hover:text-[#C5A059] transition-colors">
                  Tim & Manajemen
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#C5A059] transition-colors">
                  Kontak & Lokasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Summary */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] font-mono">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>Produksi Film Layar Lebar</li>
              <li>Iklan TVC & Digital</li>
              <li>Video Profil Korporat</li>
              <li>Promotor Konser Musik</li>
              <li>Label Rekaman Music</li>
              <li>Advokasi Hukum Media</li>
              <li>Drone & Motion Graphics</li>
            </ul>
          </div>

          {/* Col 4: Office Addresses */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] font-mono">
              Kantor Operasional
            </h4>
            
            <div className="space-y-3 text-xs text-gray-300">
              <div className="border-l-2 border-[#C5A059] pl-3 py-0.5 space-y-1">
                <span className="font-bold text-white uppercase block">Jakarta Office:</span>
                <p className="text-gray-400">{settings.jakartaOfficeAddress}</p>
                <p className="text-[#C5A059]">{settings.jakartaOfficePhone}</p>
              </div>

              <div className="border-l-2 border-zinc-700 pl-3 py-0.5 space-y-1">
                <span className="font-bold text-white uppercase block">Surabaya Office:</span>
                <p className="text-gray-400">{settings.surabayaOfficeAddress}</p>
                <p className="text-[#C5A059]">{settings.surabayaOfficePhone}</p>
              </div>

              <div className="pt-1 text-gray-400 flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white">
                  {settings.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-mono space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} PT. Nusantara Film Indonesia. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-gray-300 transition-colors">
              Kebijakan Privasi
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-gray-300 transition-colors">
              Syarat & Ketentuan
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
