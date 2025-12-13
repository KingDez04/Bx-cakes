import { useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import OrdersTable from "../OrdersTable/OrdersTable";

const AdminOrderHistory = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // Sample orders data
  const orders = [
    {
      orderId: "No ID",
      orderDate: "14th-Oct-2025",
      deliveryDate: "14th-Oct-2025",
      status: "Pending Confirmation",
      details: "Circle two Tiered cake...",
      categories: "Female Birthday",
      customerId: "2234442736",
      customerName: "Kevin Oyenuga",
      customerContact: "09088736767",
      customerEmail: "Kevino@gmail.com",
    },
    {
      orderId: "No ID",
      orderDate: "14th-Oct-2025",
      deliveryDate: "14th-Oct-2025",
      status: "Pending Confirmation",
      details: "Circle two Tiered cake...",
      categories: "Female Birthday",
      customerId: "2234442736",
      customerName: "April May",
      customerContact: "09088736767",
      customerEmail: "Kevino@gmail.com",
    },
    {
      orderId: "No ID",
      orderDate: "14th-Oct-2025",
      deliveryDate: "14th-Oct-2025",
      status: "Pending Confirmation",
      details: "Circle two Tiered cake...",
      categories: "Female Birthday",
      customerId: "2234442736",
      customerName: "April May",
      customerContact: "09088736767",
      customerEmail: "Kevino@gmail.com",
    },
    {
      orderId: "12345",
      orderDate: "14th-Oct-2025",
      deliveryDate: "14th-Oct-2025",
      status: "Cancelled",
      details: "Circle two Tiered cake...",
      categories: "Female Birthday",
      customerId: "2234442736",
      customerName: "April May",
      customerContact: "09088736767",
      customerEmail: "Kevino@gmail.com",
    },
    {
      orderId: "12344",
      orderDate: "14th-Oct-2025",
      deliveryDate: "14th-Oct-2025",
      status: "Completed",
      details: "Circle two Tiered cake...",
      categories: "Female Birthday",
      customerId: "2234442736",
      customerName: "April May",
      customerContact: "09088736767",
      customerEmail: "Kevino@gmail.com",
    },
    {
      orderId: "12343",
      orderDate: "14th-Oct-2025",
      deliveryDate: "14th-Oct-2025",
      status: "In Progress",
      details: "Circle two Tiered cake...",
      categories: "Female Birthday",
      customerId: "2234442736",
      customerName: "April May",
      customerContact: "09088736767",
      customerEmail: "Kevino@gmail.com",
    },
  ];

  return (
    <div className="font-main flex min-h-screen bg-white">
      <AdminSidebar onToggle={setIsSidebarCollapsed} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0 lg:ml-20" : "ml-0 lg:ml-[280px]"
        }`}
      >
        <div className="border-b border-gray-200 p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Cake Order History
          </h1>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Birthday</option>
                <option>Wedding</option>
                <option>Anniversary</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
                Category
              </span>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Pending Confirmation</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
                Status
              </span>
            </div>

            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Under ₦50,000</option>
                <option>₦50,000 - ₦100,000</option>
                <option>Over ₦100,000</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
                Price Range
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderHistory;
