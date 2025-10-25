"use client";
import RoleGuard from "../../components/RoleGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentHome() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    setStudentId(id || "");
    setStudentName(name || "");

    if (id) {
      fetch(`/api/sheet/student-classes?studentId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setClasses(data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Lỗi tải lớp:", err);
          setLoading(false);
        });
    }
  }, []);

  return (
    <RoleGuard role="student">
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-white p-8">
        {/* 👨‍🎓 Thông tin sinh viên */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full text-center mb-10 border border-blue-100">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            👨‍🎓 Xin chào, {studentName || "Sinh viên"}!
          </h1>
          <p className="text-gray-600 text-lg">
            Mã sinh viên:{" "}
            <span className="font-semibold">
              {studentId}
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
            Bạn chưa tham gia lớp học nào.
          </p>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 w-full max-w-3xl">
            {classes.map((cls, i) => (
              <button
                key={i}
                onClick={() =>
                  router.push(
                    `/students/classes/${cls.classId}`
                  )
                }
                className="group flex flex-col items-center justify-center p-6 w-full bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
              >
                <span className="text-2xl mb-1">
                  📘 {cls.className}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
