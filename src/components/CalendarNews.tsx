"use client";

import { useState } from "react";
import { ScrollText, Calendar, Tag, Clock } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: "calendar" | "holiday" | "observance" | "change";
  region: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Juneteenth Now Permanent Federal Holiday",
    summary: "Juneteenth (June 19) has been established as a permanent federal holiday in the United States, commemorating the end of slavery. It is the first new federal holiday since Martin Luther King Jr. Day was established in 1983.",
    date: "2024-12-01",
    category: "holiday",
    region: "United States"
  },
  {
    id: 2,
    title: "UK Considers Four-Day Work Week Trial Results",
    summary: "Following successful trials, discussions continue about potentially restructuring the standard work week, which would significantly impact calendar planning for businesses and holidays.",
    date: "2024-11-15",
    category: "change",
    region: "United Kingdom"
  },
  {
    id: 3,
    title: "World Mental Health Day Gains Global Recognition",
    summary: "October 10th continues to gain traction as World Mental Health Day, with more countries adding it to their official observance calendars and workplaces recognizing it.",
    date: "2024-10-10",
    category: "observance",
    region: "Worldwide"
  },
  {
    id: 4,
    title: "Indigenous Peoples' Day Expanding Across US",
    summary: "More US states and cities are officially recognizing Indigenous Peoples' Day on the second Monday of October, replacing or running alongside Columbus Day.",
    date: "2024-10-01",
    category: "change",
    region: "United States"
  },
  {
    id: 5,
    title: "Lunar New Year Recognition Growing in Western Countries",
    summary: "Lunar New Year is gaining official recognition in more Western countries, with some adding it to school calendars and workplace holiday policies.",
    date: "2024-09-20",
    category: "holiday",
    region: "Worldwide"
  },
  {
    id: 6,
    title: "2024 Leap Year: February 29th Events Planned",
    summary: "With 2024 being a leap year, various special events and celebrations were planned worldwide for the extra day in February.",
    date: "2024-02-29",
    category: "calendar",
    region: "Worldwide"
  },
  {
    id: 7,
    title: "Earth Day Celebrates 54th Anniversary",
    summary: "Earth Day (April 22) marked its 54th anniversary with a focus on climate action and environmental sustainability across the globe.",
    date: "2024-04-22",
    category: "observance",
    region: "Worldwide"
  },
  {
    id: 8,
    title: "New Public Holidays Proposed in Multiple Countries",
    summary: "Several countries are considering adding new public holidays to recognize diverse cultural celebrations and historical events, reflecting changing demographics.",
    date: "2024-08-15",
    category: "change",
    region: "Multiple"
  },
];

const CalendarNews = () => {
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", "calendar", "holiday", "observance", "change"];

  const filteredNews = newsItems.filter((item) =>
    filterCategory === "all" || item.category === filterCategory
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "calendar": return "bg-blue-500/20 text-blue-500";
      case "holiday": return "bg-green-500/20 text-green-500";
      case "observance": return "bg-purple-500/20 text-purple-500";
      case "change": return "bg-orange-500/20 text-orange-500";
      default: return "bg-theme-surface text-theme-text-muted";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
            <ScrollText className="w-4 h-4 text-theme-primary" />
            <span className="text-sm text-theme-primary">Latest Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Calendar &</span>{" "}
            <span className="text-theme-text">Holiday News</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Stay updated on calendar changes and holiday announcements
          </p>
        </header>

        {/* Filters */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterCategory === category
                      ? "bg-theme-primary text-white"
                      : "bg-theme-surface/50 text-theme-text-muted hover:bg-theme-surface"
                  }`}
                >
                  {category === "all" ? "All News" : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News List */}
        <section className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="glass-card p-6 hover:border-theme-primary/50 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-theme-surface text-theme-text-muted">
                      {item.region}
                    </span>
                  </div>
                  <span className="text-sm text-theme-text-muted flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDate(item.date)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-theme-text mb-2">{item.title}</h3>
                <p className="text-theme-text-muted">{item.summary}</p>
              </article>
            ))}

            {filteredNews.length === 0 && (
              <div className="glass-card p-12 text-center">
                <Calendar className="w-12 h-12 text-theme-text-muted mx-auto mb-4" />
                <p className="text-theme-text-muted">No news items match your filter</p>
              </div>
            )}
          </div>
        </section>

        {/* Category Legend */}
        <section className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-theme-text-muted">Calendar Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-theme-text-muted">New Holidays</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-theme-text-muted">Observances</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-theme-text-muted">Policy Changes</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CalendarNews;
