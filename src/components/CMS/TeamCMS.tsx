import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';
import { Plus, Edit2, Trash2, X, Users, Upload } from 'lucide-react';

export const TeamCMS: React.FC = () => {
  const { team = [], addTeamMember, updateTeamMember, deleteTeamMember } = useApp();
  const safeTeam = Array.isArray(team) ? team : [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: 'Direksi & Eksekutif' as TeamMember['department'],
    biography: '',
    photo: '',
    order: 1,
    email: '',
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      position: '',
      department: 'Direksi & Eksekutif',
      biography: '',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      order: team.length + 1,
      email: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      biography: member.biography,
      photo: member.photo,
      order: member.order,
      email: member.socials?.email || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTeamMember(editingId, {
        name: formData.name,
        position: formData.position,
        department: formData.department,
        biography: formData.biography,
        photo: formData.photo,
        order: formData.order,
        socials: { email: formData.email },
      });
    } else {
      addTeamMember({
        name: formData.name,
        position: formData.position,
        department: formData.department,
        biography: formData.biography,
        photo: formData.photo,
        order: formData.order,
        socials: { email: formData.email },
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white flex items-center space-x-2">
            <Users className="w-6 h-6 text-[#C5A059]" />
            <span>Kelola Tim & Direksi (CMS)</span>
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Atur jajaran direksi, produser, sutradara & penasihat hukum media (Database MySQL Active).
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded flex items-center space-x-2 hover:bg-[#DBC07D] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Anggota Tim</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeTeam.map((member) => (
          <div
            key={member.id}
            className="p-5 bg-[#121214] border border-white/10 rounded-xl space-y-4 flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors shadow-lg"
          >
            <div className="flex items-start space-x-4">
              <img
                src={member.photo}
                alt={member.name}
                className="w-16 h-16 rounded-lg object-cover border border-[#C5A059]/40 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold font-display text-white uppercase truncate">
                  {member.name}
                </h3>
                <span className="text-xs font-mono text-[#C5A059] block truncate">
                  {member.position}
                </span>
                <span className="text-[10px] text-gray-500 font-mono uppercase block truncate">
                  {member.department}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 line-clamp-3">
              {member.biography}
            </p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-mono">
                Urutan: #{member.order}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="p-1.5 bg-amber-500/20 text-amber-300 rounded hover:bg-amber-500/30 cursor-pointer transition-colors"
                  title="Edit Data"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Hapus anggota tim "${member.name}"?`)) {
                      deleteTeamMember(member.id);
                    }
                  }}
                  className="p-1.5 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 cursor-pointer transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#121214] border border-[#C5A059]/40 rounded-2xl p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold font-display uppercase flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#C5A059]" />
                <span>{editingId ? 'Edit Anggota Tim' : 'Tambah Anggota Tim Baru'}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="H. George Rudy, S.H., M.H."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Jabatan / Posisi *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Direktur Utama & Produser Eksekutif"
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Departemen</label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department: e.target.value as TeamMember['department'],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  >
                    <option value="Direksi & Eksekutif">Direksi & Eksekutif</option>
                    <option value="Tim Produksi Sinema">Tim Produksi Sinema</option>
                    <option value="Tim Hukum & Legal Auditor">Tim Hukum & Legal Auditor</option>
                    <option value="Divisi Musik & Audio">Divisi Musik & Audio</option>
                  </select>
                </div>
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Foto Profil (Pilih File Komputer atau Masukkan URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
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
                              setFormData({ ...formData, photo: event.target.result as string });
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.photo && (
                  <div className="mt-2 flex items-center space-x-3 bg-black/40 p-2 rounded border border-white/10">
                    <img src={formData.photo} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-[#C5A059]" />
                    <span className="text-[10px] text-gray-400 font-mono">
                      Preview Foto (Source: {formData.photo.startsWith('data:image') ? 'File Terunggah dari Komputer' : 'URL Link External'})
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Biografi Singkat</label>
                <textarea
                  rows={3}
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  placeholder="Pengalaman karir dan latar belakang..."
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded cursor-pointer hover:bg-white/20 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase rounded cursor-pointer transition-colors"
                >
                  Simpan Anggota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
