import React from "react";

export default function UserTypeSelector({
  selectedType,
  setSelectedType,
  color = "blue",
}) {
  const colorMap = {
    blue: {
      border: "border-blue-700",
      active: "bg-blue-700 text-white",
      inactive: "bg-white text-blue-700 hover:bg-blue-100",
    },
    green: {
      border: "border-green-700",
      active: "bg-green-700 text-white",
      inactive: "bg-white text-green-700 hover:bg-green-100",
    },
  };

  const theme = colorMap[color] || colorMap["blue"];

  const options = [
    { label: "Hire", value: "employer" },
    { label: "Get Hired", value: "jobseeker" },
  ];

  return (
    <div
      className={`flex ${theme.border} rounded-full overflow-hidden w-max mb-6`}
    >
      {options.map(({ label, value }) => (
        <button
          type="button"
          key={value}
          onClick={() => setSelectedType(value)}
          className={`px-6 py-2 transition-colors duration-300 focus:outline-none ${
            selectedType === value ? theme.active : theme.inactive
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
