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
