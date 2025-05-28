import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCompany: "",
    jobLocation: "",
    jobDescription: "",
    jobSalary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://proactive-caring-production.up.railway.app/submitjob/${user.userId}`,
        formData
      );
      toast.success("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-blue-100">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          Post a Job
        </h2>

        {[
          "jobTitle",
          "jobCompany",
          "jobLocation",
          "jobSalary",
          "jobDescription",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
              {field.replace("job", "")}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition font-semibold"
        >
          Submit Job
        </button>
      </motion.form>
    </div>
  );
}
