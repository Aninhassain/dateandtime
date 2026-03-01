"use client";

import { useState, useCallback } from "react";
import { Calendar, RefreshCw, Info } from "lucide-react";

interface DurationResult {
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
  includeEndDate: boolean;
}

const DateDurationCalculator = () => {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(true);
  const [result, setResult] = useState<DurationResult | null>(null);

  const calculateDuration = useCallback(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure start is before end
    const actualStart = start <= end ? start : end;
    const actualEnd = start <= end ? end : start;

    // Calculate total days
    let totalDays = Math.floor((actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24));

    // Add 1 if including end date
    if (includeEndDate) {
      totalDays += 1;
    }

    // Calculate years, months, days breakdown
    let years = 0;
    let months = 0;
    let days = 0;

    // Clone the start date for calculation
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
      includeEndDate,
    });
  }, [startDate, endDate, includeEndDate]);

  const setToday = (field: "start" | "end") => {
    const todayDate = new Date().toISOString().split("T")[0];
    if (field === "start") {
      setStartDate(todayDate);
    } else {
      setEndDate(todayDate);
    }
  };

  const swapDates = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
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
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-theme-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
            <span className="text-sm text-theme-primary">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Date Duration</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate the exact duration between two dates in years, months, weeks, and days
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
                onClick={calculateDuration}
                className="btn-primary flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Calculate Duration
              </button>
              <button
                type="button"
                onClick={swapDates}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
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
                <span className="w-8 h-8 rounded-lg bg-theme-primary/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-theme-primary" />
                </span>
                Duration Result
              </h2>

              {/* Primary Result */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <p className="text-theme-text-muted mb-2">From {startDate} to {endDate}</p>
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

              {/* Alternative Representations */}
              <h3 className="text-lg font-semibold text-theme-text mb-4">Alternative representations</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalDays)}</p>
                  <p className="text-sm text-theme-text-muted">Total Days</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalWeeks)}</p>
                  <p className="text-sm text-theme-text-muted">Total Weeks</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalMonths)}</p>
                  <p className="text-sm text-theme-text-muted">Total Months</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalHours)}</p>
                  <p className="text-sm text-theme-text-muted">Total Hours</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalMinutes)}</p>
                  <p className="text-sm text-theme-text-muted">Total Minutes</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalSeconds)}</p>
                  <p className="text-sm text-theme-text-muted">Total Seconds</p>
                </div>
              </div>

              {/* Weeks and Days */}
              <div className="mt-6 bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                <p className="text-lg text-theme-text">
                  Or <span className="font-bold text-gradient">{result.totalWeeks} weeks</span> and{" "}
                  <span className="font-bold text-gradient">{result.totalDays % 7} days</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Info Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-theme-text mb-4">How to Use</h2>
            <ul className="space-y-3 text-theme-text-muted">
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">1</span>
                </span>
                <span>Select your start date using the date picker or click &quot;Today&quot; for the current date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">2</span>
                </span>
                <span>Select your end date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">3</span>
                </span>
                <span>Choose whether to include the end date in the calculation (adds 1 day)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">4</span>
                </span>
                <span>Click &quot;Calculate Duration&quot; to see the result in multiple formats</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DateDurationCalculator;
