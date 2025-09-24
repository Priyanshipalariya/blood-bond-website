import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const MessageBox = ({
  isOpen,
  onClose,
  title = "Notification",
  message = "This is a message",
  type = "success", 
  autoCloseDelay = 10000, 
  showCloseButton = true,
}) => {

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);


  if (!isOpen) return null;

  const typeStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div
        className={`relative max-w-sm w-full p-5 border rounded-lg shadow-lg ${typeStyles[type]}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}

        <h2 className="text-lg font-semibold mb-2">{title}</h2>


        <p className="text-sm">{message}</p>

        {autoCloseDelay > 0 && (
          <p className="text-xs mt-3 text-gray-600">
            This will close in {Math.ceil(autoCloseDelay / 1000)} seconds.
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBox;