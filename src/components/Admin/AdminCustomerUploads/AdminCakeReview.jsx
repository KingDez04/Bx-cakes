import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const AdminCakeReview = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample customer orders data
  const customerOrders = [
    {
      id: 1,
      orderId: "12845",
      customerName: "Grita Alexis",
      location: "Ikoyi, Lagos",
      orderDate: "20th July 2025",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
      tags: ["Fondant", "Birthday Cake", "New", "Female", "Custom"],
    },
    {
      id: 2,
      orderId: "12845",
      customerName: "Grita Alexis",
      location: "Ikoyi, Lagos",
      orderDate: "20th July 2025",
      image: null,
      tags: [],
    },
    {
      id: 3,
      orderId: "12845",
      customerName: "Grita Alexis",
      location: "Ikoyi, Lagos",
      orderDate: "20th July 2025",
      image: null,
      tags: [],
    },
    {
      id: 4,
      orderId: "12845",
      customerName: "Grita Alexis",
      location: "Ikoyi, Lagos",
      orderDate: "20th July 2025",
      image: null,
      tags: [],
    },
    {
      id: 5,
      orderId: "12845",
      customerName: "Grita Alexis",
      location: "Ikoyi, Lagos",
      orderDate: "20th July 2025",
      image: null,
      tags: [],
    },
    {
      id: 6,
      orderId: "12845",
      customerName: "Grita Alexis",
      location: "Ikoyi, Lagos",
      orderDate: "20th July 2025",
      image: null,
      tags: [],
    },
    {
      id: 7,
      orderId: "12845",
      customerName: "Grita Alexis",
      location: "Ikoyi, Lagos",
      orderDate: "20th July 2025",
      image: null,
      tags: [],
    },
  ];

  const handleApprove = () => {
    // TODO: Send approval to backend API
    // await approveOrder(selectedOrder.id);
    setSelectedOrder(null);
  };

  const handleDecline = () => {
    // TODO: Send decline to backend API
    // await declineOrder(selectedOrder.id);
    setSelectedOrder(null);
  };

  return (
    <div className="font-main flex min-h-screen bg-white">
      <AdminSidebar onToggle={setIsSidebarCollapsed} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0 lg:ml-20" : "ml-0 lg:ml-[280px]"
        }`}
      >
        <div className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/admin/customer-uploads")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold">Cake Review</h1>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {customerOrders.map((order, index) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedOrder?.id === order.id
                      ? "bg-[#FFB4A3]"
                      : index === 0
                      ? "bg-[#FFB4A3]"
                      : "bg-white border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Order ID: {order.orderId}
                      </p>
                      <h3 className="font-bold text-lg">
                        {order.customerName}
                      </h3>
                      <p className="text-sm text-gray-600">{order.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Order Date: {order.orderDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-200 rounded-lg p-6 min-h-[500px]">
              {(selectedOrder || customerOrders[0]) && (
                <>
                  <div className="bg-gray-300 rounded-lg h-96 mb-4 flex items-center justify-center">
                    {selectedOrder?.image || customerOrders[0].image ? (
                      <img
                        src={selectedOrder?.image || customerOrders[0].image}
                        alt="Cake"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-500">Image Preview</span>
                    )}
                  </div>

                  {(selectedOrder?.tags || customerOrders[0].tags).length >
                    0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(selectedOrder?.tags || customerOrders[0].tags).map(
                        (tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-100 text-pink-800 rounded text-sm"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={handleDecline}
                      className="flex-1 py-3 bg-[#8B0000] text-white rounded-md hover:bg-[#700000] transition-colors font-medium cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      onClick={handleApprove}
                      className="flex-1 py-3 bg-[#FF6B3D] text-white rounded-md hover:bg-[#FF5722] transition-colors font-medium cursor-pointer"
                    >
                      Approve
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCakeReview;
