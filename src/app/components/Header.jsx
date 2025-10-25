"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ onToggleMenu }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState(null);

  // ✅ Hàm đọc lại role từ localStorage
  const updateRole = () => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);
  };

  useEffect(() => {
    updateRole(); // Lấy giá trị khi component mount

    // ✅ Lắng nghe sự kiện "storage" (khi tab khác thay đổi localStorage)
    window.addEventListener("storage", updateRole);

    // ✅ Lắng nghe sự kiện tùy chỉnh "roleChanged" (do app dispatch khi login/logout)
    window.addEventListener("roleChanged", updateRole);

    return () => {
      window.removeEventListener("storage", updateRole);
      window.removeEventListener("roleChanged", updateRole);
    };
  }, []);

  // 🔒 Ẩn Header ở trang landing và login
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/students/login" ||
    pathname === "/teacher/login"
  )
    return null;

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    window.dispatchEvent(new Event("roleChanged")); // 👈 báo cho header cập nhật lại
    router.push("/");
  };

  const isLoggedIn = !!role;

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative z-50">
      <div className="flex items-center gap-3">
        {/* ☰ Nút menu chỉ hiện khi đã đăng nhập */}
        {isLoggedIn && (
          <button
            onClick={onToggleMenu}
            className="text-gray-600 hover:text-blue-600 text-xl"
          >
            ☰
          </button>
        )}

        <h1
          className="font-semibold text-xl cursor-pointer"
          onClick={() =>
            router.push(
              role === "teacher"
                ? "/teacher/home"
                : "/students/home"
            )
          }
        >
          🎓 Smart Classroom
        </h1>
      </div>

      {/* 🔴 Nút đăng xuất chỉ hiện khi đã đăng nhập */}
      {isLoggedIn && (
        <button
          onClick={logout}
          className="text-sm text-gray-600 hover:text-red-600"
        >
          Đăng xuất
        </button>
      )}
    </header>
  );
}
