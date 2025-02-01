interface FilterComponentProps {
  label: string;
  options: { id: string | number; name: string }[];
  type: string;
  selectedValues: string[];
  onSelectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  label,
  options,
  selectedValues,
  onSelectionChange,
}) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <label className="block text-lg font-medium text-gray-900 mb-3">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="checkbox"
              value={String(option.id)}
              checked={selectedValues.includes(String(option.id))}
              onChange={onSelectionChange}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" // Enhanced checkbox styling
            />
            <label
              htmlFor={String(option.id)}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
