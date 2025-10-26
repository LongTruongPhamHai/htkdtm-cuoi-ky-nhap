import { google } from "googleapis";

// 🔹 Lấy ID từ biến môi trường
export const SHEET_ID = process.env.GOOGLE_SHEET_ID;

let cachedSheets = null;

/**
 * Hàm khởi tạo Google Sheets client, có cache để không tạo lại mỗi request.
 */
export async function getGoogleSheet() {
  if (cachedSheets) return cachedSheets;

  try {
    // Parse thông tin service account (đã stringify trong .env)
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });
    cachedSheets = sheets;
    return sheets;
  } catch (error) {
    console.error("❌ Lỗi khởi tạo Google Sheets:", error);
    throw new Error(
      "Không thể kết nối tới Google Sheets API"
    );
  }
}
