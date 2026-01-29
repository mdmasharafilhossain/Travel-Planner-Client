"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;

    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme("system");
    }
  }, []);

  const applyTheme = (mode: Theme) => {
    const root = document.documentElement;

    if (mode === "system") {
      const isDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.classList.toggle("dark", isDark);
    }

    if (mode === "dark") {
      root.classList.add("dark");
    }

    if (mode === "light") {
      root.classList.remove("dark");
    }
  };

  const changeTheme = (mode: Theme) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
  };

  return { theme, changeTheme };
}
