import { assets } from "../assets/assets";
import { Menu } from "lucide-react"; // Import icon for mobile menu

const Navbar = ({ toggleSidebar, setToken }) => {
  return (
    <div className="w-full bg-white shadow-md py-3 px-4 sm:px-8 flex justify-between items-center rounded-md">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      <img className="w-28 sm:w-36" src={assets.logo} alt="Logo" />

      <button
        onClick={() => setToken("")}
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
