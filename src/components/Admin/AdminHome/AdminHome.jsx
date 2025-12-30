import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import OrdersTable from "../OrdersTable/OrdersTable";

const API_BASE_URL = "https://bx-cakes-backend.onrender.com/api";

const AdminHome = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [eventFilter, setEventFilter] = useState("All");
  const [flavorFilter, setFlavorFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const [coveringFilter, setCoveringFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [period, setPeriod] = useState("all");

  // API state
  const [stats, setStats] = useState({
    totalOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.name) setAdminName(user.name);
    fetchDashboardStats();
  }, [period]);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/admin/dashboard/stats?period=${period}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const data = response.data.data;
        setStats({
          totalOrders: data.totalOrders || 0,
          inProgressOrders:
            data.ordersByStatus?.find((o) => o.status === "processing")
              ?.count || 0,
          completedOrders:
            data.ordersByStatus?.find((o) => o.status === "completed")?.count ||
            0,
          totalRevenue: data.totalRevenue || 0,
        });
        setOrders(data.recentOrders || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load dashboard data"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              Hello, {adminName}
            </h1>
            <p className="text-base md:text-[22px] text-gray-600">
              Here are your overall stats
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5722]"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-[10.33px] text-gray-600 mb-1">
                    Total Orders
                  </p>
                  <p className="text-3xl md:text-[38.12px] font-bold">
                    {stats.totalOrders}
                  </p>
                </div>
                <div>
                  <p className="text-[10.33px] text-gray-600 mb-1">
                    In Progress Orders
                  </p>
                  <p className="text-3xl md:text-[38.12px] font-bold">
                    {stats.inProgressOrders}
                  </p>
                </div>
                <div>
                  <p className="text-[10.33px] text-gray-600 mb-1">
                    Completed Orders
                  </p>
                  <p className="text-3xl md:text-[38.12px] font-bold">
                    {stats.completedOrders}
                  </p>
                </div>
                <div>
                  <p className="text-[10.33px] text-gray-600 mb-1">
                    Total Revenue
                  </p>
                  <p className="text-3xl md:text-[38.12px] font-bold">
                    ₦{stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </>
          )}

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
