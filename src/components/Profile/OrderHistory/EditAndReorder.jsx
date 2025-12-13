import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EditAndReorder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    shape: "Circle",
    numberOfTiers: "3 Tiers",
    coveringType: "Covering type",
    tier1Size: "Size",
    tier1Flavor: "Chocolate, Vanilla",
    tier2Size: "Size",
    tier2Flavor: "Chocolate",
    tier3Size: "Size",
    tier3Flavor: "Chocolate",
    customerNote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  });

  const cakeImage =
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500";

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProceedToOrder = () => {
    navigate("/order-confirmation");
  };

  return (
    <div className="font-main min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-secondary text-2xl font-bold">Edit and Reorder</h1>
          </div>
          <button
            onClick={handleProceedToOrder}
            className="bg-[#FF6B3D] hover:bg-[#FF5722] text-white px-8 py-2 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Proceed to Order
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {" "}
          <div className="flex items-start">
            <img
              src={cakeImage}
              alt="Cake"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-secondary text-xl font-bold mb-6">Cake Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Shape</label>
                <input
                  type="text"
                  value={formData.shape}
                  onChange={(e) => handleInputChange("shape", e.target.value)}
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200"
                  placeholder="Circle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Number of Tiers
                </label>
                <input
                  type="text"
                  value={formData.numberOfTiers}
                  onChange={(e) =>
                    handleInputChange("numberOfTiers", e.target.value)
                  }
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200"
                  placeholder="3 Tiers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Covering Type
                </label>
                <input
                  type="text"
                  value={formData.coveringType}
                  onChange={(e) =>
                    handleInputChange("coveringType", e.target.value)
                  }
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200"
                  placeholder="Covering type"
                />
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Tier 1</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1">Size</label>
                    <input
                      type="text"
                      value={formData.tier1Size}
                      onChange={(e) =>
                        handleInputChange("tier1Size", e.target.value)
                      }
                      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200 text-sm"
                      placeholder="Size"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Flavor</label>
                    <input
                      type="text"
                      value={formData.tier1Flavor}
                      onChange={(e) =>
                        handleInputChange("tier1Flavor", e.target.value)
                      }
                      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200 text-sm"
                      placeholder="Chocolate, Vanilla"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Tier 2</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1">Size</label>
                    <input
                      type="text"
                      value={formData.tier2Size}
                      onChange={(e) =>
                        handleInputChange("tier2Size", e.target.value)
                      }
                      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200 text-sm"
                      placeholder="Size"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Flavor</label>
                    <input
                      type="text"
                      value={formData.tier2Flavor}
                      onChange={(e) =>
                        handleInputChange("tier2Flavor", e.target.value)
                      }
                      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200 text-sm"
                      placeholder="Chocolate"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold mb-3">Tier 3</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1">Size</label>
                    <input
                      type="text"
                      value={formData.tier3Size}
                      onChange={(e) =>
                        handleInputChange("tier3Size", e.target.value)
                      }
                      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200 text-sm"
                      placeholder="Size"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Flavor</label>
                    <input
                      type="text"
                      value={formData.tier3Flavor}
                      onChange={(e) =>
                        handleInputChange("tier3Flavor", e.target.value)
                      }
                      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none placeholder-gray-200 text-sm"
                      placeholder="Chocolate"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium mb-1">
                  Customer Note
                </label>
                <textarea
                  value={formData.customerNote}
                  onChange={(e) =>
                    handleInputChange("customerNote", e.target.value)
                  }
                  className="w-full h-24 bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none resize-none placeholder-gray-200 text-sm"
                  placeholder="Lorem Ipsum is simply dummy text..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAndReorder;
