import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import dp from "../../../assets/defaultDp.webp";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: dp,
    address: "",
    personalNote: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to edit your profile");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const user = response.data.data.user;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          profileImage: user.profilePicture || dp,
          address: user.address || "",
          personalNote: user.personalNote || "",
          phoneNumber: user.phoneNumber || "",
        });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = localStorage.getItem("authToken");
      const updateData = {
        name: formData.name,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        personalNote: formData.personalNote,
      };

      const response = await axios.put(
        `${API_BASE_URL}/user/profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Profile updated successfully!");
        const updatedUser = response.data.data;
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleImageEdit = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const token = localStorage.getItem("authToken");
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${API_BASE_URL}/user/profile/picture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          toast.success("Profile picture updated successfully!");
          const profileImageUrl = response.data.data.profileImage;
          setFormData((prev) => ({
            ...prev,
            profileImage: profileImageUrl,
          }));

          const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
          currentUser.profileImage = profileImageUrl;
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to upload image");
      }
    };
    input.click();
  };

  const handleNameEdit = () => {
    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) {
      nameInput.focus();
      toast.info("Update your name in the form below");
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

  return (
    <div className="font-main min-h-screen bg-white">
      <div className="bg-[#FF5722] pt-16 pb-24 px-4 h-[391px] -mb-[17%] md:-mb-[7%]"></div>
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative inline-block mb-6">
          <div className="w-40 h-40 md:w-[239px] md:h-[239px] rounded-full overflow-hidden border-4 border-[#4A6B8A] bg-[#4A6B8A] mx-auto">
            <img
              src={formData.profileImage}
              alt={formData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleImageEdit}
            className="absolute top-2 right-2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Edit className="w-5 h-5 text-black" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="font-secondary text-4xl md:text-[54.23px] font-bold text-black mb-2">
            {formData.name}
          </h1>
          <button
            onClick={handleNameEdit}
            className="text-[#FF5722] hover:text-[#E64A19] transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
        <p className="text-lg md:text-[29.23px] text-black">{formData.email}</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="mx-auto px-4 -mt-8">
          <form onSubmit={handleSave} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-6 mb-10">
              <div>
                <label className="font-tertiary block text-[18.68px] font-semibold text-black mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#E8E8E8] border-0 rounded-[30px] text-black text-base focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  required
                />
              </div>

              <div>
                <label className="font-tertiary block text-[18.68px] font-semibold text-black mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#E8E8E8] border-0 rounded-[30px] text-black text-base focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>

              <div>
                <label className="font-tertiary block text-[18.68px] font-semibold text-black mb-3">
                  Your Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#E8E8E8] border-0 rounded-[30px] text-black text-base focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>

              <div>
                <label className="font-tertiary block text-[18.68px] font-semibold text-black mb-3">
                  Personal Order Note
                </label>
                <input
                  type="text"
                  name="personalNote"
                  value={formData.personalNote}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#E8E8E8] border-0 rounded-[30px] text-black text-base focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-6 mb-20">
              <div>
                <label className="font-tertiary block text-[18.68px] font-semibold text-black mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-[#E8E8E8] border-0 rounded-[30px] text-black text-base focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
              </div>
              <div></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
              <button
                onClick={handleCancel}
                type="button"
                className="flex-1 max-w-[290px] px-8 py-3.5 bg-[#D9D9D9] text-black text-lg font-medium rounded-full hover:bg-gray-400 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 max-w-[290px] px-8 py-3.5 bg-[#FF5722] text-white text-lg font-medium rounded-full hover:bg-[#E64A19] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
