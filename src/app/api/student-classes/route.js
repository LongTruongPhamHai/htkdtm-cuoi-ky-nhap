import { NextResponse } from "next/server";
import {
  getGoogleSheet,
  SHEET_ID,
} from "../../../lib/sheets";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { error: "Missing studentId" },
        { status: 400 }
      );
    }

    const sheets = await getGoogleSheet();

    const [classesRes, mappingsRes] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "classes!A2:B",
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "student_classes!A2:B",
      }),
    ]);

    const classes = (classesRes.data.values || []).map(
      (r) => ({
        id: r[0],
        name: r[1],
      })
    );

    const mappings = (mappingsRes.data.values || []).map(
      (r) => ({
        student_id: r[0],
        class_id: r[1],
      })
    );

    // Lọc ra các lớp mà GV dạy
    const classIds = mappings
      .filter((m) => m.student_id === studentId)
      .map((m) => m.class_id);

    const result = classes.filter((c) =>
      classIds.includes(c.id)
    );

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("❌ Lỗi API student-classes:", error);
    return NextResponse.json(
      { error: "Failed to load student classes" },
      { status: 500 }
    );
  }
}
