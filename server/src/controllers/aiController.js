export const generateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    const apiKey = process.env.OPENROUTER_API_KEY;

    console.log("========== OPENROUTER DEBUG ==========");
    console.log("Key exists:", Boolean(apiKey));
    console.log("Key starts with sk-or:", apiKey?.startsWith("sk-or-"));
    console.log("Key length:", apiKey?.length);

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "OPENROUTER_API_KEY is missing",
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://tusharvis.github.io/Link-Saver-AI/",
          "X-Title": "Link Saver AI",
        },
        body: JSON.stringify({
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
        }),
      }
    );

    const data = await response.json();

    console.log("OpenRouter status:", response.status);

    if (!response.ok) {
      console.error("OpenRouter response:", data);

      return res.status(500).json({
        success: false,
        message: data?.error?.message || "OpenRouter request failed",
      });
    }

    const category =
      data.choices?.[0]?.message?.content?.trim();

    return res.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "AI category generation failed",
    });
  }
};