import api from "./api";

export const getBookmarks = async () => {
  const res = await api.get("/bookmarks");
  return res.data;
};

export const createBookmark = async (data) => {
  const res = await api.post("/bookmarks", data);
  return res.data;
};

export const deleteBookmark = async (id) => {
  const res = await api.delete(`/bookmarks/${id}`);
  return res.data;
};

export const updateBookmark = async (id, data) => {
  const res = await api.put(`/bookmarks/${id}`, data);
  return res.data;
};

export const toggleFavorite = async (id) => {
  const res = await api.patch(`/bookmarks/${id}/favorite`);
  return res.data;
};