"use client";

import { useState, useEffect } from "react";
import { History, Calendar, Star, User, Lightbulb } from "lucide-react";

interface HistoricalEvent {
  year: number;
  event: string;
  category: "history" | "birth" | "death" | "discovery";
}

const historicalData: { [key: string]: HistoricalEvent[] } = {
  "01-01": [
    { year: 1863, event: "Abraham Lincoln signs the Emancipation Proclamation", category: "history" },
    { year: 1959, event: "Fidel Castro takes power in Cuba", category: "history" },
    { year: 1892, event: "Ellis Island opens to process immigrants", category: "history" },
  ],
  "01-15": [
    { year: 1929, event: "Martin Luther King Jr. is born in Atlanta, Georgia", category: "birth" },
    { year: 2001, event: "Wikipedia is launched", category: "history" },
  ],
  "02-14": [
    { year: 1876, event: "Alexander Graham Bell files patent for telephone", category: "discovery" },
    { year: 1990, event: "Voyager 1 takes the famous 'Pale Blue Dot' photo", category: "discovery" },
  ],
  "03-14": [
    { year: 1879, event: "Albert Einstein is born in Ulm, Germany", category: "birth" },
    { year: 2018, event: "Stephen Hawking passes away", category: "death" },
  ],
  "03-18": [
    { year: 1965, event: "Alexei Leonov performs the first spacewalk", category: "history" },
    { year: 1858, event: "Rudolf Diesel, inventor of diesel engine, is born", category: "birth" },
  ],
  "04-12": [
    { year: 1961, event: "Yuri Gagarin becomes the first human in space", category: "history" },
    { year: 1981, event: "First Space Shuttle Columbia launches", category: "history" },
  ],
  "07-04": [
    { year: 1776, event: "United States Declaration of Independence is adopted", category: "history" },
    { year: 1826, event: "Thomas Jefferson and John Adams both die", category: "death" },
  ],
  "07-20": [
    { year: 1969, event: "Apollo 11 astronauts land on the Moon", category: "history" },
  ],
  "11-09": [
    { year: 1989, event: "Fall of the Berlin Wall", category: "history" },
  ],
  "12-25": [
    { year: 1642, event: "Isaac Newton is born", category: "birth" },
    { year: 1991, event: "Soviet Union officially dissolves", category: "history" },
  ],
};

const OnThisDay = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [events, setEvents] = useState<HistoricalEvent[]>([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month: number) => {
    return new Date(2024, month, 0).getDate();
  };

  useEffect(() => {
    const key = `${selectedMonth.toString().padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;
    setEvents(historicalData[key] || []);
  }, [selectedMonth, selectedDay]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "birth": return <User className="w-4 h-4" />;
      case "death": return <Star className="w-4 h-4" />;
      case "discovery": return <Lightbulb className="w-4 h-4" />;
      default: return <History className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "birth": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "death": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "discovery": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      default: return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    }
  };

  const goToToday = () => {
    setSelectedMonth(today.getMonth() + 1);
    setSelectedDay(today.getDate());
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
            <History className="w-4 h-4 text-theme-secondary" />
            <span className="text-sm text-theme-secondary">Historical Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">On This Day</span>{" "}
            <span className="text-theme-text">in History</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Discover what happened on any day in history
          </p>
        </header>

        {/* Date Selector */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(parseInt(e.target.value));
                    setSelectedDay(Math.min(selectedDay, getDaysInMonth(parseInt(e.target.value))));
                  }}
                  className="px-4 py-2 rounded-lg"
                >
                  {monthNames.map((month, idx) => (
                    <option key={month} value={idx + 1}>{month}</option>
                  ))}
                </select>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="px-4 py-2 rounded-lg"
                >
                  {Array.from({ length: getDaysInMonth(selectedMonth) }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={goToToday}
                className="btn-secondary"
              >
                Go to Today
              </button>
            </div>
          </div>
        </section>

        {/* Events Display */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gradient mb-6 text-center">
              {monthNames[selectedMonth - 1]} {selectedDay}
            </h2>

            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${getCategoryColor(event.category)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getCategoryIcon(event.category)}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-xl">{event.year}</span>
                          <span className="text-xs uppercase px-2 py-0.5 rounded bg-theme-surface/50">
                            {event.category}
                          </span>
                        </div>
                        <p className="text-theme-text">{event.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-theme-text-muted mx-auto mb-4" />
                <p className="text-theme-text-muted text-lg">No historical events recorded for this date</p>
                <p className="text-theme-text-muted text-sm mt-2">Try selecting a different date</p>
              </div>
            )}
          </div>
        </section>

        {/* Legend */}
        <section className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-theme-text-muted">Historical Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-theme-text-muted">Birth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-theme-text-muted">Death</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-theme-text-muted">Discovery</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OnThisDay;
