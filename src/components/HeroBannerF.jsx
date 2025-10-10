import { Link } from "react-router-dom";
export default function HeroBannerF() {
    return (
        <section className="
        relative w-full
        min-h-[500px] md:min-h-[600px]
        bg-cover bg-center bg-no-repeat
        flex flex-col justify-center items-center
        md:justify-end md:items-star md:pl-40"
            style={{
                backgroundImage: "url('https://demostore.mock.shop/cdn/shop/files/DALL_E_2023-02-03_11.19.22_-_basketball_gym_5_1.png?v=1675445658&width=1500')"
            }}>
            <div className="absolute inset-0 bg-black/0" />
            <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 md:pb-20">
                <div className="text-center md:text-left">
                    <h1 className="font-black text-white tracking-[-0.02em] leading-[1.1] text-4xl md:text-7xl" style={{fontFamily:"Inter, system-ui"}}>The Peak Collection</h1>
                    <p className="mt-3 text-white md:mt-4 text-base md:text-lg">Push your performance with our prenium athletic wear</p>
                    <Link to="/collections" className="text-white mt-8 inline-block px-8 py-3 border-2 border-white font-medium hover:bg-white hover:text-black transition-all duration-300">Shop now</Link>
                </div>
            </div>


        </section>
    );
}
