import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

/* ── Fonts — loaded once, zero layout shift ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: "700",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: {
    default: "EFIQ One",
    template: "%s | EFIQ One",
  },
  description:
    "EFIQ One — a unified ecosystem for attendance and inventory management.",
  keywords: ["EFIQ", "attendance", "inventory", "enterprise"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366f1",
};

import LoadingScreen from "@/components/LoadingScreen";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        {/* Material Symbols — standard load for immediate icon availability */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen bg-background text-gray-900 font-display antialiased">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
