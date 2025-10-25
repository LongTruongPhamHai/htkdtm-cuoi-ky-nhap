import { google } from "googleapis";
import path from "path";
import { readFileSync } from "fs";

// Đường dẫn tới file JSON key bạn đã tải
const KEYFILE_PATH = path.join(
  process.cwd(),
  "smart-classroom-nhap-sheet-sa.json"
);

// ID của Google Sheet
const SHEET_ID =
  "1KjE863_CWLiiK68eubjVcJrQK37GYSDYKLYNjwiowbs";

// Đọc key
const credentials = JSON.parse(
  readFileSync(KEYFILE_PATH, "utf8")
);

// Tạo client xác thực
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Khởi tạo instance
export async function getSheet() {
  const client = await auth.getClient();
  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });
  return sheets;
}

export { SHEET_ID };
