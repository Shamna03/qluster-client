import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/Providers/QueryProvider";
import Script from "next/script";
import LayoutWrapper from "@/Components/layout/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Qluster",
  description: "Qluster",
  icons: {
    icon: "/favicon.ico", // Standard favicon
    shortcut: "/favicon.ico", // Shortcut icon
    apple: "/favicon.ico", // Apple touch icon
  },
};

const  RootLayout =({children,}: Readonly<{children: React.ReactNode;}>) =>{
  return (
    <html lang="en">
      <head>
        {/* Google Identity Script */}
        {/* <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
        </ReactQueryProvider>

      </body>
    </html>
  );
}
export default RootLayout