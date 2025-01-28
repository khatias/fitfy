"use client";
import React from "react";
import Image from "next/image";

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
  return (
    <div>
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Images
      </label>
      <div className="mt-2 grid grid-cols-2 gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="h-24 w-24 overflow-hidden bg-gray-100 flex items-center justify-center">
                {formData.images[index] ? (
                  <Image
                    src={formData.images[index]}
                    alt={`Uploaded Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                ) : (
                  <svg
                    className="h-12 w-12 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48-4.48-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2z"
                    />
                  </svg>
                )}
              </span>
              <input
                type="file"
                id={`image-${index}`}
                accept="image/*"
                onChange={handleMultipleImageUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
