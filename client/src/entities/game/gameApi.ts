import axiosInstance from "../../shared/lib/axiosInstance";

export type ThemeDto = {
  id: number;
  title: string;
};

export type QuestionDto = {
  id: number;
  themeId: number; // TODO BACKEND: если у вас themesId — переименуешь тут
  cost: number;
  isAnswered: boolean; // TODO BACKEND: если приходит иначе — маппинг ниже
};

export type BoardDto = {
  themes: ThemeDto[];
  questions: QuestionDto[];
};

export async function fetchBoard(): Promise<BoardDto> {
  // TODO BACKEND: endpoint уточните у команды
  const { data } = await axiosInstance.get<BoardDto>("/api/game/board");
  return data;
}
