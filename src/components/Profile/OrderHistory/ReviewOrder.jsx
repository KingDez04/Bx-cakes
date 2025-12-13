import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const ReviewOrder = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerNote, setCustomerNote] = useState("");

  const orderDetails = {
    orderId: "12845",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    shape: "Circle",
    tiers: "3 Tiers",
  };

  const handleSubmit = () => {
    // Handle review submission
    console.log({ rating, customerNote });
    navigate("/order-history");
  };

  const handleSkip = () => {
    navigate("/order-history");
  };

  return (
    <div className="font-main min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <h1 className="font-secondary text-3xl font-bold text-center mb-6">
          How Was Your Last Order?
        </h1>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110 cursor-pointer"
            >
              <Star
                className={`w-12 h-12 ${
                  star <= (hoverRating || rating)
                    ? "fill-[#FF8C94] text-[#FF8C94]"
                    : "fill-[#FFB4B9] text-[#FFB4B9]"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="text-center text-lg font-semibold mb-8">
          Order ID:{orderDetails.orderId}
        </p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <img
              src={orderDetails.image}
              alt="Cake"
              className="w-full h-48 object-cover rounded-lg mb-4"
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
            <label className="block text-sm font-medium text-white bg-gray-400 px-3 py-2 rounded-t-lg">
              Customer Note
            </label>
            <textarea
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder="I felt that the cake was...."
              className="w-full h-48 bg-gray-400 text-white placeholder-gray-200 px-3 py-2 rounded-b-lg focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full max-w-md mx-auto block bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors cursor-pointer"
          >
            Submit
          </button>
          <button
            onClick={handleSkip}
            className="w-full text-center text-gray-700 font-medium hover:text-gray-900 transition-colors cursor-pointer"
          >
            I will review it later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
