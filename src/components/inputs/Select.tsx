import { useTranslations } from "next-intl";

interface SelectProps {
  label: string;
  name: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
  error,
}) => {
  const t = useTranslations("ProductForm");

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium transition-all duration-300"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        className="w-full border rounded p-3"
      >
        <option value="">
          {t("select")} {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default Select;
