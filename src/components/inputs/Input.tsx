import React, { useState } from "react";
import { InputProps } from "@/types/Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required,
  icon: Icon,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getInputType = () => {
    return type === "password"
      ? isPasswordVisible
        ? "text"
        : "password"
      : type;
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="w-full relative">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium transition-all duration-300 ${
            isFocused ? "text-indigo-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative mt-2">
        <input
          id={name}
          type={getInputType()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full p-4 pl-12 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-0 transition-all duration-300 ${
            isFocused ? "shadow-inner" : ""
          } ${error ? "border-red-500" : ""}`} // Neumorphic and error styling
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Icon
              className={`w-5 h-5 transition-all duration-300 ${
                isFocused
                  ? "text-indigo-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
          </div>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition duration-300"
          >
            {isPasswordVisible ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}

        {error && (
          <p
            id={`${name}-error`}
            className="mt-1 text-sm text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
