
export const handleSelectChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  console.log(value);  
};
  