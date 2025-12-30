import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import TopReviews from "../TopReviews/TopReviews";
import Footer from "../Footer/Footer";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ReadyMadeCakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cakes/ready-made/${id}`
      );

      if (response.data.success) {
        setProduct(response.data.data);

        fetchRelatedProducts(response.data.data.category);
      }
    } catch (error) {
      console.error("Error fetching cake details:", error);
      toast.error(
        error.response?.data?.message || "Failed to load cake details"
      );
      navigate("/readymade-cake");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/cakes/ready-made?category=${category}&limit=4`
      );

      if (response.data.success) {
        setRelatedProducts(
          response.data.data.cakes.filter(
            (cake) => (cake._id || cake.id) !== id
          )
        );
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleBuyNow = () => {
    navigate(`/readymade-cake/${id}/checkout`, {
      state: { product },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5722]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Cake not found</p>
          <button
            onClick={() => navigate("/readymade-cake")}
            className="text-[#FF5722] hover:underline cursor-pointer"
          >
            Back to Ready Made Cakes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-tertiary min-h-screen">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/readymade-cake")}
            className="flex items-center space-x-2 hover:text-orange-300 mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Ready Made Cakes</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/800?text=No+Image"
                }
                alt={product.name}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div>
              <p className="text-orange-600 font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="font-secondary text-3xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating?.toFixed(1) || "0.0"} (
                  {product.reviewCount || 0} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-orange-600">
                  ₦{(product.priceNGN || 0).toLocaleString()}
                </span>
                {product.price && (
                  <span className="text-xl text-gray-500 ml-2">
                    (${product.price.toLocaleString()})
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">
                {product.fullDescription || product.description}
              </p>

              <div className="space-y-3 mb-6">
                {product.servings && (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Servings:</span>
                    <span className="text-gray-700">{product.servings}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Weight:</span>
                    <span className="text-gray-700">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Dimensions:</span>
                    <span className="text-gray-700">{product.dimensions}</span>
                  </div>
                )}
                {product.inStock !== undefined && (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Availability:</span>
                    <span
                      className={
                        product.inStock ? "text-green-600" : "text-red-600"
                      }
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-lg text-lg font-semibold transition-colors mb-4 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.inStock ? "Buy Now" : "Out of Stock"}
              </button>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Need help?</span> Contact us
                  at{" "}
                  <a href="tel:+1 (234) 567-8900" className="text-orange-600">
                    +1 (234) 567-8900
                  </a>{" "}
                  or email{" "}
                  <a href="mailto:info@bxcakes.com" className="text-orange-600">
                    info@bxcakes.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.allergens && product.allergens.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Allergen Information
                  </h3>
                  <p className="text-gray-700 mb-2">This product contains:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="font-secondary text-2xl font-bold mb-6">
            Other Cakes You Might Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id || relatedProduct.id}
                onClick={() => {
                  navigate(
                    `/readymade-cake/${relatedProduct._id || relatedProduct.id}`
                  );
                  window.scrollTo(0, 0);
                }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              >
                <img
                  src={
                    relatedProduct.image ||
                    "https://via.placeholder.com/300?text=No+Image"
                  }
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      ₦{(relatedProduct.priceNGN || 0).toLocaleString()}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">
                        {relatedProduct.rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default ReadyMadeCakeDetails;
