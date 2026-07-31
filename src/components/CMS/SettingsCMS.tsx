import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Globe, Phone, Mail, MapPin, Search } from 'lucide-react';

export const SettingsCMS: React.FC = () => {
  const { settings, updateSiteSettings, updateSettings } = useApp();
  const updater = updateSiteSettings || updateSettings;
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updater) updater(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white">
            Pengaturan Situs & Metadata SEO
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Konfigurasi identitas PT. Nusantara Film Indonesia, kontak kantor & Google Maps embed.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono rounded text-center">
          Pengaturan situs & SEO berhasil disimpan ke database!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
        {/* Homepage Hero Banner Content */}
        <div className="p-6 bg-[#121214] border border-[#C5A059]/30 rounded-xl space-y-4 shadow-xl">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#C5A059] rounded-full animate-pulse" />
            <h3 className="text-sm font-bold font-display uppercase text-[#C5A059]">
              Konten Hero Banner Beranda (Judul Besar & Deskripsi Homepage)
            </h3>
          </div>
          <p className="text-[11px] text-gray-400 font-sans">
            Ubah judul besar, label badge, dan paragraf utama yang tampil di bagian paling atas halaman Beranda depan.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Badge Tag Label (Teks Atas Hero)</label>
              <input
                type="text"
                value={formData.heroBadge || ''}
                onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                placeholder="HERITAGE PRODUKSI SEJAK ERA 1980-AN"
                className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Judul Utama Besar Beranda (Hero Title)</label>
              <textarea
                rows={2}
                value={formData.heroTitle || ''}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                placeholder="Mewujudkan Cerita Menjadi Karya Visual Berkualitas."
                className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white font-display text-sm focus:border-[#C5A059] outline-none"
              />
              <span className="text-[10px] text-gray-500">Gunakan Enter untuk berpindah baris pada judul.</span>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Deskripsi Paragraf Beranda (Hero Subtitle)</label>
              <textarea
                rows={3}
                value={formData.heroDescription || ''}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                placeholder="PT. Nusantara Film Indonesia (bermula dari GH Production) menghadirkan standar sinematografi kelas dunia..."
                className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Company Identity */}
        <div className="p-6 bg-[#121214] border border-white/10 rounded-xl space-y-4">
          <h3 className="text-sm font-bold font-display uppercase text-[#C5A059]">
            Identitas Perusahaan & Meta SEO
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Nama Situs / Perusahaan</label>
              <input
                type="text"
                value={formData.websiteName || ''}
                onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })}
                className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Tagline Slogan</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Meta Description SEO Default</label>
            <textarea
              rows={2}
              value={formData.seoDefaultDescription || ''}
              onChange={(e) => setFormData({ ...formData, seoDefaultDescription: e.target.value })}
              className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
            />
          </div>
        </div>

        {/* Office Locations */}
        <div className="p-6 bg-[#121214] border border-white/10 rounded-xl space-y-4">
          <h3 className="text-sm font-bold font-display uppercase text-[#C5A059]">
            Alamat Kantor & Telepon Hotline
          </h3>

          <div className="space-y-3">
            <span className="text-xs font-bold text-white block uppercase">KANTOR JAKARTA</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1">Alamat Jakarta</label>
                <input
                  type="text"
                  value={formData.jakartaOfficeAddress}
                  onChange={(e) => setFormData({ ...formData, jakartaOfficeAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Telepon Jakarta</label>
                <input
                  type="text"
                  value={formData.jakartaOfficePhone}
                  onChange={(e) => setFormData({ ...formData, jakartaOfficePhone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/5">
            <span className="text-xs font-bold text-white block uppercase">KANTOR SURABAYA</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1">Alamat Surabaya</label>
                <input
                  type="text"
                  value={formData.surabayaOfficeAddress}
                  onChange={(e) => setFormData({ ...formData, surabayaOfficeAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Telepon Surabaya</label>
                <input
                  type="text"
                  value={formData.surabayaOfficePhone}
                  onChange={(e) => setFormData({ ...formData, surabayaOfficePhone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase tracking-widest rounded flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
