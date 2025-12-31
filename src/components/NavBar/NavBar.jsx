import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import bxLogo from "../../assets/bx-logo.png";
import dp from "../../assets/defaultDp.webp";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "undefined") {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Custom Order", path: "/customize-cake" },
    { name: "Modify A Cake", path: "/modify-cake" },
    { name: "Shop Our Ready Made Cakes", path: "/readymade-cake" },
  ];

  const adminLink =
    user?.role === "admin" ? { name: "Admin Dashboard", path: "/admin" } : null;

  return (
    <nav className="font-main bg-black sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-[104px]">
          <Link to="/" onClick={handleLinkClick} className="flex items-center">
            <img
              src={bxLogo}
              alt="BX Cakes Logo"
              className="h-[66px] w-[66px]"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className="text-white hover:text-[#FD5A2F] transition-colors text-[18px] font-normal whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            {adminLink && (
              <Link
                to={adminLink.path}
                onClick={handleLinkClick}
                className="text-white hover:text-[#FD5A2F] transition-colors text-[18px] font-normal whitespace-nowrap"
              >
                {adminLink.name}
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleProfileClick}
              className="w-10 md:w-[73px] h-10 md:h-[73px] rounded-full overflow-hidden border-2 border-transparent hover:border-[#FD5A2F] transition-colors cursor-pointer"
              title={user ? `${user.name}'s Profile` : "Login"}
            >
              <img
                src={user?.profilePicture || dp}
                alt={user ? user.name : "Profile"}
                className="w-full h-full object-cover"
              />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className="text-white hover:text-[#FD5A2F] hover:bg-gray-900 px-4 py-3 rounded-lg transition-colors text-base"
                >
                  {link.name}
                </Link>
              ))}
              {adminLink && (
                <Link
                  to={adminLink.path}
                  onClick={handleLinkClick}
                  className="text-white hover:text-[#FD5A2F] hover:bg-gray-900 px-4 py-3 rounded-lg transition-colors text-base"
                >
                  {adminLink.name}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
