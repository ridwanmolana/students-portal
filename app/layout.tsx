import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { Navigation } from "@/components/Navigation";
import { TopBar } from "@/components/TopBar";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Class 8A Hub",
  description: "Modern PWA for parents and students",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ReactQueryProvider>
          <Navigation />
          <div className="flex-1 flex flex-col md:pl-64">
            <TopBar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 w-full max-w-7xl mx-auto">
              {children}
            </main>
          </div>
          <PWAInstallPrompt />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
