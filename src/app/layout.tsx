import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Date & Time Calculator | AAA Calculator",
  description: "Comprehensive date and time calculation tools - duration calculator, date difference, add/subtract days, weekday finder, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-theme-background text-theme-text">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
