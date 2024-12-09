import React from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <Toaster position="top-center" />
      <main className="bg-green-50">{children}</main>
    </main>
  );
};

export default Layout;
