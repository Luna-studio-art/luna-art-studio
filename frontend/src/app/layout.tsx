import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArtStudio | Digital Artist Portfolio",
  description: "Professional digital artist specializing in fursuit models, digital art, 3D models, and video projects. Creating stunning visual experiences.",
  keywords: ["digital art", "fursuit", "3D models", "artist portfolio", "character design", "animation"],
  authors: [{ name: "ArtStudio" }],
  openGraph: {
    title: "ArtStudio | Digital Artist Portfolio",
    description: "Professional digital artist specializing in fursuit models, digital art, 3D models, and video projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CustomCursor />
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
