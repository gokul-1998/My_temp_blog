import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: "Technical Knowledge Base",
  description: "A collection of technical notes and tutorials",
  icons: {
    icon: '/logo-dark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (!theme && supportDarkMode) document.documentElement.setAttribute('data-theme', 'dark');
                  if (theme) document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <header>
          <div className="container">
            <div className="nav-inner">
              <Link href="/" className="logo-container">
                <img src="/logo-light.png" alt="Logo" className="nav-logo logo-light" />
                <img src="/logo-dark.png" alt="Logo" className="nav-logo logo-dark" />
                <span className="logo-text">TechKnowledge</span>
              </Link>
              <nav className="nav-links">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/about" className="nav-link">About</Link>
                <Link href="/new" className="nav-link-btn">New Note</Link>
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
