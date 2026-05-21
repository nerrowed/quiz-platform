export type QuestionFormInput = {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
  explanation?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
};

export type QuizSubmissionInput = {
  title: string;
  description?: string;
  durationMinutes: number;
};
