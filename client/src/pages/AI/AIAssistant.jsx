import { useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { FaRobot, FaPaperPlane } from "react-icons/fa";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleAskAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    // Temporary response
    setTimeout(() => {
      setResponse(
        `You asked: "${question}"

This is a demo AI response.

Later, this will connect to your backend and OpenAI API to:
• Search bookmarks
• Summarize articles
• Suggest categories
• Recommend related links`
      );

      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen bg-gray-100 dark:bg-slate-950 p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-cyan-500 text-white p-4 rounded-full">
              <FaRobot size={28} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                AI Assistant
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Ask anything about your bookmarks.
              </p>
            </div>

          </div>

          {/* Chat Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">

            <textarea
              rows="4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: Find my React bookmarks..."
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none resize-none"
            />

            <button
              onClick={handleAskAI}
              disabled={loading}
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition disabled:opacity-50"
            >
              <FaPaperPlane />
              {loading ? "Thinking..." : "Ask AI"}
            </button>

          </div>

          {/* Response */}
          {response && (
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                AI Response
              </h2>

              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {response}
              </pre>

            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default AIAssistant;