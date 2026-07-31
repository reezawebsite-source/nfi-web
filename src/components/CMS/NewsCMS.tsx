import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsPost } from '../../types';
import { Plus, Edit2, Trash2, X, Newspaper, Eye, Search } from 'lucide-react';

export const NewsCMS: React.FC = () => {
  const { news = [], addNewsPost, updateNewsPost, deleteNewsPost, setSelectedNews } = useApp();
  const safeNews = Array.isArray(news) ? news : [];

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
    featuredImage: '',
    featured: true,
    readingTimeMinutes: 4,
    seoTitle: '',
    seoDescription: '',
  });

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
      tagsStr: post.tags.join(', '),
      summary: post.summary,
      content: post.content,
      author: post.author,
      featuredImage: post.featuredImage,
      featured: post.featured,
      readingTimeMinutes: post.readingTimeMinutes,
      seoTitle: post.seoTitle || post.title,
      seoDescription: post.seoDescription || post.summary,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArr = formData.tagsStr
      ? formData.tagsStr.split(',').map((t) => t.trim())
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
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white">
            Kelola Berita & Artikel CMS
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Publikasikan kabar korporat, rilis pers & analisis industri film.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded flex items-center space-x-2 hover:bg-[#DBC07D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* News Table */}
      <div className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#18181C] text-gray-400 border-b border-white/10 uppercase">
              <tr>
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Penulis</th>
                <th className="p-4">Tanggal Rilis</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {safeNews.map((post) => (
                <tr key={post.id} className="hover:bg-white/5">
                  <td className="p-4 font-sans font-bold text-white flex items-center space-x-3">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-12 h-9 object-cover rounded"
                    />
                    <div>
                      <span className="block text-sm line-clamp-1">{post.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono">/{post.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-white/5 rounded text-[#C5A059]">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-4">{post.author}</td>
                  <td className="p-4 text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedNews(post)}
                      className="p-1.5 bg-white/5 hover:bg-white/20 text-gray-300 rounded"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(post)}
                      className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus artikel "${post.title}"?`)) {
                          deleteNewsPost(post.id);
                        }
                      }}
                      className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded"
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

      {/* Article Editor Modal with Live SEO Snippet Preview */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#121214] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 text-white my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold font-display uppercase">
                {editingId ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Judul Artikel *</label>
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
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                  >
                    <option value="Penghargaan">Penghargaan & Awards</option>
                    <option value="Edukasi">Edukasi & Tips Film</option>
                    <option value="Hukum & HKI">Hukum & Hak Cipta</option>
                    <option value="Rilis Pers">Rilis Pers Resmi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">
                  Gambar Unggulan / Featured Cover (Pilih File Komputer atau URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
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
                      Preview Cover Artikel (Terisi: {formData.featuredImage.startsWith('data:image') ? 'File Lokal Komputer' : 'URL Link'})
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Ringkasan (Excerpt)</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Konten HTML / Teks Artikel</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
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
