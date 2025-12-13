import { useState } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import OrdersTable from "../OrdersTable/OrdersTable";

const AdminHome = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [eventFilter, setEventFilter] = useState("All");
  const [flavorFilter, setFlavorFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [coveringFilter, setCoveringFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");

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
    <div className="font-main flex min-h-screen">
      <AdminSidebar onToggle={setIsSidebarCollapsed} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-0 lg:ml-20" : "ml-0 lg:ml-[280px]"
        }`}
      >
        <div className="bg-white p-4 md:p-6 shadow-sm">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">
              Hello, William
            </h1>
            <p className="text-base md:text-[22px] text-gray-600">
              Here are your overall stats
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-[10.33px] text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl md:text-[38.12px] font-bold">20</p>
            </div>
            <div>
              <p className="text-[10.33px] text-gray-600 mb-1">
                In Progress Orders
              </p>
              <p className="text-3xl md:text-[38.12px] font-bold">3</p>
            </div>
            <div>
              <p className="text-[10.33px] text-gray-600 mb-1">
                Completed Orders
              </p>
              <p className="text-3xl md:text-[38.12px] font-bold">17</p>
            </div>
            <div>
              <p className="text-[10.33px] text-gray-600 mb-1">
                Pending Orders
              </p>
              <p className="text-3xl md:text-[38.12px] font-bold">0</p>
            </div>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
            Your Pending Orders
          </h2>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
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
                Event
              </span>
            </div>

            <button className="bg-[#FF6B3D] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#FF5722] transition-colors">
              Female
            </button>

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

            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
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
                Time
              </span>
            </div>

            <div className="relative">
              <select
                value={coveringFilter}
                onChange={(e) => setCoveringFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>All</option>
                <option>Buttercream</option>
                <option>Fondant</option>
                <option>Naked</option>
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
                Covering
              </span>
            </div>

            <button className="bg-[#FF6B3D] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#FF5722] transition-colors">
              Age: 50
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
