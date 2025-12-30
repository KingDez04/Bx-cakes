import { useState, useEffect } from "react";
import axios from "axios";
import alexa from "../../assets/alexa.png";
import sarah from "../../assets/sarah.png";
import damilola from "../../assets/damilola.png";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const defaultReviews = [
  {
    id: 1,
    name: "Alexa B.",
    image: alexa,
    rating: 5,
    comment:
      "I sent her a random Pinterest cake idea and somehow got something even better. Everyone at the party asked for her number!",
  },
  {
    id: 2,
    name: "Sarah L.",
    image: sarah,
    rating: 5,
    comment:
      "The chocolate cake was soft, rich, and perfect. My mum said it reminded her of the one she had on her wedding day — 30 years ago!",
  },
  {
    id: 3,
    name: "Damilola T.",
    image: damilola,
    rating: 5,
    comment:
      "The cake was absolutely stunning and tasted divine! Will definitely order again.",
  },
];

const TopReviews = () => {
  const [reviews, setReviews] = useState(defaultReviews);

  useEffect(() => {
    fetchTopReviews();
  }, []);

  const fetchTopReviews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/top?limit=3`);

      if (response.data.success && response.data.data.reviews.length > 0) {
        const apiReviews = response.data.data.reviews.map((review, index) => ({
          id: review.id,
          name: review.userName || review.user?.name || `Customer ${index + 1}`,
          image:
            review.user?.profilePicture || [alexa, sarah, damilola][index % 3],
          rating: review.rating,
          comment: review.comment,
        }));
        setReviews(apiReviews);
      }
    } catch (error) {
      // Silently fail and use default reviews
      console.error("Failed to fetch reviews:", error);
    }
  };
  return (
    <div className="font-tertiary bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-secondary text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          What Our Customer's Think
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {reviews.map((review) => (
            <div key={review.id} className="text-center">
              <div className="mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-white"
                />
              </div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-4">
                {review.name}
              </h3>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 md:w-8 md:h-8"
                    viewBox="0 0 24 24"
                    fill={i < review.rating ? "#FF5722" : "#9CA3AF"}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopReviews;
