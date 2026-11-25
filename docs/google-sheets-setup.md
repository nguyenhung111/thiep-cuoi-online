# Hướng Dẫn Kết Nối Google Sheets (Sổ Lưu Bút & RSVP)

Chỉ mất khoảng **2 phút** thiết lập 1 lần duy nhất. Sau khi hoàn tất:
- Mọi lời chúc của khách mời sẽ được lưu vào tab **`Guestbook`** và **hiển thị chung cho tất cả mọi người xem**.
- Mọi xác nhận tham dự sẽ được lưu vào tab **`RSVP`** để hai vợ chồng dễ dàng theo dõi, lọc và đếm số khách.
- Bạn có thể mở Google Sheet xóa bất kỳ dòng lời chúc test/spam nào — trang web sẽ tự cập nhật theo.

---

## Bước 1: Tạo Google Sheet & Dán Apps Script
1. Tạo một file **Google Sheets** mới (ví dụ đặt tên: `Thiệp Cưới - Lời Chúc & RSVP`).
2. Trên thanh menu, chọn **Tiện ích mở rộng (Extensions) → Apps Script**.
3. Xóa hết code mặc định trong file `Code.gs` và dán toàn bộ đoạn code sau vào:

```javascript
function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const gbSheet = getOrCreateSheet(ss, 'Guestbook', ['Thời gian', 'Họ và tên', 'Phe', 'Lời chúc']);
  const rows = gbSheet.getDataRange().getValues();
  const guestbook = [];

  // Bỏ qua dòng tiêu đề (index 0), đọc ngược từ mới nhất lên đầu
  for (let i = rows.length - 1; i >= 1; i--) {
    const [, name, sideLabel, message] = rows[i];
    if (!name || !message) continue;
    guestbook.push({
      name: String(name),
      side: String(sideLabel).includes('gái') ? 'nha_gai' : 'nha_trai',
      message: String(message),
    });
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, guestbook: guestbook })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents || '{}');
  const now = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');

  if (data.type === 'rsvp') {
    const rsvpSheet = getOrCreateSheet(ss, 'RSVP', ['Thời gian', 'Họ và tên', 'Tham dự']);
    rsvpSheet.appendRow([
      now,
      String(data.name || '').trim(),
      data.attending ? 'Sẽ đến' : 'Tiếc, không đến',
    ]);
  } else {
    const gbSheet = getOrCreateSheet(ss, 'Guestbook', ['Thời gian', 'Họ và tên', 'Phe', 'Lời chúc']);
    gbSheet.appendRow([
      now,
      String(data.name || '').trim(),
      data.side === 'nha_gai' ? 'Nhà gái' : 'Nhà trai',
      String(data.message || '').trim(),
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Bấm **Lưu (Ctrl+S / Cmd+S)**.

---

## Bước 2: Deploy thành Web App
1. Bấm nút **Triển khai (Deploy) → Triển khai mới (New deployment)**.
2. Ở biểu tượng bánh răng bên cạnh *Chọn loại*, chọn **Ứng dụng web (Web app)**.
3. Điền cấu hình:
   - **Thực thi dưới danh nghĩa (Execute as)**: **Tôi (Me)**
   - **Người có quyền truy cập (Who has access)**: **Bất kỳ ai (Anyone)**
4. Bấm **Triển khai (Deploy)** → Cấp quyền truy cập Google Sheet (nếu hiện cảnh báo *"Google hasn't verified this app"*, bấm **Advanced → Go to ... (unsafe) → Allow**).
5. Copy đường link **URL ứng dụng web** (có dạng `https://script.google.com/macros/s/.../exec`).

---

## Bước 3: Dán link vào `config.js` & Push lên GitHub
1. Mở file `config.js`, dán link vừa copy vào dòng:
   ```js
   googleSheetApiUrl: 'https://script.google.com/macros/s/.../exec',
   ```
2. Lưu file và push lên GitHub:
   ```zsh
   cd ~/Desktop/thiep-cuoi-online
   git add config.js && git commit -m "chore: connect Google Sheets for guestbook and RSVP" && git push
   ```
3. Vercel sẽ tự động cập nhật lại `https://trang-hung-thiep-cuoi.vercel.app` sau vài giây!
