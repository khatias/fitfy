import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Category } from "@/types/product";
import { usePathname } from "next/navigation";
import {
  XMarkIcon,
  ArrowDownIcon,
  PlusIcon,
  DocumentDuplicateIcon,
  PowerIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import { useProfile } from "@/utils/profile/getProfileCient";
import Image from "next/image";
import { fetchCategories } from "@/utils/fetchDatas/fetchProductData";
import { handleLogout } from "@/utils/auth/handleLogout";
import defaultAvatar from "../../assets/defaultAvatar.jpg";

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  session: boolean | null;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profile = useProfile();
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const t = useTranslations("Header");
  const te = useTranslations("Auth");

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const getLocalizedText = (enText: string, kaText: string = "") => {
    return currentLocale === "en" ? enText : kaText;
  };

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories || []);
    };
    getCategories();
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-white transition-transform transform z-50 dark:bg-gray-900
        ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-300 ease-in-out`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="pt-16 flex flex-col px-6 h-full overflow-y-auto">
        <ul className="space-y-2">
          {session === null || !session ? (
            <li className="py-1.5 rounded-lg transition duration-300 overflow-hidden relative">
              <Link
                href="/login"
                className="text-base font-medium text-gray-800 dark:text-gray-300 flex items-center gap-3 py-3 px-4 w-full rounded-lg relative z-10"
                onClick={onClose}
              >
                <UsersIcon className="h-6 w-6 text-customAmber shrink-0 transition duration-300 group-hover:scale-110" />
                <span className="truncate transition duration-300 group-hover:text-customAmber">
                  {te("login")}
                </span>
              </Link>
              <span className="absolute inset-0 bg-gray-100 dark:bg-slate-700 rounded-lg transition duration-300 group-hover:scale-105 z-0"></span>
            </li>
          ) : session ? (
            <li>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Link href="/profile">
                    <Image
                      src={profile?.profile?.avatar_url ?? defaultAvatar.src}
                      alt="Profile Image"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </Link>
                  <div className="flex flex-col items-start">
                    <span className="text-base font-medium text-gray-800">
                      {profile?.profile?.user_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {profile?.profile?.email}
                    </span>
                  </div>
                </div>
                <ArrowDownIcon
                  className={`h-5 w-5 text-gray-600 transition-all duration-500 ease-in-out ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileDropdownOpen && (
                <ul className="mt-2 w-full rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <li className="py-2 px-4 hover:bg-gray-100 transition duration-300 flex items-center gap-2">
                    <Link
                      href="/create-product"
                      className="text-base font-medium text-gray-800 flex items-center gap-2 w-full dark:text-gray-300"
                      onClick={onClose}
                    >
                      <PlusIcon className="h-5 w-5 text-customRed" />
                      {t("sellProduct")}
                    </Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 transition duration-300 flex items-center gap-2">
                    <Link
                      href="/my-products"
                      className="text-base font-medium text-gray-800 flex items-center gap-2 w-full dark:text-gray-300"
                      onClick={onClose}
                    >
                      <DocumentDuplicateIcon className="h-5 w-5 text-customRed" />
                      {t("myProducts")}
                    </Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 transition duration-300 flex items-center gap-2 ">
                    <button
                      onClick={() => {
                        handleLogout();
                        onClose();
                      }}
                      className="text-base font-medium text-gray-800 flex items-center gap-2 w-full dark:text-gray-300"
                    >
                      <PowerIcon className="h-5 w-5 text-customRed" />
                      {t("logOut")}
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : null}

          <ul className="mt-2 w-full ">
            {categories.map((category) => (
              <li
                key={category.product_category_id}
                className="px-4 hover:bg-gray-100 transition duration-300 py-3 border-b dark:border-b-gray-700"
              >
                <Link
                  href={`category/${category.product_category_id}`}
                  className="text-base font-medium text-gray-800 dark:text-gray-300 pb-3 hover:text-customRed transition-all duration-300 ease-in-out relative"
                  onClick={onClose}
                >
                  {getLocalizedText(
                    category.category_en || "",
                    category.category_ka || ""
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default SideNavigation;
