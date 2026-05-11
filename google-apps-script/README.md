# Google Apps Script Setup for Guestbook

## Hướng dẫn cài đặt

### 1. Tạo Google Sheet
1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một spreadsheet mới
3. Đặt tên cho sheet (ví dụ: "Wedding Guestbook")
4. Tạo header row (dòng đầu tiên):
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Message`

### 2. Cài đặt Apps Script
1. Trong Google Sheet, vào **Extensions** > **Apps Script**
2. Xóa code mặc định
3. Copy toàn bộ nội dung từ file `Code.gs` và paste vào
4. Đặt tên cho project (ví dụ: "Wedding Guestbook API")
5. Click **Save** (icon đĩa mềm)

### 3. Deploy Web App
1. Click nút **Deploy** > **New deployment**
2. Click icon **⚙️ Settings** bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: Wedding Guestbook API
   - **Execute as**: Me (email của bạn)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Authorize ứng dụng (cho phép quyền truy cập)
7. **Copy URL deployment** (dạng: `https://script.google.com/macros/s/.../exec`)

### 4. Cập nhật Frontend
1. Mở file `src/components/Guestbook.jsx`
2. Tìm dòng:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_DEPLOYMENT_URL_HERE';
   ```
3. Thay `YOUR_DEPLOYMENT_URL_HERE` bằng URL deployment vừa copy

### 5. Test
1. Chạy wedding site
2. Điền form guestbook và submit
3. Kiểm tra Google Sheet - data sẽ được thêm vào

## Troubleshooting

### Lỗi CORS
- Đảm bảo deploy với "Who has access: Anyone"
- Redeploy nếu cần

### Lỗi Authorization
- Chạy lại authorization flow
- Đảm bảo Google account có quyền truy cập Sheet

### Data không lưu
- Kiểm tra Console log trong browser
- Verify URL deployment đúng
- Kiểm tra format JSON gửi đi

## Optional: Load existing messages
Nếu muốn load lời chúc đã có từ Google Sheets khi trang load, uncomment phần code fetch GET trong `Guestbook.jsx`.
