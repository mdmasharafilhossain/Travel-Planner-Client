import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative flex items-center justify-center">
        
        {/* Rotating Ring */}
        <div className="w-28 h-28 rounded-full border-4 border-gray-300 border-t-orange-500 animate-spin"></div>

        {/* TP Text */}
        <span className="absolute text-3xl font-bold text-orange-500">
          TP
        </span>
      </div>
    </div>
  );
};

export default Loader;
