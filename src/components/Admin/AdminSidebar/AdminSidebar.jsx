import { Link, useLocation } from "react-router-dom";
import { Home, Image, FileText, Upload, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import bxLogo from "../../../assets/bx-logo.png";

const AdminSidebar = ({ onToggle }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
        setIsMobileMenuOpen(false);
        if (onToggle) onToggle(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onToggle]);

  const handleToggle = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
      if (onToggle) onToggle(!isCollapsed);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { path: "/admin", icon: Home, label: "Home" },
    { path: "/admin/cake-gallery", icon: Image, label: "Cake Gallery" },
    {
      path: "/admin/ready-made-cakes",
      icon: FileText,
      label: "Ready Made Cakes",
    },
    { path: "/admin/order-history", icon: FileText, label: "Order History" },
    { path: "/admin/customs-upload", icon: Upload, label: "Customs Upload" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-black text-white rounded-lg shadow-lg cursor-pointer"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={`font-main fixed left-0 top-0 h-screen bg-black text-white flex flex-col transition-all duration-300 z-50 ${
          isCollapsed ? "w-20" : "w-[280px]"
        } ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link to="/admin" className={isCollapsed ? "mx-auto" : ""}>
            <img
              src={bxLogo}
              alt="BX Cakes Logo"
              className="h-[66px] w-[66px]"
            />
          </Link>
          {!isCollapsed && (
            <button
              onClick={isMobileMenuOpen ? closeMobileMenu : handleToggle}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isCollapsed && !isMobileMenuOpen && (
          <button
            onClick={handleToggle}
            className="p-4 text-gray-400 hover:text-white transition-colors mx-auto hidden lg:block cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 py-3 mx-5 rounded-[10px] transition-colors ${
                      active
                        ? "bg-[#36140A] text-white"
                        : "text-gray-400 hover:bg-gray-900 hover:text-white"
                    } ${isCollapsed ? "justify-center px-3" : "px-6"}`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-800">
          <button
            className={`flex items-center gap-3 w-full py-3 bg-[#770606] hover:bg-[#770606]/90 text-white rounded-lg transition-colors cursor-pointer ${
              isCollapsed ? "justify-center px-3" : "px-4"
            }`}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span className="text-sm font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
