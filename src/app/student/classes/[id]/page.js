"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoleGuard from "../../../components/RoleGuard";
import { motion } from "framer-motion";
import {
  Users2,
  Calendar,
  FileText,
  ClipboardCheck,
  BarChart2,
} from "lucide-react";

export default function ClassDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = localStorage.getItem("id");
    if (!studentId) return setLoading(false);

    fetch(`/api/student-classes?studentId=${studentId}`)
      .then((res) => res.json())
      .then((data) => setClasses(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const currentClass = classes.find(
    (c) =>
      String(c.id).toLowerCase() ===
      String(id).toLowerCase()
  );

  // Danh sách button với icon
  const menuButtons = [
    { label: "Lịch học", path: "schedule", icon: Calendar },
    { label: "Nhóm học tập", path: "groups", icon: Users2 },
    {
      label: "Bài tập",
      path: "assignments",
      icon: FileText,
    },
    {
      label: "Kiểm tra",
      path: "tests",
      icon: ClipboardCheck,
    },
    { label: "Bảng điểm", path: "grades", icon: BarChart2 },
  ];

  return (
    <RoleGuard role="student">
      <div className="h-fit p-10 bg-[var(--edu-bg)] text-[var(--edu-text)]">
        {/* ===================== HERO SECTION ===================== */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--edu-primary)]">
            🏫 {id}
          </h1>
          <p className="text-lg mt-3">
            {currentClass
              ? currentClass.name
              : loading
              ? "⏳ Đang tải thông tin lớp..."
              : "⛔ Không tìm thấy lớp"}
          </p>
        </div>

        {/* ===================== MENU BUTTONS ===================== */}
        {!loading && currentClass && (
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuButtons.map(
              ({ label, path, icon: Icon }) => (
                <motion.button
                  key={path}
                  whileHover={{
                    scale: 1.04,
                    backgroundColor: "var(--edu-accent)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    router.push(
                      `/student/classes/${id}/${path}`
                    )
                  }
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl bg-[var(--edu-primary)] text-white font-medium shadow-md transition-colors ${
                    label === "Lịch học" && "col-span-2"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </motion.button>
              )
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-lg mt-10">
            ⏳ Đang tải dữ liệu...
          </p>
        )}

        {/* Không tìm thấy lớp */}
        {!loading && !currentClass && (
          <p className="text-center text-lg mt-10">
            ⛔ Không tìm thấy lớp.
          </p>
        )}
      </div>
    </RoleGuard>
  );
}
