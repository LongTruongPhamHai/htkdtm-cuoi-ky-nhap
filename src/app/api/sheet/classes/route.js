import { NextResponse } from "next/server";
import { getSheet, SHEET_ID } from "@/lib/sheets";

// Lấy danh sách lớp từ sheet 'classes'
export async function GET() {
  try {
    const sheets = await getSheet();
    const range = "classes!A2:B"; // A: classId, B: subject

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });

    // res.data.values: mảng 2 chiều
    return NextResponse.json({
      data: res.data.values || [],
    });
  } catch (error) {
    console.error("❌ Lỗi khi đọc sheet classes:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
