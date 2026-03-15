"use client";

import { useState, useCallback } from "react";
import { Clock, Timer, RefreshCw } from "lucide-react";

interface DurationResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  formattedDuration: string;
}

const TimeDurationCalculator = () => {
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [result, setResult] = useState<DurationResult | null>(null);

  const calculate = useCallback(() => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    let startTotalMinutes = startHours * 60 + startMinutes;
    let endTotalMinutes = endHours * 60 + endMinutes;

    // Handle overnight duration
    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }

    const diffMinutes = endTotalMinutes - startTotalMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    const totalMinutes = diffMinutes;
    const totalSeconds = totalMinutes * 60;
    const totalHours = totalMinutes / 60;

    setResult({
      hours,
      minutes,
      seconds: 0,
      totalHours,
      totalMinutes,
      totalSeconds,
      formattedDuration: `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`,
    });
  }, [startTime, endTime]);

  const swapTimes = () => {
    const temp = startTime;
    setStartTime(endTime);
    setEndTime(temp);
  };

  const setCurrentTime = (field: "start" | "end") => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    if (field === "start") {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
  };

  const resetForm = () => {
    setStartTime("09:00");
    setEndTime("17:00");
    setResult(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
            <span className="text-sm text-theme-primary">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Time Duration</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate hours, minutes, and seconds between two times
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
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
                  <button type="button" onClick={() => setCurrentTime("start")} className="btn-secondary text-sm whitespace-nowrap">
                    Now
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">End Time</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full pl-10"
                    />
                  </div>
                  <button type="button" onClick={() => setCurrentTime("end")} className="btn-secondary text-sm whitespace-nowrap">
                    Now
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={calculate} className="btn-primary flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Calculate Duration
              </button>
              <button type="button" onClick={swapTimes} className="btn-secondary flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Swap Times
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
                <span className="w-8 h-8 rounded-lg bg-theme-primary/20 flex items-center justify-center">
                  <Timer className="w-4 h-4 text-theme-primary" />
                </span>
                Duration Result
              </h2>

              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <p className="text-theme-text-muted mb-2">From {startTime} to {endTime}</p>
                <p className="text-3xl md:text-4xl font-bold text-gradient">{result.formattedDuration}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalHours.toFixed(2)}</p>
                  <p className="text-sm text-theme-text-muted">Total Hours</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalMinutes.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Total Minutes</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.totalSeconds.toLocaleString()}</p>
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

export default TimeDurationCalculator;
