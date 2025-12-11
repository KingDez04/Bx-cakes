import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../../assets/bx-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src={logo} alt="BX Cakes" className="rounded-full" />
            <p className="text-gray-400 mb-4">
              Your destination for delicious, handcrafted cakes and pastries.
              Made with love and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-[#FF673F] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#FF673F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#FF673F] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/readymade-cake"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#FF673F] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 shrink-0" />
                <span>123 Bakery Street, Sweet City, SC 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 shrink-0" />
                <a
                  href="tel:+1 (234) 567-8900"
                  className="hover:text-[#FF673F]"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 shrink-0" />
                <a
                  href="mailto:info@bxcakes.com"
                  className="hover:text-[#FF673F]"
                >
                  info@bxcakes.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Bx Cakes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
