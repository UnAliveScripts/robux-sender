import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Robux - Roblox",
  description: "Get Robux to purchase upgrades for your avatar or buy special abilities in experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#111111]">
        {children}
      </body>
    </html>
  );
}
