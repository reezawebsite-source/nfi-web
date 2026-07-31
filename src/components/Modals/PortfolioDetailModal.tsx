import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Calendar, Film, User, Tag, ArrowRight } from 'lucide-react';

export const PortfolioDetailModal: React.FC = () => {
  const { selectedPortfolio, setSelectedPortfolio, setActiveVideoUrl } = useApp();

  if (!selectedPortfolio) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#121214] border border-white/15 rounded-2xl overflow-hidden my-8 shadow-2xl text-white space-y-6">
        {/* Header Bar */}
        <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden bg-black">
          <img
            src={selectedPortfolio.thumbnail}
            alt={selectedPortfolio.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-black/40 to-transparent" />

          <button
            onClick={() => setSelectedPortfolio(null)}
            className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black text-white rounded-full border border-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveVideoUrl(selectedPortfolio.youtubeUrl)}
            className="absolute inset-0 m-auto w-16 h-16 bg-[#C5A059] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          >
            <Play className="w-8 h-8 fill-black ml-1" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 space-y-1">
            <span className="px-3 py-1 bg-[#C5A059] text-black font-mono text-[10px] font-bold uppercase rounded-full">
              {selectedPortfolio.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display uppercase tracking-tight text-white">
              {selectedPortfolio.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#18181C] border border-white/10 rounded-xl text-xs font-mono">
            <div>
              <span className="text-gray-500 block">KLIEN / BRAND</span>
              <span className="text-white font-bold">{selectedPortfolio.client}</span>
            </div>
            <div>
              <span className="text-gray-500 block">TAHUN RILIS</span>
              <span className="text-[#C5A059] font-bold">{selectedPortfolio.year}</span>
            </div>
            <div>
              <span className="text-gray-500 block">SUTRADARA</span>
              <span className="text-white font-bold">{selectedPortfolio.director || 'Tim NFI'}</span>
            </div>
            <div>
              <span className="text-gray-500 block">DOKUMEN HAKI</span>
              <span className="text-emerald-400 font-bold">Terdaftar Legal</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-mono text-[#C5A059] uppercase font-bold">
              Deskripsi Proyek Sinema
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedPortfolio.description}
            </p>
            {selectedPortfolio.synopsis && (
              <p className="text-gray-400 text-xs leading-relaxed italic pt-2 border-t border-white/10">
                "{selectedPortfolio.synopsis}"
              </p>
            )}
          </div>

          {/* Gallery Stills */}
          {selectedPortfolio.gallery && selectedPortfolio.gallery.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-sm font-mono text-[#C5A059] uppercase font-bold">
                Galeri Production Stills (4K WebP)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedPortfolio.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="aspect-video rounded-lg overflow-hidden border border-white/10"
                  >
                    <img
                      src={imgUrl}
                      alt={`Still ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => setSelectedPortfolio(null)}
              className="px-6 py-2.5 bg-white/10 text-white font-mono text-xs uppercase rounded hover:bg-white/20"
            >
              Tutup Overlay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
