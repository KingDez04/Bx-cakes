import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import TopReviews from "../TopReviews/TopReviews";
import Footer from "../Footer/Footer";
import bg from "../../assets/heading4.png";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ReadyMadeCake = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    fetchReadyMadeCakes();
  }, [selectedCategory, priceRange, searchQuery, pagination.currentPage]);

  const fetchReadyMadeCakes = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      if (priceRange !== "all") {
        params.append("priceRange", priceRange);
      }

      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }

      params.append("page", pagination.currentPage);
      params.append("limit", 12);

      const response = await axios.get(
        `${API_BASE_URL}/cakes/ready-made?${params.toString()}`
      );

      if (response.data.success) {
        setProducts(response.data.data.cakes || []);
        setPagination(
          response.data.data.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
          }
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load cakes");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchReadyMadeCakes();
  };

  const categories = [
    "All",
    "Chocolate Cakes",
    "Vanilla Cakes",
    "Fruit Cakes",
    "Classic Cakes",
    "Special Cakes",
  ];

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
                Showing {products.length} cake
                {products.length !== 1 ? "s" : ""}
              </p>
            </div>

            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading cakes...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-gray-800 rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-400 text-lg">
                  No cakes found matching your criteria.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product._id || product.id}
                      to={`/readymade-cake/${product._id || product.id}`}
                      className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={
                            product.image ||
                            "https://via.placeholder.com/400x300?text=Cake"
                          }
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-500 mb-1">
                          {product.category}
                        </p>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center mb-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">
                            {product.rating || 0} ({product.reviewCount || 0}{" "}
                            reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-orange-600">
                              ₦{(product.priceNGN || 0).toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              ${product.price || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {!isLoading &&
                  products.length > 0 &&
                  pagination.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                      <button
                        onClick={() =>
                          setPagination((prev) => ({
                            ...prev,
                            currentPage: Math.max(1, prev.currentPage - 1),
                          }))
                        }
                        disabled={pagination.currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 cursor-pointer"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setPagination((prev) => ({
                            ...prev,
                            currentPage: Math.min(
                              pagination.totalPages,
                              prev.currentPage + 1
                            ),
                          }))
                        }
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  )}
              </>
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
