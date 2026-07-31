import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideoUrl, setActiveVideoUrl } = useApp();

  if (!activeVideoUrl) return null;

  // Convert youtube watch URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in">
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        <button
          onClick={() => setActiveVideoUrl(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black text-white rounded-full border border-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <iframe
          src={getEmbedUrl(activeVideoUrl)}
          title="Video Player"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
