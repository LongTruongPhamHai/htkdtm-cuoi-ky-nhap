"use client";
import RoleGuard from "../../../../components/RoleGuard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ClassStudentsPage() {
  const { id: classId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // 1️⃣ Lấy danh sách studentIds của lớp
        const resIds = await fetch(
          `/api/sheet/student-classes?classId=${classId}`
        );
        const dataIds = await resIds.json();
        const studentIds = dataIds.data || [];
        if (studentIds.length === 0) {
          setStudents([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Lấy thông tin chi tiết sinh viên
        const resStudents = await fetch(
          `/api/sheet/students?ids=${studentIds.join(",")}`
        );
        const dataStudents = await resStudents.json();
        setStudents(dataStudents.data || []);
      } catch (err) {
        console.error("❌ Lỗi khi tải sinh viên:", err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [classId]);

  const filteredRows = students.filter((r) =>
    Object.values(r).some((cell) =>
      cell
        ?.toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const headers =
    students.length > 0 ? Object.keys(students[0]) : [];

  return (
    <RoleGuard role="teacher">
      <div className="min-h-screen p-6 bg-green-50">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          👥 Sinh viên lớp {classId}
        </h1>

        {/* Thanh tìm kiếm */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            placeholder="🔍 Tìm sinh viên theo tên hoặc mã..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <span className="text-sm text-gray-500 hidden sm:block">
            Tổng: {filteredRows.length} sinh viên
          </span>
        </div>

        {/* Bảng dữ liệu */}
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-center border border-gray-200">
            <thead className="bg-green-100 text-green-800 uppercase text-sm font-semibold">
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 border-b border-gray-300"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r, i) => (
                <tr
                  key={i}
                  className="hover:bg-green-50 transition cursor-pointer"
                >
                  {headers.map((key, j) => (
                    <td
                      key={j}
                      className="px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-700"
                    >
                      {r[key] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <p className="text-center mt-4 text-gray-500">
            Đang tải danh sách sinh viên...
          </p>
        )}
        {!loading && filteredRows.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            Không tìm thấy sinh viên nào khớp.
          </p>
        )}
      </div>
    </RoleGuard>
  );
}
