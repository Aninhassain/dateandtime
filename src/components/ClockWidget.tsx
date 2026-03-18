"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Code, Clock, Copy, Check, Settings } from "lucide-react";

export default function ClockWidget() {
  const [timezone, setTimezone] = useState("America/New_York");
  const [format, setFormat] = useState<"12" | "24">("12");
  const [showDate, setShowDate] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const timezones = [
    { label: "New York (EST/EDT)", value: "America/New_York" },
    { label: "Los Angeles (PST/PDT)", value: "America/Los_Angeles" },
    { label: "Chicago (CST/CDT)", value: "America/Chicago" },
    { label: "London (GMT/BST)", value: "Europe/London" },
    { label: "Paris (CET/CEST)", value: "Europe/Paris" },
    { label: "Berlin (CET/CEST)", value: "Europe/Berlin" },
    { label: "Tokyo (JST)", value: "Asia/Tokyo" },
    { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
    { label: "Dubai (GST)", value: "Asia/Dubai" },
    { label: "Singapore (SGT)", value: "Asia/Singapore" },
    { label: "Hong Kong (HKT)", value: "Asia/Hong_Kong" },
    { label: "UTC", value: "UTC" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: format === "12",
    };
    if (showSeconds) {
      options.second = "2-digit";
    }
    return new Intl.DateTimeFormat("en-US", options).format(currentTime);
  };

  const formatDate = () => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(currentTime);
  };

  const embedCode = `<!-- Clock Widget from Date & Time Calculator -->
<div id="dtc-clock-widget" data-timezone="${timezone}" data-format="${format}" data-show-date="${showDate}" data-show-seconds="${showSeconds}" data-theme="${theme}"></div>
<script src="https://datenadtime.com/widgets/clock.js"></script>
<style>
  #dtc-clock-widget {
    font-family: system-ui, -apple-system, sans-serif;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    ${theme === "dark" ? "background: #1a1a2e; color: #fff;" : "background: #f8f9fa; color: #1a1a2e;"}
  }
  #dtc-clock-widget .time {
    font-size: 2.5rem;
    font-weight: bold;
    font-family: monospace;
    ${theme === "dark" ? "color: #6366f1;" : "color: #4f46e5;"}
  }
  #dtc-clock-widget .date {
    font-size: 0.875rem;
    opacity: 0.7;
    margin-top: 8px;
  }
</style>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 starry-base" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-primary" />
      <div aria-hidden="true" className="absolute inset-0 star-field star-field-secondary" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 horizon-glow" />

      <div className="relative z-10">
        <div className="w-full px-2 md:px-4 py-8 md:py-14 mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-theme-primary hover:text-theme-primary-dark transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
                <Code className="w-4 h-4 text-theme-primary" />
                <span className="text-sm text-theme-primary">Embeddable Widget</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-theme-text mb-4">
                Clock <span className="text-gradient">for Your Site</span>
              </h1>
              <p className="text-theme-text-muted max-w-2xl mx-auto">
                Add a customizable clock widget to your website. Configure the options below and copy the embed code.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Settings Panel */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-theme-primary" />
                  Widget Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-text mb-2">
                      Time Zone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-theme-surface border border-theme-border text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-theme-text mb-2">
                      Time Format
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFormat("12")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          format === "12"
                            ? "bg-theme-primary text-white border-theme-primary"
                            : "bg-theme-surface border-theme-border text-theme-text hover:border-theme-primary"
                        }`}
                      >
                        12-hour
                      </button>
                      <button
                        onClick={() => setFormat("24")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          format === "24"
                            ? "bg-theme-primary text-white border-theme-primary"
                            : "bg-theme-surface border-theme-border text-theme-text hover:border-theme-primary"
                        }`}
                      >
                        24-hour
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-theme-text mb-2">
                      Theme
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          theme === "dark"
                            ? "bg-theme-primary text-white border-theme-primary"
                            : "bg-theme-surface border-theme-border text-theme-text hover:border-theme-primary"
                        }`}
                      >
                        Dark
                      </button>
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                          theme === "light"
                            ? "bg-theme-primary text-white border-theme-primary"
                            : "bg-theme-surface border-theme-border text-theme-text hover:border-theme-primary"
                        }`}
                      >
                        Light
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-theme-text">Show Date</span>
                    <button
                      onClick={() => setShowDate(!showDate)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        showDate ? "bg-theme-primary" : "bg-theme-surface"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          showDate ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-theme-text">Show Seconds</span>
                    <button
                      onClick={() => setShowSeconds(!showSeconds)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        showSeconds ? "bg-theme-primary" : "bg-theme-surface"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          showSeconds ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-theme-primary" />
                  Preview
                </h2>

                <div
                  className={`p-6 rounded-xl text-center ${
                    theme === "dark" ? "bg-[#1a1a2e] text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p
                    className={`text-4xl font-mono font-bold ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    {formatTime()}
                  </p>
                  {showDate && (
                    <p className="text-sm opacity-70 mt-2">{formatDate()}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Embed Code */}
            <div className="glass-card rounded-2xl p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-theme-text">Embed Code</h2>
                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-primary text-white hover:bg-theme-primary-dark transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-theme-surface rounded-lg p-4 overflow-x-auto text-sm text-theme-text-muted">
                <code>{embedCode}</code>
              </pre>
              <p className="text-sm text-theme-text-muted mt-4">
                Copy this code and paste it into your website&apos;s HTML where you want the clock to appear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
