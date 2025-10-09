import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const IconSearch = ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7"></circle>
        <path d="M21 21l-3.8-3.8"></path>
    </svg>
);
const IconUser = ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="7" r="4"></circle>
        <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
    </svg>
);
const IconBag = ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <path
            d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

const IconMenu = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

function useActiveQuery() {
    const { pathname, search } = useLocation();
    const isPLP = pathname === "/collections";
    const q = new URLSearchParams(search).get("q")?.toLowerCase() || "";
    return { isPLP, q };
}

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { isPLP, q } = useActiveQuery();

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    useEffect(() => {
        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            
            setScrolled(currentScroll > 10);
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActiveQ = (name) => isPLP && q === name;
    const closeDrawer = () => setOpen(false);

    return (
        <header className={`header ${hidden ? 'header--hidden' : ''} ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner">
                {/* Mobile menu button + Desktop nav */}
                <div className="header__left">
                    {/* Mobile menu button */}
                    <button
                        className="nav__toggle md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <IconMenu />
                    </button>

                    {/* Desktop nav */}
                    <nav className="nav hidden md:flex">
                        <Link to="/collections/men" className={`nav__link ${isActiveQ("men") ? "nav__link--active" : ""}`}>Men</Link>
                        <Link to="/collections/women" className={`nav__link ${isActiveQ("women") ? "nav__link--active" : ""}`}>Women</Link>
                        <Link to="/collections/unisex" className={`nav__link ${isActiveQ("unisex") ? "nav__link--active" : ""}`}>Unisex</Link>
                        <Link to="/collections" className={`nav__link ${isActiveQ("collections") ? "nav__link--active" : ""}`}>Collections</Link>
                        <Link to="/blogs/news" className={`nav__link ${isActiveQ("news") ? "nav__link--active" : ""}`}>News</Link>
                    </nav>
                </div>

                {/* logo */}
                <Link to="/" className="header__logo" aria-label="DemoStore">
                    <img
                        src="https://demostore.mock.shop/cdn/shop/files/newer.gif?v=1675451764&width=200"
                        alt="DemoStore"
                        className="header__logo-img"
                        loading="eager"
                    />
                </Link>

                {/* actions */}
                <div className="header__actions">
                    <button className="icon-btn" aria-label="Search">
                        <IconSearch />
                    </button>
                    <button className="icon-btn hidden md:inline-flex" aria-label="Account">
                        <IconUser />
                    </button>
                    <Link to="/cart" className="icon-btn" aria-label="Cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>
            </div>

            {/* DRAWER mobile  */}
            <div className={`drawer ${open ? "drawer--open" : ""}`} role="dialog" aria-modal="true">
                <div className="drawer__panel">
                    <button className="drawer__close" onClick={closeDrawer} aria-label="Close menu">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M6 6l12 12M18 6l-12 12" />
                        </svg>
                    </button>

                    <nav className="drawer__nav">
                        <Link to="/collections/men" className="drawer__link" onClick={closeDrawer}>Men</Link>
                        <Link to="/collections/women" className="drawer__link" onClick={closeDrawer}>Women</Link>
                        <Link to="/collections/unisex" className="drawer__link" onClick={closeDrawer}>Unisex</Link>
                        <Link to="/collections" className="drawer__link" onClick={closeDrawer}>Collections</Link>
                        <Link to="/blogs/news" className="drawer__link" onClick={closeDrawer}>News</Link>
                    </nav>

                    <div className="drawer__bottom">
                        <Link to="/account" className="drawer__login" onClick={closeDrawer}>
                            <IconUser className="w-5 h-5" />
                            <span>Log in</span>
                        </Link>

                        <div className="drawer__social">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                                <i className="fa-brands fa-pinterest"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <i className="fa-brands fa-tiktok"></i>
                            </a>
                            <a href="https://tumblr.com" target="_blank" rel="noopener noreferrer" aria-label="Tumblr">
                                <i className="fa-brands fa-tumblr"></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <button className="drawer__backdrop" onClick={closeDrawer} aria-label="Close menu" />
            </div>
        </header>
    );
}
