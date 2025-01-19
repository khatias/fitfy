"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait until the component is mounted to handle theme rendering.
  if (!mounted) return null;

  return (
    <div>
      <div>
        {themes.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => {
              setTheme(value);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
