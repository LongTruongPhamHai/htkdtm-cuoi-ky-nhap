import { NextResponse } from "next/server";
import { google } from "googleapis";

const SHEET_ID =
  "1KjE863_CWLiiK68eubjVcJrQK37GYSDYKLYNjwiowbs";
const RANGE = "Students!A:D";
const KEYFILE_PATH = "smart-classroom-nhap-sheet-sa.json";

export async function GET(request, contextPromise) {
  // ✅ Cần await vì contextPromise chứa params dạng Promise
  const { params } = contextPromise;
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("📌 Student ID:", id);

  if (!id) {
    return NextResponse.json(
      { error: "Thiếu mã sinh viên trong yêu cầu." },
      { status: 400 }
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILE_PATH,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];

    if (rows.length < 2) {
      return NextResponse.json(
        { error: "Không có dữ liệu sinh viên." },
        { status: 404 }
      );
    }

    const headers = rows[0];
    const studentRow = rows.find(
      (r) => String(r[0]).trim() === String(id).trim()
    );

    if (!studentRow) {
      return NextResponse.json(
        { error: `Không tìm thấy sinh viên có mã ${id}` },
        { status: 404 }
      );
    }

    const studentData = headers.reduce(
      (obj, key, index) => {
        obj[key] = studentRow[index] || "";
        return obj;
      },
      {}
    );

    return NextResponse.json({ data: studentData });
  } catch (err) {
    console.error(
      "❌ Lỗi khi lấy chi tiết sinh viên:",
      err
    );
    return NextResponse.json(
      { error: "Không thể đọc dữ liệu Google Sheets" },
      { status: 500 }
    );
  }
}
