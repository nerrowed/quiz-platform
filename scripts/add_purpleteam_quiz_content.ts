import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, AnswerOption, Difficulty, QuizStatus } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL belum diset");

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.findFirst({ where: { email: "admin@quizarena.local" } });
  if (!admin) throw new Error("Admin tidak ditemukan");

  const quiz = await prisma.quiz.upsert({
    where: { slug: "analisis-serangan-dan-korelasi-log" },
    update: {
      status: QuizStatus.PUBLISHED,
      description: "Quiz berbasis materi analisis serangan, IOC/IOA, korelasi log, dan studi kasus insiden.",
      quizCode: "PTLOG-001",
      createdById: admin.id,
      durationMinutes: 35,
    },
    create: {
      title: "Analisis Serangan dan Korelasi Log",
      slug: "analisis-serangan-dan-korelasi-log",
      quizCode: "PTLOG-001",
      description: "Quiz berbasis materi analisis serangan, IOC/IOA, korelasi log, dan studi kasus insiden.",
      durationMinutes: 35,
      status: QuizStatus.PUBLISHED,
      createdById: admin.id,
    },
  });

  await prisma.question.deleteMany({ where: { quizId: quiz.id } });

  const questions = [
    {
      questionText: "Apa perbedaan paling tepat antara IOC dan IOA?",
      optionA: "IOC adalah pola perilaku, IOA adalah artefak compromise",
      optionB: "IOC adalah artefak atau bekas compromise, IOA adalah pola aksi atau tahapan serangan",
      optionC: "IOC hanya berupa IP address, IOA hanya berupa log process",
      optionD: "IOC dan IOA adalah istilah yang sama",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.EASY,
    },
    {
      questionText: "Dari sisi deteksi dini, IOA paling berguna untuk apa?",
      optionA: "Menentukan harga aset",
      optionB: "Menentukan vendor firewall",
      optionC: "Mendeteksi aktivitas serangan sebelum compromise makin jauh",
      optionD: "Mengganti kebutuhan log host",
      correctAnswer: AnswerOption.C,
      difficulty: Difficulty.EASY,
    },
    {
      questionText: "Banyak gagal login dalam interval sempit ke banyak akun berbeda paling dekat dengan pola apa?",
      optionA: "Password spraying",
      optionB: "Data backup",
      optionC: "Normal login burst",
      optionD: "Patch validation",
      correctAnswer: AnswerOption.A,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Dalam web reconnaissance, status code mana yang sering muncul saat probing endpoint sensitif?",
      optionA: "201 dan 202",
      optionB: "301 dan 302",
      optionC: "401, 403, 404, 500",
      optionD: "100 dan 101",
      correctAnswer: AnswerOption.C,
      difficulty: Difficulty.EASY,
    },
    {
      questionText: "Kenapa satu baris log saja jarang cukup untuk menyimpulkan insiden?",
      optionA: "Karena semua log pasti salah",
      optionB: "Karena korelasi lintas waktu, IP, account, host, dan event menaikkan confidence analisis",
      optionC: "Karena analyst tidak boleh membaca log",
      optionD: "Karena severity ditentukan oleh warna dashboard",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.EASY,
    },
    {
      questionText: "Contoh IOC yang paling tepat adalah...",
      optionA: "Brute force yang sedang berlangsung",
      optionB: "Recon ke endpoint admin",
      optionC: "Koneksi outbound asing dan file aneh yang tertinggal di host",
      optionD: "Percobaan login ke beberapa akun",
      correctAnswer: AnswerOption.C,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Pada host activity, kenapa parent-child process chain penting?",
      optionA: "Karena hanya dipakai oleh developer frontend",
      optionB: "Karena bisa menunjukkan eksekusi tidak lazim dan konteks asal proses berbahaya",
      optionC: "Karena menggantikan semua network log",
      optionD: "Karena menentukan status code HTTP",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Dari log sample, rangkaian yang paling kuat menunjukkan compromise adalah...",
      optionA: "404 ke /debug lalu tidak ada aktivitas lain",
      optionB: "Login sukses user ardi, lalu POST /tools/run, lalu muncul reverse shell outbound ke 45.77.12.90:4444",
      optionC: "Satu request GET /dashboard 200",
      optionD: "Akses print stylesheet pada browser",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.HARD,
    },
    {
      questionText: "Pada log host, detail uid=0 dan auid=1003 paling berguna untuk apa?",
      optionA: "Menentukan ukuran file log",
      optionB: "Korelasi akun awal dengan aksi lanjutan yang sudah berjalan dengan privilege lebih tinggi",
      optionC: "Menentukan warna severity",
      optionD: "Menentukan apakah host memakai Linux atau Windows saja",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.HARD,
    },
    {
      questionText: "Containment prioritas 1 jam pertama untuk studi kasus pada materi adalah...",
      optionA: "Biarkan koneksi tetap berjalan untuk melihat hasil akhir",
      optionB: "Isolasi host terdampak, blok koneksi ke IP penyerang, suspend account terlibat, dan amankan bukti log",
      optionC: "Hapus semua log agar sistem ringan",
      optionD: "Restart browser peserta",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.HARD,
    },
    {
      questionText: "Baseline dalam analisis log paling tepat dipahami sebagai...",
      optionA: "Semua aktivitas yang terjadi setelah insiden",
      optionB: "Pola normal sistem yang menjadi pembanding saat mencari anomali",
      optionC: "Daftar IP yang diblok oleh firewall",
      optionD: "Catatan insiden tahun lalu",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.EASY,
    },
    {
      questionText: "Aktivitas mana yang paling mencerminkan web probing?",
      optionA: "Akses dashboard sekali setelah login normal",
      optionB: "Burst request ke /admin, /.env, /debug, dan path sensitif lain",
      optionC: "Download file laporan bulanan",
      optionD: "Refresh halaman profil",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Repeated outbound connection dengan interval tetap paling sering menimbulkan kecurigaan ke arah...",
      optionA: "Beaconing atau komunikasi C2",
      optionB: "Update font browser",
      optionC: "Aktivitas backup lokal",
      optionD: "Cache CSS",
      correctAnswer: AnswerOption.A,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Kenapa context host penting saat membaca network log?",
      optionA: "Karena semua host pasti punya port yang sama",
      optionB: "Karena inbound dan outbound baru bermakna jika dibandingkan dengan role host tersebut",
      optionC: "Karena IP internal selalu berbahaya",
      optionD: "Karena protocol tidak pernah penting",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Apa initial access paling mungkin dari studi kasus log A, B, dan C?",
      optionA: "Eksploitasi fisik perangkat",
      optionB: "Credential misuse setelah login sukses user ardi dari source yang sama dengan percobaan gagal sebelumnya",
      optionC: "Patch sistem otomatis",
      optionD: "Kegagalan backup cron",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.HARD,
    },
    {
      questionText: "Kenapa request POST /tools/run dengan hasil 500 lalu 200 patut dicurigai?",
      optionA: "Karena status 500 selalu berarti server dimatikan",
      optionB: "Karena menunjukkan percobaan yang berlanjut sampai eksekusi berhasil",
      optionC: "Karena 200 selalu berarti aman",
      optionD: "Karena tidak ada hubungannya dengan exploitasi",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.HARD,
    },
    {
      questionText: "Jika analyst menulis laporan tanpa chain of evidence, risiko utamanya adalah...",
      optionA: "Laporan terlihat lebih cepat selesai",
      optionB: "Kesimpulan sulit diverifikasi dan rekomendasi jadi lemah",
      optionC: "Dashboard berubah warna",
      optionD: "Status code log otomatis hilang",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Triage yang baik pada tahap awal paling dibantu oleh pertanyaan apa?",
      optionA: "Siapa vendor laptop korban",
      optionB: "Apakah aktivitas masih berlangsung, aset apa yang terdampak, dan apakah ada bukti eksekusi atau persistence",
      optionC: "Browser apa yang dipakai user",
      optionD: "Tema warna SIEM apa yang digunakan",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.MEDIUM,
    },
    {
      questionText: "Dari log sample C, indikator yang paling kuat menunjukkan exfiltration adalah...",
      optionA: "GET /dashboard 200",
      optionB: "tar -czf /tmp/ops.tgz diikuti outbound connection bytes=183420 ke 45.77.12.90:8080",
      optionC: "403 ke /admin",
      optionD: "Login failed dua kali",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.HARD,
    },
    {
      questionText: "Output analyst yang baik seharusnya seperti apa?",
      optionA: "Panjang, spekulatif, dan penuh jargon",
      optionB: "Ringkas, berbasis bukti, reproducible, dan menyertakan confidence level",
      optionC: "Hanya berisi opini pribadi analyst",
      optionD: "Tidak perlu rekomendasi tindak lanjut",
      correctAnswer: AnswerOption.B,
      difficulty: Difficulty.EASY,
    },
  ];

  await prisma.question.createMany({
    data: questions.map((question, index) => ({
      quizId: quiz.id,
      orderNo: index + 1,
      explanation: null,
      ...question,
    })),
  });

  console.log(JSON.stringify({ ok: true, quizCode: quiz.quizCode, questionCount: questions.length }));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
