import {
  FaMoon,
  FaSun,
  
} from "react-icons/fa";

import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import {
  getBookmarks,
} from "../services/bookmarkService";

function Navbar() {
  const { dark, setDark } = useTheme();
  const { user } = useAuth();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await getBookmarks();
        setBookmarks(res.bookmarks || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookmarks();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = bookmarks.filter(
      (bookmark) =>
        bookmark.title
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||

        bookmark.category
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||

        bookmark.description
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||

        bookmark.url
          ?.toLowerCase()
          .includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md px-8 py-5 flex justify-between items-center">

      {/* Logo */}

      <div>

        <h1 className="text-2xl font-bold text-cyan-500">
          🚀 Link Saver AI
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI Powered Bookmark Manager
        </p>

      </div>

      {/* Search */}

      <div className="relative w-[380px]">

        

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search bookmarks..."
          className="w-full bg-gray-100 dark:bg-slate-800 rounded-xl py-3 px-4 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-slate-700 focus:border-cyan-500 transition"
        />

        {results.length > 0 && (
          <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 max-h-80 overflow-y-auto z-50">

            {results.map((bookmark) => (

              <div
                key={bookmark._id || bookmark.id}
                onClick={() => {
                  window.open(bookmark.url, "_blank");

                  setSearch("");
                  setResults([]);
                }}
                className="p-4 border-b border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition"
              >

                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {bookmark.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {bookmark.category}
                </p>

              </div>

            ))}

          </div>
        )}

      </div>
            {/* Right Side */}

      <div className="flex items-center gap-5">

        {/* Theme Toggle */}

        <button
          onClick={() => setDark(!dark)}
          className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 p-3 rounded-xl text-gray-900 dark:text-white transition"
        >
          {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {/* User Information */}

        <div
          onClick={() => navigate("/profile")}
          className="hidden md:block text-right cursor-pointer"
        >

          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-cyan-500">
            {user?.name || "User"}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email || "No Email"}
          </p>

        </div>

        {/* User Avatar */}

        {user?.image ? (

          <img
            src={user.image}
            alt="User"
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full border-2 border-cyan-500 object-cover cursor-pointer hover:scale-110 transition"
          />

        ) : (

          <div
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full border-2 border-cyan-500 bg-gray-200 dark:bg-slate-700 flex items-center justify-center cursor-pointer hover:scale-110 transition"
          >
            <span className="text-gray-500">
              👤
            </span>
          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;