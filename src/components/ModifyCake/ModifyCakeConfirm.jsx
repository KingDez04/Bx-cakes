import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";

const ModifyCakeConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cake = location.state?.cake;

  if (!cake) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No cake selected</p>
          <button
            onClick={() => navigate("/modify-cake")}
            className="bg-[#FF5722] px-6 py-3 rounded-full hover:bg-[#FF5722]/90 transition-colors cursor-pointer text-white"
          >
            Back to Modify Cake
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    navigate(`/modify-cake/${cake.id}/customize`, { state: { cake } });
  };

  const handleCancel = () => {
    navigate("/modify-cake");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-linear-to-r from-orange-900 via-black to-orange-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Modify A Cake
          </h1>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
            Not sure what design to choose? Don't worry—we can help! You can
            even customize our previous creations to fit your style and taste.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/modify-cake")}
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h2 className="text-3xl font-bold text-center mb-12">
          You Are About To Modify...
        </h2>

        <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="flex flex-wrap gap-2">
                {cake.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white border border-gray-300 px-4 py-1.5 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {cake.description}
              </p>
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="w-full bg-[#FF5722] hover:bg-[#FF5722]/90 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default ModifyCakeConfirm;
