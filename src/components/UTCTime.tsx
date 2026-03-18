"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Info, Globe } from "lucide-react";

export default function UTCTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUTCTime = () => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(currentTime);
  };

  const formatUTCDate = () => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(currentTime);
  };

  const getUTCComponents = () => {
    return {
      year: currentTime.getUTCFullYear(),
      month: currentTime.getUTCMonth() + 1,
      day: currentTime.getUTCDate(),
      hour: currentTime.getUTCHours(),
      minute: currentTime.getUTCMinutes(),
      second: currentTime.getUTCSeconds(),
      millisecond: currentTime.getUTCMilliseconds(),
      dayOfYear: Math.floor(
        (currentTime.getTime() - new Date(Date.UTC(currentTime.getUTCFullYear(), 0, 0)).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      weekOfYear: Math.ceil(
        ((currentTime.getTime() - new Date(Date.UTC(currentTime.getUTCFullYear(), 0, 1)).getTime()) /
          (1000 * 60 * 60 * 24) +
          1) /
          7
      ),
      unixTimestamp: Math.floor(currentTime.getTime() / 1000),
    };
  };

  const utc = getUTCComponents();

  const majorCities = [
    { city: "New York", offset: -5 },
    { city: "Los Angeles", offset: -8 },
    { city: "London", offset: 0 },
    { city: "Paris", offset: 1 },
    { city: "Dubai", offset: 4 },
    { city: "Mumbai", offset: 5.5 },
    { city: "Singapore", offset: 8 },
    { city: "Tokyo", offset: 9 },
    { city: "Sydney", offset: 11 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 starry-base" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-primary" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-secondary" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 horizon-glow" />

      <div className="relative z-10">
        <div className="w-full px-2 md:px-4 py-8 md:py-14 mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-theme-primary hover:text-theme-primary-dark transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
                <Clock className="w-4 h-4 text-theme-primary" />
                <span className="text-sm text-theme-primary">Coordinated Universal Time</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-theme-text mb-4">
                Current <span className="text-gradient">UTC Time</span>
              </h1>
              <p className="text-theme-text-muted max-w-2xl mx-auto">
                UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time.
              </p>
            </div>

            {/* Main UTC Display */}
            <div className="glass-card rounded-2xl p-8 mb-8 text-center">
              <p className="text-6xl md:text-8xl font-mono font-bold text-theme-primary mb-4">
                {formatUTCTime()}
              </p>
              <p className="text-xl text-theme-text">{formatUTCDate()}</p>
              <p className="text-sm text-theme-text-muted mt-2">Coordinated Universal Time (UTC+0)</p>
            </div>

            {/* UTC Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-theme-text mb-4">UTC Components</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Year</p>
                    <p className="text-lg font-mono text-theme-text">{utc.year}</p>
                  </div>
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Month</p>
                    <p className="text-lg font-mono text-theme-text">{utc.month}</p>
                  </div>
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Day</p>
                    <p className="text-lg font-mono text-theme-text">{utc.day}</p>
                  </div>
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Hour</p>
                    <p className="text-lg font-mono text-theme-text">{utc.hour}</p>
                  </div>
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Minute</p>
                    <p className="text-lg font-mono text-theme-text">{utc.minute}</p>
                  </div>
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Second</p>
                    <p className="text-lg font-mono text-theme-text">{utc.second}</p>
                  </div>
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Day of Year</p>
                    <p className="text-lg font-mono text-theme-text">{utc.dayOfYear}</p>
                  </div>
                  <div className="bg-theme-surface/50 rounded-lg p-3">
                    <p className="text-sm text-theme-text-muted">Week of Year</p>
                    <p className="text-lg font-mono text-theme-text">{utc.weekOfYear}</p>
                  </div>
                </div>
                <div className="bg-theme-surface/50 rounded-lg p-3 mt-4">
                  <p className="text-sm text-theme-text-muted">Unix Timestamp</p>
                  <p className="text-lg font-mono text-theme-text">{utc.unixTimestamp}</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-theme-primary" />
                  UTC Offsets
                </h2>
                <div className="space-y-2">
                  {majorCities.map((city) => {
                    const offsetHours = Math.floor(Math.abs(city.offset));
                    const offsetMins = (Math.abs(city.offset) % 1) * 60;
                    const sign = city.offset >= 0 ? "+" : "-";
                    const offsetStr = `UTC${sign}${offsetHours}${offsetMins > 0 ? `:${offsetMins}` : ""}`;

                    return (
                      <div
                        key={city.city}
                        className="flex items-center justify-between bg-theme-surface/50 rounded-lg p-3"
                      >
                        <span className="text-theme-text">{city.city}</span>
                        <span className="text-sm font-mono text-theme-primary">{offsetStr}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* About UTC */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-theme-primary" />
                About UTC
              </h2>
              <div className="space-y-4 text-theme-text-muted">
                <p>
                  <strong className="text-theme-text">Coordinated Universal Time (UTC)</strong> is the primary time
                  standard by which the world regulates clocks and time. It is within about 1 second of mean solar
                  time at 0° longitude and is not adjusted for daylight saving time.
                </p>
                <p>
                  UTC is used in many Internet and World Wide Web standards. The Network Time Protocol (NTP),
                  designed to synchronize the clocks of computers over a network, transmits time information from
                  the UTC standard.
                </p>
                <p>
                  The abbreviation UTC is not an acronym for any specific English phrase. It is a compromise between
                  the English abbreviation CUT (Coordinated Universal Time) and the French abbreviation TUC
                  (Temps Universel Coordonné).
                </p>
                <div className="bg-theme-surface/50 rounded-lg p-4 mt-4">
                  <h3 className="font-semibold text-theme-text mb-2">Key Facts:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>UTC replaced GMT as the world&apos;s time standard in 1972</li>
                    <li>UTC is based on International Atomic Time (TAI)</li>
                    <li>Leap seconds are added to keep UTC within 0.9 seconds of UT1</li>
                    <li>UTC is the same worldwide and does not change with seasons</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
