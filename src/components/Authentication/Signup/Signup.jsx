import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import bg from "../../../assets/authBackground.png";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        signupData
      );

      if (response.data.success) {
        const { token, user } = response.data.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(response.data.message || "Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(`${err.path}: ${err.message}`);
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="font-secondary min-h-screen flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-md w-full">
        <div className="bg-black text-white rounded-2xl sm:rounded-[31.25px] shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-tertiary text-3xl sm:text-4xl lg:text-[41.54px] text-[#FD5A2F] font-semibold mb-2">
              Sign Up
            </h2>
            <p className="text-base sm:text-lg lg:text-[18.75px]">
              Create your account with us and unlock a world of taste
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm sm:text-base lg:text-[18.75px] font-medium mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-[12.5px] focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base lg:text-[18.75px] font-medium mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-[12.5px] focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm sm:text-base lg:text-[18.75px] font-medium mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-[12.5px] focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                  placeholder="+1 (234) 567-8900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base lg:text-[18.75px] font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-[12.5px] focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm sm:text-base lg:text-[18.75px] font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-[12.5px] focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FD5A2F] text-white text-base sm:text-lg lg:text-[19.04px] py-2.5 sm:py-3 rounded-full sm:rounded-[33.6px] font-semibold hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base lg:text-[19.04px]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#FD5A2F] hover:text-pink-700 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
