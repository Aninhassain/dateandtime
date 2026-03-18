"use client";

import { useState, useEffect } from "react";
import { ArrowLeftRight, Clock, MapPin, ArrowRight } from "lucide-react";

interface City {
  name: string;
  country: string;
  timezone: string;
  offset: number;
}

const cities: City[] = [
  { name: "New York", country: "USA", timezone: "EST/EDT", offset: -5 },
  { name: "Los Angeles", country: "USA", timezone: "PST/PDT", offset: -8 },
  { name: "Chicago", country: "USA", timezone: "CST/CDT", offset: -6 },
  { name: "London", country: "UK", timezone: "GMT/BST", offset: 0 },
  { name: "Paris", country: "France", timezone: "CET/CEST", offset: 1 },
  { name: "Berlin", country: "Germany", timezone: "CET/CEST", offset: 1 },
  { name: "Moscow", country: "Russia", timezone: "MSK", offset: 3 },
  { name: "Dubai", country: "UAE", timezone: "GST", offset: 4 },
  { name: "Mumbai", country: "India", timezone: "IST", offset: 5.5 },
  { name: "Singapore", country: "Singapore", timezone: "SGT", offset: 8 },
  { name: "Hong Kong", country: "China", timezone: "HKT", offset: 8 },
  { name: "Beijing", country: "China", timezone: "CST", offset: 8 },
  { name: "Tokyo", country: "Japan", timezone: "JST", offset: 9 },
  { name: "Seoul", country: "South Korea", timezone: "KST", offset: 9 },
  { name: "Sydney", country: "Australia", timezone: "AEST/AEDT", offset: 10 },
  { name: "Auckland", country: "New Zealand", timezone: "NZST/NZDT", offset: 12 },
  { name: "São Paulo", country: "Brazil", timezone: "BRT", offset: -3 },
  { name: "Mexico City", country: "Mexico", timezone: "CST", offset: -6 },
  { name: "Toronto", country: "Canada", timezone: "EST/EDT", offset: -5 },
  { name: "Vancouver", country: "Canada", timezone: "PST/PDT", offset: -8 },
  { name: "Cairo", country: "Egypt", timezone: "EET", offset: 2 },
  { name: "Johannesburg", country: "South Africa", timezone: "SAST", offset: 2 },
  { name: "Bangkok", country: "Thailand", timezone: "ICT", offset: 7 },
  { name: "Jakarta", country: "Indonesia", timezone: "WIB", offset: 7 },
];

const TimeDifference = () => {
  const [city1, setCity1] = useState("New York");
  const [city2, setCity2] = useState("London");
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({});

  const getCity = (name: string): City | undefined => {
    return cities.find((c) => c.name === name);
  };

  const city1Data = getCity(city1);
  const city2Data = getCity(city2);

  const timeDiff = city1Data && city2Data ? city2Data.offset - city1Data.offset : 0;

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const times: { [key: string]: string } = {};

      cities.forEach((city) => {
        const localTime = new Date(utcTime + city.offset * 60 * 60 * 1000);
        times[city.name] = localTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      });

      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const swapCities = () => {
    const temp = city1;
    setCity1(city2);
    setCity2(temp);
  };

  const formatTimeDiff = (diff: number): string => {
    const absHours = Math.abs(Math.floor(diff));
    const minutes = Math.abs((diff % 1) * 60);
    const sign = diff >= 0 ? "ahead" : "behind";

    if (minutes > 0) {
      return `${absHours}h ${minutes}m ${sign}`;
    }
    return `${absHours} hour${absHours !== 1 ? "s" : ""} ${sign}`;
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary/10 border border-theme-secondary/20 mb-4">
            <ArrowLeftRight className="w-4 h-4 text-theme-secondary" />
            <span className="text-sm text-theme-secondary">Time Comparison</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Time</span>{" "}
            <span className="text-theme-text">Difference</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Calculate time difference between any two cities worldwide
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
              <div className="md:col-span-3 space-y-2">
                <label className="block text-sm font-medium text-theme-text">First Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <select
                    value={city1}
                    onChange={(e) => setCity1(e.target.value)}
                    className="w-full pl-10"
                  >
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}, {city.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={swapCities}
                  className="p-3 rounded-full border border-theme-border hover:border-theme-primary hover:bg-theme-primary/10 transition-all"
                >
                  <ArrowLeftRight className="w-5 h-5 text-theme-text" />
                </button>
              </div>

              <div className="md:col-span-3 space-y-2">
                <label className="block text-sm font-medium text-theme-text">Second Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <select
                    value={city2}
                    onChange={(e) => setCity2(e.target.value)}
                    className="w-full pl-10"
                  >
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}, {city.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="result-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* City 1 */}
              <div className="text-center p-6 bg-theme-surface/30 rounded-xl border border-theme-border">
                <h3 className="font-semibold text-theme-text text-lg mb-1">{city1}</h3>
                <p className="text-sm text-theme-text-muted mb-3">{city1Data?.country}</p>
                <p className="text-4xl font-bold text-gradient mb-2">{currentTimes[city1] || "--:--:--"}</p>
                <p className="text-sm text-theme-text-muted">{city1Data?.timezone}</p>
              </div>

              {/* Difference */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-3">
                  <Clock className="w-4 h-4 text-theme-primary" />
                  <span className="text-sm text-theme-primary">Time Difference</span>
                </div>
                <p className="text-3xl font-bold text-theme-text mb-2">
                  {timeDiff === 0 ? "Same time" : formatTimeDiff(timeDiff)}
                </p>
                {timeDiff !== 0 && (
                  <p className="text-sm text-theme-text-muted flex items-center justify-center gap-2">
                    {city2} is {timeDiff > 0 ? "ahead of" : "behind"} {city1}
                  </p>
                )}
              </div>

              {/* City 2 */}
              <div className="text-center p-6 bg-theme-surface/30 rounded-xl border border-theme-border">
                <h3 className="font-semibold text-theme-text text-lg mb-1">{city2}</h3>
                <p className="text-sm text-theme-text-muted mb-3">{city2Data?.country}</p>
                <p className="text-4xl font-bold text-gradient mb-2">{currentTimes[city2] || "--:--:--"}</p>
                <p className="text-sm text-theme-text-muted">{city2Data?.timezone}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-theme-secondary" />
              Time Conversion Table
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-theme-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">{city1}</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-theme-text-muted"></th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">{city2}</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => {
                    const city2Hour = (hour + timeDiff + 24) % 24;
                    const dayIndicator = hour + timeDiff >= 24 ? " (+1)" : hour + timeDiff < 0 ? " (-1)" : "";
                    return (
                      <tr key={hour} className="border-b border-theme-border/50 hover:bg-theme-surface/30">
                        <td className="py-3 px-4 font-medium text-theme-text">
                          {hour.toString().padStart(2, "0")}:00
                        </td>
                        <td className="py-3 px-4 text-center">
                          <ArrowRight className="w-4 h-4 text-theme-primary mx-auto" />
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-gradient">
                            {Math.floor(city2Hour).toString().padStart(2, "0")}:{((city2Hour % 1) * 60).toString().padStart(2, "0")}
                          </span>
                          {dayIndicator && (
                            <span className="text-xs text-theme-text-muted ml-1">{dayIndicator}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TimeDifference;
