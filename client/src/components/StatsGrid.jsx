import {
  FaBookmark,
  FaStar,
  FaFolder,
  FaGlobe,
} from "react-icons/fa";

function StatsGrid({ bookmarks }) {
  const total = bookmarks.length;

  const favorites = bookmarks.filter(
    (b) => b.favorite
  ).length;

  const categories = new Set(
    bookmarks.map((b) => b.category)
  ).size;

  const websites = new Set(
    bookmarks.map((b) => {
      try {
        return new URL(b.url).hostname;
      } catch {
        return b.url;
      }
    })
  ).size;

  const stats = [
    {
      title: "Total Bookmarks",
      value: total,
      icon: <FaBookmark />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Favorites",
      value: favorites,
      icon: <FaStar />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Categories",
      value: categories,
      icon: <FaFolder />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Websites",
      value: websites,
      icon: <FaGlobe />,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300`}
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-white/80 text-sm">
                {stat.title}
              </p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {stat.value}
              </h2>

            </div>

            <div className="text-5xl text-white/80">
              {stat.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default StatsGrid;