import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ModifyCakeCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { cake, formData } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!cake || !formData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No order details found</p>
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

  const handleCheckout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }

    if (!formData.deliveryMethod) {
      toast.error("Please select a delivery method");
      return;
    }

    if (
      formData.deliveryMethod === "Doorstep Delivery" &&
      !formData.deliveryAddress
    ) {
      toast.error("Please provide a delivery address");
      return;
    }

    if (!formData.deliveryDate) {
      toast.error("Please select a delivery date");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = new FormData();

      orderData.append("cakeId", cake._id || cake.cakeId);
      orderData.append("shape", formData.shape);
      orderData.append("numberOfTiers", formData.numberOfTiers);
      orderData.append("covering", formData.covering);

      const modifications = {
        originalImage: cake.image,
        requestedChanges: formData.customerNote || "Modified design as shown",
      };
      orderData.append("modifications", JSON.stringify(modifications));

      formData.tiers.forEach((tier, index) => {
        orderData.append(`tiers[${index}][tierNumber]`, tier.tierNumber);
        orderData.append(
          `tiers[${index}][size]`,
          tier.size.diameter || tier.size.length
        );
        orderData.append(
          `tiers[${index}][numberOfFlavors]`,
          tier.flavors.length
        );

        tier.flavors.forEach((flavor, fIndex) => {
          orderData.append(
            `tiers[${index}][flavors][${fIndex}][name]`,
            flavor.flavor
          );
          orderData.append(
            `tiers[${index}][flavors][${fIndex}][percentage]`,
            flavor.percentage
          );
        });
      });

      orderData.append(
        "deliveryMethod",
        formData.deliveryMethod === "Pickup" ? "pickup" : "delivery"
      );
      if (formData.deliveryAddress) {
        orderData.append("deliveryAddress", formData.deliveryAddress);
      }
      orderData.append("deliveryDate", formData.deliveryDate);

      if (formData.customerNote) {
        orderData.append("customerNote", formData.customerNote);
      }

      const response = await axios.post(
        `${API_BASE_URL}/orders/modify-cake`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        const linkToChat = response.data.data?.linkToChat;

        toast.success(response.data.message || "Order placed successfully!");

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
      console.error("Checkout error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
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

  const handleEdit = () => {
    navigate(`/modify-cake/${id}/customize`, { state: { cake, formData } });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-950 via-black to-red-950">
      <div className="bg-linear-to-r from-orange-800 via-black to-orange-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Modified Cake Checkout
          </h1>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
            Review your modified cake details before placing your order
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <button
          onClick={() =>
            navigate(`/modify-cake/${id}/customize`, {
              state: { cake, formData },
            })
          }
          className="flex items-center gap-2 text-white hover:text-gray-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Confirm Your Order Details
        </h2>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />

              <div className="flex-1 space-y-3 text-gray-800">
                <div>
                  <span className="font-bold">Original Cake:</span> {cake.name}
                </div>
                <div>
                  <span className="font-bold">Cake ID:</span> {cake.cakeId}
                </div>
                <div>
                  <span className="font-bold">Cake Shape:</span>{" "}
                  {formData.shape}
                </div>
                <div>
                  <span className="font-bold">Number Of Tiers:</span>{" "}
                  {formData.numberOfTiers}
                </div>
                <div>
                  <span className="font-bold">Covering:</span>{" "}
                  {formData.covering}
                </div>

                {formData.tiers.map((tier, index) => (
                  <div key={index} className="border-t pt-2 mt-2">
                    <div className="font-bold text-sm">
                      Tier {tier.tierNumber}:
                    </div>
                    <div className="text-sm ml-4">
                      <div>
                        Flavors: {tier.flavors.map((f) => f.flavor).join(", ")}
                      </div>
                      <div>
                        Size:{" "}
                        {formData.shape === "Circle"
                          ? `D-${tier.size.diameter} H-${tier.size.height}`
                          : `L-${tier.size.length} W-${tier.size.width} H-${tier.size.height}`}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-2 mt-2">
                  <span className="font-bold">Delivery Method:</span>{" "}
                  {formData.deliveryMethod}
                </div>

                {formData.deliveryMethod === "Doorstep Delivery" &&
                  formData.deliveryAddress && (
                    <div className="border-t pt-2 mt-2">
                      <span className="font-bold">Delivery Address:</span>
                      <p className="text-sm mt-1">{formData.deliveryAddress}</p>
                    </div>
                  )}

                {formData.deliveryDate && (
                  <div className="border-t pt-2 mt-2">
                    <span className="font-bold">Delivery/Pickup Date:</span>{" "}
                    {new Date(formData.deliveryDate).toLocaleDateString()}
                  </div>
                )}

                {formData.customerNote && (
                  <div className="border-t pt-2 mt-2">
                    <span className="font-bold">Your Note:</span>
                    <p className="text-sm mt-1">{formData.customerNote}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleEdit}
                disabled={isSubmitting}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Edit Details
              </button>
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="flex-1 bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Placing Order..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default ModifyCakeCheckout;
