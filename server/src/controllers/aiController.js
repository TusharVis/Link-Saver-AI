import openrouter from "../config/openrouter.js";

export const generateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const response = await openrouter.post("/chat/completions", {
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
    });

    const category =
      response.data.choices[0].message.content.trim();

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error(
      "OPENROUTER ERROR:",
      error.response?.status,
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "AI category generation failed",
    });
  }
};