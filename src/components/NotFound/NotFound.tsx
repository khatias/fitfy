import React from "react";
import { Link } from "@/i18n/routing";

const NotFound = ({
  title = "Not Found",
  message = "We're sorry, the page you're looking for doesn't exist.",
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full p-8 transition-colors duration-300">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500 dark:text-red-400 mx-auto mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300 leading-relaxed">
            {message}
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-black hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-black text-white font-medium rounded-lg transition duration-300"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
