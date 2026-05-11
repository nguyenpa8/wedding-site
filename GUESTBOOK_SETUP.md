# Hướng dẫn cài đặt Guestbook với Google Sheets

## ✅ Đã hoàn thành

- ✅ Tạo Google Apps Script code
- ✅ Cập nhật Guestbook component với:
  - Loading state khi submit
  - Success/error messages
  - Disable button khi đang gửi
  - Lưu data vào Google Sheets
  - Giữ nguyên UI hiện tại

## 🚀 Các bước setup

### Bước 1: Tạo Google Sheet

1. Truy cập https://sheets.google.com
2. Tạo spreadsheet mới
3. Đặt tên: "Wedding Guestbook"
4. Tạo header row (dòng đầu):
   - **A1**: `Timestamp`
   - **B1**: `Name`
   - **C1**: `Message`

### Bước 2: Deploy Google Apps Script

1. Trong Google Sheet, vào **Extensions** → **Apps Script**
2. Xóa code mặc định
3. Copy toàn bộ code từ `google-apps-script/Code.gs`
4. Paste vào Apps Script editor
5. Click **Save** (Ctrl+S)
6. Click **Deploy** → **New deployment**
7. Click icon ⚙️ bên cạnh "Select type"
8. Chọn **Web app**
9. Cấu hình:
   - **Description**: Wedding Guestbook API
   - **Execute as**: Me
   - **Who has access**: **Anyone**
10. Click **Deploy**
11. Authorize app (cho phép quyền truy cập)
12. **Copy deployment URL** (dạng: `https://script.google.com/macros/s/AKfy...../exec`)

### Bước 3: Cập nhật Frontend

1. Mở file `src/components/Guestbook.jsx`
2. Tìm dòng 5:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_DEPLOYMENT_URL_HERE';
   ```
3. Thay `YOUR_DEPLOYMENT_URL_HERE` bằng URL deployment từ bước 2

### Bước 4: Test

1. Chạy dev server:
   ```bash
   npm run dev
   ```
2. Mở browser và navigate đến section Guestbook
3. Điền form và click "Gửi Lời Chúc"
4. Kiểm tra:
   - ✅ Button hiển thị "Đang gửi..." với spinner
   - ✅ Success message xuất hiện
   - ✅ Form được clear
   - ✅ Data xuất hiện trong Google Sheet

## 📝 Features đã implement

### UI States
- **Loading**: Spinner animation + text "Đang gửi..."
- **Success**: Green message "Cảm ơn lời chúc của bạn! ❤️"
- **Error**: Red message với thông báo lỗi
- **Disabled**: Button bị disable khi đang submit

### Data Flow
1. User điền form (name + message)
2. Click submit → validation
3. POST request đến Google Apps Script
4. Apps Script lưu vào Google Sheets
5. Frontend hiển thị success message
6. Form được reset

### Error Handling
- Validation: Kiểm tra name và message không rỗng
- Network errors: Catch và hiển thị error message
- Auto-hide success message sau 5 giây

## 🔧 Troubleshooting

### CORS Error
- Sử dụng `mode: 'no-cors'` trong fetch (đã implement)
- Đảm bảo deploy với "Who has access: Anyone"

### Data không lưu
1. Kiểm tra Console log trong browser
2. Verify URL deployment chính xác
3. Test Apps Script bằng cách chạy function `doPost` manually

### Authorization Error
- Chạy lại authorization flow
- Đảm bảo Google account có quyền edit Sheet

## 📊 Google Sheet Structure

| Timestamp | Name | Message |
|-----------|------|---------|
| 2025-05-11 23:00:00 | Nguyễn Văn A | Chúc mừng hạnh phúc! |
| 2025-05-11 22:55:00 | Trần Thị B | Trăm năm hạnh phúc! |

## 🎯 Next Steps (Optional)

### Load existing messages
Nếu muốn load lời chúc từ Google Sheets khi trang load:

```javascript
useEffect(() => {
  const loadWishes = async () => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      if (data.success) {
        setWishes(data.entries);
      }
    } catch (error) {
      console.error('Error loading wishes:', error);
    }
  };
  loadWishes();
}, []);
```

### Rate limiting
Thêm rate limiting để tránh spam trong Apps Script.

### Moderation
Thêm admin panel để duyệt/xóa messages không phù hợp.
