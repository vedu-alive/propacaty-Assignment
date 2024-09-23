import React from "react";

const ErrorNotification = ({ errorMessage, onClose }) => {

  return (
    <div className="fixed top-4 z-20 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
      <span>{errorMessage}</span>
      <button className="ml-4 bg-red-700 rounded px-2 py-1" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default ErrorNotification;
