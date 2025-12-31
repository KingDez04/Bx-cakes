import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AdminReadyMadeCakes = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCakes, setSelectedCakes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hoveredCake, setHoveredCake] = useState(null);
  const [eventFilter, setEventFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("Female");
  const [priceFilter, setPriceFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [coveringFilter, setCoveringFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("And");
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReadyMadeCakes();
  }, [currentPage, eventFilter, genderFilter, coveringFilter, priceFilter]);

  const fetchReadyMadeCakes = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      let url = `${API_BASE_URL}/admin/ready-made-cakes?page=${currentPage}&limit=12`;

      if (eventFilter !== "All") {
        url += `&event=${eventFilter}`;
      }
      if (genderFilter !== "All") {
        url += `&gender=${genderFilter}`;
      }
      if (coveringFilter !== "All") {
        url += `&covering=${coveringFilter}`;
      }
      if (priceFilter !== "All") {
        if (priceFilter === "Under ₦50,000") {
          url += `&maxPrice=50000`;
        } else if (priceFilter === "₦50,000 - ₦100,000") {
          url += `&minPrice=50000&maxPrice=100000`;
        } else if (priceFilter === "Over ₦100,000") {
          url += `&minPrice=100000`;
        }
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
          axios.delete(`${API_BASE_URL}/admin/ready-made-cakes/${cakeId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      toast.success("Cakes deleted successfully");
      setShowDeleteModal(false);
      setSelectedCakes([]);
      fetchReadyMadeCakes();
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
            Ready Made Cakes
          </h1>

          <div className="flex flex-wrap gap-3 mb-4 md:mb-6">
            <button
              onClick={() => navigate("/admin/ready-made-cakes/add")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Cake
            </button>
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
              onClick={() => navigate("/admin/ready-made-cakes/deleted")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Recently Deleted
            </button>
          </div>

          <h2 className="text-base md:text-lg font-semibold mb-4">
            Active Cakes
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

            <button
              onClick={() =>
                setGenderFilter(genderFilter === "Female" ? "Male" : "Female")
              }
              className="bg-[#FF6B3D] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#FF5722] transition-colors cursor-pointer"
            >
              {genderFilter}
            </button>

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
                <option>Fondant</option>
                <option>Buttercream</option>
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

            <button
              onClick={() => setAgeFilter(ageFilter === "And" ? "Or" : "And")}
              className="bg-[#FF6B3D] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#FF5722] transition-colors cursor-pointer"
            >
              {ageFilter}
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {cakes.map((cake) => (
              <div
                key={cake.id}
                onClick={() => handleSelectCake(cake.id)}
                onMouseEnter={() => setHoveredCake(cake.id)}
                onMouseLeave={() => setHoveredCake(null)}
                className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all relative ${
                  selectedCakes.includes(cake.id)
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

                  {hoveredCake === (cake._id || cake.id) && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4 gap-2">
                      <button className="w-full py-2 bg-[#FF6B3D] text-white rounded-md text-sm font-medium hover:bg-[#FF5722] transition-colors cursor-pointer">
                        Edit Cake
                      </button>
                      <button className="w-full py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer">
                        Mark Cake As Sold
                      </button>
                      <button className="w-full py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-100 transition-colors border-2 border-dashed border-gray-300 cursor-pointer">
                        Delete Cake
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2">
                    {cake.name}
                  </h3>

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

                  <div className="flex flex-wrap gap-2 mb-3">
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

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                      {cake.gender}
                    </span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                      {cake.availability}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-green-600 text-sm font-medium">
                      {cake.stock} Available
                    </span>
                    <span className="text-lg font-bold">
                      NGN{cake.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

export default AdminReadyMadeCakes;
