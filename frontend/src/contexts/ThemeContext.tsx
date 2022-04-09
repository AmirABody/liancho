import React, { createContext, useContext, useEffect, useState } from "react";

export interface ThemeContextInterface {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ThemeProviderProps {
  initialTheme?: string;
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export function useTheme() {
  return useContext(ThemeContext)!
}

const getInitalTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");

    if (typeof storedPrefs === "string") return storedPrefs;

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) return "dark";
  }

  return "light"; // light theme as the default
};

export const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(getInitalTheme());

  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    localStorage.setItem("color-theme", rawTheme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
