import Layout from "@/components/layout";
import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Catamaran, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

import {cookies} from "next/headers";
import { CookieProvider } from "@/hooks/use-cookie";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  return (
    <html
      suppressHydrationWarning
      suppressContentEditableWarning
      lang="en">
      <body
        className={`${dmsans.variable} ${catamaran.variable} antialiased font-dmsans`}
      >
        <Suspense
          fallback={<div>Loading ...</div>}
        >
          <CookieProvider
            cookie={cookieStore.get('sessionToken')?.value}
          >
            <Navbar />
            <Layout>{children}</Layout>
            <Toaster />
          </CookieProvider>
        </Suspense>
      </body>
    </html>
  );
}
