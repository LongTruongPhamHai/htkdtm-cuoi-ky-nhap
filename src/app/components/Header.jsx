"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

export default function Header({ onToggleMenu }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({
    role: "",
    name: "",
  });

  // 🔹 Lấy dữ liệu user từ localStorage khi load hoặc thay đổi
  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    if (role && name) {
      setUser({ role, name });
    } else {
      setUser({ role: "", name: "" });
    }

    // Theo dõi sự kiện thay đổi role (ví dụ: khi đăng xuất)
    const handleRoleChange = () => {
      const newRole = localStorage.getItem("role");
      const newName = localStorage.getItem("name");
      setUser({
        role: newRole || "",
        name: newName || "",
      });
    };

    window.addEventListener(
      "roleChanged",
      handleRoleChange
    );
    return () =>
      window.removeEventListener(
        "roleChanged",
        handleRoleChange
      );
  }, []);

  // 🔹 Toggle menu sidebar
  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
    if (onToggleMenu) onToggleMenu();
  };

  // 🔹 Đăng xuất
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("roleChanged"));
    window.location.href = "/";
  };

  // 🔹 Cuộn xuống phần đăng nhập (ở trang chủ)
  const handleScrollToLogin = () => {
    const section =
      document.getElementById("login-section");
    if (section)
      section.scrollIntoView({ behavior: "smooth" });
  };

  // 🔹 Không hiển thị nút đăng nhập ở trang /login
  const hideLoginButton = pathname === "/login";

  return (
    <header
      className="w-full h-[70px] px-6 py-3 flex justify-between items-center shadow-md fixed top-0 left-0 z-50"
      style={{
        backgroundColor: "var(--edu-primary)",
        color: "white",
      }}
    >
      {/* 🔹 Logo + Nút Toggle */}
      <div className="flex items-center gap-3">
        {user.role && (
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg hover:opacity-80 transition"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        )}
        <h1 className="text-2xl font-bold tracking-wide">
          Smart Classroom
        </h1>
      </div>

      {/* 🔹 Phần bên phải (user info / login) */}
      {user.role ? (
        <div className="flex items-center gap-4">
          <span className="text-sm md:text-base font-medium">
            {user.role === "teacher" ? "👩‍🏫" : "🎓"}{" "}
            {user.name || "Người dùng"}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-white text-[var(--edu-primary)] font-semibold px-3 py-1.5 rounded-lg hover:bg-[var(--edu-accent)] hover:text-white transition"
          >
            <LogOut size={16} /> <span>Đăng xuất</span>
          </button>
        </div>
      ) : (
        !hideLoginButton && (
          <button
            onClick={handleScrollToLogin}
            className="bg-white text-[var(--edu-primary)] font-semibold px-3 py-1.5 rounded-lg hover:bg-[var(--edu-accent)] hover:text-white transition"
          >
            Đăng nhập
          </button>
        )
      )}
    </header>
  );
}
