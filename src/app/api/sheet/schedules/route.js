import { NextResponse } from "next/server";
import { getSheet, SHEET_ID } from "@/lib/sheets";

export async function GET() {
  try {
    const sheets = await getSheet();
    const range = "schedules!A:B";

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });

    return NextResponse.json({
      data: res.data.values || [],
    });
  } catch (error) {
    console.error("❌ Lỗi khi đọc sheet:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ✅ Ghi lên đầu sheet (thay vì append)
export async function POST(request) {
  try {
    const body = await request.json();
    const sheets = await getSheet();

    // Lấy dữ liệu cũ
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "schedules!A2:B",
    });

    const oldValues = getRes.data.values || [];
    const newValues = [body.row, ...oldValues]; // chèn lên đầu

    // Ghi đè toàn bộ sheet (có thể chỉnh lại vùng nếu muốn)
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: "schedules!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: newValues },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Lỗi khi ghi sheet:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
