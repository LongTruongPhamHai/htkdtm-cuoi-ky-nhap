"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  BookOpen,
  Bell,
  User,
} from "lucide-react";

function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-xl shadow p-4 ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return (
    <div className="border-b pb-2 mb-2">{children}</div>
  );
}

function CardTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold">{children}</h2>
  );
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

export default function TeacherPage() {
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Giao diện render ngay — không chặn
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const teacherId = localStorage.getItem("id");
        if (!teacherId) return;

        const res = await fetch("/api/teacherData");
        const data = await res.json();

        const teacher = data.teachers.find(
          (t) => t.id === teacherId
        );
        const relatedIds = data.mappings
          .filter((m) => m.teacher_id === teacherId)
          .map((m) => m.class_id);

        const myClasses = data.classes.filter((c) =>
          relatedIds.includes(c.id)
        );

        setTeacher(teacher);
        setClasses(myClasses);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // --- UI hiển thị ngay ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: thông báo + tin tức */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Bell className="w-5 h-5" /> Thông báo mới
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    Lịch họp giảng viên vào thứ Hai, 9h
                    sáng.
                  </li>
                  <li>
                    Hạn chấm điểm học kỳ 1: 15/12/2025.
                  </li>
                  <li>
                    Vui lòng cập nhật đề cương môn học trên
                    hệ thống.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <BookOpen className="w-5 h-5" /> Tin tức
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Trường Đại học Công nghệ triển khai chương
                  trình “Giảng dạy thông minh 2025” với mục
                  tiêu chuyển đổi số toàn diện.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Cột phải: giảng viên + lớp */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-blue-700">
                  👩‍🏫 Thông tin giảng viên
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacher ? (
                  <>
                    <p className="text-gray-700">
                      <strong>Mã giảng viên:</strong>{" "}
                      {teacher.id}
                    </p>
                    <p className="text-gray-700">
                      <strong>Họ tên:</strong>{" "}
                      {teacher.name}
                    </p>
                  </>
                ) : isLoading ? (
                  <p className="flex justify-center items-center text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />{" "}
                    Đang tải thông tin...
                  </p>
                ) : (
                  <p className="text-gray-500">
                    Không có dữ liệu
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-blue-700">
                  📚 Các lớp đang quản lý
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {isLoading ? (
                  <p className="flex items-center justify-center text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />{" "}
                    Đang tải danh sách lớp...
                  </p>
                ) : classes.length === 0 ? (
                  <p className="text-gray-500">
                    Chưa có lớp nào
                  </p>
                ) : (
                  classes.map((cls) => (
                    <Button
                      key={cls.id}
                      onClick={() =>
                        alert(
                          `Đi đến lớp ${cls.name} (${cls.id})`
                        )
                      }
                    >
                      {cls.id} — {cls.name}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
