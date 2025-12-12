import alexa from "../../assets/alexa.png";
import sarah from "../../assets/sarah.png";
import damilola from "../../assets/damilola.png";

const TopReviews = () => {
  return (
    <div className="font-tertiary bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-secondary text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          What Our Customer's Think
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <div className="mb-6">
              <img
                src={alexa}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-white"
              />
            </div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-4">
              Alexa B.
            </h3>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="#FF5722"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed">
              "I sent her a random Pinterest cake idea and somehow got something
              even better. Everyone at the party asked for her number!"
            </p>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <img
                src={sarah}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-white"
              />
            </div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-4">
              Sarah L.
            </h3>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="#FF5722"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed">
              "The chocolate cake was soft, rich, and perfect. My mum said it
              reminded her of the one she had on her wedding day — 30 years
              ago!"
            </p>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <img
                src={damilola}
                alt="Damilola T."
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-white"
              />
            </div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-4">
              Damilola T.
            </h3>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="#FF5722"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed">
              "From booking to delivery, everything was seamless. Her attention
              to detail is insane. I can't wait to order my wedding cake!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopReviews;
