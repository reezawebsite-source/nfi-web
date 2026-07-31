import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';

export const NewsView: React.FC = () => {
  const { news = [], setSelectedNews } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Penghargaan', 'Edukasi', 'Hukum & HKI', 'Rilis Pers'];

  const safeNews = Array.isArray(news) ? news : [];

  const filteredNews = safeNews.filter((post) => {
    const matchesCat = activeCategory === 'Semua' || post.category === activeCategory;
    const matchesQuery =
      (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.summary || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="py-20 bg-[#0E0E10] border-b border-white/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // CMS BLOG & KABAR SINEMA
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-display uppercase text-white tracking-tight">
            Berita & Artikel
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Wawasan seputar industri film Indonesia, tren video marketing, serta informasi perlindungan hukum karya cipta.
          </p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#121214] border border-white/10 rounded-xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
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

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel berita..."
              className="w-full pl-9 pr-4 py-2 bg-[#18181C] border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedNews(post)}
              className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-[10px] font-mono text-[#C5A059] font-bold uppercase rounded">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-gray-400 font-mono">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 text-[#C5A059] mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>{post.readingTimeMinutes} mnt baca</span>
                  </div>

                  <h3 className="text-base font-bold font-display uppercase text-white group-hover:text-[#C5A059] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold uppercase text-[#C5A059]">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            Tidak ada berita yang ditemukan.
          </div>
        )}
      </section>
    </div>
  );
};
