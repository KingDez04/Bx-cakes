import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";

const ModifyCakeCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { cake, formData } = location.state || {};

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

  const handleCheckout = () => {
    toast.success("Order placed successfully! We'll contact you shortly.");
    setTimeout(() => {
      navigate("/review-order");
    }, 2000);
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
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Edit Details
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Proceed to Checkout
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
