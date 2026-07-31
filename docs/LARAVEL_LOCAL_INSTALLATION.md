# Panduan Instalasi Backend Laravel 11 — PT Nusantara Film Indonesia (NFI)

Proyek ini telah disiapkan dengan struktur tabel database, endpoint API RESTful, serta middleware autentikasi domain resmi `@nfi.co.id` yang siap di-install pada server lokal (Laragon, XAMPP, Docker, atau Ubuntu VPS).

---

## 🛠️ Prasyarat Server Lokal
- **PHP** >= 8.2 (dengan ekstensi `pdo_mysql`, `mbstring`, `fileinfo`, `gd`/`imagick`, `openssl`)
- **Composer** >= 2.5
- **MySQL / PostgreSQL / MariaDB** (Disarankan MySQL 8.0 / MariaDB 10.6)
- **Node.js** >= 18 (Opsional jika ingin menjalankan Laravel Mix / Vite server)

---

## 🚀 Langkah Instalasi Di Server Lokal

### Langkah 1: Buat Proyek Laravel 11
Buka terminal/Command Prompt di folder server lokal Anda (`htdocs` / `www`):
```bash
composer create-project laravel/laravel laravel-nfi-backend
cd laravel-nfi-backend
```

### Langkah 2: Copy File API & Migrasi NFI
Salin berkas yang disiapkan oleh sistem NFI ini ke folder proyek Laravel Anda:
1. Copy `laravel-backend/routes/api.php` -> `routes/api.php`
2. Copy `laravel-backend/database/migrations/2026_01_01_000000_create_nfi_tables.php` -> `database/migrations/`

### Langkah 3: Konfigurasi File `.env` Database Lokal
Edit file `.env` di direktori utama Laravel Anda:
```env
APP_NAME="Nusantara Film Indonesia Backend"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nfi_production_db
DB_USERNAME=root
DB_PASSWORD=

# Mandatory Domain Restricted Auth
NFI_MANDATORY_DOMAIN=nfi.co.id
```

Generate App Key:
```bash
php artisan key:generate
```

### Langkah 4: Install Package Sanctum (Autentikasi Token CMS)
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Langkah 5: Jalankan Migrasi Database

> 💡 **Solusi Error `SQLSTATE[42000]: Specified key was too long; max key length is 767 bytes` (XAMPP / MariaDB):**
> Jika Anda mengalami error ini saat menjalankan `php artisan migrate`, buka file `app/Providers/AppServiceProvider.php` di proyek Laravel Anda dan tambahkan pengaturan default string length berikut:
>
> ```php
> namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema; // 1. Tambahkan ini

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Schema::defaultStringLength(191); // 2. Tambahkan baris ini
    }
}
> ```
>
> Setelah menyimpan `AppServiceProvider.php`, jalankan perintah reset & migrasi ulang:
> ```bash
> php artisan migrate:fresh
> ```

Pastikan database `nfi_production_db` sudah dibuat di MySQL/PHPMyAdmin, lalu jalankan:
```bash
php artisan migrate
```

### Langkah 6: Seeding Data Awal (Super Admin @nfi.co.id)
Tambahkan Super Admin default pada `database/seeders/DatabaseSeeder.php`:
```php
\App\Models\User::factory()->create([
    'name' => 'Super Admin NFI',
    'email' => 'admin@nfi.co.id',
    'password' => bcrypt('admin123'),
    'role' => 'Super Admin',
]);
```
Jalankan seeder:
```bash
php artisan db:seed
```

### Langkah 7: Jalankan Server Lokal Laravel
```bash
php artisan serve --port=8000
```
Server backend lokal Anda sekarang berjalan secara aktif di:
`http://127.0.0.1:8000/api`

---

## 📡 Daftar Endpoint Utama RESTful API (Laravel)

| Method | Endpoint API | Keterangan | Akses |
|---|---|---|---|
| `GET` | `/api/health` | Status Server & Health Check | Publik |
| `GET` | `/api/portfolio` | Katalog Portofolio & Film NFI | Publik |
| `GET` | `/api/news` | Berita & Press Release | Publik |
| `GET` | `/api/services` | Paket Layanan Produksi | Publik |
| `GET` | `/api/team` | Direksi & Tim Eksekutif | Publik |
| `POST` | `/api/inquiries` | Kirim Pesan / Inquiry Masuk | Publik |
| `POST` | `/api/auth/login` | Login CMS Admin (@nfi.co.id) | Publik |
| `POST` | `/api/portfolio` | Tambah Karya Baru | Admin Token |
| `DELETE` | `/api/portfolio/{id}` | Hapus Portofolio | Admin Token |
| `POST` | `/api/news` | Terbitkan Artikel | Admin Token |
| `DELETE` | `/api/news/{id}` | Hapus Artikel | Admin Token |
| `DELETE` | `/api/services/{id}` | Hapus Layanan | Admin Token |
| `DELETE` | `/api/team/{id}` | Hapus Anggota Tim | Admin Token |
| `DELETE` | `/api/inquiries/{id}` | Hapus Pesan Inbox | Admin Token |
| `POST` | `/api/media/upload` | Upload File Gambar Lokal | Admin Token |
| `DELETE` | `/api/media/{id}` | Hapus Berkas Media | Admin Token |

---

## 🔒 Konfigurasi CORS (Untuk Menghubungkan Frontend React dengan Laravel)
Di Laravel 11, atur file `config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000', 'https://your-production-domain.co.id'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```
