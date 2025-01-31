// // interface SelectProps {
// //     label: string;
// //     name: string;
// //     value: string | number;
// //     options: { value: string | number; label: string }[];
// //     onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// //     onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
// //     error?: string;
// //   }
  
// //   const Select: React.FC<SelectProps> = ({
// //     label,
// //     name,
// //     value,
// //     options,
// //     onChange,
// //     onBlur,
// //     error,
// //   }) => {
// //     return (
// //       <div>
// //         <label htmlFor={name} className="block font-medium">
// //           {label}
// //         </label>
// //         <select
// //           id={name}
// //           name={name}
// //           value={value}
// //           onChange={onChange}
// //           onBlur={onBlur}
// //           required
// //           className="w-full border rounded p-2"
// //         >
// //           <option value={value}>{value}</option>
// //           {options.map((option) => (
// //             <option key={option.value} value={option.value}>
// //               {option.label}
// //             </option>
// //           ))}
// //         </select>
// //         {error && <span className="text-red-500">{error}</span>}
// //       </div>
// //     );
// //   };
  
// //   export default Select;
//   interface SelectProps {
//   label: string;
//   name: string;
//   value: string | number;
//   options: { value: string | number; label: string }[];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
//   error?: string;
// }

// const Select: React.FC<SelectProps> = ({
//   label,
//   name,
//   value,
//   options,
//   onChange,
//   onBlur,
//   error,
// }) => {
//   return (
//     <div>
//       <label htmlFor={name} className="block font-medium">
//         {label}
//       </label>
//       <select
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         required
//         className="w-full border rounded p-2"
//       >
//         <option  desibled  value="" >
//           {/* {value} */}select
//         </option>
//         {options.map((option, index) => (
//           <option key={`${option.value}-${index}`} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {error && <span className="text-red-500">{error}</span>}
//     </div>
//   );
// };

// export default Select;
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
  return (
    <div>
      <label htmlFor={name} className="block font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        className="w-full border rounded p-2"
      >
        <option value="">Select {label}</option>
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
