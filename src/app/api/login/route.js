import { NextResponse } from "next/server";
import { getSheet, SHEET_ID } from "@/lib/sheets";

export async function POST(req) {
  try {
    const { role, username, password } = await req.json();
    const sheets = await getSheet();

    // Chọn đúng sheet và range theo role
    const sheetName =
      role === "teacher" ? "teachers" : "students";
    const range = `${sheetName}!A2:C`;

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });

    const rows = res.data.values || [];

    const found = rows.find(
      (r) => r[2] === username && r[0] === password
    );

    if (!found) {
      return NextResponse.json(
        { error: "Sai tên đăng nhập hoặc mật khẩu" },
        { status: 401 }
      );
    }

    const displayId = found[0];
    const displayName = found[1];
    return NextResponse.json({
      success: true,
      name: displayName,
      id: displayId,
      role,
    });
  } catch (err) {
    console.error("❌ Lỗi login:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
