import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-3.8-3.8" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);      
  const [scrolled, setScrolled] = useState(false); 
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const q = (params.get("q") || "").toLowerCase();
  const onCollections = location.pathname.startsWith("/collections");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActiveQ(name) {
    return onCollections && q === name;
  }

  return (
    <header
      className={
        "sticky top-0 z-50 bg-white border-b border-gray-200 pt-[18px] pb-[14px] " +
        (scrolled ? "shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : "")
      }
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-3 items-center">
        <div className="flex items-center gap-6">
          {/* mobile menu*/}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-gray-900 hover:text-gray-600"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu />
          </button>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/collections/men"         className={`nav__link ${isActiveQ('men') ? 'text-black' : 'text-gray-900'}`}>Men</Link>
            <Link to="/collections/women"   className={`nav__link ${isActiveQ('women') ? 'text-black' : 'text-gray-900'}`}>Women</Link>
            <Link to="/collections/unisex"  className={`nav__link ${isActiveQ('unisex') ? 'text-black': 'text-gray-900'}`}>Unisex</Link>
            <Link to="/collections"         className={`nav__link ${isActiveQ('collections') ? 'text-black' : 'text-gray-900'}`}>Collections</Link>
            <Link to="/blogs/news"          className="nav__link">News</Link>
          </nav>
        </div>

        <Link to="/" className="justify-self-center inline-flex" aria-label="DemoStore">
          <img
            src="https://demostore.mock.shop/cdn/shop/files/newer.gif?v=1675451764&width=200"
            alt="DemoStore"
            className="h-12 md:h-16"
            loading="eager"
          />
        </Link>

        <div className="justify-self-end flex items-center gap-2 md:gap-3">
          <button className="inline-flex items-center justify-center w-10 h-10 text-gray-900 hover:text-gray-600" aria-label="Search">
            <IconSearch />
          </button>
          <button className="hidden md:inline-flex items-center justify-center w-10 h-10 text-gray-900 hover:text-gray-600" aria-label="Account">
            <IconUser />
          </button>
          <Link to="/cart" className="inline-flex items-center justify-center w-10 h-10 text-gray-900 hover:text-gray-600" aria-label="Cart">
            <i className="fa-solid fa-cart-shopping text-[18px]" aria-hidden="true"></i>
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40">
          <button
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-full max-w-[85%] bg-white">
            <button
              className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center text-gray-900 hover:text-gray-600"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>

            <nav className="flex flex-col gap-6 px-8 pt-24 pb-8">
              <Link to="/collections/men"    className="nav__link--mb" onClick={() => setOpen(false)}>Men</Link>
              <Link to="/collections/women"  className="nav__link--mb" onClick={() => setOpen(false)}>Women</Link>
              <Link to="/collections/unisex" className="nav__link--mb" onClick={() => setOpen(false)}>Unisex</Link>
              <Link to="/collections"        className="nav__link--mb" onClick={() => setOpen(false)}>Collections</Link>
              <Link to="/blogs/news"         className="nav__link--mb" onClick={() => setOpen(false)}>News</Link>
            </nav>

            <div className="px-8 py-8 bg-[#f5f5f5]">
              <Link to="/account" className="flex items-center gap-3 text-base text-gray-900 hover:text-gray-600 mb-8" onClick={() => setOpen(false)}>
                <IconUser />
                <span>Log in</span>
              </Link>
              <div className="flex items-center gap-5 text-xl">
                <a href="#" className="social__link--mb" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
                <a href="#" className="social__link--mb" aria-label="Facebook"><i className="fa-brands fa-facebook" /></a>
                <a href="#" className="social__link--mb" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
                <a href="#" className="social__link--mb" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
