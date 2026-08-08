

function SearchBar({
  search,
  setSearch,
  suggestions = [],
}) {
  return (
    <div className="relative w-full">

      <input
        type="text"
        placeholder="🔍 Search title, category, description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-14 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
      />

      {search && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">

          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => setSearch(item.title)}
              className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition border-b border-gray-200 dark:border-slate-800 last:border-none"
            >
              <p className="font-semibold text-gray-900 dark:text-white">
                {item.title}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.category}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SearchBar;