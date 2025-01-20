"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait until the component is mounted to handle theme rendering.
  if (!mounted) return null;

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          className="sr-only"
        />
        <div
          className={`w-12 h-7 flex items-center justify- bg-customGray  dark:bg-gray-700 rounded-full p-1 transition-all duration-300 ease-in-out`}
        >
          <SunIcon
            className={`w-6 h-6 text-gray-400 transform transition-all duration-500 ease-in-out ${
              theme === "dark" ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
            }`}
          />

          <MoonIcon
            className={`w-6 h-6 text-gray-400 transform transition-all duration-500 ease-in-out ${
              theme === "dark" ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
