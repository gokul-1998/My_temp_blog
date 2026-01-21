import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: "My Tech Blog",
  description: "A collection of technical notes and tutorials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container">
            <div className="nav-inner">
              <Link href="/" className="logo">MyTechBlog</Link>
              <nav className="nav-links">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/about" className="nav-link">About</Link>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
