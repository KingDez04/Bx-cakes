import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

const AddReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerNote, setCustomerNote] = useState("");

  const orderDetails = {
    orderId: id || "12845",
    orderDate: "20th July 2025",
    status: "Completed",
    category: "None",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    shape: "Circle",
    tiers: "3 Tiers",
    tierSpecs: [
      {
        tier: 1,
        flavours: 2,
        measurement: "D-8-H:10-L:8-W:9",
        flavourSpec: "Chocolate, Vanilla",
      },
      {
        tier: 2,
        flavours: 1,
        measurement: "D-8-H:10-L:8-W:9",
        flavourSpec: "Chocolate",
      },
    ],
    customerNote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    navigate("/order-history");
  };

  const handleSkip = () => {
    navigate("/order-history");
  };

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
                Order ID:{orderDetails.orderId}
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
                className="w-full max-w-xs mx-auto block bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors cursor-pointer"
              >
                Submit
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
