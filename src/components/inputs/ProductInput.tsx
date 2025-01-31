interface ProductInputProps {
    label: string;
    type: string;
    name: string;
    value: string | number;
    id?: string;
    className: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  }
  
  const ProductInput: React.FC<ProductInputProps> = ({
    label,
    id,
    className,
    placeholder,
    type,
    name,
    value,
    onChange,
    onBlur,
  }) => {
    return (
      <div className="flex flex-col space-y-2">
        <label
          htmlFor={id || name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={id || name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full p-3 rounded border ${className}`}
          placeholder={placeholder}
        />
      </div>
    );
  };
  
  export default ProductInput;
  