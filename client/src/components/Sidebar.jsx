import {
  FaChartPie,
  FaBookmark,
  FaRobot,
  FaStar,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-cyan-500 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="w-72 min-h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col justify-between p-6">

      {/* Top Section */}
      <div>

        {/* User Info */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-4 mb-8 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 p-3 rounded-xl transition"
        >

          {user?.image ? (
  <img
    src={user.image}
    alt="User"
    className="w-14 h-14 rounded-full border-2 border-cyan-500 object-cover"
  />
) : (
  <div className="w-14 h-14 rounded-full border-2 border-cyan-500 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
    <span className="text-xl text-gray-500">👤</span>
  </div>
)}

          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">
              {user?.name || "User"}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email || "No Email"}
            </p>
          </div>

        </div>

        {/* Navigation */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Navigation
        </h2>

        <nav className="space-y-3">

          <NavLink to="/dashboard" className={menuClass}>
            <FaChartPie />
            Dashboard
          </NavLink>

          <NavLink to="/bookmarks" className={menuClass}>
            <FaBookmark />
            Bookmarks
          </NavLink>

          <NavLink to="/ai" className={menuClass}>
            <FaRobot />
            AI Assistant
          </NavLink>

          <NavLink to="/favorites" className={menuClass}>
            <FaStar />
            Favorites
          </NavLink>

          <NavLink to="/profile" className={menuClass}>
            <FaUser />
            Profile
          </NavLink>

          <NavLink to="/settings" className={menuClass}>
            <FaCog />
            Settings
          </NavLink>

        </nav>

        {/* Pro Tip */}
        <div className="mt-10 p-4 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">

          <h3 className="font-semibold text-gray-900 dark:text-white">
            💡 Pro Tip
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Use AI Assistant to organize and search your bookmarks smarter.
          </p>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-slate-700 pt-5">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;