import { NextResponse } from "next/server";
import { getSheet, SHEET_ID } from "@/lib/sheets";

// ✅ API: /api/sheet/teacher-classes?teacherId=GV001
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get("teacherId");

    const sheets = await getSheet();

    // --- Đọc bảng class_teachers ---
    const resTeachers =
      await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "teacher_classes!A:B",
      });
    const teacherRows = resTeachers.data.values || [];

    // --- Đọc bảng classes ---
    const resClasses = await sheets.spreadsheets.values.get(
      {
        spreadsheetId: SHEET_ID,
        range: "classes!A:C",
      }
    );
    const classRows = resClasses.data.values || [];

    // Lấy tiêu đề và tách dữ liệu
    const [_, ...teacherData] = teacherRows;
    const [__, ...classData] = classRows;

    // Lọc danh sách lớp theo teacherId
    const teacherClasses = teacherData
      .filter((r) => r[0] === teacherId)
      .map((r) => r[1]); // Lấy ClassID

    // Ánh xạ sang bảng classes
    const result = classData
      .filter((r) => teacherClasses.includes(r[0]))
      .map((r) => ({
        classId: r[0],
        className: r[1],
        subject: r[2],
      }));

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy danh sách lớp GV:",
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
