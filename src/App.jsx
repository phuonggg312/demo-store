import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PLP from "./pages/Plp.jsx";
import PDP from "./pages/Pdp.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<PLP />} />
          <Route path="/products/:handle" element={<PDP />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
