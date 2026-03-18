"use client";

import { useState, useEffect } from "react";
import { Users, Clock, Plus, Trash2, Globe } from "lucide-react";

interface Timezone {
  label: string;
  offset: number;
  name: string;
}

interface Participant {
  id: number;
  name: string;
  timezone: string;
}

const timezones: Timezone[] = [
  { label: "UTC", offset: 0, name: "Coordinated Universal Time" },
  { label: "EST", offset: -5, name: "Eastern Standard Time" },
  { label: "CST", offset: -6, name: "Central Standard Time" },
  { label: "MST", offset: -7, name: "Mountain Standard Time" },
  { label: "PST", offset: -8, name: "Pacific Standard Time" },
  { label: "GMT", offset: 0, name: "Greenwich Mean Time" },
  { label: "CET", offset: 1, name: "Central European Time" },
  { label: "EET", offset: 2, name: "Eastern European Time" },
  { label: "IST", offset: 5.5, name: "India Standard Time" },
  { label: "CST (China)", offset: 8, name: "China Standard Time" },
  { label: "JST", offset: 9, name: "Japan Standard Time" },
  { label: "AEST", offset: 10, name: "Australian Eastern Time" },
  { label: "NZST", offset: 12, name: "New Zealand Standard Time" },
];

const MeetingPlanner = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "You", timezone: "EST" },
  ]);
  const [meetingTime, setMeetingTime] = useState("09:00");
  const [meetingTimezone, setMeetingTimezone] = useState("EST");
  const [nextId, setNextId] = useState(2);

  const addParticipant = () => {
    setParticipants([...participants, { id: nextId, name: `Participant ${nextId}`, timezone: "UTC" }]);
    setNextId(nextId + 1);
  };

  const removeParticipant = (id: number) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const updateParticipant = (id: number, field: "name" | "timezone", value: string) => {
    setParticipants(participants.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const getTimezoneOffset = (tz: string): number => {
    const timezone = timezones.find((t) => t.label === tz);
    return timezone ? timezone.offset : 0;
  };

  const convertTime = (time: string, fromTz: string, toTz: string): { time: string; dayDiff: number } => {
    const [hours, minutes] = time.split(":").map(Number);
    const fromOffset = getTimezoneOffset(fromTz);
    const toOffset = getTimezoneOffset(toTz);
    const diffHours = toOffset - fromOffset;

    let newHours = hours + diffHours;
    let dayDiff = 0;

    while (newHours < 0) {
      newHours += 24;
      dayDiff--;
    }
    while (newHours >= 24) {
      newHours -= 24;
      dayDiff++;
    }

    return {
      time: `${Math.floor(newHours).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
      dayDiff,
    };
  };

  const isWorkingHours = (time: string): "good" | "okay" | "bad" => {
    const hours = parseInt(time.split(":")[0]);
    if (hours >= 9 && hours < 17) return "good";
    if (hours >= 7 && hours < 21) return "okay";
    return "bad";
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
            <Users className="w-4 h-4 text-theme-secondary" />
            <span className="text-sm text-theme-secondary">Meeting Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Meeting</span>{" "}
            <span className="text-theme-text">Planner</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Plan meetings across multiple time zones
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4">Meeting Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Your Time Zone</label>
                <select
                  value={meetingTimezone}
                  onChange={(e) => setMeetingTimezone(e.target.value)}
                  className="w-full"
                >
                  {timezones.map((tz) => (
                    <option key={tz.label} value={tz.label}>
                      {tz.label} - {tz.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-theme-text mb-4">Participants</h2>
            <div className="space-y-3 mb-4">
              {participants.map((participant) => (
                <div key={participant.id} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) => updateParticipant(participant.id, "name", e.target.value)}
                    className="flex-1"
                    placeholder="Name"
                  />
                  <select
                    value={participant.timezone}
                    onChange={(e) => updateParticipant(participant.id, "timezone", e.target.value)}
                    className="w-40"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.label} value={tz.label}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                  {participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(participant.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addParticipant}
              className="btn-secondary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Participant
            </button>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-12">
          <div className="result-card">
            <h2 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-theme-secondary/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-theme-secondary" />
              </span>
              Meeting Times by Location
            </h2>

            <div className="space-y-3">
              {participants.map((participant) => {
                const { time, dayDiff } = convertTime(meetingTime, meetingTimezone, participant.timezone);
                const status = isWorkingHours(time);
                return (
                  <div
                    key={participant.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      status === "good"
                        ? "bg-green-500/10 border-green-500/30"
                        : status === "okay"
                        ? "bg-yellow-500/10 border-yellow-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-theme-text">{participant.name}</p>
                      <p className="text-sm text-theme-text-muted">{participant.timezone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gradient">{time}</p>
                      {dayDiff !== 0 && (
                        <p className="text-sm text-theme-text-muted">
                          {dayDiff > 0 ? `+${dayDiff} day` : `${dayDiff} day`}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-theme-text-muted">Working hours (9-17)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-theme-text-muted">Early/Late (7-21)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-theme-text-muted">Outside hours</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MeetingPlanner;
