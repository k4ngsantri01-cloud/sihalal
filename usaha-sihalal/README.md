# Usaha Sihalal

Aplikasi input data usaha berbasis web dengan frontend HTML/CSS/VanillaJS, backend serverless Vercel Functions, dan Google Sheets sebagai database.

## Fitur utama

- Form input data usaha modern, responsif, dan profesional
- Validasi nomor HP dan tahun berdiri
- GPS otomatis dan fallback manual
- Mini map Leaflet + OpenStreetMap
- Simpan latitude, longitude, alamat, dan link maps
- Tabel daftar data dengan edit, hapus, lihat maps, dan pencarian realtime
- Backend validasi server-side dan integrasi Google Sheets API

## Struktur proyek

- `public/` → frontend statis
- `api/` → Vercel serverless functions
- `lib/` → helper backend untuk auth, validation, dan Google Sheets

## Setup lokal

1. Salin `.env.example` ke `.env`
2. Isi `GOOGLE_CLIENT_EMAIL` dan `GOOGLE_PRIVATE_KEY`
3. Pastikan service account memiliki akses edit ke spreadsheet
4. Jalankan:

```bash
npm install
npx vercel dev --listen 3000
```

5. Buka `http://localhost:3000`

## Variabel lingkungan

- `GOOGLE_SHEET_ID` = `1zqYTEnJ5cefiOP9U7Acnrs-9X51zPyBUL3ZZmmU9-GE`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

> Catatan: `GOOGLE_PRIVATE_KEY` harus disimpan sebagai string dengan karakter `\n` jika diperlukan, misalnya:
> `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`

## Deploy

Deploy ke Vercel dengan `vercel` atau `npm run dev` untuk pengembangan lokal. Frontend memakai folder `public/` dan backend memakai `api/`.
