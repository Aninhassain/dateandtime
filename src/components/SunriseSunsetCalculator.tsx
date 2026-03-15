"use client";

import { useState, useCallback } from "react";
import { Sun, Sunset, Sunrise, MapPin, Calendar } from "lucide-react";

interface SunResult {
  sunrise: string;
  sunset: string;
  dayLength: string;
  solarNoon: string;
  twilightStart: string;
  twilightEnd: string;
}

// Simplified sunrise/sunset calculation
const calculateSunTimes = (lat: number, lng: number, date: Date): SunResult => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  // Approximate calculation using simplified algorithm
  const zenith = 90.833;
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;

  // Calculate the day's solar declination
  const declination = 23.45 * Math.sin(D2R * (360 / 365) * (dayOfYear - 81));

  // Calculate the hour angle
  const cosHourAngle = (Math.cos(D2R * zenith) - Math.sin(D2R * lat) * Math.sin(D2R * declination)) /
    (Math.cos(D2R * lat) * Math.cos(D2R * declination));

  // Clamp value to valid range
  const clampedCos = Math.max(-1, Math.min(1, cosHourAngle));
  const hourAngle = R2D * Math.acos(clampedCos);

  // Calculate sunrise and sunset times (in hours)
  const solarNoonHour = 12 - lng / 15;
  const sunriseHour = solarNoonHour - hourAngle / 15;
  const sunsetHour = solarNoonHour + hourAngle / 15;

  // Calculate twilight (civil twilight is about 30 minutes before/after)
  const twilightStartHour = sunriseHour - 0.5;
  const twilightEndHour = sunsetHour + 0.5;

  // Day length
  const dayLengthHours = sunsetHour - sunriseHour;

  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const period = h >= 12 ? "PM" : "AM";
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
  };

  const formatDuration = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return {
    sunrise: formatTime(sunriseHour),
    sunset: formatTime(sunsetHour),
    dayLength: formatDuration(dayLengthHours),
    solarNoon: formatTime(solarNoonHour),
    twilightStart: formatTime(twilightStartHour),
    twilightEnd: formatTime(twilightEndHour),
  };
};

const commonLocations = [
  { name: "New York, USA", lat: 40.7128, lng: -74.006 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
  { name: "Mumbai, India", lat: 19.076, lng: 72.8777 },
  { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
];

const SunriseSunsetCalculator = () => {
  const today = new Date().toISOString().split("T")[0];

  const [latitude, setLatitude] = useState<string>("40.7128");
  const [longitude, setLongitude] = useState<string>("-74.006");
  const [date, setDate] = useState<string>(today);
  const [result, setResult] = useState<SunResult | null>(null);
  const [locationName, setLocationName] = useState<string>("New York, USA");

  const calculate = useCallback(() => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const selectedDate = new Date(date);

    if (!isNaN(lat) && !isNaN(lng)) {
      setResult(calculateSunTimes(lat, lng, selectedDate));
    }
  }, [latitude, longitude, date]);

  const selectLocation = (location: typeof commonLocations[0]) => {
    setLatitude(location.lat.toString());
    setLongitude(location.lng.toString());
    setLocationName(location.name);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setLocationName("Current Location");
        },
        () => {
          alert("Unable to get your location. Please enter coordinates manually.");
        }
      );
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
            <Sun className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-orange-500">Sun Times</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Sunrise/Sunset</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Find sunrise and sunset times for any location and date
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            {/* Quick Location Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-theme-text mb-2">Quick Select Location</label>
              <div className="flex flex-wrap gap-2">
                {commonLocations.map((loc) => (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      locationName === loc.name
                        ? "bg-orange-500/20 border-orange-500/40 text-orange-500"
                        : "border-theme-border text-theme-text-muted hover:border-orange-500"
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={useCurrentLocation}
                  className="px-3 py-1 rounded-full text-sm border border-theme-border text-theme-text-muted hover:border-orange-500 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  My Location
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="-90 to 90"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="-180 to 180"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>
            </div>

            <button type="button" onClick={calculate} className="btn-primary flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Calculate Sun Times
            </button>
          </div>
        </section>

        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-orange-500" />
                </span>
                Sun Times for {locationName}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-6 border border-orange-500/20 text-center">
                  <Sunrise className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-theme-text">{result.sunrise}</p>
                  <p className="text-sm text-theme-text-muted">Sunrise</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/20 text-center">
                  <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-theme-text">{result.solarNoon}</p>
                  <p className="text-sm text-theme-text-muted">Solar Noon</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/20 text-center">
                  <Sunset className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-theme-text">{result.sunset}</p>
                  <p className="text-sm text-theme-text-muted">Sunset</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.dayLength}</p>
                  <p className="text-sm text-theme-text-muted">Day Length</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.twilightStart}</p>
                  <p className="text-sm text-theme-text-muted">Dawn (Civil Twilight)</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-2xl font-bold text-gradient">{result.twilightEnd}</p>
                  <p className="text-sm text-theme-text-muted">Dusk (Civil Twilight)</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SunriseSunsetCalculator;
