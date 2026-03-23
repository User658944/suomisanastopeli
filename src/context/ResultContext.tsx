// src/context/ResultContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Attempt = {
  score: number;
  results: {
    correct: boolean;
    input: string;
  }[];
  words: {
    fi: string;
    en: string;
    category: string;
    difficulty: string;
  }[];
  direction: string;
  category: string;
  difficulty: string;
  createdAt: number;
};

type ResultContextType = {
  attempts: Attempt[];
  addAttempt: (attempt: Attempt) => void;
};

const ResultContext = createContext<ResultContextType | null>(null);

export const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const stored = localStorage.getItem("attempts");
    return stored ? JSON.parse(stored) : [];
  });

  const addAttempt = (attempt: Attempt) => {
    setAttempts((prev) => {
      const updated = [...prev, attempt];

      localStorage.setItem("attempts", JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <ResultContext.Provider value={{ attempts, addAttempt }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResults = () => {
  const ctx = useContext(ResultContext);
  if (!ctx) throw new Error("useResults outside provider");
  return ctx;
};
