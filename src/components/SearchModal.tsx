import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Film, Newspaper, Layers, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    searchOpen,
    setSearchOpen,
    portfolio = [],
    news = [],
    services = [],
    setSelectedPortfolio,
    setSelectedNews,
    setSelectedService,
    setCurrentPage,
  } = useApp();

  const [query, setQuery] = useState('');

  if (!searchOpen) return null;

  const safePortfolio = Array.isArray(portfolio) ? portfolio : [];
  const safeNews = Array.isArray(news) ? news : [];
  const safeServices = Array.isArray(services) ? services : [];

  const filteredPortfolio = safePortfolio.filter(
    (item) =>
      (item.title || '').toLowerCase().includes(query.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(query.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(query.toLowerCase())
  );

  const filteredNews = safeNews.filter(
    (post) =>
      (post.title || '').toLowerCase().includes(query.toLowerCase()) ||
      (post.summary || '').toLowerCase().includes(query.toLowerCase()) ||
      (post.category || '').toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = safeServices.filter(
    (serv) =>
      (serv.title || '').toLowerCase().includes(query.toLowerCase()) ||
      (serv.shortDescription || '').toLowerCase().includes(query.toLowerCase())
  );

  const handleClose = () => {
    setQuery('');
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl bg-[#121214] border border-white/10 rounded-xl shadow-2xl overflow-hidden text-white">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-white/10 bg-[#18181C]">
          <Search className="w-5 h-5 text-[#C5A059] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari film, berita, iklan, atau layanan PT. Nusantara Film Indonesia..."
            className="w-full bg-transparent text-white text-base focus:outline-none placeholder-gray-500"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="px-3 py-1 bg-white/10 text-xs text-gray-300 font-mono uppercase tracking-wider rounded hover:bg-white/20"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6 divide-y divide-white/5">
          {!query && (
            <div className="text-center py-8 text-gray-500 text-sm">
              Ketik kata kunci seperti <span className="text-[#C5A059] font-medium">"Ken Arok"</span>, <span className="text-[#C5A059] font-medium">"Anie Carera"</span>, <span className="text-[#C5A059] font-medium">"Iklan TVC"</span>, atau <span className="text-[#C5A059] font-medium">"Dokumenter"</span>.
            </div>
          )}

          {query &&
            filteredPortfolio.length === 0 &&
            filteredNews.length === 0 &&
            filteredServices.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p>Tidak ada hasil untuk kata kunci "{query}"</p>
              </div>
            )}

          {/* Portfolio Results */}
          {query && filteredPortfolio.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                <Film className="w-4 h-4 mr-2" />
                Portofolio ({filteredPortfolio.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedPortfolio(item);
                      handleClose();
                    }}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 border border-white/5 cursor-pointer transition-all flex space-x-3 items-center group"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold truncate group-hover:text-[#C5A059]">
                        {item.title}
                      </h5>
                      <p className="text-xs text-gray-400 font-mono">{item.category} • {item.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Results */}
          {query && filteredServices.length > 0 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                <Layers className="w-4 h-4 mr-2" />
                Layanan Kami ({filteredServices.length})
              </div>
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      handleClose();
                    }}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 border border-white/5 cursor-pointer transition-all flex justify-between items-center group"
                  >
                    <div>
                      <h5 className="text-sm font-semibold group-hover:text-[#C5A059]">
                        {service.title}
                      </h5>
                      <p className="text-xs text-gray-400 line-clamp-1">{service.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Results */}
          {query && filteredNews.length > 0 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                <Newspaper className="w-4 h-4 mr-2" />
                Berita & Artikel ({filteredNews.length})
              </div>
              <div className="space-y-2">
                {filteredNews.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setSelectedNews(post);
                      handleClose();
                    }}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 border border-white/5 cursor-pointer transition-all flex space-x-3 items-center group"
                  >
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold truncate group-hover:text-[#C5A059]">
                        {post.title}
                      </h5>
                      <p className="text-xs text-gray-400 line-clamp-1">{post.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
