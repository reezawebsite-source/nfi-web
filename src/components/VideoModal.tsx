import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Play } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { activeVideoUrl, setActiveVideoUrl } = useApp();

  if (!activeVideoUrl) return null;

  // Convert standard youtube link to embed if applicable
  let embedUrl = activeVideoUrl;
  if (activeVideoUrl.includes('youtube.com/watch?v=')) {
    const videoId = activeVideoUrl.split('v=')[1]?.split('&')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (activeVideoUrl.includes('youtu.be/')) {
    const videoId = activeVideoUrl.split('youtu.be/')[1]?.split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#0F0F11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#141418]">
          <span className="text-xs font-mono font-bold uppercase text-[#C5A059] flex items-center">
            <Play className="w-3.5 h-3.5 mr-2 fill-[#C5A059]" />
            NFI Cinema Player • Official Trailer / Showreel
          </span>
          <button
            onClick={() => setActiveVideoUrl(null)}
            className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black">
          {embedUrl.includes('youtube.com') ? (
            <iframe
              src={embedUrl}
              title="NFI Video Showcase"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-[#0A0A0B]">
              <Play className="w-16 h-16 text-[#C5A059] mb-4 stroke-1" />
              <p className="text-lg font-medium text-white mb-2">Pemutar Video Sinematik NFI</p>
              <p className="text-xs max-w-md text-gray-400 font-mono">
                Menayangkan karya rekaman kustom PT. Nusantara Film Indonesia. Hubungi tim kami untuk sampel tayangan privat.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
