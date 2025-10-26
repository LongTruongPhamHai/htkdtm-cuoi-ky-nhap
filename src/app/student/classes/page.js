"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleGuard from "../../components/RoleGuard";
import { motion } from "framer-motion";

export default function StudentClassesPage() {
  const router = useRouter();
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

  return (
    <RoleGuard role="student">
      <div
        className="h-fit p-10"
        style={{
          background: "var(--edu-bg)",
          color: "var(--edu-text)",
        }}
      >
        {/* 🌟 HERO SECTION */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold"
            style={{ color: "var(--edu-primary)" }}
          >
            🎓 Danh sách lớp học
          </h1>
        </div>

        {/* 🏫 DANH SÁCH LỚP */}
        <div className="flex justify-center items-center gap-4">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl"
                  style={{
                    background: "var(--edu-surface)",
                    border: "1px solid var(--edu-border)",
                    height: "6rem",
                  }}
                ></div>
              ))
            : classes.map((cls, index) => (
                <motion.button
                  key={index}
                  onClick={() =>
                    router.push(
                      `/student/classes/${cls.id}`
                    )
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 rounded-2xl shadow-md flex flex-col items-center justify-center font-semibold transition"
                  style={{
                    background: "var(--edu-primary)",
                    color: "white",
                  }}
                >
                  <span className="text-2xl">
                    🏫 {cls.id}
                  </span>
                  <span className="text-lg mt-1">
                    {cls.name}
                  </span>
                </motion.button>
              ))}
        </div>

        {!loading && classes.length === 0 && (
          <p
            className="text-center mt-16 text-lg"
            style={{ opacity: 0.7 }}
          >
            ⛔ Không có lớp nào.
          </p>
        )}
      </div>
    </RoleGuard>
  );
}
