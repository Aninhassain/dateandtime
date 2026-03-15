"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CalendarDays,
  CalendarRange,
  Timer,
  CalendarClock,
  CalendarPlus,
  CalendarMinus,
  Hourglass,
  Sun,
  Moon,
  Globe,
  Briefcase,
  Baby,
  Heart,
  Cake,
  ChevronDown,
  Play,
  Flower2,
  PartyPopper,
  Code,
  Sparkles,
} from "lucide-react";

// Calculator data organized by category
const calculatorCategories = [
  {
    title: "Date Calculators",
    description: "Calculate durations, differences, and date-related operations",
    calculators: [
      {
        name: "Date Duration Calculator",
        description: "Calculate days, months, years between two dates",
        path: "/date-duration",
        icon: CalendarRange,
        color: "primary",
      },
      {
        name: "Date Difference Calculator",
        description: "Find the exact difference between dates",
        path: "/date-difference",
        icon: CalendarDays,
        color: "secondary",
      },
      {
        name: "Add Days to Date",
        description: "Add days, weeks, months, or years to a date",
        path: "/add-days",
        icon: CalendarPlus,
        color: "accent",
      },
      {
        name: "Subtract Days from Date",
        description: "Subtract days, weeks, months, or years from a date",
        path: "/subtract-days",
        icon: CalendarMinus,
        color: "primary",
      },
      {
        name: "Weekday Calculator",
        description: "Find what day of the week a date falls on",
        path: "/weekday",
        icon: Calendar,
        color: "secondary",
      },
      {
        name: "Business Days Calculator",
        description: "Calculate working days between dates",
        path: "/business-days",
        icon: Briefcase,
        color: "accent",
      },
    ],
  },
  {
    title: "Time Calculators",
    description: "Time zone conversions and time calculations",
    calculators: [
      {
        name: "Time Duration Calculator",
        description: "Calculate hours, minutes, seconds between times",
        path: "/time-duration",
        icon: Timer,
        color: "primary",
      },
      {
        name: "Time Zone Converter",
        description: "Convert time between different time zones",
        path: "/timezone",
        icon: Globe,
        color: "secondary",
      },
      {
        name: "Add/Subtract Time",
        description: "Add or subtract hours, minutes, seconds",
        path: "/add-time",
        icon: Clock,
        color: "accent",
      },
      {
        name: "Hours Calculator",
        description: "Calculate total hours between two times",
        path: "/hours",
        icon: Hourglass,
        color: "primary",
      },
    ],
  },
  {
    title: "Timers",
    description: "Stopwatch, timers, and countdown tools",
    calculators: [
      {
        name: "Stopwatch",
        description: "Simple and accurate online stopwatch",
        path: "/stopwatch",
        icon: Play,
        color: "primary",
      },
      {
        name: "Timer",
        description: "Set a countdown timer with alerts",
        path: "/timer",
        icon: Timer,
        color: "secondary",
      },
      {
        name: "Countdown to Any Date",
        description: "Create a countdown to any future date",
        path: "/countdown",
        icon: Hourglass,
        color: "accent",
      },
      {
        name: "Spring Countdown",
        description: "Countdown to the first day of spring",
        path: "/spring-countdown",
        icon: Flower2,
        color: "primary",
      },
      {
        name: "Easter Countdown",
        description: "Countdown to Easter Sunday",
        path: "/easter-countdown",
        icon: Sparkles,
        color: "secondary",
      },
      {
        name: "New Year Countdown",
        description: "Countdown to New Year's Day",
        path: "/new-year-countdown",
        icon: PartyPopper,
        color: "accent",
      },
      {
        name: "Countdown for Your Site",
        description: "Embeddable countdown widget for your website",
        path: "/countdown-widget",
        icon: Code,
        color: "primary",
      },
    ],
  },
  {
    title: "Date & Time Combined",
    description: "Combined date and time calculations",
    calculators: [
      {
        name: "DateTime Duration",
        description: "Calculate exact duration with date and time",
        path: "/datetime-duration",
        icon: CalendarClock,
        color: "secondary",
      },
      {
        name: "Countdown Timer",
        description: "Countdown to a specific date and time",
        path: "/countdown",
        icon: Timer,
        color: "primary",
      },
      {
        name: "Sunrise/Sunset Calculator",
        description: "Find sunrise and sunset times for any location",
        path: "/sunrise-sunset",
        icon: Sun,
        color: "accent",
      },
      {
        name: "Moon Phase Calculator",
        description: "Calculate moon phases for any date",
        path: "/moon-phase",
        icon: Moon,
        color: "secondary",
      },
    ],
  },
  {
    title: "Special Calculators",
    description: "Age, anniversary, and special date calculators",
    calculators: [
      {
        name: "Age Calculator",
        description: "Calculate exact age in years, months, and days",
        path: "/age",
        icon: Cake,
        color: "primary",
      },
      {
        name: "Birthday Calculator",
        description: "Days until next birthday, day born, etc.",
        path: "/birthday",
        icon: Baby,
        color: "secondary",
      },
      {
        name: "Anniversary Calculator",
        description: "Calculate anniversary milestones",
        path: "/anniversary",
        icon: Heart,
        color: "accent",
      },
    ],
  },
];

export default function Home() {
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(0);

  const toggleCategory = (index: number) => {
    setOpenCategoryIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 starry-base" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-primary" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-secondary" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 horizon-glow" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 city-grid" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 swirl-layer swirl-layer-left" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 swirl-layer swirl-layer-right" />

      <div className="relative z-10">
        <div className="w-full px-2 md:px-4 py-8 md:py-14 mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10 md:mb-16 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
                <span className="text-sm text-theme-primary">Professional Date & Time Tools</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight px-4 text-theme-text drop-shadow-glow">
                Welcome to{" "}
                <span className="text-gradient bg-[length:200%_auto] animate-pan">
                  Date & Time Calculator
                </span>
              </h1>
              <p className="text-base md:text-xl text-theme-text-muted max-w-2xl mx-auto px-4">
                Your comprehensive platform for all date and time calculations. From duration calculations
                to time zone conversions and age calculations.
              </p>
            </div>

            {/* Categories Grid */}
            <div className="space-y-6 md:space-y-8 px-2 md:px-0">
              {calculatorCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="rounded-2xl glass-card p-4 md:p-8 animate-rise"
                  style={{ animationDelay: `${categoryIndex * 120}ms` }}
                >
                  <div className="flex items-center justify-between gap-4 mb-3 md:mb-4 pb-3 border-b border-theme-border">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-theme-text">
                        {category.title}
                      </h2>
                      <p className="text-sm text-theme-text-muted mt-1">
                        {category.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Toggle ${category.title}`}
                      onClick={() => toggleCategory(categoryIndex)}
                      className="rounded-full border border-theme-border bg-theme-surface p-2 text-theme-text transition-all duration-300 hover:bg-theme-primary/10 hover:border-theme-primary"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          openCategoryIndex === categoryIndex ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 overflow-hidden ${
                      openCategoryIndex === categoryIndex
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    {category.calculators.map((calculator, index) => {
                      const IconComponent = calculator.icon;
                      return (
                        <Link
                          key={index}
                          href={calculator.path}
                          className="group relative overflow-hidden rounded-xl bg-theme-surface/50 p-5 md:p-6 border border-theme-border transition-all duration-300 hover:border-theme-primary hover:bg-theme-surface hover:-translate-y-1 hover:shadow-xl"
                        >
                          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-secondary/5 group-hover:opacity-100" />
                          <div className="relative flex flex-col">
                            <div className={`inline-flex w-12 h-12 items-center justify-center rounded-lg bg-theme-${calculator.color}/10 mb-4`}>
                              <IconComponent className={`h-6 w-6 text-theme-${calculator.color}`} />
                            </div>
                            <h3 className="text-lg font-semibold text-theme-text mb-2 group-hover:text-gradient transition-all">
                              {calculator.name}
                            </h3>
                            <p className="text-sm text-theme-text-muted leading-relaxed">
                              {calculator.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer className="text-center py-12 mt-12 border-t border-theme-border">
              <p className="text-sm text-theme-text-muted">
                Built with precision for all your date and time calculations
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
