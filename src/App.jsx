import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AllCollections from "./pages/AllCollections.jsx"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

export default function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/:handle" element={<CollectionPage />} />
            <Route path="/collections" element={<AllCollections />} />
            <Route path="/products/:handle" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
