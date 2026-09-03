# SambalKu Admin

Starter aplikasi admin untuk usaha sambal: modal/belanja, penjualan, pengeluaran, stok produk, saldo harian, dan laporan.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Server Actions
- Lucide React

Struktur mengikuti pola Next.js App Router dan konfigurasi Prisma modern dengan `prisma.config.ts`.

## Struktur

```text
sambalku-admin/
├─ app/
│  ├─ actions/
│  │  ├─ expenses.ts
│  │  ├─ products.ts
│  │  ├─ purchases.ts
│  │  └─ sales.ts
│  ├─ laporan/page.tsx
│  ├─ modal/
│  │  ├─ page.tsx
│  │  └─ tambah/page.tsx
│  ├─ pengeluaran/
│  │  ├─ page.tsx
│  │  └─ tambah/page.tsx
│  ├─ penjualan/
│  │  ├─ page.tsx
│  │  └─ tambah/page.tsx
│  ├─ produk/
│  │  ├─ page.tsx
│  │  └─ tambah/page.tsx
│  ├─ saldo/page.tsx
│  ├─ pengaturan/page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ sidebar.tsx
│  └─ stat-card.tsx
├─ lib/
│  ├─ db.ts
│  └─ format.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ .env.example
├─ next.config.ts
├─ postcss.config.mjs
├─ prisma.config.ts
├─ package.json
└─ tsconfig.json
```

## Cara menjalankan

### 1. Prasyarat

Gunakan Node.js versi modern yang didukung Next.js/Prisma dan PostgreSQL.

### 2. Install

```bash
npm install
```

### 3. Environment

```bash
cp .env.example .env
```

Salin file tersebut, lalu isi password database Supabase pada kedua URL. Jika password berisi karakter khusus seperti `@`, `:`, `/`, atau `#`, lakukan URL-encoding terlebih dahulu.

Contoh:

```env
DATABASE_URL="postgresql://postgres.gaqzxenglqhelbntviec:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.gaqzxenglqhelbntviec:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
```

### 4. Buat database/schema

```bash
npm run db:migrate -- --name init
npm run db:seed
```

### 5. Jalankan

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Catatan penting

### Integrasi notifikasi pembayaran QRIS

Penjualan dengan metode `QRIS` dibuat dengan status `PENDING`. Aplikasi menerima notifikasi pembayaran melalui:

```text
POST https://domain-anda.example/api/payments/qris/webhook
```

Atur secret di environment production:

```env
QRIS_WEBHOOK_SECRET="secret-yang-sama-dengan-provider"
```

Request webhook harus menyertakan header `x-webhook-signature` berupa HMAC-SHA256 hex dari body mentah, lalu payload JSON berikut:

```json
{
	"eventId": "event-unik-dari-provider",
	"paymentReference": "QRIS-reference-dari-penjualan",
	"status": "PAID",
	"amount": 25000
}
```

`eventId` mencegah notifikasi yang sama diproses dua kali. Halaman Penjualan menyegarkan status otomatis setiap 10 detik.

QRIS DANA pribadi/dinamis dari aplikasi DANA biasa tidak bisa langsung mengirim webhook ke aplikasi ini. Untuk koneksi resmi, gunakan akun merchant dan produk/API DANA atau acquirer QRIS yang menyediakan callback/webhook, daftarkan URL publik HTTPS di dashboard mereka, lalu buat adapter kecil yang memetakan payload DANA ke format di atas. Jangan menaruh token API atau secret di browser; simpan di environment server.

Starter ini sengaja memprioritaskan alur bisnis dan database. Authentication masih placeholder; `createdById: 1` dipakai untuk seed/admin awal.

Untuk production, tahap berikutnya sebaiknya:
1. Auth.js / login admin.
2. Role ADMIN dan STAFF.
3. Validasi form dengan Zod.
4. CRUD edit/hapus.
5. Filter tanggal pada laporan.
6. Grafik penjualan/modal/pengeluaran.
7. Export Excel/PDF.
8. Audit log.
9. Backup database.
10. Deployment PostgreSQL + Vercel/Railway/Render.

## Rumus saldo

```text
Saldo Akhir = Total Pendapatan - Total Modal/Belanja - Total Pengeluaran Lain
```

Jika usaha Anda juga mempunyai saldo kas awal, tambahkan:

```text
Saldo Akhir = Saldo Awal + Pendapatan - Modal/Belanja - Pengeluaran
```
