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
function IconCart() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
    </svg>
  );
}
function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  function isActiveQ(name) {
    return onCollections && q === name;
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 pt-[18px] pb-[14px] transition-transform duration-300 ${
        scrolled ? "shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : ""
      } ${hidden ? "-translate-y-full" : ""}`}
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
            width="200"
            height="64"
            fetchPriority="high"
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
            <IconCart />
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
                <a href="#" className="social__link--mb" aria-label="Twitter"><IconTwitter /></a>
                <a href="#" className="social__link--mb" aria-label="Facebook"><IconFacebook /></a>
                <a href="#" className="social__link--mb" aria-label="Instagram"><IconInstagram /></a>
                <a href="#" className="social__link--mb" aria-label="YouTube"><IconYouTube /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
