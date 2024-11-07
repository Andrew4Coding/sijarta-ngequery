import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/layout";

import { Catamaran, DM_Sans } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sijarta",
  description: "Sijarta by ngeQuery team",
};

const dmsans = DM_Sans({
  subsets: ['latin'],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const catamaran = Catamaran({
  subsets: ['latin'],
  variable: "--font-catamaran",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      suppressContentEditableWarning
      lang="en">
      <body
        className={`${dmsans.variable} ${catamaran.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
