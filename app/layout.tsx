import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FilterProvider } from "./FilterContext";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: "./font/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./font/Montserrat-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imp Manuschanok",
  description: "Imp Manuschanok Professional Stylist portfolio gallery",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        className={`${montserrat.variable} antialiased`}
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh",
          margin: 0 
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <FilterProvider>
            <Navbar/>
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer/>
          </FilterProvider>
        </Suspense>
      </body>
    </html>
  );
}
