"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowTrendingDownIcon } from "@heroicons/react/20/solid";
interface ImagesStepProps {
  formData: {
    images: string[]; // Array to store image URLs
  };
  handleUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultipleImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export function ImagesStep({
  formData,
  handleMultipleImageUpload,
}: ImagesStepProps) {
  const t = useTranslations("ImagesStep");

  return (
    <div className="space-y-6">
      <label
        htmlFor="image"
        className="block text-lg font-semibold text-gray-800"
      >
        {t("uploadImages")}
      </label>

      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="relative group">
              <div
                className={`h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 ${
                  formData.images[index] ? "border-2 border-green-500" : ""
                }`}
              >
                {formData.images[index] ? (
                  <Image
                    src={formData.images[index]}
                    alt={`Uploaded Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <ArrowTrendingDownIcon className="h-16 w-16 text-gray-400" />
                )}
              </div>

              <input
                type="file"
                id={`image-${index}`}
                accept="image/*"
                onChange={handleMultipleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
