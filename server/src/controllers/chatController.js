import axios from "axios";

export const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      response.data.choices[0].message.content;

    res.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI Chat Failed",
    });
  }
};