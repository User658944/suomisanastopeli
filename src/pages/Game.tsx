// src/pages/Game.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { allWords } from "../data";
import { useGame } from "../hooks/useGame";
import MotionWrapper from "../components/MotionWrapper";
import { useResults } from "../context/ResultContext";
import Footer from "../components/Footer";

export default function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const difficulty = state?.difficulty ?? "beginner";
  const category = state?.category ?? "animals";

  const filtered = useMemo(() => {
    return allWords.filter(
      (w) => w.difficulty === difficulty && w.category === category,
    );
  }, [difficulty, category]);

  const gameWords = useMemo(() => {
    const shuffled = [...filtered];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 10);
  }, [filtered]);

  type Result = {
    correct: boolean;
    input: string;
    answered: boolean;
  };

  // EI null-arvoja
  const [results, setResults] = useState<Result[]>([]);

  const { index, current, next, isLast } = useGame(gameWords);
  const { addAttempt } = useResults();
  const [input, setInput] = useState("");
  const [lastAnsweredIndex, setLastAnsweredIndex] = useState<number | null>(
    null,
  );

  if (!current) return null;

  const direction = state?.direction ?? "en-fi";

  const correct = direction === "fi-en" ? current.en : current.fi;
  const question = direction === "fi-en" ? current.fi : current.en;

  const handleNext = () => {
    const isCorrect = input.toLowerCase() === correct.toLowerCase();

    const updatedResults = [...results];

    updatedResults[index] = {
      correct: isCorrect,
      input,
      answered: true,
    };

    setResults(updatedResults);
    setLastAnsweredIndex(index);

    // pisteet johdetaan suoraan datasta
    const updatedScore = updatedResults.filter((r) => r?.correct).length;

    if (isLast) {
      addAttempt({
        score: updatedScore,
        results: updatedResults,
        words: gameWords,
        direction,
        category,
        difficulty,
        createdAt: Date.now(),
      });

      navigate("/result");
      return;
    }

    next();
    setInput("");
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const activeEl = containerRef.current.querySelectorAll("li")[index];

    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);

  useEffect(() => {
    setResults(
      Array.from({ length: gameWords.length }, () => ({
        correct: false,
        input: "",
        answered: false,
      })),
    );
  }, [gameWords]);

  useEffect(() => {
    if (!containerRef.current || lastAnsweredIndex === null) return;

    const elements = containerRef.current.querySelectorAll("li");
    const target = elements[lastAnsweredIndex];

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [lastAnsweredIndex]);

  return (
    <MotionWrapper>
      <div className="min-h-screen text-white flex flex-col items-center gap-2 w-full max-w-xl mx-auto px-4">
        <div className="flex w-full justify-between gap-6">
          <div className="flex flex-col items-start w-1/3 pt-2 text-blue-200">
            <span className="text-sm">{direction}</span>
            <span className="text-sm">{difficulty}</span>
            <span className="text-xl font-bold">{category}</span>
          </div>

          <div className="w-2/3">
            <div className="w-full my-2">
              <div className="relative">
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-900 to-transparent z-10" />

                <div
                  ref={containerRef}
                  className="h-48 md:h-72 overflow-y-auto snap-y snap-mandatory rounded-xl border-b bg-black/12 p-2"
                >
                  <ul className="space-y-2">
                    {gameWords.map((word, i) => {
                      const result = results[i];

                      if (!result?.answered) return null;

                      const isActive = i === index;

                      return (
                        <li
                          key={i}
                          className={`px-2 py-1 rounded flex items-center justify-between snap-center transition-all ${
                            isActive ? "border" : ""
                          } ${
                            result?.correct
                              ? "bg-green-500 text-white"
                              : result && !result.correct
                                ? "bg-blue-900 text-red-300"
                                : isActive
                                  ? "bg-blue-900 text-white"
                                  : "bg-white/10 text-white/50"
                          }`}
                        >
                          <div className="flex flex-col items-start h-10">
                            <span className="leading-tight">
                              {direction === "fi-en" ? word.fi : word.en}
                            </span>

                            <div className="flex gap-2">
                              {result && !result.correct && (
                                <span className="line-through text-red-400 leading-tight">
                                  {result.input}
                                </span>
                              )}

                              {result && (
                                <span className="leading-none">
                                  {direction === "fi-en" ? word.en : word.fi}
                                </span>
                              )}
                            </div>
                          </div>

                          <span>
                            {result?.correct && "✔️"}
                            {result && !result.correct && "❌"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-5xl font-semibold text-white">{question}</p>

        <div className="space-y-2 w-full">
          <div>
            <p className="text-white">Sinun vastauksesi</p>
            <p className="text-accent text-sm text-orange-300">Your answer</p>
          </div>

          <input
            className="w-full p-2 rounded text-black bg-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNext();
            }}
          />
        </div>

        <button
          onClick={handleNext}
          className="bg-accent px-6 my-6 py-3 rounded-full w-full border"
        >
          <span className="block text-white font-bold">Vastaa</span>
          <span className="block text-xs text-orange-300">Answer</span>
        </button>

        <div className="h-50"></div>

        <div className="w-70 gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-white/10 p-2 rounded border border-white/20"
          >
            <span className="block font-bold">Poistu</span>
            <span className="block text-xs text-orange-300">Exit</span>
          </button>
        </div>
        <Footer />
      </div>
    </MotionWrapper>
  );
}
