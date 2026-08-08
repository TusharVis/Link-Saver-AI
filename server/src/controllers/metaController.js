import axios from "axios";
import * as cheerio from "cheerio";

export const fetchMetadata = async (req, res) => {
  try {
    const { url } = req.body;

    const { data } = await axios.get(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  },
  timeout: 10000,
});

    const $ = cheerio.load(data);

    const title =
      $("meta[property='og:title']").attr("content") ||
      $("title").text();

    const description =
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='description']").attr("content") ||
      "";

    let image =
  $("meta[property='og:image']").attr("content") ||
  $("meta[name='twitter:image']").attr("content") ||
  $("link[rel='image_src']").attr("href") ||
  "";

// Convert relative image URL to absolute
if (image && !image.startsWith("http")) {
  image = new URL(image, url).href;
}

console.log("===== METADATA =====");
console.log({
  title,
  description,
  image,
});
    res.json({
      success: true,
      title,
      description,
      image,
    });

  } catch (error) {
  console.error("========== META ERROR ==========");
  console.error("Status:", error.response?.status);
  console.error("Message:", error.message);

  if (error.response?.data) {
    console.error("Response:", error.response.data);
  }

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};