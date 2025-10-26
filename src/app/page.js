"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // 🔹 Tin tức mẫu
  const news = [
    {
      title: "📢 Thông báo nộp bài tập tuần 8",
      content:
        "Sinh viên các nhóm cần hoàn thành và nộp bài tập nhóm trước 23h59 ngày 28/10/2025.",
      date: "26/10/2025",
    },
    {
      title: "🧠 Workshop: Trí tuệ nhân tạo trong giáo dục",
      content:
        "Buổi workshop dành cho sinh viên và giảng viên muốn tìm hiểu về ứng dụng AI trong học tập.",
      date: "24/10/2025",
    },
    {
      title: "🎓 Kết quả giữa kỳ học phần HTKDTM",
      content:
        "Điểm giữa kỳ đã được cập nhật trên hệ thống. Sinh viên vui lòng đăng nhập để xem chi tiết.",
      date: "22/10/2025",
    },
  ];

  // 🔹 Lấy dữ liệu user từ localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    if (storedRole && storedName) {
      setRole(storedRole);
      setName(storedName);
    }
  }, []);

  const handleRoleSelect = (selectedRole) => {
    localStorage.setItem("role", selectedRole);
    router.push("/login");
  };

  // 🔹 Menu theo role (không lặp lại Trang chủ / Tin tức)
  const roleMenu =
    role === "teacher"
      ? [
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Danh sách lớp quản lý",
            href: "/teacher/classes",
          },
        ]
      : role === "student"
      ? [
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Lớp đang học",
            href: "/student/classes",
          },
        ]
      : [];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(135deg, var(--edu-bg), var(--edu-surface))",
        color: "var(--edu-text)",
      }}
    >
      {/* ---------- Hero Section ---------- */}
      <section className="relative w-full h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-4"
        >
          <h1
            className="text-5xl font-bold mb-4 drop-shadow-md"
            style={{ color: "var(--edu-primary)" }}
          >
            Hệ thống Quản lý Lớp học Thông minh
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--edu-text-light)" }}
          >
            Kết nối giảng viên và sinh viên trong một nền
            tảng hiện đại — Quản lý điểm danh, bài tập, và
            tiến độ học tập mọi lúc, mọi nơi.
          </p>
        </motion.div>

        <div
          className="absolute inset-0 opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, var(--edu-primary), transparent 70%)",
          }}
        ></div>
      </section>

      {/* ---------- Main Content ---------- */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-10 gap-10">
        {/* Tin tức - 7 cột */}
        <div className="lg:col-span-7 space-y-6">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--edu-primary-dark)" }}
          >
            📰 Tin tức & Thông báo
          </h2>
          <div className="space-y-4">
            {news.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                }}
                viewport={{ once: true }}
                className="rounded-xl p-5 shadow-md hover:shadow-lg transition"
                style={{
                  backgroundColor: "var(--edu-bg)",
                  border: "1px solid var(--edu-border)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-1"
                  style={{
                    color: "var(--edu-primary-dark)",
                  }}
                >
                  {item.title}
                </h3>
                <p>{item.content}</p>
                <p className="text-sm text-right text-[var(--edu-text-light)]">
                  {item.date}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Khối đăng nhập / menu role - 3 cột */}
        <div
          className="lg:col-span-3 flex flex-col items-center justify-start space-y-2"
          id="login-section"
        >
          {!role ? (
            <>
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: "var(--edu-primary-dark)" }}
              >
                🔑 Đăng nhập hệ thống
              </h2>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelect("teacher")}
                className="w-64 py-3 font-semibold rounded-xl shadow-md transition"
                style={{
                  backgroundColor: "var(--edu-teacher)",
                  color: "white",
                }}
              >
                👩‍🏫 Giảng viên
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelect("student")}
                className="w-64 py-3 font-semibold rounded-xl shadow-md transition"
                style={{
                  backgroundColor: "var(--edu-student)",
                  color: "white",
                }}
              >
                🎓 Sinh viên
              </motion.button>
            </>
          ) : (
            <>
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ color: "var(--edu-primary-dark)" }}
              >
                Menu
              </h2>

              {roleMenu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-64 block py-3 text-center font-semibold rounded-xl shadow-md transition mb-2"
                  style={{
                    backgroundColor: "var(--edu-primary)",
                    color: "white",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
