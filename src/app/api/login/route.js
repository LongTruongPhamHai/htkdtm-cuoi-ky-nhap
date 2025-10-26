// app/api/login/route.js
import { NextResponse } from "next/server";
import {
  getGoogleSheet,
  SHEET_ID,
} from "../../../lib/sheets";

export async function POST(req) {
  try {
    const { role, username, password } = await req.json();

    if (!role || !["teacher", "student"].includes(role)) {
      return NextResponse.json(
        { error: "Thiếu hoặc sai role" },
        { status: 400 }
      );
    }

    const sheets = await getGoogleSheet();

    // 👇 Chọn sheet theo role
    const sheetName =
      role === "teacher" ? "teachers" : "students";

    // 👇 Đọc dữ liệu
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A2:C`,
    });

    const rows = res.data.values || [];

    // 👇 So khớp username (cột C) & password (cột A)
    const found = rows.find(
      (r) =>
        r[2]?.trim() === username.trim() && // cột C = username
        r[0]?.trim() === password.trim() // cột A = password
    );

    if (!found) {
      return NextResponse.json(
        { error: "Sai tài khoản hoặc mật khẩu" },
        { status: 401 }
      );
    }

    // ✅ Dữ liệu trả về có thể mở rộng
    const id = found[0] || ""; // ví dụ cột B = ID
    const name = found[1] || ""; // ví dụ cột D = Họ tên

    return NextResponse.json({
      id,
      name,
      role,
      message: "Đăng nhập thành công!",
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ" },
      { status: 500 }
    );
  }
}
