import axiosInstance from "../../shared/lib/axiosInstance";

export type ThemeDto = {
  id: number;
  title: string;
};

export type QuestionDto = {
  id: number;
  themeId: number;
  cost: number;
  isAnswered: boolean;
};

export type BoardDto = {
  themes: ThemeDto[];
  questions: QuestionDto[];
};

export type QuestionDetailsDto = {
  id: number;
  themesId: number;
  question: string;
  answer: string;
  cost: number;
  isAnswered: boolean;
  image?: string | null;
};

export type SessionDto = {
  id: number;
  userId: number;
  startTime: string;
  endTime?: string | null;
  score: number;
  rigthQuestion: number;
  totalAnswers: number;
};

export type AnswerSessionDto = {
  id: number;
  sessionId: number;
  questionId: number;
  startTime?: string | null;
  userAnswer?: string | null;
  isCorrect?: boolean | null;
  answerScore?: number | null;
};

export async function fetchBoard(): Promise<BoardDto> {
  const [themesRes, questionsRes] = await Promise.all([
    axiosInstance.get<ThemeDto[]>("/api/theme"),
    axiosInstance.get<
      Array<{
        id: number;
        themesId: number;
        cost: number;
        isAnswered: boolean | null;
      }>
    >("/api/question"),
  ]);

  return {
    themes: themesRes.data,
    questions: questionsRes.data.map((q) => ({
      id: q.id,
      themeId: q.themesId,
      cost: q.cost,
      isAnswered: Boolean(q.isAnswered),
    })),
  };
}

export async function fetchQuestionByThemeAndCost(
  themesId: number,
  cost: number
): Promise<QuestionDetailsDto | null> {
  const { data } = await axiosInstance.get<QuestionDetailsDto[]>(
    `/api/question/theme/${themesId}/cost/${cost}`
  );

  return data?.[0] ?? null;
}

export async function createSession(): Promise<SessionDto> {
  const { data } = await axiosInstance.post<SessionDto>("/api/session");
  return data;
}

export async function createAnswerSession(
  sessionId: number,
  questionId: number
): Promise<AnswerSessionDto> {
  const { data } = await axiosInstance.post<AnswerSessionDto>(
    `/api/answersession?sessionId=${sessionId}&questionId=${questionId}`
  );
  return data;
}

export async function updateAnswerSession(
  answerSessionId: number,
  userAnswer: string
): Promise<AnswerSessionDto> {
  const { data } = await axiosInstance.put<AnswerSessionDto>(
    `/api/answersession/${answerSessionId}`,
    { userAnswer }
  );
  return data;
}

export async function fetchAnswerSessionsBySessionId(
  sessionId: number | string
): Promise<AnswerSessionDto[]> {
  const { data } = await axiosInstance.get<AnswerSessionDto[]>(
    `/api/answersession/session/${sessionId}`
  );
  return data;
}

export async function fetchSessionById(
  sessionId: number | string
): Promise<SessionDto> {
  const { data } = await axiosInstance.get<SessionDto>(
    `/api/session/${sessionId}`
  );
  return data;
}

export async function finalizeSession(
  sessionId: number | string
): Promise<SessionDto> {
  const { data } = await axiosInstance.put<SessionDto>(
    `/api/session/${sessionId}`
  );
  return data;
}
