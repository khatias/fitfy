"use client";
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

function HeaderTopMobile() {
  const [session, setSession] = useState<boolean | null>(null);
  const locale = useLocale();

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
  }, [locale]);

  return (
    <div className="flex w-full justify-between px-6">
      <div className="flex">
        <Link href="/">logo</Link>
      </div>

      <div className="buttons flex justify-center items-center gap-1">
        <Link className="p-1" href="/create-product">
          <PlusIcon className="h-7" />
        </Link>

        <Link href="/cart" className="p-1">
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
          <div className="flex justify-center items-center">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        ) : session ? (
          <Link href="/profile" className="p-1">
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
          </Link>
        ) : (
          <Link href="/login" className="p-1">
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
          </Link>
        )}

        <button className="p-1">
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
    </div>
  );
}

export default HeaderTopMobile;
