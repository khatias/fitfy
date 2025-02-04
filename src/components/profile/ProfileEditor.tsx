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
import { Link } from "@/i18n/routing";
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
      <div className="w-full flex flex-col lg:w-1/4 border-r-[1px] dark:border-r-gray-600">
        <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-600">
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
        <ul className="flex-grow px-4 py-4 space-y-1">
          <li>
            <Link
              href={"/my-products"}
              className="block text-gray-700 font-medium dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition duration-300"
            >
              My items for sale
            </Link>
          </li>
          <li>
            <Link
              href={"/my-blogs"}
              className="block text-gray-700 font-medium dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition duration-300"
            >
              My Blogs
            </Link>
          </li>
          <li>
            <Link
              href={"/orders"}
              className="block text-gray-700 font-medium dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md transition duration-300"
            >
              My Orders
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full lg:w-3/4">
        <div className="flex flex-col justify-center lg:flex-row  items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile Picture"
                width={960}
                height={960}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-full h-full text-gray-500" />
            )}
            {isEditing && (
              <label
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1 flex justify-center items-center rounded-b-full cursor-pointer"
                htmlFor="file_input"
              >
                <CameraIcon className="w-5 h-5 text-white" />
              </label>
            )}
          </div>
          <div className="flex-grow pb-2 lg:pb-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Hello, {formData.first_name || "User"}!
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.email || "No email provided"}
            </p>
          </div>
          <div className="lg:ml-auto text-center">
            <div className="w-full text-center">
              <div className="text-gray-600 dark:text-gray-400 text-sm flex justify-center gap-2 pb-2 lg:justify-end lg:-4 items-center">
                <span>Selling Limit:</span>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {profile?.product_count ?? "No Limit"}
                </h2>
              </div>
              {profile?.product_count === null ||
              profile?.product_count === undefined ? (
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  (No Limit Set)
                </span>
              ) : (
                <div className="flex items-center">
                  {profile?.subscription_name === "active" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">
                      {profile?.subscription_name ?? "Free plan"}
                    </span>
                  )}
                </div>
              )}
            </div>
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pb-2 pl-2">
              Contact Information
            </h3>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 grid gap-6 md:grid-cols-2 xl:gap-6">
              {[
                "first_name",
                "last_name",
                "location",
                "phone_number",
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pb-2 pl-1">
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
