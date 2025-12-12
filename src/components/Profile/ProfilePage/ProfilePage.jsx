import { useNavigate } from "react-router-dom";
import { Edit, Clock, Settings, Plus, RotateCcw } from "lucide-react";
import dp from "../../../assets/staticDp.png";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Sample user data
  const userData = {
    name: "Amanda Efiko",
    email: "amandaefik@gmail.com",
    profileImage: dp,
    totalOrders: 3,
    totalSpent: 34000,
  };

  const actionButtons1 = [
    {
      icon: <Edit className="w-6 h-6" />,
      label: "Edit Information",
      onClick: () => navigate("/editProfile"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Order History",
      onClick: () => navigate("/orders"),
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
      onClick: () => navigate("/orders"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Orange Header Section */}
      <div className="bg-[#FF5722] pt-16 pb-24 px-4 h-[391px] -mb-[17%] md:-mb-[7%]"></div>
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative inline-block mb-6">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#4A6B8A] bg-[#4A6B8A] mx-auto">
            <img
              src={userData.profileImage}
              alt={userData.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-black mb-2">{userData.name}</h1>
        <p className="text-lg text-black">{userData.email}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-[#FF5722] rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-2 gap-4 text-center text-white">
            <div>
              <p className="text-sm mb-1 opacity-90">Total Orders</p>
              <p className="text-4xl font-bold">{userData.totalOrders}</p>
            </div>
            <div>
              <p className="text-sm mb-1 opacity-90">Total Spent</p>
              <p className="text-4xl font-bold">
                {userData.totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pb-12">
          {actionButtons1.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className="flex flex-col items-center justify-center group"
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
              className="flex flex-col items-center justify-center group"
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
