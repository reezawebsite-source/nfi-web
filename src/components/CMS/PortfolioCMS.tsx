import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PortfolioItem } from '../../types';
import { Plus, Edit2, Trash2, X, Film, Check, Eye } from 'lucide-react';

export const PortfolioCMS: React.FC = () => {
  const { portfolio = [], addPortfolioItem, updatePortfolioItem, deletePortfolioItem, setSelectedPortfolio } =
    useApp();

  const safePortfolio = Array.isArray(portfolio) ? portfolio : [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Film' as PortfolioItem['category'],
    client: '',
    year: new Date().getFullYear(),
    thumbnail: '',
    galleryStr: '',
    youtubeUrl: '',
    description: '',
    synopsis: '',
    director: '',
    castStr: '',
    featured: false,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Film',
      client: '',
      year: new Date().getFullYear(),
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000',
      galleryStr: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: '',
      synopsis: '',
      director: '',
      castStr: '',
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      category: item.category,
      client: item.client,
      year: item.year,
      thumbnail: item.thumbnail,
      galleryStr: item.gallery.join(', '),
      youtubeUrl: item.youtubeUrl,
      description: item.description,
      synopsis: item.synopsis || '',
      director: item.director || '',
      castStr: (item.cast || []).join(', '),
      featured: item.featured,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const galleryArr = formData.galleryStr
      ? formData.galleryStr.split(',').map((s) => s.trim())
      : [formData.thumbnail];

    const castArr = formData.castStr
      ? formData.castStr.split(',').map((s) => s.trim())
      : [];

    const autoSlug =
      formData.slug ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    if (editingId) {
      updatePortfolioItem(editingId, {
        ...formData,
        slug: autoSlug,
        gallery: galleryArr,
        cast: castArr,
      });
    } else {
      addPortfolioItem({
        ...formData,
        slug: autoSlug,
        gallery: galleryArr,
        cast: castArr,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white">
            Portofolio Management (CMS)
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Kelola karya sinema, iklan komersial, video korporat & album musik.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded flex items-center space-x-2 hover:bg-[#DBC07D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Portofolio</span>
        </button>
      </div>

      {/* Portfolio Table */}
      <div className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#18181C] text-gray-400 border-b border-white/10 uppercase">
              <tr>
                <th className="p-4">Karya & Poster</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Klien / Brand</th>
                <th className="p-4">Tahun</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {safePortfolio.map((item) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="p-4 font-sans font-bold text-white flex items-center space-x-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-9 object-cover rounded"
                    />
                    <div>
                      <span className="block text-sm line-clamp-1">{item.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono">/{item.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-white/5 rounded text-[#C5A059]">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4">{item.client}</td>
                  <td className="p-4 text-[#C5A059]">{item.year}</td>
                  <td className="p-4">
                    {item.featured ? (
                      <span className="text-emerald-400 font-bold">YES</span>
                    ) : (
                      <span className="text-gray-600">NO</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedPortfolio(item)}
                      className="p-1.5 bg-white/5 hover:bg-white/20 text-gray-300 rounded"
                      title="Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus portofolio "${item.title}"?`)) {
                          deletePortfolioItem(item.id);
                        }
                      }}
                      className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#121214] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 text-white my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold font-display uppercase">
                {editingId ? 'Edit Item Portofolio' : 'Tambah Portofolio Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Judul Karya *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as PortfolioItem['category'],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                  >
                    <option value="Film">Film Layar Lebar</option>
                    <option value="Iklan">Iklan & Komersial</option>
                    <option value="Video Korporat">Video Korporat</option>
                    <option value="Musik">Promotor & Rekaman Musik</option>
                    <option value="Konten Digital">Konten Digital & Drone</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Klien / Brand</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Tahun Produksi</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">
                  Gambar Thumbnail Poster (Pilih File Komputer atau Masukkan URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://... atau pilih file"
                    className="flex-1 px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white w-full"
                  />
                  <label className="px-3 py-2 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold font-mono text-xs rounded cursor-pointer flex-shrink-0 flex items-center space-x-1">
                    <span>Pilih File Gambar</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              setFormData({ ...formData, thumbnail: event.target.result as string });
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.thumbnail && (
                  <div className="mt-2 flex items-center space-x-3 bg-black/40 p-2 rounded border border-white/10">
                    <img src={formData.thumbnail} alt="Preview" className="w-16 h-10 object-cover rounded border border-[#C5A059]" />
                    <span className="text-[10px] text-gray-400 font-mono">
                      Preview Poster (Terisi: {formData.thumbnail.startsWith('data:image') ? 'File Lokal Komputer' : 'URL Link'})
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-1">URL Video Trailer (YouTube)</label>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#C5A059]"
                />
                <label htmlFor="featCheck" className="text-gray-300">
                  Tampilkan sebagai Featured di Beranda
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C5A059] text-black font-bold uppercase rounded"
                >
                  Simpan Portofolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
