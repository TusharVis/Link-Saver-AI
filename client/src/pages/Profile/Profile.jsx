import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen bg-gray-100 dark:bg-slate-950 p-8">

          {/* Page Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Manage your personal information.
            </p>
          </div>

          {/* Profile Card */}
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-8">

              {user?.image ? (
  <img
    src={user.image}
    alt="Profile"
    className="w-40 h-40 rounded-full border-4 border-cyan-500 object-cover"
  />
) : (
  <div className="w-40 h-40 rounded-full border-4 border-cyan-500 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
    <span className="text-6xl text-gray-400">👤</span>
  </div>
)}

              <div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.name || "User"}
                </h2>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {user?.email || "No Email"}
                </p>

                <span className="inline-block mt-4 bg-cyan-500 text-white px-4 py-2 rounded-full">
                  Student
                </span>

              </div>

            </div>

            {/* Information */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">

              {/* Personal Information */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h3>

                <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">

                  <p>
                    <strong>Name:</strong> {user?.name || "User"}
                  </p>

                  <p>
                    <strong>Email:</strong> {user?.email || "No Email"}
                  </p>

                  <p>
                    <strong>Role:</strong> Student
                  </p>

                  <p>
                    <strong>Member Since:</strong> August 2026
                  </p>

                </div>

              </div>

              {/* Statistics */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-cyan-500 rounded-xl p-5 text-center text-white">
                    <h2 className="text-3xl font-bold">25</h2>
                    <p>Bookmarks</p>
                  </div>

                  <div className="bg-yellow-500 rounded-xl p-5 text-center text-white">
                    <h2 className="text-3xl font-bold">8</h2>
                    <p>Favorites</p>
                  </div>

                  <div className="bg-purple-500 rounded-xl p-5 text-center text-white">
                    <h2 className="text-3xl font-bold">6</h2>
                    <p>Categories</p>
                  </div>

                  <div className="bg-green-500 rounded-xl p-5 text-center text-white">
                    <h2 className="text-3xl font-bold">45</h2>
                    <p>AI Searches</p>
                  </div>

                </div>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              <button
                onClick={() => navigate("/profile/edit")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/change-password")}
                className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-xl transition"
              >
                Change Password
              </button>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default Profile;