import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register as registerService } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
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
      await registerService(form);

      toast.success("Registration Successful 🎉");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration Failed"
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
          🚀 Create Account
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Join Link Saver AI
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 outline-none focus:border-cyan-500"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 outline-none focus:border-cyan-500"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl p-4 font-semibold text-white"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">

            Already have an account?

            <span
              onClick={() => navigate("/login")}
              className="ml-2 cursor-pointer text-cyan-500 hover:underline"
            >
              Login
            </span>

          </div>

        </div>

      </motion.form>

    </div>
  );
}

export default Register;