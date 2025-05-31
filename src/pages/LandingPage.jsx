import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex flex-col font-sans">
      <header className="bg-white shadow-md p-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide">
          JobPortal
        </h1>
        <nav className="space-x-6 text-gray-600 font-medium">
          <a href="/support" className="hover:text-blue-700 transition">
            Support
          </a>
          <a href="/login" className="hover:text-blue-700 transition">
            Login
          </a>
          <a href="/register" className="hover:text-blue-700 transition">
            Register
          </a>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-bold text-blue-900 mb-4 text-center leading-tight"
        >
          Find Your Dream Job or Hire Top Talent
        </motion.h2>

        <p className="max-w-xl text-center text-gray-700 mb-8 text-lg">
          A modern job portal with clean UI, easy to use, and packed with
          features.
        </p>

        <div className="flex gap-6">
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
            onClick={() => navigate("/jobs")}
          >
            Explore Jobs
          </motion.button>

          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="px-8 py-3 bg-white text-blue-700 border border-blue-700 rounded-full font-semibold hover:bg-blue-50 transition"
            onClick={() => navigate("/dashboard")}
          >
            Hire Talent
          </motion.button>
        </div>
      </main>

      <footer className="bg-white text-gray-500 text-center p-6">
        &copy; 2025 JobPortal. All rights reserved.
      </footer>
    </div>
  );
}
