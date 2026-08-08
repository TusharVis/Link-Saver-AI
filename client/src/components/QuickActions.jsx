import {
  FaPlus,
  FaDownload,
  FaUpload,
  FaRobot,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function QuickActions({
  onAddBookmark,
  bookmarks,
  onImport,
}) {
  const navigate = useNavigate();

  // Export Bookmarks
  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify(bookmarks, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarks.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Import Bookmarks
  const handleImport = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      alert(
        "Import feature will be connected to the backend soon."
      );

      if (onImport) {
        onImport();
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Add Bookmark */}
        <button
          onClick={onAddBookmark}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <FaPlus size={24} />
          <span>Add Bookmark</span>
        </button>

        {/* Export */}
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <FaDownload size={24} />
          <span>Export</span>
        </button>

        {/* Import */}
        <>
          <input
            id="importBookmarks"
            type="file"
            accept=".json"
            hidden
            onChange={handleImport}
          />

          <button
            onClick={() =>
              document
                .getElementById("importBookmarks")
                .click()
            }
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <FaUpload size={24} />
            <span>Import</span>
          </button>
        </>

        {/* AI */}
        <button
          onClick={() => navigate("/ai")}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <FaRobot size={24} />
          <span>Ask AI</span>
        </button>

      </div>

    </div>
  );
}

export default QuickActions;