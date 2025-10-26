"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Đọc role + name từ localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    setRole(storedRole);
    setName(storedName);

    const handleChange = () => {
      setRole(localStorage.getItem("role"));
      setName(localStorage.getItem("name"));
    };

    window.addEventListener("roleChanged", handleChange);
    return () =>
      window.removeEventListener(
        "roleChanged",
        handleChange
      );
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Header */}
      <Header
        role={role}
        name={name}
        onToggleMenu={() => setIsNavOpen((prev) => !prev)}
      />

      {/* Navbar toggle (ẩn/hiện) */}
      <Navbar
        role={role}
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
      />

      {/* Nội dung trang */}
      <main
        className="flex-1 mt-[70px]"
        style={{
          background: "var(--edu-bg)",
          color: "var(--edu-text)",
        }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
