import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';

export const NewsDetailModal: React.FC = () => {
  const { selectedNews, setSelectedNews } = useApp();

  if (!selectedNews) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#121214] border border-white/15 rounded-2xl overflow-hidden my-8 shadow-2xl text-white space-y-6">
        <div className="relative aspect-video overflow-hidden bg-black">
          <img
            src={selectedNews.featuredImage}
            alt={selectedNews.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/40" />

          <button
            onClick={() => setSelectedNews(null)}
            className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black text-white rounded-full border border-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute bottom-4 left-6 px-3 py-1 bg-[#C5A059] text-black font-mono text-[10px] font-bold uppercase rounded">
            {selectedNews.category}
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059] mr-1" />
                {new Date(selectedNews.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center">
                <User className="w-3.5 h-3.5 text-[#C5A059] mr-1" />
                {selectedNews.author}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display uppercase leading-tight text-white">
              {selectedNews.title}
            </h1>
          </div>

          <div
            className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: selectedNews.content }}
          />

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-[#C5A059]" />
              <div className="flex flex-wrap gap-1">
                {selectedNews.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-white/5 text-[10px] font-mono text-gray-400 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedNews(null)}
              className="px-6 py-2 bg-[#C5A059] text-black font-bold uppercase font-mono text-xs rounded hover:bg-[#DBC07D]"
            >
              Selesai Membaca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
