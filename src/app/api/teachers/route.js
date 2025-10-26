// src/app/api/teachers/route.js
import { NextResponse } from "next/server";
import {
  getGoogleSheet,
  SHEET_ID,
} from "../../../lib/sheets";

export async function GET() {
  try {
    const sheets = await getGoogleSheet();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "teachers!A2:Z",
    });

    const teachers = (res.data.values || []).map((r) => ({
      id: r[0],
      name: r[1],
    }));

    return NextResponse.json({ teachers });
  } catch (err) {
    console.error("Error fetching teachers:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
