"use client";

import { useState, useCallback } from "react";
import { Calendar, CalendarPlus, Plus, Minus } from "lucide-react";

interface AddResult {
  resultDate: Date;
  formattedDate: string;
  dayOfWeek: string;
  isLeapYear: boolean;
  daysInMonth: number;
  weekNumber: number;
  dayOfYear: number;
}

const getDayOfWeek = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const AddDaysCalculator = () => {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(today);
  const [days, setDays] = useState<number>(0);
  const [weeks, setWeeks] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState<AddResult | null>(null);

  const calculate = useCallback(() => {
    if (!startDate) return;

    const start = new Date(startDate);
    const resultDate = new Date(start);

    const multiplier = operation === "add" ? 1 : -1;

    // Add/subtract years
    resultDate.setFullYear(resultDate.getFullYear() + years * multiplier);

    // Add/subtract months
    resultDate.setMonth(resultDate.getMonth() + months * multiplier);

    // Add/subtract weeks and days
    const totalDaysToAdd = (weeks * 7 + days) * multiplier;
    resultDate.setDate(resultDate.getDate() + totalDaysToAdd);

    setResult({
      resultDate,
      formattedDate: resultDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dayOfWeek: getDayOfWeek(resultDate),
      isLeapYear: isLeapYear(resultDate.getFullYear()),
      daysInMonth: getDaysInMonth(resultDate.getFullYear(), resultDate.getMonth()),
      weekNumber: getWeekNumber(resultDate),
      dayOfYear: getDayOfYear(resultDate),
    });
  }, [startDate, days, weeks, months, years, operation]);

  const resetForm = () => {
    setStartDate(today);
    setDays(0);
    setWeeks(0);
    setMonths(0);
    setYears(0);
    setOperation("add");
    setResult(null);
  };

  const setToday = () => {
    setStartDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent/10 border border-theme-accent/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
            <span className="text-sm text-theme-accent">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Add/Subtract</span>{" "}
            <span className="text-theme-text">Days Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Add or subtract days, weeks, months, or years from any date
          </p>
        </header>

        {/* Calculator Card */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            {/* Start Date */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Start Date
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4"
                  />
                </div>
                <button
                  type="button"
                  onClick={setToday}
                  className="btn-secondary text-sm whitespace-nowrap"
                >
                  Today
                </button>
              </div>
            </div>

            {/* Operation Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setOperation("add")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                  operation === "add"
                    ? "bg-theme-accent/20 border-theme-accent/40 text-theme-accent"
                    : "border-theme-border text-theme-text-muted hover:border-theme-primary"
                }`}
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
              <button
                type="button"
                onClick={() => setOperation("subtract")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                  operation === "subtract"
                    ? "bg-theme-secondary/20 border-theme-secondary/40 text-theme-secondary"
                    : "border-theme-border text-theme-text-muted hover:border-theme-primary"
                }`}
              >
                <Minus className="w-4 h-4" />
                Subtract
              </button>
            </div>

            {/* Duration Inputs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Years</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Months</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Weeks</label>
                <input
                  type="number"
                  value={weeks}
                  onChange={(e) => setWeeks(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={calculate}
                className="btn-primary flex items-center gap-2"
              >
                <CalendarPlus className="w-4 h-4" />
                Calculate
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-theme-accent/20 flex items-center justify-center">
                  <CalendarPlus className="w-4 h-4 text-theme-accent" />
                </span>
                Result
              </h2>

              {/* Primary Result */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <p className="text-theme-text-muted mb-2">
                  {operation === "add" ? "Adding" : "Subtracting"}{" "}
                  {years > 0 && `${years} year${years !== 1 ? "s" : ""} `}
                  {months > 0 && `${months} month${months !== 1 ? "s" : ""} `}
                  {weeks > 0 && `${weeks} week${weeks !== 1 ? "s" : ""} `}
                  {days > 0 && `${days} day${days !== 1 ? "s" : ""} `}
                  {operation === "add" ? "to" : "from"} {startDate}
                </p>
                <p className="text-3xl md:text-4xl font-bold text-gradient">
                  {result.formattedDate}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.dayOfWeek}</p>
                  <p className="text-sm text-theme-text-muted">Day of Week</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Week {result.weekNumber}</p>
                  <p className="text-sm text-theme-text-muted">Week of Year</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Day {result.dayOfYear}</p>
                  <p className="text-sm text-theme-text-muted">Day of Year</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.daysInMonth}</p>
                  <p className="text-sm text-theme-text-muted">Days in Month</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border md:col-span-2">
                  <p className="text-2xl font-bold text-gradient">
                    {result.isLeapYear ? "Yes" : "No"}
                  </p>
                  <p className="text-sm text-theme-text-muted">Leap Year</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AddDaysCalculator;
