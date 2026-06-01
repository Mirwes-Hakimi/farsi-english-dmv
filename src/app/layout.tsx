
import './globals.css'
export default function RootLayout({
    children,

}: {
    children: React.ReactNode
}){
    return (
        <html lang="en">

            <body suppressHydrationWarning>
                <nav>
                    <a href="/">Home</a>
                    {" | "}
                    <a href="/about">About</a>
                </nav>
                {children}
            </body>
        </html>
    )
}