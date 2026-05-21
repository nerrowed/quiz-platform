import { getLeaderboard } from "@/lib/data";
import { formatDuration } from "@/lib/utils";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard().catch(() => []);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <p className="mt-2 text-slate-400">Ranking diurutkan berdasarkan skor, durasi, lalu waktu submit.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="bg-white/5 text-sm text-slate-300">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Quiz</th>
              <th className="px-6 py-4">Skor</th>
              <th className="px-6 py-4">Durasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-slate-200">
            {leaderboard.length ? (
              leaderboard.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-semibold text-cyan-300">#{index + 1}</td>
                  <td className="px-6 py-4">{item.participantName}</td>
                  <td className="px-6 py-4">{item.quiz.title}</td>
                  <td className="px-6 py-4">{item.score}</td>
                  <td className="px-6 py-4">{formatDuration(item.durationSeconds || 0)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-6 text-slate-400" colSpan={5}>
                  Belum ada data leaderboard. Data akan muncul setelah peserta submit quiz.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
