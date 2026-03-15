"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Clock, Code, Copy, Check, Eye } from "lucide-react";

type WidgetTheme = "dark" | "light" | "transparent";
type WidgetSize = "small" | "medium" | "large";

interface WidgetConfig {
  title: string;
  targetDate: string;
  targetTime: string;
  theme: WidgetTheme;
  size: WidgetSize;
  showSeconds: boolean;
  showLabels: boolean;
}

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const CountdownWidget = () => {
  const [config, setConfig] = useState<WidgetConfig>({
    title: "Countdown Timer",
    targetDate: "",
    targetTime: "00:00",
    theme: "dark",
    size: "medium",
    showSeconds: true,
    showLabels: true,
  });
  const [countdown, setCountdown] = useState<CountdownValues | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const calculateCountdown = useCallback((): CountdownValues => {
    if (!config.targetDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const target = new Date(`${config.targetDate}T${config.targetTime}`);
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    return {
      days,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
      isExpired: false,
    };
  }, [config.targetDate, config.targetTime]);

  useEffect(() => {
    if (!config.targetDate) return;

    setCountdown(calculateCountdown());
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [config.targetDate, calculateCountdown]);

  const generateEmbedCode = (): string => {
    const targetDateTime = config.targetDate ? `${config.targetDate}T${config.targetTime}` : "";

    const sizeStyles = {
      small: "font-size: 24px;",
      medium: "font-size: 36px;",
      large: "font-size: 48px;",
    };

    const themeStyles = {
      dark: "background: #1a1a2e; color: #ffffff;",
      light: "background: #ffffff; color: #1a1a2e;",
      transparent: "background: transparent; color: inherit;",
    };

    return `<!-- Countdown Widget -->
<div id="countdown-widget" style="
  ${themeStyles[config.theme]}
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  font-family: system-ui, -apple-system, sans-serif;
  ${sizeStyles[config.size]}
">
  <div style="margin-bottom: 10px; font-weight: bold;">${config.title}</div>
  <div id="countdown-display" style="display: flex; justify-content: center; gap: 20px;">
    <div><span id="days">00</span>${config.showLabels ? '<div style="font-size: 12px; opacity: 0.7;">DAYS</div>' : ''}</div>
    <div><span id="hours">00</span>${config.showLabels ? '<div style="font-size: 12px; opacity: 0.7;">HOURS</div>' : ''}</div>
    <div><span id="minutes">00</span>${config.showLabels ? '<div style="font-size: 12px; opacity: 0.7;">MINUTES</div>' : ''}</div>
    ${config.showSeconds ? `<div><span id="seconds">00</span>${config.showLabels ? '<div style="font-size: 12px; opacity: 0.7;">SECONDS</div>' : ''}</div>` : ''}
  </div>
</div>
<script>
(function() {
  const targetDate = new Date("${targetDateTime}");
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      ${config.showSeconds ? 'document.getElementById("seconds").textContent = "00";' : ''}
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    ${config.showSeconds ? 'document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");' : ''}
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
</script>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = generateEmbedCode();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPreviewStyles = () => {
    const baseStyles = "rounded-xl p-6 text-center";
    switch (config.theme) {
      case "dark":
        return `${baseStyles} bg-gray-900 text-white`;
      case "light":
        return `${baseStyles} bg-white text-gray-900 border border-gray-200`;
      case "transparent":
        return `${baseStyles} bg-transparent text-theme-text border border-theme-border`;
      default:
        return baseStyles;
    }
  };

  const getFontSize = () => {
    switch (config.size) {
      case "small":
        return "text-2xl md:text-3xl";
      case "medium":
        return "text-4xl md:text-5xl";
      case "large":
        return "text-5xl md:text-6xl";
      default:
        return "text-4xl md:text-5xl";
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-theme-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-theme-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 mb-4">
            <Code className="w-4 h-4 text-theme-primary" />
            <span className="text-sm text-theme-primary">Embeddable Widget</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Countdown Widget</span>
          </h1>
          <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
            Create an embeddable countdown timer for your website
          </p>
        </header>

        {/* Configuration */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-theme-text mb-6">Configure Your Widget</h2>

            {/* Title */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Widget Title
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                placeholder="Countdown Timer"
                className="w-full"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">
                  Target Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="date"
                    value={config.targetDate}
                    onChange={(e) => setConfig({ ...config, targetDate: e.target.value })}
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-theme-text">
                  Target Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-muted" />
                  <input
                    type="time"
                    value={config.targetTime}
                    onChange={(e) => setConfig({ ...config, targetTime: e.target.value })}
                    className="w-full pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Theme */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Theme
              </label>
              <div className="flex flex-wrap gap-3">
                {(["dark", "light", "transparent"] as WidgetTheme[]).map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setConfig({ ...config, theme })}
                    className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                      config.theme === theme
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary"
                        : "border-theme-border text-theme-text hover:border-theme-primary"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-theme-text">
                Size
              </label>
              <div className="flex flex-wrap gap-3">
                {(["small", "medium", "large"] as WidgetSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setConfig({ ...config, size })}
                    className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                      config.size === size
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary"
                        : "border-theme-border text-theme-text hover:border-theme-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-6 mb-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showSeconds}
                  onChange={(e) => setConfig({ ...config, showSeconds: e.target.checked })}
                />
                <span className="text-sm text-theme-text">Show Seconds</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showLabels}
                  onChange={(e) => setConfig({ ...config, showLabels: e.target.checked })}
                />
                <span className="text-sm text-theme-text">Show Labels</span>
              </label>
            </div>

            {/* Preview Toggle */}
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary flex items-center gap-2 mb-6"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>

            {/* Preview */}
            {showPreview && config.targetDate && (
              <div className="mb-6 p-4 bg-theme-surface/30 rounded-xl border border-theme-border">
                <p className="text-sm text-theme-text-muted mb-4">Preview:</p>
                <div className={getPreviewStyles()}>
                  <div className="font-bold mb-4">{config.title}</div>
                  <div className="flex justify-center gap-6">
                    <div>
                      <span className={`font-bold ${getFontSize()}`}>
                        {countdown ? countdown.days.toString().padStart(2, "0") : "00"}
                      </span>
                      {config.showLabels && (
                        <div className="text-xs opacity-70 mt-1">DAYS</div>
                      )}
                    </div>
                    <div>
                      <span className={`font-bold ${getFontSize()}`}>
                        {countdown ? countdown.hours.toString().padStart(2, "0") : "00"}
                      </span>
                      {config.showLabels && (
                        <div className="text-xs opacity-70 mt-1">HOURS</div>
                      )}
                    </div>
                    <div>
                      <span className={`font-bold ${getFontSize()}`}>
                        {countdown ? countdown.minutes.toString().padStart(2, "0") : "00"}
                      </span>
                      {config.showLabels && (
                        <div className="text-xs opacity-70 mt-1">MINUTES</div>
                      )}
                    </div>
                    {config.showSeconds && (
                      <div>
                        <span className={`font-bold ${getFontSize()}`}>
                          {countdown ? countdown.seconds.toString().padStart(2, "0") : "00"}
                        </span>
                        {config.showLabels && (
                          <div className="text-xs opacity-70 mt-1">SECONDS</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Generated Code */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-theme-text flex items-center gap-2">
                <Code className="w-5 h-5 text-theme-primary" />
                Embed Code
              </h2>
              <button
                type="button"
                onClick={copyToClipboard}
                disabled={!config.targetDate}
                className="btn-primary flex items-center gap-2"
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
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap break-all">
                <code>
                  {config.targetDate
                    ? generateEmbedCode()
                    : "// Configure your widget above to generate the embed code"}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-theme-text mb-4">How to Use</h2>
            <ol className="space-y-3 text-theme-text-muted">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">1</span>
                </span>
                <span>Configure your countdown widget using the options above</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">2</span>
                </span>
                <span>Set the target date and time for your countdown</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">3</span>
                </span>
                <span>Preview your widget to see how it will look</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-theme-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-theme-primary font-bold">4</span>
                </span>
                <span>Copy the embed code and paste it into your website&apos;s HTML</span>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CountdownWidget;
