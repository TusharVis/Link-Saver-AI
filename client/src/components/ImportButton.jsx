import { FaFileImport } from "react-icons/fa";
import { createBookmark } from "../services/bookmarkService";

function ImportButton({ onImport }) {
  const importBookmarks = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const text = await file.text();

      const bookmarks = JSON.parse(text);

      for (const bookmark of bookmarks) {
        await createBookmark({
          title: bookmark.title,
          url: bookmark.url,
          description: bookmark.description,
          category: bookmark.category,
          image: bookmark.image,
        });
      }

      alert("✅ Bookmarks imported successfully!");

      if (onImport) {
        onImport();
      }
    } catch (err) {
      console.log(err);
      alert("❌ Invalid JSON file");
    }

    // Reset input so the same file can be selected again
    e.target.value = "";
  };

  return (
    <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105">

      <FaFileImport />

      <span>Import</span>

      <input
        type="file"
        accept=".json"
        onChange={importBookmarks}
        className="hidden"
      />

    </label>
  );
}

export default ImportButton;