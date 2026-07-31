import React from 'react';

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-gray-300 text-sm">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest font-bold">
          // DOKUMEN LEGALITAS & KERAHASIAAN
        </span>
        <h1 className="text-3xl font-bold font-display uppercase text-white">
          Kebijakan Privasi (Privacy Policy)
        </h1>
        <p className="text-xs text-gray-400 font-mono">
          Terakhir Diperbarui: 28 Juli 2026 • PT. Nusantara Film Indonesia
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase font-display">1. Pengumpulan Data Informasi</h3>
        <p>
          PT. Nusantara Film Indonesia berkomitmen melindungi privasi data setiap klien, mitra, dan pengunjung situs web. Kami mengumpulkan informasi pribadi yang diserahkan secara sukarela melalui formulir kontak, pendaftaran newsletter, atau komunikasi resmi.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase font-display">2. Penggunaan Informasi</h3>
        <p>
          Informasi yang dikumpulkan digunakan semata-mata untuk merespons permintaan konsultasi proyek, penyusunan draft perjanjian kerja sama, dan pembaruan portofolio.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase font-display">3. Perlindungan Payung Hukum</h3>
        <p>
          Seluruh data yang masuk dilindungi dengan enkripsi standar industri dan diawasi oleh tim advokasi hukum terpadu Handiwiyanto Law Office.
        </p>
      </div>
    </div>
  );
};
