"use client";

import { useState } from "react";
import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/types/profile";
import { handleProfileFieldChange } from "@/utils/profile/handleProfileFieldChange";
import { handleSubmitProfileChange } from "@/utils/profile/handleSubmitProfileChange";
import { uploadFile } from "@/utils/files/uploadFile";
import Input from "../inputs/Input";
import SidebarButton from "./SideBarButton";
import EditButtons from "./EditButtons";
export default function ProfileEditor({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Profile>(profile);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("accountInfo");
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar_url || "");

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
    <div className="flex flex-col lg:flex-row gap-8  py-6">
      <div className="w-full lg:w-1/4 dark:bg-gray-900 border-r-[1px]">
        <SidebarButton
          icon={faUser}
          label="Account Info"
          isActive={activeSection === "accountInfo"}
          onClick={() => setActiveSection("accountInfo")}
        />
        <SidebarButton
          icon={faMapMarkerAlt}
          label="Address"
          isActive={activeSection === "address"}
          onClick={() => setActiveSection("address")}
        />
      </div>

      <div className="w-full lg:w-3/4">
        <div className="flex gap-6 items-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile Picture"
                width={1280}
                height={1280}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-full h-full text-gray-500" />
            )}
            {isEditing ? (
              <label
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 flex justify-center items-center rounded-b-full"
                htmlFor="file_input"
              >
                <CameraIcon className="w-6 h-6 text-white" />
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Hello, {formData.first_name ? formData.first_name : "User"}!
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.email || "No email provided"}
            </p>
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
              {[
                "first_name",
                "last_name",
                "location",
                "phone_number",
                "birthday",
                "user_name",
              ].map((field) => (
                <div className="flex flex-col" key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatLabel(field)}:
                  </label>
                  {isEditing ? (
                    <Input
                      type="text"
                      name={field}
                      value={
                        typeof formData[field as keyof Profile] === "string"
                          ? (formData[field as keyof Profile] as string)
                          : ""
                      }
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-[16px] text-gray-700 dark:text-gray-300 break-words overflow-wrap break-all">
                      {typeof formData[field as keyof Profile] === "string"
                        ? (formData[field as keyof Profile] as string)
                        : "Not provided"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "address" && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pb-2">
              Address
            </h3>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 grid gap-6 md:grid-cols-2 xl:gap-6">
              {[
                "address_street",
                "address_city",
                "address_state",
                "address_postal_code",
                "address_country",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {formatLabel(field)}:
                  </label>
                  {isEditing ? (
                    <Input
                      type="text"
                      name={field}
                      value={
                        typeof formData[field as keyof Profile] === "string"
                          ? (formData[field as keyof Profile] as string)
                          : ""
                      }
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {typeof formData[field as keyof Profile] === "string"
                        ? (formData[field as keyof Profile] as string)
                        : "Not provided"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <EditButtons
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          loading={loading}
          handleSubmit={() =>
            handleSubmitProfileChange(formData, setIsEditing, setLoading)
          }
        />
      </div>
    </div>
  );
}

{
  /* <button onClick={handleManageSubscription} disabled={loading}>
              {loading ? "Loading..." : "Manage Subscription"}
            </button> */
}

// const handleManageSubscription = async () => {
//   setLoading(true);
//   try {
//     const response = await fetch("api/create-portal-session", {
//       method: "POST",
//     });
//     const { url } = await response.json();
//     window.location.href = url;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// };
