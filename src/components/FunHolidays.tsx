"use client";

import { useState } from "react";
import { Smile, Search, Calendar, Sparkles } from "lucide-react";

interface FunHoliday {
  name: string;
  date: string;
  month: number;
  day: number;
  description: string;
  emoji: string;
}

const funHolidays: FunHoliday[] = [
  { name: "National Bubble Bath Day", date: "January 8", month: 1, day: 8, description: "Time to relax and enjoy a nice bubble bath!", emoji: "🛁" },
  { name: "National Pizza Day", date: "February 9", month: 2, day: 9, description: "Celebrate everyone's favorite cheesy dish", emoji: "🍕" },
  { name: "National Napping Day", date: "March (Monday after DST)", month: 3, day: 10, description: "Take a well-deserved nap today", emoji: "😴" },
  { name: "Pi Day", date: "March 14", month: 3, day: 14, description: "Celebrate mathematics and eat pie! (3.14)", emoji: "🥧" },
  { name: "National Puppy Day", date: "March 23", month: 3, day: 23, description: "Celebrate adorable puppies everywhere", emoji: "🐶" },
  { name: "April Fools' Day", date: "April 1", month: 4, day: 1, description: "Play harmless pranks on friends and family", emoji: "🃏" },
  { name: "National Siblings Day", date: "April 10", month: 4, day: 10, description: "Celebrate your brothers and sisters", emoji: "👫" },
  { name: "Star Wars Day", date: "May 4", month: 5, day: 4, description: "May the Fourth be with you!", emoji: "⭐" },
  { name: "National Donut Day", date: "June (First Friday)", month: 6, day: 7, description: "Indulge in delicious donuts", emoji: "🍩" },
  { name: "National Ice Cream Day", date: "July (Third Sunday)", month: 7, day: 21, description: "Cool off with your favorite ice cream", emoji: "🍦" },
  { name: "National Friendship Day", date: "August (First Sunday)", month: 8, day: 4, description: "Celebrate your closest friends", emoji: "🤝" },
  { name: "Talk Like a Pirate Day", date: "September 19", month: 9, day: 19, description: "Arrr! Talk like a pirate today, matey!", emoji: "🏴‍☠️" },
  { name: "National Coffee Day", date: "September 29", month: 9, day: 29, description: "Celebrate the world's favorite morning beverage", emoji: "☕" },
  { name: "World Smile Day", date: "October (First Friday)", month: 10, day: 4, description: "Share smiles with everyone you meet", emoji: "😊" },
  { name: "National Taco Day", date: "October 4", month: 10, day: 4, description: "Enjoy delicious tacos all day", emoji: "🌮" },
  { name: "National Cat Day", date: "October 29", month: 10, day: 29, description: "Celebrate our feline friends", emoji: "🐱" },
  { name: "National Sandwich Day", date: "November 3", month: 11, day: 3, description: "Honoring the Earl of Sandwich's invention", emoji: "🥪" },
  { name: "National Cookie Day", date: "December 4", month: 12, day: 4, description: "Bake and enjoy cookies of all kinds", emoji: "🍪" },
  { name: "National Ugly Sweater Day", date: "December (Third Friday)", month: 12, day: 20, description: "Wear your ugliest holiday sweater with pride", emoji: "🧥" },
  { name: "National Chocolate Day", date: "December 28", month: 12, day: 28, description: "Indulge in chocolate treats", emoji: "🍫" },
];

const FunHolidays = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState(0);

  const monthNames = [
    "All Months", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const filteredHolidays = funHolidays.filter((holiday) => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = filterMonth === 0 || holiday.month === filterMonth;
    return matchesSearch && matchesMonth;
  });

  const today = new Date();
  const upcomingHolidays = funHolidays
    .filter((h) => {
      const holidayDate = new Date(today.getFullYear(), h.month - 1, h.day);
      if (holidayDate < today) {
        holidayDate.setFullYear(today.getFullYear() + 1);
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(today.getFullYear(), a.month - 1, a.day);
      const dateB = new Date(today.getFullYear(), b.month - 1, b.day);
      if (dateA < today) dateA.setFullYear(today.getFullYear() + 1);
      if (dateB < today) dateB.setFullYear(today.getFullYear() + 1);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent/10 border border-theme-accent/20 mb-4">
            <Smile className="w-4 h-4 text-theme-accent" />
            <span className="text-sm text-theme-accent">Fun Celebrations</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Fun</span>{" "}
            <span className="text-theme-text">Holidays</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Discover quirky and fun celebration days throughout the year
          </p>
        </header>

        {/* Upcoming Fun Holidays */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-theme-accent" />
              Upcoming Fun Holidays
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingHolidays.map((holiday, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-theme-surface/50 border border-theme-border text-center"
                >
                  <span className="text-4xl mb-2 block">{holiday.emoji}</span>
                  <h3 className="font-semibold text-theme-text">{holiday.name}</h3>
                  <p className="text-sm text-theme-text-muted">{holiday.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
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
                    placeholder="Search fun holidays..."
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Month</label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(parseInt(e.target.value))}
                  className="w-full"
                >
                  {monthNames.map((month, idx) => (
                    <option key={month} value={idx}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* All Fun Holidays */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-theme-primary" />
              All Fun Holidays ({filteredHolidays.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHolidays.map((holiday, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg bg-theme-surface/30 border border-theme-border hover:border-theme-accent/50 transition-colors"
                >
                  <span className="text-3xl">{holiday.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-theme-text">{holiday.name}</h3>
                    <p className="text-sm text-theme-primary">{holiday.date}</p>
                    <p className="text-sm text-theme-text-muted mt-1">{holiday.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredHolidays.length === 0 && (
              <div className="text-center py-12">
                <Smile className="w-12 h-12 text-theme-text-muted mx-auto mb-4" />
                <p className="text-theme-text-muted">No fun holidays found</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FunHolidays;
