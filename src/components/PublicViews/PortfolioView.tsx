import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Search, Film, Filter } from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { portfolio = [], setSelectedPortfolio, setActiveVideoUrl } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterCategories = ['Semua', 'Film', 'Iklan', 'Video Korporat', 'Musik', 'Konten Digital'];

  const safePortfolio = Array.isArray(portfolio) ? portfolio : [];

  const filteredPortfolio = safePortfolio.filter((item) => {
    const matchesCat = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesQuery =
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.client || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="py-20 bg-[#0E0E10] border-b border-white/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // GALERI PORTOFOLIO & REKAMAN
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-display uppercase text-white tracking-tight">
            Karya Sinema & Produksi
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Koleksi film layar lebar, iklan komersial, video korporat, dokumenter, dan rekaman album musik ciptaan PT. Nusantara Film Indonesia.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#121214] border border-white/10 rounded-xl">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#C5A059] text-black shadow-md'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul film, klien..."
              className="w-full pl-9 pr-4 py-2 bg-[#18181C] border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPortfolio(item)}
              className="group relative bg-[#121214] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-[#C5A059] transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-[#C5A059] text-[10px] font-mono uppercase font-bold rounded-full border border-white/10">
                  {item.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVideoUrl(item.youtubeUrl);
                  }}
                  className="absolute bottom-3 right-3 p-2.5 bg-[#C5A059] text-black rounded-full shadow-lg opacity-90 hover:scale-110 transition-transform"
                >
                  <Play className="w-4 h-4 fill-black" />
                </button>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>{item.client}</span>
                  <span className="text-[#C5A059]">{item.year}</span>
                </div>
                <h3 className="text-base font-bold font-display uppercase text-white group-hover:text-[#C5A059] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredPortfolio.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            Tidak ada item portofolio yang cocok dengan kriteria pencarian.
          </div>
        )}
      </section>
    </div>
  );
};
