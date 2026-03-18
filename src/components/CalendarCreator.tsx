"use client";

import { useState } from "react";
import { Palette, Download, Calendar } from "lucide-react";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const mondayFirstDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const themes = [
  { name: "Default", headerBg: "bg-theme-primary", dayBg: "bg-theme-surface/50", accent: "text-theme-primary" },
  { name: "Ocean", headerBg: "bg-blue-600", dayBg: "bg-blue-50", accent: "text-blue-600" },
  { name: "Forest", headerBg: "bg-green-600", dayBg: "bg-green-50", accent: "text-green-600" },
  { name: "Sunset", headerBg: "bg-orange-500", dayBg: "bg-orange-50", accent: "text-orange-500" },
  { name: "Berry", headerBg: "bg-purple-600", dayBg: "bg-purple-50", accent: "text-purple-600" },
  { name: "Minimal", headerBg: "bg-gray-800", dayBg: "bg-gray-50", accent: "text-gray-800" },
];

const CalendarCreator = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [startOnMonday, setStartOnMonday] = useState(false);
  const [showHolidays, setShowHolidays] = useState(true);
  const [calendarTitle, setCalendarTitle] = useState("My Calendar");

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return startOnMonday ? (day === 0 ? 6 : day - 1) : day;
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

  const orderedDays = startOnMonday ? mondayFirstDays : dayNames;

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none print:hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent/10 border border-theme-accent/20 mb-4">
            <Palette className="w-4 h-4 text-theme-accent" />
            <span className="text-sm text-theme-accent">Custom Design</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Calendar</span>{" "}
            <span className="text-theme-text">Creator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Design custom calendars with your preferences
          </p>
        </header>

        {/* Controls */}
        <section className="max-w-4xl mx-auto mb-8 print:hidden">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-theme-text">Calendar Title</label>
                  <input
                    type="text"
                    value={calendarTitle}
                    onChange={(e) => setCalendarTitle(e.target.value)}
                    placeholder="My Calendar"
                    className="w-full"
                  />
                </div>
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
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-theme-text">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        type="button"
                        onClick={() => setSelectedTheme(theme)}
                        className={`p-2 rounded-lg text-sm border transition-all ${
                          selectedTheme.name === theme.name
                            ? "border-theme-primary bg-theme-primary/10"
                            : "border-theme-border hover:border-theme-primary"
                        }`}
                      >
                        <div className={`w-full h-4 rounded ${theme.headerBg} mb-1`} />
                        <span className="text-theme-text">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-theme-text">Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={startOnMonday}
                        onChange={(e) => setStartOnMonday(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-theme-text">Start week on Monday</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="mt-6 w-full btn-primary flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Print / Save as PDF
            </button>
          </div>
        </section>

        {/* Calendar Preview */}
        <section className="max-w-7xl mx-auto print:max-w-full">
          <div className="glass-card p-6 md:p-8 print:bg-white print:p-4 print:shadow-none">
            <h2 className={`text-3xl font-bold text-center mb-8 ${selectedTheme.accent} print:text-black`}>
              {calendarTitle} - {selectedYear}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 print:grid-cols-3 print:gap-4">
              {monthNames.map((month, monthIndex) => (
                <div
                  key={month}
                  className="border border-theme-border rounded-lg overflow-hidden print:border-gray-300"
                >
                  <div className={`${selectedTheme.headerBg} text-white py-2 px-3 text-center font-semibold`}>
                    {month}
                  </div>
                  <div className="p-2">
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {orderedDays.map((day) => (
                        <div key={day} className={`text-center font-medium py-1 ${selectedTheme.accent}`}>
                          {day.charAt(0)}
                        </div>
                      ))}
                      {generateMonthDays(monthIndex).map((day, idx) => (
                        <div
                          key={idx}
                          className={`text-center py-1 rounded text-sm ${
                            day === null ? "" : `${selectedTheme.dayBg} text-gray-800`
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
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

export default CalendarCreator;
