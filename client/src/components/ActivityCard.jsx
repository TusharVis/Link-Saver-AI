import { FaClock } from "react-icons/fa";

function ActivityCard({ bookmarks }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700 transition-colors duration-300">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <FaClock className="text-cyan-400" />
        Recent Activity
      </h2>

      {bookmarks.length === 0 ? (
        <div className="text-center py-10">

          <div className="text-5xl mb-4">
            📂
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            No recent activity.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {bookmarks
            .slice(0, 5)
            .map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-slate-700 pb-4 last:border-none"
              >
                <div>

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {bookmark.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {bookmark.category}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <span className="bg-cyan-500/20 text-cyan-500 px-3 py-1 rounded-full text-sm font-medium">
                  New
                </span>

              </div>
            ))}

        </div>
      )}

    </div>
  );
}

export default ActivityCard;