import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CursorTrail } from "../components/CursorTrail";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      <CursorTrail />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
