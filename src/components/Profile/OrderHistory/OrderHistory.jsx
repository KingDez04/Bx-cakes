import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("Order Details");

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage, categoryFilter, statusFilter, priceRange]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to view orders");
        navigate("/login");
        return;
      }

      const params = new URLSearchParams();
      if (statusFilter !== "All")
        params.append("status", statusFilter.toLowerCase());
      if (categoryFilter !== "All") params.append("category", categoryFilter);
      if (priceRange !== "All") params.append("priceRange", priceRange);
      params.append("page", currentPage);
      params.append("limit", 10);

      const response = await axios.get(
        `${API_BASE_URL}/orders?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data.orders || []);
        setTotalPages(response.data.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        console.error("Error fetching orders:", error);
        toast.error(error.response?.data?.message || "Failed to load orders");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
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
            Cake Order History
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5722]"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg">
            <p className="text-gray-500 text-lg mb-4">No orders found</p>
            <button
              onClick={() => navigate("/readymade-cake")}
              className="text-[#FF5722] hover:underline"
            >
              Start ordering cakes
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                {orders.map((order, index) => (
                  <div
                    key={order._id || order.id || index}
                    onClick={() => handleOrderClick(order)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      (selectedOrder?._id || selectedOrder?.id) ===
                      (order._id || order.id)
                        ? "bg-[#FFB4B9]"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">
                          Order ID: {order.orderNumber || order._id || order.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.location || order.deliveryAddress || "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ₦{(order.totalPrice || 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Order Date:{" "}
                          {new Date(
                            order.orderDate || order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedOrder && (
                <div className="bg-white rounded-lg p-6">
                  <div className="flex gap-6 border-b mb-6">
                    {["Order Details", "Customer Details", "Status"].map(
                      (tab) => (
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
                      )
                    )}
                  </div>

                  {activeTab === "Order Details" && (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <p>
                          <span className="font-semibold">Order ID: </span>
                          {selectedOrder.orderNumber || selectedOrder.id}
                        </p>
                        <p>
                          {new Date(
                            selectedOrder.orderDate || selectedOrder.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            selectedOrder.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : selectedOrder.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : selectedOrder.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedOrder.status || "N/A"}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">Type:</span>{" "}
                        {selectedOrder.orderType || selectedOrder.category}
                      </p>

                      <div className="flex gap-4">
                        <img
                          src={
                            selectedOrder.image ||
                            selectedOrder.cakeDetails?.image ||
                            "https://via.placeholder.com/150?text=Cake"
                          }
                          alt="Cake"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold mb-2">Details:</p>
                          <div className="space-y-1 text-sm">
                            {selectedOrder.cakeDetails?.shape && (
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    strokeWidth="2"
                                  />
                                </svg>
                                <span>{selectedOrder.cakeDetails.shape}</span>
                              </div>
                            )}
                            {selectedOrder.cakeDetails?.numberOfTiers && (
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
                                  {selectedOrder.cakeDetails.numberOfTiers} Tier
                                  {selectedOrder.cakeDetails.numberOfTiers > 1
                                    ? "s"
                                    : ""}
                                </span>
                              </div>
                            )}
                            {selectedOrder.cakeDetails?.name && (
                              <p className="font-medium">
                                {selectedOrder.cakeDetails.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {selectedOrder.cakeDetails?.tiers &&
                        selectedOrder.cakeDetails.tiers.length > 0 && (
                          <div>
                            <p className="font-semibold mb-2">
                              Tier Specifications:
                            </p>
                            {selectedOrder.cakeDetails.tiers.map(
                              (tier, idx) => (
                                <div key={idx} className="mb-3 text-sm">
                                  <div className="flex flex-wrap gap-4">
                                    <span className="font-medium">
                                      Tier {tier.tierNumber || idx + 1}
                                    </span>
                                    {tier.size && (
                                      <span>Size: {tier.size}</span>
                                    )}
                                    {tier.numberOfFlavors && (
                                      <span>
                                        Flavours: {tier.numberOfFlavors}
                                      </span>
                                    )}
                                    {tier.flavors &&
                                      tier.flavors.length > 0 && (
                                        <span>
                                          Flavour Specification:{" "}
                                          {tier.flavors
                                            .map((f) => f.name || f)
                                            .join(", ")}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}

                      {selectedOrder.customerNote && (
                        <div>
                          <p className="font-semibold mb-2">Customer Note:</p>
                          <p className="text-sm text-gray-700">
                            {selectedOrder.customerNote}
                          </p>
                        </div>
                      )}

                      {selectedOrder.hasReview ? (
                        <button
                          onClick={() =>
                            navigate(
                              "/review/" +
                                (selectedOrder._id || selectedOrder.id)
                            )
                          }
                          className="w-full bg-[#FF6B3D] hover:bg-[#FF5722] text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                          View Your Review
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(
                              "/add-review/" +
                                (selectedOrder._id || selectedOrder.id)
                            )
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

            {totalPages > 1 && !isLoading && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
