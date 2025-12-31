import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import TopReviews from "../TopReviews/TopReviews";
import Footer from "../Footer/Footer";
import bg from "../../assets/heading1.png";
import bg2 from "../../assets/heading2.png";
import pickupImg from "../../assets/pickup.png";
import deliveryImg from "../../assets/doorStep.png";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ReadyMadeCakeCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [currentStep, setCurrentStep] = useState(1);
  const [customerNote, setCustomerNote] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderDetails] = useState({
    cakeShape: product?.shape || product?.specifications?.shape || "Rectangle",
    numberOfTiers:
      product?.tiers || product?.specifications?.numberOfTiers || 2,
    flavorsForTier1: product?.flavor1 || "Vanilla and Banana",
    sizeForTier1: product?.size1 || "Length, Width, Height",
    flavorsForTier2: product?.flavor2 || "Vanilla and Banana",
    covering:
      product?.covering || product?.specifications?.covering || "Butter Cream",
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-900 via-red-950 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">No product selected</p>
          <button
            onClick={() => navigate("/readymade-cake")}
            className="bg-orange-600 px-6 py-3 rounded-full hover:bg-orange-700 transition-colors cursor-pointer"
          >
            Back to Cakes
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!deliveryMethod) {
        toast.error("Please select a delivery method");
        return;
      }

      if (deliveryMethod === "doorstep" && !deliveryAddress) {
        toast.error("Please enter your delivery address");
        return;
      }

      if (!deliveryDate) {
        toast.error("Please select a delivery date");
        return;
      }

      setCurrentStep(3);
    } else if (currentStep === 3) {
      handleCheckout();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/readymade-cake/${id}`);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const totalPrice = (product.priceNGN || product.price) * quantity;

      const orderData = {
        cakeId: product._id || product.id,
        quantity,
        customerNote: customerNote || undefined,
        deliveryMethod: deliveryMethod === "doorstep" ? "delivery" : "pickup",
        deliveryAddress:
          deliveryMethod === "doorstep" ? deliveryAddress : undefined,
        deliveryDate,
        totalPrice,
      };

      const response = await axios.post(
        `${API_BASE_URL}/orders/ready-made`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const linkToChat = response.data.data?.linkToChat;

        toast.success("Order placed successfully!");

        if (linkToChat) {
          setTimeout(() => {
            toast.success(
              <div>
                <p>Click to finalize payment on WhatsApp</p>
                <a
                  href={linkToChat}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#25D366", fontWeight: "bold" }}
                >
                  Open WhatsApp
                </a>
              </div>,
              { duration: 8000 }
            );

            window.open(linkToChat, "_blank");
          }, 1000);
        }

        setTimeout(() => {
          navigate("/order-history");
        }, 3000);
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
        toast.error(
          error.response?.data?.message ||
            "Failed to place order. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIndicators = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div
      className="font-secondary min-h-screen"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <Toaster position="top-center" />

      <div
        className="bg-linear-to-r py-16 px-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready made cake
          </h1>
          <p className="text-white text-base md:text-[27.03px] max-w-2xl mx-auto">
            Not sure what design to choose? Don't worry—we can help! You can
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

        {currentStep === 1 && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Any Other Important Details? Let us know!
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <img
                src={
                  product.image || "https://via.placeholder.com/300?text=Cake"
                }
                alt={product.name}
                className="w-40 h-40 rounded-lg object-cover shadow-2xl"
              />

              <div className="w-full md:w-96 space-y-4">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2 text-left">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2 text-left">
                    Customer Note
                  </label>
                  <textarea
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="I would like to..."
                    className="w-full h-32 bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-600 focus:outline-none resize-none placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Choose Your Delivery Method
            </h2>

            <div className="flex justify-center gap-2 mb-12">
              {stepIndicators.map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= 2 ? "bg-orange-600" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <button
                onClick={() => setDeliveryMethod("pickup")}
                className={`flex flex-col items-center w-32 h-32 sm:w-40 sm:h-40 rounded-full transition-all cursor-pointer ${
                  deliveryMethod === "pickup" ? "ring-4 ring-[#FF5722]" : ""
                }`}
              >
                <img
                  src={pickupImg}
                  alt="Pickup"
                  className="w-full h-full object-cover"
                />
                <h3 className="text-white font-semibold">Pickup</h3>
              </button>

              <button
                onClick={() => setDeliveryMethod("doorstep")}
                className={`flex flex-col items-center w-32 h-32 sm:w-40 sm:h-40 rounded-full transition-all cursor-pointer ${
                  deliveryMethod === "doorstep" ? "ring-4 ring-[#FF5722]" : ""
                }`}
              >
                <img
                  src={deliveryImg}
                  alt="Doorstep Delivery"
                  className="w-full h-full object-cover"
                />
                <h3 className="text-white font-semibold">Doorstep Delivery</h3>
              </button>
            </div>

            {deliveryMethod === "doorstep" && (
              <div className="max-w-md mx-auto mb-8">
                <label className="block text-white text-sm font-semibold mb-2 text-left">
                  Delivery Address
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  className="w-full h-24 bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-600 focus:outline-none resize-none placeholder-gray-500"
                  required
                />
              </div>
            )}

            <div className="max-w-md mx-auto mb-8">
              <label className="block text-white text-sm font-semibold mb-2 text-left">
                Preferred Delivery/Pickup Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-orange-600 focus:outline-none"
                required
              />
            </div>

            <button
              onClick={handleNext}
              className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
              Confirm Your Order Details
            </h2>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/300?text=Cake"
                    }
                    alt={product.name}
                    className="w-full md:w-48 h-48 object-cover rounded-lg"
                  />

                  <div className="flex-1 space-y-3 text-gray-800">
                    <div>
                      <span className="font-bold">Cake Name:</span>{" "}
                      {product.name}
                    </div>
                    <div>
                      <span className="font-bold">Quantity:</span> {quantity}
                    </div>
                    <div>
                      <span className="font-bold">Price per cake:</span> ₦
                      {(
                        product.priceNGN ||
                        product.price ||
                        0
                      ).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-bold">Total Price:</span> ₦
                      {(
                        (product.priceNGN || product.price || 0) * quantity
                      ).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-bold">Delivery Method:</span>{" "}
                      {deliveryMethod === "doorstep"
                        ? "Doorstep Delivery"
                        : "Pickup"}
                    </div>
                    {deliveryMethod === "doorstep" && deliveryAddress && (
                      <div>
                        <span className="font-bold">Delivery Address:</span>{" "}
                        {deliveryAddress}
                      </div>
                    )}
                    <div>
                      <span className="font-bold">Delivery/Pickup Date:</span>{" "}
                      {new Date(deliveryDate).toLocaleDateString()}
                    </div>
                    {customerNote && (
                      <div>
                        <span className="font-bold">Your Note:</span>{" "}
                        {customerNote}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Placing Order..." : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default ReadyMadeCakeCheckout;
