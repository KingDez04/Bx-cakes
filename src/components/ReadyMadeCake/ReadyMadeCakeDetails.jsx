import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import TopReviews from "../TopReviews/TopReviews";
import Footer from "../Footer/Footer";

// Currency conversion rate (example: 1 USD = 1600 NGN)
const USD_TO_NGN = 1600;

const ReadyMadeCakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample product data - in real app, fetch by ID
  const allProducts = [
    {
      id: 1,
      name: "Chocolate Delight Cake",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      rating: 4.8,
      reviews: 124,
      category: "Chocolate Cakes",
      description: "Rich chocolate layers with creamy frosting",
      fullDescription:
        "Indulge in our signature Chocolate Delight Cake, featuring multiple layers of moist chocolate sponge, filled with silky chocolate ganache, and topped with a smooth chocolate buttercream frosting. Each bite melts in your mouth, delivering an unforgettable chocolate experience.",
      ingredients: [
        "Premium chocolate",
        "Fresh eggs",
        "Butter",
        "Sugar",
        "Flour",
        "Vanilla extract",
      ],
      allergens: ["Eggs", "Dairy", "Gluten"],
      servings: "8-10 people",
      weight: "2.5 lbs",
    },
    {
      id: 2,
      name: "Strawberry Dream",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
      rating: 4.9,
      reviews: 156,
      category: "Fruit Cakes",
      description: "Fresh strawberry cake with whipped cream",
      fullDescription:
        "A heavenly combination of vanilla sponge layered with fresh strawberries and light whipped cream. Decorated with fresh strawberry slices on top.",
      ingredients: [
        "Fresh strawberries",
        "Fresh eggs",
        "Butter",
        "Sugar",
        "Flour",
        "Heavy cream",
      ],
      allergens: ["Eggs", "Dairy", "Gluten"],
      servings: "8-10 people",
      weight: "2 lbs",
    },
  ];

  const product =
    allProducts.find((p) => p.id === parseInt(id)) || allProducts[0];

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    navigate(`/readymade-cake/${id}/checkout`, {
      state: { product },
    });
  };

  return (
    <div className="min-h-screen">
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
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div>
              <p className="text-orange-600 font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-orange-600">
                  ₦{(product.price * USD_TO_NGN).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{product.fullDescription}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Servings:</span>
                  <span className="text-gray-700">{product.servings}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Weight:</span>
                  <span className="text-gray-700">{product.weight}</span>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-orange-600 hover:bg-orange-700 py-4 rounded-lg text-lg font-semibold transition-colors mb-4 cursor-pointer"
              >
                Buy Now
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
              <div>
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

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
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                onClick={() => {
                  navigate(`/readymade-cake/${relatedProduct.id}`);
                  window.scrollTo(0, 0);
                }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      ₦{(relatedProduct.price * USD_TO_NGN).toLocaleString()}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">
                        {relatedProduct.rating}
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
