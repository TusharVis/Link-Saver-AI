import {
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import Highlighter from "react-highlight-words";

function BookmarkCard({
  bookmark,
  search,
  onDelete,
  onEdit,
  onFavorite,
}) {
  let hostname = bookmark.url;

  try {
    hostname = new URL(bookmark.url).hostname;
  } catch {
    hostname = bookmark.url;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

      {/* Website Preview */}
      {bookmark.image ? (
        <img
          src={bookmark.image}
          alt={bookmark.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
          <img
            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`}
            alt="favicon"
            className="w-20 h-20"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">

        {/* Header */}
        <div className="flex justify-between items-start">

          <div className="flex-1">

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              <Highlighter
                searchWords={[search]}
                autoEscape
                highlightClassName="bg-yellow-400 text-black px-1 rounded"
                textToHighlight={bookmark.title || ""}
              />
            </h2>

            <a
              href={bookmark.url}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-500 hover:underline text-sm break-all"
            >
              {hostname}
            </a>

          </div>

          <button
            onClick={() => onFavorite(bookmark.id)}
            className="ml-3"
          >
            {bookmark.favorite ? (
              <FaStar className="text-yellow-400 text-2xl" />
            ) : (
              <FaRegStar className="text-gray-400 hover:text-yellow-400 text-2xl transition" />
            )}
          </button>

        </div>

        {/* Category */}
        <span className="inline-block mt-4 w-fit px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-500 text-sm">
          {bookmark.category}
        </span>

        {/* Description */}
        <div className="mt-4 flex-1">
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
            <Highlighter
              searchWords={[search]}
              autoEscape
              highlightClassName="bg-yellow-400 text-black px-1 rounded"
              textToHighlight={bookmark.description || ""}
            />
          </p>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-500 mt-4">
          Added on{" "}
          {bookmark.createdAt
            ? new Date(bookmark.createdAt).toLocaleDateString()
            : "N/A"}
        </p>

        {/* Buttons */}
        <div className="mt-auto pt-6 flex flex-wrap gap-3">

          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-white transition"
          >
            <FaExternalLinkAlt />
            Open
          </a>

          <button
            onClick={() => onEdit(bookmark)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(bookmark.id)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition"
          >
            <FaTrash />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookmarkCard;