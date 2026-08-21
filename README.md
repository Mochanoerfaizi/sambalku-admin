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

Lalu ubah `DATABASE_URL` sesuai database PostgreSQL Anda.

Contoh:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sambalku?schema=public"
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
