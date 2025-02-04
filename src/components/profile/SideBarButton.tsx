import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SidebarButtonProps {
  icon: IconDefinition;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`group relative w-full flex items-center px-4 py-2.5 rounded-md transition-colors duration-300 ease-in-out
      ${
        isActive
          ? "bg-red-300 dark:bg-[#e43d12] text-gray-800 font-medium shadow-sm hover:bg-red-400 dark:hover:bg-[#e43c14] focus:outline-none  focus:ring-rose-200 dark:focus:ring-rose-800"
          : "text-gray-500 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-gray-700 hover:text-customRed dark:hover:text-gray-200 focus:outline-none  focus:ring-rose-100 dark:focus:ring-gray-600"
      }`}
  >
    <FontAwesomeIcon
      icon={icon}
      className={`w-5 h-5 transition-colors duration-300 group-hover:text-rose-600 dark:group-hover:text-rose-300 ${
        isActive ? "text-red-800" : "text-gray-400 dark:text-gray-500"
      }`}
    />
    <span
      className={`ml-3 text-sm font-medium transition-colors duration-300 ${
        isActive
          ? "text-red-800"
          : "text-gray-600 dark:text-gray-400 group-hover:text-rose-700 dark:group-hover:text-gray-200"
      }`}
    >
      {label}
    </span>
  </button>
);

export default SidebarButton;
