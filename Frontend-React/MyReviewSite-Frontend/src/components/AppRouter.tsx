// AppRouter.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Game from "../pages/Game.tsx";
import Login from "../pages/Login.tsx";
import Search from "../pages/Search.tsx";

function AppRouter() {
  const location = useLocation();
  const [auth, setAuth] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include'
        });

        if (!response.ok) throw new Error("Auth check failed");

        const data = await response.json();

        if (data.authenticated) {
          console.log("✅ Přihlášen jako:", data.username);
          setAuth(true);
          setUserDetails(data.userDetails);
          console.log("user detail:", data.userDetails);
        } else {
          console.log("❌ Není přihlášen");
          setAuth(false);
        }
      } catch (error) {
        console.error("Chyba při kontrole přihlášení:", error);
      }
    };

    check();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home auth={auth} userDetails={userDetails} />} />
      <Route path="/about" element={<About auth={auth} userDetails={userDetails}/>} />
      <Route path="/game" element={<Game auth={auth} userDetails={userDetails}/>} />
      <Route path="/login" element={<Login auth={auth} userDetails={userDetails}/>} />
      <Route path="/search" element={<Search auth={auth} userDetails={userDetails}/>} />
    </Routes>
  );
}

export default AppRouter;
