# CR-Culture Production Deployment Guide

เอกสารแนะนำและคู่มือการเตรียมข้อมูลสำหรับนำเว็บไซต์ **สภาวัฒนธรรมจังหวัดเชียงราย (CR-Culture)** ขึ้นใช้งานบนสภาพแวดล้อม Production (Vercel / Node.js Server / Docker)

---

## 1. ข้อมูลการตั้งค่า Environment Variables (`.env.production`)

เมื่อทำการ Deploy ขึ้น Server หรือ Cloud Provider (เช่น Vercel, Railway, DigitalOcean, VPS) ให้ตั้งค่าตัวแปรสภาพแวดล้อมดังนี้:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `NODE_ENV` | กำหนดโหมดการทำงานเป็น Production | `production` |
| `DATABASE_URI` | URL เชื่อมต่อ MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/crculture?retryWrites=true&w=majority` |
| `PAYLOAD_SECRET` | คีย์ลับสำหรับสร้าง JWT & Session (เปลี่ยนรหัสสุ่มอย่างปลอดภัย) | `generate-a-random-secret-key-min-32-chars` |
| `NEXT_PUBLIC_SERVER_URL` | โดเมนหลักของเว็บไซต์ (URL หน้าแรก) | `https://crculture.go.th` (หรือ URL ของ Vercel) |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | Script URL สำหรับสถิติเข้าชมเว็บไซต์ (Optional) | `https://cloud.umami.is/script.js` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Website ID สำหรับสถิติเข้าชมเว็บไซต์ (Optional) | `1c0838f4-0928-489c-b74c-3bbe598f2bf7` |

---

## 2. รูปแบบการ Deploy (Deployment Options)

### รูปแบบที่ 1: Vercel / Cloud Platform (แนะนำสำหรับ Next.js 16)
1. เชื่อมต่อ Git Repository เข้ากับ **Vercel**
2. ตั้งค่า **Environment Variables** ในแผงควบคุม Vercel ตามตารางด้านบน
3. ตั้งค่า Build Settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. เมื่อกระบวนการ Deploy เสร็จสิ้น ให้เรียกเปิด URL เพื่อลงข้อมูลเริ่มต้น:
   ```bash
   curl -s https://<your-domain>/api/seed
   ```

---

### รูปแบบที่ 2: Docker / Container (Self-Hosted Server / VPS)
หากต้องการรันผ่าน Docker Desktop หรือ VPS Server ด้วย Docker Compose:

1. **เปิดใช้งานระบบในโหมด Production**:
   ```bash
   docker compose --profile prod up -d --build
   ```
2. **ระบบจะรัน 2 Container**:
   - `crculture_mongodb`: MongoDB Server (Port 27017)
   - `crculture_app_prod`: Production App (Port 3001)

---

## 3. คำสั่งสำหรับการลงข้อมูลและตรวจสอบความพร้อม (Post-Deploy Checks)

### 3.1 ลงข้อมูลเริ่มต้นอัตโนมัติ (Database Seeding)
หลังจากการ Deploy ครั้งแรก ให้เรียกใช้ Endpoint เพื่อลงข้อมูล 18 อำเภอ, 8 องค์กรภาคี, รางวัลเกียรติยศ และโครงสร้างคณะกรรมการ:
```bash
# เรียกใช้ API Seed
curl -s https://<your-domain>/api/seed
```
*ผลลัพธ์ที่คาดหวัง*: `{"success": true, "message": "Database seeded successfully"}`

---

### 3.2 ตรวจสอบสถานะความสมบูรณ์ของระบบ (Health Checks)
```bash
# ตรวจสอบ Health Check API
curl -s https://<your-domain>/api/health
```
*ผลลัพธ์ที่คาดหวัง*: `{"status": "ok", "timestamp": "...", "environment": "production"}`

---

## 4. หน้าระบบหลักที่ต้องทดสอบหลัง Deploy (Verification Checklist)

- [ ] **หน้าแรก**: `https://<your-domain>/` (เรนเดอร์ Banner, เครือข่าย 18 อำเภอ)
- [ ] **เมนูปรับปรุงใหม่**: `https://<your-domain>/cultural-networks/districts` (หน้ารวม 18 อำเภอ + Bottom Minimap)
- [ ] **เครือข่ายองค์กรภาคี**: `https://<your-domain>/cultural-networks/partners` (หน้ารวม 8 องค์กรภาคี)
- [ ] **ทำเนียบกรรมการจังหวัด**: `https://<your-domain>/about/board` (ดึงประธานอำเภอ + ประธานภาคีอัตโนมัติ)
- [ ] **ข่าวสาร/กิจกรรม**: `https://<your-domain>/news` และ `https://<your-domain>/activities`
- [ ] **Payload CMS Admin Panel**: `https://<your-domain>/admin` (เข้าสู่ระบบจัดการข้อมูล)
