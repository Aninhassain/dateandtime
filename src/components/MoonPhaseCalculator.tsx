"use client";

import { useState, useCallback } from "react";
import { Moon, Calendar } from "lucide-react";

interface MoonResult {
  phase: string;
  phaseName: string;
  illumination: number;
  age: number;
  emoji: string;
  nextNewMoon: string;
  nextFullMoon: string;
}

const calculateMoonPhase = (date: Date): MoonResult => {
  // Simplified moon phase calculation
  // Based on the known new moon date of January 6, 2000
  const knownNewMoon = new Date(2000, 0, 6, 18, 14, 0);
  const lunarCycle = 29.53058867; // Average lunar cycle in days

  const daysSinceKnownNew = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentCycleDay = daysSinceKnownNew % lunarCycle;
  const age = currentCycleDay < 0 ? currentCycleDay + lunarCycle : currentCycleDay;

  // Calculate illumination (0 to 100%)
  const illumination = Math.round((1 - Math.cos((age / lunarCycle) * 2 * Math.PI)) / 2 * 100);

  // Determine phase
  let phase: string;
  let phaseName: string;
  let emoji: string;

  if (age < 1.85) {
    phase = "new";
    phaseName = "New Moon";
    emoji = "🌑";
  } else if (age < 5.53) {
    phase = "waxing-crescent";
    phaseName = "Waxing Crescent";
    emoji = "🌒";
  } else if (age < 9.22) {
    phase = "first-quarter";
    phaseName = "First Quarter";
    emoji = "🌓";
  } else if (age < 12.91) {
    phase = "waxing-gibbous";
    phaseName = "Waxing Gibbous";
    emoji = "🌔";
  } else if (age < 16.61) {
    phase = "full";
    phaseName = "Full Moon";
    emoji = "🌕";
  } else if (age < 20.30) {
    phase = "waning-gibbous";
    phaseName = "Waning Gibbous";
    emoji = "🌖";
  } else if (age < 23.99) {
    phase = "last-quarter";
    phaseName = "Last Quarter";
    emoji = "🌗";
  } else if (age < 27.68) {
    phase = "waning-crescent";
    phaseName = "Waning Crescent";
    emoji = "🌘";
  } else {
    phase = "new";
    phaseName = "New Moon";
    emoji = "🌑";
  }

  // Calculate next new moon and full moon
  const daysToNextNew = lunarCycle - age;
  const daysToNextFull = age < lunarCycle / 2 ? (lunarCycle / 2) - age : lunarCycle - age + (lunarCycle / 2);

  const nextNewMoonDate = new Date(date.getTime() + daysToNextNew * 24 * 60 * 60 * 1000);
  const nextFullMoonDate = new Date(date.getTime() + daysToNextFull * 24 * 60 * 60 * 1000);

  return {
    phase,
    phaseName,
    illumination,
    age: Math.round(age * 10) / 10,
    emoji,
    nextNewMoon: nextNewMoonDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    nextFullMoon: nextFullMoonDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };
};

const MoonPhaseCalculator = () => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState<string>(today);
  const [result, setResult] = useState<MoonResult | null>(null);

  const calculate = useCallback(() => {
    const selectedDate = new Date(date);
    setResult(calculateMoonPhase(selectedDate));
  }, [date]);

  const setToday = () => {
    const todayDate = new Date().toISOString().split("T")[0];
    setDate(todayDate);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Moon className="w-4 h-4 text-indigo-500" />
            <span className="text-sm text-indigo-500">Lunar Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Moon Phase</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate moon phases for any date
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">Select Date</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
                <button type="button" onClick={setToday} className="btn-secondary">
                  Today
                </button>
              </div>
            </div>

            <button type="button" onClick={calculate} className="btn-primary flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Calculate Moon Phase
            </button>
          </div>
        </section>

        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-indigo-500" />
                </span>
                Moon Phase Result
              </h2>

              {/* Main Moon Display */}
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-8 mb-6 border border-indigo-500/20 text-center">
                <div className="text-8xl md:text-9xl mb-4">{result.emoji}</div>
                <h3 className="text-3xl font-bold text-theme-text mb-2">{result.phaseName}</h3>
                <p className="text-theme-text-muted">
                  {result.illumination}% Illuminated
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.age}</p>
                  <p className="text-sm text-theme-text-muted">Days Old</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.illumination}%</p>
                  <p className="text-sm text-theme-text-muted">Illumination</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-lg font-bold text-gradient">{result.nextNewMoon}</p>
                  <p className="text-sm text-theme-text-muted">Next New Moon</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-lg font-bold text-gradient">{result.nextFullMoon}</p>
                  <p className="text-sm text-theme-text-muted">Next Full Moon</p>
                </div>
              </div>

              {/* Phase Cycle */}
              <div className="mt-6 p-4 bg-theme-surface/30 rounded-lg border border-theme-border">
                <p className="text-sm text-theme-text-muted mb-4 text-center">Lunar Cycle (29.5 days)</p>
                <div className="flex justify-between text-2xl">
                  <span title="New Moon">🌑</span>
                  <span title="Waxing Crescent">🌒</span>
                  <span title="First Quarter">🌓</span>
                  <span title="Waxing Gibbous">🌔</span>
                  <span title="Full Moon">🌕</span>
                  <span title="Waning Gibbous">🌖</span>
                  <span title="Last Quarter">🌗</span>
                  <span title="Waning Crescent">🌘</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MoonPhaseCalculator;
