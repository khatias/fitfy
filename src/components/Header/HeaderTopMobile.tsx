"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import SideNavigation from "./SideNavigation";
import { handleLogout } from "@/utils/auth/handleLogout";
import { useProfile } from "@/utils/profile/getProfileCient";
import logo from "../../assets/logo.png";
import Image from "next/image";

const HeaderTopMobile = () => {
  const [session, setSession] = useState<boolean | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const t = useTranslations("Header");
  const locale = useLocale();
  const profile = useProfile();
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);
  const handleDrawerToggle = useCallback(
    () => setIsDrawerOpen((prev) => !prev),
    []
  );
  const closeDropdownAndNavigate = () => setIsProfileDropdownOpen(false);

  const closeDropdownIfClickedOutside = (e: MouseEvent) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(e.target as Node)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`/${locale}/api/status`);
        const data = await response.json();
        setSession(data.authenticated);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setSession(false);
      }
    };

    checkAuthStatus();
    document.addEventListener("mousedown", closeDropdownIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", closeDropdownIfClickedOutside);
    };
  }, [locale]);

  const handleLogoutAndCloseDropdown = () => {
    setIsProfileDropdownOpen(false);
    handleLogout();
    setSession(false);
  };

  const renderProfileDropdown = () => {
    if (!profile?.profile) return null;

    return (
      <div
        ref={profileDropdownRef}
        className="absolute z-50 right-0 mt-2 w-72 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 overflow-hidden"
      >
        <div className="px-6 py-4 text-customRed font-bold text-2xl border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          {profile.profile.first_name}
        </div>
        <Link
          href="/profile"
          className="block py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-700/70 text-gray-800 dark:text-gray-300 transition duration-200 font-medium"
          onClick={closeDropdownAndNavigate}
        >
          {t("profile")}
        </Link>
        <Link
          href="/my-products"
          className="block py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-700/70 text-gray-800 dark:text-gray-300 transition duration-200 font-medium"
          onClick={closeDropdownAndNavigate}
        >
          {t("myProducts")}
        </Link>
        <button
          onClick={handleLogoutAndCloseDropdown}
          className="block py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-700/70 text-gray-800 dark:text-gray-300 transition duration-200 w-full text-left font-medium"
        >
          {t("logOut")}
        </button>
      </div>
    );
  };

  const renderSessionStatus = () => {
    if (session === null) {
      return (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-customRed rounded-full animate-spin"></div>
      );
    }

    if (session) {
      return (
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
          {isProfileDropdownOpen && renderProfileDropdown()}
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div className="flex w-full mt-2 justify-between items-center px-6 pr-0 max-h-14 max-w-[1300px] m-auto border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
      <Link
        href="/create-product"
        className="hidden lg:block px-6 py-2 rounded-md bg-black text-white font-medium shadow-clay transition duration-300 group relative overflow-hidden dark:bg-gray-600"
      >
        <span className="absolute inset-0 bg-red-200/0 transition-all duration-300 group-hover:bg-slate-950 rounded-md z-0"></span>
        <span className="relative z-10">Sell</span>
      </Link>

      <div className="w-auto h-full pt-2">
        <Link href="/">
          <Image
            src={logo.src}
            alt="Product Logo"
            width={130}
            height={120}
            quality={100}
            priority
            className="object-cover"
          />
        </Link>
      </div>

      <div className="flex items-center gap-3 pr-3">
        <Link
          href="/create-product"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 lg:hidden"
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

        {renderSessionStatus()}

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
};

export default HeaderTopMobile;
