"use client";

import { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export default function ClientLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header onToggleMenu={() => setMenuOpen((p) => !p)} />
      <Navbar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <main className="p-4">{children}</main>
    </>
  );
}
