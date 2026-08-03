import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceOffering } from '../../types';
import { Edit2, Trash2, Plus, Layers, X, Upload } from 'lucide-react';

export const ServicesCMS: React.FC = () => {
  const { services = [], addServiceOffering, updateServiceOffering, deleteServiceOffering } = useApp();
  const safeServices = Array.isArray(services) ? services : [];

  const [editingService, setEditingService] = useState<ServiceOffering | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    deliverablesStr: '',
    sampleImage: '',
  });

  const openAddModal = () => {
    setIsAdding(true);
    setEditingService(null);
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      deliverablesStr: '',
      sampleImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800',
    });
  };

  const startEdit = (s: ServiceOffering) => {
    setIsAdding(false);
    setEditingService(s);
    setFormData({
      title: s.title,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      deliverablesStr: (s.deliverables || []).join('\n'),
      sampleImage: s.sampleImage,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const delivs = formData.deliverablesStr
      ? formData.deliverablesStr.split('\n').filter((x) => x.trim())
      : [];

    if (isAdding) {
      addServiceOffering({
        uuid: crypto.randomUUID(),
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        iconName: 'Film',
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        deliverables: delivs,
        sampleImage: formData.sampleImage,
        featured: false,
      });
      setIsAdding(false);
    } else if (editingService) {
      updateServiceOffering(editingService.id, {
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        deliverables: delivs,
        sampleImage: formData.sampleImage,
      });
      setEditingService(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white flex items-center space-x-2">
            <Layers className="w-6 h-6 text-[#C5A059]" />
            <span>Kelola Layanan Sinematik NFI (CMS)</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Tambah, perbarui, atau hapus jenis paket layanan sinematografi & fasilitas produksi (Database MySQL Active).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded flex items-center space-x-2 hover:bg-[#DBC07D] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeServices.map((serv) => (
          <div
            key={serv.id}
            className="p-6 bg-[#121214] border border-white/10 rounded-xl space-y-3 relative flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display uppercase text-[#C5A059]">
                  {serv.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEdit(serv)}
                    className="p-1.5 bg-amber-500/20 text-amber-300 rounded hover:bg-amber-500/30 text-xs font-mono flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus paket layanan "${serv.title}"?`)) {
                        deleteServiceOffering(serv.id);
                      }
                    }}
                    className="p-1.5 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 text-xs font-mono flex items-center space-x-1 cursor-pointer transition-colors"
                    title="Hapus Layanan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {serv.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-gray-400 flex justify-between items-center">
              <span>{serv.deliverables?.length || 0} Deliverables Terdaftar</span>
              <span className="text-[#C5A059]">NFI Service ID: {serv.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit or Add Service Modal */}
      {(editingService || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#121214] border border-[#C5A059]/40 rounded-2xl p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold font-display uppercase text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-[#C5A059]" />
                <span>{isAdding ? 'Tambah Layanan Baru' : `Edit Layanan: ${editingService?.title}`}</span>
              </h3>
              <button
                onClick={() => {
                  setEditingService(null);
                  setIsAdding(false);
                }}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Judul Layanan *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Produksi Film Layar Lebar & Seri TV"
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Deskripsi Ringkas *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Deskripsi singkat layanan..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Deskripsi Lengkap & Metodologi</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Prosedur kerja, standar kualitas..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Deliverables / Output (Satu per baris)</label>
                <textarea
                  rows={3}
                  value={formData.deliverablesStr}
                  onChange={(e) => setFormData({ ...formData, deliverablesStr: e.target.value })}
                  placeholder="Draft skenario&#10;Shooting master 4K RAW&#10;Color grading DaVinci"
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Gambar Sampel Layanan (Pilih File Komputer atau Masukkan URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={formData.sampleImage}
                    onChange={(e) => setFormData({ ...formData, sampleImage: e.target.value })}
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
                              setFormData({ ...formData, sampleImage: event.target.result as string });
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.sampleImage && (
                  <div className="mt-2 flex items-center space-x-3 bg-black/40 p-2 rounded border border-white/10">
                    <img src={formData.sampleImage} alt="Preview" className="w-16 h-10 object-cover rounded border border-[#C5A059]" />
                    <span className="text-[10px] text-gray-400 font-mono">
                      Preview Gambar (Source: {formData.sampleImage.startsWith('data:image') ? 'File Terunggah dari Komputer' : 'URL Link External'})
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsAdding(false);
                  }}
                  className="px-4 py-2 bg-white/10 text-white rounded cursor-pointer hover:bg-white/20 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] text-black font-bold uppercase rounded hover:bg-[#DBC07D] cursor-pointer transition-colors"
                >
                  {isAdding ? 'Tambah Layanan' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
