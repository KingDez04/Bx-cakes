import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import TopReviews from "../TopReviews/TopReviews";
import Footer from "../Footer/Footer";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send the form data to the backend
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (234) 567-8900", "+1 (234) 567-8901"],
      action: "tel:+12345678900",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@bxcakes.com", "support@bxcakes.com"],
      action: "mailto:info@bxcakes.com",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["123 Bakery Street", "Sweet City, SC 12345"],
      action: null,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Hours",
      details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 6:00 PM"],
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#8B4513] via-black to-[#D2691E]">
      <section className="bg-linear-to-r from-orange-800 via-black to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have a question or want to place a custom order? We'd love to hear
              from you!
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-black text-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="bg-pink-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-[#FD5A2F]">{info.icon}</div>
              </div>
              <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-white">
                    {info.action && idx === 0 ? (
                      <a
                        href={info.action}
                        className="hover:text-[#FD5A2F] transition-colors"
                      >
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-black text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl text-[#FD5A2F] font-bold mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="+1 (234) 567-8900"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Custom cake order"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your cake requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FD5A2F] text-white py-4 rounded-lg font-semibold hover:bg-[#FF5722]/90 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-black rounded-xl shadow-lg overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99185368459395!3d40.74117447932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Bx Cakes Location"
              />
            </div>

            <div className="bg-linear-to-r from-orange-800 via-black to-orange-800 text-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl text-[#FD5A2F] font-bold mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    How far in advance should I order?
                  </h4>
                  <p className="text-sm">
                    We recommend ordering at least 3-5 days in advance for
                    custom cakes. Same-day orders may be available for select
                    items.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Do you offer delivery?</h4>
                  <p className="text-sm">
                    Yes! We offer delivery within a 20-mile radius. Same-day
                    delivery is available for orders placed before 2 PM.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Can I customize my cake?
                  </h4>
                  <p className="text-sm">
                    Absolutely! We specialize in custom designs. Contact us to
                    discuss your vision and we'll bring it to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TopReviews />
      <Footer />
    </div>
  );
};

export default Contact;
