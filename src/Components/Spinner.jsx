
import React from "react";

const Spinner = ({ size = "w-12 h-12", color = "border-blue-600", darkColor = "dark:border-blue-400" }) => {
  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${darkColor} ${size}`}
      ></div>
    </div>
  );
};

export default Spinner;
