import { google } from "googleapis";

// ✅ Lấy key service account từ biến môi trường
const serviceAccount = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT
);

// ✅ ID của Google Sheet
const SHEET_ID =
  "1KjE863_CWLiiK68eubjVcJrQK37GYSDYKLYNjwiowbs";

// ✅ Tạo client xác thực
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// ✅ Khởi tạo Google Sheets API instance
export async function getSheet() {
  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
}

export { SHEET_ID };
