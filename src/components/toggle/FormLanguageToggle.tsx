import { Dispatch, SetStateAction } from "react";

interface FormLanguageToggleProps {
  showGeorgian: boolean;
  setShowGeorgian: Dispatch<SetStateAction<boolean>>;
}

const FormLanguageToggle = ({
  showGeorgian,
  setShowGeorgian,
}: FormLanguageToggleProps) => {
  return (
    <div className="flex justify-start mb-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        {showGeorgian ? "KA" : "EN"}
      </label>
      <button
        type="button"
        onClick={() => setShowGeorgian(!showGeorgian)}
        className={`w-10 h-4 rounded-full relative transition duration-300 ${
          showGeorgian ? "bg-red-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute w-3 h-2 rounded-full bg-white shadow-sm left-1 top-1 transition duration-300 ${
            showGeorgian ? "translate-x-7" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default FormLanguageToggle;
