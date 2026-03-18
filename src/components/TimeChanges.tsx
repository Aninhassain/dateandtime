"use client";

import { useState } from "react";
import { Globe2, Search, Calendar, Clock, ArrowRight } from "lucide-react";

interface TimeChange {
  country: string;
  region: string;
  changeType: "spring" | "fall" | "permanent";
  date: string;
  time: string;
  fromOffset: string;
  toOffset: string;
  description: string;
}

const upcomingChanges: TimeChange[] = [
  { country: "United States", region: "Most states", changeType: "spring", date: "March 9, 2025", time: "02:00", fromOffset: "UTC-5", toOffset: "UTC-4", description: "Clocks spring forward 1 hour" },
  { country: "Canada", region: "Most provinces", changeType: "spring", date: "March 9, 2025", time: "02:00", fromOffset: "UTC-5", toOffset: "UTC-4", description: "Clocks spring forward 1 hour" },
  { country: "Mexico", region: "Border states", changeType: "spring", date: "March 9, 2025", time: "02:00", fromOffset: "UTC-7", toOffset: "UTC-6", description: "Clocks spring forward 1 hour" },
  { country: "European Union", region: "All member states", changeType: "spring", date: "March 30, 2025", time: "01:00 UTC", fromOffset: "UTC+1", toOffset: "UTC+2", description: "Clocks spring forward 1 hour" },
  { country: "United Kingdom", region: "All", changeType: "spring", date: "March 30, 2025", time: "01:00", fromOffset: "UTC+0", toOffset: "UTC+1", description: "Clocks spring forward to BST" },
  { country: "Australia", region: "NSW, VIC, TAS, SA, ACT", changeType: "fall", date: "April 6, 2025", time: "03:00", fromOffset: "UTC+11", toOffset: "UTC+10", description: "Clocks fall back 1 hour" },
  { country: "New Zealand", region: "All", changeType: "fall", date: "April 6, 2025", time: "03:00", fromOffset: "UTC+13", toOffset: "UTC+12", description: "Clocks fall back 1 hour" },
  { country: "Chile", region: "All except Magallanes", changeType: "fall", date: "April 6, 2025", time: "00:00", fromOffset: "UTC-3", toOffset: "UTC-4", description: "Clocks fall back 1 hour" },
  { country: "European Union", region: "All member states", changeType: "fall", date: "October 26, 2025", time: "01:00 UTC", fromOffset: "UTC+2", toOffset: "UTC+1", description: "Clocks fall back 1 hour" },
  { country: "United Kingdom", region: "All", changeType: "fall", date: "October 26, 2025", time: "02:00", fromOffset: "UTC+1", toOffset: "UTC+0", description: "Clocks fall back to GMT" },
  { country: "United States", region: "Most states", changeType: "fall", date: "November 2, 2025", time: "02:00", fromOffset: "UTC-4", toOffset: "UTC-5", description: "Clocks fall back 1 hour" },
  { country: "Canada", region: "Most provinces", changeType: "fall", date: "November 2, 2025", time: "02:00", fromOffset: "UTC-4", toOffset: "UTC-5", description: "Clocks fall back 1 hour" },
  { country: "Australia", region: "NSW, VIC, TAS, SA, ACT", changeType: "spring", date: "October 5, 2025", time: "02:00", fromOffset: "UTC+10", toOffset: "UTC+11", description: "Clocks spring forward 1 hour" },
  { country: "New Zealand", region: "All", changeType: "spring", date: "September 28, 2025", time: "02:00", fromOffset: "UTC+12", toOffset: "UTC+13", description: "Clocks spring forward 1 hour" },
];

const TimeChanges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "spring" | "fall">("all");

  const filteredChanges = upcomingChanges.filter((change) => {
    const matchesSearch =
      change.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || change.changeType === filterType;
    return matchesSearch && matchesType;
  });

  const sortedChanges = [...filteredChanges].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <Globe2 className="w-4 h-4 text-theme-primary" />
            <span className="text-sm text-theme-primary">Upcoming Changes</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Time Changes</span>{" "}
            <span className="text-theme-text">Worldwide</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Upcoming daylight saving time changes around the world
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Search Country</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search country or region..."
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Change Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as "all" | "spring" | "fall")}
                  className="w-full"
                >
                  <option value="all">All Changes</option>
                  <option value="spring">Spring Forward</option>
                  <option value="fall">Fall Back</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-theme-primary" />
              Upcoming Changes ({sortedChanges.length})
            </h2>

            <div className="space-y-4">
              {sortedChanges.map((change, index) => (
                <div
                  key={`${change.country}-${change.date}-${index}`}
                  className={`p-4 rounded-lg border ${
                    change.changeType === "spring"
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-orange-500/5 border-orange-500/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-theme-text text-lg">{change.country}</h3>
                      <p className="text-sm text-theme-text-muted">{change.region}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        change.changeType === "spring"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-orange-500/20 text-orange-500"
                      }`}
                    >
                      {change.changeType === "spring" ? "Spring Forward" : "Fall Back"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-theme-text-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Date
                      </p>
                      <p className="text-sm text-theme-text font-medium">{change.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-theme-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Time
                      </p>
                      <p className="text-sm text-theme-text font-medium">{change.time}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-theme-text-muted">Offset Change</p>
                      <p className="text-sm text-theme-text font-medium flex items-center gap-2">
                        {change.fromOffset}
                        <ArrowRight className="w-4 h-4 text-theme-primary" />
                        {change.toOffset}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-theme-text-muted mt-3 italic">{change.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TimeChanges;
