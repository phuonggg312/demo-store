import { Link } from "react-router-dom";

export default function HeroBanner() {
    return (
        <section className="hero-banner">
            <div className="hero-banner__container">
                <div className="hero-banner__content">
                    <h1 className="hero-banner__title">Midweight classics</h1>
                    <p className="hero-banner__subtitle">Clothes that work as hard as you do.</p>
                    <Link to="/collections" className="hero-banner__btn">
                        Shop now
                    </Link>
                </div>
            </div>
        </section>
    );
}
