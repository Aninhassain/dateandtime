"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Globe2, Clock, Search, Filter } from "lucide-react";

interface CityTime {
  city: string;
  country: string;
  timezone: string;
  region: string;
}

const allCities: CityTime[] = [
  // North America
  { city: "New York", country: "USA", timezone: "America/New_York", region: "North America" },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", region: "North America" },
  { city: "Chicago", country: "USA", timezone: "America/Chicago", region: "North America" },
  { city: "Denver", country: "USA", timezone: "America/Denver", region: "North America" },
  { city: "Phoenix", country: "USA", timezone: "America/Phoenix", region: "North America" },
  { city: "Toronto", country: "Canada", timezone: "America/Toronto", region: "North America" },
  { city: "Vancouver", country: "Canada", timezone: "America/Vancouver", region: "North America" },
  { city: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", region: "North America" },
  // Europe
  { city: "London", country: "UK", timezone: "Europe/London", region: "Europe" },
  { city: "Paris", country: "France", timezone: "Europe/Paris", region: "Europe" },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin", region: "Europe" },
  { city: "Rome", country: "Italy", timezone: "Europe/Rome", region: "Europe" },
  { city: "Madrid", country: "Spain", timezone: "Europe/Madrid", region: "Europe" },
  { city: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam", region: "Europe" },
  { city: "Moscow", country: "Russia", timezone: "Europe/Moscow", region: "Europe" },
  { city: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul", region: "Europe" },
  { city: "Athens", country: "Greece", timezone: "Europe/Athens", region: "Europe" },
  { city: "Warsaw", country: "Poland", timezone: "Europe/Warsaw", region: "Europe" },
  // Asia
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai", region: "Asia" },
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata", region: "Asia" },
  { city: "Delhi", country: "India", timezone: "Asia/Kolkata", region: "Asia" },
  { city: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", region: "Asia" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore", region: "Asia" },
  { city: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong", region: "Asia" },
  { city: "Shanghai", country: "China", timezone: "Asia/Shanghai", region: "Asia" },
  { city: "Beijing", country: "China", timezone: "Asia/Shanghai", region: "Asia" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", region: "Asia" },
  { city: "Seoul", country: "South Korea", timezone: "Asia/Seoul", region: "Asia" },
  { city: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta", region: "Asia" },
  { city: "Manila", country: "Philippines", timezone: "Asia/Manila", region: "Asia" },
  // Oceania
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney", region: "Oceania" },
  { city: "Melbourne", country: "Australia", timezone: "Australia/Melbourne", region: "Oceania" },
  { city: "Brisbane", country: "Australia", timezone: "Australia/Brisbane", region: "Oceania" },
  { city: "Perth", country: "Australia", timezone: "Australia/Perth", region: "Oceania" },
  { city: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland", region: "Oceania" },
  // South America
  { city: "Sao Paulo", country: "Brazil", timezone: "America/Sao_Paulo", region: "South America" },
  { city: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires", region: "South America" },
  { city: "Lima", country: "Peru", timezone: "America/Lima", region: "South America" },
  { city: "Bogota", country: "Colombia", timezone: "America/Bogota", region: "South America" },
  { city: "Santiago", country: "Chile", timezone: "America/Santiago", region: "South America" },
  // Africa
  { city: "Cairo", country: "Egypt", timezone: "Africa/Cairo", region: "Africa" },
  { city: "Lagos", country: "Nigeria", timezone: "Africa/Lagos", region: "Africa" },
  { city: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg", region: "Africa" },
  { city: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi", region: "Africa" },
  { city: "Casablanca", country: "Morocco", timezone: "Africa/Casablanca", region: "Africa" },
];

const regions = ["All", "North America", "Europe", "Asia", "Oceania", "South America", "Africa"];

export default function ExtendedWorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timezone: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(currentTime);
  };

  const formatDate = (timezone: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(currentTime);
  };

  const getOffset = (timezone: string) => {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
    const diff = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
    const hours = Math.floor(Math.abs(diff));
    const minutes = Math.round((Math.abs(diff) - hours) * 60);
    const sign = diff >= 0 ? "+" : "-";
    return `UTC${sign}${hours}${minutes > 0 ? `:${minutes.toString().padStart(2, "0")}` : ""}`;
  };

  const filteredCities = allCities.filter((city) => {
    const matchesSearch =
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "All" || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 starry-base" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-primary" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-secondary" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 horizon-glow" />

      <div className="relative z-10">
        <div className="w-full px-2 md:px-4 py-8 md:py-14 mx-auto">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-theme-primary hover:text-theme-primary-dark transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
                <Globe2 className="w-4 h-4 text-theme-primary" />
                <span className="text-sm text-theme-primary">Extended World Clock</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-theme-text mb-4">
                Extended <span className="text-gradient">World Clock</span>
              </h1>
              <p className="text-theme-text-muted max-w-2xl mx-auto">
                Comprehensive world clock with {allCities.length} cities across all continents. Filter by region or search for specific cities.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="text"
                    placeholder="Search cities or countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-theme-surface border border-theme-border text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:ring-2 focus:ring-theme-primary"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="pl-10 pr-8 py-3 rounded-lg bg-theme-surface border border-theme-border text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary appearance-none cursor-pointer"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-sm text-theme-text-muted mb-4">
                Showing {filteredCities.length} cities
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCities.map((city, index) => (
                  <div
                    key={`${city.city}-${index}`}
                    className="bg-theme-surface/50 border border-theme-border rounded-xl p-4 hover:border-theme-primary transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-theme-primary/10 text-theme-primary">
                        {city.region}
                      </span>
                      <span className="text-xs text-theme-text-muted">{getOffset(city.timezone)}</span>
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
                  No cities found matching your criteria.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
