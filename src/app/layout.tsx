import './globals.css'
import Navbar from './components/Navbar';
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }:
  { children: React.ReactNode }
) {
  return (
    <html lang="en">
      <head>
        {/* Links the PWA manifest file */}
        <link rel="manifest" href="/manifest.json" />

        {/* Browser/status bar color */}
        <meta name="theme-color" content="#2563eb" />

        {/* iPhone standalone app support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DMV Quiz" />

        {/* iPhone home screen icon */}
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Browser tab favicon — your DMV logo */}
        <link rel="icon" href="/icon-192.png" type="image/png" />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}