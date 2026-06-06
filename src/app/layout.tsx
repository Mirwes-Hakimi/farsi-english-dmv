
import './globals.css'
import Navbar from './components/Navbar'
export default function RootLayout({ children }:
     { children: React.ReactNode
}){
    return (
        <html lang="en">
            <head>
  {/* Links the PWA manifest file — tells browser this is installable */}
  <link rel="manifest" href="/manifest.json" />
  
  {/* Sets the browser/status bar color to match app blue */}
  <meta name="theme-color" content="#2563eb" />
  
  {/* Tells iPhone this can run as a standalone app (no browser bar) */}
  <meta name="apple-mobile-web-app-capable" content="yes" />
  
  {/* Sets iPhone status bar style */}
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  
  {/* App name shown when adding to iPhone home screen */}
  <meta name="apple-mobile-web-app-title" content="DMV Quiz" />
  
  {/* Icon shown on iPhone home screen */}
  <link rel="apple-touch-icon" href="/icon-192.png" />
</head>
            <body suppressHydrationWarning>
               <Navbar />
                {children}
            </body>
        </html>
    )
}