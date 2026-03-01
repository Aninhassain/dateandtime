"use client";

import { useState, useCallback } from "react";
import { Calendar, Briefcase, RefreshCw } from "lucide-react";

interface BusinessDaysResult {
  businessDays: number;
  totalDays: number;
  weekends: number;
  saturdayCount: number;
  sundayCount: number;
  startDayName: string;
  endDayName: string;
}

const getDayName = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

const BusinessDaysCalculator = () => {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [excludeSaturday, setExcludeSaturday] = useState<boolean>(true);
  const [excludeSunday, setExcludeSunday] = useState<boolean>(true);
  const [result, setResult] = useState<BusinessDaysResult | null>(null);

  const calculateBusinessDays = useCallback(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure start is before end
    const actualStart = start <= end ? start : end;
    const actualEnd = start <= end ? end : start;

    let businessDays = 0;
    let saturdayCount = 0;
    let sundayCount = 0;
    let totalDays = 0;

    const current = new Date(actualStart);

    while (current <= actualEnd) {
      totalDays++;
      const dayOfWeek = current.getDay();

      if (dayOfWeek === 0) {
        sundayCount++;
        if (!excludeSunday) businessDays++;
      } else if (dayOfWeek === 6) {
        saturdayCount++;
        if (!excludeSaturday) businessDays++;
      } else {
        businessDays++;
      }

      current.setDate(current.getDate() + 1);
    }

    setResult({
      businessDays,
      totalDays,
      weekends: saturdayCount + sundayCount,
      saturdayCount,
      sundayCount,
      startDayName: getDayName(actualStart),
      endDayName: getDayName(actualEnd),
    });
  }, [startDate, endDate, excludeSaturday, excludeSunday]);

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
    setExcludeSaturday(true);
    setExcludeSunday(true);
    setResult(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
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
            <span className="text-gradient">Business Days</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate the number of working days between two dates, excluding weekends
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

            {/* Weekend Options */}
            <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-theme-border">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeSaturday}
                  onChange={(e) => setExcludeSaturday(e.target.checked)}
                />
                <span className="text-sm text-theme-text">Exclude Saturdays</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeSunday}
                  onChange={(e) => setExcludeSunday(e.target.checked)}
                />
                <span className="text-sm text-theme-text">Exclude Sundays</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={calculateBusinessDays}
                className="btn-primary flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Calculate Business Days
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
                  <Briefcase className="w-4 h-4 text-theme-primary" />
                </span>
                Business Days Result
              </h2>

              {/* Primary Result */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <p className="text-theme-text-muted mb-2">
                  From {startDate} ({result.startDayName}) to {endDate} ({result.endDayName})
                </p>
                <div className="text-4xl md:text-5xl font-bold">
                  <span className="text-gradient">{result.businessDays}</span>
                  <span className="text-lg font-normal text-theme-text-muted ml-3">
                    business day{result.businessDays !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalDays}</p>
                  <p className="text-sm text-theme-text-muted">Total Days</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.weekends}</p>
                  <p className="text-sm text-theme-text-muted">Weekend Days</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.saturdayCount}</p>
                  <p className="text-sm text-theme-text-muted">Saturdays</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.sundayCount}</p>
                  <p className="text-sm text-theme-text-muted">Sundays</p>
                </div>
              </div>

              {/* Info Note */}
              <div className="mt-6 bg-theme-primary/10 rounded-lg p-4 border border-theme-primary/20">
                <p className="text-sm text-theme-text-muted">
                  <strong className="text-theme-text">Note:</strong> This calculation excludes{" "}
                  {excludeSaturday && excludeSunday
                    ? "Saturdays and Sundays"
                    : excludeSaturday
                    ? "Saturdays only"
                    : excludeSunday
                    ? "Sundays only"
                    : "no days"}{" "}
                  from the count. Public holidays are not excluded.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BusinessDaysCalculator;
