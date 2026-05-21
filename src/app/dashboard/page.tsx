import Link from "next/link";
import { getPublishedQuizzes } from "@/lib/data";
import { StatCard } from "@/components/ui/stat-card";

export default async function DashboardPage() {
  const quizzes = await getPublishedQuizzes().catch(() => []);

  const stats = [
    { label: "Quiz aktif", value: String(quizzes.length), hint: "Quiz dengan status published" },
    { label: "Attempt saya", value: "0", hint: "Riwayat pengerjaan peserta" },
    { label: "Skor terbaik", value: "0", hint: "Akan dihitung dari attempt terbaik" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Peserta</h1>
        <p className="mt-2 text-slate-400">Pilih quiz yang aktif lalu kerjakan langsung dari dashboard.</p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Quiz Aktif</h2>
            <p className="mt-2 text-sm text-slate-400">Daftar ini sudah siap dihubungkan ke engine pengerjaan quiz.</p>
          </div>
          <Link
            href="/leaderboard"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Lihat leaderboard
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {quizzes.length ? (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{quiz.description || "Belum ada deskripsi quiz."}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {quiz._count.questions} soal • {quiz.durationMinutes} menit • {quiz._count.attempts} attempt
                    </p>
                  </div>
                  <Link
                    href={`/quiz/${quiz.id}`}
                    className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Mulai quiz
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-sm text-slate-400">
              Belum ada quiz published. Nanti admin bisa publish quiz dari panel admin.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
