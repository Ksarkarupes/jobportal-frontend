import React, { useState } from "react";
import { FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { toast } from "react-toastify";

export default function JobCard({
  job,
  showApplyButton,
  applicantId,
  token,
  onApplied,
  showViewApplicantsButton,
  onViewApplicants,
}) {
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    try {
      const response = await fetch(
        `https://proactive-caring-production.up.railway.app/apply/${job.jobId}/${applicantId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: job.jobId,
            applicantId: applicantId,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to apply");
      }
      toast.success("Successfully applied to this job! Best of luck!");
      setApplied(true);
      if (onApplied) onApplied(); // optional callback for parent
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-2 hover:shadow-lg transition-all duration-200">
      <h2 className="text-xl font-bold text-blue-800">{job.jobTitle}</h2>

      <p className="text-sm text-gray-700">{job.jobDescription}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <FaBuilding className="text-blue-500" />
          {job.jobCompany}
        </span>
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-blue-500" />
          {job.jobLocation}
        </span>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        💸 Salary: ₹{job.jobSalary}
      </div>
      {showViewApplicantsButton && (
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-4 rounded-xl mt-3"
          onClick={() => onViewApplicants(job.jobId)}
        >
          View Applicants
        </button>
      )}

      {/* ✅ Conditionally render Apply button */}
      {showApplyButton && (
        <div className="mt-4">
          {applied ? (
            <button
              className="bg-green-500 text-white py-1 px-4 rounded-xl cursor-default"
              disabled
            >
              ✅ Applied
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-xl"
              onClick={handleApply}
            >
              Apply
            </button>
          )}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
}
