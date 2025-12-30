import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import TopReviews from "../TopReviews/TopReviews";
import bg from "../../assets/heading.png";
import heroCake from "../../assets/cake3.png";
import halfCake from "../../assets/halfCakeVector.png";
import sugar from "../../assets/sugarVector.png";
import cake from "../../assets/cakeVector.png";
import cake1 from "../../assets/cake4.png";
import cake2 from "../../assets/cake5.png";
import cake3 from "../../assets/cake6.png";
import cake4 from "../../assets/cake2.png";
import customCake from "../../assets/customCake.png";
import modifyCake from "../../assets/modifyCake.png";
import readyMadeCake from "../../assets/readymadeCake.png";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({
    "Birthday Cakes": 0,
    "Wedding Cakes": 0,
    "Custom Cakes": 0,
    Cupcakes: 0,
  });

  const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      const categoryNames = [
        "Birthday Cakes",
        "Wedding Cakes",
        "Custom Cakes",
        "Cupcakes",
      ];

      try {
        const countPromises = categoryNames.map(async (categoryName) => {
          const response = await axios.get(`${API_BASE_URL}/cakes/ready-made`, {
            params: { category: categoryName, limit: 1 },
          });
          return {
            name: categoryName,
            count: response.data?.data?.pagination?.totalItems || 0,
          };
        });

        const results = await Promise.all(countPromises);
        const newCounts = {};
        results.forEach((result) => {
          newCounts[result.name] = result.count;
        });
        setCategoryCounts(newCounts);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const orderOptions = {
    custom: {
      title: "Custom Cake",
      description:
        "Create your perfect cake from scratch—choose the shape, size, and finish that match your vision and taste.",
      route: "/customize-cake",
    },
    modify: {
      title: "Modify Cake",
      description:
        "Create your perfect cake from scratch—choose the shape, size, and finish that match your vision and taste.",
      route: "/modify-cake",
    },
    readymade: {
      title: "Ready Made Cake",
      description:
        "Create your perfect cake from scratch—choose the shape, size, and finish that match your vision and taste.",
      route: "/readymade-cake",
    },
  };

  const categories = [
    { name: "Birthday Cakes", image: cake1 },
    { name: "Wedding Cakes", image: cake2 },
    { name: "Custom Cakes", image: cake3 },
    { name: "Cupcakes", image: cake4 },
  ];

  return (
    <div className="font-tertiary min-h-screen">
      <section
        className="text-white max-h-[503px]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-secondary text-[43.32px] font-extrabold mb-6">
                Order Your Cakes From Us Today!
              </h1>
              <p className="text-xl md:text-[26.77px] mb-8 text-pink-100">
                Order quality meals made with love to be delivered right at you
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/readymade-cake"
                  className="bg-white text-[#FF673F] px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
                >
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#FF673F] transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src={heroCake} alt="Delicious Cake" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center bg-black py-14">
        <div className="flex flex-col gap-10 text-white">
          <h2 className="font-secondary text-2xl md:text-[40.06px] text-center font-bold">
            Here’s What To Expect
          </h2>
          <div className="flex gap-5 md:gap-24">
            <div className="flex flex-col items-center justify-center group">
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#FD5A2F] flex items-center justify-center mb-3">
                <img
                  src={halfCake}
                  alt="Half Cake"
                  className="w-10 h-10 md:w-auto md:h-auto"
                />
              </div>
              <p className="text-center text-xs md:text-[15.92px] font-medium">
                High Quality Cakes
              </p>
            </div>
            <div className="flex flex-col items-center justify-center group">
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#FD5A2F] flex items-center justify-center mb-3">
                <img
                  src={sugar}
                  alt="Sugar"
                  className="w-10 h-10 md:w-auto md:h-auto"
                />
              </div>
              <p className="text-center text-xs md:text-[15.92px] font-medium">
                Natural Ingredients
              </p>
            </div>
            <div className="flex flex-col items-center justify-center group">
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#FD5A2F] flex items-center justify-center mb-3">
                <img
                  src={cake}
                  alt="Cake"
                  className="w-10 h-10 md:w-auto md:h-auto"
                />
              </div>
              <p className="text-center text-xs md:text-[15.92px] font-medium">
                Beautiful Cakes
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FF673F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-secondary text-2xl md:text-[43.74px] text-white font-bold text-center mb-12">
            Some Of Our Best Cakes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/readymade-cake?category=${category.name}`}
                className="text-white text-center group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-40 md:h-80"
                />
                <h3 className="font-semibold text-lg mb-1 group-hover:text-pink-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {categoryCounts[category.name]} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-secondary text-3xl md:text-[43.74px] font-bold mb-4">
            Start Your Order Here!
          </h2>
          <p className="text-lg md:text-[33.9px] font-light">
            Choose How You Want Your Cake
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <button
            onClick={() => setSelectedOption("custom")}
            className="group flex flex-col items-center focus:outline-none cursor-pointer"
          >
            <div
              className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 ${
                selectedOption === "custom" ? "ring-4 ring-[#FF5722]" : ""
              }`}
            >
              <img src={customCake} alt="Custom Cake" />
            </div>
            <h3
              className={`text-xl md:text-2xl font-semibold transition-colors ${
                selectedOption === "custom"
                  ? "text-[#FF5722]"
                  : "text-black group-hover:text-[#FF5722]"
              }`}
            >
              Custom Cake
            </h3>
          </button>

          <button
            onClick={() => setSelectedOption("modify")}
            className="group flex flex-col items-center focus:outline-none cursor-pointer"
          >
            <div
              className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-xl flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 ${
                selectedOption === "modify" ? "ring-4 ring-[#FF5722]" : ""
              }`}
            >
              <img src={modifyCake} alt="Modify Cake" />
            </div>
            <h3
              className={`text-xl md:text-2xl font-semibold transition-colors ${
                selectedOption === "modify" ? "text-[#FF5722]" : "text-black"
              }`}
            >
              Modify Cake
            </h3>
          </button>

          <button
            onClick={() => setSelectedOption("readymade")}
            className="group flex flex-col items-center focus:outline-none cursor-pointer"
          >
            <div
              className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 ${
                selectedOption === "readymade" ? "ring-4 ring-[#FF5722]" : ""
              }`}
            >
              <img src={readyMadeCake} alt="Ready Made Cake" />
            </div>
            <h3
              className={`text-xl md:text-2xl font-semibold transition-colors ${
                selectedOption === "readymade"
                  ? "text-[#FF5722]"
                  : "text-black group-hover:text-[#FF5722]"
              }`}
            >
              Ready Made Cakes
            </h3>
          </button>
        </div>

        {selectedOption && (
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {orderOptions[selectedOption].title}
            </h3>
            <p className="text-base md:text-xl text-gray-700 mb-8 px-4">
              {orderOptions[selectedOption].description}
            </p>
            <Link
              to={orderOptions[selectedOption].route}
              className="inline-block bg-[#FF5722] text-white px-16 py-4 rounded-full text-lg font-semibold hover:bg-[#E64A19] transition-colors shadow-lg"
            >
              Next
            </Link>
          </div>
        )}
      </section>

      <TopReviews />

      <Footer />
    </div>
  );
};

export default Home;
