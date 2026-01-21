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
