import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Camera, Lock, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import bg from "../../../assets/heading.png";
import dp from "../../../assets/staticDp.png";

const Settings = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("amandaefik@gmail.com");
  const [profileImage, setProfileImage] = useState(dp);

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    toast.success("Email updated successfully");
  };

  const handleImageUpload = () => {
    toast.info("Image upload functionality");
  };

  const handleChangePassword = () => {
    toast.info("Password change functionality");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
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
                className="w-full px-6 py-3 bg-[#FF5722] text-white rounded-lg hover:bg-[#E64A19] transition-colors font-medium cursor-pointer"
              >
                Update Email
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
    </div>
  );
};

export default Settings;
