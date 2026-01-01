import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AdminDeleteCustomerUploads = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCakes, setSelectedCakes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerUploads, setCustomerUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDeletedUploads();
  }, []);

  const fetchDeletedUploads = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/customer-uploads/deleted`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setCustomerUploads(response.data.data.uploads || []);
      }
    } catch (error) {
      console.error("Error fetching deleted uploads:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load deleted uploads"
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

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    setSelectedCakes([]);
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/customer-uploads")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold">Delete Uploads</h1>
            </div>

            {selectedCakes.length > 0 && (
              <button
                onClick={handleDeleteClick}
                className="px-6 py-2 bg-[#8B0000] text-white rounded-md hover:bg-[#700000] transition-colors font-medium cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>

          <h2 className="text-base md:text-lg font-semibold mb-4">
            Select Cakes
          </h2>
        </div>

        <div className="p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : customerUploads?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {customerUploads.map((cake) => (
                <div
                  key={cake._id || cake.id}
                  onClick={() => handleSelectCake(cake._id || cake.id)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedCakes.includes(cake._id || cake.id)
                      ? "ring-4 ring-[#FF6B3D]"
                      : "border border-gray-200 hover:shadow-lg"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={cake.image}
                      alt="Cake"
                      className="w-full h-64 object-cover"
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
          ) : (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500">No deleted customer uploads found</p>
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

export default AdminDeleteCustomerUploads;
