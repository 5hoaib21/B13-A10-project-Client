import dns from "node:dns"
dns.setServers(['1.1.1.1', '1.0.0.1']);

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "PromptForge",
  description: "AI Prompt Sharing & Marketplace Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto px-2 min-h-screen">
          {children}
        </main>

        <Footer/>
        <Toaster />
      </body>
    </html>
  );
}
