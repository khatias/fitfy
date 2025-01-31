// // "use client";
// // import { useState, useEffect } from "react";
// // import { useTranslations } from "next-intl";
// // import { uploadFile } from "@/utils/files/uploadFile";
// // import {
// //   getMyProductById,
// //   updateProduct,
// //   fetchCategories,
// //   fetchMaterials,
// //   fetchColors,
// //   fetchConditions,
// // } from "@/utils/fetchDatas/fetchProductData";
// // import { ProductType } from "@/types/product";
// // import ProductInput from "@/components/inputs/ProductInput";
// // import { Category, Material, Color, Condition } from "@/types/product";
// // import Select from "@/components/inputs/Select";
// // export default function UpdateProductPage({
// //   params,
// // }: {
// //   params: Promise<{ id: string }>;
// // }) {
// //   const [id, setId] = useState<string | null>(null);

// //   const [formData, setFormData] = useState<ProductType>({
// //     id: 0,
// //     name: "",
// //     name_ka: "",
// //     brand: "",
// //     price: 0,
// //     description_en: "",
// //     description_ka: "",
// //     product_category_id: 0,
// //     product_material_id: 0,
// //     product_color: 0,
// //     product_condition: 0,
// //     material_en: "",
// //     material_ka: "",
// //     primary_image:''
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [showGeorgian, setShowGeorgian] = useState(false);
// //   const [errors, setErrors] = useState<{ [key: string]: string }>({});
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [materials, setMaterials] = useState<Material[]>([]);
// //   const [conditions, setConditions] = useState<Condition[]>([]);
// //   const [colors, setColors] = useState<Color[]>([]);
// //   const t = useTranslations("ProductForm");
// //   const te = useTranslations("FormErrors");

// //   useEffect(() => {
// //     const getId = async () => {
// //       const resolvedParams = await params;
// //       setId(resolvedParams.id);
// //     };
// //     getId();
// //   }, [params]);

// //   useEffect(() => {
// //     if (id) {
// //       const fetchProduct = async () => {
// //         const fetchedCategories = await fetchCategories();

// //         setCategories(fetchedCategories || []);
// //         const fetchedMaterials = await fetchMaterials();
// //         setMaterials(fetchedMaterials || []);
// //         const fetchedConditions = await fetchConditions();
// //         setConditions(fetchedConditions || []);
// //         const fetchedColors = await fetchColors();
// //         setColors(fetchedColors || []);
// //         const data = await getMyProductById(Number(id));
// //         if (data) {
// //           setFormData(data);
// //           // console.log(data);
// //           setLoading(false);
// //         } else console.log("no data");
// //       };
// //       fetchProduct();
// //     }
// //   }, [id]);

// //   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev!,
// //       [name]: value,
// //     }));
// //     console.log(name, value);
// //     console.log(value);
// //   };

// //   const validateField = (
// //     name: string,
// //     value: string | number | File | null
// //   ) => {
// //     let error = "";
// //     switch (name) {
// //       case "name":
// //       case "name_ka":
// //       case "brand":
// //         if (!value || value.toString().trim() === "") {
// //           error = t("required");
// //         }
// //         break;
// //       case "price":
// //         if (value === "") {
// //           error = t("required");
// //         } else if (isNaN(Number(value)) || Number(value) <= 0) {
// //           error = t("priceError");
// //         }
// //         break;
// //       case "description":
// //       case "description_ka":
// //         if (!value || value.toString().trim().length < 10) {
// //           error = te("required");
// //         }
// //         break;
// //       case "category":
// //         if (!value) {
// //           error = t("required");
// //         }
// //         break;
// //       default:
// //         break;
// //     }
// //     return error;
// //   };
// //   const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       const file = e.target.files[0];
// //       try {
// //         const uploadedImageUrl = await uploadFile(file, "products");
// //         setFormData((prev) => ({
// //           ...prev,
// //           primary_image: uploadedImageUrl || "",
// //         }));
// //       } catch (error) {
// //         console.error("Error uploading image:", error);
// //       }
// //     }
// //   };

// //   const handleInputChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleBlur = (
// //     e: React.FocusEvent<
// //       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
// //     >
// //   ) => {
// //     const { name, value } = e.target;
// //     const error = validateField(name, value);
// //     setErrors((prev) => ({ ...prev, [name]: error }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (formData) {
// //       const updatedProduct = await updateProduct({
// //         ...formData,
// //         product_category_id: formData.product_category_id,
// //         product_material_id: formData.product_material_id,
// //         product_condition_id: formData.product_condition_id,
// //         product_color_id: formData.product_color_id,
// //         primary_image: formData.primary_image,
// //       });
// //       if (updatedProduct) {
// //         console.log("Product updated successfully!");
// //         console.log(formData);
// //       } else {
// //         console.log("Error updating product.");
// //       }
// //     }
// //   };

// //   const handleToggle = () => {
// //     setShowGeorgian(!showGeorgian);
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="max-w-2xl mx-auto py-10">
// //       <h1 className="text-2xl font-bold mb-4">Update Product</h1>
// //       <button
// //         type="button"
// //         onClick={handleToggle}
// //         className={`mt-2 p-3 rounded-full text-sm font-semibold shadow-md mb-2 ${
// //           showGeorgian ? "bg-green-600 text-white" : "bg-gray-300 text-gray-800"
// //         }`}
// //       >
// //         {showGeorgian ? "Switch to English" : "Switch to Georgian"}
// //       </button>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <ProductInput
// //           label={showGeorgian ? "სახელი" : "name"}
// //           type="text"
// //           id={showGeorgian ? "name_ka" : "name"}
// //           name={showGeorgian ? "name_ka" : "name"}
// //           placeholder={
// //             showGeorgian ? "შეიყვანე პროდუქტის სახელი" : t("nameplaceholder")
// //           }
// //           value={showGeorgian ? formData?.name_ka ?? "" : formData?.name ?? ""}
// //           onChange={handleInputChange}
// //           onBlur={handleBlur}
// //           className={
// //             errors[showGeorgian ? "name_ka" : "name"]
// //               ? "border-red-500"
// //               : "border-gray-300"
// //           }
// //         />

// //         <Select
// //           label="category"
// //           name="product_category"
// //           value={formData.product_category.category_en}
// //           options={categories.map((category) => ({
// //             value: category.product_category_id,
// //             label: showGeorgian ? category.category_ka : category.category_en,
// //           }))}
// //           onChange={handleSelectChange}
// //           onBlur={handleBlur}
// //           error={errors.product_category}
// //         />

// //         <Select
// //           label="material"
// //           name="product_material"
// //           value={formData.product_material.material_en}
// //           options={materials.map((material) => ({
// //             value: material.product_material_id,
// //             label: showGeorgian ? material.material_ka : material.material_en,
// //           }))}
// //           onChange={handleSelectChange}
// //           onBlur={handleBlur}
// //           error={errors.product_material}
// //         />

// //         <Select
// //           label="condition"
// //           name="product_condition"
// //           value={formData.product_condition.condition_en}
// //           options={conditions.map((condition) => ({
// //             value: condition.product_condition_id,
// //             label: showGeorgian
// //               ? condition.condition_ka
// //               : condition.condition_en,
// //           }))}
// //           onChange={handleSelectChange}
// //           onBlur={handleBlur}
// //           error={errors.product_condition}
// //         />

// //         <Select
// //            name="product_color"
// //           label="color"
// //           value={formData.product_color.color_en}
// //           options={colors.map((color) => ({
// //             value: color.product_color_id,
// //             label: showGeorgian ? color.color_ka : color.color_en,
// //           }))}
// //           onChange={handleSelectChange}
// //           onBlur={handleBlur}
// //           error={errors.product_color}
// //         />
// //         <div className="flex flex-col space-y-2">
// //           <label
// //             htmlFor="image"
// //             className="text-sm font-medium text-gray-700 dark:text-gray-300"
// //           >
// //             {t("image")}
// //           </label>
// //           <input
// //             type="file"
// //             id="primary_image"
// //             name="primary_image"
// //             className={`w-full p-3 rounded border ${
// //               errors.image ? "border-red-500" : "border-gray-300"
// //             }`}
// //             onChange={handleUploadImage}
// //             onBlur={handleBlur}
// //           />
// //           {errors.image && (
// //             <span className="text-red-500 text-sm">{errors.image}</span>
// //           )}
// //         </div>

// //         <div>
// //           <label htmlFor="price" className="block text-sm font-medium">
// //             Price
// //           </label>
// //           <input
// //             type="number"
// //             name="price"
// //             value={formData?.price || ""}
// //             onChange={handleInputChange}
// //             onBlur={handleBlur}
// //             className="w-full p-2 border rounded"
// //           />
// //           {errors.price && <span className="text-red-500">{errors.price}</span>}
// //         </div>
// //         <div>
// //           <textarea
// //             id={showGeorgian ? "description_ka" : "description_en"}
// //             name={showGeorgian ? "description_ka" : "description_en"}
// //             className={`w-full p-4 rounded-lg border ${
// //               errors[showGeorgian ? "description_ka" : "description_en"]
// //                 ? "border-red-500"
// //                 : "border-gray-300"
// //             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
// //             placeholder={
// //               showGeorgian
// //                 ? "შეიყვანეთ მოკლე აღწერა პროდუქტის შესახებ"
// //                 : t("descriptionplacholder")
// //             }
// //             value={
// //               showGeorgian ? formData?.description_ka : formData?.description_en
// //             }
// //             onChange={handleInputChange}
// //             onBlur={handleBlur}
// //           ></textarea>
// //         </div>
// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white py-2 px-4 rounded-md"
// //         >
// //           Update Product
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import {
//   getMyProductById,
//   updateProduct,
//   fetchCategories,
//   fetchMaterials,
//   fetchColors,
//   fetchConditions,
// } from "@/utils/fetchDatas/fetchProductData";
// import { ProductType } from "@/types/product";
// import ProductInput from "@/components/inputs/ProductInput";
// import { Category, Material, Color, Condition } from "@/types/product";
// import Select from "@/components/inputs/Select";
// export default function UpdateProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const [id, setId] = useState<string | null>(null);

//   const [formData, setFormData] = useState<ProductType>({
//     // id: 0,
//     // name: "",
//     // name_ka: "",
//     // brand: "",
//     // price: 0,
//     // description_en: "",
//     // description_ka: "",
//     // product_category_id : 0,
//     // product_material: 0,
//     // product_color: 0,
//     // product_condition: 0,
//     // material_en: "",
//     // material_ka: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [showGeorgian, setShowGeorgian] = useState(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [materials, setMaterials] = useState<Material[]>([]);
//   const [conditions, setConditions] = useState<Condition[]>([]);
//   const [colors, setColors] = useState<Color[]>([]);
//   const t = useTranslations("ProductForm");
//   const te = useTranslations("FormErrors");

//   useEffect(() => {
//     const getId = async () => {
//       const resolvedParams = await params;
//       setId(resolvedParams.id);
//     };
//     getId();
//   }, [params]);

//   useEffect(() => {
//     if (id) {
//       const fetchProduct = async () => {
//         const fetchedCategories = await fetchCategories();
//         setCategories(fetchedCategories || []);
//         const fetchedMaterials = await fetchMaterials();
//         setMaterials(fetchedMaterials || []);
//         const fetchedConditions = await fetchConditions();
//         setConditions(fetchedConditions || []);
//         const fetchedColors = await fetchColors();
//         setColors(fetchedColors || []);
//         const data = await getMyProductById(Number(id));
//         if (data) {
//           setFormData(data);
//           console.log(formData)
//           setLoading(false);
//           console.log(formData)
//         }
//       };
//       fetchProduct();
//     }
//   }, [id]);

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev!,
//       [name]: value,
//     }));
//     console.log(value)
//   };

//   const validateField = (
//     name: string,
//     value: string | number | File | null
//   ) => {
//     let error = "";
//     switch (name) {
//       case "name":
//       case "name_ka":
//       case "brand":
//         if (!value || value.toString().trim() === "") {
//           error = t("required");
//         }
//         break;
//       case "price":
//         if (value === "") {
//           error = t("required");
//         } else if (isNaN(Number(value)) || Number(value) <= 0) {
//           error = t("priceError");
//         }
//         break;
//       case "description":
//       case "description_ka":
//         if (!value || value.toString().trim().length < 10) {
//           error = te("required");
//         }
//         break;
//       case "category":
//         if (!value) {
//           error = t("required");
//         }
//         break;
//       default:
//         break;
//     }
//     return error;
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleBlur = (
//     e: React.FocusEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     const error = validateField(name, value);
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData) {
//       const updatedProduct = await updateProduct({
//         ...formData,
//         product_category_id: formData.product_category_id,
//         // product_material_id: formData.product_material,
//         // product_condition_id: formData.product_condition,
//         // product_color_id: formData.product_color,

//       }

//     );
//       if (updatedProduct) {
//         console.log("Product updated successfully!");

//       } else {
//         console.log("Error updating product.");
//       }
//     }
//   };

//   const handleToggle = () => {
//     setShowGeorgian(!showGeorgian);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-4">Update Product</h1>
//       <button
//         type="button"
//         onClick={handleToggle}
//         className={`mt-2 p-3 rounded-full text-sm font-semibold shadow-md mb-2 ${
//           showGeorgian ? "bg-green-600 text-white" : "bg-gray-300 text-gray-800"
//         }`}
//       >
//         {showGeorgian ? "Switch to English" : "Switch to Georgian"}
//       </button>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <ProductInput
//           label={showGeorgian ? "სახელი" : "name"}
//           type="text"
//           id={showGeorgian ? "name_ka" : "name"}
//           name={showGeorgian ? "name_ka" : "name"}
//           placeholder={
//             showGeorgian ? "შეიყვანე პროდუქტის სახელი" : t("nameplaceholder")
//           }
//           value={showGeorgian ? formData?.name_ka ?? "" : formData?.name ?? ""}
//           onChange={handleInputChange}
//           onBlur={handleBlur}
//           className={
//             errors[showGeorgian ? "name_ka" : "name"]
//               ? "border-red-500"
//               : "border-gray-300"
//           }
//         />

//         <Select
//           label="Category"
//           name="product_category"
//           value={formData?.product_category || ""}
//           options={categories.map((category) => ({
//             value: category.category_en,
//             label: showGeorgian ? category.category_ka : category.category_en,
//           }))}
//           onChange={handleSelectChange}
//           onBlur={handleBlur}
//           error={errors.product_category}
//         />

//         {/* <Select
//           label="Materials"
//           name="product_material"
//           value={formData?.product_material || ""}
//           options={materials.map((material) => ({
//             value: material.product_material_id,
//             label: showGeorgian ? material.material_ka : material.material_en,
//           }))}
//           onChange={handleSelectChange}
//           onBlur={handleBlur}
//           error={errors.product_material}
//         /> */}

//         {/* <Select
//           label="Conditions"
//           name="product_condition"
//           value={formData?.product_condition || ""}
//           options={conditions.map((condition) => ({
//             value: condition.product_condition_id,
//             label: showGeorgian
//               ? condition.condition_ka
//               : condition.condition_en,
//           }))}
//           onChange={handleSelectChange}
//           onBlur={handleBlur}
//           error={errors.product_condition}
//         /> */}

//         {/* <Select
//           label="Colors"
//           name="product_color"
//           value={formData?.product_color || ""}
//           options={colors.map((color) => ({
//             value: color.product_color_id,
//             label: showGeorgian ? color.color_ka : color.color_en,
//           }))}
//           onChange={handleSelectChange}
//           onBlur={handleBlur}
//           error={errors.product_color}
//         /> */}

//         <div>
//           <label htmlFor="price" className="block text-sm font-medium">
//             Price
//           </label>
//           <input
//             type="number"
//             name="price"
//             value={formData?.price || ""}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             className="w-full p-2 border rounded"
//           />
//           {errors.price && <span className="text-red-500">{errors.price}</span>}
//         </div>
//         <div>
//           <textarea
//             id={showGeorgian ? "description_ka" : "description_en"}
//             name={showGeorgian ? "description_ka" : "description_en"}
//             className={`w-full p-4 rounded-lg border ${
//               errors[showGeorgian ? "description_ka" : "description_en"]
//                 ? "border-red-500"
//                 : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             placeholder={
//               showGeorgian
//                 ? "შეიყვანეთ მოკლე აღწერა პროდუქტის შესახებ"
//                 : t("descriptionplacholder")
//             }
//             value={
//               showGeorgian ? formData?.description_ka : formData?.description_en
//             }
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-4 rounded-md"
//         >
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { uploadFile } from "@/utils/files/uploadFile";
import {
  getMyProductById,
  updateProduct,
  fetchCategories,
  fetchMaterials,
  fetchColors,
  fetchConditions,
} from "@/utils/fetchDatas/fetchProductData";
import { ProductType } from "@/types/product";
import ProductInput from "@/components/inputs/ProductInput";
import { Category, Material, Color, Condition } from "@/types/product";
import Select from "@/components/inputs/Select";
export default function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProductType>({
    id: 0,
    name: "",
    name_ka: "",
    brand: "",
    price: 0,
    description_en: "",
    description_ka: "",
    product_category: 0,
    product_material: 0,
    product_color: 0,
    product_condition: 0,
    material_en: "",
    material_ka: "",
  });
  const [loading, setLoading] = useState(true);
  const [showGeorgian, setShowGeorgian] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const t = useTranslations("ProductForm");
  const te = useTranslations("FormErrors");

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getId();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories || []);
        const fetchedMaterials = await fetchMaterials();
        setMaterials(fetchedMaterials || []);
        const fetchedConditions = await fetchConditions();
        setConditions(fetchedConditions || []);
        const fetchedColors = await fetchColors();
        setColors(fetchedColors || []);
        const data = await getMyProductById(Number(id));
        if (data) {
          setFormData(data);
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const validateField = (
    name: string,
    value: string | number | File | null
  ) => {
    let error = "";
    switch (name) {
      case "name":
      case "name_ka":
      case "brand":
        if (!value || value.toString().trim() === "") {
          error = t("required");
        }
        break;
      case "price":
        if (value === "") {
          error = t("required");
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          error = t("priceError");
        }
        break;
      case "description":
      case "description_ka":
        if (!value || value.toString().trim().length < 10) {
          error = te("required");
        }
        break;
      case "category":
        if (!value) {
          error = t("required");
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      const updatedProduct = await updateProduct({
        ...formData,
        product_category_id: formData.product_category,
        product_material_id: formData.product_material,
        product_condition_id: formData.product_condition,
        product_color_id: formData.product_color,
      });
      if (updatedProduct) {
        console.log("Product updated successfully!");
      } else {
        console.log("Error updating product.");
      }
    }
  };

  const handleToggle = () => {
    setShowGeorgian(!showGeorgian);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadFile(file, "products");
        setFormData((prev) => ({
          ...prev,
          primary_image: uploadedImageUrl || "",
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      <button
        type="button"
        onClick={handleToggle}
        className={`mt-2 p-3 rounded-full text-sm font-semibold shadow-md mb-2 ${
          showGeorgian ? "bg-green-600 text-white" : "bg-gray-300 text-gray-800"
        }`}
      >
        {showGeorgian ? "Switch to English" : "Switch to Georgian"}
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ProductInput
          label={showGeorgian ? "სახელი" : "name"}
          type="text"
          id={showGeorgian ? "name_ka" : "name"}
          name={showGeorgian ? "name_ka" : "name"}
          placeholder={
            showGeorgian ? "შეიყვანე პროდუქტის სახელი" : t("nameplaceholder")
          }
          value={showGeorgian ? formData?.name_ka ?? "" : formData?.name ?? ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={
            errors[showGeorgian ? "name_ka" : "name"]
              ? "border-red-500"
              : "border-gray-300"
          }
        />

        <Select
          label="Category"
          name="product_category"
          value={formData?.product_category || ""}
          options={categories.map((category) => ({
            value: category.product_category_id,
            label: showGeorgian ? category.category_ka : category.category_en,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_category}
        />

        <Select
          label="Materials"
          name="product_material"
          value={formData?.product_material || ""}
          options={materials.map((material) => ({
            value: material.product_material_id,
            label: showGeorgian ? material.material_ka : material.material_en,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_material}
        />

        <Select
          label="Conditions"
          name="product_condition"
          value={formData?.product_condition || ""}
          options={conditions.map((condition) => ({
            value: condition.product_condition_id,
            label: showGeorgian
              ? condition.condition_ka
              : condition.condition_en,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_condition}
        />

        <Select
          label="Colors"
          name="product_color"
          value={formData?.product_color || ""}
          options={colors.map((color) => ({
            value: color.product_color_id,
            label: showGeorgian ? color.color_ka : color.color_en,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_color}
        />

        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData?.price || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded"
          />
          {errors.price && <span className="text-red-500">{errors.price}</span>}
        </div>
        <div>
          <textarea
            id={showGeorgian ? "description_ka" : "description_en"}
            name={showGeorgian ? "description_ka" : "description_en"}
            className={`w-full p-4 rounded-lg border ${
              errors[showGeorgian ? "description_ka" : "description_en"]
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={
              showGeorgian
                ? "შეიყვანეთ მოკლე აღწერა პროდუქტის შესახებ"
                : t("descriptionplacholder")
            }
            value={
              showGeorgian ? formData?.description_ka : formData?.description_en
            }
            onChange={handleInputChange}
            onBlur={handleBlur}
          ></textarea>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("image")}
          </label>
          <input
            type="file"
            id="primary_image"
            name="primary_image"
            className={`w-full p-3 rounded border ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
            onChange={handleUploadImage}
            onBlur={handleBlur}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
