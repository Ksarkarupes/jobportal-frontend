import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import UserTypeSelector from "../components/UserTypeSelector";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "employer",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://proactive-caring-production.up.railway.app/loginUser",
        formData
      );
      if (response.data.success) {
        login(response.data.user);
        toast.success("Login successful!");
        if (formData.userType === "jobseeker") navigate("/jobs");
        else navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error during login";
      toast.error(errorMsg);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-100 flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-3xl max-w-md w-full p-10 space-y-8"
      >
        <h2 className="text-4xl font-extrabold text-blue-800 text-center">
          Welcome Back
        </h2>

        {/* Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-400" />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=""
            className="peer w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <label
            htmlFor="email"
            className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-2 
    peer-[&:not(:placeholder-shown)]:text-xs 
    peer-[&:not(:placeholder-shown)]:text-blue-600"
          >
            Email address
          </label>
        </div>

        {/* Password Input */}
        <div className="relative">
          <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=""
            className="peer w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <label
            htmlFor="password"
            className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-2 
    peer-[&:not(:placeholder-shown)]:text-xs 
    peer-[&:not(:placeholder-shown)]:text-blue-600"
          >
            Password
          </label>
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* User Type */}
        <UserTypeSelector
          selectedType={formData.userType}
          setSelectedType={(type) =>
            setFormData((prev) => ({ ...prev, userType: type }))
          }
          color="blue"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:from-blue-700 hover:to-blue-900 transition"
        >
          Sign In
        </button>

        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
