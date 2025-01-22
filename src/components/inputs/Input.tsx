import React from "react";
import { InputProps } from "@/types/Input";

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required,
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className="w-full p-4 rounded-lg border border-gray-400  dark:bg-customBlueGray dark:text-white focus:outline-none focus:ring-1 focus:ring-black"
      />
    </div>
  );
};

export default Input;
