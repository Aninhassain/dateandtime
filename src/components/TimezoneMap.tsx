"use client";

import { useState, useEffect } from "react";
import { Map, Clock, Globe } from "lucide-react";

interface TimezoneRegion {
  name: string;
  offset: number;
  cities: string[];
  color: string;
}

const timezoneRegions: TimezoneRegion[] = [
  { name: "UTC-12", offset: -12, cities: ["Baker Island"], color: "bg-blue-900" },
  { name: "UTC-11", offset: -11, cities: ["American Samoa"], color: "bg-blue-800" },
  { name: "UTC-10", offset: -10, cities: ["Honolulu"], color: "bg-blue-700" },
  { name: "UTC-9", offset: -9, cities: ["Anchorage"], color: "bg-blue-600" },
  { name: "UTC-8 (PST)", offset: -8, cities: ["Los Angeles", "Vancouver", "Seattle"], color: "bg-indigo-600" },
  { name: "UTC-7 (MST)", offset: -7, cities: ["Denver", "Phoenix"], color: "bg-indigo-500" },
  { name: "UTC-6 (CST)", offset: -6, cities: ["Chicago", "Mexico City"], color: "bg-violet-600" },
  { name: "UTC-5 (EST)", offset: -5, cities: ["New York", "Toronto", "Miami"], color: "bg-violet-500" },
  { name: "UTC-4", offset: -4, cities: ["Santiago", "Halifax"], color: "bg-purple-600" },
  { name: "UTC-3", offset: -3, cities: ["São Paulo", "Buenos Aires"], color: "bg-purple-500" },
  { name: "UTC-2", offset: -2, cities: ["South Georgia"], color: "bg-fuchsia-600" },
  { name: "UTC-1", offset: -1, cities: ["Azores", "Cape Verde"], color: "bg-fuchsia-500" },
  { name: "UTC+0 (GMT)", offset: 0, cities: ["London", "Dublin", "Lisbon"], color: "bg-pink-500" },
  { name: "UTC+1 (CET)", offset: 1, cities: ["Paris", "Berlin", "Rome"], color: "bg-rose-500" },
  { name: "UTC+2 (EET)", offset: 2, cities: ["Athens", "Cairo", "Helsinki"], color: "bg-red-500" },
  { name: "UTC+3 (MSK)", offset: 3, cities: ["Moscow", "Istanbul", "Riyadh"], color: "bg-orange-500" },
  { name: "UTC+4", offset: 4, cities: ["Dubai", "Baku"], color: "bg-orange-400" },
  { name: "UTC+5", offset: 5, cities: ["Karachi", "Tashkent"], color: "bg-amber-500" },
  { name: "UTC+5:30 (IST)", offset: 5.5, cities: ["Mumbai", "New Delhi", "Kolkata"], color: "bg-amber-400" },
  { name: "UTC+6", offset: 6, cities: ["Dhaka", "Almaty"], color: "bg-yellow-500" },
  { name: "UTC+7", offset: 7, cities: ["Bangkok", "Jakarta", "Hanoi"], color: "bg-yellow-400" },
  { name: "UTC+8 (CST)", offset: 8, cities: ["Beijing", "Singapore", "Hong Kong"], color: "bg-lime-500" },
  { name: "UTC+9 (JST)", offset: 9, cities: ["Tokyo", "Seoul"], color: "bg-green-500" },
  { name: "UTC+10 (AEST)", offset: 10, cities: ["Sydney", "Melbourne"], color: "bg-emerald-500" },
  { name: "UTC+11", offset: 11, cities: ["Solomon Islands"], color: "bg-teal-500" },
  { name: "UTC+12 (NZST)", offset: 12, cities: ["Auckland", "Fiji"], color: "bg-cyan-500" },
];

const TimezoneMap = () => {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({});
  const [selectedZone, setSelectedZone] = useState<TimezoneRegion | null>(null);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const times: { [key: string]: string } = {};

      timezoneRegions.forEach((region) => {
        const localTime = new Date(utcTime + region.offset * 60 * 60 * 1000);
        times[region.name] = localTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      });

      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <Map className="w-4 h-4 text-theme-primary" />
            <span className="text-sm text-theme-primary">World Time Zones</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Time Zone</span>{" "}
            <span className="text-theme-text">Map</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Visual overview of world time zones
          </p>
        </header>

        {/* Visual Time Zone Bar */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-theme-primary" />
              World Time Zones (UTC Offsets)
            </h2>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-1 min-w-max">
                {timezoneRegions.map((region) => (
                  <button
                    key={region.name}
                    type="button"
                    onClick={() => setSelectedZone(region)}
                    className={`${region.color} px-3 py-8 rounded-lg text-white text-xs font-semibold hover:opacity-80 transition-opacity flex flex-col items-center justify-center min-w-[60px] ${
                      selectedZone?.name === region.name ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""
                    }`}
                  >
                    <span>{region.offset >= 0 ? `+${region.offset}` : region.offset}</span>
                    <span className="text-[10px] opacity-80 mt-1">{currentTimes[region.name]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Selected Zone Details */}
        {selectedZone && (
          <section className="max-w-4xl mx-auto mb-8 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-theme-primary/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-theme-primary" />
                </span>
                {selectedZone.name}
              </h2>
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-4 border border-theme-border">
                <p className="text-4xl font-bold text-gradient">{currentTimes[selectedZone.name]}</p>
                <p className="text-theme-text-muted mt-2">
                  UTC {selectedZone.offset >= 0 ? `+${selectedZone.offset}` : selectedZone.offset} hours
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-theme-text mb-2">Major Cities:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedZone.cities.map((city) => (
                    <span key={city} className="px-3 py-1 bg-theme-surface/50 rounded-full text-sm text-theme-text border border-theme-border">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Time Zones Grid */}
        <section className="max-w-6xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4">All Time Zones</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {timezoneRegions.map((region) => (
                <div
                  key={region.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-theme-surface/30 border border-theme-border"
                >
                  <div>
                    <p className="font-semibold text-theme-text text-sm">{region.name}</p>
                    <p className="text-xs text-theme-text-muted">{region.cities[0]}</p>
                  </div>
                  <p className="text-lg font-bold text-gradient">{currentTimes[region.name]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TimezoneMap;
