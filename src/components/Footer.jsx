import { useState } from "react";

/** Social Media Icons */
const IconTwitter = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const IconFacebook = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
    </svg>
);

const IconPinterest = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.804 19.235c-.052-.478-.098-1.212.02-1.734.107-.473.69-2.93.69-2.93s-.176-.353-.176-.873c0-.818.474-1.429 1.064-1.429.502 0 .744.377.744.83 0 .505-.322 1.26-.488 1.96-.139.586.294 1.064.872 1.064 1.047 0 1.852-1.104 1.852-2.697 0-1.41-1.013-2.395-2.46-2.395-1.676 0-2.66 1.257-2.66 2.556 0 .506.195.95.438 1.218a.203.203 0 0 1 .047.195c-.052.214-.168.683-.19.778-.03.126-.1.153-.232.092-.82-.382-1.333-1.58-1.333-2.543 0-1.857 1.35-3.563 3.892-3.563 2.044 0 3.633 1.456 3.633 3.402 0 2.03-1.28 3.665-3.058 3.665-.597 0-1.158-.31-1.35-.677l-.367 1.4c-.133.513-.492 1.156-.732 1.548A10 10 0 1 0 12 2Z" />
    </svg>
);

const IconInstagram = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
);

const IconTikTok = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);

const IconTumblr = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" />
    </svg>
);

const IconYouTube = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const IconArrowRight = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Newsletter signup:", email);
        // Add your newsletter signup logic here
        setEmail("");
    };

    return (
        <footer className="footer">
            <div className="footer__newsletter">
                <div className="footer__newsletter-inner">
                    <h2 className="footer__newsletter-title">Stay in the know</h2>
                    
                    <form onSubmit={handleSubmit} className="footer__newsletter-form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="footer__newsletter-input"
                        />
                        <button type="submit" className="footer__newsletter-submit" aria-label="Subscribe">
                            <IconArrowRight />
                        </button>
                    </form>

                    <p className="footer__social-title">Follow us on social media</p>
                    
                    <div className="footer__social-icons">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <IconTwitter />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <IconFacebook />
                        </a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                            <IconPinterest />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <IconInstagram />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                            <IconTikTok />
                        </a>
                        <a href="https://tumblr.com" target="_blank" rel="noopener noreferrer" aria-label="Tumblr">
                            <IconTumblr />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <IconYouTube />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer__bottom">
                <div className="footer__bottom-inner">
                    <div className="footer__selects">
                        <div className="footer__select-group">
                            <label className="footer__select-label">Country/region</label>
                            <select className="footer__select">
                                <option>Canada (CAD $)</option>
                                <option>United States (USD $)</option>
                                <option>United Kingdom (GBP £)</option>
                            </select>
                        </div>
                        
                        <div className="footer__select-group">
                            <label className="footer__select-label">Language</label>
                            <select className="footer__select">
                                <option>English</option>
                                <option>Français</option>
                                <option>Español</option>
                            </select>
                        </div>
                    </div>

                    <div className="footer__copyright">
                        © {new Date().getFullYear()}, <a href="/" className="footer__copyright-link">Mock.shop</a> Powered by Shopify
                    </div>
                </div>
            </div>
        </footer>
    );
}
