"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme, themes } from "@/context/ThemeContext";
import {
  Calendar,
  Clock,
  CalendarDays,
  CalendarRange,
  Timer,
  CalendarClock,
  CalendarPlus,
  CalendarMinus,
  Briefcase,
  Globe,
  Hourglass,
  Sun,
  Moon,
  Cake,
  Baby,
  Heart,
  Search,
  ChevronDown,
  Settings,
  Palette,
} from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

const navigationCategories: NavCategory[] = [
  {
    title: "Date Calculators",
    items: [
      { name: "Date Duration", path: "/date-duration", icon: CalendarRange },
      { name: "Date Difference", path: "/date-difference", icon: CalendarDays },
      { name: "Add Days", path: "/add-days", icon: CalendarPlus },
      { name: "Subtract Days", path: "/subtract-days", icon: CalendarMinus },
      { name: "Weekday Finder", path: "/weekday", icon: Calendar },
      { name: "Business Days", path: "/business-days", icon: Briefcase },
    ],
  },
  {
    title: "Time Calculators",
    items: [
      { name: "Time Duration", path: "/time-duration", icon: Timer },
      { name: "Time Zone", path: "/timezone", icon: Globe },
      { name: "Add/Subtract Time", path: "/add-time", icon: Clock },
      { name: "Hours Calculator", path: "/hours", icon: Hourglass },
    ],
  },
  {
    title: "DateTime Combined",
    items: [
      { name: "DateTime Duration", path: "/datetime-duration", icon: CalendarClock },
      { name: "Countdown Timer", path: "/countdown", icon: Timer },
      { name: "Sunrise/Sunset", path: "/sunrise-sunset", icon: Sun },
      { name: "Moon Phase", path: "/moon-phase", icon: Moon },
    ],
  },
  {
    title: "Special Calculators",
    items: [
      { name: "Age Calculator", path: "/age", icon: Cake },
      { name: "Birthday Calculator", path: "/birthday", icon: Baby },
      { name: "Anniversary", path: "/anniversary", icon: Heart },
    ],
  },
];

const ThemeColorDots = ({ themeId }: { themeId: string }) => {
  const theme = themes.find((t) => t.id === themeId);
  if (!theme) return null;

  return (
    <div className="flex gap-0.5">
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: theme.colors.primary }}
      />
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: theme.colors.secondary }}
      />
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: theme.colors.accent }}
      />
    </div>
  );
};

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowThemeDropdown(false);
      }
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const lightThemes = themes.filter((t) => t.type === "light");
  const darkThemes = themes.filter((t) => t.type === "dark");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme-border bg-theme-surface/95 backdrop-blur supports-[backdrop-filter]:bg-theme-surface/80">
      <div className="container mx-auto px-4">
        {/* Top Row - Logo, Search, Theme */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-theme-primary/20 border border-theme-primary/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-theme-primary" />
            </div>
            <span className="text-xl font-bold text-theme-text hidden sm:block">
              <span className="text-theme-primary">Date</span>
              <span className="text-theme-secondary">&</span>
              <span className="text-theme-accent">Time</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-muted" />
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-theme-background border border-theme-border text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Theme Switcher */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-theme-background border border-theme-border hover:border-theme-primary/50 transition-all"
            >
              <Settings className="w-4 h-4 text-theme-text-muted" />
              <ThemeColorDots themeId={theme.id} />
              <ChevronDown
                className={`w-4 h-4 text-theme-text-muted transition-transform ${
                  showThemeDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Theme Dropdown */}
            {showThemeDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 max-h-96 overflow-y-auto rounded-xl bg-theme-surface border border-theme-border shadow-xl">
                {/* Light Themes */}
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-semibold text-theme-text-muted uppercase tracking-wider">
                    Light
                  </p>
                  {lightThemes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        theme.id === t.id
                          ? "bg-theme-primary/10 border border-theme-primary/30"
                          : "hover:bg-theme-background"
                      }`}
                    >
                      <ThemeColorDots themeId={t.id} />
                      <span className="text-sm text-theme-text">{t.name}</span>
                      {theme.id === t.id && (
                        <span className="ml-auto text-xs text-theme-primary">Active</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="border-t border-theme-border" />

                {/* Dark Themes */}
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-semibold text-theme-text-muted uppercase tracking-wider">
                    Dark
                  </p>
                  {darkThemes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        theme.id === t.id
                          ? "bg-theme-primary/10 border border-theme-primary/30"
                          : "hover:bg-theme-background"
                      }`}
                    >
                      <ThemeColorDots themeId={t.id} />
                      <span className="text-sm text-theme-text">{t.name}</span>
                      {theme.id === t.id && (
                        <span className="ml-auto text-xs text-theme-primary">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row - Navigation */}
        <nav className="flex items-center gap-2 py-3 overflow-x-auto hide-scrollbar" ref={navDropdownRef}>
          {navigationCategories.map((category) => (
            <div key={category.title} className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === category.title ? null : category.title
                  )
                }
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeDropdown === category.title
                    ? "bg-theme-primary text-white"
                    : "bg-theme-primary/10 text-theme-primary hover:bg-theme-primary/20"
                }`}
              >
                {category.title}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    activeDropdown === category.title ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === category.title && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-theme-surface border border-theme-border shadow-xl py-2 z-50">
                  {category.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-4 py-2.5 text-theme-text hover:bg-theme-primary/10 transition-colors"
                      >
                        <IconComponent className="w-4 h-4 text-theme-primary" />
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
