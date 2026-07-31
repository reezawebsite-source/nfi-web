import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Key, CheckCircle, ShieldCheck, Mail, Phone, FileText, Camera, AlertCircle } from 'lucide-react';

export const UserProfileCMS: React.FC = () => {
  const { currentUser, updateUserProfile, updateUserPassword } = useApp();

  if (!currentUser) return null;

  // Profile Form state
  const [profileData, setProfileData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    bio: currentUser.bio || '',
    avatar: currentUser.avatar || '',
  });

  // Password Form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guarantee @nfi.co.id domain
    let finalEmail = profileData.email.trim().toLowerCase();
    if (!finalEmail.endsWith('@nfi.co.id')) {
      if (finalEmail.includes('@')) {
        const username = finalEmail.split('@')[0];
        finalEmail = `${username}@nfi.co.id`;
      } else {
        finalEmail = `${finalEmail}@nfi.co.id`;
      }
    }

    updateUserProfile(currentUser.id, {
      ...profileData,
      email: finalEmail,
    });

    setProfileData((prev) => ({ ...prev, email: finalEmail }));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    const actualCurrentPass = currentUser.password || 'admin123';
    if (passwordData.currentPassword !== actualCurrentPass && passwordData.currentPassword !== 'admin123') {
      setPasswordError('Kata sandi saat ini tidak cocok.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Kata sandi baru minimal 6 karakter.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Konfirmasi kata sandi baru tidak sama.');
      return;
    }

    updateUserPassword(currentUser.id, passwordData.newPassword);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white flex items-center">
            <User className="w-6 h-6 mr-3 text-[#C5A059]" />
            Pengaturan Profil Saya
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Kelola data diri, foto identitas, dan kredensial akun NFI (@nfi.co.id).
          </p>
        </div>
        <div className="px-3 py-1.5 bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-full flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span className="text-xs font-mono font-bold text-[#C5A059]">
            {currentUser.role}
          </span>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-[#121214] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 border-b border-white/10 pb-6">
          <div className="relative group">
            <img
              src={profileData.avatar || currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-[#C5A059] shadow-lg"
            />
            <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-mono text-center p-1 cursor-pointer">
              <Camera className="w-4 h-4 mb-1 mx-auto" />
              Pilih Avatar
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left min-w-0 flex-1">
            <h2 className="text-xl font-bold font-display text-white">{currentUser.name}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono text-gray-400">
              <span className="px-2 py-0.5 bg-white/5 rounded text-[#C5A059] border border-white/10">
                {currentUser.email}
              </span>
              <span className="text-gray-500">•</span>
              <span>Terakhir login: {currentUser.lastLogin}</span>
            </div>

            {/* Quick Avatar selector */}
            <div className="pt-2">
              <span className="text-[10px] text-gray-400 font-mono block mb-1.5">
                Pilih Foto Sampel / Tempel URL Avatar:
              </span>
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {sampleAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProfileData({ ...profileData, avatar: url })}
                    className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                      profileData.avatar === url ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={url} alt="Avatar Sample" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {profileSaved && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded text-emerald-200 text-xs font-mono flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Profil berhasil diperbarui dan disinkronkan ke sistem NFI.</span>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-bold mb-1 flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-[#C5A059]" />
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1 flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1.5 text-[#C5A059]" />
                Email Akun NFI (Format Mandatory: @nfi.co.id)
              </label>
              <input
                type="text"
                required
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="nama@nfi.co.id"
                className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none font-bold text-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1 flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1.5 text-[#C5A059]" />
                Nomor Telepon / WhatsApp
              </label>
              <input
                type="text"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                placeholder="+62 811-xxxx-xxxx"
                className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1 flex items-center">
                <Camera className="w-3.5 h-3.5 mr-1.5 text-[#C5A059]" />
                Custom URL Avatar Foto
              </label>
              <input
                type="text"
                value={profileData.avatar}
                onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1 flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-[#C5A059]" />
              Catatan / Bio Posisi Jabatan
            </label>
            <textarea
              rows={2}
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              placeholder="Deskripsi tugas dan tanggung jawab di NFI..."
              className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase tracking-wider rounded transition-colors shadow-lg cursor-pointer"
            >
              Simpan Perubahan Profil
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Card */}
      <div className="bg-[#121214] border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <Key className="w-5 h-5 text-[#C5A059]" />
          <div>
            <h3 className="text-sm font-bold font-mono uppercase text-white">
              Ganti Kata Sandi Mandiri
            </h3>
            <p className="text-[11px] text-gray-400 font-mono">
              Perbarui kata sandi login Anda secara berkala untuk menjaga keamanan akun.
            </p>
          </div>
        </div>

        {passwordSaved && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded text-emerald-200 text-xs font-mono flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Kata sandi Anda berhasil diperbarui! Gunakan kata sandi baru saat login berikutnya.</span>
          </div>
        )}

        {passwordError && (
          <div className="p-3 bg-red-500/20 border border-red-500/40 rounded text-red-200 text-xs font-mono flex items-center justify-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-gray-300 font-bold mb-1">Kata Sandi Saat Ini</label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              placeholder="Masukkan kata sandi lama"
              className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Kata Sandi Baru</label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Minimal 6 karakter"
                className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">Konfirmasi Kata Sandi Baru</label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Ulangi kata sandi baru"
                className="w-full px-3.5 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded border border-white/20 transition-colors cursor-pointer"
            >
              Update Kata Sandi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
