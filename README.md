# QuizArena

Platform quiz berbasis Next.js dengan leaderboard dan panel admin.

## Fitur yang sedang dibangun
- Auth user/admin
- Admin panel untuk kelola quiz
- Import soal CSV
- Quiz engine dengan timer
- Leaderboard berbasis skor dan durasi

## Stack
- Next.js App Router
- PostgreSQL
- Prisma
- NextAuth
- Tailwind CSS

## Menjalankan project
1. Copy env
```bash
cp .env.example .env
```
2. Isi `DATABASE_URL`, `NEXTAUTH_SECRET`, dan `NEXTAUTH_URL`
3. Install dependency
```bash
npm install
```
4. Generate prisma client
```bash
npx prisma generate
```
5. Jalankan project
```bash
npm run dev
```

## Catatan progres saat ini
- Struktur landing page, dashboard, leaderboard, dan admin panel awal sudah dibuat.
- Schema Prisma awal sudah dibuat.
- Integrasi auth dan flow database sedang disambungkan.
