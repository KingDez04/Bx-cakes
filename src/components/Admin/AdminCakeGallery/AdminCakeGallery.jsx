import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AdminCakeGallery = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [eventFilter, setEventFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [coveringFilter, setCoveringFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [selectedCakes, setSelectedCakes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCakes();
  }, [currentPage, eventFilter, genderFilter, coveringFilter]);

  const fetchCakes = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      let url = `${API_BASE_URL}/admin/cake-gallery?page=${currentPage}&limit=12`;

      if (eventFilter !== "All") {
        url += `&event=${eventFilter}`;
      }
      if (genderFilter !== "All") {
        url += `&gender=${genderFilter}`;
      }
      if (coveringFilter !== "All") {
        url += `&covering=${coveringFilter}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCakes(response.data.data.cakes);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Fetch cakes error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch cakes");
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
        selectedCakes.map((cakeId) =>
          axios.delete(`${API_BASE_URL}/admin/cake-gallery/${cakeId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      toast.success("Cakes deleted successfully");
      setShowDeleteModal(false);
      setSelectedCakes([]);
      fetchCakes();
    } catch (error) {
      console.error("Delete error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete cakes");
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
            Cake Gallery
          </h1>

          <div className="flex flex-wrap gap-3 mb-4 md:mb-6">
            <button
              onClick={() => navigate("/admin/cake-gallery/add")}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6B3D] text-white rounded-md hover:bg-[#FF5722] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Cake</span>
            </button>

            <button
              onClick={handleDeleteClick}
              disabled={selectedCakes.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete Selected</span>
            </button>

            <button
              onClick={() => navigate("/admin/cake-gallery/deleted")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">View Deleted</span>
            </button>
          </div>

          <h2 className="text-base md:text-lg font-semibold mb-4">
            All Gallery Uploads
          </h2>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
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
                Event
              </span>
            </div>

            <button className="bg-[#FF6B3D] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#FF5722] transition-colors cursor-pointer">
              Female
            </button>

            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
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

            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
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
                Time
              </span>
            </div>

            <div className="relative">
              <select
                value={coveringFilter}
                onChange={(e) => setCoveringFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Buttercream</option>
                <option>Fondant</option>
                <option>Naked</option>
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
                Covering
              </span>
            </div>

            <button className="bg-[#FF6B3D] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#FF5722] transition-colors cursor-pointer">
              And
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : cakes?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {cakes.map((cake) => (
                  <div
                    key={cake._id || cake.id}
                    onClick={() => handleSelectCake(cake._id || cake.id)}
                    className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedCakes.includes(cake._id || cake.id)
                        ? "ring-4 ring-[#FF6B3D]"
                        : "border border-gray-200 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative">
                      {cake.images?.[0] || cake.image ? (
                        <img
                          src={cake.images?.[0] || cake.image}
                          alt="Cake"
                          className="w-full h-64 object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML =
                              '<div class="flex items-center justify-center h-64 bg-gray-200 text-gray-400">No Image</div>';
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-64 bg-gray-200 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center flex-wrap gap-2 mb-3 text-sm text-gray-700">
                        {cake.shape && (
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
                        )}
                        {(cake.size || cake.tiers?.[0]?.size) && (
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
                            <span>{cake.size || cake.tiers?.[0]?.size}</span>
                          </div>
                        )}
                        {(cake.tiers?.length || cake.numberOfTiers) && (
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
                            <span>
                              {cake.tiers?.length
                                ? `${cake.tiers.length} ${
                                    cake.tiers.length > 1 ? "Tiers" : "Tier"
                                  }`
                                : cake.numberOfTiers
                                ? `${cake.numberOfTiers} ${
                                    cake.numberOfTiers > 1 ? "Tiers" : "Tier"
                                  }`
                                : ""}
                            </span>
                          </div>
                        )}
                      </div>

                      {(cake.tier1Flavor ||
                        cake.tier2Flavor ||
                        cake.tiers?.length > 0) && (
                        <div className="space-y-2 mb-3 text-xs text-gray-600">
                          {cake.tier1Flavor && (
                            <div>
                              <div className="flex gap-2">
                                <span className="font-medium">Tier 1:</span>
                                <span>{cake.tier1Flavor}</span>
                              </div>
                              {(cake.tier1Measurement ||
                                cake.tier1FlavorSpec) && (
                                <div className="ml-4 text-gray-500">
                                  {cake.tier1Measurement && (
                                    <div>{cake.tier1Measurement}</div>
                                  )}
                                  {cake.tier1FlavorSpec && (
                                    <div>{cake.tier1FlavorSpec}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          {cake.tier2Flavor && (
                            <div>
                              <div className="flex gap-2">
                                <span className="font-medium">Tier 2:</span>
                                <span>{cake.tier2Flavor}</span>
                              </div>
                              {(cake.tier2Measurement ||
                                cake.tier2FlavorSpec) && (
                                <div className="ml-4 text-gray-500">
                                  {cake.tier2Measurement && (
                                    <div>{cake.tier2Measurement}</div>
                                  )}
                                  {cake.tier2FlavorSpec && (
                                    <div>{cake.tier2FlavorSpec}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          {!cake.tier1Flavor &&
                            !cake.tier2Flavor &&
                            cake.tiers?.length > 0 &&
                            cake.tiers.map((tier, idx) => (
                              <div key={idx}>
                                <div className="flex gap-2">
                                  <span className="font-medium">
                                    Tier {tier.tierNumber || idx + 1}:
                                  </span>
                                  <span>
                                    {tier.flavors
                                      ?.map((f) => f.name)
                                      .join(", ") || "N/A"}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {cake.covering && (
                          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                            {cake.covering}
                          </span>
                        )}
                        {cake.category && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {cake.category}
                          </span>
                        )}
                        {cake.condition && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            {cake.condition}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No cakes found
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
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
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-[#8B0000] text-white rounded-md hover:bg-[#700000] transition-colors"
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

export default AdminCakeGallery;
