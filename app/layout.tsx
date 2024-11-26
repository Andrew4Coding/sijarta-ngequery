import Layout from "@/components/layout";
import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sijarta",
  description: "Sijarta by ngeQuery team",
};

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: "--font-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        className={`${jakartaSans.variable} antialiased font-jakarta`}
      >
        <Suspense
          fallback={
            <div className="w-full h-[100vh] flex items-center justify-center bg-background">
              <h3 className="">Loading ... </h3>
            </div>
          }
        >
            <Navbar />
            <Layout>{children}</Layout>
            <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
