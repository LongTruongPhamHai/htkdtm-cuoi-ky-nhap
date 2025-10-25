import { NextResponse } from "next/server";
import { getSheet, SHEET_ID } from "@/lib/sheets";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids"); // 'id1,id2,id3'
    if (!idsParam) {
      return NextResponse.json({ data: [] });
    }

    const studentIds = idsParam
      .split(",")
      .map((id) => id.trim());
    if (studentIds.length === 0) {
      return NextResponse.json({ data: [] });
    }

    const sheets = await getSheet();

    // --- Lấy bảng students ---
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "students!A:C", // studentId | name | other info
    });
    const rows = res.data.values || [];
    if (rows.length < 2) {
      return NextResponse.json({ data: [] });
    }

    const [headers, ...data] = rows;

    // --- Lọc theo studentIds ---
    const result = data
      .filter((r) => studentIds.includes(r[0]))
      .map((r) => {
        const obj = {};
        headers.forEach((h, i) => (obj[h] = r[i] || ""));
        return obj;
      });

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy thông tin sinh viên!",
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
