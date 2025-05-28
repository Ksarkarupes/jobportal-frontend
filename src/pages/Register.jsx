import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import UserTypeSelector from "../components/UserTypeSelector";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "employer", // default selected
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://proactive-caring-production.up.railway.app/registerUser",
        formData
      );
      if (response.data.success) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error during registration";
      toast.error(errorMsg);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 via-white to-green-100 flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-white/90 backdrop-blur-md shadow-xl rounded-3xl max-w-md w-full p-10 space-y-8"
      >
        <h2 className="text-4xl font-extrabold text-green-800 text-center">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-green-400" />
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <label
            htmlFor="fullName"
            className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-600 peer-[&:not(:placeholder-shown)]:top-2 
    peer-[&:not(:placeholder-shown)]:text-xs 
    peer-[&:not(:placeholder-shown)]:text-green-600"
          >
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-green-400" />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <label
            htmlFor="email"
            className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-600 peer-[&:not(:placeholder-shown)]:top-2 
    peer-[&:not(:placeholder-shown)]:text-xs 
    peer-[&:not(:placeholder-shown)]:text-green-600"
          >
            Email address
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-green-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=""
            className="peer w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <label
            htmlFor="password"
            className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-600 peer-[&:not(:placeholder-shown)]:top-2 
    peer-[&:not(:placeholder-shown)]:text-xs 
    peer-[&:not(:placeholder-shown)]:text-green-600"
          >
            Password
          </label>
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-green-500 hover:text-green-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-green-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder=""
            className="peer w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <label
            htmlFor="confirmPassword"
            className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-600 peer-[&:not(:placeholder-shown)]:top-2 
    peer-[&:not(:placeholder-shown)]:text-xs 
    peer-[&:not(:placeholder-shown)]:text-green-600"
          >
            Confirm Password
          </label>
          <button
            type="button"
            onClick={toggleShowConfirmPassword}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-green-500 hover:text-green-700 focus:outline-none"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* User Type Selector */}
        <UserTypeSelector
          selectedType={formData.userType}
          setSelectedType={(type) =>
            setFormData((prev) => ({ ...prev, userType: type }))
          }
          color="green"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold hover:from-green-700 hover:to-green-900 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
