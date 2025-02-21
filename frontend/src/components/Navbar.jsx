import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    search,
    setSearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);
  const location = useLocation();

  const toggleSearchBar = () => {
    if (location.pathname === "/collection") {
      setSearch(!search);
    }
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.name}
            className="flex flex-col items-center gap-1 text-gray-700"
          >
            <li>{link.name}</li>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Profile, Cart, and Mobile Hamburger Menu on Right */}
      <div className="flex items-center gap-5 ">
        <img
          src={assets.search_icon}
          alt="seacrh-icon"
          className="w-5 cursor-pointer"
          onClick={toggleSearchBar}
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile-icon"
            className="w-5 cursor-pointer"
            onClick={() => (token ? null : navigate("/login"))}
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500">
                <p className="cursor-pointer hover:text-black ">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black "
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black "
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5 " />
          <p className="text-[8px] absolute bottom-[-5px] right-[-5px] text-center text-white aspect-square bg-black w-4 rounded-full leading-4 ">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Hamburger Icon */}
        <button onClick={toggleMobileMenu} className="sm:hidden">
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <ul className="sm:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              to={link.path}
              key={link.name}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu when link is clicked
              className="block py-2 px-5 text-gray-700 hover:bg-gray-200"
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
