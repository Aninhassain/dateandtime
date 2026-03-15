"use client";

import { useState, useCallback } from "react";
import { Calendar, CalendarDays, Search } from "lucide-react";

interface WeekdayResult {
  date: Date;
  formattedDate: string;
  dayOfWeek: string;
  dayNumber: number;
  isWeekend: boolean;
  isLeapYear: boolean;
  daysInMonth: number;
  weekNumber: number;
  dayOfYear: number;
  quarter: number;
  daysUntilEndOfYear: number;
  zodiacSign: string;
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

const getQuarter = (date: Date): number => {
  return Math.ceil((date.getMonth() + 1) / 3);
};

const getDaysUntilEndOfYear = (date: Date): number => {
  const endOfYear = new Date(date.getFullYear(), 11, 31);
  const diff = endOfYear.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const getZodiacSign = (month: number, day: number): string => {
  const signs = [
    { sign: "Capricorn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { sign: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { sign: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { sign: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { sign: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { sign: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { sign: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { sign: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  ];

  for (const zodiac of signs) {
    if (zodiac.startMonth === 12) {
      if ((month === 12 && day >= zodiac.startDay) || (month === 1 && day <= zodiac.endDay)) {
        return zodiac.sign;
      }
    } else {
      if ((month === zodiac.startMonth && day >= zodiac.startDay) ||
          (month === zodiac.endMonth && day <= zodiac.endDay)) {
        return zodiac.sign;
      }
    }
  }
  return "Unknown";
};

const WeekdayCalculator = () => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [result, setResult] = useState<WeekdayResult | null>(null);

  const calculate = useCallback(() => {
    if (!selectedDate) return;

    const date = new Date(selectedDate);
    const dayOfWeek = getDayOfWeek(date);
    const dayNumber = date.getDay();

    setResult({
      date,
      formattedDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dayOfWeek,
      dayNumber,
      isWeekend: dayNumber === 0 || dayNumber === 6,
      isLeapYear: isLeapYear(date.getFullYear()),
      daysInMonth: getDaysInMonth(date.getFullYear(), date.getMonth()),
      weekNumber: getWeekNumber(date),
      dayOfYear: getDayOfYear(date),
      quarter: getQuarter(date),
      daysUntilEndOfYear: getDaysUntilEndOfYear(date),
      zodiacSign: getZodiacSign(date.getMonth() + 1, date.getDate()),
    });
  }, [selectedDate]);

  const resetForm = () => {
    setSelectedDate(today);
    setResult(null);
  };

  const setToday = () => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary/10 border border-theme-secondary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-secondary animate-pulse" />
            <span className="text-sm text-theme-secondary">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Weekday</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            What day of the week was I born? Enter any date to find out the weekday and other fun facts.
          </p>
        </header>

        {/* Calculator Card */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            {/* Date Input */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Enter Date
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={calculate}
                className="btn-primary flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Show
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
                <span className="w-8 h-8 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-theme-secondary" />
                </span>
                Result
              </h2>

              {/* Primary Result */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <p className="text-theme-text-muted mb-2">
                  {result.formattedDate}
                </p>
                <p className="text-4xl md:text-5xl font-bold text-gradient">
                  {result.dayOfWeek}
                </p>
                <p className="text-theme-text-muted mt-2">
                  {result.isWeekend ? "Weekend" : "Weekday"}
                </p>
              </div>

              {/* Date Facts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Week {result.weekNumber}</p>
                  <p className="text-sm text-theme-text-muted">Week of Year</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Day {result.dayOfYear}</p>
                  <p className="text-sm text-theme-text-muted">Day of Year</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Q{result.quarter}</p>
                  <p className="text-sm text-theme-text-muted">Quarter</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.daysInMonth}</p>
                  <p className="text-sm text-theme-text-muted">Days in Month</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.daysUntilEndOfYear}</p>
                  <p className="text-sm text-theme-text-muted">Days Until Year End</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">
                    {result.isLeapYear ? "Yes" : "No"}
                  </p>
                  <p className="text-sm text-theme-text-muted">Leap Year</p>
                </div>
              </div>

              {/* Zodiac Sign */}
              <div className="mt-6 bg-theme-primary/10 rounded-lg p-4 border border-theme-primary/20">
                <p className="text-sm text-theme-text-muted">
                  <strong className="text-theme-text">Zodiac Sign:</strong> {result.zodiacSign}
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default WeekdayCalculator;
