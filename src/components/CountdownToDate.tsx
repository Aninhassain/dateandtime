"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Clock, Hourglass, Play } from "lucide-react";

type DisplayFormat = "weeks" | "days" | "justDays";

interface CountdownValues {
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  isExpired: boolean;
}

const CountdownToDate = () => {
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00:00");
  const [displayFormat, setDisplayFormat] = useState<DisplayFormat>("days");
  const [stopAtZero, setStopAtZero] = useState(true);
  const [countdown, setCountdown] = useState<CountdownValues | null>(null);
  const [isActive, setIsActive] = useState(false);

  const calculateCountdown = useCallback((): CountdownValues => {
    if (!targetDate) {
      return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0, isExpired: true };
    }

    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0, isExpired: true };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const weeks = Math.floor(totalDays / 7);

    return {
      weeks,
      days: displayFormat === "weeks" ? totalDays % 7 : totalDays,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
      totalDays,
      isExpired: false,
    };
  }, [targetDate, targetTime, displayFormat]);

  const startCountdown = () => {
    if (targetDate) {
      setIsActive(true);
      setCountdown(calculateCountdown());
    }
  };

  const resetCountdown = () => {
    setIsActive(false);
    setCountdown(null);
    setTitle("");
    setTargetDate("");
    setTargetTime("00:00:00");
    setDisplayFormat("days");
    setStopAtZero(true);
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newCountdown = calculateCountdown();
      setCountdown(newCountdown);

      if (newCountdown.isExpired && stopAtZero) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, calculateCountdown, stopAtZero]);

  const getTargetDateFormatted = () => {
    if (!targetDate) return "";
    const date = new Date(`${targetDate}T${targetTime}`);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
            <span className="text-gradient">Countdown</span>{" "}
            <span className="text-theme-text">Timer</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Create a countdown to any future date and time
          </p>
        </header>

        {/* Countdown Display (when active) */}
        {isActive && countdown && (
          <section className="max-w-5xl mx-auto mb-12 animate-fade-in">
            <div className="result-card overflow-hidden">
              {/* Title Preview */}
              <div className="bg-theme-surface/80 -mx-6 md:-mx-8 -mt-6 md:-mt-8 px-6 md:px-8 py-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-theme-text" style={{ fontFamily: "cursive" }}>
                  {title || "Countdown Timer"}
                </h2>
              </div>

              {/* Countdown Display */}
              <div className="grid grid-cols-4 gap-4 md:gap-8 mb-8">
                {displayFormat === "weeks" && (
                  <div className="text-center">
                    <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text">
                      {countdown.weeks}
                    </div>
                    <div className="text-sm md:text-base text-theme-text-muted uppercase tracking-wider mt-2">
                      Weeks
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text">
                    {countdown.days}
                  </div>
                  <div className="text-sm md:text-base text-theme-text-muted uppercase tracking-wider mt-2">
                    Days
                  </div>
                </div>
                {displayFormat !== "justDays" && (
                  <>
                    <div className="text-center">
                      <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text">
                        {countdown.hours}
                      </div>
                      <div className="text-sm md:text-base text-theme-text-muted uppercase tracking-wider mt-2">
                        Hours
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text">
                        {countdown.minutes}
                      </div>
                      <div className="text-sm md:text-base text-theme-text-muted uppercase tracking-wider mt-2">
                        Minutes
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient">
                        {countdown.seconds}
                      </div>
                      <div className="text-sm md:text-base text-theme-text-muted uppercase tracking-wider mt-2">
                        Seconds
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Target Date */}
              <div className="text-center py-4 bg-theme-surface/50 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8">
                <p className="text-theme-text-muted">
                  Time until <span className="text-theme-text font-medium">{getTargetDateFormatted()}</span>
                </p>
              </div>

              {countdown.isExpired && (
                <div className="absolute inset-0 bg-theme-surface/90 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Time&apos;s Up!</h3>
                    <button
                      type="button"
                      onClick={resetCountdown}
                      className="btn-primary"
                    >
                      Create New Countdown
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Configuration Form */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            {/* Title Input */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Countdown Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event Name..."
                className="w-full"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">
                  Target Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">
                  Target Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="time"
                    value={targetTime.slice(0, 5)}
                    onChange={(e) => setTargetTime(e.target.value + ":00")}
                    className="w-full pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Display Format Options */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Display Format
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={displayFormat === "weeks"}
                    onChange={() => setDisplayFormat("weeks")}
                  />
                  <span className="text-theme-text">Weeks / Days / Hours / Minutes / Seconds</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={displayFormat === "days"}
                    onChange={() => setDisplayFormat("days")}
                  />
                  <span className="text-theme-text">Days / Hours / Minutes / Seconds</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    checked={displayFormat === "justDays"}
                    onChange={() => setDisplayFormat("justDays")}
                  />
                  <span className="text-theme-text">Just Days</span>
                </label>
              </div>
            </div>

            {/* Stop at Zero Option */}
            <div className="mb-6 pb-6 border-b border-theme-border">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stopAtZero}
                  onChange={(e) => setStopAtZero(e.target.checked)}
                />
                <span className="text-theme-text">Stop countdown at zero</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={startCountdown}
                disabled={!targetDate}
                className="btn-primary flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Create Countdown
              </button>
              <button
                type="button"
                onClick={resetCountdown}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CountdownToDate;
