"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, RotateCcw, Plus, Minus, Bell, BellOff, Maximize, Minimize } from "lucide-react";

interface PresetTimer {
  label: string;
  minutes: number;
}

const presets: PresetTimer[] = [
  { label: "1 min", minutes: 1 },
  { label: "5 min", minutes: 5 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "25 min", minutes: 25 },
  { label: "30 min", minutes: 30 },
  { label: "45 min", minutes: 45 },
  { label: "60 min", minutes: 60 },
];

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  const formatTime = useCallback((totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    return {
      hours: h.toString().padStart(2, "0"),
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
    };
  }, []);

  const playAlarm = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Audio play failed, likely due to autoplay restrictions
      });
    }
  }, [soundEnabled]);

  const start = useCallback(() => {
    if (totalSeconds > 0 && !isRunning) {
      setIsFinished(false);
      if (timeLeft === 0) {
        setTimeLeft(totalSeconds);
      }
      setIsRunning(true);
    }
  }, [totalSeconds, isRunning, timeLeft]);

  const pause = useCallback(() => {
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
    setIsFinished(false);
    setTimeLeft(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setPreset = (mins: number) => {
    reset();
    setHours(0);
    setMinutes(mins);
    setSeconds(0);
  };

  const adjustTime = (type: "hours" | "minutes" | "seconds", delta: number) => {
    if (isRunning) return;

    switch (type) {
      case "hours":
        setHours((prev) => Math.max(0, Math.min(99, prev + delta)));
        break;
      case "minutes":
        setMinutes((prev) => Math.max(0, Math.min(59, prev + delta)));
        break;
      case "seconds":
        setSeconds((prev) => Math.max(0, Math.min(59, prev + delta)));
        break;
    }
    setTimeLeft(0);
  };

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

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setIsFinished(true);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, playAlarm]);

  const displayTime = timeLeft > 0 || isRunning ? formatTime(timeLeft) : formatTime(totalSeconds);
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <div ref={containerRef} className="min-h-screen gradient-bg">
      {/* Hidden audio element for alarm */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQgAQK7k7aFuJACQpb3X2a1bGwRnqM7csk4QDXOy3eO7ZSMAY4/C4dyHLgA+h87q0YZUOliOzOLZq3pVUWqJt+DftnZHIx9Ijb7f3Kx6UzoeMH+3z9jJrnlZPB0bf7TO1cqqblc0ECl+sszRw6hwXjkVDHetxs3ArXdfNw0Ee63EycGpbVs0CQBzqsLGvqZrWjIGAHCowMO8o2hYMQQAbaW+wLqgZlYuAgBqor2+t51kVCwAAGigu7u0mmJTKgAAZp66ubKYYFEoAABkm7i3sJZeUCYAAGKZtrWulFxOJAAAYJe0s6ySWkwjAABel7OsqpBZSiEAAF2VsaqokFdJHwAAW5OsqKaOVkgeAABZkaqqpIxVRhwAAFiQqainilREGgAAV46mp6aIU0MZAABWjaSnpYdRQRgAAFSMo6WjhVBAFgAAU4uipaOEUD4VAABSiqGjooNOPhQAAFGJoKKhgk08EwAAUIifop+ATDsRAABPh5+hn4BMOhAAAE6Gnp+dgEo5DwAATYWdnpx/STgOAABMhJycm358RzYMAABLg5uamXx7RjULAABKgpqZmHt6RTQLAABJgZmYl3p5RDMKAABIgJiXlnl4QzIJAABHf5eWlXh3QjEIAABGfpaVlHd2QTAHAABFfZWUk3Z1QC8HAABEfJSTknV0Py4GAABDe5OSknR0PiwGAABCepGRkHNzPSsFAABBeZCQj3JyPCoEAABAdpCPjnFxOygEAAA/dY+OjXBwOScDAAA+dI6NjG9vOCYDAAA9c42MjG5uNyUCAAA8comLi21tNiQBAAA7cYqLiWxsNSMBAAA6cImKiGtrNCIBAAA5b4mJh2pqMyEAAADqcIiIhmhoMiAAAAAA" type="audio/wav" />
      </audio>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary/10 border border-theme-secondary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-secondary animate-pulse" />
            <span className="text-sm text-theme-secondary">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Timer</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Set a countdown timer with customizable duration and alerts
          </p>
        </header>

        {/* Controls */}
        <div className="flex justify-end max-w-4xl mx-auto mb-4 gap-4">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 text-sm text-theme-text-muted hover:text-theme-primary transition-colors"
          >
            {soundEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            {soundEnabled ? "Sound On" : "Sound Off"}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-2 text-sm text-theme-text-muted hover:text-theme-primary transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        {/* Timer Display */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-8 md:p-12">
            {/* Progress Ring (visual feedback) */}
            {(isRunning || timeLeft > 0) && (
              <div className="w-full bg-theme-surface/50 rounded-full h-2 mb-8">
                <div
                  className="bg-gradient-to-r from-theme-primary to-theme-secondary h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${100 - progress}%` }}
                />
              </div>
            )}

            {/* Time Display / Input */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => adjustTime("hours", 1)}
                  disabled={isRunning}
                  className="p-2 text-theme-text-muted hover:text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
                <div className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text">
                  {displayTime.hours}
                </div>
                <button
                  type="button"
                  onClick={() => adjustTime("hours", -1)}
                  disabled={isRunning}
                  className="p-2 text-theme-text-muted hover:text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="text-sm text-theme-text-muted mt-1">Hours</span>
              </div>

              <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text-muted">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => adjustTime("minutes", 1)}
                  disabled={isRunning}
                  className="p-2 text-theme-text-muted hover:text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
                <div className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text">
                  {displayTime.minutes}
                </div>
                <button
                  type="button"
                  onClick={() => adjustTime("minutes", -1)}
                  disabled={isRunning}
                  className="p-2 text-theme-text-muted hover:text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="text-sm text-theme-text-muted mt-1">Minutes</span>
              </div>

              <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text-muted">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => adjustTime("seconds", 1)}
                  disabled={isRunning}
                  className="p-2 text-theme-text-muted hover:text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
                <div className={`font-mono text-5xl md:text-7xl lg:text-8xl font-bold ${isFinished ? "text-gradient animate-pulse" : "text-theme-text"}`}>
                  {displayTime.seconds}
                </div>
                <button
                  type="button"
                  onClick={() => adjustTime("seconds", -1)}
                  disabled={isRunning}
                  className="p-2 text-theme-text-muted hover:text-theme-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="text-sm text-theme-text-muted mt-1">Seconds</span>
              </div>
            </div>

            {/* Finished Message */}
            {isFinished && (
              <div className="text-center mb-8 animate-fade-in">
                <p className="text-2xl font-bold text-gradient">Time&apos;s Up!</p>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {/* Start/Pause Button */}
              <button
                type="button"
                onClick={isRunning ? pause : start}
                disabled={totalSeconds === 0 && timeLeft === 0}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
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

              {/* Reset Button */}
              <button
                type="button"
                onClick={reset}
                disabled={timeLeft === 0 && !isRunning && !isFinished}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-theme-border flex items-center justify-center text-lg font-semibold text-theme-text transition-all duration-300 hover:border-theme-accent hover:text-theme-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            {/* Button Labels */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-20 md:w-24 text-center text-sm text-theme-text-muted">
                {isRunning ? "Pause" : "Start"}
              </span>
              <span className="w-20 md:w-24 text-center text-sm text-theme-text-muted">Reset</span>
            </div>

            {/* Presets */}
            <div className="border-t border-theme-border pt-6">
              <p className="text-sm text-theme-text-muted mb-4 text-center">Quick Presets</p>
              <div className="flex flex-wrap justify-center gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.minutes}
                    type="button"
                    onClick={() => setPreset(preset.minutes)}
                    disabled={isRunning}
                    className="px-4 py-2 rounded-lg border border-theme-border text-sm text-theme-text hover:border-theme-primary hover:text-theme-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-theme-text mb-4">How to Use</h3>
            <ul className="space-y-2 text-sm text-theme-text-muted">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-theme-primary/20 flex items-center justify-center">
                  <Plus className="w-3 h-3 text-theme-primary" />
                </span>
                Use + and - buttons to set hours, minutes, and seconds
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-theme-secondary/20 flex items-center justify-center">
                  <Play className="w-3 h-3 text-theme-secondary" />
                </span>
                Click Start to begin the countdown
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-theme-accent/20 flex items-center justify-center">
                  <Bell className="w-3 h-3 text-theme-accent" />
                </span>
                An alarm will sound when the timer reaches zero
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Timer;
