import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import bg from "../assets/bg.png";

export function Layout() {
  return (
    <div className="min-h-screen text-amber-950 flex flex-col">
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10">
        <img src={bg} alt="" className="h-full w-full object-cover" />
      </div>

      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
