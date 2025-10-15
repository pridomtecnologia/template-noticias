import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// páginas
import HomePage from "./page/home/HomePage";
import PoliticaPage from "./page/politica/PoliticaHome";
import EsportePage from "./page/esportes/EsportePage";
import NoticiaPage from "./page/noticias/NoticiaPage";
import EconomiaPage from "./page/economia/EconomiaPage";
import CulturaPage from "./page/cultura/CulturaPage";
import LeituraNoticiaPage from "./page/leituraNoticia/LeituraNoticiaPage";


function App() {
  return (
    <Router basename="/template-noticias">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/politica" element={<PoliticaPage />} />
        <Route path="/esportes" element={<EsportePage />} />
        <Route path="/noticias" element={<NoticiaPage />} />
        <Route path="/economia" element={<EconomiaPage />} />
        <Route path="/cultura" element={<CulturaPage />} />
        <Route path="/leitura" element={<LeituraNoticiaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
