"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Theme {
  name: string;
  id: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  type: "light" | "dark";
}

export const themes: Theme[] = [
  // Light Themes
  {
    name: "Light",
    id: "light",
    type: "light",
    colors: {
      primary: "#570df8",
      secondary: "#f000b8",
      accent: "#37cdbe",
      background: "#ffffff",
      surface: "#f2f2f2",
      text: "#1f2937",
      textMuted: "#6b7280",
      border: "#e5e7eb",
    },
  },
  {
    name: "Cupcake",
    id: "cupcake",
    type: "light",
    colors: {
      primary: "#65c3c8",
      secondary: "#ef9fbc",
      accent: "#eeaf3a",
      background: "#faf7f5",
      surface: "#efeae6",
      text: "#291334",
      textMuted: "#6b5876",
      border: "#e0d6cf",
    },
  },
  {
    name: "Bumblebee",
    id: "bumblebee",
    type: "light",
    colors: {
      primary: "#e0a82e",
      secondary: "#f9d72f",
      accent: "#181830",
      background: "#ffffff",
      surface: "#f5f5f4",
      text: "#1c1917",
      textMuted: "#78716c",
      border: "#e7e5e4",
    },
  },
  {
    name: "Emerald",
    id: "emerald",
    type: "light",
    colors: {
      primary: "#66cc8a",
      secondary: "#377cfb",
      accent: "#ea5234",
      background: "#ffffff",
      surface: "#f0fdf4",
      text: "#333c4d",
      textMuted: "#6b7280",
      border: "#d1fae5",
    },
  },
  {
    name: "Corporate",
    id: "corporate",
    type: "light",
    colors: {
      primary: "#4b6bfb",
      secondary: "#7b92b2",
      accent: "#67cba0",
      background: "#ffffff",
      surface: "#f4f4f5",
      text: "#181a2a",
      textMuted: "#71717a",
      border: "#e4e4e7",
    },
  },
  {
    name: "Garden",
    id: "garden",
    type: "light",
    colors: {
      primary: "#5c7f67",
      secondary: "#ecf4e7",
      accent: "#fae5e5",
      background: "#e9e7e7",
      surface: "#ddd9d9",
      text: "#100f0f",
      textMuted: "#5a5656",
      border: "#ccc7c7",
    },
  },
  {
    name: "Pastel",
    id: "pastel",
    type: "light",
    colors: {
      primary: "#d1c1d7",
      secondary: "#f6cbd1",
      accent: "#b4e9d6",
      background: "#ffffff",
      surface: "#f9f9f9",
      text: "#1e1e1e",
      textMuted: "#7a7a7a",
      border: "#f0f0f0",
    },
  },
  // Dark Themes
  {
    name: "Dark",
    id: "dark",
    type: "dark",
    colors: {
      primary: "#661ae6",
      secondary: "#d926aa",
      accent: "#1fb2a5",
      background: "#0a0a0f",
      surface: "#1a1a2e",
      text: "#ffffff",
      textMuted: "#a1a1aa",
      border: "#2a2a4a",
    },
  },
  {
    name: "Synthwave",
    id: "synthwave",
    type: "dark",
    colors: {
      primary: "#e779c1",
      secondary: "#58c7f3",
      accent: "#f3cc30",
      background: "#1a103d",
      surface: "#221551",
      text: "#ffffff",
      textMuted: "#b8b8b8",
      border: "#352a6e",
    },
  },
  {
    name: "Halloween",
    id: "halloween",
    type: "dark",
    colors: {
      primary: "#f28c18",
      secondary: "#6d3a9c",
      accent: "#51a800",
      background: "#1f1f1f",
      surface: "#2d2d2d",
      text: "#f8f8f2",
      textMuted: "#a8a8a8",
      border: "#404040",
    },
  },
  {
    name: "Forest",
    id: "forest",
    type: "dark",
    colors: {
      primary: "#1eb854",
      secondary: "#1db990",
      accent: "#1db9ac",
      background: "#171212",
      surface: "#1e1a1a",
      text: "#ffffff",
      textMuted: "#a0a0a0",
      border: "#2e2626",
    },
  },
  {
    name: "Aqua",
    id: "aqua",
    type: "dark",
    colors: {
      primary: "#09ecf3",
      secondary: "#966fb3",
      accent: "#ffe999",
      background: "#0f1729",
      surface: "#182234",
      text: "#e2e8f0",
      textMuted: "#94a3b8",
      border: "#293548",
    },
  },
  {
    name: "Lofi",
    id: "lofi",
    type: "dark",
    colors: {
      primary: "#808080",
      secondary: "#a0a0a0",
      accent: "#c0c0c0",
      background: "#0d0d0d",
      surface: "#171717",
      text: "#ffffff",
      textMuted: "#a3a3a3",
      border: "#333333",
    },
  },
  {
    name: "Dracula",
    id: "dracula",
    type: "dark",
    colors: {
      primary: "#ff79c6",
      secondary: "#bd93f9",
      accent: "#ffb86c",
      background: "#282a36",
      surface: "#343746",
      text: "#f8f8f2",
      textMuted: "#9ca0b0",
      border: "#44475a",
    },
  },
  {
    name: "Night",
    id: "night",
    type: "dark",
    colors: {
      primary: "#38bdf8",
      secondary: "#818cf8",
      accent: "#f471b5",
      background: "#0f172a",
      surface: "#1e293b",
      text: "#e2e8f0",
      textMuted: "#94a3b8",
      border: "#334155",
    },
  },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(themes.find(t => t.id === "dark") || themes[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const found = themes.find((t) => t.id === savedTheme);
      if (found) {
        setThemeState(found);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Apply theme CSS variables
      const root = document.documentElement;
      root.style.setProperty("--color-primary", theme.colors.primary);
      root.style.setProperty("--color-secondary", theme.colors.secondary);
      root.style.setProperty("--color-accent", theme.colors.accent);
      root.style.setProperty("--color-background", theme.colors.background);
      root.style.setProperty("--color-surface", theme.colors.surface);
      root.style.setProperty("--color-text", theme.colors.text);
      root.style.setProperty("--color-text-muted", theme.colors.textMuted);
      root.style.setProperty("--color-border", theme.colors.border);
      root.setAttribute("data-theme", theme.id);
      root.setAttribute("data-theme-type", theme.type);
    }
  }, [theme, mounted]);

  const setTheme = (themeId: string) => {
    const found = themes.find((t) => t.id === themeId);
    if (found) {
      setThemeState(found);
      localStorage.setItem("theme", themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
