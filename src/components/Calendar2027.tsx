"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar2027 = () => {
  const year = 2027;
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const getDaysInMonth = (month: number, yr: number) => {
    return new Date(yr, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, yr: number) => {
    return new Date(yr, month, 1).getDay();
  };

  const generateMonthDays = (month: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 0 || dayIndex === 6;
  };

  const isToday = (month: number, day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary/10 border border-theme-secondary/20 mb-4">
            <Calendar className="w-4 h-4 text-theme-secondary" />
            <span className="text-sm text-theme-secondary">Year Calendar</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Calendar</span>{" "}
            <span className="text-theme-text">2027</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Full year calendar for 2027 with all months
          </p>
        </header>

        {selectedMonth === null ? (
          <section className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {monthNames.map((month, monthIndex) => (
                <div
                  key={month}
                  className="glass-card p-4 cursor-pointer hover:border-theme-secondary/50 transition-all"
                  onClick={() => setSelectedMonth(monthIndex)}
                >
                  <h3 className="text-lg font-semibold text-theme-text mb-3 text-center">{month}</h3>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-theme-text-muted font-medium py-1">
                        {day.charAt(0)}
                      </div>
                    ))}
                    {generateMonthDays(monthIndex).map((day, idx) => (
                      <div
                        key={idx}
                        className={`text-center py-1 rounded ${
                          day === null
                            ? ""
                            : isToday(monthIndex, day)
                            ? "bg-theme-secondary text-white font-bold"
                            : isWeekend(idx % 7)
                            ? "text-theme-text-muted"
                            : "text-theme-text"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="max-w-4xl mx-auto">
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedMonth(selectedMonth > 0 ? selectedMonth - 1 : 11)}
                  className="p-2 rounded-lg border border-theme-border hover:bg-theme-surface transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-theme-text" />
                </button>
                <h2 className="text-2xl font-bold text-gradient">{monthNames[selectedMonth]} {year}</h2>
                <button
                  type="button"
                  onClick={() => setSelectedMonth(selectedMonth < 11 ? selectedMonth + 1 : 0)}
                  className="p-2 rounded-lg border border-theme-border hover:bg-theme-surface transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-theme-text" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-theme-text-muted font-semibold py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {generateMonthDays(selectedMonth).map((day, idx) => (
                  <div
                    key={idx}
                    className={`text-center py-3 rounded-lg ${
                      day === null
                        ? ""
                        : isToday(selectedMonth, day)
                        ? "bg-theme-secondary text-white font-bold"
                        : isWeekend(idx % 7)
                        ? "bg-theme-surface/30 text-theme-text-muted"
                        : "bg-theme-surface/50 text-theme-text hover:bg-theme-secondary/20"
                    } ${day !== null ? "cursor-pointer transition-colors" : ""}`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedMonth(null)}
                className="mt-6 w-full btn-secondary"
              >
                View All Months
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Calendar2027;
