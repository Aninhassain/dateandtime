"use client";

import { useState, useCallback } from "react";
import { Calendar, Heart, Gift, Sparkles } from "lucide-react";

interface Milestone {
  name: string;
  years: number;
  symbol: string;
  date: string;
  isPast: boolean;
}

interface AnniversaryResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextAnniversary: string;
  daysUntilNext: number;
  currentMilestone: string;
  milestones: Milestone[];
}

const getMilestoneName = (years: number): string => {
  const milestones: { [key: number]: string } = {
    1: "Paper",
    2: "Cotton",
    3: "Leather",
    4: "Fruit/Flowers",
    5: "Wood",
    6: "Candy/Iron",
    7: "Wool/Copper",
    8: "Pottery/Bronze",
    9: "Pottery/Willow",
    10: "Tin/Aluminum",
    11: "Steel",
    12: "Silk/Linen",
    13: "Lace",
    14: "Ivory",
    15: "Crystal",
    20: "China",
    25: "Silver",
    30: "Pearl",
    35: "Coral",
    40: "Ruby",
    45: "Sapphire",
    50: "Gold",
    55: "Emerald",
    60: "Diamond",
    65: "Blue Sapphire",
    70: "Platinum",
    75: "Diamond/Gold",
  };
  return milestones[years] || `${years}th`;
};

const AnniversaryCalculator = () => {
  const [anniversaryDate, setAnniversaryDate] = useState<string>("");
  const [result, setResult] = useState<AnniversaryResult | null>(null);

  const calculate = useCallback(() => {
    if (!anniversaryDate) return;

    const anniversary = new Date(anniversaryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate duration
    let years = today.getFullYear() - anniversary.getFullYear();
    let months = today.getMonth() - anniversary.getMonth();
    let days = today.getDate() - anniversary.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const totalDays = Math.floor((today.getTime() - anniversary.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next anniversary
    let nextAnniversary = new Date(today.getFullYear(), anniversary.getMonth(), anniversary.getDate());
    if (nextAnniversary <= today) {
      nextAnniversary = new Date(today.getFullYear() + 1, anniversary.getMonth(), anniversary.getDate());
    }
    const daysUntilNext = Math.ceil((nextAnniversary.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Generate milestones
    const milestoneYears = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75];
    const milestones: Milestone[] = milestoneYears.map((y) => {
      const milestoneDate = new Date(anniversary.getFullYear() + y, anniversary.getMonth(), anniversary.getDate());
      return {
        name: getMilestoneName(y),
        years: y,
        symbol: y === 25 ? "🥈" : y === 50 ? "🥇" : y === 60 ? "💎" : "💍",
        date: milestoneDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        isPast: milestoneDate < today,
      };
    });

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextAnniversary: nextAnniversary.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
      daysUntilNext,
      currentMilestone: getMilestoneName(years),
      milestones,
    });
  }, [anniversaryDate]);

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-500">Anniversary Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">Anniversary</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate anniversary milestones and special dates
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">Anniversary Date</label>
              <div className="relative max-w-md">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                <input
                  type="date"
                  value={anniversaryDate}
                  onChange={(e) => setAnniversaryDate(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <button type="button" onClick={calculate} disabled={!anniversaryDate} className="btn-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Calculate
            </button>
          </div>
        </section>

        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-red-500" />
                </span>
                Anniversary Details
              </h2>

              {/* Main Display */}
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-6 mb-6 border border-red-500/20 text-center">
                <p className="text-5xl md:text-6xl font-bold text-gradient mb-2">
                  {result.years}
                </p>
                <p className="text-xl text-theme-text">{result.currentMilestone} Anniversary</p>
                <p className="text-theme-text-muted mt-2">
                  {result.years} years, {result.months} months, {result.days} days together
                </p>
              </div>

              {/* Next Anniversary */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-6 h-6 text-red-500" />
                  <span className="text-lg font-semibold text-theme-text">Next Anniversary</span>
                </div>
                <p className="text-2xl font-bold text-gradient">{result.nextAnniversary}</p>
                <p className="text-theme-text-muted mt-1">
                  {result.daysUntilNext === 0 ? "Today! Happy Anniversary! 💕" : `${result.daysUntilNext} days to go`}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalDays.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Days Together</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalWeeks.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Weeks Together</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalMonths.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Months Together</p>
                </div>
              </div>

              {/* Milestones */}
              <h3 className="text-lg font-semibold text-theme-text mb-4">Anniversary Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.milestones.map((milestone) => (
                  <div
                    key={milestone.years}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      milestone.isPast
                        ? "bg-theme-surface/20 border-theme-border opacity-60"
                        : "bg-theme-surface/40 border-theme-primary/30"
                    }`}
                  >
                    <span className="text-2xl">{milestone.symbol}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-theme-text">
                        {milestone.years}th - {milestone.name}
                      </p>
                      <p className="text-sm text-theme-text-muted">{milestone.date}</p>
                    </div>
                    {milestone.isPast && <span className="text-xs text-theme-text-muted">Passed</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AnniversaryCalculator;
