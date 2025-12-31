import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";
import bg2 from "../../assets/heading4.png";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ModifyCake = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [selectedFlavor, setSelectedFlavor] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");
  const [selectedCovering, setSelectedCovering] = useState("All");
  const [selectedCake, setSelectedCake] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [allCakes, setAllCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCakes();
  }, [
    currentPage,
    selectedEvent,
    selectedFlavor,
    selectedPriceRange,
    selectedTime,
    selectedCovering,
    searchQuery,
  ]);

  const fetchCakes = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (selectedEvent !== "All") params.append("category", selectedEvent);
      if (searchQuery) params.append("search", searchQuery);
      if (selectedPriceRange !== "All")
        params.append("priceRange", selectedPriceRange);
      params.append("page", currentPage);
      params.append("limit", 12);

      const response = await axios.get(
        `${API_BASE_URL}/cakes/modify?${params.toString()}`
      );

      if (response.data.success) {
        setAllCakes(response.data.data.cakes || []);
        setTotalPages(response.data.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching cakes:", error);
      toast.error(error.response?.data?.message || "Failed to load cakes");
    } finally {
      setIsLoading(false);
    }
  };

  const eventOptions = [
    "All",
    "Birthday",
    "Wedding",
    "Anniversary",
    "Graduation",
  ];
  const flavorOptions = [
    "All",
    "Chocolate",
    "Vanilla",
    "Strawberry",
    "Red Velvet",
  ];
  const priceRangeOptions = [
    "All",
    "Under ₦30,000",
    "₦30,000 - ₦50,000",
    "₦50,000+",
  ];
  const timeOptions = ["All", "1-2 days", "3-5 days", "5-7 days", "7+ days"];
  const coveringOptions = [
    "All",
    "Buttercream",
    "Fondant",
    "Whipped Cream",
    "Ganache",
  ];

  // Client-side filter for flavors, time, and covering (not in API params)
  const filteredCakes = allCakes.filter((cake) => {
    const matchesFlavor =
      selectedFlavor === "All" ||
      cake.specifications?.flavors?.some((f) =>
        f.toLowerCase().includes(selectedFlavor.toLowerCase())
      );
    const matchesTime =
      selectedTime === "All" || cake.preparationTime === selectedTime;
    const matchesCovering =
      selectedCovering === "All" ||
      cake.specifications?.covering === selectedCovering;

    return matchesFlavor && matchesTime && matchesCovering;
  });

  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
    setShowModal(true);
  };

  const handleConfirmSelection = () => {
    navigate(`/modify-cake/${selectedCake._id || selectedCake.id}/confirm`, {
      state: { cake: selectedCake },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-16 px-4" style={{ backgroundImage: `url(${bg2})` }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Modify A Cake
          </h1>
          <p className="text-white text-base md:text-[27.03px] max-w-2xl mx-auto">
            Not sure what design to choose? Don't worry—we can help! You can
            even customize our previous creations to fit your style and taste.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">
          Select A Cake To Modify
        </h2>
        <p className="text-center text-gray-600 mb-8">
          BX Choices | Customer Choices
        </p>

        <div className="flex flex-wrap gap-3 mb-8 justify-center items-center">
          <div className="relative">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-[#FF5722] cursor-pointer"
            >
              {eventOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
              Event
            </span>
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
          </div>

          <div className="relative">
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="appearance-none bg-[#FF5722] text-white border border-[#FF5722] rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none cursor-pointer"
            >
              {flavorOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
              Flavour
            </span>
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
          </div>

          <div className="relative">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-[#FF5722] cursor-pointer"
            >
              {priceRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
              Price Range
            </span>
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
          </div>

          <div className="relative">
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-[#FF5722] cursor-pointer"
            >
              {timeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
              Time
            </span>
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
          </div>

          <div className="relative">
            <select
              value={selectedCovering}
              onChange={(e) => setSelectedCovering(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-[#FF5722] cursor-pointer"
            >
              {coveringOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
              Covering
            </span>
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
          </div>

          <button
            onClick={() => setCurrentPage(1)}
            className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5722]"></div>
          </div>
        ) : filteredCakes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              No cakes found matching your criteria
            </p>
            <button
              onClick={() => {
                setSelectedEvent("All");
                setSelectedFlavor("All");
                setSelectedPriceRange("All");
                setSelectedTime("All");
                setSelectedCovering("All");
                setSearchQuery("");
              }}
              className="text-[#FF5722] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {filteredCakes.map((cake) => (
                <button
                  key={cake._id || cake.id}
                  onClick={() => handleCakeClick(cake)}
                  className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <img
                    src={
                      cake.image ||
                      "https://via.placeholder.com/300?text=No+Image"
                    }
                    alt={cake.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mb-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">
            Didn't Find Anything You Like?
          </p>
          <button
            onClick={() => navigate("/customize-cake")}
            className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Customize Your Cake
          </button>
        </div>
      </div>

      {showModal && selectedCake && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg max-w-3xl w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img
                  src={
                    selectedCake.image ||
                    "https://via.placeholder.com/400?text=No+Image"
                  }
                  alt={selectedCake.name}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="md:w-1/2 text-white">
                <h2 className="text-2xl font-bold mb-4">{selectedCake.name}</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCake.specifications?.shape && (
                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
                      {selectedCake.specifications.shape}
                    </span>
                  )}
                  {selectedCake.specifications?.numberOfTiers && (
                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
                      {selectedCake.specifications.numberOfTiers} Tier
                      {selectedCake.specifications.numberOfTiers > 1 ? "s" : ""}
                    </span>
                  )}
                  {selectedCake.specifications?.covering && (
                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
                      {selectedCake.specifications.covering}
                    </span>
                  )}
                  {selectedCake.category && (
                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
                      {selectedCake.category}
                    </span>
                  )}
                </div>

                <p className="text-sm mb-4 leading-relaxed">
                  {selectedCake.description || selectedCake.fullDescription}
                </p>

                {selectedCake.priceNGN && (
                  <p className="text-lg font-bold mb-4">
                    ₦{selectedCake.priceNGN.toLocaleString()}
                    {selectedCake.price && (
                      <span className="text-sm text-gray-400 ml-2">
                        (${selectedCake.price.toLocaleString()})
                      </span>
                    )}
                  </p>
                )}

                <button
                  onClick={handleConfirmSelection}
                  className="w-full bg-[#FF5722] hover:bg-[#FF5722]/90 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Modify This Cake
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <TopReviews />
      <Footer />
    </div>
  );
};

export default ModifyCake;
