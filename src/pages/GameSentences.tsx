// src/pages/GameSentences.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { allWords } from "../data";
import { useGame } from "../hooks/useGame";
import MotionWrapper from "../components/MotionWrapper";
import { useResults } from "../context/ResultContext";
import Footer from "../components/Footer";

export default function GameSentences() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const difficulty = state?.difficulty ?? "beginner";
  const category = state?.category ?? "animalsdo";

  const filtered = useMemo(() => {
    return allWords.filter((w) => {
      const hasOptions =
        Array.isArray(w.options_fi) &&
        w.options_fi.length > 0 &&
        Array.isArray(w.options_en) &&
        w.options_en.length > 0;

      return (
        w.difficulty === difficulty && w.category === category && hasOptions
      );
    });
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

  const [results, setResults] = useState<Result[]>([]);
  const { index, current, next, isLast } = useGame(gameWords);
  const { addAttempt } = useResults();

  const [selected, setSelected] = useState<string | null>(null);
  const [lastAnsweredIndex, setLastAnsweredIndex] = useState<number | null>(
    null,
  );

  if (!current) {
    return <div className="text-white p-4">No data</div>;
  }

  const direction = state?.direction ?? "en-fi";

  const correct = direction === "fi-en" ? current.en : current.fi;
  const question = direction === "fi-en" ? current.fi : current.en;

  const options = useMemo(() => {
    const base =
      direction === "fi-en" ? current.options_en! : current.options_fi!;

    const shuffled = [...base];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [current, direction]);

  const handleAnswer = (option: string) => {
    if (results[index]?.answered) return;

    const isCorrect =
      option.trim().toLowerCase() === correct.trim().toLowerCase();

    const updatedResults = [...results];

    updatedResults[index] = {
      correct: isCorrect,
      input: option,
      answered: true,
    };

    setResults(updatedResults);
    setSelected(option);
    setLastAnsweredIndex(index);

    const updatedScore = updatedResults.filter((r) => r?.correct).length;

    setTimeout(() => {
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
      setSelected(null);
    }, 2400);
  };

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
                          className={`px-2 py-1 rounded flex items-start justify-between snap-center transition-all ${
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
                          <div className="flex flex-col items-start w-full text-left">
                            <span className="leading-none w-full text-left">
                              {direction === "fi-en" ? word.fi : word.en}
                            </span>

                            <div className="flex gap-2 w-full items-start">
                              {!result.correct && (
                                <span className="line-through text-red-400 leading-none ">
                                  {result.input}
                                </span>
                              )}

                              <span className="text-gray-200 leading-none ">
                                {direction === "fi-en" ? word.en : word.fi}
                              </span>
                            </div>
                          </div>

                          <span>
                            {result?.correct && "✔️"}
                            {!result?.correct && "❌"}
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

        <p className="text-3xl md:text-4xl font-semibold text-center">
          {question}
        </p>

        <div className="w-full grid grid-cols-2 gap-2 px-4">
          {options.map((opt, i) => {
            const isAnswered = results[index]?.answered;
            const isCorrect = opt === correct;
            const isSelected = selected === opt;

            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={isAnswered}
                className={`p-4 m-2 rounded text-left leading-none transition ${
                  isAnswered
                    ? isCorrect
                      ? "bg-green-500"
                      : isSelected
                        ? "bg-red-500"
                        : "bg-white/10"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="h-20" />

        <button
          onClick={() => navigate("/")}
          className="bg-white/10 p-2 rounded border border-white/20"
        >
          <span className="block font-bold">Poistu</span>
          <span className="block text-xs text-orange-300">Exit</span>
        </button>

        <Footer />
      </div>
    </MotionWrapper>
  );
}
