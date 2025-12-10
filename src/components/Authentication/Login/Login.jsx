import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle authentication
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 to-pink-50 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-black text-white rounded-2xl sm:rounded-[31.25px] p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-[41.54px] font-semibold text-[#FD5A2F] mb-2">
              Log In
            </h2>
            <p className="text-base sm:text-lg lg:text-[18.75px]">
              Craving something? Log in and order!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-base sm:text-lg lg:text-[21.54px] font-medium mb-2"
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
                htmlFor="password"
                className="block text-base sm:text-lg lg:text-[21.54px] font-medium mb-2"
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm sm:text-base lg:text-[19.04px]"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/passwordReset"
                className="text-sm sm:text-base lg:text-[19.04px] font-medium text-[#FD5A2F] hover:text-pink-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FD5A2F] text-white text-base sm:text-lg lg:text-[19.04px] py-2.5 sm:py-3 rounded-full sm:rounded-[33.6px] font-semibold hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base lg:text-[19.04px]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#FD5A2F] hover:text-pink-700 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
