// src/pages/Menu.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useResults } from "../context/ResultContext";
import { ScoreChart } from "../components/ScoreChartDiagram";
import Footer from "../components/Footer";
import lfg from "/lfg.png";

export default function Menu() {
  const navigate = useNavigate();

  const [direction, setDirection] = useState("en-fi");
  const [category, setCategory] = useState("animals");
  const [difficulty, setDifficulty] = useState("beginner");
  const { attempts } = useResults();

  const weakWords = Object.entries(
    attempts
      .flatMap((a) =>
        a.results.map((r, i) => ({
          word: a.words[i],
          correct: r.correct,
        })),
      )
      .reduce((acc: Record<string, { total: number; wrong: number }>, curr) => {
        const key = `${curr.word.fi}-${curr.word.en}`;

        if (!acc[key]) {
          acc[key] = { total: 0, wrong: 0 };
        }

        acc[key].total += 1;
        if (!curr.correct) acc[key].wrong += 1;

        return acc;
      }, {}),
  )
    .map(([key, value]) => ({
      word: key,
      ...value,
    }))
    .filter((w) => w.wrong > 0 && w.wrong > w.total / 2)
    .sort((a, b) => b.wrong - a.wrong);

  return (
    <div className="relative min-h-screen text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md flex flex-col gap-4 mt-2">
        <div className="flex flex-col bg-white/5 rounded-2xl p-4 space-y-3">
          <div className="white-shadow w-full max-w-md flex flex-col gap-6 p-2 mb-14 bg-blue-50/5 rounded-2xl relative">
            {/* Taustakuva */}
            <img
              src={lfg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-md scale-80"
            />

            {/* Sisältö päälle */}
            <div className="relative z-10">
              <h1 className="sm:text-2xl md:text-3xl py-4 font-semibold text-blue-400">
                Learn Finnish Words
              </h1>
            </div>

            <img
              src={lfg}
              alt="Learn Finnish Games Logo"
              className="logo-shadow w-22 h-22 object-contain absolute right-2 bottom-0 translate-y-4/5"
            />
          </div>

          <div>
            <h2 className="m-0">Valitse peli</h2>
            <p className="text-orange-300 text-sm">select a game</p>
          </div>
          {/* GRID */}
          <div className="grid grid-cols-2 gap-4">
            {/* Kielisuunta */}
            <div className="bg-white/5 rounded-xl p-4 space-y-3">
              <p className="font-semibold">Kielisuunta</p>
              <p className="text-orange-300 text-sm">Language</p>

              <div className="grid grid-cols-1 gap-3 mt-2">
                {[
                  { value: "fi-en", label: "FI → EN" },
                  { value: "en-fi", label: "EN → FI" },
                ].map((opt) => {
                  const active = direction === opt.value;

                  return (
                    <button
                      key={opt.value}
                      onClick={() => setDirection(opt.value)}
                      className={`p-2 rounded-full text-sm border transition-all ${
                        active
                          ? "bg-blue-600 text-white shadow-lg scale-110"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Aihealue */}
            <div className="bg-white/5 rounded-xl p-4 space-y-3">
              <p className="font-semibold">Vaikeustaso</p>
              <p className="text-orange-300 text-sm">Difficulty</p>

              <div className="grid grid-cols-1 gap-3 mt-2">
                {["beginner", "medium", "hard"].map((opt) => {
                  const active = difficulty === opt;

                  return (
                    <button
                      key={opt}
                      onClick={() => setDifficulty(opt)}
                      className={`p-2 rounded-full text-sm border transition-all ${
                        active
                          ? "bg-blue-600 text-white shadow-lg scale-110"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Vaikeustaso (täys leveys) */}
          <div className="bg-white/5 rounded-xl p-4 space-y-3 backdrop-blur-sm w-full">
            <p className="font-semibold">Aihealue</p>
            <p className="text-orange-300 text-sm">Category</p>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                "animals",
                "food",
                "objects",
                "professions",
                "vehicles",
                "directions",
              ].map((opt) => {
                const active = category === opt;

                return (
                  <button
                    key={opt}
                    onClick={() => setCategory(opt)}
                    className={`p-2 rounded-full text-sm border transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-lg scale-110"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Aloitus */}
          <div className="p-4 flex items-center justify-center backdrop-blur-sm">
            <button
              onClick={() =>
                navigate("/game", {
                  state: { direction, difficulty, category },
                })
              }
              className="bg-accent px-6 py-3 rounded-full w-full border"
            >
              <span className="block font-bold text-white">Aloita</span>
              <span className="block text-xs text-orange-300">Start</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mt-12">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Tervetuloa pelaamaan!
        </h2>
        <p className="text-orange-300 text-xs pb-4">Welcome to play!</p>
        <p className="text-white text-sm mt-3">
          Learn Finnish Videos YouTube kanava on saanut kaverin.
        </p>
        <p className="text-orange-300 text-xs">
          The Learn Finnish Videos YouTube channel has got a companion.
        </p>
        <p className="text-white text-sm">
          Harjoittele suomi–englanti sanastoa kirjoittamalla oikeat vastaukset
          valitsemistasi aihealueista ja vaikeustasoista.
        </p>
        <p className="text-orange-300 text-xs">
          Practice Finnish–English vocabulary by typing the correct answers from
          your selected categories and difficulty levels.
        </p>
      </div>
      {attempts.length > 0 && (
        <div className="w-full max-w-md flex flex-col gap-6 mt-24 p-4 bg-blue-950 rounded-2xl">
          <div>
            <h2 className="font-semibold">Aiemmat suoritukset</h2>
            <p className="text-orange-300 text-sm">Previous attempts</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm space-y-2">
            <ul className="space-y-2 overflow-y-auto">
              {[...attempts]
                .slice(-20)
                .reverse()
                .map((a, i) => {
                  return (
                    <li
                      key={i}
                      className="text-sm border-b border-white/10 pb-1 flex justify-center items-center gap-4 min-w-0"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <div className="scale-50 origin-center">
                          <ScoreChart score={a.score} total={a.words.length} />
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-blue-300 truncate">
                          {new Date(a.createdAt).toLocaleString("fi-FI", {
                            weekday: "long",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>

                        <div className="truncate">
                          Pisteet: {a.score} / {a.words.length}
                        </div>

                        <div className="text-white/60 truncate">
                          {a.category} · {a.difficulty} · {a.direction}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
      {weakWords.length > 0 && (
        <div className="w-full max-w-md flex flex-col my-24 bg-white/10 p-4 rounded-2xl">
          <h2 className="font-semibold">Harjoittele näitä</h2>
          <p className="text-orange-300 text-sm">Practice these</p>
          <br />

          <ul className="w-full bg-white/10 px-4 py-1 rounded-2xl">
            {weakWords.map((w, i) => {
              const [fi, en] = w.word.split("-");

              return (
                <li key={i} className="w-full">
                  <div className="grid grid-cols-[1fr_1fr_auto] items-center w-full">
                    <span className="text-left">{fi}</span>
                    <span className="text-left text-white/70">{en}</span>
                    <span className="text-right text-red-300 text-sm">
                      {w.wrong} väärin
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
}
