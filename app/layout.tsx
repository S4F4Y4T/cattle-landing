import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CattleSync — Farm Management Software for Bangladesh",
  description:
    "The complete farm ERP for livestock, inventory, finance, HR, and e-commerce. Start your 14-day free trial — no credit card required.",
  openGraph: {
    title: "CattleSync — Farm Management Software for Bangladesh",
    description:
      "Manage your entire farm operation in one place. Livestock, inventory, finance, HR, and e-commerce.",
    siteName: "CattleSync",
    type: "website",
    url: "https://www.cattlesync.com",
    images: [
      {
        url: "https://www.cattlesync.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CattleSync Farm Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CattleSync — Farm Management Software for Bangladesh",
    description:
      "The complete farm ERP for livestock, inventory, finance, HR, and e-commerce.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
