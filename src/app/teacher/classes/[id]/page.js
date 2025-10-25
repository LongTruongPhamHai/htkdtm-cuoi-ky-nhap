"use client";
import { useRouter, useParams } from "next/navigation";
import RoleGuard from "../../../components/RoleGuard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TeacherClassPage() {
  const router = useRouter();
  const { id: classId } = useParams();
  const [className, setClassName] = useState("");

  useEffect(() => {
    fetch("/api/sheet/classes")
      .then((res) => res.json())
      .then((data) => {
        const cls = data.data.find((c) => c[0] === classId); // giả sử cột 0 là ID, cột 1 là tên
        if (cls) setClassName(cls[1]);
      })
      .catch((err) => console.error(err));
  }, [classId]);

  const buttons = [
    {
      label: "👥 Danh sách lớp",
      path: `/teacher/classes/${classId}/students`,
      color: "bg-green-500",
    },
    {
      label: "📅 Lịch giảng dạy",
      path: `/teacher/classes/${classId}/schedule`,
      color: "bg-blue-500",
    },
    {
      label: "📝 Bài tập",
      path: `/teacher/classes/${classId}/homeworks`,
      color: "bg-purple-500",
    },
    {
      label: "🧪 Bài kiểm tra",
      path: `/teacher/classes/${classId}/tests`,
      color: "bg-orange-500",
    },
    {
      label: "📊 Bảng điểm",
      path: `/teacher/classes/${classId}/scores`,
      color: "bg-teal-500",
    },
    {
      label: "📈 Biểu đồ",
      path: `/teacher/classes/${classId}/charts`,
      color: "bg-pink-500",
    },
  ];

  return (
    <RoleGuard role="teacher">
      <div className="min-h-screen p-8 bg-linear-to-br from-green-50 to-white">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-700">
            🏫 {className || "Lớp học: " + classId}
          </h1>
          <p className="text-gray-600 mt-2">
            Chọn chức năng để quản lý lớp học
          </p>
        </div>

        {/* Buttons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {buttons.map((btn, i) => (
            <motion.button
              key={i}
              onClick={() => router.push(btn.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${btn.color} text-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center transition-transform duration-200`}
            >
              <span className="text-2xl font-bold mb-1">
                {btn.label.split(" ")[0]}
              </span>
              <span className="text-lg font-semibold">
                {btn.label.replace(/^[^ ]+ /, "")}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
