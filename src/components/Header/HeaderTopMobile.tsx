import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "@/i18n/routing";
function HeaderTopMobile() {
  return (
    <div className="flex w-full justify-between px-6">
      <div className="flex">
        {" "}
        <Link href="/">logo</Link>
      </div>

      <div className="buttons flex  justify-center items-center gap-1">
        <Link className="p-1" href="/create-product">
          <PlusIcon className="h-7 " />
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
        {/* <button className="p-1">
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
              d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
            ></path>
          </svg>
        </button> */}

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
              d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3M12 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
            ></path>
          </svg>
        </button>
        <button className="p-1">
          <svg
            className=""
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
