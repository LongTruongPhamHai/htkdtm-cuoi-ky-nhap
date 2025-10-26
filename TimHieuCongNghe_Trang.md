Tìm hiểu các công nghệ sử dụng trong dự án
1. Next.js
Là gì

Next.js là một framework dựa trên React giúp xây dựng web app nhanh, hiệu quả và tối ưu hơn.
Nó hỗ trợ Server-Side Rendering (SSR), Static Site Generation (SSG) và Incremental Static Regeneration (ISR), giúp trang web tải nhanh và thân thiện với SEO.

Đặc điểm nổi bật

Hiệu suất cao: Render sẵn HTML từ server giúp tải trang nhanh, không cần chờ JavaScript.

Routing tự động: Tạo file trong thư mục pages/ là có route tương ứng, không cần cấu hình.

Tích hợp API Routes: Tạo backend nhỏ trong thư mục /api.

SEO tối ưu: SSR và meta tag động giúp dễ dàng được Google index.

Tối ưu hình ảnh: Component <Image /> giúp giảm dung lượng ảnh.

Hỗ trợ TypeScript và full-stack: Viết code an toàn, quản lý cả front-end và back-end trong cùng project.

Ứng dụng trong dự án

Trong dự án này, Next.js được dùng làm framework chính để:

Xây dựng giao diện website.

Quản lý routing và render dữ liệu.

Gọi API hiển thị dữ liệu và tối ưu hiệu suất khi triển khai.

2. Tailwind CSS
Là gì

Tailwind CSS là một framework CSS “utility-first”, cung cấp các class nhỏ có thể tái sử dụng để xây dựng giao diện trực tiếp trong HTML hoặc JSX, không cần viết CSS thủ công.

Đặc điểm nổi bật

Tùy biến linh hoạt: Dễ chỉnh theme, màu sắc, kích thước trong tailwind.config.js.

Phát triển nhanh: Viết giao diện bằng class, ví dụ:

<button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Đăng nhập</button>


Responsive dễ dàng: Hỗ trợ prefix như sm:, md:, lg: cho các kích thước màn hình.

Tối ưu dung lượng: Tự động loại bỏ CSS không dùng.

Dễ kết hợp: Làm việc tốt với Next.js, React và các framework JS khác.

Ứng dụng trong dự án

Tailwind CSS được dùng để:

Thiết kế giao diện nhanh và thống nhất.

Đảm bảo website responsive, hiển thị tốt trên mọi thiết bị.

Giúp tiết kiệm thời gian viết CSS và tăng hiệu quả làm việc nhóm.

3. Framer Motion
Là gì

Framer Motion là thư viện animation dành cho React và Next.js, giúp tạo hiệu ứng chuyển động tự nhiên và mượt mà chỉ với vài dòng code.

Đặc điểm nổi bật

Cú pháp đơn giản, dễ sử dụng hơn các thư viện như GSAP.

Tích hợp tốt với React: có thể thêm animation cho bất kỳ component nào.

Hỗ trợ nhiều loại animation: chuyển trang, xuất hiện/biến mất, hover, drag, theo state hoặc scroll.

Hiệu suất cao: Sử dụng motion values và layout animations giúp animation mượt ngay cả khi có nhiều phần tử.

Ứng dụng trong dự án

Framer Motion được dùng để:

Tạo hiệu ứng khi chuyển trang giữa các component.

Thêm animation cho button, card, popup, giúp giao diện sinh động.

Cải thiện trải nghiệm người dùng và tăng tính chuyên nghiệp cho sản phẩm.