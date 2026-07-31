import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Inbox, CheckCircle2, Trash2, Mail, Phone, Clock, MapPin, Search } from 'lucide-react';

export const InquiriesCMS: React.FC = () => {
  const { inquiries = [], updateInquiryStatus, markInquiryStatus, deleteInquiry } = useApp();
  const statusHandler = markInquiryStatus || updateInquiryStatus;
  const [filterOffice, setFilterOffice] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];

  const filteredInquiries = safeInquiries.filter((inq) => {
    const matchesOffice = filterOffice === 'Semua' || inq.officeTarget === filterOffice;
    const matchesQuery =
      (inq.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.message || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOffice && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white">
            Pesan & Inquiry Masuk (Inbox)
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Kelola pesan masuk dari calon klien kantor Jakarta & Surabaya.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-[#C5A059]">
            Total Inbox: {inquiries.length}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#121214] border border-white/10 rounded-xl">
        <div className="flex space-x-2">
          {['Semua', 'Jakarta', 'Surabaya'].map((office) => (
            <button
              key={office}
              onClick={() => setFilterOffice(office)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded transition-colors ${
                filterOffice === office
                  ? 'bg-[#C5A059] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Target: {office}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengirim, email..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#18181C] border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#C5A059]"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredInquiries.map((inq) => (
          <div
            key={inq.id}
            className={`p-6 bg-[#121214] border rounded-xl space-y-4 transition-all ${
              inq.status === 'Unread'
                ? 'border-[#C5A059] bg-[#141310]'
                : 'border-white/10'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded ${
                    inq.status === 'Unread'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {inq.status}
                </span>

                <span className="text-xs font-mono text-[#C5A059] flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  Target: Kantor {inq.officeTarget}
                </span>
              </div>

              <span className="text-[10px] text-gray-500 font-mono">
                {new Date(inq.createdAt).toLocaleString('id-ID')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-500 block text-[10px]">PENGIRIM</span>
                <span className="text-white font-bold font-sans text-sm block">
                  {inq.fullName}
                </span>
              </div>

              <div>
                <span className="text-gray-500 block text-[10px]">EMAIL & TELEPON</span>
                <span className="text-gray-300 block">{inq.email}</span>
                <span className="text-[#C5A059] block">{inq.phone}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-[10px]">SUBJEK DISKUSI</span>
                <span className="text-white font-bold block">{inq.subject}</span>
              </div>
            </div>

            <div className="p-4 bg-[#18181C] rounded border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-500 font-mono uppercase block">
                ISI PESAN / BRIEF PROYEK:
              </span>
              <p className="text-gray-200 text-xs leading-relaxed font-sans">
                {inq.message}
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              {inq.status === 'Unread' && (
                <button
                  onClick={() => statusHandler && statusHandler(inq.id, 'Replied')}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono rounded flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tandai Sudah Dibaca</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (confirm('Hapus pesan ini dari inbox?')) {
                    deleteInquiry(inq.id);
                  }
                }}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-mono rounded flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Pesan</span>
              </button>
            </div>
          </div>
        ))}

        {filteredInquiries.length === 0 && (
          <div className="p-12 bg-[#121214] border border-white/10 rounded-xl text-center text-gray-500 text-xs font-mono">
            Tidak ada pesan masuk pada kategori ini.
          </div>
        )}
      </div>
    </div>
  );
};
