import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PortfolioItem } from '../../types';
import { Plus, Edit2, Trash2, X, Film, Eye, Search, Filter, Upload, Image as ImageIcon } from 'lucide-react';

export const PortfolioCMS: React.FC = () => {
  const { portfolio = [], addPortfolioItem, updatePortfolioItem, deletePortfolioItem, setSelectedPortfolio } =
    useApp();

  const safePortfolio = Array.isArray(portfolio) ? portfolio : [];

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

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

  const filteredPortfolio = useMemo(() => {
    return safePortfolio.filter((item) => {
      const matchCat = categoryFilter === 'ALL' || item.category === categoryFilter;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.director && item.director.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [safePortfolio, categoryFilter, searchQuery]);

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
      galleryStr: (item.gallery || []).join(', '),
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
      ? formData.galleryStr.split(',').map((s) => s.trim()).filter(Boolean)
      : [formData.thumbnail];

    const castArr = formData.castStr
      ? formData.castStr.split(',').map((s) => s.trim()).filter(Boolean)
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white flex items-center space-x-2">
            <Film className="w-6 h-6 text-[#C5A059]" />
            <span>Portofolio Management (CMS)</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Kelola karya sinema, iklan komersial, video korporat, & album musik (Database MySQL Active).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded flex items-center space-x-2 hover:bg-[#DBC07D] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Portofolio</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#121214] p-4 rounded-xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, klien, sutradara..."
            className="w-full pl-9 pr-4 py-2 bg-[#18181C] border border-white/10 rounded text-xs font-mono text-white focus:border-[#C5A059] outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
          <span className="text-xs font-mono text-gray-400 flex-shrink-0">Filter:</span>
          {['ALL', 'Film', 'Iklan', 'Video Korporat', 'Musik', 'Konten Digital'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#C5A059] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#18181C] text-gray-400 border-b border-white/10 uppercase">
              <tr>
                <th className="p-4">Karya & Poster</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Klien / Brand</th>
                <th className="p-4">Sutradara</th>
                <th className="p-4">Tahun</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredPortfolio.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-mono">
                    Tidak ada data portofolio yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredPortfolio.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-sans font-bold text-white flex items-center space-x-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-9 object-cover rounded border border-white/10 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="block text-sm line-clamp-1">{item.title}</span>
                        <span className="text-[10px] text-gray-500 font-mono block truncate">/{item.slug}</span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-white/5 rounded text-[#C5A059] border border-white/10">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs truncate">{item.client}</td>
                    <td className="p-4 text-gray-400">{item.director || '-'}</td>
                    <td className="p-4 text-[#C5A059] font-bold">{item.year}</td>
                    <td className="p-4 whitespace-nowrap">
                      {item.featured ? (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded font-bold text-[10px]">
                          FEATURED
                        </span>
                      ) : (
                        <span className="text-gray-600 text-[10px]">REGULAR</span>
                      )}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setSelectedPortfolio(item)}
                        className="p-1.5 bg-white/5 hover:bg-white/20 text-gray-300 rounded cursor-pointer transition-colors"
                        title="Preview Public Modal"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded cursor-pointer transition-colors"
                        title="Edit Data"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus portofolio "${item.title}" secara permanen?`)) {
                            deletePortfolioItem(item.id);
                          }
                        }}
                        className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded cursor-pointer transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#121214] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 space-y-6 text-white my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Film className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-lg font-bold font-display uppercase">
                  {editingId ? 'Edit Data Portofolio' : 'Tambah Portofolio Baru'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Judul Karya *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Ken Arok - Rahasia Takdir"
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Kategori Karya *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as PortfolioItem['category'],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  >
                    <option value="Film">Film Layar Lebar</option>
                    <option value="Iklan">Iklan & Komersial</option>
                    <option value="Video Korporat">Video Korporat</option>
                    <option value="Musik">Promotor & Rekaman Musik</option>
                    <option value="Konten Digital">Konten Digital & Drone</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Klien / House Brand</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="PT. Nusantara Film Indonesia"
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Sutradara / Director</label>
                  <input
                    type="text"
                    value={formData.director}
                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                    placeholder="George Rudy & SA. Karim"
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Tahun Rilis Produksi</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none font-bold text-[#C5A059]"
                  />
                </div>
              </div>

              {/* Thumbnail Image upload or URL */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Gambar Thumbnail Poster (Pilih File Komputer atau Masukkan URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://... atau klik tombol pilih file"
                    className="flex-1 px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white w-full focus:border-[#C5A059] outline-none"
                  />
                  <label className="px-3.5 py-2 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold font-mono text-xs rounded cursor-pointer flex-shrink-0 flex items-center space-x-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
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
                      Preview Poster (Source: {formData.thumbnail.startsWith('data:image') ? 'File Terunggah dari Komputer' : 'URL Link External'})
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">URL Video Trailer (YouTube Link)</label>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Deskripsi Singkat Karya</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ringkasan singkat karya untuk kartu list..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Sinopsis Lengkap Alur Cerita</label>
                <textarea
                  rows={3}
                  value={formData.synopsis}
                  onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                  placeholder="Sinopsis mendalam alur cerita karya..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Pemeran Utama / Cast (Pisahkan dengan Koma)</label>
                <input
                  type="text"
                  value={formData.castStr}
                  onChange={(e) => setFormData({ ...formData, castStr: e.target.value })}
                  placeholder="Reza Rahadian, Tara Basro, Donny Kesuma"
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Galeri Foto Produksi (URL Gambar Pisahkan dengan Koma)</label>
                <input
                  type="text"
                  value={formData.galleryStr}
                  onChange={(e) => setFormData({ ...formData, galleryStr: e.target.value })}
                  placeholder="https://..., https://..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                />
                <label htmlFor="featCheck" className="text-gray-300 font-bold cursor-pointer">
                  Tampilkan sebagai <span className="text-[#C5A059]">Featured Hero Item</span> di Beranda Utam
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded cursor-pointer hover:bg-white/20 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase rounded cursor-pointer transition-colors"
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
