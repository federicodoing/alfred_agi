import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Alfred - Your Family's Finance Butler",
  description: "Set it once. Budget forever. Alfred helps manage all your family finances, from account linking to budgeting and debt payments.",
};

export const viewport: Viewport = {
  themeColor: "#ff6601",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="font-sans antialiased bg-[#fafafa] min-h-screen text-gray-900 selection:bg-[#ff6601] selection:text-white relative before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,102,1,0.05),rgba(255,255,255,0)_70%)] before:z-0">
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
