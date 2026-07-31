import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { addInquiry, settings } = useApp();

  const [activeOfficeTab, setActiveOfficeTab] = useState<'Jakarta' | 'Surabaya'>('Jakarta');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaChecked) {
      alert('Silakan centang reCAPTCHA terlebih dahulu.');
      return;
    }
    addInquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '-',
      subject: formData.subject || 'Inquiry Kontak',
      message: formData.message,
      officeTarget: activeOfficeTab,
    });
    setSubmitted(true);
    setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    setRecaptchaChecked(false);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="py-20 bg-[#0E0E10] border-b border-white/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // HUBUNGI KAMI
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-display uppercase text-white tracking-tight">
            Kontak & Lokasi Kantor
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Kantor operasional Jakarta & Surabaya siap melayani kebutuhan konsultasi film, video korporat, dan legalitas media Anda.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Info & Office Switcher */}
        <div className="lg:col-span-5 space-y-8">
          {/* Office Tab Switcher */}
          <div className="p-1 bg-[#121214] border border-white/10 rounded-xl flex">
            <button
              onClick={() => setActiveOfficeTab('Jakarta')}
              className={`flex-1 py-3 text-xs font-bold font-mono uppercase rounded-lg transition-colors cursor-pointer ${
                activeOfficeTab === 'Jakarta'
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Jakarta Office
            </button>
            <button
              onClick={() => setActiveOfficeTab('Surabaya')}
              className={`flex-1 py-3 text-xs font-bold font-mono uppercase rounded-lg transition-colors cursor-pointer ${
                activeOfficeTab === 'Surabaya'
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Surabaya Office
            </button>
          </div>

          {/* Selected Office Details */}
          <div className="p-6 bg-[#121214] border border-white/10 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold font-display uppercase text-white flex items-center">
              <MapPin className="w-5 h-5 text-[#C5A059] mr-2" />
              <span>
                {activeOfficeTab === 'Jakarta'
                  ? 'Kantor Pusat Jakarta'
                  : 'Kantor Cabang Surabaya'}
              </span>
            </h3>

            <div className="space-y-4 text-xs text-gray-300 font-mono">
              <div>
                <span className="text-gray-500 block uppercase mb-1">ALAMAT LENGKAP</span>
                <p className="text-white text-sm font-sans">
                  {activeOfficeTab === 'Jakarta'
                    ? settings.jakartaOfficeAddress
                    : settings.surabayaOfficeAddress}
                </p>
              </div>

              <div>
                <span className="text-gray-500 block uppercase mb-1">TELEPON HOTLINE</span>
                <p className="text-[#C5A059] text-sm">
                  {activeOfficeTab === 'Jakarta'
                    ? settings.jakartaOfficePhone
                    : settings.surabayaOfficePhone}
                </p>
              </div>

              <div>
                <span className="text-gray-500 block uppercase mb-1">EMAIL RESMI</span>
                <p className="text-white text-sm">{settings.contactEmail}</p>
              </div>

              <div>
                <span className="text-gray-500 block uppercase mb-1">JAM OPERASIONAL</span>
                <p className="text-gray-300">{settings.workingHours}</p>
              </div>
            </div>

            {/* Direct WhatsApp Trigger */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Halo%20PT.%20Nusantara%20Film%20Indonesia,%20saya%20ingin%20konsultasi%20proyek...`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono uppercase tracking-widest rounded flex items-center justify-center space-x-2 shadow-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Direct WhatsApp Hotline</span>
              </a>
            </div>
          </div>

          {/* Embed Google Maps */}
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video shadow-2xl">
            <iframe
              src={
                activeOfficeTab === 'Jakarta'
                  ? settings.googleMapsEmbedJakarta
                  : settings.googleMapsEmbedSurabaya
              }
              title="Google Maps Location"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-[#121214] border border-white/10 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold font-display uppercase text-white">
            Formulir Konsultasi Proyek
          </h2>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto" />
              <h3 className="text-xl font-bold font-display uppercase text-white">
                Pesan Berhasil Dikirim
              </h3>
              <p className="text-xs text-gray-300">
                Pesan Anda telah masuk ke sistem inbox NFI ({activeOfficeTab} Target). Tim produser kami akan segera menghubungi Anda.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-[#C5A059] text-black text-xs font-bold uppercase rounded"
              >
                Kirim Pesan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-mono mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Budi Prasetyo"
                    className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-mono mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-mono mb-1">Telepon / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62 812..."
                    className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-mono mb-1">Subjek</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Subjek Diskusi Proyek"
                    className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-mono mb-1">Pesan / Brief Proyek *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Jelaskan kebutuhan film, video komersial, atau legalitas media Anda..."
                  className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* reCAPTCHA */}
              <div className="p-3 bg-[#18181C] border border-white/10 rounded flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recaptchaChecked}
                    onChange={(e) => setRecaptchaChecked(e.target.checked)}
                    className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                  />
                  <span className="text-gray-300 font-mono text-xs">
                    Verifikasi Anti-Spam (Google reCAPTCHA v3)
                  </span>
                </label>
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold font-mono uppercase tracking-widest text-xs rounded transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Kirimkan Ke Kantor {activeOfficeTab}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
