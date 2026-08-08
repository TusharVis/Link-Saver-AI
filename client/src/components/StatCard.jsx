import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl transition-colors duration-300"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {title}
          </p>

          <h1 className={`text-4xl font-bold mt-3 ${color}`}>
            {value}
          </h1>
        </div>

        <div
          className={`${color} text-4xl bg-gray-100 dark:bg-slate-800 p-4 rounded-xl`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;