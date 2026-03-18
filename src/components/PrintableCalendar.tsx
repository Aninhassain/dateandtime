"use client";

import { useState } from "react";
import { Printer, Download, Calendar } from "lucide-react";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PrintableCalendar = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);
  const [startOnMonday, setStartOnMonday] = useState(false);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return startOnMonday ? (day === 0 ? 6 : day - 1) : day;
  };

  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const generateMonthDays = (month: number) => {
    const daysInMonth = getDaysInMonth(month, selectedYear);
    const firstDay = getFirstDayOfMonth(month, selectedYear);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrint = () => {
    window.print();
  };

  const orderedDays = startOnMonday
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : dayNames;

  const monthsToShow = selectedMonth === "all"
    ? Array.from({ length: 12 }, (_, i) => i)
    : [selectedMonth];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none print:hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <Printer className="w-4 h-4 text-theme-primary" />
            <span className="text-sm text-theme-primary">Printable</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Printable</span>{" "}
            <span className="text-theme-text">Calendar</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Generate and print calendars for any year
          </p>
        </header>

        {/* Controls */}
        <section className="max-w-4xl mx-auto mb-8 print:hidden">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full"
                >
                  {Array.from({ length: 11 }, (_, i) => currentYear - 5 + i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value === "all" ? "all" : parseInt(e.target.value))}
                  className="w-full"
                >
                  <option value="all">All Months</option>
                  {monthNames.map((month, idx) => (
                    <option key={month} value={idx}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Options</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showWeekNumbers}
                      onChange={(e) => setShowWeekNumbers(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-theme-text">Week numbers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={startOnMonday}
                      onChange={(e) => setStartOnMonday(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-theme-text">Start on Monday</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Actions</label>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Printable Calendar */}
        <section className="max-w-7xl mx-auto print:max-w-full">
          <div className="print:p-0">
            <h2 className="text-3xl font-bold text-center text-theme-text mb-8 print:text-black print:mb-4">
              {selectedYear} Calendar
            </h2>
            <div className={`grid gap-6 print:gap-4 ${selectedMonth === "all" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3" : "grid-cols-1"}`}>
              {monthsToShow.map((monthIndex) => (
                <div
                  key={monthIndex}
                  className="glass-card p-4 print:border print:border-gray-300 print:bg-white print:p-2"
                >
                  <h3 className="text-xl font-semibold text-theme-text mb-3 text-center print:text-black print:text-lg">
                    {monthNames[monthIndex]}
                  </h3>
                  <div className={`grid gap-1 text-sm ${showWeekNumbers ? "grid-cols-8" : "grid-cols-7"}`}>
                    {showWeekNumbers && (
                      <div className="text-center text-theme-text-muted font-medium py-1 print:text-gray-500">
                        Wk
                      </div>
                    )}
                    {orderedDays.map((day) => (
                      <div key={day} className="text-center text-theme-text-muted font-medium py-1 print:text-gray-500">
                        {day}
                      </div>
                    ))}
                    {generateMonthDays(monthIndex).map((day, idx) => {
                      const isFirstOfWeek = idx % 7 === 0;
                      const weekNum = day && isFirstOfWeek ? getWeekNumber(new Date(selectedYear, monthIndex, day)) : null;
                      return (
                        <>
                          {showWeekNumbers && isFirstOfWeek && (
                            <div key={`week-${idx}`} className="text-center text-theme-text-muted text-xs py-2 print:text-gray-400">
                              {weekNum || ""}
                            </div>
                          )}
                          <div
                            key={idx}
                            className={`text-center py-2 rounded print:rounded-none ${
                              day === null
                                ? ""
                                : "text-theme-text print:text-black hover:bg-theme-surface/50"
                            }`}
                          >
                            {day}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrintableCalendar;
