import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, ArrowRight, ShieldCheck, Film } from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const { selectedService, setSelectedService, setCurrentPage } = useApp();

  if (!selectedService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#121214] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8 text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#18181C]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
              <Film className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold uppercase text-[#C5A059]">
              Layanan Utama NFI
            </span>
          </div>
          <button
            onClick={() => setSelectedService(null)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Service Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase text-white mb-2">
              {selectedService.title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {selectedService.shortDescription}
            </p>
          </div>

          {/* Sample Image Showcase */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
            <img
              src={selectedService.sampleImage}
              alt={selectedService.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
              Cakupan & Metodologi Kerja
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedService.fullDescription}
            </p>
          </div>

          {/* Deliverables Checklist */}
          {selectedService.deliverables && selectedService.deliverables.length > 0 && (
            <div className="space-y-3 p-5 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                Hasil Akhir & Output Karya (Deliverables):
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {selectedService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Shield Note */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center space-x-3 text-xs text-amber-200">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
            <span>
              Seluruh pengerjaan layanan ini dijamin dan dilindungi payung hukum terpadu Handiwiyanto Law Office (Perizinan, Hak Cipta, & Lisensi).
            </span>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setSelectedService(null)}
              className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white"
            >
              Kembali
            </button>

            <button
              onClick={() => {
                setSelectedService(null);
                setCurrentPage('contact');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-[#DBC07D] transition-colors flex items-center justify-center space-x-2"
            >
              <span>Konsultasi Proyek Layanan Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
