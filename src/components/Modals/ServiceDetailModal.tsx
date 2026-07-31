import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const { selectedService, setSelectedService, setCurrentPage } = useApp();

  if (!selectedService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#121214] border border-white/15 rounded-2xl overflow-hidden my-8 shadow-2xl text-white space-y-6">
        <div className="relative aspect-video overflow-hidden bg-black">
          <img
            src={selectedService.sampleImage}
            alt={selectedService.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black text-white rounded-full border border-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono text-[#C5A059] uppercase font-bold block mb-1">
              // DETAIL SPESIFIKASI LAYANAN
            </span>
            <h2 className="text-2xl font-bold font-display uppercase text-white">
              {selectedService.title}
            </h2>
          </div>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            {selectedService.fullDescription}
          </p>

          <div className="space-y-3 p-4 bg-[#18181C] border border-white/10 rounded-xl">
            <span className="text-xs font-mono text-[#C5A059] uppercase font-bold block">
              Output Deliverables & Legal Standard:
            </span>
            <div className="space-y-2 text-xs text-gray-300">
              {selectedService.deliverables?.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setSelectedService(null)}
              className="px-4 py-2 bg-white/10 text-white font-mono text-xs uppercase rounded"
            >
              Tutup
            </button>

            <button
              onClick={() => {
                setSelectedService(null);
                setCurrentPage('contact');
              }}
              className="px-6 py-2.5 bg-[#C5A059] text-black font-bold uppercase font-mono text-xs rounded hover:bg-[#DBC07D]"
            >
              Konsultasi Layanan Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
