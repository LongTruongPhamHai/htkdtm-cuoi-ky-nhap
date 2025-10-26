# Tìm hiểu cách sử dụng Git

Git là một **hệ thống quản lý phiên bản phân tán (Distributed Version Control System)**.  
Nó giúp nhiều người cùng làm việc trên một dự án mà không bị ghi đè code của nhau.

---

## 🧱 Các khái niệm cơ bản

- **Repository (Repo):** Kho chứa mã nguồn của dự án.  
- **Commit:** Ghi lại thay đổi (lưu lại trạng thái của code).  
- **Branch:** Nhánh làm việc riêng biệt, giúp phát triển tính năng độc lập.  
- **Merge:** Hợp nhất thay đổi từ nhánh phụ vào nhánh chính (thường là `main`).

---

## ⚙️ Các lệnh Git cơ bản

| Lệnh | Chức năng |
|------|------------|
| `git clone <link>` | Sao chép repo từ GitHub về máy |
| `git add <file>` | Thêm file vào khu vực chờ commit |
| `git commit -m "Ghi chú"` | Ghi lại thay đổi |
| `git push` | Đẩy thay đổi lên GitHub |
| `git pull` | Lấy thay đổi mới nhất từ GitHub về máy |
| `git checkout -b <ten_nhanh>` | Tạo và chuyển sang nhánh mới |

---

## ✅ Kết luận

Git giúp lập trình viên:
- Làm việc nhóm hiệu quả
- Theo dõi lịch sử thay đổi
- Dễ dàng quay lại phiên bản cũ khi cần

> *Tài liệu tham khảo:*  
> [https://git-scm.com/](https://git-scm.com/)  
> [https://topdev.vn/blog/github-la-gi](https://topdev.vn/blog/github-la-gi)
