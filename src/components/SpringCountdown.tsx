"use client";

import { useState, useEffect, useCallback } from "react";
import { Flower2, Sun } from "lucide-react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetDate: Date;
}

const SpringCountdown = () => {
  const [countdown, setCountdown] = useState<CountdownValues | null>(null);

  const getNextSpringEquinox = useCallback((): Date => {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Spring equinox is typically March 20 (Northern Hemisphere)
    let springDate = new Date(currentYear, 2, 20, 0, 0, 0);

    // If spring has passed this year, get next year's spring
    if (now > springDate) {
      springDate = new Date(currentYear + 1, 2, 20, 0, 0, 0);
    }

    return springDate;
  }, []);

  const calculateCountdown = useCallback((): CountdownValues => {
    const targetDate = getNextSpringEquinox();
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
  }, [getNextSpringEquinox]);

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
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <Flower2 className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">Spring is Coming</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Spring Countdown
            </span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Countdown to the first day of spring
          </p>
        </header>

        {/* Countdown Display */}
        <section className="max-w-5xl mx-auto mb-12">
          <div className="glass-card p-8 md:p-12 overflow-hidden relative">
            {/* Decorative flowers */}
            <div className="absolute top-4 left-4 text-pink-400/30">
              <Flower2 className="w-12 h-12" />
            </div>
            <div className="absolute top-4 right-4 text-green-400/30">
              <Sun className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 left-8 text-yellow-400/30">
              <Flower2 className="w-8 h-8" />
            </div>
            <div className="absolute bottom-4 right-8 text-pink-400/30">
              <Flower2 className="w-10 h-10" />
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
                <div className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
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
                Time until <span className="font-semibold text-green-500">{formatTargetDate(countdown.targetDate)}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-green-500" />
              About Spring Equinox
            </h2>
            <div className="space-y-4 text-theme-text-muted">
              <p>
                The spring equinox, also known as the vernal equinox, marks the official start of spring in the Northern Hemisphere. It typically occurs on March 19, 20, or 21 each year.
              </p>
              <p>
                On this day, the Sun crosses the celestial equator moving northward, resulting in nearly equal hours of daylight and darkness worldwide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">12 hrs</p>
                  <p className="text-sm text-theme-text-muted">Approx. Daylight</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">March 20</p>
                  <p className="text-sm text-theme-text-muted">Typical Date</p>
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

export default SpringCountdown;
