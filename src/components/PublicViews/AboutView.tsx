import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, Film, Users, Target, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentPage } = useApp();

  const timelineEvents = [
    {
      year: '1980-an',
      title: 'Awal Berdiri: GH Production',
      desc: 'Mulai beraktivitas memproduksi karya musik dan pementasan film analog di Indonesia dengan komitmen kualitas tinggi.',
    },
    {
      year: '1988',
      title: 'Perhelatan Konser Rock "Surya Rock Star"',
      desc: 'GH Enterprise menyelenggarakan konser rock kolosal berskala nasional bekerjasama dengan PT. Gudang Garam Kediri.',
    },
    {
      year: '1989',
      title: 'Rilis Album Pop Anie Carera - Walau Seribu Tahun',
      desc: 'GH Record memproduksi album musik pop legendaris kedua Anie Carera yang meraih apresiasi musik nasional.',
    },
    {
      year: '2002',
      title: 'Produksi Film Sejarah "Ken Arok"',
      desc: 'Penayangan sinema kolosal sejarah Mpu Gandring & Tumapel dibintangi George Rudy, Donny Kesuma, dan Christy Jusung.',
    },
    {
      year: '2020-an',
      title: 'Transformasi PT. Nusantara Film Indonesia',
      desc: 'Ekspansi jaringan sinema digital, armada drone 4K, video korporat BUMN, serta integrasi payung hukum terpadu Handiwiyanto Law Office.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="relative py-20 bg-[#0E0E10] border-b border-white/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // PROFILE KORPORAT
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-display uppercase text-white tracking-tight">
            Tentang Nusantara Film Indonesia
          </h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Perjalanan dedikasi sinematografi, musik, dan advokasi media sejak jaman analog hingga era digitalisasi terkini.
          </p>
        </div>
      </section>

      {/* Heritage Content & Legacy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-bold font-display uppercase text-white leading-tight">
              Warisan Kreativitas & Konsistensi Berkarya
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Perusahaan kami pada awalnya bernama <strong>GH PRODUCTION</strong>, mulai beraktivitas di sekitar era 80-an yang bergerak di bidang industri musik dan film dengan hasil yang cukup membanggakan. Dalam perjalanannya, berbagai pelajaran dan pengalaman telah banyak kami dapat, sehingga sampai saat inipun kami tetap berkonsisten melayani, berproduksi serta berkarya di bidang Sinema Layar Lebar maupun Elektronik, Film Iklan, Konser Musik, Promotor Rekaman serta Penyelenggara berbagai acara.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Inovasi-inovasi senantiasa kami lakukan di setiap perkembangan sosial maupun teknologi sejak dari jaman analog hingga era digitalisasi saat ini. Perusahaan kami didukung oleh tim legal profesional yang selalu menjamin sepenuhnya kenyamanan dan keamanan produk/layanan kami dari segi aspek hukum. Bisa dikatakan bahwa kemasan produk kami merupakan layanan terpadu, mulai dari Konsep, Management, Produksi/Penyelenggaraan hingga kelengkapan payung hukum atau Firma Hukum.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000"
                alt="Heritage Studio"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl">
                <span className="text-xs font-mono text-[#C5A059] uppercase font-bold block">
                  Integrated Legal Media Production
                </span>
                <span className="text-sm font-bold text-white block">
                  NFI & Handiwiyanto Law Office Partnership
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="bg-[#080809] py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#121214] border border-white/10 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display uppercase text-white">
              Visi Perusahaan
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Menjadi rumah produksi sinema, iklan, dan media terdepan di Indonesia yang menginspirasi publik melalui kekuatan penceritaan visual yang otentik, estetik, dan terlindungi secara hukum di kancah nasional maupun internasional.
            </p>
          </div>

          <div className="p-8 bg-[#121214] border border-white/10 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display uppercase text-white">
              Misi Perusahaan
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>Menghasilkan karya film, video iklan, dan rekaman audio berkualitas standar bioskop tinggi.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>Memadukan teknologi kamera & tata cahaya modern dengan nilai penceritaan emosional.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>Memberikan kepastian hukum penuh atas hak cipta dan lisensi karya setiap klien.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Historical Timeline Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#C5A059] uppercase tracking-[0.2em] font-bold">
            // JEJAK LANGKAH PERJALANAN
          </span>
          <h2 className="text-3xl font-bold font-display uppercase text-white">
            Garis Waktu Perjalanan GH Production ke NFI
          </h2>
        </div>

        <div className="relative border-l-2 border-[#C5A059]/30 pl-6 ml-4 sm:ml-32 space-y-10">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0A0A0B] border-2 border-[#C5A059] group-hover:bg-[#C5A059] transition-colors" />

              {/* Year label on left on desktop */}
              <span className="sm:absolute sm:-left-36 sm:top-0 text-sm font-mono font-bold text-[#C5A059] block mb-1 sm:mb-0">
                {evt.year}
              </span>

              <div className="bg-[#121214] p-6 rounded-xl border border-white/10 space-y-2 hover:border-[#C5A059]/40 transition-colors">
                <h4 className="text-base font-bold font-display uppercase text-white">
                  {evt.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-10 bg-[#121214] border border-white/15 rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold font-display uppercase text-white">
            Siap Bekerja Sama Dengan Tim Nusantara Film Indonesia?
          </h3>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            Diskusikan kebutuhan ide sinema, video profil korporat, maupun kampanye komersial brand Anda bersama tim produser kami.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-3.5 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-[#DBC07D] transition-colors"
          >
            Hubungi Tim Produksi
          </button>
        </div>
      </section>
    </div>
  );
};
