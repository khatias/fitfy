import React from "react";

interface EditButtonsProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  handleSubmit: () => void;
}

const EditButtons = ({
  isEditing,
  setIsEditing,
  loading,
  handleSubmit,
}: EditButtonsProps) => {
  return (
    <div className="flex pl-2 gap-4">
      {isEditing ? (
        <>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md transition-colors duration-200"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditButtons;
