import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Paperclip } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AdminAddCake = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shapeOfCake: "",
    numberOfTiers: "",
    coveringType: "",
    tier1: {
      diameter: "",
      width: "",
      length: "",
      height: "",
      numberOfFlavours: "",
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
      submitData.append("shape", formData.shapeOfCake);
      submitData.append("numberOfTiers", formData.numberOfTiers);
      submitData.append("covering", formData.coveringType);

      submitData.append("tiers[0][tierNumber]", 1);

      let sizeString;
      if (formData.shapeOfCake === "Circle") {
        sizeString = `Ø:${
          formData.tier1.diameter || formData.tier1.length || 8
        }" H:${formData.tier1.height || 10}"`;
      } else {
        sizeString = `L:${formData.tier1.length || 8}" W:${
          formData.tier1.width || 8
        }" H:${formData.tier1.height || 10}"`;
      }
      submitData.append("tiers[0][size]", sizeString);

      submitData.append(
        "tiers[0][numberOfFlavors]",
        formData.tier1.numberOfFlavours || 1
      );

      const response = await axios.post(
        `${API_BASE_URL}/admin/cake-gallery`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Cake added successfully!");
        setTimeout(() => {
          navigate("/admin/cake-gallery");
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
              onClick={() => navigate("/admin/cake-gallery")}
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
                    <Paperclip className="w-16 h-16 mb-4" />
                    <span className="text-lg font-medium">Attach Image</span>
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
                <h2 className="text-xl font-bold mb-4">Original Dimensions</h2>

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
                    className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder=""
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
                    className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder=""
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Covering Type
                  </label>
                  <input
                    type="text"
                    value={formData.coveringType}
                    onChange={(e) =>
                      setFormData({ ...formData, coveringType: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder=""
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Tier 1</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-3">Size</label>
                  <div className="grid grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder=""
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
                            tier1: { ...formData.tier1, width: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Length
                      </label>
                      <input
                        type="text"
                        value={formData.tier1.length}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tier1: {
                              ...formData.tier1,
                              length: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Height
                      </label>
                      <input
                        type="text"
                        value={formData.tier1.height}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tier1: {
                              ...formData.tier1,
                              height: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Flavour
                  </label>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Number Of Flavours
                    </label>
                    <input
                      type="text"
                      value={formData.tier1.numberOfFlavours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tier1: {
                            ...formData.tier1,
                            numberOfFlavours: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder=""
                    />
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

export default AdminAddCake;
