import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/ThemeContext";

function Settings() {
  const { dark, setDark } = useTheme();

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 bg-gray-100 dark:bg-slate-950 min-h-screen">

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>

          <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </h3>

                <p className="text-gray-500 dark:text-gray-400">
                  Enable or disable dark mode.
                </p>
              </div>

              <button
                onClick={() => setDark(!dark)}
                className={`px-6 py-2 rounded-xl text-white transition ${
                  dark
                    ? "bg-cyan-500"
                    : "bg-gray-500"
                }`}
              >
                {dark ? "ON" : "OFF"}
              </button>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}

export default Settings;