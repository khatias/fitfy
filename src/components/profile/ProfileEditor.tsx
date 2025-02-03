"use client";

import { useState } from "react";
import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/types/profile";
import { handleProfileFieldChange } from "@/utils/profile/handleProfileFieldChange";
import { handleSubmitProfileChange } from "@/utils/profile/handleSubmitProfileChange";
import { uploadFile } from "@/utils/files/uploadFile";
export default function ProfileEditor({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Profile>(profile);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("accountInfo");
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar_url || "");

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/create-portal-session", {
        method: "POST",
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleProfileFieldChange(e, setFormData);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const uploadedAvatarUrl =
          (await uploadFile(e.target.files[0], "avatars")) || "";
        setFormData((prevData) => ({
          ...prevData,
          avatar_url: uploadedAvatarUrl,
        }));
        setAvatarPreview(uploadedAvatarUrl);
      } catch (error) {
        console.error("Failed to upload avatar:", error);
      }
    }
  };

  function formatLabel(field: string): string {
    return field
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 py-6">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4  dark:bg-gray-900 border-r-[1px]  ">
        <button
          onClick={() => setActiveSection("accountInfo")}
          className={`w-full flex gap-2  py-3 text-left   ${
            activeSection === "accountInfo"
              ? "text-gray-800 font-semibold"
              : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }  transition-colors duration-200`}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-300 hover:text-gray-800  w-5 h-5"
          />
          Account Info
        </button>
        <button
          onClick={() => setActiveSection("address")}
          className={`w-full flex gap-2  py-3 text-left rounded-lg ${
            activeSection === "address"
              ? "text-gray-800 font-semibold"
              : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 "
          }  transition-colors duration-200`}
        >
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-gray-300 hover:text-gray-800  w-5 h-5"
          />
          Address
        </button>
      </div>

      <div className="w-full lg:w-3/4">
        <div className="flex gap-6 items-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile Picture"
                // objectFit="cover"
                width={128}
                height={128}
                priority
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-full h-full text-gray-500" />
            )}

            <label
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 flex justify-center items-center rounded-b-full"
              htmlFor="file_input"
            >
              <CameraIcon className="w-6 h-6 text-white" />
            </label>
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Hello, {formData.firstName ? formData.firstName : "User"}!
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.email || "No email provided"}
            </p>
            <button onClick={handleManageSubscription} disabled={loading}>
              {loading ? "Loading..." : "Manage Subscription"}
            </button>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          id="file_input"
          onChange={handleAvatarUpload}
          className="hidden"
        />

        {activeSection === "accountInfo" && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pb-2">
              Contact Information
            </h3>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 grid gap-6 md:grid-cols-2 xl:gap-6">
              {["firstName", "lastName", "location", "phone", "birthday"].map(
                (field) => (
                  <div className="flex flex-col" key={field}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {formatLabel(field)}:
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field}
                        value={
                          typeof formData[field as keyof Profile] === "string"
                            ? (formData[field as keyof Profile] as string)
                            : ""
                        }
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    ) : (
                      <p className="text-[16px] text-gray-700 dark:text-gray-300 break-words overflow-wrap break-all">
                        {typeof formData[field as keyof Profile] === "string"
                          ? (formData[field as keyof Profile] as string)
                          : "Not provided"}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {activeSection === "address" && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pb-2">
              Address
            </h3>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 grid gap-6 md:grid-cols-2 xl:gap-6">
              {["street", "city", "state", "postalCode", "country"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name={`address.${field}`}
                        value={
                          formData.address[field as keyof Profile["address"]] ||
                          ""
                        }
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      />
                    ) : (
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {formData.address[field as keyof Profile["address"]] ||
                          "Not provided"}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Edit Actions */}
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() =>
                  handleSubmitProfileChange(formData, setIsEditing, setLoading)
                }
                className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-md transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-md transition-colors duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
