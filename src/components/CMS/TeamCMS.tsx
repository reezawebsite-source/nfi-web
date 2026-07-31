import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';
import { Plus, Edit2, Trash2, X, Users } from 'lucide-react';

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
      email: member.socials.email || '',
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
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white">
            Kelola Tim & Direksi (CMS)
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Atur jajaran direksi, produser, sutradara & penasihat hukum media.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#C5A059] text-black text-xs font-mono font-bold uppercase rounded flex items-center space-x-2 hover:bg-[#DBC07D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Anggota Tim</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeTeam.map((member) => (
          <div
            key={member.id}
            className="p-5 bg-[#121214] border border-white/10 rounded-xl space-y-4 flex flex-col justify-between"
          >
            <div className="flex items-start space-x-4">
              <img
                src={member.photo}
                alt={member.name}
                className="w-16 h-16 rounded-lg object-cover border border-[#C5A059]/40"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold font-display text-white uppercase truncate">
                  {member.name}
                </h3>
                <span className="text-xs font-mono text-[#C5A059] block">
                  {member.position}
                </span>
                <span className="text-[10px] text-gray-500 font-mono uppercase block">
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
                  className="p-1.5 bg-amber-500/20 text-amber-300 rounded hover:bg-amber-500/30"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Hapus anggota tim "${member.name}"?`)) {
                      deleteTeamMember(member.id);
                    }
                  }}
                  className="p-1.5 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30"
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
          <div className="w-full max-w-xl bg-[#121214] border border-white/15 rounded-2xl p-6 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold font-display uppercase">
                {editingId ? 'Edit Anggota Tim' : 'Tambah Anggota Tim Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-gray-400 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Jabatan / Posisi</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Departemen</label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department: e.target.value as TeamMember['department'],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                  >
                    <option value="Direksi & Eksekutif">Direksi & Eksekutif</option>
                    <option value="Tim Produksi Sinema">Tim Produksi Sinema</option>
                    <option value="Tim Hukum & Legal Auditor">Tim Hukum & Legal Auditor</option>
                    <option value="Divisi Musik & Audio">Divisi Musik & Audio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Biografi Singkat</label>
                <textarea
                  rows={3}
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] text-black font-bold uppercase rounded"
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
