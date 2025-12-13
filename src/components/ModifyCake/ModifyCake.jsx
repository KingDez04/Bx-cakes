import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";
import bg2 from "../../assets/heading4.png";

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

  // Sample cakes data matching the images
  const allCakes = [
    {
      id: 1,
      name: "Chocolate Delight Cake",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
      event: "Birthday",
      flavor: "Chocolate",
      priceRange: "₦30,000 - ₦50,000",
      time: "3-5 days",
      covering: "Buttercream",
      description:
        "A stunning 3-tier red velvet cake with rich chocolate churros frosting—perfect for weddings, birthdays, or graduations. Serves 30–40 people.",
      tags: ["3-tier cake", "Birthday Cake", "Vegan", "Gluten Free"],
      cakeId: "CAKE001",
    },
    {
      id: 2,
      name: "Birthday Celebration",
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500",
      event: "Birthday",
      flavor: "Vanilla",
      priceRange: "₦30,000 - ₦50,000",
      time: "1-2 days",
      covering: "Fondant",
      description:
        "Colorful birthday cake with candles and festive decorations",
      tags: ["Birthday Cake", "Chocolate"],
      cakeId: "CAKE002",
    },
    {
      id: 3,
      name: "Elegant White",
      image:
        "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500",
      event: "Wedding",
      flavor: "Vanilla",
      priceRange: "₦50,000+",
      time: "5-7 days",
      covering: "Fondant",
      description: "Multi-tiered white wedding cake with delicate decorations",
      tags: ["Wedding Cake", "Vanilla"],
      cakeId: "CAKE003",
    },
    {
      id: 4,
      name: "Classic White",
      image:
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500",
      event: "Wedding",
      flavor: "Vanilla",
      priceRange: "₦50,000+",
      time: "5-7 days",
      covering: "Fondant",
      description: "Elegant tiered white cake perfect for special occasions",
      tags: ["Wedding Cake", "Vanilla"],
      cakeId: "CAKE004",
    },
  ];

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

  // Filter cakes based on selected filters and search query
  const filteredCakes = allCakes.filter((cake) => {
    const matchesSearch = cake.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesEvent =
      selectedEvent === "All" || cake.event === selectedEvent;
    const matchesFlavor =
      selectedFlavor === "All" || cake.flavor === selectedFlavor;
    const matchesPriceRange =
      selectedPriceRange === "All" || cake.priceRange === selectedPriceRange;
    const matchesTime = selectedTime === "All" || cake.time === selectedTime;
    const matchesCovering =
      selectedCovering === "All" || cake.covering === selectedCovering;

    return (
      matchesSearch &&
      matchesEvent &&
      matchesFlavor &&
      matchesPriceRange &&
      matchesTime &&
      matchesCovering
    );
  });

  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
    setShowModal(true);
  };

  const handleConfirmSelection = () => {
    navigate(`/modify-cake/${selectedCake.id}/confirm`, {
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

          {/* Search Button */}
          <button className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {filteredCakes.map((cake) => (
            <button
              key={cake.id}
              onClick={() => handleCakeClick(cake)}
              className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

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
                  src={selectedCake.image}
                  alt={selectedCake.name}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="md:w-1/2 text-white">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCake.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm mb-6 leading-relaxed">
                  {selectedCake.description}
                </p>

                <p className="text-sm mb-6">
                  Cake ID:{" "}
                  <span className="font-semibold">{selectedCake.cakeId}</span>
                </p>

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
