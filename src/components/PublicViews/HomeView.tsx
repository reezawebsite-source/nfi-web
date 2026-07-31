import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Film,
  Play,
  ArrowRight,
  ShieldCheck,
  Clapperboard,
  Tv,
  Building2,
  Music,
  Scale,
  Camera,
  Award,
  CheckCircle2,
  Calendar,
  MessageSquare,
  MapPin,
  Send,
  Phone,
  Clock,
  Sparkles,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    portfolio = [],
    services = [],
    news = [],
    team = [],
    testimonials = [],
    partners = [],
    setCurrentPage,
    setSelectedPortfolio,
    setSelectedNews,
    setSelectedService,
    setActiveVideoUrl,
    addInquiry,
    settings,
  } = useApp();

  const safePortfolio = Array.isArray(portfolio) ? portfolio : [];
  const safeServices = Array.isArray(services) ? services : [];
  const safeNews = Array.isArray(news) ? news : [];
  const safeTeam = Array.isArray(team) ? team : [];
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const safePartners = Array.isArray(partners) ? partners : [];

  // Active Portfolio Filter
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    officeTarget: 'Jakarta' as 'Jakarta' | 'Surabaya',
  });
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filterCategories = ['Semua', 'Film', 'Iklan', 'Video Korporat', 'Musik', 'Konten Digital'];

  const filteredPortfolio =
    activeCategory === 'Semua'
      ? safePortfolio.slice(0, 6)
      : safePortfolio.filter((item) => item.category === activeCategory).slice(0, 6);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaChecked) {
      alert('Silakan verifikasi reCAPTCHA terlebih dahulu untuk mengirim pesan.');
      return;
    }
    if (!formData.fullName || !formData.email || !formData.message) {
      alert('Mohon lengkapi semua kolom wajib.');
      return;
    }

    addInquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '-',
      subject: formData.subject || 'Konsultasi Proyek Baru',
      message: formData.message,
      officeTarget: formData.officeTarget,
    });

    setFormSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      officeTarget: 'Jakarta',
    });
    setRecaptchaChecked(false);
  };

  const serviceIconMap: Record<string, React.ReactNode> = {
    Clapperboard: <Clapperboard className="w-6 h-6 text-[#C5A059]" />,
    Tv: <Tv className="w-6 h-6 text-[#C5A059]" />,
    Building2: <Building2 className="w-6 h-6 text-[#C5A059]" />,
    Music: <Music className="w-6 h-6 text-[#C5A059]" />,
    Scale: <Scale className="w-6 h-6 text-[#C5A059]" />,
    Camera: <Camera className="w-6 h-6 text-[#C5A059]" />,
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO BANNER SECTION (Matching Professional Polish Theme) */}
      <section className="relative min-h-[85vh] flex items-center pt-8 overflow-hidden bg-[#0A0A0B]">
        {/* Background Ambient Glow & Cinematic Textures */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 right-12 w-96 h-96 bg-[#C5A059]/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-12 left-12 w-80 h-80 bg-blue-900/10 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>// {settings?.heroBadge || 'HERITAGE PRODUKSI SEJAK ERA 1980-AN'}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight font-display uppercase text-white whitespace-pre-line">
              {settings?.heroTitle ? (
                settings.heroTitle
              ) : (
                <>
                  Mewujudkan Cerita <br />
                  <span className="gold-gradient-text">Menjadi Karya Visual</span> <br />
                  Berkualitas.
                </>
              )}
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              {settings?.heroDescription ||
                settings?.companyDescription ||
                'PT. Nusantara Film Indonesia (bermula dari GH Production) menghadirkan standar sinematografi kelas dunia untuk penceritaan Indonesia.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() =>
                  setActiveVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                }
                className="px-8 py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#DBC07D] transition-all rounded-sm flex items-center space-x-2 shadow-lg shadow-[#C5A059]/20"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Tonton Showreel 2026</span>
              </button>

              <button
                onClick={() => setCurrentPage('portfolio')}
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all rounded-sm"
              >
                Lihat Portofolio
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg text-xs font-mono text-gray-400">
              <div>
                <span className="block text-xl font-bold text-[#C5A059]">40+ Tahun</span>
                <span>Warisan Karya</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-white">150+ Proyek</span>
                <span>Film & Iklan</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-[#C5A059]">Top 10</span>
                <span>Firma Hukum Paripurna</span>
              </div>
            </div>
          </div>

          {/* Hero Right Featured Visual Reel Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000"
                alt="NFI Cinema Set"
                className="w-full h-[420px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Official Logo Watermark Emblem Badge */}
              <div className="absolute top-4 left-4 p-2 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 rounded-xl flex items-center space-x-2.5 shadow-lg">
                <img src="/nfi-logo.svg" alt="NFI Official Logo" className="w-8 h-8 object-contain" />
                <div className="leading-tight pr-1">
                  <span className="block text-[10px] font-bold tracking-widest text-white uppercase font-display">
                    NFI CINEMA
                  </span>
                  <span className="text-[9px] tracking-wider text-[#C5A059] font-mono">
                    OFFICIAL LOGO
                  </span>
                </div>
              </div>

              {/* Play Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() =>
                    setActiveVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                  }
                  className="w-20 h-20 rounded-full border border-white/50 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all cursor-pointer shadow-2xl"
                >
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </button>
              </div>

              {/* Floating Award Badge Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                    Featured Project
                  </span>
                  <span className="text-sm font-bold text-white">
                    Ken Arok: Tumapel Legacy
                  </span>
                </div>
                <div className="px-3 py-1 bg-[#C5A059] text-black text-[10px] font-bold font-mono uppercase rounded">
                  Colossal Cinema
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT COMPANY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000"
                alt="Tentang NFI"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
            </div>

            {/* Floating Director Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 p-5 bg-[#141418] border border-[#C5A059]/40 rounded-xl shadow-2xl max-w-xs">
              <span className="text-xs font-bold text-[#C5A059] block uppercase tracking-wider font-mono">
                Billy Handiwiyanto, S.H., M.H.
              </span>
              <span className="text-[11px] text-gray-400 block">
                Direktur Utama & Counsel
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
              // TENTANG NUSANTARA FILM INDONESIA
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
              Dari GH Production Hingga Era Digitalisasi Nusantara
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Perusahaan kami pada awalnya bernama <strong>GH PRODUCTION</strong>, mulai beraktivitas di sekitar era 1980-an yang bergerak di bidang industri musik dan film dengan hasil karya yang membanggakan. Berbagai pelajaran dan pengalaman berharga menuntun konsistensi kami hingga berevolusi menjadi <strong>PT. Nusantara Film Indonesia</strong>.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              Inovasi senantiasa kami lakukan di setiap perkembangan sosial maupun teknologi sejak jaman analog hingga era digitalisasi saat ini. Didukung penuh tim legal profesional dari <strong>Handiwiyanto Law Office</strong> untuk menjamin sepenuhnya kenyamanan dan keamanan hukum karya cipta Anda.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Sinema Layar Lebar & FTV</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Video Iklan Komersial TVC</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Promotor Rekaman & Konser Musik</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Payung Hukum Advokasi Media</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setCurrentPage('about')}
                className="px-6 py-3 bg-white/10 hover:bg-[#C5A059] hover:text-black text-white text-xs font-bold uppercase tracking-widest transition-all rounded-sm flex items-center space-x-2"
              >
                <span>Selengkapnya Tentang Kami</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // LAYANAN UNTUK KLIEN & MASYARAKAT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase text-white">
            Solusi Sinema & Produksi Terpadu
          </h2>
          <p className="text-gray-400 text-sm">
            Kemasan produk dan layanan dari Konsep, Management, Produksi, hingga kelengkapan payung hukum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="p-6 bg-[#121214] border border-white/10 hover:border-[#C5A059]/50 rounded-xl space-y-4 group transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
                {serviceIconMap[service.iconName] || <Film className="w-6 h-6 text-[#C5A059]" />}
              </div>

              <h3 className="text-lg font-bold font-display uppercase text-white group-hover:text-[#C5A059] transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                {service.shortDescription}
              </p>

              <div className="pt-2 flex items-center text-xs font-bold uppercase tracking-wider text-[#C5A059] group-hover:translate-x-1 transition-transform">
                <span>Detail Layanan</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PORTFOLIO HIGHLIGHT & FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
              // KARYA & PORTOFOLIO KAMI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase text-white">
              Galeri Sinema & Rekaman
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#C5A059] text-black shadow-md'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPortfolio(item)}
              className="group relative bg-[#121214] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-[#C5A059] transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-[#C5A059] text-[10px] font-mono uppercase font-bold rounded-full border border-white/10">
                  {item.category}
                </span>
                <button className="absolute bottom-3 right-3 p-2.5 bg-[#C5A059] text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 fill-black" />
                </button>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>{item.client}</span>
                  <span className="text-[#C5A059]">{item.year}</span>
                </div>
                <h3 className="text-base font-bold font-display uppercase text-white group-hover:text-[#C5A059] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentPage('portfolio')}
            className="px-8 py-3 bg-[#18181C] border border-white/20 text-white hover:bg-[#C5A059] hover:text-black font-bold uppercase tracking-widest text-xs transition-all rounded-sm"
          >
            Lihat Semua Karya Portofolio
          </button>
        </div>
      </section>

      {/* 5. LATEST NEWS & ARTICLES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
              // BERITA & Wawasan SILAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase text-white">
              Artikel & Kabar NFI
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('news')}
            className="hidden sm:flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:underline"
          >
            <span>Semua Artikel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedNews(post)}
              className="bg-[#121214] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A059]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-[10px] font-mono text-[#C5A059] font-bold uppercase rounded">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-3 text-[11px] text-gray-400 font-mono">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 text-[#C5A059] mr-1" />
                      {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>{post.readingTimeMinutes} mnt</span>
                  </div>

                  <h3 className="text-base font-bold font-display uppercase text-white group-hover:text-[#C5A059] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold uppercase text-[#C5A059]">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS & CLIENT LOGO WALL */}
      <section className="bg-[#050505] py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
              // APRESIASI & MITRA STRATEGIS
            </span>
            <h2 className="text-3xl font-bold font-display uppercase text-white">
              Apa Kata Klien & Partner
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safeTestimonials.map((test) => (
              <div
                key={test.id}
                className="p-6 bg-[#0E0E10] border border-white/10 rounded-xl space-y-4 relative"
              >
                <div className="flex items-center space-x-1 text-[#C5A059]">
                  {[...Array(test.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xs text-gray-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="pt-2 flex items-center space-x-3 border-t border-white/5">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <span className="block text-xs font-bold text-white">
                      {test.name}
                    </span>
                    <span className="block text-[10px] text-gray-400 font-mono">
                      {test.role}, {test.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Badges */}
          <div className="pt-8 border-t border-white/10">
            <span className="block text-center text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-6">
              Mitra Produksi, Sponsoring, & Advokasi Hukum Terpercaya
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center opacity-70">
              {safePartners.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-white/5 border border-white/5 rounded-lg text-center space-y-1 hover:opacity-100 hover:border-[#C5A059]/40 transition-all"
                >
                  <span className="block text-xs font-bold text-white">{p.name}</span>
                  <span className="block text-[10px] text-[#C5A059] font-mono">{p.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT CTA & INTERACTIVE FORM WITH RECAPTCHA SIMULATION */}
      <section id="home-contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121214] border border-white/15 rounded-2xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
              // KONTAK & PEMESANAN PROYEK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display uppercase text-white leading-tight">
              Mari Diskusi Karya Sinematik Anda
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tim produser dan konsultan media kami siap membantu merencanakan alokasi skenario, anggaran, jadwal syuting, hingga pendaftaran perlindungan hukum.
            </p>

            <div className="space-y-4 text-xs text-gray-300 pt-2 font-mono">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">JAKARTA HEADQUARTERS</span>
                  <span>{settings.jakartaOfficeAddress}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">SURABAYA OFFICE</span>
                  <span>{settings.surabayaOfficeAddress}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>WhatsApp Hotline: {settings.whatsappNumber}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>{settings.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-[#0A0A0B] p-6 sm:p-8 rounded-xl border border-white/10 space-y-4">
            {formSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto" />
                <h3 className="text-xl font-bold font-display uppercase text-white">
                  Pesan Anda Telah Terkirim!
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed max-w-md mx-auto">
                  Terima kasih telah menghubungi PT. Nusantara Film Indonesia. Tim kami akan merespons pesan Anda dalam kurun waktu 1x24 jam kerja.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-[#C5A059] text-black text-xs font-bold uppercase rounded"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 font-mono mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Contoh: Budi Gunawan"
                      className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-mono mb-1">
                      Email Perusahaan / Pribadi *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="nama@perusahaan.co.id"
                      className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 font-mono mb-1">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+62 812..."
                      className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-mono mb-1">
                      Target Kantor
                    </label>
                    <select
                      value={formData.officeTarget}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          officeTarget: e.target.value as 'Jakarta' | 'Surabaya',
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Jakarta">Jakarta Office (Kebayoran Baru)</option>
                      <option value="Surabaya">Surabaya Office (Jl. Seruni)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 font-mono mb-1">Subjek Proyek</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Contoh: Pembuatan Iklan Komersial TVC 2026"
                    className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-mono mb-1">Rincian Pesan *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tuliskan gambaran konsep, estimasi waktu, atau kebutuhan produksi Anda..."
                    className="w-full px-4 py-2.5 bg-[#18181C] border border-white/10 rounded text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Google reCAPTCHA Verification Simulation */}
                <div className="p-3 bg-[#18181C] border border-white/10 rounded flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={recaptchaChecked}
                      onChange={(e) => setRecaptchaChecked(e.target.checked)}
                      className="w-4 h-4 accent-[#C5A059] rounded cursor-pointer"
                    />
                    <span className="text-gray-300 font-mono text-xs">
                      Saya bukan robot (Google reCAPTCHA Protected)
                    </span>
                  </label>
                  <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold uppercase tracking-widest text-xs rounded transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Ke Tim Produksi</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
