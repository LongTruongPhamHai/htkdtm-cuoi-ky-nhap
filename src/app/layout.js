import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Smart Classroom",
  description: "Hệ thống quản lý lớp học thông minh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={beVietnam.className + " bg-gray-50"}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
