"use client";

import { useState } from "react";
import { Megaphone, Calendar, Clock, Copy, Check, Globe } from "lucide-react";

interface Timezone {
  label: string;
  offset: number;
  name: string;
  city: string;
}

const timezones: Timezone[] = [
  { label: "UTC", offset: 0, name: "Coordinated Universal Time", city: "UTC" },
  { label: "EST", offset: -5, name: "Eastern Standard Time", city: "New York" },
  { label: "CST", offset: -6, name: "Central Standard Time", city: "Chicago" },
  { label: "MST", offset: -7, name: "Mountain Standard Time", city: "Denver" },
  { label: "PST", offset: -8, name: "Pacific Standard Time", city: "Los Angeles" },
  { label: "GMT", offset: 0, name: "Greenwich Mean Time", city: "London" },
  { label: "CET", offset: 1, name: "Central European Time", city: "Paris" },
  { label: "EET", offset: 2, name: "Eastern European Time", city: "Athens" },
  { label: "MSK", offset: 3, name: "Moscow Standard Time", city: "Moscow" },
  { label: "IST", offset: 5.5, name: "India Standard Time", city: "Mumbai" },
  { label: "SGT", offset: 8, name: "Singapore Time", city: "Singapore" },
  { label: "CST (China)", offset: 8, name: "China Standard Time", city: "Beijing" },
  { label: "JST", offset: 9, name: "Japan Standard Time", city: "Tokyo" },
  { label: "AEST", offset: 10, name: "Australian Eastern Time", city: "Sydney" },
];

const EventTimeAnnouncer = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("12:00");
  const [eventTimezone, setEventTimezone] = useState("UTC");
  const [selectedZones, setSelectedZones] = useState<string[]>(["EST", "PST", "GMT", "CET", "JST"]);
  const [copied, setCopied] = useState(false);

  const getTimezoneOffset = (tz: string): number => {
    const timezone = timezones.find((t) => t.label === tz);
    return timezone ? timezone.offset : 0;
  };

  const convertTime = (time: string, date: string, fromTz: string, toTz: string): { time: string; date: string } => {
    const [hours, minutes] = time.split(":").map(Number);
    const fromOffset = getTimezoneOffset(fromTz);
    const toOffset = getTimezoneOffset(toTz);
    const diffHours = toOffset - fromOffset;

    let newHours = hours + diffHours;
    const eventDateObj = new Date(date);
    let dayDiff = 0;

    while (newHours < 0) {
      newHours += 24;
      dayDiff--;
    }
    while (newHours >= 24) {
      newHours -= 24;
      dayDiff++;
    }

    eventDateObj.setDate(eventDateObj.getDate() + dayDiff);

    return {
      time: `${Math.floor(newHours).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
      date: eventDateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    };
  };

  const toggleZone = (zone: string) => {
    if (selectedZones.includes(zone)) {
      setSelectedZones(selectedZones.filter((z) => z !== zone));
    } else {
      setSelectedZones([...selectedZones, zone]);
    }
  };

  const generateAnnouncementText = (): string => {
    if (!eventName || !eventDate || !eventTime) return "";

    let text = `📅 ${eventName}\n\n`;
    text += `🌍 Event Times:\n`;

    selectedZones.forEach((zone) => {
      const tz = timezones.find((t) => t.label === zone);
      if (tz) {
        const { time, date } = convertTime(eventTime, eventDate, eventTimezone, zone);
        text += `• ${tz.city} (${zone}): ${date} at ${time}\n`;
      }
    });

    return text;
  };

  const copyToClipboard = async () => {
    const text = generateAnnouncementText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Megaphone className="w-4 h-4 text-theme-accent" />
            <span className="text-sm text-theme-accent">Event Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Event Time</span>{" "}
            <span className="text-theme-text">Announcer</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Share event times in multiple time zones
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="My Awesome Event"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Time Zone</label>
                <select
                  value={eventTimezone}
                  onChange={(e) => setEventTimezone(e.target.value)}
                  className="w-full"
                >
                  {timezones.map((tz) => (
                    <option key={tz.label} value={tz.label}>
                      {tz.label} ({tz.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">Show Time Zones</label>
              <div className="flex flex-wrap gap-2">
                {timezones.map((tz) => (
                  <button
                    key={tz.label}
                    type="button"
                    onClick={() => toggleZone(tz.label)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      selectedZones.includes(tz.label)
                        ? "bg-theme-primary/20 border-theme-primary/40 text-theme-primary"
                        : "border-theme-border text-theme-text-muted hover:border-theme-primary"
                    }`}
                  >
                    {tz.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {eventName && eventDate && eventTime && (
          <section className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="result-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-theme-text flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-theme-accent/20 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-theme-accent" />
                  </span>
                  Event Times
                </h2>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="btn-primary flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy All"}
                </button>
              </div>

              <div className="bg-theme-surface/50 rounded-xl p-4 mb-6 border border-theme-border">
                <h3 className="text-2xl font-bold text-gradient mb-2">{eventName}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedZones.map((zone) => {
                  const tz = timezones.find((t) => t.label === zone);
                  if (!tz) return null;
                  const { time, date } = convertTime(eventTime, eventDate, eventTimezone, zone);
                  return (
                    <div
                      key={zone}
                      className="flex items-center justify-between p-4 rounded-lg bg-theme-surface/30 border border-theme-border"
                    >
                      <div>
                        <p className="font-semibold text-theme-text">{tz.city}</p>
                        <p className="text-sm text-theme-text-muted">{zone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gradient">{time}</p>
                        <p className="text-sm text-theme-text-muted">{date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default EventTimeAnnouncer;
