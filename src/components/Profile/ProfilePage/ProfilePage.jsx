import { useNavigate } from "react-router-dom";
import { Edit, Clock, Settings, Plus, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import bg from "../../../assets/heading.png";
import dp from "../../../assets/defaultDp.webp";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to view your profile");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const userProfile = response.data.data;
        if (userProfile) {
          setUserData(userProfile);
          localStorage.setItem("user", JSON.stringify(userProfile));
        } else {
          toast.error("Invalid profile data");
          navigate("/login");
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="font-main min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5722] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const actionButtons1 = [
    {
      icon: <Edit className="w-6 h-6" />,
      label: "Edit Information",
      onClick: () => navigate("/editProfile"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Order History",
      onClick: () => navigate("/order-history"),
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
  ];

  const actionButtons2 = [
    {
      icon: <Plus className="w-6 h-6" />,
      label: "Start A New Order",
      onClick: () => navigate("/readymade-cake"),
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      label: "Reorder A Previous Order",
      onClick: () => navigate("/reorder-previous-order"),
    },
  ];

  return (
    <div className="font-main min-h-screen bg-white">
      <div
        className="pt-16 pb-24 px-4 h-[391px] -mb-[17%] md:-mb-[7%]"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative inline-block mb-6">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#4A6B8A] bg-[#4A6B8A] mx-auto">
            <img
              src={userData.profilePicture || dp}
              alt={userData.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="font-secondary text-4xl font-bold text-black mb-2">
          {userData.name}
        </h1>
        <p className="text-lg text-black">{userData.email}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-[#FF5722] rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-2 gap-4 text-center text-white">
            <div>
              <p className="text-sm mb-1 opacity-90">Total Orders</p>
              <p className="text-4xl font-bold">{userData.totalOrders || 0}</p>
            </div>
            <div>
              <p className="text-sm mb-1 opacity-90">Total Spent</p>
              <p className="text-4xl font-bold">
                ₦{(userData.totalSpent || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pb-12">
          {actionButtons1.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className="flex flex-col items-center justify-center group cursor-pointer"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black text-[#FF5722] flex flex-col items-center justify-center mb-3 transition-transform hover:scale-105 shadow-lg">
                {button.icon}
                <span className="text-[10px] sm:text-[13.65px] font-medium text-white">
                  {button.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-center md:items-center gap-6 md:gap-28 pb-12">
          {actionButtons2.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className="flex flex-col items-center justify-center group cursor-pointer"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black text-[#FF5722] flex flex-col items-center justify-center mb-3 transition-transform hover:scale-105 shadow-lg">
                {button.icon}
                <span className="text-[10px] sm:text-[13.65px] font-medium text-white">
                  {button.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
