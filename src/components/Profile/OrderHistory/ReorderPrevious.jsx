import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ReorderPrevious = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Completed");
  const [priceRange, setPriceRange] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompletedOrders();
  }, [categoryFilter, statusFilter, priceRange]);

  const fetchCompletedOrders = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      let url = `${API_BASE_URL}/orders?status=completed&limit=50`;

      if (categoryFilter !== "All") {
        url += `&category=${categoryFilter}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.data.orders);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorder = async (order) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/orders/${order._id}/reorder`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setTimeout(() => {
          navigate("/order-history");
        }, 2000);
      }
    } catch (error) {
      console.error("Reorder error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to reorder");
      }
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleEditAndReorder = () => {
    navigate("/edit-and-reorder/" + selectedOrder.id);
  };

  return (
    <div className="font-main min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-secondary text-2xl font-bold">
            Reorder Previous Order
          </h1>
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
                key={order._id || order.id || index}
                onClick={() => handleOrderClick(order)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedOrder === order
                    ? "bg-[#FFB4B9]"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      Order ID: {order.orderNumber || order._id || order.id}
                    </p>
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
              <h2 className="font-secondary text-xl font-bold mb-6">
                Order Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>
                    <span className="font-semibold">Order ID: </span>
                    {selectedOrder.orderNumber ||
                      selectedOrder._id ||
                      selectedOrder.id}
                  </p>
                  <p>
                    {new Date(
                      selectedOrder.orderDate || selectedOrder.createdAt
                    ).toLocaleDateString()}
                  </p>
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
                    {selectedOrder.customerNote}
                  </p>
                </div>

                <button
                  onClick={handleEditAndReorder}
                  className="w-full bg-[#FF6B3D] hover:bg-[#FF5722] text-white py-3 rounded-lg font-medium transition-colors mt-4 cursor-pointer"
                >
                  Edit and Reorder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReorderPrevious;
