// src/pages/MenuSentences.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import lfg from "/lfg.png";

export default function MenuSentences() {
  const navigate = useNavigate();

  const [direction, setDirection] = useState("en-fi");
  const [category, setCategory] = useState("animals");
  const [difficulty, setDifficulty] = useState("beginner");

  return (
    <div className="relative min-h-screen text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md flex flex-col gap-4 mt-2">
        <div className="flex flex-col bg-white/5 rounded-2xl p-4 space-y-3">
          <div className="white-shadow w-full max-w-md flex flex-col gap-6 p-2 mb-14 bg-blue-50/5 rounded-2xl relative">
            <img
              src={lfg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-md scale-80"
            />

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

          <div className="grid grid-cols-2 gap-4">
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

          <div className="p-4 flex items-center justify-center backdrop-blur-sm">
            <button
              onClick={() =>
                navigate("/gamewords", {
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

      <Footer />
    </div>
  );
}
