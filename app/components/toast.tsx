import React, { useEffect, useState } from "react";

const Toast = ({
  message,
  clearMessage,
}: {
  message: string;
  clearMessage: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message); 

  useEffect(() => {
    if (message) {
      setCurrentMessage(message); 
      setVisible(true); 

      const timer = setTimeout(() => {
        setVisible(false); 
        clearMessage(); 
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [message, clearMessage]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white text-red-500 px-6 py-3 rounded-md shadow-lg z-50"
      style={{ transition: "opacity 0.5s ease-out" }}
    >
      <strong>{currentMessage}</strong> 
      <button
        onClick={() => {
          setVisible(false);
          clearMessage(); 
        }}
        className="ml-4 text-gray-700 font-bold"
      >
        X
      </button>
    </div>
  );
};

export default Toast;
