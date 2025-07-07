import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import About from "./pages/about.tsx";
import Game from "./pages/game.tsx";
import Login from "./pages/login.tsx";
import MakeRev from "./pages/make_rev.tsx";
import Search from "./pages/search.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/make_rev" element={<MakeRev />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
