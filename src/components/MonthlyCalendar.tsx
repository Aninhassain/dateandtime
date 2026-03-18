"use client";

import { useState } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MonthlyCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateMonthDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
    const days: { day: number; currentMonth: boolean; isToday: boolean }[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false, isToday: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        today.getDate() === i &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
      days.push({ day: i, currentMonth: true, isToday });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false, isToday: false });
    }

    return days;
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent/10 border border-theme-accent/20 mb-4">
            <CalendarCheck className="w-4 h-4 text-theme-accent" />
            <span className="text-sm text-theme-accent">Interactive Calendar</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Monthly</span>{" "}
            <span className="text-theme-text">Calendar</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Navigate through months and years
          </p>
        </header>

        <section className="max-w-5xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={prevMonth}
                className="p-3 rounded-lg border border-theme-border hover:bg-theme-surface transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-theme-text" />
              </button>

              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gradient">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <button
                  type="button"
                  onClick={goToToday}
                  className="text-sm text-theme-primary hover:underline mt-1"
                >
                  Go to Today
                </button>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="p-3 rounded-lg border border-theme-border hover:bg-theme-surface transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-theme-text" />
              </button>
            </div>

            {/* Year selector */}
            <div className="flex justify-center gap-2 mb-6">
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className="px-4 py-2 rounded-lg"
              >
                {monthNames.map((month, idx) => (
                  <option key={month} value={idx}>{month}</option>
                ))}
              </select>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="px-4 py-2 rounded-lg"
              >
                {Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-theme-text-muted font-semibold py-2 text-sm md:text-base">
                  <span className="hidden md:inline">{day}</span>
                  <span className="md:hidden">{day.slice(0, 3)}</span>
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {generateMonthDays().map((dayInfo, idx) => (
                <div
                  key={idx}
                  className={`text-center py-3 md:py-4 rounded-lg transition-colors ${
                    dayInfo.isToday
                      ? "bg-theme-primary text-white font-bold ring-2 ring-theme-primary ring-offset-2 ring-offset-transparent"
                      : dayInfo.currentMonth
                      ? "bg-theme-surface/50 text-theme-text hover:bg-theme-primary/20 cursor-pointer"
                      : "text-theme-text-muted/50"
                  }`}
                >
                  {dayInfo.day}
                </div>
              ))}
            </div>

            {/* Today info */}
            <div className="mt-6 p-4 bg-theme-surface/30 rounded-lg text-center">
              <p className="text-theme-text-muted">
                Today is{" "}
                <span className="font-semibold text-theme-text">
                  {dayNames[today.getDay()]}, {monthNames[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MonthlyCalendar;
