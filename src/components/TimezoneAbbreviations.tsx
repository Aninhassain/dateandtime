"use client";

import { useState } from "react";
import { List, Search, Clock } from "lucide-react";

interface TimezoneAbbr {
  abbr: string;
  name: string;
  offset: string;
  regions: string[];
}

const timezoneAbbreviations: TimezoneAbbr[] = [
  { abbr: "ACDT", name: "Australian Central Daylight Time", offset: "UTC+10:30", regions: ["Australia"] },
  { abbr: "ACST", name: "Australian Central Standard Time", offset: "UTC+9:30", regions: ["Australia"] },
  { abbr: "ADT", name: "Atlantic Daylight Time", offset: "UTC-3", regions: ["North America"] },
  { abbr: "AEDT", name: "Australian Eastern Daylight Time", offset: "UTC+11", regions: ["Australia"] },
  { abbr: "AEST", name: "Australian Eastern Standard Time", offset: "UTC+10", regions: ["Australia"] },
  { abbr: "AFT", name: "Afghanistan Time", offset: "UTC+4:30", regions: ["Asia"] },
  { abbr: "AKDT", name: "Alaska Daylight Time", offset: "UTC-8", regions: ["North America"] },
  { abbr: "AKST", name: "Alaska Standard Time", offset: "UTC-9", regions: ["North America"] },
  { abbr: "AST", name: "Atlantic Standard Time", offset: "UTC-4", regions: ["North America", "Caribbean"] },
  { abbr: "AWST", name: "Australian Western Standard Time", offset: "UTC+8", regions: ["Australia"] },
  { abbr: "BST", name: "British Summer Time", offset: "UTC+1", regions: ["Europe"] },
  { abbr: "CAT", name: "Central Africa Time", offset: "UTC+2", regions: ["Africa"] },
  { abbr: "CDT", name: "Central Daylight Time", offset: "UTC-5", regions: ["North America"] },
  { abbr: "CEST", name: "Central European Summer Time", offset: "UTC+2", regions: ["Europe"] },
  { abbr: "CET", name: "Central European Time", offset: "UTC+1", regions: ["Europe"] },
  { abbr: "CST", name: "Central Standard Time", offset: "UTC-6", regions: ["North America"] },
  { abbr: "EAT", name: "East Africa Time", offset: "UTC+3", regions: ["Africa"] },
  { abbr: "EDT", name: "Eastern Daylight Time", offset: "UTC-4", regions: ["North America"] },
  { abbr: "EEST", name: "Eastern European Summer Time", offset: "UTC+3", regions: ["Europe"] },
  { abbr: "EET", name: "Eastern European Time", offset: "UTC+2", regions: ["Europe"] },
  { abbr: "EST", name: "Eastern Standard Time", offset: "UTC-5", regions: ["North America"] },
  { abbr: "GMT", name: "Greenwich Mean Time", offset: "UTC+0", regions: ["Europe", "Africa"] },
  { abbr: "GST", name: "Gulf Standard Time", offset: "UTC+4", regions: ["Asia"] },
  { abbr: "HKT", name: "Hong Kong Time", offset: "UTC+8", regions: ["Asia"] },
  { abbr: "HST", name: "Hawaii-Aleutian Standard Time", offset: "UTC-10", regions: ["North America"] },
  { abbr: "ICT", name: "Indochina Time", offset: "UTC+7", regions: ["Asia"] },
  { abbr: "IST", name: "India Standard Time", offset: "UTC+5:30", regions: ["Asia"] },
  { abbr: "JST", name: "Japan Standard Time", offset: "UTC+9", regions: ["Asia"] },
  { abbr: "KST", name: "Korea Standard Time", offset: "UTC+9", regions: ["Asia"] },
  { abbr: "MDT", name: "Mountain Daylight Time", offset: "UTC-6", regions: ["North America"] },
  { abbr: "MSK", name: "Moscow Standard Time", offset: "UTC+3", regions: ["Europe"] },
  { abbr: "MST", name: "Mountain Standard Time", offset: "UTC-7", regions: ["North America"] },
  { abbr: "NZDT", name: "New Zealand Daylight Time", offset: "UTC+13", regions: ["Pacific"] },
  { abbr: "NZST", name: "New Zealand Standard Time", offset: "UTC+12", regions: ["Pacific"] },
  { abbr: "PDT", name: "Pacific Daylight Time", offset: "UTC-7", regions: ["North America"] },
  { abbr: "PHT", name: "Philippine Time", offset: "UTC+8", regions: ["Asia"] },
  { abbr: "PKT", name: "Pakistan Standard Time", offset: "UTC+5", regions: ["Asia"] },
  { abbr: "PST", name: "Pacific Standard Time", offset: "UTC-8", regions: ["North America"] },
  { abbr: "SGT", name: "Singapore Time", offset: "UTC+8", regions: ["Asia"] },
  { abbr: "UTC", name: "Coordinated Universal Time", offset: "UTC+0", regions: ["Worldwide"] },
  { abbr: "WAT", name: "West Africa Time", offset: "UTC+1", regions: ["Africa"] },
  { abbr: "WEST", name: "Western European Summer Time", offset: "UTC+1", regions: ["Europe"] },
  { abbr: "WET", name: "Western European Time", offset: "UTC+0", regions: ["Europe"] },
  { abbr: "WIB", name: "Western Indonesian Time", offset: "UTC+7", regions: ["Asia"] },
  { abbr: "WIT", name: "Eastern Indonesian Time", offset: "UTC+9", regions: ["Asia"] },
  { abbr: "WITA", name: "Central Indonesian Time", offset: "UTC+8", regions: ["Asia"] },
];

const TimezoneAbbreviations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");

  const regions = ["all", ...Array.from(new Set(timezoneAbbreviations.flatMap((tz) => tz.regions)))];

  const filteredAbbreviations = timezoneAbbreviations.filter((tz) => {
    const matchesSearch =
      tz.abbr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tz.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === "all" || tz.regions.includes(filterRegion);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary/10 border border-theme-secondary/20 mb-4">
            <List className="w-4 h-4 text-theme-secondary" />
            <span className="text-sm text-theme-secondary">Reference</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Time Zone</span>{" "}
            <span className="text-theme-text">Abbreviations</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Complete list of time zone abbreviations worldwide
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search abbreviation or name..."
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Filter by Region</label>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full capitalize"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region === "all" ? "All Regions" : region}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-theme-text flex items-center gap-2">
                <Clock className="w-5 h-5 text-theme-secondary" />
                Abbreviations ({filteredAbbreviations.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-theme-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">Abbr</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">Full Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">Offset</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-theme-text-muted">Regions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAbbreviations.map((tz) => (
                    <tr key={tz.abbr} className="border-b border-theme-border/50 hover:bg-theme-surface/30">
                      <td className="py-3 px-4">
                        <span className="font-bold text-gradient">{tz.abbr}</span>
                      </td>
                      <td className="py-3 px-4 text-theme-text">{tz.name}</td>
                      <td className="py-3 px-4 text-theme-text-muted font-mono">{tz.offset}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {tz.regions.map((region) => (
                            <span
                              key={region}
                              className="px-2 py-0.5 bg-theme-surface/50 rounded text-xs text-theme-text-muted"
                            >
                              {region}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TimezoneAbbreviations;
