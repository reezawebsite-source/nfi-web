import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Activity, Key, ShieldCheck, UserPlus, Trash2, AlertTriangle, Check, RefreshCw, X } from 'lucide-react';
import { UserAccount } from '../../types';

export const UserSecurityCMS: React.FC = () => {
  const {
    activityLogs = [],
    users = [],
    currentUser,
    resetUserPasswordByAdmin,
    addUser,
    deleteUser,
  } = useApp();

  const safeUsers = Array.isArray(users) ? users : [];
  const safeLogs = Array.isArray(activityLogs) ? activityLogs : [];

  const isSuperAdmin = currentUser?.role === 'Super Admin';

  // Password reset modal state
  const [selectedUserForReset, setSelectedUserForReset] = useState<UserAccount | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  // Add user modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'Editor' as UserAccount['role'],
    password: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  });

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForReset || !newPasswordInput.trim()) return;

    resetUserPasswordByAdmin(selectedUserForReset.id, newPasswordInput.trim());
    setResetSuccessMsg(`Kata sandi untuk ${selectedUserForReset.name} (${selectedUserForReset.email}) telah berhasil direset.`);
    
    setSelectedUserForReset(null);
    setNewPasswordInput('');

    setTimeout(() => {
      setResetSuccessMsg('');
    }, 4000);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) return;

    let emailFormatted = newUserForm.email.trim().toLowerCase();
    if (!emailFormatted.endsWith('@nfi.co.id')) {
      if (emailFormatted.includes('@')) {
        const username = emailFormatted.split('@')[0];
        emailFormatted = `${username}@nfi.co.id`;
      } else {
        emailFormatted = `${emailFormatted}@nfi.co.id`;
      }
    }

    addUser({
      name: newUserForm.name,
      email: emailFormatted,
      role: newUserForm.role,
      password: newUserForm.password || 'nfi123456',
      avatar: newUserForm.avatar,
      phone: newUserForm.phone || '+62 812-0000-0000',
      bio: `Staf ${newUserForm.role} PT Nusantara Film Indonesia`,
    });

    setShowAddModal(false);
    setNewUserForm({
      name: '',
      email: '',
      role: 'Editor',
      password: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    });
    setResetSuccessMsg(`Pengguna baru ${emailFormatted} berhasil ditambahkan!`);
    setTimeout(() => setResetSuccessMsg(''), 4000);
  };

  const handleDeleteUser = (u: UserAccount) => {
    if (u.id === currentUser?.id) {
      alert('Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif.');
      return;
    }

    if (window.confirm(`Apakah Anda yakin ingin menghapus pengguna "${u.name}" (${u.email})?`)) {
      deleteUser(u.id);
      setResetSuccessMsg(`Akun ${u.email} telah dihapus.`);
      setTimeout(() => setResetSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white flex items-center">
            <ShieldCheck className="w-6 h-6 mr-3 text-[#C5A059]" />
            Manajemen Pengguna & Security Matrix
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Pengelolaan akun internal NFI dengan domain mandatory <span className="text-[#C5A059] font-bold">@nfi.co.id</span> & kontrol sandi Super Admin.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold text-xs font-mono uppercase tracking-wider rounded flex items-center space-x-2 transition-colors cursor-pointer self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah User NFI Baru</span>
          </button>
        )}
      </div>

      {/* Success Banner */}
      {resetSuccessMsg && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">{resetSuccessMsg}</span>
          </div>
          <button onClick={() => setResetSuccessMsg('')} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Access Permission Notice if not Super Admin */}
      {!isSuperAdmin && (
        <div className="p-4 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-xl text-xs font-mono flex items-start space-x-3 text-gray-300">
          <AlertTriangle className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#C5A059] block mb-1">
              Informasi Hak Akses Peran ({currentUser?.role}):
            </span>
            <span>
              Anda saat ini masuk sebagai <strong className="text-white">{currentUser?.role}</strong>. Fitur untuk mereset kata sandi pengguna lain atau menambah pengguna baru hanya dibuka khusus untuk <strong className="text-[#C5A059]">Super Admin</strong>. Untuk mengelola profil dan mengganti kata sandi akun Anda sendiri, silakan gunakan menu <strong className="text-white">"Profil Saya"</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Admin Users Table */}
      <div className="bg-[#121214] border border-white/10 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-bold font-mono uppercase text-[#C5A059] flex items-center">
            <UserCheck className="w-4 h-4 mr-2" />
            Daftar Pengguna Akun Terdaftar (@nfi.co.id)
          </h3>
          <span className="text-xs font-mono text-gray-400">
            Total: {safeUsers.length} Pengguna
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#18181C] text-gray-400 border-b border-white/10 uppercase">
              <tr>
                <th className="p-3">Pengguna</th>
                <th className="p-3">Email Login</th>
                <th className="p-3">Peran (Role)</th>
                <th className="p-3">Login Terakhir</th>
                <th className="p-3 text-right">Opsi Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {safeUsers.map((u) => {
                const isCurrent = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className={`hover:bg-white/5 ${isCurrent ? 'bg-white/[0.03]' : ''}`}>
                    <td className="p-3 font-sans font-bold text-white flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-[#C5A059]/50" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span>{u.name}</span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono rounded">
                              Anda
                            </span>
                          )}
                        </div>
                        {u.phone && <span className="block text-[10px] text-gray-500 font-mono">{u.phone}</span>}
                      </div>
                    </td>

                    <td className="p-3 font-bold text-[#C5A059]">{u.email}</td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        u.role === 'Super Admin'
                          ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40'
                          : u.role === 'Editor'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="p-3 text-gray-400">{u.lastLogin || 'Belum Pernah'}</td>

                    <td className="p-3 text-right">
                      {isSuperAdmin ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedUserForReset(u)}
                            className="px-2.5 py-1 bg-white/10 hover:bg-[#C5A059] hover:text-black text-white rounded font-mono text-[11px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                            title="Reset Kata Sandi User Ini"
                          >
                            <Key className="w-3 h-3" />
                            <span>Reset Sandi</span>
                          </button>

                          {!isCurrent && (
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="p-1 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Hapus Akun Pengguna"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-500 italic">Protected</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Reset Password oleh Super Admin */}
      {selectedUserForReset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-[#C5A059]/50 rounded-2xl p-6 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-sm font-bold font-mono uppercase text-white">
                  Reset Password User (Super Admin)
                </h3>
              </div>
              <button
                onClick={() => setSelectedUserForReset(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-xs font-mono space-y-1">
              <p className="text-gray-400">Target User:</p>
              <p className="font-bold text-white text-sm">{selectedUserForReset.name}</p>
              <p className="text-[#C5A059] font-bold">{selectedUserForReset.email}</p>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Kata Sandi Baru untuk User Ini
                </label>
                <input
                  type="text"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Contoh: nfi2026barusandi"
                  className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none font-bold"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedUserForReset(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase rounded cursor-pointer flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simpan Password Baru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah User Baru */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-[#C5A059]/50 rounded-2xl p-6 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-sm font-bold font-mono uppercase text-white">
                  Tambah Akun Pengguna NFI Baru
                </h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="Misal: Ahmad Reza"
                  className="w-full px-3.5 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  Email Login (Domain Auto @nfi.co.id)
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    required
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    placeholder="reza"
                    className="w-full px-3.5 py-2 bg-[#18181C] border border-white/10 rounded-l text-white focus:border-[#C5A059] outline-none font-bold"
                  />
                  <span className="px-3 py-2 bg-[#18181C] border-t border-r border-b border-white/10 text-[#C5A059] font-bold rounded-r">
                    @nfi.co.id
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Role / Peran</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserAccount['role'] })}
                    className="w-full px-3.5 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  >
                    <option value="Editor">Editor</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Legal Auditor">Legal Auditor</option>
                    <option value="Producer">Producer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Kata Sandi Awal</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    placeholder="nfi123456"
                    className="w-full px-3.5 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  placeholder="+62 812-3456-7890"
                  className="w-full px-3.5 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase rounded cursor-pointer"
                >
                  Buat Akun User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit Logs Table */}
      <div className="bg-[#121214] border border-white/10 rounded-xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold font-mono uppercase text-[#C5A059] flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          Audit Trail Log Aktivitas Perubahan State & Login User
        </h3>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {safeLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-[#18181C] rounded border border-white/5 text-xs font-mono flex items-center justify-between hover:border-white/10 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{log.userName}</span>
                  <span className="text-[10px] text-[#C5A059]">({log.userEmail})</span>
                  <span className="text-[10px] text-gray-500">[{log.ipAddress}]</span>
                </div>
                <p className="text-gray-300 font-sans">{log.action}</p>
              </div>

              <div className="text-right flex-shrink-0 ml-4">
                <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400 block mb-1">
                  {log.module}
                </span>
                <span className="text-[10px] text-gray-500 block">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
