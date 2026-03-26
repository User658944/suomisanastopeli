// src/pages/Menu.tsx
import { useNavigate } from "react-router-dom";
import { useResults } from "../context/ResultContext";
import { ScoreChart } from "../components/ScoreChartDiagram";
import { YoutubeLink } from "../components/Footer";
import Footer from "../components/Footer";
import lfg from "/lfg.png";
import s100 from "/suomi100.jpg";

export default function Menu() {
  const navigate = useNavigate();

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
      <div
        className="fixed inset-0 -z-10 blur-sm"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 40, 120, 0.8), rgba(0, 40, 120, 0.8)),
      url(${s100})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="w-full max-w-md flex flex-col gap-4 mt-2">
        <div className="flex flex-col rounded-2xl pt-4 space-y-3">
          <div className="white-shadow w-full max-w-md flex flex-col gap-6 p-2 mb-14 bg-blue-50/5 rounded-2xl relative">
            {/* Taustakuva */}
            <img
              src={lfg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-md scale-80"
            />

            {/* Sisältö päälle */}
            <div className="relative z-10">
              <h1 className="p-2">Learn Finnish Words</h1>
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
            <div
              className="bg-white/5 rounded-xl p-4 space-y-3 cursor-pointer white-shadow text-left bg-suomi border"
              onClick={() => navigate("/menuwords")}
            >
              <p className="font-semiboldn text-3xl">Sanat</p>
              <p className="text-orange-300 text-sm">Words</p>
              <div className="bg-white/5 rounded-xl p-2 mt-2 space-y-3 cursor-pointer">
                <p className="text-white text-sm">Harjoittele sanastoa</p>
                <p className="text-orange-300 text-xs">Practice vocabulary</p>
              </div>
            </div>
            <div
              className="bg-white/5 rounded-xl p-4 space-y-3 cursor-pointer white-shadow text-left bg-suomi border"
              onClick={() => navigate("/menusentences")}
            >
              <p className="font-semibold text-3xl">Lauseet</p>
              <p className="text-orange-300 text-sm">Sentences</p>
              <div className="bg-white/5 rounded-xl p-2 mt-2 space-y-3 cursor-pointer">
                {/* <div className=" bg-gray-500 text-gray-200 text-2xl px-2 py-1 rounded-2xl">
                  Tulossa
                </div> */}
                <p className="text-white text-sm">Harjoittele lauseita</p>
                <p className="text-orange-300 text-xs">Practice sentences</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 max-w-xs sm:max-w-sm mt-24 mx-auto bg-blue-900/30 rounded-2xl p-2">
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
          <YoutubeLink />
        </div>
        {attempts.length > 0 && (
          <div className="w-full max-w-md flex flex-col gap-6 mt-4 p-4 bg-blue-950 rounded-2xl">
            <div>
              <h2 className="font-semibold">Aiemmat suoritukset</h2>
              <p className="text-orange-300 text-sm">Previous attempts</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm space-y-2">
              <ul className="space-y-2 overflow-y-auto">
                {[...attempts]
                  .slice(-10)
                  .reverse()
                  .map((a, i) => {
                    return (
                      <li
                        key={i}
                        className="text-sm border-b border-white/10 pb-1 flex justify-center items-center gap-4 min-w-0"
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          <div className="scale-50 origin-center">
                            <ScoreChart
                              score={a.score}
                              total={a.words.length}
                            />
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
          <div className="w-full max-w-md flex flex-col my-24 bg-blue-900/70 border border-gray-500 p-4 rounded-2xl">
            <h2 className="font-semibold">Harjoittele näitä</h2>
            <p className="text-orange-300 text-sm">Practice these</p>
            <br />

            <ul className="w-full bg-white/10 px-4 py-1 rounded-2xl">
              {weakWords
                .filter((w) => w.wrong > 1)
                .map((w, i) => {
                  const [fi, en] = w.word.split("-");

                  return (
                    <li key={i} className="w-full border-b border-white/20">
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
      </div>
      <Footer />
    </div>
  );
}
