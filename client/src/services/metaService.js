import api from "./api";

export const fetchMetadata = async (url) => {
  const res = await api.post("/meta", {
    url,
  });

  return res.data;
};
const handleAutoFill = async () => {
  try {
    console.log("URL:", formData.url);

    const res = await fetchMetadata(formData.url);

    console.log("Metadata:", res);

    setFormData((prev) => ({
      ...prev,
      title: res.title,
      description: res.description,
    }));
  } catch (error) {
    console.log(error.response?.data);
    console.log(error);
  }
};