import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Film,
  Newspaper,
  Inbox,
  Users,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    portfolio = [],
    news = [],
    inquiries = [],
    setCmsSubTab,
    activityLogs = [],
  } = useApp();

  const safePortfolio = Array.isArray(portfolio) ? portfolio : [];
  const safeNews = Array.isArray(news) ? news : [];
  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  const safeLogs = Array.isArray(activityLogs) ? activityLogs : [];

  const unreadCount = safeInquiries.filter((i) => i.status === 'Unread').length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white">
            Dashboard Utama CMS
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Sistem Manajemen Konten PT. Nusantara Film Indonesia (Live Database State)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono rounded-full flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
            Database Active & Protected
          </span>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-[#121214] border border-white/10 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-mono text-xs">
            <span>TOTAL PORTOFOLIO</span>
            <Film className="w-4 h-4 text-[#C5A059]" />
          </div>
          <span className="text-3xl font-bold font-mono text-white">
            {safePortfolio.length}
          </span>
          <span className="text-[10px] text-gray-500 block font-mono">
            Item Sinema, Iklan & Musik
          </span>
        </div>

        <div className="p-5 bg-[#121214] border border-white/10 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-mono text-xs">
            <span>BERITA & ARTIKEL</span>
            <Newspaper className="w-4 h-4 text-[#C5A059]" />
          </div>
          <span className="text-3xl font-bold font-mono text-white">
            {safeNews.length}
          </span>
          <span className="text-[10px] text-gray-500 block font-mono">
            Post Terpublikasi
          </span>
        </div>

        <div className="p-5 bg-[#121214] border border-white/10 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-mono text-xs">
            <span>PESAN INBOX</span>
            <Inbox className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-white">
              {safeInquiries.length}
            </span>
            {unreadCount > 0 && (
              <span className="text-xs font-bold font-mono text-amber-400">
                ({unreadCount} Belum Dibaca)
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-500 block font-mono">
            Inquiry Formulir Website
          </span>
        </div>

        <div className="p-5 bg-[#121214] border border-white/10 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-mono text-xs">
            <span>STATUS SECURITY</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-bold font-mono text-emerald-400">
            SECURE
          </span>
          <span className="text-[10px] text-gray-500 block font-mono">
            Argon2ID & CSRF Active
          </span>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inbox Preview */}
        <div className="lg:col-span-7 bg-[#121214] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold font-mono uppercase text-white flex items-center">
              <Inbox className="w-4 h-4 text-[#C5A059] mr-2" />
              Pesan Masuk Terbaru
            </h3>
            <button
              onClick={() => setCmsSubTab('inquiries')}
              className="text-xs font-mono text-[#C5A059] hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3">
            {safeInquiries.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                className="p-3 bg-white/5 rounded-lg border border-white/5 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{inq.fullName}</span>
                  <span className="text-[10px] text-[#C5A059] font-mono">
                    {inq.officeTarget} Target
                  </span>
                </div>
                <p className="text-gray-400 line-clamp-1">{inq.subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Spatie Activity Audit Logs Preview */}
        <div className="lg:col-span-5 bg-[#121214] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold font-mono uppercase text-white flex items-center">
              <Activity className="w-4 h-4 text-[#C5A059] mr-2" />
              Spatie Audit Logs
            </h3>
            <button
              onClick={() => setCmsSubTab('security')}
              className="text-xs font-mono text-[#C5A059] hover:underline"
            >
              Log Lengkap
            </button>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {safeLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="p-2.5 bg-black/40 rounded border border-white/5 space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>{log.userName}</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="text-gray-200 text-xs font-sans">{log.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
