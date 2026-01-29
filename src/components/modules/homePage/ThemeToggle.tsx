"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="flex gap-2 rounded-lg border p-2">
      <button
        onClick={() => changeTheme("light")}
        className={`px-3 py-1 rounded ${
          theme === "light"
            ? "bg-black text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        ☀️
      </button>

      <button
        onClick={() => changeTheme("dark")}
        className={`px-3 py-1 rounded ${
          theme === "dark"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        🌙
      </button>

      <button
        onClick={() => changeTheme("system")}
        className={`px-3 py-1 rounded ${
          theme === "system"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        💻
      </button>
    </div>
  );
}
