import Link from "next/link";
import { Calendar } from "lucide-react";

const dateLinks = [
  { label: "Date Duration", href: "/date-duration" },
  { label: "Date Difference", href: "/date-difference" },
  { label: "Add Days", href: "/add-days" },
  { label: "Subtract Days", href: "/subtract-days" },
  { label: "Weekday Finder", href: "/weekday" },
  { label: "Business Days", href: "/business-days" },
] as const;

const timeLinks = [
  { label: "Time Duration", href: "/time-duration" },
  { label: "Time Zone Converter", href: "/timezone" },
  { label: "Add/Subtract Time", href: "/add-time" },
  { label: "Hours Calculator", href: "/hours" },
  { label: "World Clock", href: "/world-clock" },
  { label: "Countdown Timer", href: "/countdown" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-theme-border bg-theme-surface/95 backdrop-blur supports-[backdrop-filter]:bg-theme-surface/80">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 w-fit"
              aria-label="Go to home"
            >
              <div className="w-9 h-9 rounded-lg bg-theme-primary/20 border border-theme-primary/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-theme-primary" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-theme-text">
                  Date & Time Calculator
                </div>
                <div className="text-xs text-theme-text-muted">AAA Calculator</div>
              </div>
            </Link>
            <p className="text-sm text-theme-text-muted leading-relaxed max-w-xs">
              Built for accurate date and time calculations: durations, differences,
              time zones, and everyday planning.
            </p>
          </div>

          <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider">
                Date Tools
              </p>
              <ul className="mt-3 space-y-2">
                {dateLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center rounded-lg px-3 py-2 border border-theme-border text-sm text-theme-text-muted hover:bg-theme-primary/10 hover:border-theme-primary/50 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider">
                Time Tools
              </p>
              <ul className="mt-3 space-y-2">
                {timeLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center rounded-lg px-3 py-2 border border-theme-border text-sm text-theme-text-muted hover:bg-theme-primary/10 hover:border-theme-primary/50 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-theme-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-theme-text-muted">
            © {year} AAA Calculator. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="text-xs text-theme-text-muted rounded-full px-3 py-1 border border-theme-border hover:bg-theme-primary/10 hover:border-theme-primary/50 transition-all"
            >
              Home
            </Link>
            <Link
              href="/timezone"
              className="text-xs text-theme-text-muted rounded-full px-3 py-1 border border-theme-border hover:bg-theme-primary/10 hover:border-theme-primary/50 transition-all"
            >
              Time Zone
            </Link>
            <Link
              href="/date-duration"
              className="text-xs text-theme-text-muted rounded-full px-3 py-1 border border-theme-border hover:bg-theme-primary/10 hover:border-theme-primary/50 transition-all"
            >
              Date Duration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

