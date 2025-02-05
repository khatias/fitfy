import React, { ChangeEvent, FocusEvent, JSX, useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ImageUploadProps {
  labelText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  buttonText?: string;
  icon?: JSX.Element;
  multiple?: boolean;
  previewWidth?: number;
  previewHeight?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  labelText,
  onChange,
  onBlur,
  error,
  buttonText,
  icon = <PhotoIcon className="w-6 h-6" />,
  multiple = false,
  previewWidth = 96,
  previewHeight = 96,
}) => {
  const t = useTranslations("ProductForm");

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    onChange(e);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor="image"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {labelText}
      </label>
      <div className="relative">
        <input
          type="file"
          id="image"
          name="image"
          className="absolute opacity-0 w-full h-full cursor-pointer"
          onChange={handleChange}
          onBlur={onBlur}
          multiple={multiple}
          ref={fileInputRef}
        />
        <button
          type="button"
          className={`w-full p-3 rounded-lg border ${
            error
              ? "border-red-500 text-red-500"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
          } hover:border-blue-500 dark:hover:border-blue-500 transition duration-300 ease-out focus:outline-none flex items-center justify-center gap-2`}
          onClick={handleClick}
        >
          {icon}
          <span className="font-medium truncate">
            {buttonText || t("chooseImage")}
          </span>
        </button>
      </div>
      {preview && (
        <div className="mt-2 relative overflow-hidden rounded-lg shadow-md">
          <Image
            src={preview}
            alt="Preview"
            width={previewWidth}
            height={previewHeight}
            objectFit="cover"
          />
        </div>
      )}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default ImageUpload;
