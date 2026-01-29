"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  function handleToggle() {
    if (theme === "light") {
      changeTheme("dark");
    } else if (theme === "dark") {
      changeTheme("system");
    } else {
      changeTheme("light");
    }
  }

  // Icon based on current theme
  const icon =
    theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "💻";

  return (
    <button
      onClick={handleToggle}
      className="
        flex items-center justify-center
        w-10 h-10 rounded-full
        border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900
        text-lg
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition
      "
      title={`Theme: ${theme}`}
    >
      {icon}
    </button>
  );
}
