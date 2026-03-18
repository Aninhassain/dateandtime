"use client";

import { useState } from "react";
import { Hash, Sun, Moon, Flame, Zap, Cloud, Heart, Star } from "lucide-react";

interface DayInfo {
  name: string;
  abbreviation: string;
  origin: string;
  planetaryBody: string;
  icon: React.ReactNode;
  color: string;
  facts: string[];
  traditions: string[];
}

const days: DayInfo[] = [
  {
    name: "Sunday",
    abbreviation: "Sun",
    origin: "Named after the Sun (Latin: dies Solis)",
    planetaryBody: "Sun",
    icon: <Sun className="w-6 h-6" />,
    color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    facts: [
      "First day of the week in many countries",
      "Day of rest in Christian tradition",
      "Named 'Domingo' (Lord's Day) in Spanish"
    ],
    traditions: [
      "Church services in Christian countries",
      "Family gatherings and Sunday dinners",
      "Day of rest and relaxation"
    ]
  },
  {
    name: "Monday",
    abbreviation: "Mon",
    origin: "Named after the Moon (Latin: dies Lunae)",
    planetaryBody: "Moon",
    icon: <Moon className="w-6 h-6" />,
    color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    facts: [
      "First day of the work week in most countries",
      "Named 'Lunes' in Spanish from Luna (Moon)",
      "Often considered the least favorite day"
    ],
    traditions: [
      "Start of the business week",
      "Blue Monday - third Monday of January",
      "Meatless Monday initiative"
    ]
  },
  {
    name: "Tuesday",
    abbreviation: "Tue",
    origin: "Named after Tiw/Tyr, Norse god of war",
    planetaryBody: "Mars",
    icon: <Flame className="w-6 h-6" />,
    color: "bg-red-500/20 text-red-500 border-red-500/30",
    facts: [
      "Named 'Martes' in Spanish after Mars",
      "Elections in the US held on Tuesdays",
      "Considered lucky in Judaism"
    ],
    traditions: [
      "Taco Tuesday celebrations",
      "Super Tuesday in US elections",
      "Shrove Tuesday (Pancake Day)"
    ]
  },
  {
    name: "Wednesday",
    abbreviation: "Wed",
    origin: "Named after Woden/Odin, Norse god",
    planetaryBody: "Mercury",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    facts: [
      "Named 'Miércoles' in Spanish after Mercury",
      "Middle of the work week (Hump Day)",
      "Considered unlucky in some cultures"
    ],
    traditions: [
      "Ash Wednesday in Christian calendar",
      "Hump Day celebrations",
      "Named after wisdom god Odin"
    ]
  },
  {
    name: "Thursday",
    abbreviation: "Thu",
    origin: "Named after Thor, Norse god of thunder",
    planetaryBody: "Jupiter",
    icon: <Cloud className="w-6 h-6" />,
    color: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    facts: [
      "Named 'Jueves' in Spanish after Jupiter",
      "Thor was the god of thunder and lightning",
      "Thanksgiving is always on a Thursday"
    ],
    traditions: [
      "Thanksgiving Day in the US",
      "Maundy Thursday before Easter",
      "Throwback Thursday on social media"
    ]
  },
  {
    name: "Friday",
    abbreviation: "Fri",
    origin: "Named after Frigg/Freya, Norse goddess",
    planetaryBody: "Venus",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-pink-500/20 text-pink-500 border-pink-500/30",
    facts: [
      "Named 'Viernes' in Spanish after Venus",
      "TGIF - Thank God It's Friday",
      "Friday the 13th is considered unlucky"
    ],
    traditions: [
      "Good Friday in Christian calendar",
      "Black Friday shopping",
      "Casual Friday at workplaces"
    ]
  },
  {
    name: "Saturday",
    abbreviation: "Sat",
    origin: "Named after Saturn, Roman god",
    planetaryBody: "Saturn",
    icon: <Star className="w-6 h-6" />,
    color: "bg-amber-500/20 text-amber-500 border-amber-500/30",
    facts: [
      "Named 'Sábado' in Spanish from Sabbath",
      "Only day named after a Roman god in English",
      "Part of the weekend in most cultures"
    ],
    traditions: [
      "Jewish Sabbath (Shabbat)",
      "Weekend activities and sports",
      "Saturday morning cartoons tradition"
    ]
  },
];

const DaysOfWeek = () => {
  const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);
  const today = new Date().getDay();
  const todayName = days[today].name;

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary/10 border border-theme-secondary/20 mb-4">
            <Hash className="w-4 h-4 text-theme-secondary" />
            <span className="text-sm text-theme-secondary">Day Information</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Days of</span>{" "}
            <span className="text-theme-text">the Week</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Explore the history and meaning behind each day of the week
          </p>
          <p className="text-theme-primary mt-2">Today is {todayName}</p>
        </header>

        {!selectedDay ? (
          <section className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {days.map((day, idx) => (
                <div
                  key={day.name}
                  onClick={() => setSelectedDay(day)}
                  className={`glass-card p-5 cursor-pointer transition-all hover:-translate-y-1 ${
                    day.name === todayName ? "ring-2 ring-theme-primary" : "hover:border-theme-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`p-2 rounded-full ${day.color}`}>
                      {day.icon}
                    </span>
                    {day.name === todayName && (
                      <span className="text-xs bg-theme-primary text-white px-2 py-1 rounded-full">Today</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-theme-text mb-1">{day.name}</h3>
                  <p className="text-sm text-theme-text-muted">{day.planetaryBody}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="max-w-4xl mx-auto">
            <div className="glass-card p-6 md:p-8">
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-theme-primary hover:underline mb-4"
              >
                &larr; Back to all days
              </button>

              <div className="flex items-center gap-4 mb-6">
                <span className={`p-4 rounded-full ${selectedDay.color}`}>
                  {selectedDay.icon}
                </span>
                <div>
                  <h2 className="text-3xl font-bold text-gradient">{selectedDay.name}</h2>
                  <p className="text-theme-text-muted">{selectedDay.abbreviation} • {selectedDay.planetaryBody}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border mb-6">
                <h4 className="font-semibold text-theme-text mb-2">Origin</h4>
                <p className="text-theme-text-muted">{selectedDay.origin}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border">
                  <h4 className="font-semibold text-theme-text mb-3">Interesting Facts</h4>
                  <ul className="space-y-2">
                    {selectedDay.facts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-theme-text-muted">
                        <span className="text-theme-primary">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border">
                  <h4 className="font-semibold text-theme-text mb-3">Traditions & Observances</h4>
                  <ul className="space-y-2">
                    {selectedDay.traditions.map((tradition, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-theme-text-muted">
                        <span className="text-theme-secondary">•</span>
                        {tradition}
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

export default DaysOfWeek;
