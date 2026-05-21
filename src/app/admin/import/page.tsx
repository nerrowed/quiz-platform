export default function ImportPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold text-white">Import Soal CSV</h1>
        <p className="mt-2 text-sm text-slate-400">
          Format CSV akan berisi kolom: question_text, option_a, option_b, option_c, option_d, correct_answer,
          explanation, difficulty.
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-10 text-center text-sm text-slate-400">
          Komponen upload CSV dan preview hasil parsing akan dibangun di tahap berikutnya.
        </div>
      </div>
    </main>
  );
}
