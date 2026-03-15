"use client";

import { useState, useCallback } from "react";
import { Clock, Plus, Minus } from "lucide-react";

interface TimeResult {
  resultTime: string;
  resultPeriod: string;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  dayChange: number;
}

const AddTimeCalculator = () => {
  const [startTime, setStartTime] = useState<string>("12:00");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [result, setResult] = useState<TimeResult | null>(null);

  const calculate = useCallback(() => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);

    let totalSeconds = startHours * 3600 + startMinutes * 60;
    const addSeconds = hours * 3600 + minutes * 60 + seconds;

    if (operation === "add") {
      totalSeconds += addSeconds;
    } else {
      totalSeconds -= addSeconds;
    }

    // Handle day changes
    let dayChange = 0;
    while (totalSeconds < 0) {
      totalSeconds += 24 * 3600;
      dayChange--;
    }
    while (totalSeconds >= 24 * 3600) {
      totalSeconds -= 24 * 3600;
      dayChange++;
    }

    const resultHours = Math.floor(totalSeconds / 3600);
    const resultMinutes = Math.floor((totalSeconds % 3600) / 60);
    const resultSecs = totalSeconds % 60;

    const period = resultHours >= 12 ? "PM" : "AM";
    const displayHours = resultHours > 12 ? resultHours - 12 : resultHours === 0 ? 12 : resultHours;

    setResult({
      resultTime: `${displayHours.toString().padStart(2, "0")}:${resultMinutes.toString().padStart(2, "0")}:${resultSecs.toString().padStart(2, "0")}`,
      resultPeriod: period,
      totalHours: Math.floor(totalSeconds / 3600),
      totalMinutes: Math.floor(totalSeconds / 60),
      totalSeconds: totalSeconds,
      dayChange,
    });
  }, [startTime, operation, hours, minutes, seconds]);

  const setCurrentTime = () => {
    const now = new Date();
    setStartTime(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
  };

  const resetForm = () => {
    setStartTime("12:00");
    setOperation("add");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent/10 border border-theme-accent/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
            <span className="text-sm text-theme-accent">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Add/Subtract</span>{" "}
            <span className="text-theme-text">Time</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Add or subtract hours, minutes, and seconds from any time
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">Start Time</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
                <button type="button" onClick={setCurrentTime} className="btn-secondary text-sm whitespace-nowrap">
                  Now
                </button>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setOperation("add")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                  operation === "add"
                    ? "bg-theme-accent/20 border-theme-accent/40 text-theme-accent"
                    : "border-theme-border text-theme-text-muted hover:border-theme-primary"
                }`}
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
              <button
                type="button"
                onClick={() => setOperation("subtract")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                  operation === "subtract"
                    ? "bg-theme-secondary/20 border-theme-secondary/40 text-theme-secondary"
                    : "border-theme-border text-theme-text-muted hover:border-theme-primary"
                }`}
              >
                <Minus className="w-4 h-4" />
                Subtract
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Hours</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Minutes</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Seconds</label>
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={calculate} className="btn-primary flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Calculate
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
                <span className="w-8 h-8 rounded-lg bg-theme-accent/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-theme-accent" />
                </span>
                Result
              </h2>

              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <p className="text-theme-text-muted mb-2">
                  {operation === "add" ? "Adding" : "Subtracting"} {hours > 0 && `${hours}h `}{minutes > 0 && `${minutes}m `}{seconds > 0 && `${seconds}s `}
                  {operation === "add" ? "to" : "from"} {startTime}
                </p>
                <p className="text-4xl md:text-5xl font-bold text-gradient">
                  {result.resultTime} {result.resultPeriod}
                </p>
                {result.dayChange !== 0 && (
                  <p className="text-theme-text-muted mt-2">
                    ({result.dayChange > 0 ? "+" : ""}{result.dayChange} day{Math.abs(result.dayChange) !== 1 ? "s" : ""})
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalHours}</p>
                  <p className="text-sm text-theme-text-muted">Hours (24h)</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalMinutes}</p>
                  <p className="text-sm text-theme-text-muted">Total Minutes</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalSeconds}</p>
                  <p className="text-sm text-theme-text-muted">Total Seconds</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AddTimeCalculator;
