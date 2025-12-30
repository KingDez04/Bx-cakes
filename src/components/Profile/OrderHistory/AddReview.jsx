import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AddReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerNote, setCustomerNote] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrderDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error("Failed to load order details");
        navigate("/order-history");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!customerNote.trim()) {
      toast.error("Please add a comment to your review");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");

      const reviewData = {
        orderId: id,
        rating,
        comment: customerNote,
      };

      const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setTimeout(() => {
          navigate("/order-history");
        }, 1500);
      }
    } catch (error) {
      console.error("Review error:", error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to submit review");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    navigate("/order-history");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5722]"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Order not found</p>
          <button
            onClick={() => navigate("/order-history")}
            className="text-[#FF5722] hover:underline"
          >
            Back to Order History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-main min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/order-history")}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-secondary text-2xl font-bold">Add Review</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">Order ID: </span>
                {orderDetails.orderNumber || orderDetails.id}
              </p>
              <p>
                {new Date(
                  orderDetails.orderDate || orderDetails.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  orderDetails.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : orderDetails.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {orderDetails.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Type:</span>{" "}
              {orderDetails.orderType || orderDetails.category}
            </p>

            <div className="flex gap-4">
              <img
                src={
                  orderDetails.image ||
                  orderDetails.cakeDetails?.image ||
                  "https://via.placeholder.com/150?text=Cake"
                }
                alt="Cake"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold mb-2">Details:</p>
                <div className="space-y-1 text-sm">
                  {orderDetails.cakeDetails?.shape && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      </svg>
                      <span>{orderDetails.cakeDetails.shape}</span>
                    </div>
                  )}
                  {orderDetails.cakeDetails?.numberOfTiers && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>
                        {orderDetails.cakeDetails.numberOfTiers} Tier
                        {orderDetails.cakeDetails.numberOfTiers > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                  {orderDetails.cakeDetails?.name && (
                    <p className="font-medium">
                      {orderDetails.cakeDetails.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {orderDetails.cakeDetails?.tiers &&
              orderDetails.cakeDetails.tiers.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Tier Specifications:</p>
                  {orderDetails.cakeDetails.tiers.map((tier, idx) => (
                    <div key={idx} className="mb-3 text-sm">
                      <div className="flex gap-2 flex-wrap">
                        <span className="font-medium">
                          Tier {tier.tierNumber || idx + 1}
                        </span>
                        {tier.numberOfFlavors && (
                          <span>Flavour(s): {tier.numberOfFlavors}</span>
                        )}
                        {tier.size && <span>Size: {tier.size}</span>}
                      </div>
                      {tier.flavors && tier.flavors.length > 0 && (
                        <div className="text-sm ml-4">
                          <span>
                            Flavour Specification:{" "}
                            {tier.flavors.map((f) => f.name || f).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {orderDetails.customerNote && (
              <div>
                <p className="font-semibold mb-2">Customer Note:</p>
                <p className="text-sm text-gray-700">
                  {orderDetails.customerNote}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">
                How Was Your Order?
              </h2>

              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? "fill-[#FF8C94] text-[#FF8C94]"
                          : "fill-[#FFB4B9] text-[#FFB4B9]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <p className="text-center text-lg font-semibold">
                Order ID: {orderDetails.orderNumber || orderDetails.id}
              </p>

              <div>
                <label className="block text-sm font-medium text-white bg-gray-400 px-3 py-2">
                  Customer Note
                </label>
                <textarea
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="I felt that the cake was...."
                  className="w-full h-32 bg-gray-400 text-white placeholder-gray-200 px-3 py-2 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full max-w-xs mx-auto block bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <button
                onClick={handleSkip}
                className="w-full text-center text-gray-600 hover:text-gray-800 text-sm cursor-pointer"
              >
                I will review it later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
