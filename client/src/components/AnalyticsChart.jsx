import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function AnalyticsChart({ bookmarks }) {
  const counts = {};

  bookmarks.forEach((bookmark) => {
    counts[bookmark.category] =
      (counts[bookmark.category] || 0) + 1;
  });

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const weekData = weekDays.map((day, index) => ({
    day,
    bookmarks: bookmarks.filter(
      (bookmark) =>
        new Date(bookmark.createdAt).getDay() === index
    ).length,
  }));

  const data = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));

  const COLORS = [
    "#06b6d4",
    "#8b5cf6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#ec4899",
  ];

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          📊 Analytics
        </h2>

        <p className="text-gray-600 dark:text-gray-400">
          Add some bookmarks to see analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Category Analytics */}

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700 transition-colors duration-300">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📊 Category Analytics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Weekly Activity */}

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700 transition-colors duration-300">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📈 Weekly Activity
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weekData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="bookmarks"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsChart;