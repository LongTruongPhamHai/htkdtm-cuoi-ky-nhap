# Hệ thống Quản lý Lớp học Thông minh

Đây là dự án **Next.js** được khởi tạo bằng [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Bắt đầu

### 1. Clone dự án

```bash
git clone <URL_REPO_CỦA_BẠN>
cd <THƯ_MỤC_DỰ_ÁN>
```

### 2. Cài đặt các package

Bạn có thể dùng `npm`, `yarn`, `pnpm` hoặc `bun` tùy môi trường:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### 3. Chạy server phát triển

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun dev
```

Sau đó mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### Chú ý:

- Vào Google Cloud -> APIs & Services -> Credentials, tìm Service Account tên smart-classroom-nhap-sheet-sa để tải key về thư mục gốc của dự án (Đặt file ngang hàng với các thư mục như src, docs,...).

- Tạo file .env giống với file .env.example và sửa nội dung

- Sheet lưu dữ liệu là [Smart-Classroom-DB](https://docs.google.com/spreadsheets/d/1KjE863_CWLiiK68eubjVcJrQK37GYSDYKLYNjwiowbs/edit?usp=sharing).

### 4. Sửa đổi dự án

- Các file chính: `app/page.js` (trang chủ), `app/teacher`, `app/students`.
- Khi chỉnh sửa, Next.js sẽ tự động reload trang.

---

## Cấu trúc chính của dự án

- `app/` – chứa các route và page theo **App Router** của Next.js.
- `components/` – chứa các component dùng chung, ví dụ `RoleGuard`, `Header`.
- `lib/` – chứa helper, ví dụ `sheets.js` để kết nối Google Sheets.
- `app/api/` – chứa các route API.

---

## Các tính năng nổi bật

- Quản lý giảng viên và sinh viên.
- Danh sách lớp, lịch giảng dạy.
- Bài tập, bài kiểm tra, bảng điểm.
- Biểu đồ tổng hợp kết quả học tập.
- Hỗ trợ phân quyền giữa giáo viên và sinh viên.

---

## Tài nguyên hữu ích

- [Next.js Documentation](https://nextjs.org/docs) – Tài liệu chính thức của Next.js.
- [Learn Next.js](https://nextjs.org/learn) – Tutorial tương tác để học Next.js.
- [Next.js GitHub](https://github.com/vercel/next.js) – Repository chính thức, góp ý và tham khảo mã nguồn.

---

## Triển khai

- Dự án có thể deploy dễ dàng trên **Vercel**.
- Hướng dẫn chi tiết: [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)
