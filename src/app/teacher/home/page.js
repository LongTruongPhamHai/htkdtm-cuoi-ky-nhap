"use client";
import RoleGuard from "../../components/RoleGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherHome() {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    setTeacherId(id || "");
    setTeacherName(name || "");

    if (id) {
      fetch(`/api/sheet/teacher-classes?teacherId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setClasses(data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi tải lớp:", err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <RoleGuard role="teacher">
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-50 to-white p-8">
        {/* 👨‍🏫 Thông tin giảng viên */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-fulltext-center mb-10 border border-green-100">
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            👨‍🏫 Xin chào, {teacherName || "Giảng viên"}!
          </h1>
          <p className="text-gray-600 text-lg text-center">
            Mã giảng viên:{" "}
            <span className="font-semibold">
              {teacherId}
            </span>
          </p>
        </div>

        {/* 📚 Danh sách lớp */}
        {loading ? (
          <p className="text-gray-500 italic">
            Đang tải danh sách lớp...
          </p>
        ) : classes.length === 0 ? (
          <p className="text-gray-500 italic">
            Bạn chưa được phân công lớp nào.
          </p>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 w-full max-w-3xl">
            {classes.map((cls, i) => (
              <button
                key={i}
                onClick={() =>
                  router.push(
                    `/teacher/classes/${cls.classId}`
                  )
                }
                className="group flex flex-col items-center justify-center p-6 w-full bg-green-500 text-white rounded-2xl shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-200"
              >
                <span className="text-2xl mb-1">
                  🏫 {cls.className}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
