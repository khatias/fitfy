import React, { useState } from "react";
import { InputProps } from "@/types/Input";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getInputType = () => {
    if (type === "password") {
      return isPasswordVisible ? "text" : "password";
    }
    return type;
  };

  return (
    <div className="w-full relative">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={getInputType()}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className="w-full p-4 mb-4 rounded-lg border border-gray-400 dark:bg-customBlueGray dark:text-white focus:outline-none focus:ring-1 focus:ring-black"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        >
          {isPasswordVisible ? <EyeSlashIcon className="w-6 h-6"/> : <EyeIcon className="w-6 h-6"/>}
        </button>
      )}
    </div>
  );
};

export default Input;
