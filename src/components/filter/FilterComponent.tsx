interface FilterComponentProps {
    label: string;
    options: { id: string | number; name: string }[];
    type: string;
    selectedValues: string[]; // This is the prop used to control checkboxes
    onSelectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const FilterComponent: React.FC<FilterComponentProps> = ({
    label,
    options,
    selectedValues,
    onSelectionChange,
  }) => {
    return (
      <div className="mb-4">
        <label className="block font-bold mb-2">{label}</label>
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="checkbox"
              value={String(option.id)} // Ensure this is always a string
              checked={selectedValues.includes(String(option.id))} // This checks if the option is in selectedValues
              onChange={onSelectionChange}
              className="mr-2"
            />
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default FilterComponent;
  