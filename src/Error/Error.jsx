import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      
      {/* Animated floating products */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="animate-float-slow absolute w-12 h-12 bg-blue-900 rounded-full top-10 left-1/4"></div>
        <div className="animate-float absolute w-16 h-16 bg-blue-700 rounded-full top-1/2 left-1/3"></div>
        <div className="animate-float-fast absolute w-10 h-10 bg-blue-500 rounded-full top-3/4 left-2/3"></div>
      </div>

      {/* 404 Text */}
      <h1 className="text-8xl md:text-[12rem] font-extrabold text-blue-900 animate-bounce">404</h1>
      <h2 className="text-3xl md:text-5xl font-semibold mt-2 text-gray-700">Oops! Page Not Found</h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-8 py-3 bg-blue-900 text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          Go to Home
        </Link>
        <Link
          to="/allProduct"
          className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          Browse Products
        </Link>
      </div>

      {/* Popular Categories */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Popular Categories</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {["Shoes", "Beauty", "Electronics", "Clothing"].map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg shadow hover:bg-blue-200 transform hover:-translate-y-1 hover:scale-105 transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-fast {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default NotFound;
