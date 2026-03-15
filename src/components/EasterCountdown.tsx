"use client";

import { useState, useEffect, useCallback } from "react";
import { Egg, Sparkles } from "lucide-react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetDate: Date;
}

const EasterCountdown = () => {
  const [countdown, setCountdown] = useState<CountdownValues | null>(null);

  // Calculate Easter Sunday using the Anonymous Gregorian algorithm
  const calculateEaster = useCallback((year: number): Date => {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month, day, 0, 0, 0);
  }, []);

  const getNextEaster = useCallback((): Date => {
    const now = new Date();
    const currentYear = now.getFullYear();

    let easterDate = calculateEaster(currentYear);

    // If Easter has passed this year, get next year's Easter
    if (now > easterDate) {
      easterDate = calculateEaster(currentYear + 1);
    }

    return easterDate;
  }, [calculateEaster]);

  const calculateCountdown = useCallback((): CountdownValues => {
    const targetDate = getNextEaster();
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, targetDate };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    return {
      days,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
      targetDate,
    };
  }, [getNextEaster]);

  useEffect(() => {
    setCountdown(calculateCountdown());

    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateCountdown]);

  const formatTargetDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!countdown) return null;

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
            <Egg className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-500">Easter is Coming</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "cursive" }}>
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Easter Countdown
            </span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Countdown to Easter Sunday
          </p>
        </header>

        {/* Countdown Display */}
        <section className="max-w-5xl mx-auto mb-12">
          <div className="glass-card p-8 md:p-12 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-pink-400/30">
              <Egg className="w-12 h-12" />
            </div>
            <div className="absolute top-4 right-4 text-purple-400/30">
              <Sparkles className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 left-8 text-yellow-400/30">
              <Egg className="w-8 h-8" />
            </div>
            <div className="absolute bottom-4 right-8 text-cyan-400/30">
              <Egg className="w-10 h-10" />
            </div>

            {/* Countdown Numbers */}
            <div className="grid grid-cols-4 gap-4 md:gap-8 mb-8 relative z-10">
              <div className="text-center">
                <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text">
                  {countdown.days}
                </div>
                <div className="text-sm md:text-base text-theme-text-muted uppercase tracking-wider mt-2">
                  Days
                </div>
              </div>
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
                <div className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {countdown.seconds}
                </div>
                <div className="text-sm md:text-base text-theme-text-muted uppercase tracking-wider mt-2">
                  Seconds
                </div>
              </div>
            </div>

            {/* Target Date */}
            <div className="text-center py-4 bg-theme-surface/50 -mx-8 md:-mx-12 -mb-8 md:-mb-12 px-8 md:px-12 mt-4">
              <p className="text-theme-text">
                Time until <span className="font-semibold text-pink-500">{formatTargetDate(countdown.targetDate)}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
              <Egg className="w-5 h-5 text-pink-500" />
              About Easter
            </h2>
            <div className="space-y-4 text-theme-text-muted">
              <p>
                Easter is a Christian holiday celebrating the resurrection of Jesus Christ. It is observed on a Sunday between March 22 and April 25, following the first full moon after the spring equinox.
              </p>
              <p>
                The date of Easter changes each year because it is based on the lunar calendar. It falls on the first Sunday following the Paschal Full Moon.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Sunday</p>
                  <p className="text-sm text-theme-text-muted">Always Falls On</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Mar-Apr</p>
                  <p className="text-sm text-theme-text-muted">Date Range</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Renewal</p>
                  <p className="text-sm text-theme-text-muted">Symbol</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EasterCountdown;
