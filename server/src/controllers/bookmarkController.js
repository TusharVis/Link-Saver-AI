import prisma from "../config/prisma.js";

// Create Bookmark
export const createBookmark = async (req, res) => {
  try {
    console.log("===== CREATE BOOKMARK =====");
    console.log("Body:", req.body);
    console.log("User:", req.user);

  const { title, url, description, category, image } = req.body;

const bookmark = await prisma.bookmark.create({
  data: {
    title,
    url,
    description,
    category,
    image,
    userId: req.user.id,
  },
});

    res.status(201).json({
      success: true,
      bookmark,
    });

  } catch (error) {
    console.log("===== CREATE BOOKMARK ERROR =====");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Bookmarks
export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      bookmarks,
    });
  } catch (error) {
  console.log("===== GET BOOKMARKS ERROR =====");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

// Delete Bookmark
export const deleteBookmark = async (req, res) => {
  try {
    await prisma.bookmark.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Bookmark deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Bookmark
export const updateBookmark = async (req, res) => {
  try {
    const { title, url, description, category } = req.body;

    const bookmark = await prisma.bookmark.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
        url,
        description,
        category,
      },
    });

    res.json({
      success: true,
      bookmark,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    const updatedBookmark = await prisma.bookmark.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        favorite: !bookmark.favorite,
      },
    });

    res.json({
      success: true,
      bookmark: updatedBookmark,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};