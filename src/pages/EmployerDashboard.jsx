import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]); // store applicants list
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      try {
        const res = await axios.get(
          `https://proactive-caring-production.up.railway.app/employer/${user.userId}/jobs`
        );
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchEmployerJobs();
  }, []);

  const fetchApplicants = async (jobId) => {
    try {
      const res = await axios.get(
        `https://proactive-caring-production.up.railway.app/employer/applications/${jobId}?email=${user.email}`
      );
      setApplicants(res.data);
      setSelectedJob(jobId);
      setShowApplicantsModal(true);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      alert("Failed to fetch applicants. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddJob = () => {
    navigate("/addjob");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Job Listings</h2>
          <div className="space-x-2"></div>
        </div>

        {jobs.length === 0 ? (
          <p className="text-gray-600">You haven't posted any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard
                key={job.jobId}
                job={job}
                showApplyButton={false}
                showViewApplicantsButton={true}
                onViewApplicants={fetchApplicants}
              />
            ))}
          </div>
        )}
      </div>
      {showApplicantsModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] p-6 overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setShowApplicantsModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
              👥 Applicants for Job ID:{" "}
              <span className="text-indigo-600">{selectedJob}</span>
            </h2>

            {applicants.length === 0 ? (
              <p className="text-gray-600 text-center">
                No applicants have applied yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {applicants.map((applicant) => (
                  <li
                    key={applicant.userId}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:bg-white transition"
                  >
                    {/* Avatar based on initials */}
                    <div className="bg-indigo-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                      {applicant.name?.charAt(0).toUpperCase() || "A"}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {applicant.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        📧 {applicant.email}
                      </p>
                    </div>

                    {/* Optional action buttons */}
                    <div>
                      <button
                        className="text-sm text-indigo-600 hover:underline"
                        onClick={() => alert("Resume viewer coming soon...")}
                      >
                        View Resume
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
