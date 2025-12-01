import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Shuffl – Tiny one-day project ideas",
  description:
    "Skip the weather app. Get small, meaningful project ideas you can build in a day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-b from-background via-background to-muted text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen">
            <header className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
              <div className="text-sm font-medium text-muted-foreground">
                <span className="font-semibold text-primary">Shuffl</span>{" "}
                <span className="hidden sm:inline">
                  · idea tarot for beginner devs
                </span>
              </div>
              <ThemeToggle />
            </header>
            <main className="px-4 pb-10 sm:px-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
