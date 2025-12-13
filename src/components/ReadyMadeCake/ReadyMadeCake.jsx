import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Search } from "lucide-react";
import TopReviews from "../TopReviews/TopReviews";
import Footer from "../Footer/Footer";
import bg from "../../assets/heading4.png";

// Currency conversion rate (example: 1 USD = 1600 NGN)
const USD_TO_NGN = 1600;

const ReadyMadeCake = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: "Chocolate Delight Cake",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
      rating: 4.8,
      category: "Chocolate Cakes",
      description: "Rich chocolate layers with creamy frosting",
    },
    {
      id: 2,
      name: "Strawberry Dream",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
      rating: 4.9,
      category: "Fruit Cakes",
      description: "Fresh strawberry cake with whipped cream",
    },
    {
      id: 3,
      name: "Vanilla Classic",
      price: 35.99,
      image:
        "https://images.unsplash.com/photo-1588195538326-c5b1e5b680ab?w=500",
      rating: 4.7,
      category: "Classic Cakes",
      description: "Traditional vanilla sponge cake",
    },
    {
      id: 4,
      name: "Red Velvet Love",
      price: 42.99,
      image:
        "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500",
      rating: 4.9,
      category: "Special Cakes",
      description: "Signature red velvet with cream cheese frosting",
    },
    {
      id: 5,
      name: "Lemon Bliss",
      price: 37.99,
      image:
        "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=500",
      rating: 4.6,
      category: "Fruit Cakes",
      description: "Zesty lemon cake with tangy frosting",
    },
    {
      id: 6,
      name: "Black Forest",
      price: 48.99,
      image:
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500",
      rating: 4.8,
      category: "Chocolate Cakes",
      description: "Chocolate cake with cherry filling",
    },
    {
      id: 7,
      name: "Carrot Cake",
      price: 40.99,
      image:
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500",
      rating: 4.7,
      category: "Classic Cakes",
      description: "Moist carrot cake with walnuts",
    },
    {
      id: 8,
      name: "Blueberry Cheesecake",
      price: 44.99,
      image:
        "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500",
      rating: 4.9,
      category: "Special Cakes",
      description: "Creamy cheesecake with blueberry topping",
    },
  ];

  const categories = [
    "All",
    "Chocolate Cakes",
    "Fruit Cakes",
    "Classic Cakes",
    "Special Cakes",
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    let matchesPrice = true;
    if (priceRange === "under40") {
      matchesPrice = product.price < 40;
    } else if (priceRange === "40to50") {
      matchesPrice = product.price >= 40 && product.price <= 50;
    } else if (priceRange === "over50") {
      matchesPrice = product.price > 50;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="font-tertiary min-h-screen">
      <div className="py-16 px-4" style={{ backgroundImage: `url(${bg})` }}>
        <div className="font-secondary max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Purchase A Ready Made Cake
          </h1>
          <p className="text-white text-base md:text-[27.03px] max-w-2xl mx-auto">
            Want an already made cake? SHop from our catalog
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3 text-white">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cakes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3 text-white">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-orange-600 text-white"
                        : "hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-3 text-white">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                  <input
                    type="radio"
                    name="price"
                    value="all"
                    checked={priceRange === "all"}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>All Prices</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                  <input
                    type="radio"
                    name="price"
                    value="under40"
                    checked={priceRange === "under40"}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>Under ₦64,000</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                  <input
                    type="radio"
                    name="price"
                    value="40to50"
                    checked={priceRange === "40to50"}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>₦64,000 - ₦80,000</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                  <input
                    type="radio"
                    name="price"
                    value="over50"
                    checked={priceRange === "over50"}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="text-orange-600"
                  />
                  <span>Over ₦80,000</span>
                </label>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-300">
                Showing {filteredProducts.length} cake
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-gray-800 rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-400 text-lg">
                  No cakes found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/readymade-cake/${product.id}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-600">
                          ₦{(product.price * USD_TO_NGN).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default ReadyMadeCake;
