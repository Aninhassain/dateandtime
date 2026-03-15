"use client";

import { useState, useCallback } from "react";
import { Calendar, ArrowLeftRight, Calculator, Info } from "lucide-react";

interface DateInfo {
  date: Date;
  formatted: string;
  dayOfWeek: string;
  dayOfYear: number;
  weekNumber: number;
  isLeapYear: boolean;
}

interface DifferenceResult {
  startInfo: DateInfo;
  endInfo: DateInfo;
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  isStartBeforeEnd: boolean;
  includeEndDate: boolean;
}

const getDayOfWeek = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getDateInfo = (date: Date): DateInfo => {
  return {
    date,
    formatted: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    dayOfWeek: getDayOfWeek(date),
    dayOfYear: getDayOfYear(date),
    weekNumber: getWeekNumber(date),
    isLeapYear: isLeapYear(date.getFullYear()),
  };
};

const DateDifferenceCalculator = () => {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(true);
  const [result, setResult] = useState<DifferenceResult | null>(null);

  const calculate = useCallback(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const isStartBeforeEnd = start <= end;
    const actualStart = isStartBeforeEnd ? start : end;
    const actualEnd = isStartBeforeEnd ? end : start;

    // Calculate total days
    let totalDays = Math.floor((actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24));

    if (includeEndDate) {
      totalDays += 1;
    }

    // Calculate years, months, days breakdown
    let years = 0;
    let months = 0;
    let days = 0;

    const tempDate = new Date(actualStart);

    // Count years
    while (true) {
      const nextYear = new Date(tempDate);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      if (nextYear <= actualEnd) {
        years++;
        tempDate.setFullYear(tempDate.getFullYear() + 1);
      } else {
        break;
      }
    }

    // Count months
    while (true) {
      const nextMonth = new Date(tempDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      if (nextMonth <= actualEnd) {
        months++;
        tempDate.setMonth(tempDate.getMonth() + 1);
      } else {
        break;
      }
    }

    // Count remaining days
    days = Math.floor((actualEnd.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEndDate && days >= 0) {
      days += 1;
    }

    // Calculate weeks
    const weeks = Math.floor(totalDays / 7);

    setResult({
      startInfo: getDateInfo(start),
      endInfo: getDateInfo(end),
      years,
      months,
      weeks,
      days,
      totalDays,
      totalWeeks: weeks,
      totalMonths: years * 12 + months,
      totalHours: totalDays * 24,
      totalMinutes: totalDays * 24 * 60,
      totalSeconds: totalDays * 24 * 60 * 60,
      isStartBeforeEnd,
      includeEndDate,
    });
  }, [startDate, endDate, includeEndDate]);

  const swapDates = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
  };

  const setToday = (field: "start" | "end") => {
    const todayDate = new Date().toISOString().split("T")[0];
    if (field === "start") {
      setStartDate(todayDate);
    } else {
      setEndDate(todayDate);
    }
  };

  const resetForm = () => {
    setStartDate(today);
    setEndDate(today);
    setIncludeEndDate(true);
    setResult(null);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
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
            <span className="text-gradient">Date Difference</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Find the exact difference between two dates in days, weeks, months, and years
          </p>
        </header>

        {/* Calculator Card */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Start Date */}
              <div className="space-y-2">
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
                    onClick={() => setToday("start")}
                    className="btn-secondary text-sm whitespace-nowrap"
                  >
                    Today
                  </button>
                </div>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">
                  End Date
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-4"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setToday("end")}
                    className="btn-secondary text-sm whitespace-nowrap"
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-theme-border">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEndDate}
                  onChange={(e) => setIncludeEndDate(e.target.checked)}
                />
                <span className="text-sm text-theme-text">Include end date in calculation</span>
              </label>
              <div className="flex items-center gap-1 text-xs text-theme-text-muted">
                <Info className="w-3 h-3" />
                <span>Adds 1 day to the result</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={calculate}
                className="btn-primary flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculate Difference
              </button>
              <button
                type="button"
                onClick={swapDates}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Swap Dates
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
                  <Calculator className="w-4 h-4 text-theme-accent" />
                </span>
                Date Difference
              </h2>

              {/* Primary Result */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <p className="text-theme-text-muted mb-2">
                  From {result.startInfo.formatted} to {result.endInfo.formatted}
                </p>
                <div className="text-3xl md:text-4xl font-bold text-theme-text">
                  {result.years > 0 && (
                    <span className="text-gradient">{result.years} year{result.years !== 1 ? "s" : ""}</span>
                  )}
                  {result.years > 0 && (result.months > 0 || result.days > 0) && <span className="text-theme-text">, </span>}
                  {result.months > 0 && (
                    <span className="text-gradient">{result.months} month{result.months !== 1 ? "s" : ""}</span>
                  )}
                  {result.months > 0 && result.days > 0 && <span className="text-theme-text">, </span>}
                  {(result.days > 0 || (result.years === 0 && result.months === 0)) && (
                    <span className="text-gradient">{result.days} day{result.days !== 1 ? "s" : ""}</span>
                  )}
                </div>
                {result.includeEndDate && (
                  <p className="text-sm text-theme-text-muted mt-2">
                    * Including the end date
                  </p>
                )}
              </div>

              {/* Total Counts */}
              <h3 className="text-lg font-semibold text-theme-text mb-4">Total Counts</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalDays)}</p>
                  <p className="text-sm text-theme-text-muted">Days</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalWeeks)}</p>
                  <p className="text-sm text-theme-text-muted">Weeks</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalMonths)}</p>
                  <p className="text-sm text-theme-text-muted">Months</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalHours)}</p>
                  <p className="text-sm text-theme-text-muted">Hours</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalMinutes)}</p>
                  <p className="text-sm text-theme-text-muted">Minutes</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalSeconds)}</p>
                  <p className="text-sm text-theme-text-muted">Seconds</p>
                </div>
              </div>

              {/* Weeks and Days */}
              <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border mb-6">
                <p className="text-lg text-theme-text">
                  Or <span className="font-bold text-gradient">{result.totalWeeks} weeks</span> and{" "}
                  <span className="font-bold text-gradient">{result.totalDays % 7} days</span>
                </p>
              </div>

              {/* Date Details */}
              <h3 className="text-lg font-semibold text-theme-text mb-4">Date Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date Info */}
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <h4 className="font-semibold text-theme-text mb-3">Start Date</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Day of Week</span>
                      <span className="text-theme-text font-medium">{result.startInfo.dayOfWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Day of Year</span>
                      <span className="text-theme-text font-medium">{result.startInfo.dayOfYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Week Number</span>
                      <span className="text-theme-text font-medium">{result.startInfo.weekNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Leap Year</span>
                      <span className="text-theme-text font-medium">{result.startInfo.isLeapYear ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>

                {/* End Date Info */}
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <h4 className="font-semibold text-theme-text mb-3">End Date</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Day of Week</span>
                      <span className="text-theme-text font-medium">{result.endInfo.dayOfWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Day of Year</span>
                      <span className="text-theme-text font-medium">{result.endInfo.dayOfYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Week Number</span>
                      <span className="text-theme-text font-medium">{result.endInfo.weekNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-muted">Leap Year</span>
                      <span className="text-theme-text font-medium">{result.endInfo.isLeapYear ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DateDifferenceCalculator;
