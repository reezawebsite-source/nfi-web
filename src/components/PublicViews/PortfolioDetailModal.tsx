import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Calendar, User, Film, Tag, Sparkles, CheckCircle2 } from 'lucide-react';

export const PortfolioDetailModal: React.FC = () => {
  const { selectedPortfolio, setSelectedPortfolio, setActiveVideoUrl, setCurrentPage } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedPortfolio) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#121214] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8 text-white">
        {/* Header Close */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setSelectedPortfolio(null)}
            className="p-2 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-md border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black">
          <img
            src={selectedPortfolio.gallery[activeImageIndex] || selectedPortfolio.thumbnail}
            alt={selectedPortfolio.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent" />

          {/* Video Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setActiveVideoUrl(selectedPortfolio.youtubeUrl)}
              className="group px-6 py-3 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-xs rounded-full flex items-center space-x-2 shadow-xl hover:bg-[#DBC07D] transition-transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Tonton Teaser / Video</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#C5A059] text-[10px] font-mono font-bold uppercase tracking-widest rounded-full mb-2">
              {selectedPortfolio.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white uppercase tracking-tight">
              {selectedPortfolio.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Gallery Thumbnails if multiple */}
          {selectedPortfolio.gallery.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {selectedPortfolio.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl border border-white/5 text-xs">
            <div>
              <span className="text-gray-400 block font-mono">KLIEN / BRAND</span>
              <span className="font-bold text-white">{selectedPortfolio.client}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono">TAHUN PRODUKSI</span>
              <span className="font-bold text-[#C5A059]">{selectedPortfolio.year}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono">SUTRADARA</span>
              <span className="font-bold text-white">{selectedPortfolio.director || 'Tim NFI'}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-mono">KATEGORI</span>
              <span className="font-bold text-white">{selectedPortfolio.category}</span>
            </div>
          </div>

          {/* Deskripsi & Sinopsis */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#C5A059] font-mono">
              Ringkasan & Sinopsis
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedPortfolio.description}
            </p>
            {selectedPortfolio.synopsis && (
              <div className="p-4 bg-black/40 border-l-2 border-[#C5A059] text-xs text-gray-300 italic rounded-r-lg">
                "{selectedPortfolio.synopsis}"
              </div>
            )}
          </div>

          {/* Cast / Credits if available */}
          {selectedPortfolio.cast && selectedPortfolio.cast.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 font-mono">
                Pemeran & Pengisi Suara / Tim
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPortfolio.cast.map((actor, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-white/5"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-400">
              Tertarik membuat karya sinematik serupa untuk brand Anda?
            </span>
            <button
              onClick={() => {
                setSelectedPortfolio(null);
                setCurrentPage('contact');
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#C5A059] text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-[#DBC07D] transition-colors"
            >
              Mulai Diskusi Proyek
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
