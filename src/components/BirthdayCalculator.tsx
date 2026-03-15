"use client";

import { useState, useCallback } from "react";
import { Calendar, Cake, Gift, PartyPopper } from "lucide-react";

interface BirthdayResult {
  age: { years: number; months: number; days: number };
  dayOfBirth: string;
  nextBirthday: string;
  daysUntilBirthday: number;
  zodiacSign: string;
  chineseZodiac: string;
  birthstone: string;
  totalDaysLived: number;
  totalWeeksLived: number;
  totalMonthsLived: number;
  birthdayWeekday: string;
}

const getZodiacSign = (month: number, day: number): string => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries ♈";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus ♉";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini ♊";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer ♋";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo ♌";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo ♍";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra ♎";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio ♏";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius ♐";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn ♑";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius ♒";
  return "Pisces ♓";
};

const getChineseZodiac = (year: number): string => {
  const animals = ["Rat 🐀", "Ox 🐂", "Tiger 🐅", "Rabbit 🐇", "Dragon 🐉", "Snake 🐍", "Horse 🐴", "Goat 🐐", "Monkey 🐒", "Rooster 🐓", "Dog 🐕", "Pig 🐖"];
  return animals[(year - 4) % 12];
};

const getBirthstone = (month: number): string => {
  const birthstones = ["Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"];
  return birthstones[month - 1];
};

const BirthdayCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<BirthdayResult | null>(null);

  const calculate = useCallback(() => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate age
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Total days lived
    const totalDaysLived = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    setResult({
      age: { years, months, days },
      dayOfBirth: dayNames[birth.getDay()],
      nextBirthday: nextBirthday.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
      daysUntilBirthday,
      zodiacSign: getZodiacSign(birth.getMonth() + 1, birth.getDate()),
      chineseZodiac: getChineseZodiac(birth.getFullYear()),
      birthstone: getBirthstone(birth.getMonth() + 1),
      totalDaysLived,
      totalWeeksLived: Math.floor(totalDaysLived / 7),
      totalMonthsLived: years * 12 + months,
      birthdayWeekday: dayNames[nextBirthday.getDay()],
    });
  }, [birthDate]);

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
            <Cake className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-500">Birthday Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Birthday</span>{" "}
            <span className="text-theme-text">Calculator</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Discover fun facts about your birthday
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">Your Birth Date</label>
              <div className="relative max-w-md">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>

            <button type="button" onClick={calculate} disabled={!birthDate} className="btn-primary flex items-center gap-2">
              <PartyPopper className="w-4 h-4" />
              Calculate
            </button>
          </div>
        </section>

        {result && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Cake className="w-4 h-4 text-pink-500" />
                </span>
                Birthday Facts
              </h2>

              {/* Age Display */}
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-6 mb-6 border border-pink-500/20 text-center">
                <p className="text-5xl md:text-6xl font-bold text-gradient mb-2">
                  {result.age.years}
                </p>
                <p className="text-theme-text-muted">Years Old</p>
                <p className="text-lg text-theme-text mt-2">
                  {result.age.years} years, {result.age.months} months, {result.age.days} days
                </p>
              </div>

              {/* Next Birthday */}
              <div className="bg-theme-surface/50 rounded-xl p-6 mb-6 border border-theme-border">
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-6 h-6 text-pink-500" />
                  <span className="text-lg font-semibold text-theme-text">Next Birthday</span>
                </div>
                <p className="text-2xl font-bold text-gradient">{result.nextBirthday}</p>
                <p className="text-theme-text-muted mt-1">
                  {result.daysUntilBirthday === 0 ? "Today! Happy Birthday! 🎉" : `${result.daysUntilBirthday} days to go`}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-xl font-bold text-gradient">{result.dayOfBirth}</p>
                  <p className="text-sm text-theme-text-muted">Born On</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-xl font-bold text-gradient">{result.zodiacSign}</p>
                  <p className="text-sm text-theme-text-muted">Zodiac Sign</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-xl font-bold text-gradient">{result.chineseZodiac}</p>
                  <p className="text-sm text-theme-text-muted">Chinese Zodiac</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-xl font-bold text-gradient">{result.birthstone}</p>
                  <p className="text-sm text-theme-text-muted">Birthstone</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-xl font-bold text-gradient">{result.totalDaysLived.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Days Lived</p>
                </div>
                <div className="bg-theme-surface/30 rounded-lg p-4 border border-theme-border">
                  <p className="text-xl font-bold text-gradient">{result.totalWeeksLived.toLocaleString()}</p>
                  <p className="text-sm text-theme-text-muted">Weeks Lived</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BirthdayCalculator;
