"use client";

import { useState, useCallback, useEffect } from "react";
import { Globe, Clock, ArrowRight, RefreshCw } from "lucide-react";

const timezones = [
  { label: "UTC", offset: 0, name: "Coordinated Universal Time" },
  { label: "GMT", offset: 0, name: "Greenwich Mean Time" },
  { label: "EST", offset: -5, name: "Eastern Standard Time" },
  { label: "EDT", offset: -4, name: "Eastern Daylight Time" },
  { label: "CST", offset: -6, name: "Central Standard Time" },
  { label: "CDT", offset: -5, name: "Central Daylight Time" },
  { label: "MST", offset: -7, name: "Mountain Standard Time" },
  { label: "MDT", offset: -6, name: "Mountain Daylight Time" },
  { label: "PST", offset: -8, name: "Pacific Standard Time" },
  { label: "PDT", offset: -7, name: "Pacific Daylight Time" },
  { label: "IST", offset: 5.5, name: "India Standard Time" },
  { label: "JST", offset: 9, name: "Japan Standard Time" },
  { label: "CST (China)", offset: 8, name: "China Standard Time" },
  { label: "AEST", offset: 10, name: "Australian Eastern Standard Time" },
  { label: "AEDT", offset: 11, name: "Australian Eastern Daylight Time" },
  { label: "CET", offset: 1, name: "Central European Time" },
  { label: "CEST", offset: 2, name: "Central European Summer Time" },
  { label: "WET", offset: 0, name: "Western European Time" },
  { label: "WEST", offset: 1, name: "Western European Summer Time" },
  { label: "SGT", offset: 8, name: "Singapore Time" },
  { label: "HKT", offset: 8, name: "Hong Kong Time" },
  { label: "KST", offset: 9, name: "Korea Standard Time" },
  { label: "BRT", offset: -3, name: "Brasília Time" },
  { label: "AST", offset: 3, name: "Arabia Standard Time" },
  { label: "MSK", offset: 3, name: "Moscow Standard Time" },
];

interface ConversionResult {
  sourceTime: string;
  targetTime: string;
  sourceDate: string;
  targetDate: string;
  timeDiff: string;
}

const TimezoneConverter = () => {
  const [sourceTimezone, setSourceTimezone] = useState("UTC");
  const [targetTimezone, setTargetTimezone] = useState("IST");
  const [inputTime, setInputTime] = useState("12:00");
  const [inputDate, setInputDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({});

  const getTimezoneOffset = (tz: string): number => {
    const timezone = timezones.find((t) => t.label === tz);
    return timezone ? timezone.offset : 0;
  };

  const convert = useCallback(() => {
    const sourceOffset = getTimezoneOffset(sourceTimezone);
    const targetOffset = getTimezoneOffset(targetTimezone);

    const [hours, minutes] = inputTime.split(":").map(Number);
    const sourceDate = new Date(inputDate);
    sourceDate.setHours(hours, minutes, 0, 0);

    // Convert to UTC first, then to target timezone
    const utcTime = sourceDate.getTime() - sourceOffset * 60 * 60 * 1000;
    const targetTime = new Date(utcTime + targetOffset * 60 * 60 * 1000);

    const diffHours = targetOffset - sourceOffset;
    const diffSign = diffHours >= 0 ? "+" : "";

    setResult({
      sourceTime: inputTime,
      targetTime: `${targetTime.getHours().toString().padStart(2, "0")}:${targetTime.getMinutes().toString().padStart(2, "0")}`,
      sourceDate: sourceDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      targetDate: targetTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      timeDiff: `${diffSign}${diffHours} hours`,
    });
  }, [sourceTimezone, targetTimezone, inputTime, inputDate]);

  const swapTimezones = () => {
    const temp = sourceTimezone;
    setSourceTimezone(targetTimezone);
    setTargetTimezone(temp);
  };

  const setCurrentTime = () => {
    const now = new Date();
    setInputTime(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
    setInputDate(now.toISOString().split("T")[0]);
  };

  useEffect(() => {
    const updateCurrentTimes = () => {
      const now = new Date();
      const times: { [key: string]: string } = {};
      timezones.forEach((tz) => {
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
        const tzTime = new Date(utcTime + tz.offset * 60 * 60 * 1000);
        times[tz.label] = tzTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      });
      setCurrentTimes(times);
    };

    updateCurrentTimes();
    const interval = setInterval(updateCurrentTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary/10 border border-theme-secondary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-theme-secondary animate-pulse" />
            <span className="text-sm text-theme-secondary">Professional Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Time Zone</span>{" "}
            <span className="text-theme-text">Converter</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Convert time between different time zones worldwide
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">From Timezone</label>
                <select
                  value={sourceTimezone}
                  onChange={(e) => setSourceTimezone(e.target.value)}
                  className="w-full"
                >
                  {timezones.map((tz) => (
                    <option key={tz.label} value={tz.label}>
                      {tz.label} - {tz.name} {currentTimes[tz.label] && `(${currentTimes[tz.label]})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">To Timezone</label>
                <select
                  value={targetTimezone}
                  onChange={(e) => setTargetTimezone(e.target.value)}
                  className="w-full"
                >
                  {timezones.map((tz) => (
                    <option key={tz.label} value={tz.label}>
                      {tz.label} - {tz.name} {currentTimes[tz.label] && `(${currentTimes[tz.label]})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Time</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                    <input
                      type="time"
                      value={inputTime}
                      onChange={(e) => setInputTime(e.target.value)}
                      className="w-full pl-10"
                    />
                  </div>
                  <button type="button" onClick={setCurrentTime} className="btn-secondary text-sm whitespace-nowrap">
                    Now
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Date</label>
                <input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={convert} className="btn-primary flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Convert
              </button>
              <button type="button" onClick={swapTimezones} className="btn-secondary flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Swap Timezones
              </button>
            </div>
          </div>
        </section>

        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-theme-secondary" />
                </span>
                Conversion Result
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="bg-theme-surface/50 rounded-xl p-6 border border-theme-border text-center">
                  <p className="text-sm text-theme-text-muted mb-2">{sourceTimezone}</p>
                  <p className="text-3xl font-bold text-theme-text">{result.sourceTime}</p>
                  <p className="text-sm text-theme-text-muted mt-2">{result.sourceDate}</p>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center gap-2 text-theme-text-muted">
                    <ArrowRight className="w-6 h-6" />
                    <span className="text-sm">{result.timeDiff}</span>
                  </div>
                </div>

                <div className="bg-theme-surface/50 rounded-xl p-6 border border-theme-border text-center">
                  <p className="text-sm text-theme-text-muted mb-2">{targetTimezone}</p>
                  <p className="text-3xl font-bold text-gradient">{result.targetTime}</p>
                  <p className="text-sm text-theme-text-muted mt-2">{result.targetDate}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TimezoneConverter;
