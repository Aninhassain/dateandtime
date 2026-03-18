"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Calendar, Trash2, Edit2, Check, X } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  color: string;
}

const colors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Pink", value: "bg-pink-500" },
];

const CalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    color: "bg-blue-500",
  });

  useEffect(() => {
    const saved = localStorage.getItem("calendarEvents");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  const saveEvents = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(newEvents));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;

    if (editingId) {
      const updated = events.map((event) =>
        event.id === editingId
          ? { ...event, ...formData }
          : event
      );
      saveEvents(updated);
      setEditingId(null);
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        ...formData,
      };
      saveEvents([...events, newEvent]);
    }

    setFormData({ title: "", date: "", time: "", description: "", color: "bg-blue-500" });
    setShowForm(false);
  };

  const handleEdit = (event: CalendarEvent) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      color: event.color,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    saveEvents(events.filter((e) => e.id !== id));
  };

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time || "00:00"}`);
    const dateB = new Date(`${b.date}T${b.time || "00:00"}`);
    return dateA.getTime() - dateB.getTime();
  });

  const upcomingEvents = sortedEvents.filter((e) => new Date(e.date) >= new Date(new Date().toDateString()));
  const pastEvents = sortedEvents.filter((e) => new Date(e.date) < new Date(new Date().toDateString()));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
            <PlusCircle className="w-4 h-4 text-theme-secondary" />
            <span className="text-sm text-theme-secondary">Personal Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Calendar</span>{" "}
            <span className="text-theme-text">Events</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Create and manage your personal calendar events
          </p>
        </header>

        {/* Add Event Button */}
        {!showForm && (
          <section className="max-w-4xl mx-auto mb-8">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              <PlusCircle className="w-5 h-5" />
              Add New Event
            </button>
          </section>
        )}

        {/* Event Form */}
        {showForm && (
          <section className="max-w-4xl mx-auto mb-8 animate-fade-in">
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-xl font-semibold text-theme-text mb-4">
                {editingId ? "Edit Event" : "Add New Event"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-theme-text">Event Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter event title"
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-theme-text">Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-theme-text">Time (optional)</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-theme-text">Color</label>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: color.value })}
                          className={`w-8 h-8 rounded-full ${color.value} ${
                            formData.color === color.value ? "ring-2 ring-white ring-offset-2" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-theme-text">Description (optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add event description"
                    className="w-full h-24 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {editingId ? "Save Changes" : "Add Event"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({ title: "", date: "", time: "", description: "", color: "bg-blue-500" });
                    }}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-theme-primary" />
              Upcoming Events ({upcomingEvents.length})
            </h2>
            {upcomingEvents.length === 0 ? (
              <p className="text-theme-text-muted text-center py-8">No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-theme-surface/30 border border-theme-border"
                  >
                    <div className={`w-3 h-full min-h-[60px] rounded-full ${event.color}`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-theme-text">{event.title}</h3>
                      <p className="text-sm text-theme-text-muted">
                        {formatDate(event.date)}
                        {event.time && ` at ${event.time}`}
                      </p>
                      {event.description && (
                        <p className="text-sm text-theme-text-muted mt-1">{event.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(event)}
                        className="p-2 text-theme-text-muted hover:text-theme-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-theme-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <div className="glass-card p-6 md:p-8 opacity-75">
              <h2 className="text-xl font-semibold text-theme-text mb-4">
                Past Events ({pastEvents.length})
              </h2>
              <div className="space-y-3">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-theme-surface/20 border border-theme-border"
                  >
                    <div className={`w-3 h-full min-h-[40px] rounded-full ${event.color} opacity-50`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-theme-text-muted">{event.title}</h3>
                      <p className="text-sm text-theme-text-muted">{formatDate(event.date)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-theme-text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CalendarEvents;
