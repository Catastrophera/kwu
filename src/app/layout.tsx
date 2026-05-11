import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "IT Self-Sticker | Premium Developer Decals",
  description: "Beli stiker IT paling keren dengan fitur Gacha!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${space.variable} font-sans antialiased text-white min-h-screen flex flex-col selection:bg-cyber-pink selection:text-white`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <FloatingWhatsApp />
          <footer className="border-t border-white/5 py-8 mt-12 glass-panel text-center">
            <p className="text-sm text-gray-400">&copy; 2026 IT Self-Sticker. Crafted for Developers.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
