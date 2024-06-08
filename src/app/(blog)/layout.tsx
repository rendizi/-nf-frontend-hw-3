'use client'

import {ThemeProvider} from "@/app/config/context/themeContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <ThemeProvider>
      <body>{children}</body>
    </ThemeProvider>
    </html>
  )
}
