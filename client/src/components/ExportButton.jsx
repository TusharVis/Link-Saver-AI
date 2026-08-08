import { FaFileExport } from "react-icons/fa";

function ExportButton({ bookmarks }) {
  const exportBookmarks = () => {
    const json = JSON.stringify(bookmarks, null, 2);

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "bookmarks.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportBookmarks}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
    >
      <FaFileExport />
      Export Bookmarks
    </button>
  );
}

export default ExportButton;