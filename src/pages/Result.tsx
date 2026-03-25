// src/pages/Result.tsx
import { useNavigate } from "react-router-dom";
import MotionWrapper from "../components/MotionWrapper";
import { ScoreChart } from "../components/ScoreChartDiagram";
import { useResults } from "../context/ResultContext";
import Footer from "../components/Footer";

export default function Result() {
  const navigate = useNavigate();
  const { attempts } = useResults();

  const lastAttempt = attempts[attempts.length - 1];

  if (!lastAttempt) {
    return <div>Ei tuloksia</div>;
  }

  const { score, results, words, direction, category, difficulty } =
    lastAttempt;

  return (
    <MotionWrapper>
      <div className="min-h-screen text-white flex flex-col items-center gap-6 w-full max-w-xl mx-auto px-4">
        <div className="flex justify-between gap-4 w-full max-w-xl mx-auto mt-8 px-4">
          {/* Tulos */}
          <div className="backdrop-blur-sm">
            <h1 className="text-3xl font-semibold">Tulos</h1>
            <p className="text-orange-300 text-sm">Result</p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-white/10 p-2 rounded border border-white/20 w-20"
          >
            <span className="block font-bold">Poistu</span>
            <span className="block text-xs text-orange-300">Exit</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 w-full max-w-xl mx-auto mt-6 px-4">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xl font-semibold">Aihealue</p>
            <p className="text-orange-300 text-sm pb-2">Category</p>
            <p className="text-xl font-bold border bg-blue-600 rounded-xl pb-1">
              {category}
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xl font-semibold">Vaikeustaso</p>
            <p className="text-orange-300 text-sm pb-2">Difficulty</p>
            <p className="text-xl font-bold border bg-blue-600 rounded-xl pb-1">
              {difficulty}
            </p>
          </div>

          {/* Pisteet */}
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xl font-semibold">Pisteet</p>
            <p className="text-orange-300 text-sm">Score</p>
            <p className="text-4xl font-semibold">
              {score}/{words?.length ?? 0}
            </p>
          </div>

          {/* Chart */}
          <div className="bg-white/5 rounded-xl p-4 flex items-center justify-center backdrop-blur-sm">
            <ScoreChart score={score} total={words.length} />
          </div>
        </div>

        {/* Lista */}
        <div className="w-full">
          <div className="relative">
            <div className="overflow-y-auto rounded-xl border-white/20 bg-white/10 p-2">
              <ul className="space-y-2">
                {words.map((word: any, i: number) => {
                  const result = results[i];

                  return (
                    <li
                      key={i}
                      className={`px-2 py-1 rounded flex items-center justify-between ${
                        result?.correct
                          ? "bg-green-500 text-white"
                          : result
                            ? "bg-blue-900 text-red-300"
                            : "bg-white/10 text-white/50"
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span>{direction === "fi-en" ? word.fi : word.en}</span>

                        <div className="flex gap-2">
                          {result && !result.correct && (
                            <span className="line-through text-red-400 text-left">
                              {result.input}
                            </span>
                          )}

                          {result && (
                            <span className="text-gray-200 text-left">
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
        <div className="h-20"></div>
        <Footer />
      </div>
    </MotionWrapper>
  );
}
