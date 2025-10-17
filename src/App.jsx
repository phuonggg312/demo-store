import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const AllCollections = lazy(() => import("./pages/AllCollections.jsx"));
const CollectionPage = lazy(() => import("./pages/CollectionPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
    <p className="text-gray-500">Loading...</p>
  </div>
);

export default function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections/:handle" element={<CollectionPage />} />
              <Route path="/collections" element={<AllCollections />} />
              <Route path="/products/:handle" element={<ProductPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
