import React from 'react';
import { useApp } from '../../context/AppContext';
import { Film, ArrowLeft } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center space-y-6">
      <div className="max-w-md space-y-6 bg-[#121214] border border-white/10 p-10 rounded-2xl shadow-2xl">
        <div className="w-16 h-16 bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] rounded-full flex items-center justify-center mx-auto">
          <Film className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-bold font-mono text-[#C5A059]">404</span>
          <h2 className="text-2xl font-bold font-display uppercase text-white">
            Adegan Tidak Ditemukan
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Halaman atau adegan film yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('home')}
          className="w-full py-3 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-[#DBC07D] transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali Ke Beranda Set</span>
        </button>
      </div>
    </div>
  );
};
