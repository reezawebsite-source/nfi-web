import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Public Views
import { HomeView } from './components/PublicViews/HomeView';
import { AboutView } from './components/PublicViews/AboutView';
import { ServicesView } from './components/PublicViews/ServicesView';
import { PortfolioView } from './components/PublicViews/PortfolioView';
import { NewsView } from './components/PublicViews/NewsView';
import { TeamView } from './components/PublicViews/TeamView';
import { ContactView } from './components/PublicViews/ContactView';
import { PrivacyPolicyView } from './components/PublicViews/PrivacyPolicyView';
import { TermsView } from './components/PublicViews/TermsView';
import { NotFoundView } from './components/PublicViews/NotFoundView';

// CMS Layout
import { CMSLayout } from './components/CMS/CMSLayout';

// Modals
import { SearchModal } from './components/SearchModal';
import { PortfolioDetailModal } from './components/Modals/PortfolioDetailModal';
import { NewsDetailModal } from './components/Modals/NewsDetailModal';
import { ServiceDetailModal } from './components/Modals/ServiceDetailModal';
import { VideoPlayerModal } from './components/Modals/VideoPlayerModal';

import { MessageSquare, Shield, Lock } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentPage, isCMSMode, setIsCMSMode, settings } = useApp();

  const renderPublicPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'services':
        return <ServicesView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'news':
        return <NewsView />;
      case 'team':
        return <TeamView />;
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <PrivacyPolicyView />;
      case 'terms':
        return <TermsView />;
      default:
        return <NotFoundView />;
    }
  };

  if (isCMSMode) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white">
        <CMSLayout />
      </div>
    );
  }

  // Formatting WhatsApp number for floating button
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=Halo%20PT.%20Nusantara%20Film%20Indonesia,%20saya%20inisiatif%20diskusi%20proyek%20sinema/layanan...`;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col selection:bg-[#C5A059] selection:text-black">
      <Header />

      <main className="flex-grow">
        {renderPublicPage()}
      </main>

      <Footer />

      {/* Floating WhatsApp Contact Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-2xl flex items-center space-x-2 border border-emerald-400/40 hover:scale-105 transition-all group"
        title="Hubungi WhatsApp Operasional"
      >
        <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline">Diskusi WhatsApp Hotline</span>
      </a>

      {/* Modals & Overlays */}
      <SearchModal />
      <PortfolioDetailModal />
      <NewsDetailModal />
      <ServiceDetailModal />
      <VideoPlayerModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
