import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";
import rectCake from "../../assets/rectangleCake.png";
import sqrCake from "../../assets/squareCake.png";
import circleCake from "../../assets/circleCake.png";
import fondant from "../../assets/fondant.png";
import butterCream from "../../assets/butterCream.png";
import whippedCream from "../../assets/whippedCream.png";
import pickupImg from "../../assets/pickup.png";
import deliveryImg from "../../assets/doorStep.png";

const ModifyCakeCustomize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const cake = location.state?.cake;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shape: "Circle",
    numberOfTiers: 3,
    covering: "Buttercream",
    tiers: [
      {
        tierNumber: 1,
        flavors: [{ flavor: "Chocolate" }, { flavor: "Vanilla" }],
        size: { diameter: "8", height: "10", length: "8", width: "9" },
      },
      {
        tierNumber: 2,
        flavors: [{ flavor: "Chocolate" }],
        size: { diameter: "6", height: "8", length: "6", width: "7" },
      },
      {
        tierNumber: 3,
        flavors: [{ flavor: "Vanilla" }],
        size: { diameter: "4", height: "6", length: "4", width: "5" },
      },
    ],
    deliveryMethod: "",
    customerNote: "",
  });

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

  const totalSteps = 5 + formData.numberOfTiers; // Shape, Tiers, Covering, Tier details, Delivery, Note

  const handleNext = () => {
    if (currentStep === 1 && !formData.shape) {
      toast.error("Please select a cake shape");
      return;
    }

    if (currentStep === 2 && formData.numberOfTiers === 0) {
      toast.error("Please select number of tiers");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Go to checkout
      navigate(`/modify-cake/${id}/checkout`, { state: { cake, formData } });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/modify-cake/${id}/confirm`, { state: { cake } });
    }
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateTierData = (tierIndex, field, value) => {
    const newTiers = [...formData.tiers];
    newTiers[tierIndex] = { ...newTiers[tierIndex], [field]: value };
    setFormData({ ...formData, tiers: newTiers });
  };

  const renderProgressDots = () => {
    return (
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index < currentStep ? "bg-[#FF5722]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Select the cake shape
          </h2>
          {renderProgressDots()}
          <div className="flex justify-center gap-8 mb-12">
            {["Circle", "Rectangle", "Square"].map((shape) => (
              <button
                key={shape}
                onClick={() => updateFormData("shape", shape)}
                className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                  formData.shape === shape ? "ring-4 ring-[#FF5722]" : ""
                }`}
              >
                <div className="w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
                  {shape === "Circle" && (
                    <img
                      src={circleCake}
                      alt={shape}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {shape === "Rectangle" && (
                    <img
                      src={rectCake}
                      alt={shape}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {shape === "Square" && (
                    <img
                      src={sqrCake}
                      alt={shape}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span className="font-semibold">{shape}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-12 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Select the number of tiers you want
          </h2>
          {renderProgressDots()}
          <div className="flex justify-center gap-6 mb-12">
            {[1, 2, 3, 4, 5].map((tier) => (
              <button
                key={tier}
                onClick={() => {
                  updateFormData("numberOfTiers", tier);
                  const newTiers = Array.from({ length: tier }, (_, i) => ({
                    tierNumber: i + 1,
                    flavors: [{ flavor: "Chocolate" }],
                    size: { diameter: "", height: "", length: "", width: "" },
                  }));
                  setFormData({
                    ...formData,
                    numberOfTiers: tier,
                    tiers: newTiers,
                  });
                }}
                className={`w-20 h-20 rounded-lg font-bold text-2xl transition-all cursor-pointer ${
                  formData.numberOfTiers === tier
                    ? "bg-white text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-12 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Select the covering type
          </h2>
          {renderProgressDots()}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { name: "Fondant", img: fondant },
              { name: "Butter cream", img: butterCream },
              { name: "Whipped cream", img: whippedCream },
            ].map((covering) => (
              <div
                key={covering.name}
                onClick={() => updateFormData("covering", covering.name)}
                className="cursor-pointer text-center"
              >
                <button
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden transition cursor-pointer ${
                    formData.covering === covering.name
                      ? "ring-4 ring-[#FF5722]"
                      : ""
                  }`}
                >
                  <img
                    src={covering.img}
                    alt={covering.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                <p
                  className={`font-semibold ${
                    formData.covering === covering.name
                      ? "text-[#FF5722]"
                      : "text-white"
                  }`}
                >
                  {covering.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-12 py-3 mt-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      );
    }

    const tierStepIndex = currentStep - 4;
    if (tierStepIndex >= 0 && tierStepIndex < formData.numberOfTiers) {
      const tier = formData.tiers[tierStepIndex];

      return (
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Tier {tierStepIndex + 1} Details
          </h2>
          {renderProgressDots()}
          <div className="bg-white rounded-2xl p-8 space-y-6">
            <div>
              <label className="block text-left font-semibold mb-2">
                Flavors
              </label>
              <input
                type="text"
                value={tier.flavors.map((f) => f.flavor).join(", ")}
                onChange={(e) => {
                  const flavors = e.target.value
                    .split(",")
                    .map((f) => ({ flavor: f.trim() }));
                  updateTierData(tierStepIndex, "flavors", flavors);
                }}
                placeholder="e.g., Chocolate, Vanilla"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-left font-semibold mb-2">
                  Diameter/Length
                </label>
                <input
                  type="text"
                  value={tier.size.diameter || tier.size.length}
                  onChange={(e) => {
                    const newSize = { ...tier.size };
                    if (formData.shape === "Circle") {
                      newSize.diameter = e.target.value;
                    } else {
                      newSize.length = e.target.value;
                    }
                    updateTierData(tierStepIndex, "size", newSize);
                  }}
                  placeholder="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block text-left font-semibold mb-2">
                  Height
                </label>
                <input
                  type="text"
                  value={tier.size.height}
                  onChange={(e) => {
                    const newSize = { ...tier.size, height: e.target.value };
                    updateTierData(tierStepIndex, "size", newSize);
                  }}
                  placeholder="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>

            {formData.shape !== "Circle" && (
              <div>
                <label className="block text-left font-semibold mb-2">
                  Width
                </label>
                <input
                  type="text"
                  value={tier.size.width}
                  onChange={(e) => {
                    const newSize = { ...tier.size, width: e.target.value };
                    updateTierData(tierStepIndex, "size", newSize);
                  }}
                  placeholder="9"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="mt-8 bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-12 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      );
    }

    if (currentStep === 4 + formData.numberOfTiers) {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Choose Your Delivery Method
          </h2>
          {renderProgressDots()}
          <div className="flex justify-center gap-8 mb-12">
            {[
              { name: "Pickup", img: pickupImg },
              { name: "Doorstep Delivery", img: deliveryImg },
            ].map((method) => (
              <div
                key={method.name}
                onClick={() => updateFormData("deliveryMethod", method.name)}
                className="cursor-pointer text-center"
              >
                <button
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden transition cursor-pointer ${
                    formData.deliveryMethod === method.name
                      ? "ring-4 ring-[#FF5722]"
                      : ""
                  }`}
                >
                  <img
                    src={method.img}
                    alt={method.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                <p
                  className={`font-semibold ${
                    formData.deliveryMethod === method.name
                      ? "text-[#FF5722]"
                      : "text-white"
                  }`}
                >
                  {method.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-12 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      );
    }

    if (currentStep === 5 + formData.numberOfTiers) {
      return (
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Any Other Important Details? Let us know!
          </h2>
          {renderProgressDots()}
          <div className="flex-1 w-full">
            <label className="text-white font-semibold block text-left mb-3 text-sm md:text-base">
              Customer Note
            </label>
            <textarea
              value={formData.customerNote}
              onChange={(e) =>
                updateFormData({ ...formData, customerNote: e.target.value })
              }
              placeholder="I would like to..."
              rows={6}
              className="w-full p-3 sm:p-4 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-[#FF5722] outline-none text-sm md:text-base"
            />
          </div>

          <button
            onClick={handleNext}
            className="mt-8 bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-12 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-950 via-black to-red-950">
      <div className="bg-linear-to-r from-orange-800 via-black to-orange-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Modify A Cake
          </h1>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
            Not sure what design to choose? Don’t worry—we can help! You can
            even customize our previous creations to fit your style and taste.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-colors z-10 cursor-pointer"
          aria-label="Previous"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {renderStepContent()}
      </div>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default ModifyCakeCustomize;
