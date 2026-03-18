"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, User, Clock, Plus, X, Search, Star } from "lucide-react";

interface CityOption {
  city: string;
  country: string;
  timezone: string;
}

const availableCities: CityOption[] = [
  { city: "New York", country: "USA", timezone: "America/New_York" },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles" },
  { city: "Chicago", country: "USA", timezone: "America/Chicago" },
  { city: "Toronto", country: "Canada", timezone: "America/Toronto" },
  { city: "Vancouver", country: "Canada", timezone: "America/Vancouver" },
  { city: "Mexico City", country: "Mexico", timezone: "America/Mexico_City" },
  { city: "London", country: "UK", timezone: "Europe/London" },
  { city: "Paris", country: "France", timezone: "Europe/Paris" },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
  { city: "Rome", country: "Italy", timezone: "Europe/Rome" },
  { city: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
  { city: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam" },
  { city: "Moscow", country: "Russia", timezone: "Europe/Moscow" },
  { city: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { city: "Delhi", country: "India", timezone: "Asia/Kolkata" },
  { city: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore" },
  { city: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong" },
  { city: "Shanghai", country: "China", timezone: "Asia/Shanghai" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { city: "Seoul", country: "South Korea", timezone: "Asia/Seoul" },
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { city: "Melbourne", country: "Australia", timezone: "Australia/Melbourne" },
  { city: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland" },
  { city: "Sao Paulo", country: "Brazil", timezone: "America/Sao_Paulo" },
  { city: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { city: "Cairo", country: "Egypt", timezone: "Africa/Cairo" },
  { city: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg" },
];

export default function PersonalWorldClock() {
  const [selectedCities, setSelectedCities] = useState<CityOption[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load saved cities from localStorage
    const saved = localStorage.getItem("personalWorldClock");
    if (saved) {
      setSelectedCities(JSON.parse(saved));
    } else {
      // Default cities
      setSelectedCities([
        { city: "New York", country: "USA", timezone: "America/New_York" },
        { city: "London", country: "UK", timezone: "Europe/London" },
        { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
      ]);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedCities.length > 0) {
      localStorage.setItem("personalWorldClock", JSON.stringify(selectedCities));
    }
  }, [selectedCities]);

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
      weekday: "long",
      month: "long",
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

  const addCity = (city: CityOption) => {
    if (!selectedCities.find((c) => c.timezone === city.timezone && c.city === city.city)) {
      setSelectedCities([...selectedCities, city]);
    }
    setShowAddModal(false);
    setSearchTerm("");
  };

  const removeCity = (index: number) => {
    setSelectedCities(selectedCities.filter((_, i) => i !== index));
  };

  const filteredCities = availableCities.filter(
    (city) =>
      (city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !selectedCities.find((c) => c.timezone === city.timezone && c.city === city.city)
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
                <User className="w-4 h-4 text-theme-primary" />
                <span className="text-sm text-theme-primary">Personal World Clock</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-theme-text mb-4">
                Personal <span className="text-gradient">World Clock</span>
              </h1>
              <p className="text-theme-text-muted max-w-2xl mx-auto">
                Create your own personalized world clock with your favorite cities. Your selections are saved automatically.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-theme-text flex items-center gap-2">
                  <Star className="w-5 h-5 text-theme-primary" />
                  My Cities ({selectedCities.length})
                </h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-primary text-white hover:bg-theme-primary-dark transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add City
                </button>
              </div>

              {selectedCities.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-theme-text-muted mx-auto mb-4" />
                  <p className="text-theme-text-muted">No cities added yet. Click &quot;Add City&quot; to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCities.map((city, index) => (
                    <div
                      key={`${city.city}-${index}`}
                      className="bg-theme-surface/50 border border-theme-border rounded-xl p-6 hover:border-theme-primary transition-all relative group"
                    >
                      <button
                        onClick={() => removeCity(index)}
                        className="absolute top-3 right-3 p-1 rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-theme-primary" />
                        <span className="text-sm text-theme-text-muted">{getOffset(city.timezone)}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-theme-text">{city.city}</h3>
                      <p className="text-sm text-theme-text-muted mb-3">{city.country}</p>
                      <p className="text-3xl font-mono font-bold text-theme-primary mb-2">
                        {formatTime(city.timezone)}
                      </p>
                      <p className="text-sm text-theme-text-muted">{formatDate(city.timezone)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add City Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="glass-card rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-theme-text">Add City</h3>
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setSearchTerm("");
                      }}
                      className="p-2 rounded-full hover:bg-theme-surface transition-colors"
                    >
                      <X className="w-5 h-5 text-theme-text-muted" />
                    </button>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-theme-surface border border-theme-border text-theme-text placeholder:text-theme-text-muted focus:outline-none focus:ring-2 focus:ring-theme-primary"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 -mx-2 px-2">
                    {filteredCities.map((city, index) => (
                      <button
                        key={`${city.city}-${index}`}
                        onClick={() => addCity(city)}
                        className="w-full text-left p-3 rounded-lg hover:bg-theme-surface transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-theme-text">{city.city}</p>
                          <p className="text-sm text-theme-text-muted">{city.country}</p>
                        </div>
                        <Plus className="w-4 h-4 text-theme-primary" />
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <p className="text-center text-theme-text-muted py-4">No cities found</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
