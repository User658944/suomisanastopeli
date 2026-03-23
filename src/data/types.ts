// src/data/types.ts
export type Difficulty = "beginner" | "medium" | "hard";

export type Word = {
  fi: string;
  en: string;
  category: string;
  difficulty: Difficulty;
};
