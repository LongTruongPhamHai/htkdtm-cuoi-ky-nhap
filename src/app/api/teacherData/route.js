import { NextResponse } from "next/server";
import { getGoogleSheet, SHEET_ID } from "@/lib/sheets";

export async function GET() {
  try {
    const sheets = await getGoogleSheet();

    // 🔹 Đọc song song 3 sheet
    const [teachersRes, classesRes, mappingsRes] =
      await Promise.all([
        sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: "teachers!A2:Z",
        }),
        sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: "classes!A2:Z",
        }),
        sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: "teacher_classes!A2:Z",
        }),
      ]);

    const teachers = (teachersRes.data.values || []).map(
      (r) => ({
        id: r[0],
        name: r[1],
      })
    );

    const classes = (classesRes.data.values || []).map(
      (r) => ({
        id: r[0],
        name: r[1],
      })
    );

    const mappings = (mappingsRes.data.values || []).map(
      (r) => ({
        teacher_id: r[0],
        class_id: r[1],
      })
    );

    return NextResponse.json({
      teachers,
      classes,
      mappings,
    });
  } catch (error) {
    console.error("Error loading teacher data:", error);
    return NextResponse.json(
      { error: "Failed to load teacher data" },
      { status: 500 }
    );
  }
}
