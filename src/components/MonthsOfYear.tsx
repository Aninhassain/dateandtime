"use client";

import { useState } from "react";
import { LayoutGrid, Calendar, Sun, Snowflake, Leaf, Flower2 } from "lucide-react";

interface MonthInfo {
  name: string;
  days: number;
  season: "winter" | "spring" | "summer" | "fall";
  birthstone: string;
  flower: string;
  zodiacSigns: string;
  facts: string[];
}

const months: MonthInfo[] = [
  {
    name: "January",
    days: 31,
    season: "winter",
    birthstone: "Garnet",
    flower: "Carnation",
    zodiacSigns: "Capricorn & Aquarius",
    facts: ["Named after Janus, Roman god of beginnings", "First month of the Gregorian calendar", "National Mentoring Month"]
  },
  {
    name: "February",
    days: 28,
    season: "winter",
    birthstone: "Amethyst",
    flower: "Violet",
    zodiacSigns: "Aquarius & Pisces",
    facts: ["Only month that can pass without a full moon", "Has 29 days in leap years", "Black History Month in the US"]
  },
  {
    name: "March",
    days: 31,
    season: "spring",
    birthstone: "Aquamarine",
    flower: "Daffodil",
    zodiacSigns: "Pisces & Aries",
    facts: ["Named after Mars, Roman god of war", "Spring equinox occurs this month", "Women's History Month"]
  },
  {
    name: "April",
    days: 30,
    season: "spring",
    birthstone: "Diamond",
    flower: "Daisy",
    zodiacSigns: "Aries & Taurus",
    facts: ["April Fools' Day is celebrated on April 1st", "Earth Day is April 22nd", "Name possibly from Latin 'aperire' meaning 'to open'"]
  },
  {
    name: "May",
    days: 31,
    season: "spring",
    birthstone: "Emerald",
    flower: "Lily of the Valley",
    zodiacSigns: "Taurus & Gemini",
    facts: ["Named after Maia, Greek goddess of fertility", "Mother's Day is celebrated in May", "Memorial Day honors fallen soldiers"]
  },
  {
    name: "June",
    days: 30,
    season: "summer",
    birthstone: "Pearl",
    flower: "Rose",
    zodiacSigns: "Gemini & Cancer",
    facts: ["Named after Juno, Roman goddess of marriage", "Summer solstice occurs in June", "Most popular month for weddings"]
  },
  {
    name: "July",
    days: 31,
    season: "summer",
    birthstone: "Ruby",
    flower: "Larkspur",
    zodiacSigns: "Cancer & Leo",
    facts: ["Named after Julius Caesar", "Independence Day in the US on July 4th", "Hottest month in Northern Hemisphere"]
  },
  {
    name: "August",
    days: 31,
    season: "summer",
    birthstone: "Peridot",
    flower: "Gladiolus",
    zodiacSigns: "Leo & Virgo",
    facts: ["Named after Augustus Caesar", "Last full month of summer", "National Back to School Month"]
  },
  {
    name: "September",
    days: 30,
    season: "fall",
    birthstone: "Sapphire",
    flower: "Aster",
    zodiacSigns: "Virgo & Libra",
    facts: ["Name means 'seventh month' in Latin", "Autumn equinox occurs this month", "Labor Day in the US"]
  },
  {
    name: "October",
    days: 31,
    season: "fall",
    birthstone: "Opal",
    flower: "Marigold",
    zodiacSigns: "Libra & Scorpio",
    facts: ["Name means 'eighth month' in Latin", "Halloween is October 31st", "Breast Cancer Awareness Month"]
  },
  {
    name: "November",
    days: 30,
    season: "fall",
    birthstone: "Topaz",
    flower: "Chrysanthemum",
    zodiacSigns: "Scorpio & Sagittarius",
    facts: ["Name means 'ninth month' in Latin", "Thanksgiving in the US", "Veterans Day on November 11th"]
  },
  {
    name: "December",
    days: 31,
    season: "winter",
    birthstone: "Turquoise",
    flower: "Narcissus",
    zodiacSigns: "Sagittarius & Capricorn",
    facts: ["Name means 'tenth month' in Latin", "Winter solstice (shortest day)", "Major holidays: Christmas, Hanukkah, Kwanzaa"]
  },
];

const MonthsOfYear = () => {
  const [selectedMonth, setSelectedMonth] = useState<MonthInfo | null>(null);

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case "winter": return <Snowflake className="w-5 h-5" />;
      case "spring": return <Flower2 className="w-5 h-5" />;
      case "summer": return <Sun className="w-5 h-5" />;
      case "fall": return <Leaf className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "winter": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "spring": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "summer": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "fall": return "bg-orange-500/20 text-orange-500 border-orange-500/30";
      default: return "bg-theme-surface text-theme-text-muted";
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <LayoutGrid className="w-4 h-4 text-theme-primary" />
            <span className="text-sm text-theme-primary">Month Information</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Months of</span>{" "}
            <span className="text-theme-text">the Year</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Learn about each month, its history, and special characteristics
          </p>
        </header>

        {!selectedMonth ? (
          <section className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {months.map((month, idx) => (
                <div
                  key={month.name}
                  onClick={() => setSelectedMonth(month)}
                  className="glass-card p-5 cursor-pointer hover:border-theme-primary/50 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-theme-text">{month.name}</h3>
                    <span className={`p-2 rounded-full ${getSeasonColor(month.season)}`}>
                      {getSeasonIcon(month.season)}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-theme-text-muted">{month.days} days</p>
                    <p className="text-theme-text-muted">Birthstone: {month.birthstone}</p>
                    <p className="text-theme-text-muted capitalize">{month.season}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="max-w-4xl mx-auto">
            <div className="glass-card p-6 md:p-8">
              <button
                type="button"
                onClick={() => setSelectedMonth(null)}
                className="text-theme-primary hover:underline mb-4"
              >
                &larr; Back to all months
              </button>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gradient">{selectedMonth.name}</h2>
                <span className={`p-3 rounded-full ${getSeasonColor(selectedMonth.season)}`}>
                  {getSeasonIcon(selectedMonth.season)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border">
                    <h4 className="font-semibold text-theme-text mb-2">Basic Info</h4>
                    <ul className="space-y-2 text-theme-text-muted">
                      <li><span className="font-medium text-theme-text">Days:</span> {selectedMonth.days} (29 in leap years for Feb)</li>
                      <li><span className="font-medium text-theme-text">Season:</span> {selectedMonth.season.charAt(0).toUpperCase() + selectedMonth.season.slice(1)}</li>
                      <li><span className="font-medium text-theme-text">Zodiac:</span> {selectedMonth.zodiacSigns}</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border">
                    <h4 className="font-semibold text-theme-text mb-2">Symbols</h4>
                    <ul className="space-y-2 text-theme-text-muted">
                      <li><span className="font-medium text-theme-text">Birthstone:</span> {selectedMonth.birthstone}</li>
                      <li><span className="font-medium text-theme-text">Flower:</span> {selectedMonth.flower}</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border">
                  <h4 className="font-semibold text-theme-text mb-2">Fun Facts</h4>
                  <ul className="space-y-2">
                    {selectedMonth.facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-theme-text-muted">
                        <span className="text-theme-primary">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MonthsOfYear;
