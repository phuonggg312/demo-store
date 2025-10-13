import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section
      className="
        relative w-full
        min-h-[500px] md:min-h-[600px]
        bg-cover bg-center bg-no-repeat
        flex items-center justify-center
      "
      style={{
        backgroundImage:
          "url('https://demostore.mock.shop/cdn/shop/files/second.jpg?v=1675442050&width=1500')",
      }}
      aria-label="Midweight classics"
    >
      <div className="absolute inset-0 bg-black/0 md:bg-black/0" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <h1
            className="
              font-black tracking-[-0.02em]
              leading-[1.1]
              text-4xl md:text-7xl
              text-gray-900
            "
            style={{ fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" }}
          >
            Midweight classics
          </h1>

          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-800">
            Clothes that work as hard as you do.
          </p>

          <Link
            to="/collections"
            className="
              mt-8 inline-block
              px-8 py-3
              border border-black
              text-black
              font-medium
              transition-all duration-300
            "
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}
