// src/hooks/useGame.ts
import { useState } from "react";
import type { Word } from "../data/types";

export function useGame(words: Word[]) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = words[index];

  const next = () => setIndex((i) => i + 1);
  const addScore = () => setScore((s) => s + 1);

  const isLast = index + 1 >= words.length;

  return {
    index,
    score,
    current,
    next,
    addScore,
    isLast,
  };
}
