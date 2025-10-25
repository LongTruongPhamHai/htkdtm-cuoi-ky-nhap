"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-50 to-white text-center px-6">
      {/* Hiệu ứng fade-in tổng thể */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-fit"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🎓 Hệ thống Quản lý Lớp học Thông minh
        </h1>

        <p className="text-gray-600 text-lg mb-5 max-w-2xl mx-auto">
          Nền tảng hỗ trợ giảng viên và sinh viên trong việc
          điểm danh, nộp bài, và theo dõi kết quả học tập —
          mọi lúc, mọi nơi.
        </p>

        <h3 className="text-xl mb-5 font-bold">
          Chọn vai trò của bạn
        </h3>

        {/* Hai nút đăng nhập */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/teacher/")}
            className="px-8 py-3 bg-green-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-green-700 transition"
          >
            👨‍🏫 Giảng viên
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/students/")}
            className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            🎒 Sinh viên
          </motion.button>
        </div>
      </motion.div>

      {/* Footer nhỏ */}
      <footer className="absolute bottom-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Smart Classroom — All
        rights reserved
      </footer>
    </div>
  );
}
