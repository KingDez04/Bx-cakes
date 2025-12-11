import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, ShoppingBag } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FF5722] pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-[120px] md:text-[180px] font-bold text-black leading-none">
              404
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              The page you're looking for seems to have been moved or doesn't
              exist. But don't worry, we have plenty of delicious cakes waiting
              for you!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#D9D9D9] text-black text-lg font-medium rounded-full hover:bg-gray-400 transition-colors w-full sm:w-auto cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#FF5722] text-white text-lg font-medium rounded-full hover:bg-[#E64A19] transition-colors w-full sm:w-auto cursor-pointer"
              >
                <Home className="w-5 h-5" />
                Home Page
              </button>

              <button
                onClick={() => navigate("/readymade-cake")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pb-12">
          <p className="text-gray-500 text-base">
            Need help?{" "}
            <a
              href="/contact"
              className="text-[#FF5722] hover:underline font-medium"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
