import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Smart Classroom",
  description: "Hệ thống quản lý lớp học thông minh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {/* Dùng client wrapper riêng cho các phần có state */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
