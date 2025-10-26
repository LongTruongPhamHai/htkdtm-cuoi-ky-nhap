Tìm hiểu về Python và các thư viện AI
Liên quan: Issue #3
________________________________________
1. Python
1.1. Khái niệm tổng quan
Python là một ngôn ngữ lập trình bậc cao, đa năng và dễ học, được sử dụng rộng rãi trong các lĩnh vực như:
•	Khoa học dữ liệu (Data Science)
•	Trí tuệ nhân tạo (AI)
•	Phân tích dữ liệu (Data Analysis)
•	Phát triển web, ứng dụng, và tự động hóa (Automation)
Python có cú pháp đơn giản, cộng đồng lớn và kho thư viện phong phú, giúp lập trình viên phát triển nhanh chóng mà không cần viết quá nhiều code.
1.2. Cách sử dụng cơ bản
•	File Python có đuôi .py
•	Chạy chương trình bằng lệnh:
•	python ten_file.py
•	Ví dụ cơ bản:
•	print("Hello, Python!")
•	
•	# Tính tổng
•	a = 5
•	b = 3
•	print("Tổng là:", a + b)
1.3. Ứng dụng
•	Phân tích dữ liệu, thống kê, trực quan hóa.
•	Huấn luyện và triển khai mô hình trí tuệ nhân tạo (AI/ML).
•	Tự động hóa quy trình, xử lý file, web scraping.
•	Phát triển web (Django, Flask).
________________________________________
2. NumPy
2.1. Khái niệm tổng quan
NumPy (Numerical Python) là thư viện hỗ trợ tính toán số học và đại số tuyến tính, đặc biệt hiệu quả với mảng (array) nhiều chiều.
2.2. Cách sử dụng cơ bản
Cài đặt:
pip install numpy
Ví dụ:
import numpy as np

# Tạo mảng
arr = np.array([1, 2, 3, 4])
print(arr)

# Các phép toán
print(arr + 10)
print(arr.mean())  # Trung bình
2.3. Ứng dụng
•	Xử lý và tính toán dữ liệu nhanh gấp nhiều lần so với Python thuần.
•	Là nền tảng cho các thư viện khác như Pandas, TensorFlow, scikit-learn.
•	Thực hiện các phép toán ma trận, đại số, thống kê, xử lý ảnh, v.v.
________________________________________
3. Pandas
3.1. Khái niệm tổng quan
Pandas là thư viện mạnh mẽ để phân tích và xử lý dữ liệu dạng bảng (DataFrame) — tương tự như Excel nhưng linh hoạt hơn rất nhiều.
3.2. Cách sử dụng cơ bản
Cài đặt:
pip install pandas
Ví dụ:
import pandas as pd

# Tạo DataFrame
data = {
    'Tên': ['Trang', 'Minh', 'Hà'],
    'Điểm': [8.5, 7.0, 9.0]
}
df = pd.DataFrame(data)

print(df)
print(df.describe())  # Thống kê nhanh
3.3. Ứng dụng
•	Đọc/ghi dữ liệu từ Excel, CSV, SQL, JSON.
•	Làm sạch và xử lý dữ liệu (lọc, sắp xếp, nhóm, tính trung bình).
•	Trực quan hóa dữ liệu và chuẩn bị dữ liệu đầu vào cho mô hình AI.
________________________________________
4. scikit-learn
4.1. Khái niệm tổng quan
Scikit-learn là thư viện machine learning mã nguồn mở trong Python, giúp huấn luyện và đánh giá các mô hình học máy nhanh chóng.
4.2. Cách sử dụng cơ bản
Cài đặt:
pip install scikit-learn
Ví dụ:
from sklearn.linear_model import LinearRegression
import numpy as np

# Dữ liệu mẫu
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Huấn luyện mô hình
model = LinearRegression()
model.fit(X, y)

# Dự đoán
print(model.predict([[5]]))  # → [10.]
4.3. Ứng dụng
•	Huấn luyện mô hình dự đoán, phân loại, hồi quy, gom cụm.
•	Tiền xử lý dữ liệu, chia tập train/test.
•	Đánh giá mô hình bằng độ chính xác, sai số, ma trận nhầm lẫn, v.v.
________________________________________
5. TensorFlow
5.1. Khái niệm tổng quan
TensorFlow là framework Deep Learning mạnh mẽ được phát triển bởi Google, dùng để huấn luyện và triển khai mạng nơ-ron nhân tạo (Neural Networks).
5.2. Cách sử dụng cơ bản
Cài đặt:
pip install tensorflow
Ví dụ:
import tensorflow as tf

# Tạo mô hình mạng đơn giản
model = tf.keras.Sequential([
    tf.keras.layers.Dense(10, activation='relu'),
    tf.keras.layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse')

# Giả sử có dữ liệu
import numpy as np
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

model.fit(X, y, epochs=100, verbose=0)
print(model.predict([[5]]))
5.3. Ứng dụng
•	Huấn luyện mô hình học sâu (Deep Learning) cho hình ảnh, âm thanh, ngôn ngữ tự nhiên.
•	Dự đoán dữ liệu chuỗi thời gian.
•	Tối ưu hóa các mô hình AI phức tạp với GPU/TPU.
•	Dùng trong các hệ thống thực tế như Chatbot, nhận diện khuôn mặt, dự đoán xu hướng.

