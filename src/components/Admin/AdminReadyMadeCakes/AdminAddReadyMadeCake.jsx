import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Paperclip, Plus, Minus } from "lucide-react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const AdminAddReadyMadeCake = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    cakeName: "",
    cakePrice: "",
    quantity: 1,
    shapeOfCake: "",
    numberOfTiers: "",
    coveringType: "",
    tier1: {
      diameter: "",
      width: "",
      height: "",
      numberOfFlavours: "",
      flavourSpecification: "",
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSubmit = () => {
    // TODO: Handle form submission - send data to backend API
    // const formDataToSubmit = { ...formData, quantity };
  };

  return (
    <div className="font-main flex min-h-screen bg-white">
      <AdminSidebar onToggle={setIsSidebarCollapsed} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0 lg:ml-20" : "ml-0 lg:ml-[280px]"
        }`}
      >
        <div className="border-b border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/ready-made-cakes")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold">Add A Cake</h1>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[#FF6B3D] text-white rounded-md hover:bg-[#FF5722] transition-colors font-medium cursor-pointer"
          >
            Confirm Cake
          </button>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl">
            <div>
              <label
                htmlFor="image-upload"
                className="block w-full h-64 md:h-96 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-250 transition-colors"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Cake preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Paperclip className="w-12 md:w-16 h-12 md:h-16 mb-4" />
                    <span className="text-base md:text-lg font-medium">
                      Attach Image
                    </span>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold mb-4">
                  Cake Information
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Cake Name
                  </label>
                  <input
                    type="text"
                    value={formData.cakeName}
                    onChange={(e) =>
                      setFormData({ ...formData, cakeName: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Cake Price
                  </label>
                  <input
                    type="text"
                    value={formData.cakePrice}
                    onChange={(e) =>
                      setFormData({ ...formData, cakePrice: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementQuantity}
                      className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-20 px-4 py-2 bg-gray-100 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="w-12 h-12 flex items-center justify-center bg-[#FF6B3D] text-white rounded-md hover:bg-[#FF5722] transition-colors cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Shape Of Cake
                  </label>
                  <input
                    type="text"
                    value={formData.shapeOfCake}
                    onChange={(e) =>
                      setFormData({ ...formData, shapeOfCake: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Number Of Tiers
                  </label>
                  <input
                    type="text"
                    value={formData.numberOfTiers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfTiers: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Covering Type
                  </label>
                  <input
                    type="text"
                    value={formData.coveringType}
                    onChange={(e) =>
                      setFormData({ ...formData, coveringType: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                  />
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-bold mb-4">
                    Tier 1
                  </h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Size
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Diameter
                        </label>
                        <input
                          type="text"
                          value={formData.tier1.diameter}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tier1: {
                                ...formData.tier1,
                                diameter: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Width
                        </label>
                        <input
                          type="text"
                          value={formData.tier1.width}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tier1: {
                                ...formData.tier1,
                                width: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddReadyMadeCake;
