"use client";

import { useState, useCallback } from "react";
import { Calendar, Clock, CalendarClock } from "lucide-react";

interface DurationResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

const DateTimeDurationCalculator = () => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const [startDate, setStartDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endDate, setEndDate] = useState<string>(today);
  const [endTime, setEndTime] = useState<string>("17:00");
  const [result, setResult] = useState<DurationResult | null>(null);

  const calculate = useCallback(() => {
    const start = new Date(`${startDate}T${startTime}:00`);
    const end = new Date(`${endDate}T${endTime}:00`);

    const diffMs = Math.abs(end.getTime() - start.getTime());

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Calculate breakdown
    let years = 0;
    let months = 0;
    let days = 0;

    const earlier = start < end ? start : end;
    const later = start < end ? end : start;

    const tempDate = new Date(earlier);

    // Count years
    while (true) {
      const nextYear = new Date(tempDate);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      if (nextYear <= later) {
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
      if (nextMonth <= later) {
        months++;
        tempDate.setMonth(tempDate.getMonth() + 1);
      } else {
        break;
      }
    }

    // Count remaining days, hours, minutes, seconds
    const remainingMs = later.getTime() - tempDate.getTime();
    days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const remainingAfterDays = remainingMs % (1000 * 60 * 60 * 24);
    const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
    const remainingAfterHours = remainingAfterDays % (1000 * 60 * 60);
    const minutes = Math.floor(remainingAfterHours / (1000 * 60));
    const seconds = Math.floor((remainingAfterHours % (1000 * 60)) / 1000);

    setResult({
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    });
  }, [startDate, startTime, endDate, endTime]);

  const setNow = (field: "start" | "end") => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    if (field === "start") {
      setStartDate(date);
      setStartTime(time);
    } else {
      setEndDate(date);
      setEndTime(time);
    }
  };

  const resetForm = () => {
    setStartDate(today);
    setStartTime("09:00");
    setEndDate(today);
    setEndTime("17:00");
    setResult(null);
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
            <span className="w-2 h-2 rounded-full bg-theme-secondary animate-pulse" />
            <span className="text-sm text-theme-secondary">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">DateTime Duration</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate exact duration between two dates and times
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            {/* Start DateTime */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-theme-text mb-2">Start Date & Time</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
                <button type="button" onClick={() => setNow("start")} className="btn-secondary">
                  Now
                </button>
              </div>
            </div>

            {/* End DateTime */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-theme-text mb-2">End Date & Time</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
                <button type="button" onClick={() => setNow("end")} className="btn-secondary">
                  Now
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={calculate} className="btn-primary flex items-center gap-2">
                <CalendarClock className="w-4 h-4" />
                Calculate Duration
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Reset
              </button>
            </div>
          </div>
        </section>

        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                  <CalendarClock className="w-4 h-4 text-theme-secondary" />
                </span>
                Duration Result
              </h2>

              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <div className="text-2xl md:text-3xl font-bold text-theme-text">
                  {result.years > 0 && <span className="text-gradient">{result.years} year{result.years !== 1 ? "s" : ""} </span>}
                  {result.months > 0 && <span className="text-gradient">{result.months} month{result.months !== 1 ? "s" : ""} </span>}
                  {result.days > 0 && <span className="text-gradient">{result.days} day{result.days !== 1 ? "s" : ""} </span>}
                  {result.hours > 0 && <span className="text-gradient">{result.hours} hour{result.hours !== 1 ? "s" : ""} </span>}
                  {result.minutes > 0 && <span className="text-gradient">{result.minutes} minute{result.minutes !== 1 ? "s" : ""} </span>}
                  {result.seconds > 0 && <span className="text-gradient">{result.seconds} second{result.seconds !== 1 ? "s" : ""}</span>}
                  {result.years === 0 && result.months === 0 && result.days === 0 && result.hours === 0 && result.minutes === 0 && result.seconds === 0 && (
                    <span className="text-gradient">0 seconds</span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-theme-text mb-4">Total Counts</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalDays.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Days</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalHours.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Hours</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalMinutes.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Minutes</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalSeconds.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Seconds</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DateTimeDurationCalculator;
