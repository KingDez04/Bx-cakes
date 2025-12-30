import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AdminCustomerUploads = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCakes, setSelectedCakes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [customerUploads, setCustomerUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomerUploads();
  }, [currentPage, categoryFilter]);

  const fetchCustomerUploads = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      let url = `${API_BASE_URL}/admin/customer-uploads?page=${currentPage}&limit=12`;

      if (categoryFilter !== "All") {
        url += `&category=${categoryFilter}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCustomerUploads(response.data.data.uploads);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Fetch uploads error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to fetch customer uploads"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCake = (id) => {
    if (selectedCakes.includes(id)) {
      setSelectedCakes(selectedCakes.filter((cakeId) => cakeId !== id));
    } else {
      setSelectedCakes([...selectedCakes, id]);
    }
  };

  const handleDeleteClick = () => {
    if (selectedCakes.length > 0) {
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    try {
      await Promise.all(
        selectedCakes.map((uploadId) =>
          axios.delete(`${API_BASE_URL}/admin/customer-uploads/${uploadId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      toast.success("Customer uploads deleted successfully");
      setShowDeleteModal(false);
      setSelectedCakes([]);
      fetchCustomerUploads();
    } catch (error) {
      console.error("Delete error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to delete uploads"
        );
      }
    }
  };

  return (
    <div className="font-main flex min-h-screen bg-white">
      <AdminSidebar onToggle={setIsSidebarCollapsed} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0 lg:ml-20" : "ml-0 lg:ml-[280px]"
        }`}
      >
        <div className="border-b border-gray-200 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Customer Uploads
          </h1>

          <div className="flex flex-wrap gap-3 mb-4 md:mb-6">
            <button
              onClick={handleDeleteClick}
              disabled={selectedCakes.length === 0}
              className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md transition-colors text-sm font-medium cursor-pointer ${
                selectedCakes.length > 0
                  ? "hover:bg-gray-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Remove Cake
            </button>
            <button
              onClick={() => navigate("/admin/customer-uploads/deleted")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Recently Deleted
            </button>
            <button
              onClick={() => navigate("/admin/customer-uploads/review")}
              className="relative flex items-center gap-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium cursor-pointer"
            >
              Cake Review
              {customerUploads.some((cake) => cake.pendingReviews > 0) && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  10
                </span>
              )}
            </button>
          </div>

          <h2 className="text-base md:text-lg font-semibold mb-4">
            All Customer Uploads
          </h2>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Birthday</option>
                <option>Wedding</option>
                <option>Anniversary</option>
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
              <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
                Category
              </span>
            </div>

            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Under ₦50,000</option>
                <option>₦50,000 - ₦100,000</option>
                <option>Over ₦100,000</option>
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
              <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
                Price Range
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : customerUploads.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {customerUploads.map((cake) => (
                  <div
                    key={cake._id || cake.id}
                    onClick={() => handleSelectCake(cake._id || cake.id)}
                    className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedCakes.includes(cake._id || cake.id)
                        ? "ring-4 ring-[#FF6B3D]"
                        : "border border-gray-200 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          </svg>
                          <span>{cake.shape}</span>
                        </div>
                        <div className="flex items-center gap-1">
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
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          <span>{cake.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
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
                          <span>{cake.tiers}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3 text-xs text-gray-600">
                        <div>
                          <div className="flex gap-2">
                            <span className="font-medium">Tier 1</span>
                            <span>{cake.tier1Flavor}</span>
                          </div>
                          <div className="ml-4">
                            <div>{cake.tier1Measurement}</div>
                            <div>{cake.tier1FlavorSpec}</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-2">
                            <span className="font-medium">Tier 2</span>
                            <span>{cake.tier2Flavor}</span>
                          </div>
                          <div className="ml-4">
                            <div>{cake.tier2Measurement}</div>
                            <div>{cake.tier2FlavorSpec}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                          {cake.covering}
                        </span>
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                          {cake.category}
                        </span>
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                          {cake.condition}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No customer uploads found</p>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              Are you sure you want to delete {selectedCakes.length} cake(s)?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You can recover these cakes in your recently deleted within the
              next 30 days
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-[#8B0000] text-white rounded-md hover:bg-[#700000] transition-colors cursor-pointer"
              >
                Delete Cake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomerUploads;
