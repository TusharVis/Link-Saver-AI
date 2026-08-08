import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../services/authService";

function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");

  // Upload Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Save Profile
 const handleSave = async () => {
  try {
    const res = await updateProfile({
      name,
      email,
      image,
    });

    if (res.success) {
      updateUser(res.user);

      alert("Profile updated successfully!");

      navigate("/profile");
    }
  } catch (error) {
    console.error("Profile update error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to update profile"
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen bg-gray-100 dark:bg-slate-950 p-8">

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Edit Profile
          </h1>

          <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">

            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">

  {image ? (
    <img
      src={image}
      alt="Profile"
      className="w-36 h-36 rounded-full border-4 border-cyan-500 object-cover"
    />
  ) : (
    <div className="w-36 h-36 rounded-full border-4 border-cyan-500 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
      <span className="text-5xl text-gray-400">👤</span>
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="text-sm text-gray-700 dark:text-gray-300"
  />

</div>

            {/* Full Name */}
            <div className="mb-6">

              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            {/* Email */}
            <div className="mb-8">

              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            {/* Buttons */}
            <div className="flex gap-4">

              <button
                onClick={handleSave}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
              >
                Save Changes
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </main>
      </div>
    </>
  );
}

export default EditProfile;