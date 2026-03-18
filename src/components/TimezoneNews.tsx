"use client";

import { useState } from "react";
import { Newspaper, Calendar, MapPin, ExternalLink, Tag } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  region: string;
  category: "abolition" | "change" | "proposal" | "update";
  source: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "European Union Debates DST Abolition Again",
    summary: "EU member states continue discussions on potentially abolishing daylight saving time changes. The proposal, initially supported in 2019, remains under consideration with no final decision yet made.",
    date: "2024-12-15",
    region: "Europe",
    category: "proposal",
    source: "EU Commission",
  },
  {
    id: 2,
    title: "US Senate Sunshine Protection Act Status",
    summary: "The Sunshine Protection Act, which would make daylight saving time permanent in the United States, continues to be discussed in Congress. The bill passed the Senate in 2022 but has not been enacted.",
    date: "2024-11-20",
    region: "North America",
    category: "proposal",
    source: "US Congress",
  },
  {
    id: 3,
    title: "Turkey Maintains Permanent Summer Time",
    summary: "Turkey continues to observe permanent summer time (UTC+3), having abolished daylight saving time changes in 2016. The country remains on 'permanent DST' year-round.",
    date: "2024-10-28",
    region: "Europe/Asia",
    category: "update",
    source: "Turkish Government",
  },
  {
    id: 4,
    title: "Morocco's Permanent Standard Time",
    summary: "Morocco remains on permanent standard time (UTC+1) after abolishing DST in 2018. The country previously had a complex system with DST suspensions during Ramadan.",
    date: "2024-10-15",
    region: "Africa",
    category: "update",
    source: "Moroccan Government",
  },
  {
    id: 5,
    title: "Mexico Abolishes DST for Most of Country",
    summary: "Mexico abolished daylight saving time for most of the country in 2022. Only border states continue to observe DST to maintain alignment with the United States.",
    date: "2024-09-30",
    region: "North America",
    category: "abolition",
    source: "Mexican Government",
  },
  {
    id: 6,
    title: "Russia's Permanent Standard Time Since 2014",
    summary: "Russia has maintained permanent standard time since 2014, spanning 11 time zones from UTC+2 to UTC+12. The country briefly tried permanent DST before switching to standard time.",
    date: "2024-09-15",
    region: "Europe/Asia",
    category: "update",
    source: "Russian Government",
  },
  {
    id: 7,
    title: "Japan Considers DST for 2025 Events",
    summary: "Japan has occasionally discussed implementing DST for major events but continues to maintain standard time (JST, UTC+9). The country has not observed DST since 1952.",
    date: "2024-08-20",
    region: "Asia",
    category: "proposal",
    source: "Japan Times",
  },
  {
    id: 8,
    title: "Australian States Review DST Boundaries",
    summary: "Queensland, Western Australia, and Northern Territory continue to not observe DST, while other Australian states maintain their clock changes. Periodic reviews of these arrangements continue.",
    date: "2024-08-01",
    region: "Oceania",
    category: "update",
    source: "Australian Bureau of Meteorology",
  },
];

const TimezoneNews = () => {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");

  const regions = ["all", ...Array.from(new Set(newsItems.map((item) => item.region)))];
  const categories = ["all", "abolition", "change", "proposal", "update"];

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesRegion = filterRegion === "all" || item.region === filterRegion;
    return matchesCategory && matchesRegion;
  });

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "abolition":
        return "bg-red-500/20 text-red-500";
      case "change":
        return "bg-blue-500/20 text-blue-500";
      case "proposal":
        return "bg-yellow-500/20 text-yellow-500";
      case "update":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-theme-surface text-theme-text-muted";
    }
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent/10 border border-theme-accent/20 mb-4">
            <Newspaper className="w-4 h-4 text-theme-accent" />
            <span className="text-sm text-theme-accent">Latest Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Time Zone</span>{" "}
            <span className="text-theme-text">News</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Stay updated on worldwide time zone changes and DST news
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Filter by Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full capitalize"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Filter by Region</label>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full"
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
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-theme-surface text-theme-text-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.region}
                    </span>
                  </div>
                  <span className="text-sm text-theme-text-muted flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.date)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-theme-text mb-2">{item.title}</h3>
                <p className="text-theme-text-muted mb-4">{item.summary}</p>

                <div className="flex items-center justify-between pt-3 border-t border-theme-border">
                  <span className="text-sm text-theme-text-muted flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    Source: {item.source}
                  </span>
                </div>
              </article>
            ))}

            {filteredNews.length === 0 && (
              <div className="glass-card p-12 text-center">
                <Newspaper className="w-12 h-12 text-theme-text-muted mx-auto mb-4" />
                <p className="text-theme-text-muted">No news items match your filters</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TimezoneNews;
