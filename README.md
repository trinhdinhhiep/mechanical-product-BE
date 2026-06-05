# 🚀 Express API

REST API được xây dựng với **Express.js + TypeScript + Prisma + MySQL**.

---

## 📦 Tech Stack

- **Runtime**: Node.js v16.17.1
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma v5
- **Database**: MySQL
- **Auth**: JWT _(coming soon)_

---

## 📁 Cấu trúc dự án

```
src/
├──node_modules => generated, modules nằm trong node_module
├── app.ts                       # Khởi tạo Express app
└── server.ts                    # Entry point
prisma/
├── schema.prisma                # Database schema
└── seed.ts                      # seed DB
```

---

## ⚙️ Yêu cầu

- Node.js <= 16.17.1
- Prisma v5
- MySQL >= 8.0

---

## 🗃️ Kiểm tra MySQL

**Kiểm tra MySQL đang chạy chưa** (chạy CMD với quyền Admin):

```cmd
sc query mysql80
```

- `STATE: 4 RUNNING` → MySQL đang chạy ✅
- `STATE: 1 STOPPED` → MySQL chưa chạy ❌

**Khởi động MySQL nếu chưa chạy:**

```cmd
net start mysql80
```

---

## 🛠️ Cài đặt

**1. Clone dự án**

```bash
git clone <your-repo-url>
cd <project-name>
```

**2. Cài dependencies**

```bash
npm install
```

**3. Tạo file `.env`**

```bash
cp .env.example .env
```

Cập nhật thông tin database trong `.env`:

```env
DATABASE_URL=mysql://root:your_password@127.0.0.1:3306/mydb
PORT=3000
```

**4. Tạo database `mydb`** trong TablePlus hoặc chạy SQL:

```sql
CREATE DATABASE mydb;
```

**5. Generate Prisma Client**

```bash
npx prisma generate
```

**6. Tạo bảng trong database**

```bash
npm run db:push
```

**7. Nếu muốn seed data thì dùng lệnh**

```bash
npm run db:seed
```

---

## 🚀 Chạy dự án

**Development**

```bash
npm run dev
```

**Production**

```bash
npm run build
npm start
```

---

## 🔄 Thêm/Sửa Table

**Bước 1 — Sửa `prisma/schema.prisma`**, thêm model mới:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
}
```

**Bước 2 — Chạy:**

```bash
npm run db:push
```

Lệnh này tự động sync schema lên database và generate lại Prisma Client.

> ⚠️ Mỗi lần thay đổi schema đều phải chạy `npm run db:push`.

---

## 📡 API Endpoints

| Method | Endpoint     | Description         | Auth |
| ------ | ------------ | ------------------- | ---- |
| GET    | `/api/items` | Lấy danh sách items | ❌   |

> Sẽ bổ sung thêm Auth và các endpoints khác.

---

## 🗄️ Database Schema

```prisma
model Item {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
}
```

---

## 📝 Scripts

| Script            | Mô tả                                             |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Chạy development server với hot-reload            |
| `npm run build`   | Build TypeScript sang JavaScript                  |
| `npm start`       | Chạy production server                            |
| `npm run db:push` | Sync schema lên database + generate Prisma Client |

Định nghĩa `db:push` trong `package.json`:

```json
"db:push": "prisma db push --url=\"mysql://root:your_password@127.0.0.1:3306/mydb\" && npx prisma generate"
```

---

## 🚢 Deploy lên cPanel

**1. Cài đặt package và Build project**

```bash
npm install
npm run build
```

**2. Upload lên cPanel**

- dist
- prisma
- env
- package-lock.json
- package.json
- node_modules

**3. Trong cPanel → Setup Node.js App**

- Node.js version: <16.17.1
- prisma v5
- Application startup file: `dist/server.js`

**4. export dumb DB từ local sau đó import vào DB của cpanel**

- Click chuột phải vào database → Tools → Dump Database
- Chắc chắn tick vào:

✅ Add DROP statements
✅ Disable keys
✅ Extended inserts

- Export file .sql
- Import lên phpMyAdmin

**5. Start app**

# Google Sheets Setup — Contact Form Integration

## Tổng quan

Khi khách hàng submit form liên hệ:

1. Dữ liệu được lưu vào **Database** (Prisma) ngay lập tức
2. Sau mỗi **5 giây**, các rows đang chờ trong queue sẽ được **batch ghi** lên Google Sheet 1 lần duy nhất (tránh lỗi `429: Too many requests`)

---

## 1. Tạo Google Cloud Project & Service Account

1. Truy cập [Google Cloud Console](https://console.cloud.google.com)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **APIs & Services → Library** → tìm **Google Sheets API** → Enable
4. Vào **APIs & Services → Credentials** → Create Credentials → **Service Account**
5. Đặt tên Service Account → Create and Continue → Done
6. Click vào Service Account vừa tạo → tab **Keys** → Add Key → Create new key → chọn **JSON** → Download

---

## 2. Lấy thông tin từ file JSON key

Mở file JSON vừa download, lấy 2 giá trị:

```json
{
  "client_email": "your-service-account@project.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nABC...\n-----END PRIVATE KEY-----\n"
}
```

---

## 3. Tạo Google Sheet & cấp quyền

1. Tạo Google Sheet mới
2. Tạo header row ở hàng đầu tiên:

| A    | B     | C     | D     | E          |
| ---- | ----- | ----- | ----- | ---------- |
| Name | Email | Phone | Notes | Created At |

3. Lấy **Spreadsheet ID** từ URL:

```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

4. Click **Share** → dán `client_email` ở bước 2 vào → chọn quyền **Editor** → Send

---

## 4. Cấu hình `.env`

```env
GOOGLE_SHEET_ID="your_spreadsheet_id"
GOOGLE_SHEET_NAME="Contacts"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC...\n-----END PRIVATE KEY-----\n"
```

> ⚠️ `GOOGLE_PRIVATE_KEY` phải có dấu nháy kép `"..."` bao ngoài và giữ nguyên các ký tự `\n`

---

## 5. Auto Refresh Google Sheet (Apps Script)

Google Sheet không tự reload khi có dữ liệu mới. Để tự động refresh mỗi 1 phút:

1. Mở Google Sheet → **Extensions → Apps Script**
2. Dán code sau:

```js
function autoRefresh() {
  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange('A1').getValue();
}

function startAutoRefresh() {
  // Xóa trigger cũ nếu có
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  // Set refresh mỗi 1 phút
  ScriptApp.newTrigger('autoRefresh').timeBased().everyMinutes(1).create();
}
```

3. Chạy hàm `startAutoRefresh` một lần → Sheet sẽ tự refresh mỗi 1 phút

---

## 6. Lưu ý

- **Đồng hồ server phải chính xác** — Google JWT yêu cầu thời gian lệch không quá 5 phút. Nếu gặp lỗi `invalid_grant`, sync lại đồng hồ:
  - Windows: `Settings → Time & Language → Date & Time → Sync now`
  - Mac: `System Settings → General → Date & Time → Set automatically`
  - Linux: `sudo timedatectl set-ntp true`

- Dữ liệu luôn được **lưu DB trước** — nếu Google Sheets API lỗi, data không bị mất và sẽ được retry ở batch tiếp theo

- Batch interval mặc định là **5 giây**, có thể chỉnh hằng số `BATCH_INTERVAL_MS` trong `contact.service.ts`
