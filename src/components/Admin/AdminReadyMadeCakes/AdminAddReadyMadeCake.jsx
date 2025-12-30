import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Paperclip, Plus, Minus } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AdminAddReadyMadeCake = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    setFormData({ ...formData, quantity: quantity + 1 });
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setFormData({ ...formData, quantity: quantity - 1 });
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload a cake image");
      return;
    }

    if (
      !formData.cakeName ||
      !formData.cakePrice ||
      !formData.shapeOfCake ||
      !formData.numberOfTiers ||
      !formData.coveringType
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("images", imageFile);
      submitData.append("name", formData.cakeName);
      submitData.append("priceNGN", formData.cakePrice);
      submitData.append("stockQuantity", quantity);
      submitData.append("shape", formData.shapeOfCake);
      submitData.append("numberOfTiers", formData.numberOfTiers);
      submitData.append("covering", formData.coveringType);

      submitData.append("tiers[0][tierNumber]", 1);
      submitData.append(
        "tiers[0][size]",
        formData.tier1.diameter || formData.tier1.width
      );
      submitData.append(
        "tiers[0][numberOfFlavors]",
        formData.tier1.numberOfFlavours || 1
      );

      if (formData.tier1.flavourSpecification) {
        const flavors = formData.tier1.flavourSpecification
          .split(",")
          .map((f) => f.trim());
        flavors.forEach((flavor, index) => {
          submitData.append(`tiers[0][flavors][${index}][name]`, flavor);
          submitData.append(
            `tiers[0][flavors][${index}][percentage]`,
            100 / flavors.length
          );
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/admin/ready-made-cakes`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Ready-made cake added successfully!");
        setTimeout(() => {
          navigate("/admin/ready-made-cakes");
        }, 1500);
      }
    } catch (error) {
      console.error("Add cake error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(error.response?.data?.message || "Failed to add cake");
      }
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[#FF6B3D] text-white rounded-md hover:bg-[#FF5722] transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding Cake..." : "Confirm Cake"}
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
