import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import StatsGrid from "../../components/StatsGrid";
import CategoryList from "../../components/CategoryList";
import BookmarkCard from "../../components/BookmarkCard";
import ActivityCard from "../../components/ActivityCard";
import RecommendationCard from "../../components/RecommendationCard";
import QuickActions from "../../components/QuickActions";
import AnalyticsChart from "../../components/AnalyticsChart";
import AddBookmarkModal from "../../components/AddBookmarkModal";
import EditBookmarkModal from "../../components/EditBookmarkModal";
import ExportButton from "../../components/ExportButton";
import ImportButton from "../../components/ImportButton";
import AIChat from "../../components/AIChat";

import {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  toggleFavorite,
} from "../../services/bookmarkService";

function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedBookmark, setSelectedBookmark] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

    const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};
  // ===============================
  // Fetch Bookmarks
  // ===============================

  const fetchBookmarks = async () => {
    try {
      setLoading(true);

      const res = await getBookmarks();

      setBookmarks(res.bookmarks || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // ===============================
  // Add Bookmark
  // ===============================

  const addBookmark = async (bookmark) => {
    try {
      await createBookmark(bookmark);

      await fetchBookmarks();

      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // Delete Bookmark
  // ===============================

  const removeBookmark = async (id) => {
    try {
      await deleteBookmark(id);

      await fetchBookmarks();
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // Favorite
  // ===============================

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);

      await fetchBookmarks();
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // Edit
  // ===============================

  const editBookmark = async (id, data) => {
    try {
      await updateBookmark(id, data);

      await fetchBookmarks();

      setEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const openEditModal = (bookmark) => {
    setSelectedBookmark(bookmark);
    setEditOpen(true);
  };

  // ===============================
  // Search Suggestions
  // ===============================

  const suggestions = bookmarks
    .filter((bookmark) =>
      bookmark.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, 5);

  // ===============================
  // Search + Category Filter
  // ===============================

  const filteredBookmarks = bookmarks.filter(
    (bookmark) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        bookmark.title
          ?.toLowerCase()
          .includes(keyword) ||
        bookmark.category
          ?.toLowerCase()
          .includes(keyword) ||
        bookmark.description
          ?.toLowerCase()
          .includes(keyword) ||
        bookmark.url
          ?.toLowerCase()
          .includes(keyword);

      const matchesCategory =
        selectedCategory === "All" ||
        bookmark.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  // ===============================
  // Loading Screen
  // ===============================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex">

          <Sidebar />

          <main className="flex-1 min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center transition-colors">

            <h1 className="text-3xl text-cyan-500 animate-pulse">
              Loading...
            </h1>

          </main>

        </div>
      </>
    );
  }
    return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 min-h-screen p-8 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">

          {/* ================= HEADER ================= */}

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome Back 👋
              </h1>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                AI Powered Bookmark Manager
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <ImportButton
                onImport={fetchBookmarks}
              />

              <ExportButton
                bookmarks={bookmarks}
              />

              <button
                onClick={() => setOpenModal(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
              >
                + Add Bookmark
              </button>

              <button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
>
  Logout
</button>

            </div>

          </div>

          {/* ================= SEARCH ================= */}

          <div className="mt-8">

            <SearchBar
              search={search}
              setSearch={setSearch}
              suggestions={suggestions}
            />

          </div>

          {/* ================= STATS ================= */}

          <div className="mt-8">

            <StatsGrid
              bookmarks={bookmarks}
            />

          </div>

          {/* ================= ANALYTICS ================= */}

          <div className="mt-10">

            <AnalyticsChart
              bookmarks={bookmarks}
            />

          </div>

          {/* ================= BOOKMARK SECTION ================= */}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">

            <CategoryList
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              bookmarks={bookmarks}
            />

            <div className="lg:col-span-3">

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Bookmarks
              </h2>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredBookmarks.length > 0 ? (

                  filteredBookmarks.map((bookmark) => (

                    <BookmarkCard
                      key={bookmark.id}
                      bookmark={bookmark}
                      search={search}
                      onDelete={removeBookmark}
                      onEdit={openEditModal}
                      onFavorite={handleFavorite}
                    />

                  ))

                ) : (

                  <div className="col-span-3 text-center py-20">

                    <div className="text-7xl">
                      📂
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                      No Bookmarks Found
                    </h2>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">

                      {search
                        ? "No bookmark matches your search."
                        : "Start by adding your first bookmark."}

                    </p>

                    <button
                      onClick={() => {
                        setSearch("");
                        setOpenModal(true);
                      }}
                      className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
                    >
                      + Add Bookmark
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>
                    {/* ================= BOTTOM SECTION ================= */}

          <div className="grid lg:grid-cols-3 gap-6 mt-10">

            <div className="lg:col-span-2">

              <ActivityCard
                bookmarks={bookmarks}
              />

            </div>

            <RecommendationCard
              bookmarks={bookmarks}
            />

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="mt-10">

            <QuickActions
  onAddBookmark={() => setOpenModal(true)}
  bookmarks={bookmarks}
  onImport={fetchBookmarks}
/>

          </div>

          {/* ================= AI CHAT ================= */}

          <div className="mt-10">

            <AIChat
              bookmarks={bookmarks}
            />

          </div>

          {/* ================= ADD MODAL ================= */}

          <AddBookmarkModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onAdd={addBookmark}
          />

          {/* ================= EDIT MODAL ================= */}

          <EditBookmarkModal
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
            bookmark={selectedBookmark}
            onUpdate={editBookmark}
          />

        </main>

      </div>

    </>
  );
}

export default Dashboard;