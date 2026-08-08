import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import BookmarkCard from "../../components/BookmarkCard";

import {
  getBookmarks,
  deleteBookmark,
  toggleFavorite,
} from "../../services/bookmarkService";

function Favorites() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

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

  const removeBookmark = async (id) => {
    await deleteBookmark(id);
    fetchBookmarks();
  };

  const handleFavorite = async (id) => {
    await toggleFavorite(id);
    fetchBookmarks();
  };

  // Change this if your API uses another field
  const favoriteBookmarks = bookmarks.filter(
    (bookmark) => bookmark.favorite === true
  );

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center min-h-screen">
          <h1>Loading...</h1>
        </main>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen bg-gray-100 dark:bg-slate-950 p-8">

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Favorite Bookmarks
          </h1>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

            {favoriteBookmarks.length > 0 ? (
              favoriteBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onDelete={removeBookmark}
                  onFavorite={handleFavorite}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold">
                  ⭐ No Favorite Bookmarks Yet
                </h2>

                <p className="mt-2 text-gray-500">
                  Add bookmarks to your favorites to see them here.
                </p>
              </div>
            )}

          </div>

        </main>
      </div>
    </>
  );
}

export default Favorites;