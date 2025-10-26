                                           Tìm hiểu cách sử dụng Git
PHẦN 1: GIT LÀ GÌ?
Khái niệm
Git là một hệ thống quản lý phiên bản phân tán (Distributed Version Control System).
Nói đơn giản: Git giúp bạn lưu lại lịch sử thay đổi của mã nguồn, làm việc nhóm mà không ghi đè nhau.
Ví dụ:
•	Khi bạn viết bài Word, bạn lưu bản v1.docx, v2.docx.
•	Git cũng làm như vậy với code: mỗi lần bạn “commit”, Git tạo ra một bản ghi lại toàn bộ thay đổi (phiên bản mới).

Cách hoạt động cơ bản
1.	Working Directory — nơi bạn làm việc (thư mục chứa file).
2.	Staging Area — khu tạm để chọn file sẽ lưu.
3.	Repository (Repo) — nơi Git lưu toàn bộ lịch sử thay đổi.
➡️ Quy trình cơ bản:
Bạn sửa file  → git add → git commit → git push

PHẦN 2: CÀI ĐẶT GIT
Trên Windows
1.	Vào https://git-scm.com/downloads
2.	Tải Git for Windows
3.	Cài đặt → để nguyên mặc định (Next → Next → Finish)
4.	Kiểm tra cài thành công:
5.	git --version
→ Kết quả: git version 2.xx.xx
Trên macOS
brew install git
Trên Linux (Ubuntu)
sudo apt update
sudo apt install git

PHẦN 3: CẤU HÌNH GIT BAN ĐẦU
Sau khi cài, bạn cần “giới thiệu bản thân” để Git ghi nhận người commit:
git config --global user.name "Tên của bạn"
git config --global user.email "Email GitHub của bạn"
Kiểm tra lại:
git config --list

 PHẦN 4: CÁC LỆNH GIT CƠ BẢN
Lệnh	Mô tả	Ví dụ
git init	Tạo repo Git mới	git init
git clone <url>	Sao chép repo từ GitHub về máy	git clone https://github.com/LongTruongPhamHai/htkdtm-cuoi-ky-nhap.git
git status	Xem trạng thái file	git status
git add <file>	Chọn file để commit	git add docs_git.md
git commit -m "Ghi chú"	Lưu lại thay đổi	git commit -m "Thêm hướng dẫn Git"
git push origin <branch>	Đẩy code lên GitHub	git push origin trangquynhvu_NhiemVu1
git pull	Lấy thay đổi mới nhất	git pull
git branch	Xem branch hiện có	git branch
git checkout -b <branch>	Tạo và chuyển sang branch mới	git checkout -b trangquynhvu_NhiemVu1
git merge <branch>	Gộp nhánh	git merge trangquynhvu_NhiemVu1
________________________________________
PHẦN 5: QUY TRÌNH LÀM VIỆC NHÓM TRONG DỰ ÁN (theo nhóm bạn)
Giả sử nhóm bạn có repo:
https://github.com/LongTruongPhamHai/htkdtm-cuoi-ky-nhap

Bước 1: Clone dự án về máy
git clone https://github.com/LongTruongPhamHai/htkdtm-cuoi-ky-nhap.git
cd htkdtm-cuoi-ky-nhap
Bước 2: Tạo branch riêng cho mình
Mỗi thành viên nên có 1 branch riêng để làm nhiệm vụ.
git checkout -b trangquynhvu_NhiemVu1
(VD: “NhiemVu1” là nhánh của bạn làm phần docs về Git)
Bước 3: Viết file tài liệu (docs)
Tạo 1 file mới trong thư mục docs/ (nếu có) hoặc thư mục gốc:
📄 docs_git.md
Nội dung bạn có thể chép chính bài hướng dẫn này hoặc tóm tắt lại ngắn gọn.

 Bước 4: Add và Commit
git add docs_git.md
git commit -m "Thêm file tài liệu hướng dẫn sử dụng Git"
Bước 5: Push lên GitHub
git push origin NhiemVu1
🔹 Bước 6: Tạo Pull Request (PR)
Trên GitHub:
1.	Chọn tab Pull requests
2.	Nhấn New pull request
3.	Chọn:
o	Base: main
o	Compare: trangquynhvu_NhiemVu1
4.	Nhấn Create pull request
5.	Gửi cho nhóm review → merge vào main.
________________________________________
PHẦN 6: MẸO VÀ KINH NGHIỆM
Tình huống	Cách xử lý
Thay đổi file rồi quên add	git add .
Lỡ commit sai nội dung	git commit --amend
Muốn xem lịch sử commit	git log --oneline
Muốn quay lại bản trước	git checkout <commit_id>
Muốn hủy thay đổi chưa commit	git restore <file>
Lỗi push do branch cũ	git pull origin main --rebase rồi push lại



