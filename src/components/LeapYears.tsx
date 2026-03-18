"use client";

import { useState } from "react";
import { HelpCircle, Calendar, Check, X, Calculator } from "lucide-react";

const LeapYears = () => {
  const [yearToCheck, setYearToCheck] = useState("");
  const [checkResult, setCheckResult] = useState<boolean | null>(null);

  const currentYear = new Date().getFullYear();

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getNextLeapYear = (fromYear: number): number => {
    let year = fromYear;
    while (!isLeapYear(year)) {
      year++;
    }
    return year;
  };

  const getPreviousLeapYear = (fromYear: number): number => {
    let year = fromYear - 1;
    while (!isLeapYear(year)) {
      year--;
    }
    return year;
  };

  const checkYear = () => {
    const year = parseInt(yearToCheck);
    if (!isNaN(year) && year > 0) {
      setCheckResult(isLeapYear(year));
    }
  };

  const nextLeapYear = getNextLeapYear(currentYear);
  const previousLeapYear = getPreviousLeapYear(currentYear);
  const isCurrentLeapYear = isLeapYear(currentYear);

  // Generate list of leap years around current year
  const leapYearsList: number[] = [];
  for (let y = currentYear - 20; y <= currentYear + 20; y++) {
    if (isLeapYear(y)) {
      leapYearsList.push(y);
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-accent/10 border border-theme-accent/20 mb-4">
            <HelpCircle className="w-4 h-4 text-theme-accent" />
            <span className="text-sm text-theme-accent">Learn About</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Leap</span>{" "}
            <span className="text-theme-text">Years</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Understanding leap years and their rules
          </p>
        </header>

        {/* Current Status */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-6 text-center">
              <p className="text-theme-text-muted mb-2">Current Year</p>
              <p className="text-3xl font-bold text-theme-text">{currentYear}</p>
              <span className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm ${
                isCurrentLeapYear ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
              }`}>
                {isCurrentLeapYear ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                {isCurrentLeapYear ? "Leap Year" : "Not a Leap Year"}
              </span>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-theme-text-muted mb-2">Previous Leap Year</p>
              <p className="text-3xl font-bold text-gradient">{previousLeapYear}</p>
              <p className="text-sm text-theme-text-muted mt-2">{currentYear - previousLeapYear} years ago</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-theme-text-muted mb-2">Next Leap Year</p>
              <p className="text-3xl font-bold text-gradient">{nextLeapYear}</p>
              <p className="text-sm text-theme-text-muted mt-2">In {nextLeapYear - currentYear} year(s)</p>
            </div>
          </div>
        </section>

        {/* Leap Year Checker */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-theme-primary" />
              Check Any Year
            </h2>
            <div className="flex gap-4">
              <input
                type="number"
                value={yearToCheck}
                onChange={(e) => {
                  setYearToCheck(e.target.value);
                  setCheckResult(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && checkYear()}
                placeholder="Enter a year (e.g., 2024)"
                className="flex-1"
              />
              <button
                type="button"
                onClick={checkYear}
                className="btn-primary"
              >
                Check
              </button>
            </div>
            {checkResult !== null && (
              <div className={`mt-4 p-4 rounded-lg ${
                checkResult ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"
              }`}>
                <p className={`text-lg font-semibold ${checkResult ? "text-green-500" : "text-red-500"}`}>
                  {yearToCheck} is {checkResult ? "" : "not "}a leap year
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Rules */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-semibold text-theme-text mb-4">Leap Year Rules</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-theme-surface/30 border border-theme-border">
                <h3 className="font-semibold text-theme-text mb-2">A year is a leap year if:</h3>
                <ol className="space-y-2 text-theme-text-muted list-decimal list-inside">
                  <li>It is divisible by 4 <span className="text-theme-text-muted">AND</span></li>
                  <li>It is NOT divisible by 100 <span className="text-theme-text-muted">UNLESS</span></li>
                  <li>It is also divisible by 400</li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h4 className="font-semibold text-green-500 mb-2">Leap Years (Examples)</h4>
                  <ul className="text-theme-text-muted space-y-1">
                    <li>2024 - divisible by 4</li>
                    <li>2000 - divisible by 400</li>
                    <li>2028 - divisible by 4</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h4 className="font-semibold text-red-500 mb-2">Not Leap Years (Examples)</h4>
                  <ul className="text-theme-text-muted space-y-1">
                    <li>2023 - not divisible by 4</li>
                    <li>1900 - divisible by 100 but not 400</li>
                    <li>2100 - divisible by 100 but not 400</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Leap Years Exist */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-semibold text-theme-text mb-4">Why Do Leap Years Exist?</h2>
            <div className="space-y-4 text-theme-text-muted">
              <p>
                Earth takes approximately <strong className="text-theme-text">365.2422 days</strong> to complete one orbit around the Sun.
                Our calendar year has 365 days, which means we&apos;re short by about 0.2422 days (roughly 6 hours) each year.
              </p>
              <p>
                Without leap years, our calendar would slowly drift out of sync with the seasons.
                After about 100 years, we would be 24 days off!
              </p>
              <p>
                By adding an extra day every 4 years (with exceptions for century years), we keep our calendar aligned with Earth&apos;s position in its orbit.
              </p>
            </div>
          </div>
        </section>

        {/* Leap Years List */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-theme-secondary" />
              Leap Years ({currentYear - 20} - {currentYear + 20})
            </h2>
            <div className="flex flex-wrap gap-2">
              {leapYearsList.map((year) => (
                <span
                  key={year}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    year === currentYear
                      ? "bg-theme-primary text-white"
                      : year < currentYear
                      ? "bg-theme-surface/50 text-theme-text-muted"
                      : "bg-theme-secondary/20 text-theme-secondary"
                  }`}
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LeapYears;
