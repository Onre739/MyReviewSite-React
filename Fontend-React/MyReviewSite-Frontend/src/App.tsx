import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Game from "./pages/Game.tsx";
import Login from "./pages/Login.tsx";
import MakeRev from "./pages/MakeRev.tsx";
import Search from "./pages/Search.tsx";

function App() {
  return (
    <div className="d-flex justify-content-center">
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
    </div>
  );
}

export default App;
