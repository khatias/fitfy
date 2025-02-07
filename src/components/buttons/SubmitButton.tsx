import React from "react";

interface SubmitButtonProps {
  text: string;
  isLoading?: boolean; // Add loading state
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  isLoading = false,
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`relative w-full mt-4 py-3 px-6 font-medium text-white rounded-lg transition-all duration-300 overflow-hidden
        ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-customRed hover:bg-red-700"
        }
        focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700`}
    >
      <span className="absolute inset-0 bg-white/10 transition-opacity duration-300 group-hover:opacity-0"></span>
      {/* Subtle overlay effect */}
      <span className="relative">
        {/* Added relative span */}
        {isLoading ? (
          <div className="flex items-center justify-center">
            {" "}
            {/* Loading spinner */}
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          text
        )}
      </span>
    </button>
  );
};

export default SubmitButton;
