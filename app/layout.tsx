import Layout from "@/components/layout";
import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Urbanist } from "next/font/google";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sijarta",
  description: "Sijarta by ngeQuery team",
};

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: "--font-urbanist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default async function RootLayout({
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
        className={`${urbanist.variable} antialiased font-dmsans`}
      >
        <Suspense
          fallback={<div>Loading ...</div>}
        >
            <Navbar />
            <Layout>{children}</Layout>
            <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
