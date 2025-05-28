import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function JobSeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "https://proactive-caring-production.up.railway.app/jobs"
        );
        setJobs(res.data);
      } catch (err) {
        toast.error("Failed to fetch jobs");
      }
    };
    fetchJobs();
  }, []);

  const handleLogout = () => {
    logout(); // Clears localStorage & context
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Available Jobs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.jobId}
              job={job}
              showApplyButton={true} // Show Apply button only here
              applicantId={user.userId} // Pass current logged-in user ID
              token={token} // Pass auth token
              onApplied={() => {
                // Optionally refresh or give feedback after apply
                alert("Application sent successfully!");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
