"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/app/config/context/themeContext";
import {AuthProvider} from "@/app/config/context/authContext";
import {BlogIdProvider} from "@/app/config/context/blogIdContext";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider>
              <AuthProvider>
                  <BlogIdProvider>
                    { children}
                  </BlogIdProvider>
              </AuthProvider>
          </ThemeProvider>
      </body>

    </html>
  );
}
