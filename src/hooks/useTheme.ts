import { useEffect, useState } from "react";

export const useTheme = () => {
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setResolvedTheme((theme) => {
      const newTheme = theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (!mode) return;
    if (mode === "light" || mode === "dark") {
      setResolvedTheme(mode);
    }
  }, []);

  return [resolvedTheme, toggleTheme] as const;
};
