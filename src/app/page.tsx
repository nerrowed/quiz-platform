import Link from "next/link";
import { Trophy, ShieldCheck, FileQuestion, LayoutDashboard } from "lucide-react";

const features = [
  {
    title: "Quiz real-time",
    description: "Peserta mengerjakan soal dengan timer dan penilaian otomatis.",
    icon: FileQuestion,
  },
  {
    title: "Leaderboard kompetitif",
    description: "Ranking dihitung dari skor, kecepatan, dan waktu submit.",
    icon: Trophy,
  },
  {
    title: "Panel admin",
    description: "Admin bisa membuat quiz, upload soal, dan memantau hasil peserta.",
    icon: LayoutDashboard,
  },
  {
    title: "Scoring aman",
    description: "Perhitungan skor dilakukan di backend agar tidak mudah dimanipulasi.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col px-6 py-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
            MVP Quiz Platform
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Bangun sistem quiz modern dengan leaderboard dan admin panel.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Cocok untuk tryout, pelatihan, evaluasi internal, atau kompetisi. Fokus pada alur peserta yang cepat
            dan panel admin yang praktis.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/join"
              className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Join pakai kode quiz
            </Link>
            <Link
              href="/admin"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Lihat admin panel
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-white">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
