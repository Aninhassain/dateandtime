"use client";

import { useState } from "react";
import { SunMoon, Search, Calendar, Clock, Info } from "lucide-react";

interface DSTInfo {
  country: string;
  region: string;
  observesDST: boolean;
  dstStart: string;
  dstEnd: string;
  offset: string;
  dstOffset: string;
  notes: string;
}

const dstData: DSTInfo[] = [
  { country: "United States", region: "Most states", observesDST: true, dstStart: "2nd Sunday in March", dstEnd: "1st Sunday in November", offset: "UTC-5 to UTC-10", dstOffset: "+1 hour", notes: "Arizona and Hawaii do not observe DST" },
  { country: "Canada", region: "Most provinces", observesDST: true, dstStart: "2nd Sunday in March", dstEnd: "1st Sunday in November", offset: "UTC-3.5 to UTC-8", dstOffset: "+1 hour", notes: "Saskatchewan does not observe DST" },
  { country: "United Kingdom", region: "All", observesDST: true, dstStart: "Last Sunday in March", dstEnd: "Last Sunday in October", offset: "UTC+0", dstOffset: "+1 hour (BST)", notes: "" },
  { country: "European Union", region: "All member states", observesDST: true, dstStart: "Last Sunday in March", dstEnd: "Last Sunday in October", offset: "UTC+0 to UTC+2", dstOffset: "+1 hour", notes: "May be abolished in future" },
  { country: "Australia", region: "NSW, VIC, TAS, SA, ACT", observesDST: true, dstStart: "1st Sunday in October", dstEnd: "1st Sunday in April", offset: "UTC+10", dstOffset: "+1 hour", notes: "QLD, WA, NT do not observe DST" },
  { country: "New Zealand", region: "All", observesDST: true, dstStart: "Last Sunday in September", dstEnd: "1st Sunday in April", offset: "UTC+12", dstOffset: "+1 hour", notes: "" },
  { country: "Brazil", region: "None (abolished)", observesDST: false, dstStart: "-", dstEnd: "-", offset: "UTC-2 to UTC-5", dstOffset: "-", notes: "DST abolished in 2019" },
  { country: "Japan", region: "None", observesDST: false, dstStart: "-", dstEnd: "-", offset: "UTC+9", dstOffset: "-", notes: "Never observed DST" },
  { country: "China", region: "None", observesDST: false, dstStart: "-", dstEnd: "-", offset: "UTC+8", dstOffset: "-", notes: "Single time zone nationwide" },
  { country: "India", region: "None", observesDST: false, dstStart: "-", dstEnd: "-", offset: "UTC+5:30", dstOffset: "-", notes: "Never observed DST" },
  { country: "Russia", region: "None", observesDST: false, dstStart: "-", dstEnd: "-", offset: "UTC+2 to UTC+12", dstOffset: "-", notes: "Abolished DST in 2014" },
  { country: "Mexico", region: "Border states only", observesDST: true, dstStart: "2nd Sunday in March", dstEnd: "1st Sunday in November", offset: "UTC-6 to UTC-8", dstOffset: "+1 hour", notes: "Most of Mexico abolished DST in 2022" },
  { country: "Egypt", region: "None", observesDST: false, dstStart: "-", dstEnd: "-", offset: "UTC+2", dstOffset: "-", notes: "Abolished DST in 2014" },
  { country: "South Africa", region: "None", observesDST: false, dstStart: "-", dstEnd: "-", offset: "UTC+2", dstOffset: "-", notes: "Never observed DST" },
  { country: "Chile", region: "All except Magallanes", observesDST: true, dstStart: "1st Sunday in September", dstEnd: "1st Sunday in April", offset: "UTC-4", dstOffset: "+1 hour", notes: "" },
];

const DaylightSavingTime = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDST, setFilterDST] = useState<"all" | "yes" | "no">("all");

  const filteredData = dstData.filter((item) => {
    const matchesSearch =
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDST =
      filterDST === "all" ||
      (filterDST === "yes" && item.observesDST) ||
      (filterDST === "no" && !item.observesDST);
    return matchesSearch && matchesDST;
  });

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
            <SunMoon className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-yellow-500">DST Information</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Daylight Saving</span>{" "}
            <span className="text-theme-text">Time</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            DST information and schedules worldwide
          </p>
        </header>

        {/* Info Box */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8 border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-theme-text mb-2">What is Daylight Saving Time?</h3>
                <p className="text-theme-text-muted text-sm">
                  Daylight Saving Time (DST) is the practice of advancing clocks during warmer months so that darkness falls at a later clock time.
                  Typically, clocks are adjusted forward one hour in spring (&quot;spring forward&quot;) and backward one hour in autumn (&quot;fall back&quot;).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Search Country</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search country..."
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">Filter by DST</label>
                <select
                  value={filterDST}
                  onChange={(e) => setFilterDST(e.target.value as "all" | "yes" | "no")}
                  className="w-full"
                >
                  <option value="all">All Countries</option>
                  <option value="yes">Observes DST</option>
                  <option value="no">Does Not Observe DST</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-500" />
              DST by Country ({filteredData.length})
            </h2>

            <div className="space-y-4">
              {filteredData.map((item) => (
                <div
                  key={item.country}
                  className={`p-4 rounded-lg border ${
                    item.observesDST
                      ? "bg-yellow-500/5 border-yellow-500/20"
                      : "bg-theme-surface/30 border-theme-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-theme-text text-lg">{item.country}</h3>
                      <p className="text-sm text-theme-text-muted">{item.region}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.observesDST
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-theme-surface text-theme-text-muted"
                      }`}
                    >
                      {item.observesDST ? "Observes DST" : "No DST"}
                    </span>
                  </div>
                  {item.observesDST && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      <div>
                        <p className="text-xs text-theme-text-muted">DST Starts</p>
                        <p className="text-sm text-theme-text">{item.dstStart}</p>
                      </div>
                      <div>
                        <p className="text-xs text-theme-text-muted">DST Ends</p>
                        <p className="text-sm text-theme-text">{item.dstEnd}</p>
                      </div>
                      <div>
                        <p className="text-xs text-theme-text-muted">Standard Offset</p>
                        <p className="text-sm text-theme-text">{item.offset}</p>
                      </div>
                      <div>
                        <p className="text-xs text-theme-text-muted">DST Adjustment</p>
                        <p className="text-sm text-theme-text">{item.dstOffset}</p>
                      </div>
                    </div>
                  )}
                  {item.notes && (
                    <p className="text-xs text-theme-text-muted mt-2 italic">{item.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DaylightSavingTime;
