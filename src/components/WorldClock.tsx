"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Clock, Search } from "lucide-react";

interface CityTime {
  city: string;
  country: string;
  timezone: string;
  offset: string;
}

const majorCities: CityTime[] = [
  { city: "New York", country: "USA", timezone: "America/New_York", offset: "UTC-5" },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", offset: "UTC-8" },
  { city: "London", country: "UK", timezone: "Europe/London", offset: "UTC+0" },
  { city: "Paris", country: "France", timezone: "Europe/Paris", offset: "UTC+1" },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin", offset: "UTC+1" },
  { city: "Moscow", country: "Russia", timezone: "Europe/Moscow", offset: "UTC+3" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai", offset: "UTC+4" },
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata", offset: "UTC+5:30" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore", offset: "UTC+8" },
  { city: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong", offset: "UTC+8" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", offset: "UTC+9" },
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney", offset: "UTC+11" },
];

export default function WorldClock() {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: Date }>({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      const times: { [key: string]: Date } = {};
      majorCities.forEach((city) => {
        times[city.timezone] = new Date();
      });
      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timezone: string) => {
    if (!currentTimes[timezone]) return "--:--:--";
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(currentTimes[timezone]);
  };

  const formatDate = (timezone: string) => {
    if (!currentTimes[timezone]) return "";
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(currentTimes[timezone]);
  };

  const filteredCities = majorCities.filter(
    (city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 starry-base" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-primary" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-secondary" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 horizon-glow" />

      <div className="relative z-10">
        <div className="w-full px-2 md:px-4 py-8 md:py-14 mx-auto">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-theme-primary hover:text-theme-primary-dark transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
                <Globe className="w-4 h-4 text-theme-primary" />
                <span className="text-sm text-theme-primary">World Clock</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-theme-text mb-4">
                Main <span className="text-gradient">World Clock</span>
              </h1>
              <p className="text-theme-text-muted max-w-2xl mx-auto">
                View the current time in major cities around the world. All times update in real-time.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-theme-surface border border-theme-border text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:ring-2 focus:ring-theme-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCities.map((city) => (
                  <div
                    key={city.timezone}
                    className="bg-theme-surface/50 border border-theme-border rounded-xl p-4 hover:border-theme-primary transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-theme-primary" />
                      <span className="text-xs text-theme-text-muted">{city.offset}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-theme-text">{city.city}</h3>
                    <p className="text-sm text-theme-text-muted mb-2">{city.country}</p>
                    <p className="text-2xl font-mono font-bold text-theme-primary">
                      {formatTime(city.timezone)}
                    </p>
                    <p className="text-sm text-theme-text-muted">{formatDate(city.timezone)}</p>
                  </div>
                ))}
              </div>

              {filteredCities.length === 0 && (
                <p className="text-center text-theme-text-muted py-8">
                  No cities found matching &quot;{searchTerm}&quot;
                </p>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-theme-text mb-4">About the World Clock</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-theme-text-muted">
                  The World Clock displays the current local time in major cities across different time zones.
                  Time zones are regions that observe a uniform standard time for legal, commercial, and social purposes.
                  They generally follow the boundaries of countries or regions.
                </p>
                <p className="text-theme-text-muted mt-4">
                  UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time.
                  Most time zones are defined as offsets from UTC, ranging from UTC-12 to UTC+14.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
