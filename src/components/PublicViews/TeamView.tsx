import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';
import { Linkedin, Instagram, Mail, X, Users, ArrowRight } from 'lucide-react';

export const TeamView: React.FC = () => {
  const { team = [], setCurrentPage } = useApp();
  const safeTeam = Array.isArray(team) ? team : [];
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="py-20 bg-[#0E0E10] border-b border-white/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // DIREKSI & MANAJEMEN KREATIF
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-display uppercase text-white tracking-tight">
            Tim Utama Kami
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Sutradara, produser eksekutif, serta penasihat hukum media profesional yang memimpin PT. Nusantara Film Indonesia.
          </p>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeTeam.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden group hover:border-[#C5A059] transition-all cursor-pointer shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                <div className="p-5 space-y-1">
                  <h3 className="text-base font-bold font-display uppercase text-white group-hover:text-[#C5A059] transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#C5A059] font-mono block">
                    {member.position}
                  </span>
                  <p className="text-xs text-gray-400 line-clamp-2 pt-2">
                    {member.biography}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-xs font-bold font-mono text-gray-400 uppercase group-hover:text-white transition-colors">
                Lihat Biografi Lengkap &rarr;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Us Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-10 bg-[#121214] border border-white/15 rounded-2xl space-y-4">
          <Users className="w-10 h-10 text-[#C5A059] mx-auto" />
          <h3 className="text-2xl font-bold font-display uppercase text-white">
            Ingin Bergabung Dengan Kru Sinema NFI?
          </h3>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            Kami selalu terbuka untuk talent sutradara, penulis skenario, kameramen, dan editor berbakat di Indonesia.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-3 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-[#DBC07D] transition-colors"
          >
            Kirimkan Portfolio Anda
          </button>
        </div>
      </section>

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#121214] border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-white">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center">
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover border border-[#C5A059]/40"
              />
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-xl font-bold font-display uppercase text-white">
                  {selectedMember.name}
                </h3>
                <span className="text-xs font-mono text-[#C5A059] block font-bold">
                  {selectedMember.position}
                </span>
                <span className="text-[10px] font-mono text-gray-400 block uppercase">
                  Departemen: {selectedMember.department}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-[#C5A059] uppercase font-bold block">
                Biografi Ringkas:
              </span>
              <p className="text-gray-300 text-xs leading-relaxed">
                {selectedMember.biography}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10 text-xs">
              <span className="text-gray-400 font-mono">
                {selectedMember.socials?.email || 'info@nfi.co.id'}
              </span>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-white/10 text-white font-mono uppercase rounded text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
