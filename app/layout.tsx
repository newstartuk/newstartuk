import type { Metadata } from "next";
import "./globals.css";
import Nia from "@/components/Nia";

export const metadata: Metadata = {
  title: "NewStart UK — Your UK Settlement Guide",
  description:
    "NewStart UK helps international students settle into the UK within 90 days — personalised checklists, plain-English guidance, and local support.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-navy antialiased">
        {children}
        <Nia />
      </body>
    </html>
  );
}
