<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with initial data from PT Nusantara Film Indonesia.
     */
    public function run(): void
    {
        // 1. Users / Admin Accounts
        DB::table('users')->truncate();
        DB::table('users')->insert([
            [
                'name' => 'Administrator Utama',
                'email' => 'admin@nfi.co.id',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Redaksi News & Editor',
                'email' => 'editor@nfi.co.id',
                'email_verified_at' => now(),
                'password' => Hash::make('editor123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Legal Auditor',
                'email' => 'legal@nfi.co.id',
                'email_verified_at' => now(),
                'password' => Hash::make('legal123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 2. Portfolios
        DB::table('portfolios')->truncate();
        DB::table('portfolios')->insert([
            [
                'uuid' => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0001',
                'title' => 'Ken Arok: Rahasia Takdir Tumapel',
                'slug' => 'ken-arok-rahasia-takdir-tumapel',
                'category' => 'Film',
                'client' => 'GH Production / PT. Nusantara Film Indonesia',
                'year' => 2002,
                'thumbnail' => 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'synopsis' => 'Ken Arok lahir dari Ken Endok dan dibesarkan di lingkungan keras. Pengalaman melihat penderitaan rakyat miskin membuka hatinya untuk membela mereka. Pertemuannya dengan Ken Dedes dan intrik Mpu Gandring mengubah peta sejarah kerajaan Tumapel secara abadi.',
                'credits' => json_encode([
                    'director' => 'SA. Karim & George Rudy',
                    'producers' => ['GH Production', 'NFI Team'],
                    'cast' => ['George Rudy', 'Donny Kesuma', 'Christy Jusung', 'Jack Rio Altriara'],
                ]),
                'awards' => json_encode(['Pemenang Nominasi Sinematografi Terbaik 2002']),
                'featured' => 1,
                'status' => 'Published',
                'created_at' => '2024-01-15 10:00:00',
                'updated_at' => '2024-01-15 10:00:00',
            ],
            [
                'uuid' => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0002',
                'title' => 'Anie Carera - Walau Seribu Tahun',
                'slug' => 'anie-carera-walau-seribu-tahun',
                'category' => 'Musik',
                'client' => 'GH Record / NFI Music',
                'year' => 1989,
                'thumbnail' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'synopsis' => 'Album legendaris kedua dari legenda musik pop Indonesia Anie Carera, diproduksi di bawah naungan GH Record (cikal bakal NFI Music). Memperoleh penghargaan musik nasional.',
                'credits' => json_encode([
                    'director' => 'George Handiwiyanto',
                    'cast' => ['Anie Carera', 'Areng Widodo (Music Arranger)'],
                ]),
                'awards' => json_encode(['Album Pop Terbaik 1989']),
                'featured' => 1,
                'status' => 'Published',
                'created_at' => '2024-01-20 10:00:00',
                'updated_at' => '2024-01-20 10:00:00',
            ],
            [
                'uuid' => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0003',
                'title' => 'Suraya Rock Star 1988 & Surabaya Rock Band "Teror"',
                'slug' => 'suraya-rock-star-1988-teror',
                'category' => 'Musik',
                'client' => 'GH Enterprise & PT. Gudang Garam Kediri',
                'year' => 1988,
                'thumbnail' => 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'synopsis' => 'Konser kolosal dan perhelatan panggung musik rock terbesar Jawa Timur era 1988 menampilkan SAS, Sonatha Tanjung, Arthur Kaunang, Syech Abidin, dan AKA Harahap.',
                'credits' => json_encode([
                    'director' => 'GH Enterprise SBY',
                    'cast' => ['Surabaya Rock Band (SRB)', 'Thomas', 'Gatuk Gondez', 'Mustich BK', 'Gita Nikki'],
                ]),
                'awards' => null,
                'featured' => 1,
                'status' => 'Published',
                'created_at' => '2024-02-01 10:00:00',
                'updated_at' => '2024-02-01 10:00:00',
            ],
            [
                'uuid' => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0004',
                'title' => 'Iklan Komersial Bank Nusantara 2025',
                'slug' => 'iklan-komersial-bank-nusantara-2025',
                'category' => 'Iklan',
                'client' => 'Bank Nusantara',
                'year' => 2025,
                'thumbnail' => 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'synopsis' => 'Video komersial resolusi 4K Anamorphic untuk penayangan TV nasional dan kampanye digital media sosial dengan tema Kemudahan Transaksi Digital.',
                'credits' => json_encode([
                    'director' => 'Dimas Arya',
                    'cast' => ['Reza Rahadian', 'Tara Basro'],
                ]),
                'awards' => json_encode(['TVC Terfavorit 2025']),
                'featured' => 1,
                'status' => 'Published',
                'created_at' => '2025-01-10 10:00:00',
                'updated_at' => '2025-01-10 10:00:00',
            ],
            [
                'uuid' => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d0005',
                'title' => 'Company Profile Trans-Java Megaproject',
                'slug' => 'company-profile-trans-java-megaproject',
                'category' => 'Video Korporat',
                'client' => 'Kementerian PUPR & BUMN Konsorsium',
                'year' => 2024,
                'thumbnail' => 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'synopsis' => 'Video korporat eksklusif pemetaan infrastruktur dengan pengambilan gambar udara (drone FPV & Heavy Lift Cinema Rig) serta grafis gerak (motion graphics 3D).',
                'credits' => json_encode([
                    'director' => 'Budi Santoso',
                    'cast' => ['Narrator: Ario Bayu'],
                ]),
                'awards' => null,
                'featured' => 1,
                'status' => 'Published',
                'created_at' => '2024-11-20 10:00:00',
                'updated_at' => '2024-11-20 10:00:00',
            ],
        ]);

        // 3. News Posts
        DB::table('news_posts')->truncate();
        DB::table('news_posts')->insert([
            [
                'uuid' => 'n1-uuid-001',
                'title' => 'PT. Nusantara Film Indonesia Raih Penghargaan Sinematografi Terbaik 2025',
                'slug' => 'pt-nusantara-film-indonesia-raih-penghargaan-sinematografi-terbaik-2025',
                'category' => 'Penghargaan',
                'author' => 'Redaksi NFI',
                'featured_image' => 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
                'excerpt' => 'PT. Nusantara Film Indonesia kembali mengharumkan nama bangsa di ajang perfilman regional melalui pencapaian sinematografi dan tata cahaya terbaik.',
                'content' => '<p>PT. Nusantara Film Indonesia resmi menerima tropi Penghargaan Sinematografi Terbaik dalam festival karya visual tahunan yang diselenggarakan di Jakarta.</p>',
                'tags' => json_encode(['Cinema', 'Awards', 'Nusantara Film', 'Karya Anak Bangsa']),
                'seo_title' => 'PT Nusantara Film Indonesia Raih Penghargaan Sinematografi Terbaik',
                'seo_description' => 'Berita resmi PT Nusantara Film Indonesia memenangkan penghargaan sinematografi terbaik di festival film nasional.',
                'published_at' => '2025-06-12 09:00:00',
                'created_at' => '2025-06-12 09:00:00',
                'updated_at' => '2025-06-12 09:00:00',
            ],
            [
                'uuid' => 'n2-uuid-002',
                'title' => 'Tren Video Marketing 2026: Dominasi Sinematik & Storytelling Emosional',
                'slug' => 'tren-video-marketing-2026-dominasi-sinematik-storytelling-emosional',
                'category' => 'Edukasi',
                'author' => 'Budi Santoso',
                'featured_image' => 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
                'excerpt' => 'Pelajari bagaimana pendekatan penceritaan berbasis film bioskop kini menjadi strategi utama brand-brand besar dalam menarik simpati konsumen.',
                'content' => '<p>Perkembangan teknologi konsumen mengubah cara publik menikmati iklan komersial. Iklan yang berdurasi singkat namun mengusung alur cerita dramatis terbukti memiliki angka engagement tinggi.</p>',
                'tags' => json_encode(['Video Marketing', 'Commercial', 'Branding', 'Tips Film']),
                'seo_title' => 'Tren Video Marketing 2026 - Analisis PT Nusantara Film Indonesia',
                'seo_description' => 'Panduan lengkap tren video komersial dan sinematik marketing tahun 2026 dari praktisi industri film.',
                'published_at' => '2025-05-20 10:30:00',
                'created_at' => '2025-05-20 10:30:00',
                'updated_at' => '2025-05-20 10:30:00',
            ],
            [
                'uuid' => 'n3-uuid-003',
                'title' => 'Pentingnya Payung Hukum & Lisensi Dalam Industri Kreatif Sinema',
                'slug' => 'pentingnya-payung-hukum-lisensi-dalam-industri-kreatif-sinema',
                'category' => 'Hukum & HKI',
                'author' => 'Billy Handiwiyanto, S.H., M.H.',
                'featured_image' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
                'excerpt' => 'Sinergi NFI dan Handiwiyanto Law Office dalam memberikan kepastian hukum bagi setiap aset video, musik, dan kontrak sutradara.',
                'content' => '<p>Banyak produser independen menghadapi kendala distribusi akibat lemahnya perlindungan hak cipta dan draf perjanjian lisensi.</p>',
                'tags' => json_encode(['Legal', 'HKI', 'Hak Cipta', 'Firma Hukum']),
                'seo_title' => 'Perlindungan Hukum & Hak Cipta Sinema - NFI & Handiwiyanto Law Office',
                'seo_description' => 'Edukasi pentingnya perlindungan hak kekayaan intelektual (HKI) dalam industri film Indonesia.',
                'published_at' => '2025-04-10 14:15:00',
                'created_at' => '2025-04-10 14:15:00',
                'updated_at' => '2025-04-10 14:15:00',
            ],
        ]);

        // 4. Services
        DB::table('services')->truncate();
        DB::table('services')->insert([
            [
                'slug' => 'produksi-film-sinema',
                'title' => 'Produksi Film & Sinema',
                'short_description' => 'Layanan produksi film pendek, feature film layar lebar, dokumenter, serta sinema elektronik dengan standar internasional.',
                'full_description' => 'PT. Nusantara Film Indonesia menyediakan ekosistem pembuatan film secara utuh (End-to-End Film Production). Mulai dari pengembangan skenario, casting sutradara & pemain, lokasi syuting, kru teknis berlisensi, peralatan kamera bioskop RED/ARRI, hingga post-production.',
                'deliverables' => json_encode([
                    'Master Film DCP (Digital Cinema Package) 4K',
                    'Sound Mixing 5.1 & Dolby Atmos',
                    'Trailers, Teaser & Marketing Asset Kit',
                    'Dokumentasi Behind the Scenes (BTS)',
                    'Registrasi Lisensi & Hak Cipta HKI',
                ]),
                'sample_image' => 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
                'icon' => 'Clapperboard',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'iklan-komersial-video',
                'title' => 'Iklan & Komersial Video',
                'short_description' => 'Pembuatan video iklan komersial untuk penayangan Televisi (TVC), Digital Platform, YouTube Ads, & Social Media Viral.',
                'full_description' => 'Kami membantu brand Anda menyampaikan pesan secara berdampak tinggi. Didukung tim kreatif, sutradara komersial berpengalaman, dan peralatan pencahayaan kelas atas.',
                'deliverables' => json_encode([
                    'TV Commercial 30s & 15s Cutdown',
                    'Vertical Video Aspect 9:16 (TikTok/Reels)',
                    'Color Graded Master Files 1080p / 4K',
                ]),
                'sample_image' => 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
                'icon' => 'Tv',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'video-korporat-profile',
                'title' => 'Video Korporat & Profile',
                'short_description' => 'Video company profile, pelaporan kinerja tahunan, event liputan eksekutif, dan presentasi investor berkelas.',
                'full_description' => 'Representasikan profesionalisme perusahaan Anda di mata publik, klien, dan investor dengan video profil korporat yang sinematik.',
                'deliverables' => json_encode([
                    'Full Company Profile Video (3-5 menit)',
                    'Executive Interview Sessions',
                    'Aerial Infrastructure & Factory Drone Footage',
                ]),
                'sample_image' => 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
                'icon' => 'Building2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'promotor-musik-konser',
                'title' => 'Promotor Musik & Konser',
                'short_description' => 'Penyelenggaraan konser musik nasional & mancanegara, festival seni budaya, serta acara hiburan berskala besar.',
                'full_description' => 'Bermula dari pengalaman GH Enterprise menggelar Surya Rock Star 1988, kami berpengalaman dalam menangani izin kepolisian, tata panggung lighting sound system megah, dan penanganan artis kelas dunia.',
                'deliverables' => json_encode([
                    'Event Management & Stage Operations',
                    'Sound System & Multi-Angle Live Camera Broadcast',
                    'Perizinan Tempat & Legalitas Keramaian',
                ]),
                'sample_image' => 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
                'icon' => 'Music',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'firma-hukum-advokasi-media',
                'title' => 'Firma Hukum & Advokasi Media',
                'short_description' => 'Perlindungan payung hukum karya sinema, lisensi hak cipta, kontrak artis, serta advokasi legal media oleh Handiwiyanto Law Office.',
                'full_description' => 'Satu-satunya rumah produksi terpadu di Indonesia yang didukung penuh oleh Firma Hukum Top 10 Indonesia (Handiwiyanto Law Office).',
                'deliverables' => json_encode([
                    'Penyusunan Kontrak Kerja & Talent Agreement',
                    'Pendaftaran Hak Cipta & Merek Dagang',
                    'Legal Clearance Dokumen Penayangan Sinema',
                ]),
                'sample_image' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
                'icon' => 'Scale',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 5. Team Members
        DB::table('team_members')->truncate();
        DB::table('team_members')->insert([
            [
                'uuid' => 't1-uuid-001',
                'name' => 'Billy Handiwiyanto, S.H., M.H.',
                'position' => 'Direktur Utama & Penasihat Hukum',
                'department' => 'Direksi & Legal',
                'biography' => 'Billy Handiwiyanto merupakan pimpinan PT. Nusantara Film Indonesia sekaligus advokat senior dari Handiwiyanto Law Office (Top 10 Litigation Law Firm Indonesia).',
                'photo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
                'order' => 1,
                'socials' => json_encode(['email' => 'billy@nfi.co.id', 'linkedin' => 'https://linkedin.com']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'uuid' => 't2-uuid-002',
                'name' => 'Andi Pratama',
                'position' => 'Direktur Operasional Production',
                'department' => 'Produksi',
                'biography' => 'Pengalaman lebih dari 15 tahun mengelola manajemen lokasi syuting, kru teknis, serta pengadaan armada peralatan sinematografi.',
                'photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
                'order' => 2,
                'socials' => json_encode(['email' => 'andi@nfi.co.id']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'uuid' => 't3-uuid-003',
                'name' => 'Rina Kartika',
                'position' => 'Produser Eksekutif',
                'department' => 'Produksi',
                'biography' => 'Produser kawakan yang menangani perencanaan alokasi anggaran, jalinan sponsor, dan distribusi internasional film dokumenter.',
                'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
                'order' => 3,
                'socials' => json_encode(['email' => 'rina@nfi.co.id']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'uuid' => 't4-uuid-004',
                'name' => 'Dimas Arya',
                'position' => 'Sutradara / Head Director',
                'department' => 'Kreatif & Sutradara',
                'biography' => 'Sutradara muda berbakat peraih berbagai festival sinematografi dengan spesialisasi pencahayaan dramatis.',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
                'order' => 4,
                'socials' => json_encode(['email' => 'dimas@nfi.co.id']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 6. Inquiries
        DB::table('inquiries')->truncate();
        DB::table('inquiries')->insert([
            [
                'uuid' => 'inq-uuid-001',
                'full_name' => 'Satria Dewa',
                'email' => 'satria@brandperkasa.co.id',
                'phone' => '+6281298765432',
                'subject' => 'Penawaran Kerjasama Iklan TVC 2026',
                'message' => 'Halo Tim NFI, kami bermaksud mendiskusikan anggaran dan konsep pembuatan video komersial produk terbaru kami.',
                'office_target' => 'Jakarta',
                'status' => 'Unread',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'uuid' => 'inq-uuid-002',
                'full_name' => 'Dra. Endang Rahayu',
                'email' => 'endang@dinaspariwisata.go.id',
                'phone' => '+628113456789',
                'subject' => 'Pembuatan Dokumenter Kebudayaan Jawa Timur',
                'message' => 'Kami tertarik untuk bekerjasama dalam pembuatan film dokumenter festival budaya.',
                'office_target' => 'Surabaya',
                'status' => 'Replied',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
