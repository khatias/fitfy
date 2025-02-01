import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons for arrows

interface FilterComponentProps {
  label: string;
  options: { id: string | number; name: string }[];
  selectedValues: string[];
  onSelectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="mb-6 border-b border-gray-200 dark:border-gray-600 pb-4 dark:text-gray-200"
      ref={dropdownRef}
    >
      <label
        className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-3 cursor-pointer flex justify-between items-center uppercase -tracking-tighter"
        onClick={toggleDropdown}
      >
        {label}
        <span
          className={`transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? (
            <FaChevronUp className="inline-block ml-2 text-gray-500 dark:text-gray-300 h-3" />
          ) : (
            <FaChevronDown className="inline-block ml-2 text-gray-500 dark:text-gray-300 h-3" />
          )}
        </span>
      </label>

      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 mt-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                type="checkbox"
                value={String(option.id)}
                checked={selectedValues.includes(String(option.id))}
                onChange={onSelectionChange}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-600"
              />
              <label
                htmlFor={String(option.id)}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                {option.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
