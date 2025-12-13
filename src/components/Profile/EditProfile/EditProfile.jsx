import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";
import dp from "../../../assets/staticDp.png";

const ProfilePage = () => {
  const navigate = useNavigate();

  // user data from context/API
  const [formData, setFormData] = useState({
    name: "Amanda Efiko",
    email: "amandaefik@gmail.com",
    profileImage: dp,
    address: "17 istriajafimuana, ajejifjfi close, Ogun State",
    personalNote: "None",
    phoneNumber: "03048449240383",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // save to backend/context
    toast.success("Profile updated successfully!");
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleImageEdit = () => {
    toast.info("Image upload functionality");
  };

  const handleNameEdit = () => {
    toast.info("Edit name functionality");
  };

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
                className="flex-1 max-w-[290px] px-8 py-3.5 bg-[#FF5722] text-white text-lg font-medium rounded-full hover:bg-[#E64A19] transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
