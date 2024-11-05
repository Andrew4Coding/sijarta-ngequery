import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </main>
  );
};

export default Layout;
