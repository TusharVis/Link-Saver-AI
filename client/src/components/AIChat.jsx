import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import { askAI } from "../services/chatService";

function AIChat({ bookmarks }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) return;

    const text = bookmarks
      .map(
        (b) => `
Title: ${b.title}
Category: ${b.category}
Description: ${b.description}
URL: ${b.url}
`
      )
      .join("\n");

    const prompt = `
Bookmarks:
${text}

Question:
${question}
`;

    try {
      setLoading(true);

      const data = await askAI(prompt);

      setAnswer(data.answer);
    } catch (err) {
      console.log(err);
      alert("AI request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700 transition-colors duration-300">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <FaRobot className="text-cyan-400" />
        AI Assistant
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Ask questions about your saved bookmarks.
      </p>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: Which React resources have I saved?"
        rows={5}
        className="w-full mt-5 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl p-4 text-gray-900 dark:text-white outline-none resize-none"
      />

      <button
        onClick={handleAskAI}
        disabled={loading}
        className="mt-4 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2 text-white font-semibold transition disabled:opacity-50"
      >
        <FaPaperPlane />
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl p-5">

          <h3 className="text-cyan-500 font-semibold mb-3">
            AI Response
          </h3>

          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-7">
            {answer}
          </p>

        </div>
      )}

    </div>
  );
}

export default AIChat;