import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginService(form);

      login(res.token, res.user);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950 transition-colors duration-300 px-4">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-8 shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-cyan-500 text-center">
          🚀 Link Saver AI
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          AI Powered Bookmark Manager
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 outline-none focus:border-cyan-500"
            required
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 outline-none focus:border-cyan-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl p-4 font-semibold text-white"
          >
            Login
          </button>

          <div className="flex justify-between text-sm">

            <span className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-cyan-500">
              Forgot Password?
            </span>

            <span
              onClick={() => navigate("/register")}
              className="cursor-pointer text-cyan-500 hover:underline"
            >
              Register
            </span>

          </div>

        </div>

      </motion.form>

    </div>
  );
}

export default Login;