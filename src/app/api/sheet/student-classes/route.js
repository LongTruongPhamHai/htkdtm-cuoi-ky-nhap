import { NextResponse } from "next/server";
import { getSheet, SHEET_ID } from "@/lib/sheets";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get("classId");
    if (!classId) {
      return NextResponse.json(
        { error: "Missing classId" },
        { status: 400 }
      );
    }

    const sheets = await getSheet();

    // --- Lấy bảng student_classes (studentId | classId) ---
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "student_classes!A:B",
    });
    const rows = res.data.values || [];
    if (rows.length < 2)
      return NextResponse.json({ data: [] });

    const [, ...data] = rows;
    const studentIds = data
      .filter((r) => r[1] === classId)
      .map((r) => r[0]);

    return NextResponse.json({ data: studentIds });
  } catch (error) {
    console.error("❌ Lỗi khi lấy student_classes!", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
