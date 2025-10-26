"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Navbar({ role, isOpen, onClose }) {
  const baseMenu = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/news" },
  ];

  const userMenu = [
    { label: "Dashboard", href: "/dashboard" },
  ];

  const roleMenu =
    role === "teacher"
      ? [
          {
            label: "Danh sách lớp quản lý",
            href: "/teacher/classes",
          },
        ]
      : role === "student"
      ? [{ label: "Lớp học", href: "/student/classes" }]
      : [];

  const menu = role
    ? [...baseMenu, ...userMenu, ...roleMenu]
    : baseMenu;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-10"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 25,
            }}
            className="fixed top-0 left-0 h-full w-64 shadow-lg z-[99] flex flex-col"
            style={{
              backgroundColor: "var(--edu-surface)",
            }}
          >
            {/* Header Sidebar */}
            <div
              className="flex justify-between items-center h-[70px] p-4 border-b"
              style={{
                backgroundColor: "var(--edu-primary)",
                color: "white",
              }}
            >
              <h2 className="text-lg font-semibold">
                {role
                  ? role === "teacher"
                    ? "Giảng viên"
                    : "Sinh viên"
                  : "Khách"}
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu */}
            <ul className="p-4 space-y-2">
              {menu.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-2 rounded-lg font-medium transition"
                    style={{
                      color: "var(--edu-text)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--edu-bg-light)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "transparent")
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
