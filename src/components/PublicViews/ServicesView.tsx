import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clapperboard,
  Tv,
  Building2,
  Music,
  Scale,
  Camera,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { services = [], setSelectedService, setCurrentPage } = useApp();
  const safeServices = Array.isArray(services) ? services : [];

  const serviceIconMap: Record<string, React.ReactNode> = {
    Clapperboard: <Clapperboard className="w-8 h-8 text-[#C5A059]" />,
    Tv: <Tv className="w-8 h-8 text-[#C5A059]" />,
    Building2: <Building2 className="w-8 h-8 text-[#C5A059]" />,
    Music: <Music className="w-8 h-8 text-[#C5A059]" />,
    Scale: <Scale className="w-8 h-8 text-[#C5A059]" />,
    Camera: <Camera className="w-8 h-8 text-[#C5A059]" />,
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="py-20 bg-[#0E0E10] border-b border-white/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // SERVICE OFFERINGS
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-display uppercase text-white tracking-tight">
            Layanan Produksi & Media Terpadu
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Menyediakan kemasan produk dan layanan dari Konsep, Manajemen, Produksi/Penyelenggaraan hingga kelengkapan payung hukum terpadu.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {safeServices.map((service, index) => (
          <div
            key={service.id}
            className={`p-8 sm:p-10 bg-[#121214] border border-white/10 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-[#C5A059]/40 transition-colors ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center">
                {serviceIconMap[service.iconName] || <Clapperboard className="w-8 h-8 text-[#C5A059]" />}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase text-white">
                {service.title}
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Deliverables */}
              {service.deliverables && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-[#C5A059] uppercase font-bold block">
                    Output & Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => setSelectedService(service)}
                  className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-[#DBC07D] transition-colors"
                >
                  Detail Layanan
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-6 py-2.5 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-white/5 transition-colors"
                >
                  Konsultasi Proyek
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={service.sampleImage}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
