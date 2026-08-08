import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import BookmarkCard from "../../components/BookmarkCard";
import AddBookmarkModal from "../../components/AddBookmarkModal";

import {
  getBookmarks,
  createBookmark,
  deleteBookmark,
  toggleFavorite,
} from "../../services/bookmarkService";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);

     const res = await getBookmarks();

console.log("API Response:", res);
console.log("Bookmarks:", res.bookmarks);

setBookmarks(res.bookmarks || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (bookmark) => {
    try {
      await createBookmark(bookmark);

      fetchBookmarks();

      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const removeBookmark = async (id) => {
    try {
      await deleteBookmark(id);

      fetchBookmarks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);

      fetchBookmarks();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    return (
      bookmark.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      bookmark.category
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      bookmark.description
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950">
            <h1 className="text-3xl font-bold text-cyan-500 animate-pulse">
              Loading Bookmarks...
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

        <main className="flex-1 min-h-screen bg-gray-100 dark:bg-slate-950 p-8">

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Bookmarks
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage all your saved links.
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
            >
              + Add Bookmark
            </button>

          </div>

          <SearchBar
            search={search}
            setSearch={setSearch}
            suggestions={[]}
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

            {filteredBookmarks.length > 0 ? (
              filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  search={search}
                  onDelete={removeBookmark}
                  onFavorite={handleFavorite}
                />
              ))
            ) : (
              <div className="col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-lg">

                <div className="text-7xl">
                  📂
                </div>

                <h2 className="text-3xl font-bold mt-6 text-gray-900 dark:text-white">
                  No Bookmarks Found
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  Add your first bookmark to get started.
                </p>

                <button
                  onClick={() => setOpenModal(true)}
                  className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl"
                >
                  + Add Bookmark
                </button>

              </div>
            )}

          </div>

          <AddBookmarkModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onAdd={addBookmark}
          />

        </main>
      </div>
    </>
  );
}

export default Bookmarks;