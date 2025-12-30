import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ViewReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerNote, setCustomerNote] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const review = response.data.data.review;
        setReviewData(review);
        setRating(review.rating);
        setCustomerNote(review.comment);
        setOrderDetails(review.orderId);
      }
    } catch (error) {
      console.error("Fetch review error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch review");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/reviews/${reviewData._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Review deleted successfully");
        setTimeout(() => {
          navigate("/order-history");
        }, 1500);
      }
    } catch (error) {
      console.error("Delete review error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete review");
      }
    }
  };

  const handleEditReview = () => {
    setShowEditForm(true);
  };

  const handleSubmitEdit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    if (!rating || !customerNote) {
      toast.error("Please provide a rating and comment");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/reviews/${reviewData._id}`,
        {
          rating,
          comment: customerNote,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Review updated successfully");
        setShowEditForm(false);
        fetchReview();
      }
    } catch (error) {
      console.error("Update review error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(error.response?.data?.message || "Failed to update review");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!orderDetails || !reviewData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl mb-4">Review not found</p>
          <button
            onClick={() => navigate("/order-history")}
            className="bg-[#FF5722] px-6 py-3 rounded-full hover:bg-[#FF5722]/90 transition-colors text-white"
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
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-secondary text-2xl font-bold">Your Review</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">Order ID:</span>
                {orderDetails.orderId}
              </p>
              <p>{orderDetails.orderDate}</p>
            </div>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              {orderDetails.status}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {orderDetails.category}
            </p>

            <div className="flex gap-4">
              <img
                src={orderDetails.image}
                alt="Cake"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold mb-2">Details:</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    </svg>
                    <span>{orderDetails.shape}</span>
                  </div>
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
                    <span>{orderDetails.tiers}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Tier Specifications:</p>
              {orderDetails.tierSpecs.map((spec, idx) => (
                <div key={idx} className="mb-3 text-sm">
                  <div className="flex gap-2 flex-wrap">
                    <span className="font-medium">Tier {spec.tier}</span>
                    <span>Flavour(s): {spec.flavours}</span>
                    <span>Measurement: {spec.measurement}</span>
                  </div>
                  <div className="text-sm ml-4">
                    <span>Flavour Specification: {spec.flavourSpec}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="font-semibold mb-2">Customer Note:</p>
              <p className="text-sm text-gray-700">
                {orderDetails.customerNote}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            {showEditForm ? (
              <div className="space-y-6">
                <h2 className="font-secondary text-2xl font-bold text-center">
                  How Was Your Order?
                </h2>

                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
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
                  Order ID:{orderDetails.orderId}
                </p>

                <div>
                  <label className="block text-sm font-medium text-white bg-gray-400 px-3 py-2 rounded-t-lg">
                    Customer Note
                  </label>
                  <textarea
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="I felt that the cake was...."
                    className="w-full h-32 bg-gray-400 text-white placeholder-gray-200 px-3 py-2 rounded-b-lg focus:outline-none resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmitEdit}
                  className="w-full max-w-xs mx-auto block bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors"
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                  Order ID:{orderDetails.orderId}
                </h2>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-12 h-12 ${
                        star <= rating
                          ? "fill-[#FF6B3D] text-[#FF6B3D]"
                          : "fill-[#FFB4B9] text-[#FFB4B9]"
                      }`}
                    />
                  ))}
                </div>

                <div>
                  <p className="font-semibold mb-2">Customer Note:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {orderDetails.reviewNote}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteReview}
                    className="flex-1 bg-[#8B0000] hover:bg-[#700000] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Delete Review
                  </button>
                  <button
                    onClick={handleEditReview}
                    className="flex-1 bg-[#FF6B3D] hover:bg-[#FF5722] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Edit Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReview;
