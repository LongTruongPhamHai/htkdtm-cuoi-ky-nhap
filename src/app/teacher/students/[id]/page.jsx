"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/api/student/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data.data))
      .catch((err) =>
        console.error("Lỗi khi tải dữ liệu:", err)
      );
  }, [id]);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-3"></div>
        <p>Đang tải thông tin sinh viên...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white p-8 flex justify-center items-center">
      <div className="w-full max-w-3xl h-fit bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-blue-600 text-white py-6 px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              👤 Hồ sơ sinh viên
            </h1>
            <p className="text-blue-100">
              Mã sinh viên:{" "}
              <span className="font-semibold">
                {student["Mã sinh viên"] || id}
              </span>
            </p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              student["Họ tên"] || "Sinh viên"
            )}&background=1d4ed8&color=fff&size=100`}
            alt="Avatar"
            className="rounded-full w-20 h-20 mt-4 sm:mt-0 shadow-lg border-2 border-white"
          />
        </div>

        {/* Nội dung chi tiết */}
        <div className="p-6">
          <table className="w-full border-collapse">
            <tbody>
              {Object.entries(student).map(
                ([key, value], index) => (
                  <tr
                    key={key}
                    className={`transition hover:bg-blue-50 ${
                      index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    }`}
                  >
                    <td className="font-semibold text-gray-700 px-4 py-3 w-1/3 border-b border-gray-200">
                      {key}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
                      {value || "-"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={() => history.back()}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow-sm transition w-full"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
