import {
  FaLightbulb,
  FaArrowRight,
  FaExternalLinkAlt,
} from "react-icons/fa";

function RecommendationCard({ bookmarks = [] }) {
  let favoriteCategory = "General";

  if (bookmarks.length > 0) {
    const counts = {};

    bookmarks.forEach((bookmark) => {
      const category = bookmark.category || "General";
      counts[category] = (counts[category] || 0) + 1;
    });

    favoriteCategory = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  }

  const recommendations = {
    React: [
      {
        name: "React Docs",
        url: "https://react.dev",
        description: "Official React documentation.",
      },
      {
        name: "Next.js",
        url: "https://nextjs.org",
        description: "The React Framework for Production.",
      },
      {
        name: "React Router",
        url: "https://reactrouter.com",
        description: "Routing library for React.",
      },
      {
        name: "Redux Toolkit",
        url: "https://redux-toolkit.js.org",
        description: "Modern Redux development.",
      },
    ],

    Backend: [
      {
        name: "Node.js",
        url: "https://nodejs.org",
        description: "JavaScript runtime.",
      },
      {
        name: "Express.js",
        url: "https://expressjs.com",
        description: "Fast Node.js framework.",
      },
      {
        name: "Prisma ORM",
        url: "https://www.prisma.io",
        description: "Next-generation ORM.",
      },
      {
        name: "MongoDB",
        url: "https://www.mongodb.com",
        description: "NoSQL database.",
      },
    ],

    AI: [
      {
        name: "OpenAI",
        url: "https://platform.openai.com",
        description: "Build AI applications.",
      },
      {
        name: "LangChain",
        url: "https://www.langchain.com",
        description: "Framework for LLM apps.",
      },
      {
        name: "Hugging Face",
        url: "https://huggingface.co",
        description: "Open-source AI models.",
      },
      {
        name: "Ollama",
        url: "https://ollama.com",
        description: "Run LLMs locally.",
      },
    ],

    CSS: [
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com",
        description: "Utility-first CSS framework.",
      },
      {
        name: "CSS Tricks",
        url: "https://css-tricks.com",
        description: "CSS articles and tutorials.",
      },
      {
        name: "Flexbox Froggy",
        url: "https://flexboxfroggy.com",
        description: "Learn Flexbox by playing.",
      },
      {
        name: "Grid Garden",
        url: "https://cssgridgarden.com",
        description: "Learn CSS Grid interactively.",
      },
    ],

    Tools: [
      {
        name: "GitHub",
        url: "https://github.com",
        description: "Code hosting platform.",
      },
      {
        name: "Postman",
        url: "https://www.postman.com",
        description: "API testing tool.",
      },
      {
        name: "Vercel",
        url: "https://vercel.com",
        description: "Frontend deployment platform.",
      },
      {
        name: "Render",
        url: "https://render.com",
        description: "Backend deployment platform.",
      },
    ],

    General: [
      {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        description: "Web development documentation.",
      },
      {
        name: "freeCodeCamp",
        url: "https://www.freecodecamp.org",
        description: "Learn programming for free.",
      },
      {
        name: "DevDocs",
        url: "https://devdocs.io",
        description: "Fast documentation browser.",
      },
      {
        name: "W3Schools",
        url: "https://www.w3schools.com",
        description: "Programming tutorials.",
      },
    ],
  };

  const items =
    recommendations[favoriteCategory] ||
    recommendations.General;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
        <FaLightbulb className="text-yellow-400" />
        AI Recommendation
      </h2>

      <p className="text-gray-600 dark:text-gray-400">
        Based on your bookmarks, your favorite category is
      </p>

      <h3 className="text-cyan-500 text-3xl font-bold mt-2">
        {favoriteCategory}
      </h3>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Here are some resources you may like:
      </p>

      <div className="mt-6 space-y-4">

        {items.map((item) => (

          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 transition group"
          >

            <div className="flex gap-3">

              <FaArrowRight className="text-cyan-500 mt-1" />

              <div>

                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.description}
                </p>

              </div>

            </div>

            <FaExternalLinkAlt className="text-gray-400 group-hover:text-cyan-500 mt-1" />

          </a>

        ))}

      </div>

    </div>
  );
}

export default RecommendationCard;