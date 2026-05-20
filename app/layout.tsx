import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NewStart UK — Your UK Journey Starts Here",
  description:
    "NewStart UK helps international students settle into the UK — with a personalised 90-day checklist, plain-English guidance, and scam alerts.",
  keywords: "international students, UK settlement, student checklist, UK arrival, NHS, bank account UK, council tax student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-civic-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
