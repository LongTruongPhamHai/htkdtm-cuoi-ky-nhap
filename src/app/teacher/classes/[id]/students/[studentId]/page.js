"use client";
import RoleGuard from "../../../../../components/RoleGuard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDetailPage() {
  const { classId, studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const teacherId = localStorage.getItem("id");
    if (!teacherId) {
      setError("Bạn chưa đăng nhập");
      setLoading(false);
      return;
    }

    // --- Bước 1: Lấy danh sách studentId trong lớp ---
    fetch(`/api/sheet/student-classes?classId=${classId}`)
      .then((res) => res.json())
      .then((data) => {
        const studentIdsInClass = (data.data || []).map(
          (s) => s.studentId
        );
        if (!studentIdsInClass.includes(studentId)) {
          setError("Sinh viên không thuộc lớp của bạn");
          setLoading(false);
          return;
        }

        // --- Bước 2: Lấy thông tin chi tiết sinh viên từ route students ---
        return fetch(`/api/sheet/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentIds: [studentId] }),
        });
      })
      .then((res) => res?.json())
      .then((data) => {
        if (!data) return;
        if (data.error) setError(data.error);
        else setStudent(data.data?.[0] || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [classId, studentId]);

  if (loading)
    return (
      <RoleGuard role="teacher">
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Đang tải thông tin sinh viên...
        </div>
      </RoleGuard>
    );

  if (error)
    return (
      <RoleGuard role="teacher">
        <div className="min-h-screen flex items-center justify-center text-red-500">
          {error}
        </div>
      </RoleGuard>
    );

  return (
    <RoleGuard role="teacher">
      <div className="min-h-screen p-6 bg-green-50">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          👤 Thông tin sinh viên:{" "}
          {student?.name || studentId}
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
          {Object.entries(student).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b border-gray-200 py-2"
            >
              <span className="font-semibold text-gray-700">
                {key}
              </span>
              <span className="text-gray-600">
                {value || "-"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
