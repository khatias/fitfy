"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import SideNavigation from "./SideNavigation";
import { useTranslations } from "next-intl";
import { handleLogout } from "@/utils/auth/handleLogout";
import { useProfile } from "@/utils/profile/getProfileCient";
import logo from "../../assets/logo.png";
import Image from "next/image";

function HeaderTopMobile() {
  const [session, setSession] = useState<boolean | null>(null); // Initial session state set to null
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  const profile = useProfile();

  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleDrawerToggle = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const closeDropdownIfClickedOutside = (e: MouseEvent) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(e.target as Node)
    ) {
      setIsProfileDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`/${locale}/api/status`);
        const data = await response.json();
        setSession(data.authenticated); // Update session state based on the API response
      } catch (error) {
        console.error("Error checking auth status:", error);
        setSession(false); // In case of an error, set session to false
      }
    };

    checkAuthStatus();

    // Adding event listener to close dropdown on click outside
    document.addEventListener("mousedown", closeDropdownIfClickedOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", closeDropdownIfClickedOutside);
    };
  }, [locale]);

  const handleLogoutAndCloseDropdown = () => {
    setIsProfileDropdownOpen(false); // Close the dropdown first
    handleLogout(); // Perform logout action
    setSession(false); // Explicitly set session to false after logout
  };

  const closeDropdownAndNavigate = () => {
    setIsProfileDropdownOpen(false); // Close the dropdown
  };

  return (
    <div className="flex w-full justify-between items-center px-6 lg:pr-0 py-2 max-h-[60px] max-w-[1300px] m-auto border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="w-auto h-full">
        <Link href="/">
          <Image
            src={logo.src}
            alt="Product Logo"
            width={150}
            height={50}
            quality={100}
            priority
            className="object-contain max-h-full"
          />
        </Link>
      </div>
      <ul className="hidden lg:flex lg:space-x-20">
        <li>
          <Link
            href="/products"
            className="font-medium hover:text-gray-600 dark:hover:text-white transition duration-300"
          >
            {t("products")}
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="font-medium hover:text-gray-600 dark:hover:text-white transition duration-300"
          >
            {t("contact")}
          </Link>
        </li>
        <li>
          <Link
            href="/aboutus"
            className="font-medium hover:text-gray-600 dark:hover:text-white transition duration-300"
          >
            {t("aboutUs")}
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-3 pr-3">
        <Link
          href="/create-product"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
        >
          <PlusIcon className="hidden md:block h-6 text-gray-800 dark:text-gray-300" />
        </Link>

        <Link
          href="/cart"
          className="hidden lg:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="24px"
            height="24px"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
            ></path>
          </svg>
        </Link>

        {session === null ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-customRed rounded-full animate-spin"></div>
          </div>
        ) : session ? (
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="hidden lg:flex items-center justify-between w-full py-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            >
              <div className="flex items-center space-x-2">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3M12 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
                  ></path>
                </svg>
              </div>
            </button>
            {isProfileDropdownOpen && (
              <div
                ref={profileDropdownRef}
                className="hidden lg:block absolute right-0 mt-2 w-60 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                {profile?.firstName && (
                  <div className="px-4 py-3 text-customRed font-medium text-xl border-b border-gray-200 dark:border-b-gray-700">
                    {profile.firstName}
                  </div>
                )}
                <Link
                  href="/profile"
                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 transition duration-200"
                  onClick={() => closeDropdownAndNavigate()}
                >
                  {t("profile")}
                </Link>
                <Link
                  href="/my-products"
                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 transition duration-200"
                  onClick={() => closeDropdownAndNavigate()}
                >
                  {t("myProducts")}
                </Link>
                <button
                  onClick={handleLogoutAndCloseDropdown}
                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 transition duration-200 w-full text-left"
                >
                  {t("logOut")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden lg:flex items-center justify-between w-full py-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
          >
            <div className="flex items-center space-x-2">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="24px"
                height="24px"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3M12 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
                ></path>
              </svg>
            </div>
          </Link>
        )}

        <button
          onClick={handleDrawerToggle}
          className="p-2 lg:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            role="img"
            width="24px"
            height="24px"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              d="M21 5.25H3M21 12H3m18 6.75H3"
            ></path>
          </svg>
        </button>
      </div>

      <SideNavigation
        isOpen={isDrawerOpen}
        onClose={handleDrawerToggle}
        session={session}
      />
    </div>
  );
}

export default HeaderTopMobile;
