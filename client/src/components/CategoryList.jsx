import {
  FaLayerGroup,
  FaReact,
  FaServer,
  FaPaintBrush,
  FaTools,
} from "react-icons/fa";

const categories = [
  {
    name: "All",
    icon: <FaLayerGroup />,
  },
  {
    name: "React",
    icon: <FaReact />,
  },
  {
    name: "Backend",
    icon: <FaServer />,
  },
  {
    name: "CSS",
    icon: <FaPaintBrush />,
  },
  {
    name: "Tools",
    icon: <FaTools />,
  },
];

function CategoryList({
  selected,
  setSelected,
  bookmarks = [],
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        📂 Categories
      </h2>

      <div className="space-y-3">

        {categories.map((category) => {
          const count =
            category.name === "All"
              ? bookmarks.length
              : bookmarks.filter(
                  (b) => b.category === category.name
                ).length;

          return (
            <button
              key={category.name}
              onClick={() => setSelected(category.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                selected === category.name
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </div>

              <span
                className={`px-2 py-1 rounded-lg text-sm ${
                  selected === category.name
                    ? "bg-white/20"
                    : "bg-gray-300 dark:bg-slate-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default CategoryList;