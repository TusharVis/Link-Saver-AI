import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function EditBookmarkModal({
  isOpen,
  onClose,
  bookmark,
  onUpdate,
}) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (bookmark) {
      setForm({
        title: bookmark.title || "",
        url: bookmark.url || "",
        description: bookmark.description || "",
        category: bookmark.category || "",
      });
    }
  }, [bookmark]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(bookmark.id, form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <motion.form
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl p-8 transition-colors duration-300"
      >

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ✏️ Edit Bookmark
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-4 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-slate-700"
        />

        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="URL"
          className="w-full mb-4 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-slate-700"
        />

        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-4 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none resize-none border border-gray-300 dark:border-slate-700"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full mb-6 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none border border-gray-300 dark:border-slate-700"
        />

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            💾 Save Changes
          </button>

        </div>

      </motion.form>

    </div>
  );
}

export default EditBookmarkModal;