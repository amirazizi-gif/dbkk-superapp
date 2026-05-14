import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DBKK Super App — Satu Bandaraya, Satu Platform",
  description: "Dewan Bandaraya Kota Kinabalu Super App — Access all city services in one place.",
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
