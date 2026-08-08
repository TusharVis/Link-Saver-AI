import openrouter from "../config/openrouter.js";

export const generateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const response = await openrouter.post("/chat/completions", {
      model: "openai/gpt-oss-20b:free",
      messages: [
  {
    role: "system",
    content:
      "You classify bookmarks. Reply with only one category such as Frontend, Backend, AI, ML, DevOps, Programming, Database, or Tools."
  },
  {
    role: "user",
    content: `
Title: ${title}

Description: ${description}
`
  }
],
    });

    const category =
      response.data.choices[0].message.content.trim();

    res.json({
      success: true,
      category,
    });
  } catch (err) {
  console.error("========== OPENROUTER ERROR ==========");
  console.error("Status:", err.response?.status);
  console.error("Data:", JSON.stringify(err.response?.data, null, 2));

  return res.status(500).json({
    success: false,
    message: err.response?.data?.error?.message || err.message,
    details: err.response?.data,
  });
}
};

export const generateSummary = async (req, res) => {
  try {
    const { title, url } = req.body;

    const response = await openrouter.post("/chat/completions", {
      model: "openai/gpt-oss-20b:free",
      messages: [
  {
    role: "system",
    content:
      "Generate a concise summary in 2-3 sentences."
  },
  {
    role: "user",
    content: `
Title: ${title}

URL: ${url}
`
  }
],
    });

    const summary =
      response.data.choices[0].message.content.trim();

    res.json({
      success: true,
      summary,
    });
  } catch (err) {
  console.error("========== OPENROUTER ERROR ==========");
  console.error("Status:", err.response?.status);
  console.error("Data:", JSON.stringify(err.response?.data, null, 2));

  return res.status(500).json({
    success: false,
    message: err.response?.data?.error?.message || err.message,
    details: err.response?.data,
  });
}
};

export const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openrouter.post("/chat/completions", {
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant for a bookmark manager. Answer only using the bookmarks provided by the user. If the information is not present, clearly say you don't know based on the available bookmarks.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const answer =
      response.data.choices[0].message.content.trim();

    res.json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error("========== AI CHAT ERROR ==========");
    console.error("Status:", err.response?.status);
    console.error("Data:", JSON.stringify(err.response?.data, null, 2));

    return res.status(500).json({
      success: false,
      message: err.response?.data?.error?.message || err.message,
    });
  }
};