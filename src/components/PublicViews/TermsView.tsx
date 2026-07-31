import React from 'react';

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-gray-300 text-sm">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest font-bold">
          // KETENTUAN HUKUM MEDIA
        </span>
        <h1 className="text-3xl font-bold font-display uppercase text-white">
          Syarat & Ketentuan (Terms & Conditions)
        </h1>
        <p className="text-xs text-gray-400 font-mono">
          PT. Nusantara Film Indonesia • Handiwiyanto Law Office Integrated
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase font-display">1. Hak Cipta & Kepemilikan Aset Sinema</h3>
        <p>
          Seluruh teks, gambar, rekaman video teaser, logo, dan materi audio yang ditampilkan di situs web ini milik PT. Nusantara Film Indonesia dan dilindungi oleh Undang-Undang Hak Cipta Republik Indonesia. Penggandaan tanpa izin tertulis dilarang keras.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase font-display">2. Perjanjian Kontrak Produksi</h3>
        <p>
          Ketentuan rinci pengerjaan film, komersial TVC, dan video profil perusahaan akan diatur secara terpisah dalam Kontrak Kerja Sama Resmi yang disahkan oleh legal auditor Handiwiyanto Law Office.
        </p>
      </div>
    </div>
  );
};
