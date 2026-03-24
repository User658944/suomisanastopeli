// src/pages/MenuWords.tsx
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import lfg from "/lfg.png";
import { useEffect, useState } from "react";

export default function MenuWords() {
  const navigate = useNavigate();

  const [direction, setDirection] = useState("en-fi");
  const [category, setCategory] = useState("animals");
  const [difficulty, setDifficulty] = useState("beginner");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md flex flex-col gap-4 mt-2">
        <div className="white-shadow w-full max-w-md flex flex-col gap-6 p-4 mb-14 bg-suomi rounded-2xl relative">
          <div
            className="fixed inset-0 -z-10 blur-sm"
            style={{
              transform: `translateY(${-offset}px) scale(1.4)`,
              backgroundImage: `
                linear-gradient(rgba(0, 40, 120, 0.8), rgba(0, 40, 120, 0.8)),
                url(${lfg})
                `,
              backgroundSize: "cover",
              backgroundPosition: "left",
            }}
          />
          <div>
            <h1 className="p-2">Tervetuloa pelaamaan!</h1>
            <p className="text-orange-300 text-sm">Welcome to play!</p>
          </div>

          <div>
            <h2 className="m-0">Sanat</h2>
            <p className="text-orange-300 text-sm">Words</p>
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
                "clothes",
                "objects",
                "professions",
                "vehicles",
                "directions",
                "time",
                "colors",
                "school",
                "home",
                "traffic",
                "some",
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
      <div className="w-70 gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white/10 p-2 rounded border border-white/20"
        >
          <span className="block font-bold">Poistu</span>
          <span className="block text-xs text-orange-300">Exit</span>
        </button>
      </div>
      <div className="w-full max-w-md mt-12">
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

      <Footer />
    </div>
  );
}
