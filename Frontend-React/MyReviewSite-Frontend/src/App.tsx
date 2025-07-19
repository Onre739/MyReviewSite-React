import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRouter from "./components/AppRouter.tsx";

function App() {
  return (
    <div className="d-flex justify-content-center">
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </div>
  );
}

export default App;
