import axios from "axios";

export const generateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const apiKey = process.env.OPENROUTER_API_KEY;

    console.log("OpenRouter key exists:", Boolean(apiKey));

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "OPENROUTER_API_KEY is missing",
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Give one suitable category for this bookmark.

Title: ${title}
Description: ${description}

Return only the category name.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            "https://tusharvis.github.io/Link-Saver-AI/",
          "X-Title": "Link Saver AI",
        },
      }
    );

    const category =
      response.data.choices[0].message.content.trim();

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("========== OPENROUTER ERROR ==========");

    console.error("Status:", error.response?.status);

    console.error(
      "Data:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "AI category generation failed",
    });
  }
};