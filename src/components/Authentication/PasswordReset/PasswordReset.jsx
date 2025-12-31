import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import bg from "../../../assets/authBackground.png";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email }
      );

      if (response.data.success) {
        toast.success("Password reset link sent to your email!");
        setIsSubmitted(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Password reset error:", error);

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to send reset link. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="font-secondary min-h-screen flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-md w-full">
        <div className="bg-black text-white rounded-2xl sm:rounded-[31.25px] p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-tertiary text-3xl sm:text-4xl lg:text-[41.54px] font-semibold text-[#FD5A2F] mb-2">
              Reset Password
            </h2>
            <p className="text-base sm:text-lg lg:text-[18.75px]">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to reset your password"}
            </p>
          </div>

          {!isSubmitted ? (
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-[12.5px] focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white text-sm sm:text-base"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FD5A2F] text-white text-base sm:text-lg lg:text-[19.04px] py-2.5 sm:py-3 rounded-full sm:rounded-[33.6px] font-semibold hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-base sm:text-lg mb-4">
                We've sent a password reset link to:
              </p>
              <p className="text-[#FD5A2F] font-semibold text-lg mb-6">
                {email}
              </p>
              <p className="text-sm text-gray-400">
                Redirecting to login page...
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm sm:text-base lg:text-[19.04px] font-medium text-[#FD5A2F] hover:text-pink-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>

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

export default PasswordReset;
