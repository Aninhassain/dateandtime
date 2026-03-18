"use client";

import { useState } from "react";
import { Flag, Search, Calendar, Globe } from "lucide-react";

interface Holiday {
  name: string;
  date: string;
  country: string;
  type: "public" | "religious" | "observance";
  description: string;
}

const holidays: Holiday[] = [
  { name: "New Year's Day", date: "January 1", country: "Worldwide", type: "public", description: "Celebration of the first day of the new year" },
  { name: "Chinese New Year", date: "January/February", country: "China, Asia", type: "public", description: "Traditional Chinese festival marking the lunar new year" },
  { name: "Valentine's Day", date: "February 14", country: "Worldwide", type: "observance", description: "Day celebrating love and affection" },
  { name: "Mardi Gras", date: "February/March", country: "USA, Brazil", type: "observance", description: "Carnival celebration before Lent" },
  { name: "Holi", date: "March", country: "India", type: "religious", description: "Hindu festival of colors celebrating spring" },
  { name: "St. Patrick's Day", date: "March 17", country: "Ireland, USA", type: "observance", description: "Celebration of Irish culture and heritage" },
  { name: "Easter", date: "March/April", country: "Worldwide", type: "religious", description: "Christian holiday celebrating resurrection of Jesus" },
  { name: "Passover", date: "March/April", country: "Israel, Worldwide", type: "religious", description: "Jewish holiday commemorating exodus from Egypt" },
  { name: "Eid al-Fitr", date: "Varies", country: "Muslim Countries", type: "religious", description: "Islamic holiday marking end of Ramadan" },
  { name: "Mother's Day", date: "May (varies)", country: "Worldwide", type: "observance", description: "Day honoring mothers and motherhood" },
  { name: "Memorial Day", date: "Last Monday May", country: "USA", type: "public", description: "Day honoring military personnel who died in service" },
  { name: "Father's Day", date: "June (varies)", country: "Worldwide", type: "observance", description: "Day honoring fathers and fatherhood" },
  { name: "Independence Day", date: "July 4", country: "USA", type: "public", description: "Celebration of American independence" },
  { name: "Bastille Day", date: "July 14", country: "France", type: "public", description: "French National Day celebrating the Revolution" },
  { name: "Eid al-Adha", date: "Varies", country: "Muslim Countries", type: "religious", description: "Islamic festival of sacrifice" },
  { name: "Diwali", date: "October/November", country: "India", type: "religious", description: "Hindu festival of lights" },
  { name: "Halloween", date: "October 31", country: "USA, UK, Canada", type: "observance", description: "Festival with costumes and trick-or-treating" },
  { name: "Day of the Dead", date: "November 1-2", country: "Mexico", type: "observance", description: "Mexican holiday honoring deceased loved ones" },
  { name: "Thanksgiving", date: "4th Thursday Nov", country: "USA", type: "public", description: "Day of giving thanks for the harvest" },
  { name: "Hanukkah", date: "November/December", country: "Israel, Worldwide", type: "religious", description: "Jewish festival of lights" },
  { name: "Christmas", date: "December 25", country: "Worldwide", type: "religious", description: "Christian holiday celebrating birth of Jesus" },
  { name: "Boxing Day", date: "December 26", country: "UK, Canada, Australia", type: "public", description: "Day after Christmas, traditional shopping day" },
  { name: "Kwanzaa", date: "December 26 - January 1", country: "USA", type: "observance", description: "Celebration of African-American culture" },
  { name: "New Year's Eve", date: "December 31", country: "Worldwide", type: "observance", description: "Celebration on the last day of the year" },
];

const countries = ["All", "Worldwide", "USA", "UK", "India", "China, Asia", "France", "Mexico", "Muslim Countries", "Israel, Worldwide", "Ireland, USA", "Canada", "Australia"];
const types = ["All", "public", "religious", "observance"];

const HolidaysWorldwide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === "All" || holiday.country.includes(filterCountry);
    const matchesType = filterType === "All" || holiday.type === filterType;
    return matchesSearch && matchesCountry && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "public": return "bg-green-500/20 text-green-500";
      case "religious": return "bg-purple-500/20 text-purple-500";
      case "observance": return "bg-blue-500/20 text-blue-500";
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
            <Flag className="w-4 h-4 text-theme-primary" />
            <span className="text-sm text-theme-primary">World Holidays</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Holidays</span>{" "}
            <span className="text-theme-text">Worldwide</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Explore holidays celebrated around the world
          </p>
        </header>

        {/* Filters */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search holidays..."
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Country/Region</label>
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="w-full"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full capitalize"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type === "All" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Holidays List */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-theme-primary" />
              Holidays ({filteredHolidays.length})
            </h2>

            <div className="space-y-4">
              {filteredHolidays.map((holiday, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border hover:border-theme-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-theme-text text-lg">{holiday.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-theme-text-muted mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>{holiday.date}</span>
                        <span className="text-theme-border">|</span>
                        <Flag className="w-4 h-4" />
                        <span>{holiday.country}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(holiday.type)}`}>
                      {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-theme-text-muted">{holiday.description}</p>
                </div>
              ))}

              {filteredHolidays.length === 0 && (
                <div className="text-center py-12">
                  <Flag className="w-12 h-12 text-theme-text-muted mx-auto mb-4" />
                  <p className="text-theme-text-muted">No holidays found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HolidaysWorldwide;
