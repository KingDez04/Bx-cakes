import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Camera, Lock, LogOut } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import bg from "../../../assets/heading.png";
import dp from "../../../assets/defaultDp.webp";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const Settings = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(dp);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email) setEmail(user.email);
    if (user.profileImage) setProfileImage(user.profileImage);
  }, []);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    setIsUpdatingEmail(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/settings/email`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        user.email = email;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Email updated successfully");
      }
    } catch (error) {
      console.error("Email update error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to update email");
      }
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleImageUpload = () => {
    toast.info("Use Edit Profile page to update profile picture");
    setTimeout(() => navigate("/edit-profile"), 1500);
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword);
    const hasLowerCase = /[a-z]/.test(passwordData.newPassword);
    const hasNumber = /[0-9]/.test(passwordData.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast.error("Password must contain uppercase, lowercase, and number");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/settings/password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Password changed successfully");
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Password change error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to change password"
        );
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="font-main min-h-screen bg-white">
      <div
        className="pt-16 pb-24 px-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-secondary text-4xl md:text-5xl font-bold text-white">
            Settings
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF5722] mx-auto">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleImageUpload}
                className="absolute bottom-0 right-0 w-10 h-10 bg-[#FF5722] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E64A19] transition-colors cursor-pointer"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Click camera icon to upload profile picture
            </p>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-[#FF5722]" />
              <h2 className="text-xl font-bold">Email Address</h2>
            </div>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                disabled={isUpdatingEmail}
                className="w-full px-6 py-3 bg-[#FF5722] text-white rounded-lg hover:bg-[#E64A19] transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdatingEmail ? "Updating..." : "Update Email"}
              </button>
            </form>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-[#FF5722]" />
              <h2 className="text-xl font-bold">Password</h2>
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium text-left cursor-pointer"
            >
              Change Password
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-3 mb-4">
              <LogOut className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-red-600">Logout</h2>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>

          <div className="pt-6">
            <button
              onClick={() => navigate("/profile")}
              className="w-full px-8 py-3 bg-[#FF5722] text-white text-lg font-medium rounded-full hover:bg-[#E64A19] transition-colors cursor-pointer"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="flex-1 px-4 py-3 bg-[#FF5722] text-white rounded-lg hover:bg-[#E64A19] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChangingPassword ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
