import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, User, Share2, Tag, ArrowLeft } from 'lucide-react';

export const NewsDetailModal: React.FC = () => {
  const { selectedNews, setSelectedNews } = useApp();

  if (!selectedNews) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#121214] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8 text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#18181C]">
          <span className="text-xs font-mono font-bold uppercase text-[#C5A059]">
            {selectedNews.category} • PT. Nusantara Film Indonesia News
          </span>
          <button
            onClick={() => setSelectedNews(null)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase leading-tight text-white">
            {selectedNews.title}
          </h1>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-y border-white/10 py-3 font-mono">
            <div className="flex items-center space-x-2">
              {selectedNews.authorAvatar && (
                <img
                  src={selectedNews.authorAvatar}
                  alt={selectedNews.author}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span>{selectedNews.author} ({selectedNews.authorRole || 'Penulis'})</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{new Date(selectedNews.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{selectedNews.readingTimeMinutes} Menit Baca</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
            <img
              src={selectedNews.featuredImage}
              alt={selectedNews.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* HTML Body */}
          <div
            className="prose prose-invert prose-amber max-w-none text-gray-300 text-sm leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: selectedNews.content }}
          />

          {/* Article Tags */}
          {selectedNews.tags && selectedNews.tags.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-xs font-mono text-gray-400 uppercase">Tags Artikel:</span>
              <div className="flex flex-wrap gap-2">
                {selectedNews.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 text-[#C5A059] text-xs font-mono rounded-md border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share & Close Bar */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10 text-xs">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: selectedNews.title,
                    url: window.location.href,
                  });
                } else {
                  alert('Tautan artikel telah disalin ke clipboard!');
                }
              }}
              className="flex items-center space-x-2 text-[#C5A059] hover:underline cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Bagikan Artikel Ini</span>
            </button>

            <button
              onClick={() => setSelectedNews(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono uppercase text-xs rounded transition-colors"
            >
              Tutup Artikel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
