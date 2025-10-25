"use client";
import { useEffect, useState } from "react";
import RoleGuard from "../../components/RoleGuard";

export default function TeacherStudents() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // ✅ Gọi đúng route dynamic [name]
    fetch("/api/sheet/students")
      .then((res) => res.json())
      .then((data) => setRows(data.data || []))
      .catch((err) =>
        console.error("Lỗi tải dữ liệu:", err)
      );
  }, []);

  if (rows.length === 0) {
    return (
      <RoleGuard role="teacher">
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p>Đang tải dữ liệu sinh viên...</p>
        </div>
      </RoleGuard>
    );
  }

  const headers = rows[0];
  const filteredRows = rows
    .slice(1)
    .filter((r) =>
      r.some((cell) =>
        cell?.toLowerCase().includes(search.toLowerCase())
      )
    );

  return (
    <RoleGuard role="teacher">
      <div className="min-h-screen bg-linear-to-br from-green-50 to-white p-8">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-green-100">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
            📋 Danh sách sinh viên
          </h1>

          {/* Thanh tìm kiếm */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="🔍 Tìm sinh viên theo tên hoặc MSSV..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
            />
            <span className="text-sm text-gray-500 hidden sm:block">
              Tổng: {filteredRows.length} sinh viên
            </span>
          </div>

          {/* Bảng dữ liệu */}
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full border border-gray-200 bg-white">
              <thead className="bg-green-100 text-green-800 uppercase text-sm font-semibold">
                <tr>
                  {headers.map((header, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 border-b border-gray-300 text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r, i) => {
                  const studentId = r[0];
                  return (
                    <tr
                      key={i}
                      onClick={() =>
                        (window.location.href = `/teacher/students/${studentId}`)
                      }
                      className="hover:bg-green-50 transition-all cursor-pointer"
                    >
                      {r.map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-2 border-b border-gray-200 text-center text-sm text-gray-700"
                        >
                          {cell || "-"}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Nếu không có kết quả */}
          {filteredRows.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Không tìm thấy sinh viên nào khớp với từ khóa.
            </p>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
