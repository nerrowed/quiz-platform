import Link from "next/link";
import { joinQuizAction } from "./actions";

type Props = {
  searchParams?: Promise<{ quizCode?: string }>;
};

export default async function JoinPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-xl items-center px-6 py-10">
      <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold text-white">Gabung Quiz</h1>
        <p className="mt-2 text-sm text-slate-400">Peserta cukup masukkan nama dan kode quiz untuk mulai.</p>

        <form action={joinQuizAction} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Nama peserta</label>
            <input
              name="participantName"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
              placeholder="Contoh: Rizki"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Kode quiz</label>
            <input
              name="quizCode"
              defaultValue={params?.quizCode || ""}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm uppercase text-white"
              placeholder="Contoh: CYBR-DEMO"
            />
          </div>
          <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Masuk ke quiz
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/leaderboard" className="text-sm text-cyan-300 hover:text-cyan-200">
            Lihat leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
