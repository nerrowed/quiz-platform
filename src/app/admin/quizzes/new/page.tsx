import { createQuizAction } from "./actions";

export default function NewQuizPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold text-white">Buat Quiz Baru</h1>
        <p className="mt-2 text-sm text-slate-400">Form ini sudah disiapkan untuk membuat quiz baru ke database.</p>

        <form action={createQuizAction} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Judul quiz</label>
            <input
              name="title"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Deskripsi</label>
            <textarea
              name="description"
              className="min-h-32 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Durasi (menit)</label>
            <input
              name="durationMinutes"
              type="number"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
            />
          </div>
          <button className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Simpan quiz
          </button>
        </form>
      </div>
    </main>
  );
}
