import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Robux - Roblox",
  description: "Roblox is a global platform that brings people together through play.",
  icons: {
    icon: "/images/905bd722ee0a6ceda3caacde54c0b081.png",
    apple: "/images/905bd722ee0a6ceda3caacde54c0b081.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="stylesheet" href="/css/original/FoundationCss.css" />
        <link rel="stylesheet" href="/css/original/ReactStyleGuide.css" />
        <link rel="stylesheet" href="/css/original/StyleGuide.css" />
        <link rel="stylesheet" href="/css/original/Builder.css" />
        <link rel="stylesheet" href="/css/original/Navigation.css" />
        <link rel="stylesheet" href="/css/original/RobuxRedesign.css" />
        <link rel="stylesheet" href="/css/original/RobuxIcon.css" />
        <link rel="stylesheet" href="/css/original/Footer.css" />
      </head>
      <body className="rbx-body light-theme age-roblox-theme builder-font min-h-full">
        {children}
      </body>
    </html>
  );
}
