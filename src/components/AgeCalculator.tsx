"use client";

import { useState, useCallback } from "react";
import { Cake, Calendar, Heart } from "lucide-react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: string;
  daysUntilBirthday: number;
  dayOfBirth: string;
  zodiacSign: string;
}

const zodiacSigns = [
  { sign: "Capricorn", start: [12, 22], end: [1, 19], symbol: "♑" },
  { sign: "Aquarius", start: [1, 20], end: [2, 18], symbol: "♒" },
  { sign: "Pisces", start: [2, 19], end: [3, 20], symbol: "♓" },
  { sign: "Aries", start: [3, 21], end: [4, 19], symbol: "♈" },
  { sign: "Taurus", start: [4, 20], end: [5, 20], symbol: "♉" },
  { sign: "Gemini", start: [5, 21], end: [6, 20], symbol: "♊" },
  { sign: "Cancer", start: [6, 21], end: [7, 22], symbol: "♋" },
  { sign: "Leo", start: [7, 23], end: [8, 22], symbol: "♌" },
  { sign: "Virgo", start: [8, 23], end: [9, 22], symbol: "♍" },
  { sign: "Libra", start: [9, 23], end: [10, 22], symbol: "♎" },
  { sign: "Scorpio", start: [10, 23], end: [11, 21], symbol: "♏" },
  { sign: "Sagittarius", start: [11, 22], end: [12, 21], symbol: "♐" },
];

const getZodiacSign = (month: number, day: number): string => {
  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start;
    const [endMonth, endDay] = zodiac.end;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return `${zodiac.symbol} ${zodiac.sign}`;
    }
  }
  return "♑ Capricorn";
};

const getDayOfWeek = (date: Date): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculateAge = useCallback(() => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    // Calculate years, months, days
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate totals
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Get day of birth and zodiac sign
    const dayOfBirth = getDayOfWeek(birth);
    const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthday: nextBirthday.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      daysUntilBirthday,
      dayOfBirth,
      zodiacSign,
    });
  }, [birthDate]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
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
            <span className="text-gradient">Age</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate your exact age in years, months, days, and discover fun facts about your birth date
          </p>
        </header>

        {/* Calculator Card */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Date of Birth
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 pr-4"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={calculateAge}
              className="btn-primary flex items-center gap-2"
            >
              <Cake className="w-4 h-4" />
              Calculate Age
            </button>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                  <Cake className="w-4 h-4 text-theme-secondary" />
                </span>
                Your Age
              </h2>

              {/* Primary Result */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <div className="text-4xl md:text-5xl font-bold text-theme-text mb-4">
                  <span className="text-gradient">{result.years}</span>
                  <span className="text-lg font-normal text-theme-text-muted ml-2">years</span>
                  <span className="text-gradient ml-4">{result.months}</span>
                  <span className="text-lg font-normal text-theme-text-muted ml-2">months</span>
                  <span className="text-gradient ml-4">{result.days}</span>
                  <span className="text-lg font-normal text-theme-text-muted ml-2">days</span>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-theme-primary" />
                    <p className="text-sm text-theme-text-muted">Born on</p>
                  </div>
                  <p className="text-lg font-semibold text-theme-text">{result.dayOfBirth}</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{result.zodiacSign.split(" ")[0]}</span>
                    <p className="text-sm text-theme-text-muted">Zodiac Sign</p>
                  </div>
                  <p className="text-lg font-semibold text-theme-text">{result.zodiacSign.split(" ")[1]}</p>
                </div>
              </div>

              {/* Next Birthday */}
              <div className="bg-gradient-to-r from-theme-secondary/10 to-theme-accent/10 rounded-lg p-4 border border-theme-secondary/20 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-theme-secondary" />
                  <p className="text-sm text-theme-text-muted">Next Birthday</p>
                </div>
                <p className="text-lg font-semibold text-theme-text">{result.nextBirthday}</p>
                <p className="text-sm text-theme-secondary mt-1">
                  {result.daysUntilBirthday === 0
                    ? "Happy Birthday!"
                    : `${result.daysUntilBirthday} days to go!`}
                </p>
              </div>

              {/* Statistics */}
              <h3 className="text-lg font-semibold text-theme-text mb-4">You have lived for</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalMonths)}</p>
                  <p className="text-sm text-theme-text-muted">Months</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalWeeks)}</p>
                  <p className="text-sm text-theme-text-muted">Weeks</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalDays)}</p>
                  <p className="text-sm text-theme-text-muted">Days</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalHours)}</p>
                  <p className="text-sm text-theme-text-muted">Hours</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border md:col-span-2">
                  <p className="text-2xl font-bold text-gradient">{formatNumber(result.totalMinutes)}</p>
                  <p className="text-sm text-theme-text-muted">Minutes</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AgeCalculator;
