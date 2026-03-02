import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Header = ({ title }) => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");   // important
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left Section - Navigation */}
        <div className="flex gap-4 text-sm md:text-base font-medium">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/dashboard/water" className="hover:underline">
            Water Tracker
          </Link>
          <Link to="/log" className="hover:underline">
            View Logs
          </Link>
        </div>

        {/* Center Title */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-center absolute left-1/2 transform -translate-x-1/2">
          {title}
        </h1>

        {/* Right Section - Logout */}
        <button
          onClick={handleLogOut}
          className="bg-white text-emerald-600 font-semibold px-4 py-1 rounded-full hover:bg-gray-100 text-sm md:text-base"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;