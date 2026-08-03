import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsPost } from '../../types';
import { Plus, Edit2, Trash2, X, Newspaper, Eye, Search, Filter, Upload, Sparkles } from 'lucide-react';

export const NewsCMS: React.FC = () => {
  const { news = [], addNewsPost, updateNewsPost, deleteNewsPost, setSelectedNews } = useApp();
  const safeNews = Array.isArray(news) ? news : [];

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Penghargaan',
    tagsStr: '',
    summary: '',
    content: '',
    author: 'Redaksi NFI',
    authorRole: 'Senior Editor',
    featuredImage: '',
    featured: true,
    readingTimeMinutes: 4,
    seoTitle: '',
    seoDescription: '',
  });

  const filteredNews = useMemo(() => {
    return safeNews.filter((post) => {
      const matchCat = categoryFilter === 'ALL' || post.category === categoryFilter;
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [safeNews, categoryFilter, searchQuery]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Penghargaan',
      tagsStr: 'Nusantara Film, Cinema, Awards',
      summary: '',
      content: '<p>Tuliskan isi berita di sini...</p>',
      author: 'Redaksi NFI',
      authorRole: 'Senior Editor',
      featuredImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000',
      featured: true,
      readingTimeMinutes: 4,
      seoTitle: '',
      seoDescription: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (post: NewsPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      tagsStr: (post.tags || []).join(', '),
      summary: post.summary,
      content: post.content,
      author: post.author,
      authorRole: post.authorRole || 'Editor',
      featuredImage: post.featuredImage,
      featured: post.featured,
      readingTimeMinutes: post.readingTimeMinutes || 4,
      seoTitle: post.seoTitle || post.title,
      seoDescription: post.seoDescription || post.summary,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArr = formData.tagsStr
      ? formData.tagsStr.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const autoSlug =
      formData.slug ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    if (editingId) {
      updateNewsPost(editingId, {
        ...formData,
        slug: autoSlug,
        tags: tagsArr,
      });
    } else {
      addNewsPost({
        ...formData,
        slug: autoSlug,
        tags: tagsArr,
        publishedAt: new Date().toISOString(),
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
            <Newspaper className="w-6 h-6 text-[#C5A059]" />
            <span>Kelola Berita & Artikel CMS</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Publikasikan kabar korporat, rilis pers, & analisis industri film (Database MySQL Active).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded flex items-center space-x-2 hover:bg-[#DBC07D] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
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
            placeholder="Cari judul artikel, penulis, topik..."
            className="w-full pl-9 pr-4 py-2 bg-[#18181C] border border-white/10 rounded text-xs font-mono text-white focus:border-[#C5A059] outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
          <span className="text-xs font-mono text-gray-400 flex-shrink-0">Filter:</span>
          {['ALL', 'Penghargaan', 'Edukasi', 'Hukum & HKI', 'Rilis Pers'].map((cat) => (
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

      {/* News Table */}
      <div className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#18181C] text-gray-400 border-b border-white/10 uppercase">
              <tr>
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Penulis</th>
                <th className="p-4">Waktu Baca</th>
                <th className="p-4">Tanggal Rilis</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 font-mono">
                    Tidak ada artikel yang cocok dengan kata kunci pencarian.
                  </td>
                </tr>
              ) : (
                filteredNews.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-sans font-bold text-white flex items-center space-x-3">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-12 h-9 object-cover rounded border border-white/10 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="block text-sm line-clamp-1">{post.title}</span>
                        <span className="text-[10px] text-gray-500 font-mono block truncate">/{post.slug}</span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-white/5 rounded text-[#C5A059] border border-white/10">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">{post.author}</td>
                    <td className="p-4 whitespace-nowrap text-gray-400">{post.readingTimeMinutes || 4} Menit</td>
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                      {new Date(post.publishedAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setSelectedNews(post)}
                        className="p-1.5 bg-white/5 hover:bg-white/20 text-gray-300 rounded cursor-pointer transition-colors"
                        title="Preview Public Modal"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded cursor-pointer transition-colors"
                        title="Edit Artikel"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus artikel "${post.title}" secara permanen?`)) {
                            deleteNewsPost(post.id);
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

      {/* Article Editor Modal with Live SEO Snippet Preview */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#121214] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 space-y-6 text-white my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-lg font-bold font-display uppercase">
                  {editingId ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Baru'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: PT. Nusantara Film Indonesia Raih Penghargaan..."
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Kategori Artikel</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  >
                    <option value="Penghargaan">Penghargaan & Awards</option>
                    <option value="Edukasi">Edukasi & Tips Film</option>
                    <option value="Hukum & HKI">Hukum & Hak Cipta</option>
                    <option value="Rilis Pers">Rilis Pers Resmi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Penulis (Author)</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Redaksi NFI / Budi Santoso"
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Peran Penulis</label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    placeholder="Senior Editor / Direktur Kreatif"
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Waktu Baca (Menit)</label>
                  <input
                    type="number"
                    value={formData.readingTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, readingTimeMinutes: parseInt(e.target.value) || 4 })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none font-bold text-[#C5A059]"
                  />
                </div>
              </div>

              {/* Cover image upload */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Gambar Unggulan / Featured Cover (Pilih File Komputer atau Masukkan URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    placeholder="https://... atau klik pilih file"
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
                              setFormData({ ...formData, featuredImage: event.target.result as string });
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.featuredImage && (
                  <div className="mt-2 flex items-center space-x-3 bg-black/40 p-2 rounded border border-white/10">
                    <img src={formData.featuredImage} alt="Preview" className="w-16 h-10 object-cover rounded border border-[#C5A059]" />
                    <span className="text-[10px] text-gray-400 font-mono">
                      Preview Cover Artikel (Source: {formData.featuredImage.startsWith('data:image') ? 'File Terunggah dari Komputer' : 'URL Link External'})
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Tags Topik (Pisahkan dengan Koma)</label>
                <input
                  type="text"
                  value={formData.tagsStr}
                  onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                  placeholder="Cinema, Awards, Nusantara Film, HKI"
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Ringkasan (Excerpt Kutipan Muka)</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Ringkasan singkat artikel..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Konten HTML / Teks Artikel Lengkap</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<p>Gunakan tag HTML seperti <p>, <h3>, <ul> untuk format artikel...</p>"
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Meta Title SEO Google</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    placeholder="Judul SEO Google..."
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Meta Description SEO Google</label>
                  <input
                    type="text"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    placeholder="Deskripsi pencarian Google..."
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>
              </div>

              {/* Google Search Live SEO Snippet Preview Box */}
              <div className="p-4 bg-[#0A0A0B] border border-[#C5A059]/30 rounded-lg space-y-2">
                <span className="text-[10px] text-[#C5A059] font-mono font-bold block uppercase">
                  Google Search SERP Snippet Live Preview
                </span>
                <div className="space-y-1">
                  <span className="text-xs text-[#8ab4f8] hover:underline block truncate font-sans font-medium">
                    {formData.seoTitle || formData.title || 'Judul Artikel SEO'} | PT. Nusantara Film Indonesia
                  </span>
                  <span className="text-[10px] text-[#bdc1c6] block font-mono">
                    https://www.nusantarafilm.co.id/news/{formData.slug || 'slug-artikel'}
                  </span>
                  <p className="text-xs text-[#bdc1c6] line-clamp-2 font-sans font-normal">
                    {formData.seoDescription || formData.summary || 'Deskripsi pencarian Google...'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featPostCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                />
                <label htmlFor="featPostCheck" className="text-gray-300 font-bold cursor-pointer">
                  Tampilkan sebagai <span className="text-[#C5A059]">Headline Utama Berita</span>
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
                  Terbitkan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
