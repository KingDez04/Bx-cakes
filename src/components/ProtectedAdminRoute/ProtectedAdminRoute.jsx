import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const userStr = localStorage.getItem("user");

  if (!token) {
    toast.error("Please login to access admin panel");
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    if (userStr && userStr !== "undefined") {
      user = JSON.parse(userStr);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    toast.error("Session invalid. Please login again");
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "admin") {
    toast.error("Access denied. Admin privileges required.");
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedAdminRoute;
