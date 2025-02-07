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
import FormLanguageToggle from "@/components/toggle/FormLanguageToggle";
import { Modal } from "@/components/modals/Modal";
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);
  const t = useTranslations("ProductForm");
  const te = useTranslations("FormErrors");
  const locale = window.location.pathname.split("/")[1];
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
        setShowSuccessModal(true);
      } else {
        console.log("Error updating product.");
      }
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-100 dark:bg-gray-900 pt-10 pb-10 min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500 dark:border-gray-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4"> {t("updateProduct")}</h1>
      <FormLanguageToggle
        showGeorgian={showGeorgian}
        setShowGeorgian={setShowGeorgian}
      />
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
          label={t("category")}
          name="product_category"
          value={formData?.product_category || ""}
          options={categories.map((category) => ({
            value: category.product_category_id,
            label: locale === "en" ? category.category_en : category.category_ka,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_category}
        />

        <Select
          label={t("material")}
          name="product_material"
          value={formData?.product_material || ""}
          options={materials.map((material) => ({
            value: material.product_material_id,
            label: locale === "en" ? material.material_en : material.material_ka,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_material}
        />

        <Select
          label={t("condition")}
          name="product_condition"
          value={formData?.product_condition || ""}
          options={conditions.map((condition) => ({
            value: condition.product_condition_id,
            label:
              locale === "en" ? condition.condition_en : condition.condition_ka,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_condition}
        />

        <Select
          label={t("color")}
          name="product_color"
          value={formData?.product_color || ""}
          options={colors.map((color) => ({
            value: color.product_color_id,
            label: locale === "en" ? color.color_en : color.color_ka,
          }))}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={errors.product_color}
        />

        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            {t("price")}
          </label>
          <input
            type="number"
            name="price"
            value={formData?.price || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-full p-2 border dark:border-gray-600 rounded"
          />
          {errors.price && <span className="text-red-500">{errors.price}</span>}
        </div>
        <div>
          <textarea
            id={showGeorgian ? "description_ka" : "description_en"}
            name={showGeorgian ? "description_ka" : "description_en"}
            className={`w-full p-4 rounded-lg border dark:border-gray-600 ${
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
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t("chooseImage")}
          </label>
          <div className="mt-2 flex items-center">
            <label
              htmlFor="image"
              className="relative cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 text-gray-500 dark:text-gray-400 transition duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1H7zm5.328 9.223a.75.75 0 101.15-.966l-3.215-4.018a.75.75 0 00-1.036 0L4.328 13.257a.75.75 0 001.15.966l2.76-3.45A.75.75 0 008 10.75V14a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-3.25a.75.75 0 00-.542-.677z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("chooseImage")}
              </span>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleUploadImage}
                className="hidden"
                onBlur={handleBlur}
              />
              {errors.image && (
                <span className="text-red-500 text-sm">{errors.image}</span>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-black dark:bg-gray-600 text-white py-2 px-4 rounded-md"
        >
          {t("updateProduct")}
        </button>
      </form>
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t("successTitle")}
        message={t("successMessage")}
        buttonText={t("goToProducts")}
        link="/products"
      />
    </div>
  );
}
