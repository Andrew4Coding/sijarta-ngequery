import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <Toaster position="top-center" />
      <main className="bg-green-50">{children}</main>
      <Footer />
    </main>
  );
};

export default Layout;
