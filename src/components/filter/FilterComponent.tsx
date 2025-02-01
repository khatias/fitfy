// components/FilterComponent.tsx
import React from "react";

interface FilterProps {
  label: string;
  options: { id: string | number; name: string }[];
  type: string;
  selectedValues: string[];
  onSelectionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  label,
  options,

  onSelectionChange,
}) => (
  <div className="mb-4">
    <label className="block font-bold mb-2">{label}:</label>
    <div className="flex flex-wrap">
      {options.map((option) => (
        <label key={option.id}>
          <input
            type="checkbox"
            value={option.id}
            // checked={selectedValues.includes(option.id)}
            onChange={onSelectionChange}
          />
          <span>{option.name}</span>
        </label>
      ))}
    </div>
  </div>
);

export default FilterComponent;
