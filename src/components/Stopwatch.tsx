"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, RotateCcw, Flag, Maximize, Minimize } from "lucide-react";

interface LapTime {
  lap: number;
  time: string;
  totalTime: string;
}

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastLapTimeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatTime = useCallback((ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const tenths = Math.floor((ms % 1000) / 100);
    const hundredths = Math.floor((ms % 100) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      tenths: tenths.toString(),
      hundredths: hundredths.toString().padStart(2, "0"),
    };
  }, []);

  const formatTimeString = useCallback((ms: number) => {
    const { hours, minutes, seconds, tenths, hundredths } = formatTime(ms);
    return `${hours}:${minutes}:${seconds}.${tenths}${hundredths}`;
  }, [formatTime]);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  }, [isRunning, time]);

  const stop = useCallback(() => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lastLapTimeRef.current = 0;
  }, []);

  const split = useCallback(() => {
    if (isRunning) {
      const lapTime = time - lastLapTimeRef.current;
      const newLap: LapTime = {
        lap: laps.length + 1,
        time: formatTimeString(lapTime),
        totalTime: formatTimeString(time),
      };
      setLaps((prev) => [newLap, ...prev]);
      lastLapTimeRef.current = time;
    }
  }, [isRunning, time, laps.length, formatTimeString]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const { hours, minutes, seconds, tenths, hundredths } = formatTime(time);

  return (
    <div ref={containerRef} className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
            <span className="text-sm text-theme-primary">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Stopwatch</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Simple and accurate online stopwatch with lap timing
          </p>
        </header>

        {/* Fullscreen Toggle */}
        <div className="flex justify-end max-w-4xl mx-auto mb-4">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-2 text-sm text-theme-text-muted hover:text-theme-primary transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        {/* Stopwatch Display */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-8 md:p-12">
            {/* Time Display */}
            <div className="text-center mb-8">
              <div className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold text-theme-text tracking-tight">
                <span>{hours}</span>
                <span className="text-theme-text-muted">:</span>
                <span>{minutes}</span>
                <span className="text-theme-text-muted">:</span>
                <span>{seconds}</span>
                <span className="text-theme-text-muted">.</span>
                <span className="text-gradient">{tenths}</span>
                <sub className="text-3xl md:text-4xl lg:text-5xl text-theme-text-muted align-bottom">{hundredths}</sub>
              </div>
            </div>

            {/* Split Time Label */}
            <div className="text-center mb-8">
              <span className="text-lg font-semibold text-theme-secondary uppercase tracking-wider">
                Split Time
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Start/Stop Button */}
              <button
                type="button"
                onClick={isRunning ? stop : start}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                  isRunning
                    ? "bg-theme-secondary text-white hover:bg-theme-secondary/80"
                    : "bg-theme-primary text-white hover:bg-theme-primary/80"
                }`}
              >
                {isRunning ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>

              {/* Split Button */}
              <button
                type="button"
                onClick={split}
                disabled={!isRunning}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-theme-border flex items-center justify-center text-lg font-semibold text-theme-text transition-all duration-300 hover:border-theme-primary hover:text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-theme-border disabled:hover:text-theme-text"
              >
                <Flag className="w-6 h-6" />
              </button>

              {/* Reset Button */}
              <button
                type="button"
                onClick={reset}
                disabled={time === 0}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-theme-border flex items-center justify-center text-lg font-semibold text-theme-text transition-all duration-300 hover:border-theme-accent hover:text-theme-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-theme-border disabled:hover:text-theme-text"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            {/* Button Labels */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="w-20 md:w-24 text-center text-sm text-theme-text-muted">
                {isRunning ? "Stop" : "Start"}
              </span>
              <span className="w-20 md:w-24 text-center text-sm text-theme-text-muted">Split</span>
              <span className="w-20 md:w-24 text-center text-sm text-theme-text-muted">Reset</span>
            </div>
          </div>
        </section>

        {/* Lap Times */}
        {laps.length > 0 && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                  <Flag className="w-4 h-4 text-theme-secondary" />
                </span>
                Lap Times
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-theme-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">Lap</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">Lap Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">Total Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laps.map((lap) => (
                      <tr key={lap.lap} className="border-b border-theme-border/50">
                        <td className="py-3 px-4 text-theme-text font-medium">#{lap.lap}</td>
                        <td className="py-3 px-4 font-mono text-gradient font-bold">{lap.time}</td>
                        <td className="py-3 px-4 font-mono text-theme-text-muted">{lap.totalTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Keyboard Shortcuts Info */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-theme-text mb-4">How to Use</h3>
            <ul className="space-y-2 text-sm text-theme-text-muted">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-theme-primary/20 flex items-center justify-center">
                  <Play className="w-3 h-3 text-theme-primary" />
                </span>
                Click Start to begin the stopwatch
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-theme-secondary/20 flex items-center justify-center">
                  <Flag className="w-3 h-3 text-theme-secondary" />
                </span>
                Click Split to record lap times while running
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-theme-accent/20 flex items-center justify-center">
                  <RotateCcw className="w-3 h-3 text-theme-accent" />
                </span>
                Click Reset to clear and start over
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
