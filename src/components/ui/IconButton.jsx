import React from "react";

function IconButton({ children, onClick }) {
  return (
    <div
      className="cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={onClick} 
    >
      {children}
    </div>
  );
}

export default IconButton;
