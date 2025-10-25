"use client";
import { useEffect, useState } from "react";
import RoleGuard from "../../components/RoleGuard";

export default function TeacherSchedules() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    subject: "",
    date: "",
  });

  // 🔹 Lấy dữ liệu từ sheet
  useEffect(() => {
    fetch("/api/sheet/schedules")
      .then((res) => res.json())
      .then((data) => setRows(data.data || []))
      .catch((err) =>
        console.error("Lỗi tải dữ liệu:", err)
      );
  }, []);

  // 🔹 Xử lý thêm buổi học
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newSchedule.subject || !newSchedule.date) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // 🔸 Định dạng ngày theo dd/MM/yyyy
    const formattedDate = new Date(
      newSchedule.date
    ).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    try {
      const res = await fetch("/api/sheet/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetName: "schedules",
          row: [newSchedule.subject, formattedDate],
        }),
      });

      if (res.ok) {
        alert("✅ Đã thêm lịch giảng dạy!");
        // 🔹 Chèn dòng mới lên đầu danh sách (không cần reload)
        setRows((prev) => [
          [newSchedule.subject, formattedDate],
          ...prev,
        ]);
        setShowForm(false);
        setNewSchedule({ subject: "", date: "" });
      } else {
        alert("❌ Lỗi khi thêm dữ liệu!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi gửi dữ liệu:", error);
    }
  };

  const headers = rows[0] || ["Môn học", "Ngày"];
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
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-green-100">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
            📅 Lịch giảng dạy
          </h1>

          {/* Thanh tìm kiếm + Nút thêm */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm buổi học theo tên hoặc ngày..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
            />
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all"
            >
              {showForm ? "✖ Hủy" : "➕ Thêm buổi học"}
            </button>
          </div>

          {/* Form thêm mới */}
          {showForm && (
            <form
              onSubmit={handleAdd}
              className="mb-6 p-4 border rounded-xl bg-green-50"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Môn học
                  </label>
                  <input
                    type="text"
                    value={newSchedule.subject}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        subject: e.target.value,
                      })
                    }
                    placeholder="Nhập tên môn học..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày học
                  </label>
                  <input
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        date: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                💾 Lưu lịch học
              </button>
            </form>
          )}

          {/* Bảng lịch */}
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
                {filteredRows.map((r, i) => (
                  <tr
                    key={i}
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
                ))}
              </tbody>
            </table>
          </div>

          {filteredRows.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Không tìm thấy buổi học nào khớp với từ khóa.
            </p>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
