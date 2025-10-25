"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ isOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);

    // 🔔 Lắng nghe thay đổi role trong localStorage (kể cả tab hiện tại)
    const handleRoleChange = () => {
      const updatedRole = localStorage.getItem("role");
      setRole(updatedRole);
    };

    // Khi role thay đổi ở đâu đó (ví dụ: sau khi login)
    window.addEventListener("roleChange", handleRoleChange);
    window.addEventListener("storage", handleRoleChange); // cho cả tab khác

    return () => {
      window.removeEventListener(
        "roleChange",
        handleRoleChange
      );
      window.removeEventListener(
        "storage",
        handleRoleChange
      );
    };
  }, []);

  if (!role) return null; // không hiển thị nếu chưa đăng nhập

  const menuItems =
    role === "teacher"
      ? [
          { name: "Trang chủ", path: "/teacher/home" },
          {
            name: "Danh sách lớp",
            path: "/teacher/students",
          },
          {
            name: "Điểm danh",
            path: "/teacher/attendance",
          },
          { name: "Biểu đồ", path: "/teacher/chart" },
        ]
      : [
          { name: "Trang chủ", path: "/students/home" },
          { name: "Lịch học", path: "/students/schedule" },
          { name: "Nộp bài", path: "/students/homework" },
          { name: "Xem điểm", path: "/students/scores" },
        ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -250, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-56 bg-gray-50 border-r shadow-md p-4 z-999"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg text-gray-800">
              Menu
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  onClose();
                }}
                className={`text-left px-3 py-2 rounded-lg hover:bg-blue-100 ${
                  pathname === item.path
                    ? "bg-blue-200 font-semibold"
                    : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
