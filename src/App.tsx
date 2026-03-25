import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import MenuWords from "./pages/MenuWords";
import MenuSentences from "./pages/MenuSentences";
import GameWords from "./pages/GameWords";
import GameSentences from "./pages/GameSentences";
import Result from "./pages/Result";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menuwords" element={<MenuWords />} />
        <Route path="/menusentences" element={<MenuSentences />} />
        <Route path="/gamewords" element={<GameWords />} />
        <Route path="/gamesentences" element={<GameSentences />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
