# 獵才顧問官網

Next.js 14 App Router · PostgreSQL (Neon) · AWS S3 · NextAuth v5

## 快速開始

### 1. 安裝套件
```bash
npm install
```

### 2. 設定環境變數
```bash
cp .env.example .env.local
# 填入 DATABASE_URL, AUTH_SECRET, S3_*, RESEND_API_KEY, NOTIFY_EMAIL
```

### 3. 推送資料庫 Schema
```bash
npm run db:push
```

### 4. 建立管理員帳號
```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=strong-password npm run seed:admin
```

### 5. 啟動
```bash
npm run dev
```

## 安全重點
- 履歷下載：15 分鐘 Signed URL，S3 bucket 設為 Private
- 後台：middleware + API 雙層驗證，未登入導向 /admin/login
- 密碼：bcrypt hash (cost 12)
- 表單：Zod 驗證 + Drizzle prepared statements

## 指令
```bash
npm run dev          # 開發
npm run build        # 建置
npm run db:push      # 推送 schema
npm run db:studio    # 瀏覽資料
npm run seed:admin   # 建立管理員
```
