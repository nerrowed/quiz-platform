import Link from "next/link";
import { getAdminSummary } from "@/lib/data";
import { StatCard } from "@/components/ui/stat-card";

export default async function AdminPage() {
  const summary = await getAdminSummary().catch(() => ({
    quizCount: 0,
    questionCount: 0,
    participantCount: 0,
  }));

  const stats = [
    { label: "Total quiz", value: String(summary.quizCount), hint: "Jumlah quiz yang dibuat admin" },
    { label: "Soal tersimpan", value: String(summary.questionCount), hint: "Bank soal aktif" },
    { label: "Total peserta", value: String(summary.participantCount), hint: "Peserta dengan attempt tercatat" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        <p className="text-slate-400">Kelola quiz, soal, hasil peserta, dan leaderboard dari satu tempat.</p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Manajemen Quiz</h2>
            <Link
              href="/admin/quizzes"
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Lihat quiz
            </Link>
          </div>
          <p className="mt-2 text-sm text-slate-400">Halaman ini akan menampilkan tabel quiz dan aksi publish/edit/hapus.</p>
          <div className="mt-4 space-y-2">
            <div>
              <Link href="/admin/quizzes" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
                Buka daftar quiz dan kode quiz
              </Link>
            </div>
            <div>
              <Link href="/admin/results" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
                Lihat hasil peserta per quiz
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Import Soal</h2>
            <Link
              href="/admin/import"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Upload CSV
            </Link>
          </div>
          <p className="mt-2 text-sm text-slate-400">Import CSV disiapkan supaya admin tidak perlu input soal satu per satu.</p>
        </div>
      </section>
    </main>
  );
}
