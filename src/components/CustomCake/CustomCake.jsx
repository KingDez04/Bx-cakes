import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";
import bg from "../../assets/heading1.png";
import bg2 from "../../assets/heading2.png";
import rectCake from "../../assets/rectangleCake.png";
import sqrCake from "../../assets/squareCake.png";
import circleCake from "../../assets/circleCake.png";
import fondant from "../../assets/fondant.png";
import butterCream from "../../assets/butterCream.png";
import whippedCream from "../../assets/whippedCream.png";
import pickupImg from "../../assets/pickup.png";
import deliveryImg from "../../assets/doorStep.png";
import attachImg from "../../assets/attach.png";
import cakeImg from "../../assets/cake2.png";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const CustomCake = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shape: "",
    numberOfTiers: 0,
    tiers: [],
    covering: "",
    designImage: null,
    customerNote: "",
    deliveryMethod: "",
    deliveryAddress: "",
    deliveryDate: "",
  });
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      currentStep === getConfirmStep() &&
      formData.shape &&
      formData.numberOfTiers > 0 &&
      formData.covering
    ) {
      calculatePrice();
    }
  }, [currentStep]);

  const calculatePrice = async () => {
    setIsCalculating(true);
    try {
      const priceData = {
        shape: formData.shape,
        numberOfTiers: formData.numberOfTiers,
        covering: formData.covering,
        tiers: formData.tiers.map((tier, index) => ({
          size: tier.size?.height || "medium",
          numberOfFlavors: tier.flavorCount || tier.flavors?.length || 1,
        })),
      };

      const response = await axios.post(
        `${API_BASE_URL}/cakes/custom/calculate-price`,
        priceData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setCalculatedPrice(response.data.data.totalPrice);
      }
    } catch (error) {
      console.error("Price calculation error:", error);
      toast.error("Failed to calculate price. Using estimate.");
      setCalculatedPrice(50000);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!formData.deliveryMethod) {
      toast.error("Please select a delivery method");
      return;
    }

    if (formData.deliveryMethod === "doorstep" && !formData.deliveryAddress) {
      toast.error("Please enter delivery address");
      return;
    }

    if (!formData.deliveryDate) {
      toast.error("Please select delivery date");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderFormData = new FormData();
      orderFormData.append("shape", formData.shape);
      orderFormData.append("numberOfTiers", formData.numberOfTiers);
      orderFormData.append("covering", formData.covering);

      formData.tiers.forEach((tier, index) => {
        orderFormData.append(`tiers[${index}][tierNumber]`, index + 1);
        orderFormData.append(
          `tiers[${index}][size]`,
          tier.size?.height || "medium"
        );
        orderFormData.append(
          `tiers[${index}][numberOfFlavors]`,
          tier.flavorCount || tier.flavors?.length || 1
        );

        if (tier.flavors && tier.flavors.length > 0) {
          tier.flavors.forEach((flavor, fIndex) => {
            orderFormData.append(
              `tiers[${index}][flavors][${fIndex}][name]`,
              flavor.flavor || "Vanilla"
            );
            orderFormData.append(
              `tiers[${index}][flavors][${fIndex}][percentage]`,
              flavor.percentage || 100
            );
          });
        }
      });

      if (formData.designImage) {
        orderFormData.append("designImage", formData.designImage);
      }

      if (formData.customerNote) {
        orderFormData.append("customerNote", formData.customerNote);
      }

      orderFormData.append(
        "deliveryMethod",
        formData.deliveryMethod === "doorstep" ? "delivery" : "pickup"
      );

      if (formData.deliveryAddress) {
        orderFormData.append("deliveryAddress", formData.deliveryAddress);
      }

      orderFormData.append("deliveryDate", formData.deliveryDate);
      orderFormData.append("totalPrice", calculatedPrice || 50000);

      const response = await axios.post(
        `${API_BASE_URL}/orders/custom-cake`,
        orderFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Custom cake order placed successfully!");
        setTimeout(() => {
          navigate("/order-history");
        }, 2000);
      }
    } catch (error) {
      console.error("Order error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to place order");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalSteps = () => {
    if (formData.numberOfTiers === 0) return 2;
    return 3 + formData.numberOfTiers * 2 + 4;
  };

  const getCoveringStep = () => 3 + formData.numberOfTiers * 2;
  const getImageStep = () => getCoveringStep() + 1;
  const getNoteStep = () => getCoveringStep() + 2;
  const getDeliveryStep = () => getCoveringStep() + 3;
  const getConfirmStep = () => getCoveringStep() + 4;

  const handleNext = () => {
    if (currentStep === 1 && !formData.shape) {
      toast.error("Please select a cake shape");
      return;
    }

    if (currentStep === 2 && formData.numberOfTiers === 0) {
      toast.error("Please select number of tiers");
      return;
    }

    const tierIndex = Math.floor((currentStep - 3) / 2);
    if (currentStep >= 3 && currentStep < getCoveringStep()) {
      const isFlavorCountStep = (currentStep - 3) % 2 === 0;

      if (isFlavorCountStep) {
        if (
          !formData.tiers[tierIndex] ||
          !formData.tiers[tierIndex].flavorCount
        ) {
          toast.error(
            `Please select number of flavors for Tier ${tierIndex + 1}`
          );
          return;
        }
      } else {
        const tier = formData.tiers[tierIndex];
        if (!tier || !tier.flavors || tier.flavors.length === 0) {
          toast.error(
            `Please complete flavor selections for Tier ${tierIndex + 1}`
          );
          return;
        }
        if (!tier.size?.height || !tier.size?.width || !tier.size?.length) {
          toast.error(
            `Please select all size dimensions for Tier ${tierIndex + 1}`
          );
          return;
        }
      }
    }

    if (currentStep === getCoveringStep() && !formData.covering) {
      toast.error("Please select a covering type");
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateTierFlavorCount = (tierIndex, count) => {
    const newTiers = [...formData.tiers];
    newTiers[tierIndex] = {
      ...newTiers[tierIndex],
      flavorCount: count,
      flavors: [],
    };
    setFormData({ ...formData, tiers: newTiers });
  };

  const updateTierFlavors = (tierIndex, flavors) => {
    const newTiers = [...formData.tiers];
    newTiers[tierIndex] = {
      ...newTiers[tierIndex],
      flavors: flavors,
    };
    setFormData({ ...formData, tiers: newTiers });
  };

  const updateTierSize = (tierIndex, field, value) => {
    const newTiers = [...formData.tiers];
    newTiers[tierIndex] = {
      ...newTiers[tierIndex],
      size: {
        ...newTiers[tierIndex].size,
        [field]: value,
      },
    };
    setFormData({ ...formData, tiers: newTiers });
  };

  const addFlavor = (tierIndex) => {
    const tier = formData.tiers[tierIndex] || { flavors: [] };
    if (tier.flavors.length < (tier.flavorCount || 0)) {
      updateTierFlavors(tierIndex, [
        ...tier.flavors,
        { flavor: "", special: "" },
      ]);
    }
  };

  const updateFlavorValue = (tierIndex, flavorIndex, field, value) => {
    const tier = formData.tiers[tierIndex];
    const newFlavors = [...tier.flavors];
    newFlavors[flavorIndex] = {
      ...newFlavors[flavorIndex],
      [field]: value,
    };
    updateTierFlavors(tierIndex, newFlavors);
  };

  const incrementTiers = () => {
    if (formData.numberOfTiers < 6) {
      const newNum = formData.numberOfTiers + 1;
      setFormData({
        ...formData,
        numberOfTiers: newNum,
        tiers: Array(newNum)
          .fill({})
          .map(() => ({ flavorCount: 0, flavors: [], size: {} })),
      });
    }
  };

  const decrementTiers = () => {
    if (formData.numberOfTiers > 1) {
      const newNum = formData.numberOfTiers - 1;
      setFormData({
        ...formData,
        numberOfTiers: newNum,
        tiers: Array(newNum)
          .fill({})
          .map(() => ({ flavorCount: 0, flavors: [], size: {} })),
      });
    }
  };

  const incrementFlavors = (tierIndex) => {
    const tier = formData.tiers[tierIndex];
    if ((tier?.flavorCount || 0) < 4) {
      updateTierFlavorCount(tierIndex, (tier?.flavorCount || 0) + 1);
    }
  };

  const decrementFlavors = (tierIndex) => {
    const tier = formData.tiers[tierIndex];
    if ((tier?.flavorCount || 0) > 1) {
      updateTierFlavorCount(tierIndex, tier.flavorCount - 1);
    }
  };

  const renderTierVisualization = (tierCount, currentTierIndex = null) => {
    const tiers = [];
    for (let i = 0; i < tierCount; i++) {
      const isCurrentTier = i === currentTierIndex;
      const widthPercent = 100 - i * 15;
      tiers.push(
        <div
          key={i}
          className={`h-12 mx-auto transition-all ${
            isCurrentTier ? "bg-[#8B4513]" : "bg-white"
          }`}
          style={{ width: `${widthPercent}%` }}
        >
          <div className="h-full flex items-center justify-center text-sm font-bold">
            {isCurrentTier ? i + 1 : ""}
          </div>
        </div>
      );
    }
    return <div className="space-y-0 flex flex-col-reverse">{tiers}</div>;
  };

  const renderProgressDots = () => {
    const totalSteps = getTotalSteps();
    return (
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index + 1 === currentStep
                ? "bg-[#FF5722]"
                : index + 1 < currentStep
                ? "bg-[#FF5722]/50"
                : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    const isConfirmPage = currentStep === getConfirmStep();

    if (currentStep === 1) {
      return (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
            Select the cake shape
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { name: "Rectangle", img: rectCake },
              { name: "Square", img: sqrCake },
              { name: "Circle", img: circleCake },
            ].map((shape) => (
              <div
                key={shape.name}
                onClick={() => setFormData({ ...formData, shape: shape.name })}
                className="cursor-pointer text-center"
              >
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden transition ${
                    formData.shape === shape.name ? "ring-4 ring-[#FF5722]" : ""
                  }`}
                >
                  <img
                    src={shape.img}
                    alt={shape.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className={`font-semibold ${
                    formData.shape === shape.name
                      ? "text-[#FF5722]"
                      : "text-white"
                  }`}
                >
                  {shape.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
            Select the number of tiers you want
          </h2>
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="w-32 sm:w-48">
              {formData.numberOfTiers > 0 &&
                renderTierVisualization(formData.numberOfTiers)}
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={incrementTiers}
                className="text-white hover:text-[#FF5722] transition mb-2 cupsor-pointer"
              >
                <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <div className="bg-white rounded-full px-8 sm:px-12 py-2 sm:py-3 text-xl sm:text-2xl font-bold">
                {formData.numberOfTiers || 0}
              </div>
              <button
                onClick={decrementTiers}
                className="text-white hover:text-[#FF5722] transition mt-2 cupsor-pointer"
              >
                <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentStep >= 3 && currentStep < getCoveringStep()) {
      const tierIndex = Math.floor((currentStep - 3) / 2);
      const isFlavorCountStep = (currentStep - 3) % 2 === 0;
      const tier = formData.tiers[tierIndex] || {
        flavorCount: 0,
        flavors: [],
        size: {},
      };

      if (isFlavorCountStep) {
        return (
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
              Select the number of flavors for Tier {tierIndex + 1}
            </h2>
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="w-32 sm:w-48">
                {renderTierVisualization(formData.numberOfTiers, tierIndex)}
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => incrementFlavors(tierIndex)}
                  className="text-white hover:text-[#FF5722] transition mb-2"
                >
                  <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <div className="bg-white rounded-full px-8 sm:px-12 py-2 sm:py-3 text-xl sm:text-2xl font-bold">
                  {tier.flavorCount || 0}
                </div>
                <button
                  onClick={() => decrementFlavors(tierIndex)}
                  className="text-white hover:text-[#FF5722] transition mt-2"
                >
                  <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        if (tier.flavors.length < tier.flavorCount) {
          const flavorsToAdd = tier.flavorCount - tier.flavors.length;
          for (let i = 0; i < flavorsToAdd; i++) {
            addFlavor(tierIndex);
          }
        }

        return (
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
              Select the flavor(s) and size for Tier {tierIndex + 1}
            </h2>
            <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-12">
              <div className="w-32 sm:w-48 mx-auto md:mx-0">
                {renderTierVisualization(formData.numberOfTiers, tierIndex)}
              </div>

              <div className="space-y-6 text-left w-full md:w-auto">
                {tier.flavors.map((flavorItem, flavorIndex) => (
                  <div key={flavorIndex} className="space-y-2">
                    <label className="text-white font-semibold block text-sm md:text-base">
                      {flavorIndex + 1}
                      {flavorIndex === 0
                        ? "st"
                        : flavorIndex === 1
                        ? "nd"
                        : "rd"}{" "}
                      Flavor
                    </label>
                    <select
                      value={flavorItem.flavor}
                      onChange={(e) =>
                        updateFlavorValue(
                          tierIndex,
                          flavorIndex,
                          "flavor",
                          e.target.value
                        )
                      }
                      className="w-full md:w-64 px-4 py-3 rounded-full bg-white text-black appearance-none cursor-pointer text-sm md:text-base"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "12px",
                      }}
                    >
                      <option value="">Select Flavor</option>
                      <option value="Vanilla">Vanilla</option>
                      <option value="Chocolate">Chocolate</option>
                      <option value="Strawberry">Strawberry</option>
                      <option value="Red Velvet">Red Velvet</option>
                      <option value="Lemon">Lemon</option>
                      <option value="Carrot">Carrot</option>
                    </select>
                    <select
                      value={flavorItem.special}
                      onChange={(e) =>
                        updateFlavorValue(
                          tierIndex,
                          flavorIndex,
                          "special",
                          e.target.value
                        )
                      }
                      className="w-full md:w-64 px-4 py-3 rounded-full bg-white text-black appearance-none cursor-pointer text-sm md:text-base"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "12px",
                      }}
                    >
                      <option value="">Special</option>
                      <option value="Sugar Free">Sugar Free</option>
                      <option value="Gluten Free">Gluten Free</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                    {flavorItem.special && (
                      <input
                        type="text"
                        placeholder="Please Specify"
                        className="w-full md:w-64 px-4 py-3 rounded-full bg-white text-black text-sm md:text-base"
                      />
                    )}
                  </div>
                ))}

                <div className="mt-8">
                  <p className="text-white text-sm mb-4 text-center">
                    All measurements are in inches
                  </p>
                  <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 items-start justify-center">
                    <div className="flex flex-col items-center">
                      <label className="text-white font-semibold mb-2 text-xs sm:text-sm md:text-base">
                        Height
                      </label>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => {
                            const currentValue =
                              parseInt(tier.size?.height) || 2;
                            updateTierSize(
                              tierIndex,
                              "height",
                              currentValue + 1
                            );
                          }}
                          className="text-white hover:text-[#FF5722] p-1 rounded-t-full transition cursor-pointer"
                        >
                          <ChevronUp className="w-3 h-3 sm:w-8 sm:h-8" />
                        </button>
                        <div className="bg-white rounded-full text-black px-4 sm:px-6 py-1.5 sm:py-2 text-center font-bold text-lg sm:text-xl">
                          {tier.size?.height || 2}
                        </div>
                        <button
                          onClick={() => {
                            const currentValue =
                              parseInt(tier.size?.height) || 2;
                            if (currentValue > 1) {
                              updateTierSize(
                                tierIndex,
                                "height",
                                currentValue - 1
                              );
                            }
                          }}
                          className="text-white hover:text-[#FF5722] p-1 rounded-full transition cursor-pointer"
                        >
                          <ChevronDown className="w-3 h-3 sm:w-8 sm:h-8" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <label className="text-white font-semibold mb-2 text-xs sm:text-sm md:text-base">
                        Width
                      </label>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => {
                            const currentValue =
                              parseInt(tier.size?.width) || 2;
                            updateTierSize(
                              tierIndex,
                              "width",
                              currentValue + 1
                            );
                          }}
                          className="text-white hover:text-[#FF5722] p-1 rounded-full transition cursor-pointer"
                        >
                          <ChevronUp className="w-3 h-3 sm:w-8 sm:h-8" />
                        </button>
                        <div className="bg-white rounded-full text-black px-4 sm:px-6 py-1.5 sm:py-2 text-center font-bold text-lg sm:text-xl">
                          {tier.size?.width || 2}
                        </div>
                        <button
                          onClick={() => {
                            const currentValue =
                              parseInt(tier.size?.width) || 2;
                            if (currentValue > 1) {
                              updateTierSize(
                                tierIndex,
                                "width",
                                currentValue - 1
                              );
                            }
                          }}
                          className="text-white hover:text-[#FF5722] p-1 rounded-t-full transition cursor-pointer"
                        >
                          <ChevronDown className="w-3 h-3 sm:w-8 sm:h-8" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <label className="text-white font-semibold mb-2 text-xs sm:text-sm md:text-base">
                        Length
                      </label>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => {
                            const currentValue =
                              parseInt(tier.size?.length) || 2;
                            updateTierSize(
                              tierIndex,
                              "length",
                              currentValue + 1
                            );
                          }}
                          className="text-white hover:text-[#FF5722] p-1 rounded-full transition cursor-pointer"
                        >
                          <ChevronUp className="w-3 h-3 sm:w-8 sm:h-8" />
                        </button>
                        <div className="bg-white rounded-full text-black px-4 sm:px-6 py-1.5 sm:py-2 text-center font-bold text-lg sm:text-xl">
                          {tier.size?.length || 2}
                        </div>
                        <button
                          onClick={() => {
                            const currentValue =
                              parseInt(tier.size?.length) || 2;
                            if (currentValue > 1) {
                              updateTierSize(
                                tierIndex,
                                "length",
                                currentValue - 1
                              );
                            }
                          }}
                          className="text-white hover:text-[#FF5722] p-1 rounded-t-full transition cursor-pointer"
                        >
                          <ChevronDown className="w-3 h-3 sm:w-8 sm:h-8" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    if (currentStep === getCoveringStep()) {
      return (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
            Select the covering type
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { name: "Fondant", img: fondant },
              { name: "Butter cream", img: butterCream },
              { name: "Whipped cream", img: whippedCream },
            ].map((covering) => (
              <div
                key={covering.name}
                onClick={() =>
                  setFormData({ ...formData, covering: covering.name })
                }
                className="cursor-pointer text-center"
              >
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden transition ${
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
                </div>
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
        </div>
      );
    }

    if (currentStep === getImageStep()) {
      return (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
            Add a picture of the design you want
          </h2>
          <div className="max-w-md mx-auto px-4">
            <div
              className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8 sm:p-16 cursor-pointer hover:border-[#FF5722]/50 transition"
              onClick={() => document.getElementById("design-upload").click()}
            >
              <img
                src={attachImg}
                alt="Attach"
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50"
              />
              <p className="text-gray-400">
                {formData.designImage
                  ? formData.designImage.name
                  : "Attach Image"}
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, designImage: e.target.files[0] })
              }
              className="hidden"
              id="design-upload"
            />
          </div>
        </div>
      );
    }

    if (currentStep === getNoteStep()) {
      return (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
            Any Other Important Details? Let us know!
          </h2>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <img
              src={cakeImg}
              alt="Cake"
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-cover rounded-lg mx-auto md:mx-0"
            />
            <div className="flex-1 w-full">
              <label className="text-white font-semibold block text-left mb-3 text-sm md:text-base">
                Customer Note
              </label>
              <textarea
                value={formData.customerNote}
                onChange={(e) =>
                  setFormData({ ...formData, customerNote: e.target.value })
                }
                placeholder="I would like to..."
                rows={6}
                className="w-full p-3 sm:p-4 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-[#FF5722] outline-none text-sm md:text-base"
              />
            </div>
          </div>
        </div>
      );
    }

    if (currentStep === getDeliveryStep()) {
      return (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8 md:mb-12">
            Choose Your Delivery Method
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 max-w-3xl mx-auto mb-8">
            {[
              { name: "Pickup", img: pickupImg },
              { name: "Doorstep Delivery", img: deliveryImg },
            ].map((method) => (
              <div
                key={method.name}
                onClick={() =>
                  setFormData({ ...formData, deliveryMethod: method.name })
                }
                className="cursor-pointer text-center"
              >
                <div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden transition ${
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
                </div>
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

          {formData.deliveryMethod === "Doorstep Delivery" && (
            <div className="max-w-md mx-auto mb-6">
              <label className="block text-white text-sm font-semibold mb-2 text-left">
                Delivery Address
              </label>
              <textarea
                value={formData.deliveryAddress}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryAddress: e.target.value })
                }
                placeholder="Enter your full delivery address"
                className="w-full h-24 bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-600 focus:outline-none resize-none placeholder-gray-500"
                required
              />
            </div>
          )}

          <div className="max-w-md mx-auto mb-6">
            <label className="block text-white text-sm font-semibold mb-2 text-left">
              Preferred Delivery/Pickup Date
            </label>
            <input
              type="date"
              value={formData.deliveryDate}
              onChange={(e) =>
                setFormData({ ...formData, deliveryDate: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-600 focus:outline-none"
              required
            />
          </div>
        </div>
      );
    }

    if (currentStep === getConfirmStep()) {
      return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6 md:mb-8">
            Confirm Your Order Details
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <img
              src={cakeImg}
              alt="Cake Preview"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-lg mx-auto md:mx-0"
            />
            <div className="flex-1 space-y-3 text-black">
              <div>
                <p className="font-bold">Cake Shape:</p>
                <p>{formData.shape}</p>
              </div>
              <div>
                <p className="font-bold">Number Of Tiers:</p>
                <p>{formData.numberOfTiers}</p>
              </div>
              {formData.tiers.map((tier, index) => (
                <div key={index}>
                  <p className="font-bold">Flavors for Tier {index + 1}:</p>
                  <p>{tier.flavors.map((f) => f.flavor).join(" and ")}</p>
                  <p className="font-bold">Size for Tier {index + 1}:</p>
                  <p>
                    {tier.size?.length}, {tier.size?.width}, {tier.size?.height}
                  </p>
                </div>
              ))}
              <div>
                <p className="font-bold">Covering:</p>
                <p>{formData.covering}</p>
              </div>
              <div>
                <p className="font-bold">Delivery Method:</p>
                <p>{formData.deliveryMethod}</p>
              </div>
              {formData.deliveryMethod === "Doorstep Delivery" &&
                formData.deliveryAddress && (
                  <div>
                    <p className="font-bold">Delivery Address:</p>
                    <p>{formData.deliveryAddress}</p>
                  </div>
                )}
              {formData.deliveryDate && (
                <div>
                  <p className="font-bold">Delivery/Pickup Date:</p>
                  <p>{new Date(formData.deliveryDate).toLocaleDateString()}</p>
                </div>
              )}
              {formData.customerNote && (
                <div>
                  <p className="font-bold">Your Note:</p>
                  <p>{formData.customerNote}</p>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <p className="font-bold text-lg">Estimated Price:</p>
                {isCalculating ? (
                  <p className="text-gray-600">Calculating...</p>
                ) : (
                  <p className="text-2xl font-bold text-[#FF5722]">
                    ₦{(calculatedPrice || 0).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit Cake Details
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting || isCalculating}
                  className="flex-1 bg-[#FF5722] hover:bg-[#FF5722]/90 text-white font-bold py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Placing Order..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const isConfirmPage = currentStep === getConfirmStep();

  return (
    <div
      className={`font-secondary min-h-screen ${isConfirmPage && "bg-white"}`}
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <div className="py-6 md:py-16" style={{ backgroundImage: `url(${bg})` }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-[43.74px] font-bold text-white">
            Customize A Cake
          </h1>
          <p className="text-sm md:text-[27.03px] text-white/90 mt-2 max-w-3xl mx-auto">
            Not sure what design to choose? Don't worry—we can help! You can
            even customize our previous creations to fit your style and taste.
          </p>
        </div>
      </div>

      <div
        className={`container mx-auto px-4 py-12 relative ${
          isConfirmPage ? "" : "min-h-[600px]"
        }`}
      >
        {!isConfirmPage && renderProgressDots()}

        <div className="relative">
          {renderStepContent()}

          {!isConfirmPage && (
            <>
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center transition cursor-pointer ${
                  currentStep === 1
                    ? "bg-grZay-800 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-gray-700 items-center justify-center transition cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {!isConfirmPage && (
          <div className="flex justify-center gap-4 mt-12 md:mt-16">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`md:hidden px-8 py-3 rounded-lg font-bold transition ${
                currentStep === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white font-bold px-12 sm:px-16 py-3 rounded-lg transition cursor-pointer text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <TopReviews />
      <Footer />
    </div>
  );
};

export default CustomCake;
