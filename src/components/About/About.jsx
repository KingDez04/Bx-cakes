import { Award, Heart, Users, Clock } from "lucide-react";
import TopReviews from "../TopReviews/TopReviews";
import Footer from "../Footer/Footer";

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-[#FD5A2F]" />,
      title: "Made with Love",
      description:
        "Every cake is crafted with passion and care, using time-honored recipes passed down through generations.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#FD5A2F]" />,
      title: "Quality Ingredients",
      description:
        "We use only the finest, freshest ingredients sourced from trusted local suppliers to ensure exceptional taste.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#FD5A2F]" />,
      title: "Customer Focused",
      description:
        "Your satisfaction is our priority. We work closely with you to create the perfect cake for any occasion.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#FD5A2F]" />,
      title: "Fresh Daily",
      description:
        "All our cakes are baked fresh daily, ensuring you receive the highest quality product every time.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Master Baker",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Michael Chen",
      role: "Pastry Chef",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      name: "Emily Rodriguez",
      role: "Cake Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#FD5A2F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Bx Cakes</h1>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto">
              Creating sweet memories since 2015. We're passionate about baking
              the perfect cake for every celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Bx Cakes began as a small home bakery with a simple mission: to
                bring joy to people's lives through delicious, handcrafted
                cakes. What started in a family kitchen has grown into a beloved
                bakery serving the community with passion and dedication.
              </p>
              <p>
                Our founder, inspired by generations of family bakers, combined
                traditional recipes with modern techniques to create unique
                flavors that delight customers of all ages. Every cake tells a
                story, and we're honored to be part of your special moments.
              </p>
              <p>
                Today, we continue to uphold our commitment to quality,
                creativity, and customer satisfaction. From birthday
                celebrations to wedding ceremonies, we pour our hearts into
                every creation.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400"
              alt="Bakery"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400"
              alt="Baking"
              className="rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-[#FD5A2F] font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FD5A2F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-pink-100">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-pink-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-pink-100">Unique Recipes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-pink-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            "To create unforgettable moments by crafting exceptional cakes that
            bring joy, celebrate life's special occasions, and exceed our
            customers' expectations through quality, creativity, and heartfelt
            service."
          </p>
        </div>
      </section>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default About;
