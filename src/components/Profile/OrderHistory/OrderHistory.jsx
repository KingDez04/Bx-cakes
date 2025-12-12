import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("Order Details");

  const orders = [
    {
      id: "12845",
      location: "Ikoyi, Lagos",
      price: "NGN50000",
      orderDate: "20th July 2025",
      status: "Ongoing",
      category: "None",
      hasReview: true,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
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
      reviewRating: 4,
      reviewNote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker inclu",
    },
    {
      id: "12845",
      location: "Ikoyi, Lagos",
      price: "NGN50000",
      orderDate: "20th July 2025",
      status: "Ongoing",
      category: "None",
      hasReview: false,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
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
    },
    {
      id: "12845",
      location: "Ikoyi, Lagos",
      price: "NGN50000",
      orderDate: "20th July 2025",
      status: "Ongoing",
      category: "None",
      hasReview: false,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
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
    },
  ];

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Cake Order History</h1>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none"
            >
              <option>All</option>
              <option>Birthday</option>
              <option>Wedding</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs">
              Category
            </span>
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none"
            >
              <option>All</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs">
              Status
            </span>
          </div>

          <div className="relative">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none"
            >
              <option>All</option>
              <option>Under ₦50,000</option>
              <option>Over ₦50,000</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs">
              Price Range
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            {orders.map((order, index) => (
              <div
                key={index}
                onClick={() => handleOrderClick(order)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedOrder === order
                    ? "bg-[#FFB4B9]"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-600">{order.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.price}</p>
                    <p className="text-sm text-gray-600">
                      Order Date: {order.orderDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedOrder && (
            <div className="bg-white rounded-lg p-6">
              <div className="flex gap-6 border-b mb-6">
                {["Order Details", "Customer Details", "Status"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 font-medium cursor-pointer ${
                      activeTab === tab
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Order Details" && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p>
                      <span className="font-semibold">Order ID:</span>
                      {selectedOrder.id}
                    </p>
                    <p>{selectedOrder.orderDate}</p>
                  </div>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedOrder.status}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {selectedOrder.category}
                  </p>

                  <div className="flex gap-4">
                    <img
                      src={selectedOrder.image}
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
                          <span>{selectedOrder.shape}</span>
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
                          <span>{selectedOrder.tiers}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Tier Specifications:</p>
                    {selectedOrder.tierSpecs.map((spec, idx) => (
                      <div key={idx} className="mb-3 text-sm">
                        <div className="flex gap-4">
                          <span className="font-medium">Tier {spec.tier}</span>
                          <span>Flavour(s): {spec.flavours}</span>
                          <span>Measurement: {spec.measurement}</span>
                          <span>Flavour Specification: {spec.flavourSpec}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Customer Note:</p>
                    <p className="text-sm text-gray-700">
                      {selectedOrder.customerNote}
                    </p>
                  </div>

                  {selectedOrder.hasReview ? (
                    <button
                      onClick={() => navigate("/review/" + selectedOrder.id)}
                      className="w-full bg-[#FF6B3D] hover:bg-[#FF5722] text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                      View Your Review
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        navigate("/add-review/" + selectedOrder.id)
                      }
                      className="w-full bg-[#FF6B3D] hover:bg-[#FF5722] text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                      Add A Review
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
