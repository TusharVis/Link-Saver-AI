import { useState } from "react";
import { generateCategory } from "../services/aiService";
import { fetchMetadata } from "../services/metaService";

function AddBookmarkModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "",
    description: "",
    image: "",
  });

  const [loadingSmart, setLoadingSmart] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSmartFill = async () => {
    try {
      if (!formData.url) {
        alert("Please enter URL first.");
        return;
      }

      setLoadingSmart(true);

      const meta = await fetchMetadata(formData.url);

      const category = await generateCategory({
        title: meta.title,
        description: meta.description,
      });

      setFormData((prev) => ({
        ...prev,
        title: meta.title,
        description: meta.description,
        category: category.category,
        image: meta.image,
      }));
    } catch (err) {
      console.log(err);
      alert("Smart Fill failed.");
    } finally {
      setLoadingSmart(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.url) {
      alert("Please fill Title and URL");
      return;
    }

    onAdd(formData);

    setFormData({
      title: "",
      url: "",
      category: "",
      description: "",
      image: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl transition-colors">

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ➕ Add Bookmark
        </h2>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
        />

        <input
          name="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
        />

        <button
          type="button"
          onClick={handleSmartFill}
          disabled={loadingSmart}
          className={`w-full py-3 rounded-xl mb-4 font-semibold transition ${
            loadingSmart
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02]"
          } text-white`}
        >
          {loadingSmart
            ? "🤖 AI is analyzing..."
            : "🚀 Smart Fill"}
        </button>

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-52 object-cover rounded-xl mb-4 border border-slate-700"
          />
        )}

        <textarea
          rows={4}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
        />

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            💾 Save Bookmark
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddBookmarkModal;