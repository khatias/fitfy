import React from "react";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full mt-4 py-4 bg-black text-white font-semibold text-md rounded-md hover:bg-customBlueGray transition-all duration-300 focus:outline-none dark:bg-slate-700 dark:hover:bg-slate-300"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
