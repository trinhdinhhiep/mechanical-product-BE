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
