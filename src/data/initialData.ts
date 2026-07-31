import {
  PortfolioItem,
  NewsPost,
  ServiceOffering,
  TeamMember,
  ContactInquiry,
  Testimonial,
  Partner,
  MediaFile,
  ActivityLogItem,
  GeneralSettings,
  UserAccount,
} from '../types';

export const initialGeneralSettings: GeneralSettings = {
  websiteName: 'PT. Nusantara Film Indonesia',
  tagline: 'Mewujudkan Cerita Menjadi Karya Visual Berkualitas',
  heroBadge: 'HERITAGE PRODUKSI SEJAK ERA 1980-AN',
  heroTitle: 'Mewujudkan Cerita Menjadi Karya Visual Berkualitas',
  heroDescription:
    'PT. Nusantara Film Indonesia (bermula dari GH Production) menghadirkan standar sinematografi kelas dunia untuk penceritaan Indonesia. Dari film layar lebar, TVC komersial, video korporat, hingga advokasi hukum media terpadu.',
  companyDescription:
    'PT. Nusantara Film Indonesia (bermula dari GH Production sejak era 1980-an) adalah rumah produksi independen yang bergerak di bidang sinema layar lebar, film iklan, video korporat, promotor musik, dan layanan hukum terpadu.',
  jakartaOfficeAddress: 'Jl. Barito II No. 11A, Kebayoran Baru, Jakarta Selatan 12130',
  jakartaOfficePhone: '+62 815-1111-9398 / +62 812-3456-7890',
  surabayaOfficeAddress: 'Jl. Seruni No. 53, Surabaya 60272',
  surabayaOfficePhone: '+62 31-532-1680',
  contactEmail: 'info@nfi.co.id',
  workingHours: 'Senin - Jumat: 09:00 - 17:00 WIB',
  whatsappNumber: '+6281511119398',
  googleAnalyticsId: 'G-NFI2026FILM',
  googleTagManagerId: 'GTM-NFI8800',
  googleMapsEmbedJakarta:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.082729731675!2d106.7938!3d-6.2528!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f109289196d9%3A0x6b42b26090412b10!2sJl.%20Barito%20II%20No.11A%2C%20Kebayoran%20Baru!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  googleMapsEmbedSurabaya:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.925!2d112.748!3d-7.262!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9602!2sJl.%20Seruni%20No.53%2C%20Surabaya!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  instagramUrl: 'https://instagram.com/nusantarafilmindonesia_',
  youtubeUrl: 'https://youtube.com/@nusantarafilmindonesia',
  facebookUrl: 'https://facebook.com/nusantarafilmindonesia',
  linkedinUrl: 'https://linkedin.com/company/nusantarafilmindonesia',
  smtpHost: 'smtp.nfi.co.id',
  smtpPort: 465,
  smtpUsername: 'admin@nfi.co.id',
  seoDefaultTitle: 'PT. Nusantara Film Indonesia | Production House & Creative Agency',
  seoDefaultDescription:
    'Rumah produksi sinema layar lebar, iklan TV, video korporat, promotor musik & rekaman, serta perlindungan hukum karya cipta di Indonesia.',
  maintenanceMode: false,
};

export const initialPortfolio: PortfolioItem[] = [
  {
    id: 'port-1',
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0001',
    title: 'Ken Arok: Rahasia Takdir Tumapel',
    slug: 'ken-arok-rahasia-takdir-tumapel',
    category: 'Film',
    client: 'GH Production / PT. Nusantara Film Indonesia',
    year: 2002,
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&q=80&w=1200',
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Film kolosal sejarah epik menceritakan perjalanan Ken Arok dari anak angkat Ki Lembong dan Bango Samparan hingga menjadi penguasa Tumapel bergelar Sri Rajasa, lengkap dengan intrik keris Mpu Gandring.',
    synopsis:
      'Ken Arok lahir dari Ken Endok dan dibesarkan di lingkungan keras. Pengalaman melihat penderitaan rakyat miskin membuka hatinya untuk membela mereka. Pertemuannya dengan Ken Dedes dan intrik Mpu Gandring mengubah peta sejarah kerajaan Tumapel secara abadi.',
    director: 'SA. Karim & George Rudy',
    cast: ['George Rudy', 'Donny Kesuma', 'Christy Jusung', 'Jack Rio Altriara'],
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'port-2',
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0002',
    title: 'Anie Carera - Walau Seribu Tahun',
    slug: 'anie-carera-walau-seribu-tahun',
    category: 'Musik',
    client: 'GH Record / NFI Music',
    year: 1989,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Album legendaris kedua dari legenda musik pop Indonesia Anie Carera, diproduksi di bawah naungan GH Record (cikal bakal NFI Music). Memperoleh penghargaan musik nasional.',
    director: 'George Handiwiyanto',
    cast: ['Anie Carera', 'Areng Widodo (Music Arranger)'],
    featured: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'port-3',
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0003',
    title: 'Suraya Rock Star 1988 & Surabaya Rock Band "Teror"',
    slug: 'suraya-rock-star-1988-teror',
    category: 'Musik',
    client: 'GH Enterprise & PT. Gudang Garam Kediri',
    year: 1988,
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Konser kolosal dan perhelatan panggung musik rock terbesar Jawa Timur era 1988 menampilkan SAS, Sonatha Tanjung, Arthur Kaunang, Syech Abidin, dan AKA Harahap.',
    director: 'GH Enterprise SBY',
    cast: ['Surabaya Rock Band (SRB)', 'Thomas', 'Gatuk Gondez', 'Mustich BK', 'Gita Nikki'],
    featured: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'port-4',
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0004',
    title: 'Iklan Komersial Bank Nusantara 2025',
    slug: 'iklan-komersial-bank-nusantara-2025',
    category: 'Iklan',
    client: 'Bank Nusantara',
    year: 2025,
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Video komersial resolusi 4K Anamorphic untuk penayangan TV nasional dan kampanye digital media sosial dengan tema Kemudahan Transaksi Digital.',
    director: 'Dimas Arya',
    cast: ['Reza Rahadian', 'Tara Basro'],
    featured: true,
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'port-5',
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0005',
    title: 'Company Profile Trans-Java Megaproject',
    slug: 'company-profile-trans-java-megaproject',
    category: 'Video Korporat',
    client: 'Kementerian PUPR & BUMN Konsorsium',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Video korporat eksklusif pemetaan infrastruktur dengan pengambilan gambar udara (drone FPV & Heavy Lift Cinema Rig) serta grafis gerak (motion graphics 3D).',
    director: 'Budi Santoso',
    cast: ['Narrator: Ario Bayu'],
    featured: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
  },
  {
    id: 'port-6',
    uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0006',
    title: 'Seri Dokumenter: Pesona Budaya Nusantara',
    slug: 'seri-dokumenter-pesona-budaya-nusantara',
    category: 'Konten Digital',
    client: 'Kementerian Pariwisata & Media Internasional',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    ],
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Serial dokumenter 6 episode mengeksplorasi kearifan lokal, wayang, tarian daerah, serta kerajinan tradisional dengan kualitas sinematik standar bioskop.',
    director: 'Dimas Arya',
    cast: ['Rina Kartika (Producer)'],
    featured: false,
    createdAt: '2024-08-05T10:00:00Z',
    updatedAt: '2024-08-05T10:00:00Z',
  },
];

export const initialServices: ServiceOffering[] = [
  {
    id: 'serv-1',
    uuid: 's1-uuid-001',
    title: 'Produksi Film & Sinema',
    slug: 'produksi-film-sinema',
    iconName: 'Clapperboard',
    shortDescription:
      'Layanan produksi film pendek, feature film layar lebar, dokumenter, serta sinema elektronik dengan standar internasional.',
    fullDescription:
      'PT. Nusantara Film Indonesia menyediakan ekosistem pembuatan film secara utuh (End-to-End Film Production). Mulai dari pengembangan skenario, casting sutradara & pemain, lokasi syuting, kru teknis berlisensi, peralatan kamera bioskop RED/ARRI, hingga post-production (color grading Davinci Resolve, sound design Dolby Atmos, & visual effects).',
    deliverables: [
      'Master Film DCP (Digital Cinema Package) 4K',
      'Sound Mixing 5.1 & Dolby Atmos',
      'Trailers, Teaser & Marketing Asset Kit',
      'Dokumentasi Behind the Scenes (BTS)',
      'Registrasi Lisensi & Hak Cipta Hak Kekayaan Intelektual (HKI)',
    ],
    sampleImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
    featured: true,
  },
  {
    id: 'serv-2',
    uuid: 's2-uuid-002',
    title: 'Iklan & Komersial Video',
    slug: 'iklan-komersial-video',
    iconName: 'Tv',
    shortDescription:
      'Pembuatan video iklan komersial untuk penayangan Televisi (TVC), Digital Platform, YouTube Ads, & Social Media Viral.',
    fullDescription:
      'Kami membantu brand Anda menyampaikan pesan secara berdampak tinggi. Didukung tim kreatif, sutradara komersial berpengalaman, dan peralatan pencahayaan kelas atas untuk visual produk yang elegan dan memikat pembeli.',
    deliverables: [
      'TV Commercial 30s & 15s Cutdown',
      'Vertical Video Aspect 9:16 (TikTok/Reels)',
      'High-Resolution Still Photography Assets',
      'Color Graded Master Files 1080p / 4K',
    ],
    sampleImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
    featured: true,
  },
  {
    id: 'serv-3',
    uuid: 's3-uuid-003',
    title: 'Video Korporat & Profile',
    slug: 'video-korporat-profile',
    iconName: 'Building2',
    shortDescription:
      'Video company profile, pelaporan kinerja tahunan, event liputan eksekutif, dan presentasi investor berkelas.',
    fullDescription:
      'Representasikan profesionalisme perusahaan Anda di mata publik, klien, dan investor dengan video profil korporat yang sinematik, inspiratif, dan persuasif.',
    deliverables: [
      'Full Company Profile Video (3-5 menit)',
      'Executive Interview Sessions',
      'Aerial Infrastructure & Factory Drone Footage',
      'Subtitles Bahasa Indonesia & English',
    ],
    sampleImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
    featured: true,
  },
  {
    id: 'serv-4',
    uuid: 's4-uuid-004',
    title: 'Promotor Musik & Konser',
    slug: 'promotor-musik-konser',
    iconName: 'Music',
    shortDescription:
      'Penyelenggaraan konser musik nasional & mancanegara, festival seni budaya, serta acara hiburan berskala besar.',
    fullDescription:
      'Bermula dari pengalaman GH Enterprise menggelar Surya Rock Star 1988, kami berpengalaman dalam menangani izin kepolisian, tata panggung lighting sound system megah, dan penanganan artis kelas dunia.',
    deliverables: [
      'Event Management & Stage Operations',
      'Sound System & Multi-Angle Live Camera Broadcast',
      'Perizinan Tempat & Legalitas Keramaian',
      'Sponsorship Management',
    ],
    sampleImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    featured: true,
  },
  {
    id: 'serv-5',
    uuid: 's5-uuid-005',
    title: 'Produser Musik & Label Rekaman',
    slug: 'produser-musik-label-rekaman',
    iconName: 'Disc',
    shortDescription:
      'Produksi lagu studio, komposisi musik film (Original Soundtrack), aransemen, dan pendaftaran royalti lagu.',
    fullDescription:
      'Jasa rekaman musik profesional (GH Record) untuk penyanyi, grup band, maupun kebutuhan musik latar film bioskop. Dikelola oleh produser & arranger legendaris.',
    deliverables: [
      'Mixing & Mastering High-Definition Audio',
      'Publishing & Digital Distribution (Spotify, Apple Music, YouTube)',
      'Pendaftaran Hak Cipta Musik HKI',
    ],
    sampleImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
    featured: false,
  },
  {
    id: 'serv-6',
    uuid: 's6-uuid-006',
    title: 'Firma Hukum & Advokasi Media',
    slug: 'firma-hukum-advokasi-media',
    iconName: 'Scale',
    shortDescription:
      'Perlindungan payung hukum karya sinema, lisensi hak cipta, kontrak artis, serta advokasi legal media oleh Handiwiyanto Law Office.',
    fullDescription:
      'Satu-satunya rumah produksi terpadu di Indonesia yang didukung penuh oleh Firma Hukum Top 10 Indonesia (Handiwiyanto Law Office). Menjamin kenyamanan dan kepastian hukum aset, kontrak produksi, dan hak kekayaan intelektual.',
    deliverables: [
      'Penyusunan Kontrak Kerja & Talent Agreement',
      'Pendaftaran Hak Cipta & Merek Dagang',
      'Penyelesaian Sengketa Hak Kekayaan Intelektual',
      'Legal Clearance Dokumen Penayangan Sinema',
    ],
    sampleImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    featured: true,
  },
  {
    id: 'serv-7',
    uuid: 's7-uuid-007',
    title: 'Konten Digital, Drone & Motion Graphic',
    slug: 'konten-digital-drone-motion-graphic',
    iconName: 'Camera',
    shortDescription:
      'Sinematografi udara (Drone 4K), animasi motion graphics 2D/3D, serta manajemen konten kreatif media sosial.',
    fullDescription:
      'Layanan pemuatan visual udara menggunakan drone berlisensi pilot FPV/heavy lift dan kreasi grafis bergerak dinamis untuk kebutuhan promosi brand modern.',
    deliverables: [
      'Raw & Graded 4K Aerial Video Footage',
      'Animated Logo & Lower Thirds Package',
      'Short-form Viral Content Strategy',
    ],
    sampleImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    featured: false,
  },
];

export const initialNews: NewsPost[] = [
  {
    id: 'news-1',
    uuid: 'n1-uuid-001',
    title: 'PT. Nusantara Film Indonesia Raih Penghargaan Sinematografi Terbaik 2025',
    slug: 'pt-nusantara-film-indonesia-raih-penghargaan-sinematografi-terbaik-2025',
    category: 'Penghargaan',
    tags: ['Cinema', 'Awards', 'Nusantara Film', 'Karya Anak Bangsa'],
    summary:
      'PT. Nusantara Film Indonesia kembali mengharumkan nama bangsa di ajang perfilman regional melalui pencapaian sinematografi dan tata cahaya terbaik.',
    content: `
<p>PT. Nusantara Film Indonesia resmi menerima tropi Penghargaan Sinematografi Terbaik dalam festival karya visual tahunan yang diselenggarakan di Jakarta. Pencapaian ini membuktikan bahwa kualitas teknis dan kedalaman cerita produksi nasional mampu bersaing di level internasional.</p>

<p>Direktur Utama NFI menyampaikan: <em>"Inovasi visual yang kami kembangkan merupakan perpaduan antara teknologi kamera bioskop termutakhir dan sentuhan kearifan lokal yang kaya akan estetika Nusantara."</em></p>

<h3>Komitmen Terhadap Standar Internasional</h3>
<p>Sejak pertama kali berkarya di era 1980-an dengan nama GH Production, komitmen perusahaan tidak pernah berubah: menghadirkan karya yang tidak hanya menghibur, tetapi juga memicu diskusi positif di tengah masyarakat.</p>
`,
    author: 'Redaksi NFI',
    authorRole: 'Senior Editor',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    featuredImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    publishedAt: '2025-06-12T09:00:00Z',
    readingTimeMinutes: 4,
    seoTitle: 'PT Nusantara Film Indonesia Raih Penghargaan Sinematografi Terbaik',
    seoDescription: 'Berita resmi PT Nusantara Film Indonesia memenangkan penghargaan sinematografi terbaik di festival film nasional.',
    createdAt: '2025-06-12T09:00:00Z',
    updatedAt: '2025-06-12T09:00:00Z',
  },
  {
    id: 'news-2',
    uuid: 'n2-uuid-002',
    title: 'Tren Video Marketing 2026: Dominasi Sinematik & Storytelling Emosional',
    slug: 'tren-video-marketing-2026-dominasi-sinematik-storytelling-emosional',
    category: 'Edukasi',
    tags: ['Video Marketing', 'Commercial', 'Branding', 'Tips Film'],
    summary:
      'Pelajari bagaimana pendekatan penceritaan berbasis film bioskop kini menjadi strategi utama brand-brand besar dalam menarik simpati konsumen.',
    content: `
<p>Perkembangan teknologi konsumen mengubah cara publik menikmati iklan komersial. Iklan yang berdurasi singkat namun mengusung alur cerita dramatis terbukti memiliki angka engagement 300% lebih tinggi dibandingkan iklan penjualan konvensional.</p>

<p>Dalam tulisan ini, tim kreatif PT. Nusantara Film Indonesia membedah 3 pilar utama tren video marketing mendatang:</p>
<ol>
  <li><strong>Pencahayaan Atmosferik:</strong> Menggunakan palet warna hangat dan kontras lembut.</li>
  <li><strong>Voice Over Autentik:</strong> Karakter suara yang membumi tanpa terkesan memaksa.</li>
  <li><strong>Pesan Budaya:</strong> Mengangkat nilai-nilai kebersamaan dan kekeluargaan.</li>
</ol>
`,
    author: 'Budi Santoso',
    authorRole: 'Direktur Kreatif',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    featuredImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    publishedAt: '2025-05-20T10:30:00Z',
    readingTimeMinutes: 3,
    seoTitle: 'Tren Video Marketing 2026 - Analisis PT Nusantara Film Indonesia',
    seoDescription: 'Panduan lengkap tren video komersial dan sinematik marketing tahun 2026 dari praktisi industri film.',
    createdAt: '2025-05-20T10:30:00Z',
    updatedAt: '2025-05-20T10:30:00Z',
  },
  {
    id: 'news-3',
    uuid: 'n3-uuid-003',
    title: 'Pentingnya Payung Hukum & Lisensi Dalam Industri Kreatif Sinema',
    slug: 'pentingnya-payung-hukum-lisensi-dalam-industri-kreatif-sinema',
    category: 'Hukum & HKI',
    tags: ['Legal', 'HKI', 'Hak Cipta', 'Firma Hukum'],
    summary:
      'Sinergi NFI dan Handiwiyanto Law Office dalam memberikan kepastian hukum bagi setiap aset video, musik, dan kontrak sutradara.',
    content: `
<p>Banyak produser independen menghadapi kendala distribusi akibat lemahnya perlindungan hak cipta dan draf perjanjian lisensi. Sebagai bentuk komitmen pada ekosistem sinema yang sehat, PT. Nusantara Film Indonesia terintegrasi dengan advokasi hukum profesional.</p>

<p>Setiap karya yang diproduksi dilindungi payung hukum penuh mulai dari tahap penulisan naskah hingga distribusi layar lebar.</p>
`,
    author: 'Billy Handiwiyanto, S.H., M.H.',
    authorRole: 'Direktur / Counsel',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    featured: false,
    publishedAt: '2025-04-10T14:15:00Z',
    readingTimeMinutes: 5,
    seoTitle: 'Perlindungan Hukum & Hak Cipta Sinema - NFI & Handiwiyanto Law Office',
    seoDescription: 'Edukasi pentingnya perlindungan hak kekayaan intelektual (HKI) dalam industri film Indonesia.',
    createdAt: '2025-04-10T14:15:00Z',
    updatedAt: '2025-04-10T14:15:00Z',
  },
];

export const initialTeam: TeamMember[] = [
  {
    id: 'team-1',
    uuid: 't1-uuid-001',
    name: 'Billy Handiwiyanto, S.H., M.H.',
    position: 'Direktur Utama & Penasihat Hukum',
    department: 'Direksi & Legal',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    biography:
      'Billy Handiwiyanto merupakan pimpinan PT. Nusantara Film Indonesia sekaligus advokat senior dari Handiwiyanto Law Office (Top 10 Litigation Law Firm Indonesia). Beliau memadukan visi manajemen produksi film berskala besar dengan perlindungan legalitas hak cipta yang kokoh.',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      email: 'billy@nfi.co.id',
    },
    order: 1,
  },
  {
    id: 'team-2',
    uuid: 't2-uuid-002',
    name: 'Andi Pratama',
    position: 'Direktur Operasional Production',
    department: 'Produksi',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    biography:
      'Pengalaman lebih dari 15 tahun mengelola manajemen lokasi syuting, kru teknis, serta pengadaan armada peralatan sinematografi untuk puluhan judul iklan TVC dan layar lebar.',
    socials: {
      email: 'andi@nfi.co.id',
    },
    order: 2,
  },
  {
    id: 'team-3',
    uuid: 't3-uuid-003',
    name: 'Rina Kartika',
    position: 'Produser Eksekutif',
    department: 'Produksi',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    biography:
      'Produser kawakan yang menangani perencanaan alokasi anggaran, jalinan sponsor, dan distribusi internasional film dokumenter serta film pendek layar lebar.',
    socials: {
      instagram: 'https://instagram.com',
      email: 'rina@nfi.co.id',
    },
    order: 3,
  },
  {
    id: 'team-4',
    uuid: 't4-uuid-004',
    name: 'Dimas Arya',
    position: 'Sutradara / Head Director',
    department: 'Kreatif & Sutradara',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    biography:
      'Sutradara muda berbakat peraih berbagai festival sinematografi dengan spesialisasi pencahayaan dramatis dan penceritaan emosional mendalam.',
    socials: {
      instagram: 'https://instagram.com',
      email: 'dimas@nfi.co.id',
    },
    order: 4,
  },
  {
    id: 'team-5',
    uuid: 't5-uuid-005',
    name: 'Budi Santoso',
    position: 'Direktur Kreatif & Motion Arts',
    department: 'Desain & VFX',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    biography:
      'Pakar visual efek (VFX) dan pengarah grafis animasi 3D yang bertanggung jawab menciptakan estetika visual berkelas internasional.',
    socials: {
      email: 'budi@nfi.co.id',
    },
    order: 5,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'H. Sunarto Sumo Prawiro',
    role: 'Produser / Inisiator Project Film',
    company: 'GH Production',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    quote:
      'Kerja sama dengan Nusantara Film Indonesia sejak dulu selalu memuaskan. Ketelitian dari penulisan skenario hingga penyuntingan akhir sangat profesional!',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Ir. Hendra Wijaya',
    role: 'Corporate Communications VP',
    company: 'PT Trans-Java Infrastruktur',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    quote:
      'Video Profil Perusahaan kami mendapatkan apresiasi luar biasa dari pemegang saham. Kualitas sinematografi udara dan voice over sangat berkelas.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Maya Sastrawan',
    role: 'Marketing Director',
    company: 'Brand Kecantikan Nusantara',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    quote:
      'Iklan komersial yang diproduksi NFI menghasilkan respon penjualan luar biasa di media sosial dan TV nasional.',
    rating: 5,
  },
];

export const initialPartners: Partner[] = [
  {
    id: 'part-1',
    name: 'PT. Gudang Garam Kediri',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300',
    category: 'Korporat Sponsoring',
  },
  {
    id: 'part-2',
    name: 'Handiwiyanto Law Office (Top 10 Litigation Firm)',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300',
    category: 'Advokasi Hukum & HKI',
  },
  {
    id: 'part-3',
    name: 'GH Enterprise & GH Record',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300',
    category: 'Heritage Label Musik',
  },
  {
    id: 'part-4',
    name: 'Kementerian Pariwisata RI',
    logo: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=300',
    category: 'Mitra Instansi',
  },
];

export const initialInquiries: ContactInquiry[] = [
  {
    id: 'inq-1',
    uuid: 'inq-uuid-001',
    fullName: 'Satria Dewa',
    email: 'satria@brandperkasa.co.id',
    phone: '+6281298765432',
    subject: 'Penawaran Kerjasama Iklan TVC 2026',
    message: 'Halo Tim NFI, kami bermaksud mendiskusikan anggaran dan konsep pembuatan video komersial produk terbaru kami untuk kuartal mendatang.',
    officeTarget: 'Jakarta',
    status: 'Unread',
    createdAt: '2026-07-27T14:20:00Z',
  },
  {
    id: 'inq-2',
    uuid: 'inq-uuid-002',
    fullName: 'Dra. Endang Rahayu',
    email: 'endang@dinaspariwisata.go.id',
    phone: '+628113456789',
    subject: 'Pembuatan Dokumenter Kebudayaan Jawa Timur',
    message: 'Kami tertarik untuk bekerjasama dalam pembuatan film dokumenter festival budaya. Mohon informasi prosedur pertemuan dengan produser.',
    officeTarget: 'Surabaya',
    status: 'Replied',
    createdAt: '2026-07-25T10:15:00Z',
  },
];

export const initialMediaFiles: MediaFile[] = [
  {
    id: 'med-1',
    name: 'hero_cinema_bg.webp',
    url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
    sizeKb: 245,
    format: 'webp',
    folder: 'Banner',
    uploadedAt: '2026-07-20 10:00',
    dimensions: '1920x1080',
  },
  {
    id: 'med-2',
    name: 'ken_arok_poster.webp',
    url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
    sizeKb: 180,
    format: 'webp',
    folder: 'Portfolio',
    uploadedAt: '2026-07-21 14:30',
    dimensions: '1200x800',
  },
  {
    id: 'med-3',
    name: 'nfi_wayang_gunungan_logo.svg',
    url: '/nfi-logo.svg',
    sizeKb: 12,
    format: 'svg',
    folder: 'Brand',
    uploadedAt: '2026-07-28 19:35',
    dimensions: '500x550',
  },
];

export const initialActivityLogs: ActivityLogItem[] = [
  {
    id: 'act-1',
    userName: 'Super Admin',
    userEmail: 'admin@nfi.co.id',
    action: 'Menerbitkan Artikel Berita Baru',
    module: 'News CMS',
    ipAddress: '180.252.12.98',
    timestamp: '2026-07-28 08:30:12',
  },
  {
    id: 'act-2',
    userName: 'Editor Content',
    userEmail: 'editor@nfi.co.id',
    action: 'Memperbarui Item Portofolio "Ken Arok"',
    module: 'Portfolio CMS',
    ipAddress: '114.124.201.44',
    timestamp: '2026-07-27 16:10:05',
  },
  {
    id: 'act-3',
    userName: 'Super Admin',
    userEmail: 'admin@nfi.co.id',
    action: 'Sistem Security Audit Log Clear',
    module: 'User Security',
    ipAddress: '180.252.12.98',
    timestamp: '2026-07-26 11:00:00',
  },
];

export const initialUsers: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Administrator Utama',
    email: 'admin@nfi.co.id',
    password: 'admin123',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    phone: '+62 811-9876-5432',
    bio: 'Penanggung jawab utama infrastruktur CMS dan keamanan data NFI.',
    lastLogin: '2026-07-28 08:30',
  },
  {
    id: 'usr-2',
    name: 'Redaksi News & Editor',
    email: 'editor@nfi.co.id',
    password: 'editor123',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    phone: '+62 812-3456-7890',
    bio: 'Kepala redaksi konten jurnalistik dan press release sinema.',
    lastLogin: '2026-07-27 16:10',
  },
  {
    id: 'usr-3',
    name: 'Legal Auditor (Handiwiyanto Law)',
    email: 'legal@nfi.co.id',
    password: 'legal123',
    role: 'Legal Auditor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    phone: '+62 813-8888-9999',
    bio: 'Tim advokasi hukum hak cipta dan lisensi distribusi film.',
    lastLogin: '2026-07-25 10:00',
  },
  {
    id: 'usr-4',
    name: 'Executive Producer',
    email: 'producer@nfi.co.id',
    password: 'producer123',
    role: 'Producer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    phone: '+62 815-1122-3344',
    bio: 'Produser eksekutif pengawas proyek layar lebar dan iklan korporat.',
    lastLogin: '2026-07-24 14:20',
  },
];
