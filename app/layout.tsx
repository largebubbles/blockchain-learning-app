import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";

export const metadata: Metadata = {
  title: "Learn Blockchain - Master Bitcoin in 30 Days",
  description: "A beginner-friendly course to learn blockchain and Bitcoin fundamentals. No technical background required. 5-10 minute daily lessons designed for complete beginners.",
  keywords: ["blockchain", "bitcoin", "cryptocurrency", "learn", "beginner", "tutorial", "education"],
  authors: [{ name: "Learn Blockchain" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#d97706",
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
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(theme);
                document.documentElement.style.colorScheme = theme;
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
