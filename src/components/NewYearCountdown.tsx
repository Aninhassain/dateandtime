"use client";

import { useState, useEffect, useCallback } from "react";
import { PartyPopper, Sparkles, Star } from "lucide-react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetYear: number;
}

const NewYearCountdown = () => {
  const [countdown, setCountdown] = useState<CountdownValues | null>(null);

  const getNextNewYear = useCallback((): { date: Date; year: number } => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYearDate = new Date(nextYear, 0, 1, 0, 0, 0);

    return { date: newYearDate, year: nextYear };
  }, []);

  const calculateCountdown = useCallback((): CountdownValues => {
    const { date: targetDate, year: targetYear } = getNextNewYear();
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, targetYear };
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
      targetYear,
    };
  }, [getNextNewYear]);

  useEffect(() => {
    setCountdown(calculateCountdown());

    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateCountdown]);

  if (!countdown) return null;

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects - Dark blue night sky feel */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
        {/* Stars */}
        <div className="absolute top-20 left-1/4 text-yellow-400/40">
          <Star className="w-4 h-4" />
        </div>
        <div className="absolute top-32 right-1/3 text-yellow-400/30">
          <Star className="w-3 h-3" />
        </div>
        <div className="absolute top-40 left-1/3 text-yellow-400/20">
          <Star className="w-2 h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
            <PartyPopper className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-yellow-500">New Year is Coming</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "cursive" }}>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              New Year Countdown
            </span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Countdown to {countdown.targetYear}
          </p>
        </header>

        {/* Countdown Display */}
        <section className="max-w-5xl mx-auto mb-12">
          <div className="glass-card p-8 md:p-12 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-yellow-400/30">
              <PartyPopper className="w-12 h-12" />
            </div>
            <div className="absolute top-4 right-4 text-orange-400/30">
              <Sparkles className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 left-8 text-red-400/30">
              <Star className="w-8 h-8" />
            </div>
            <div className="absolute bottom-4 right-8 text-yellow-400/30">
              <PartyPopper className="w-10 h-10 transform -scale-x-100" />
            </div>

            {/* Year Display */}
            <div className="text-center mb-8">
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {countdown.targetYear}
              </span>
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
                Time until <span className="font-semibold text-yellow-500">Friday, 1 January {countdown.targetYear}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
              <PartyPopper className="w-5 h-5 text-yellow-500" />
              New Year Celebrations
            </h2>
            <div className="space-y-4 text-theme-text-muted">
              <p>
                New Year&apos;s Day marks the beginning of a new calendar year. It is celebrated worldwide with fireworks, parties, and festivities at midnight on December 31st.
              </p>
              <p>
                The tradition of making New Year&apos;s resolutions dates back to ancient Babylon, where people made promises to the gods at the start of each year.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Jan 1</p>
                  <p className="text-sm text-theme-text-muted">New Year&apos;s Day</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Midnight</p>
                  <p className="text-sm text-theme-text-muted">Celebration Time</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">Worldwide</p>
                  <p className="text-sm text-theme-text-muted">Celebrated</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewYearCountdown;
