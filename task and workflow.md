นี่คือการออกแบบ **Site Map** และ **Workflow/Tasks** ที่มีความละเอียดและชัดเจน เพื่อให้นำไปป้อนคำสั่ง (Prompt) ให้กับ **Google Antigravity Agent** ทำงานได้อย่างไร้รอยต่อ

**อัปเดตล่าสุด:** 10 มีนาคม 2569

---

### 1. Detailed Site Map (แผนผังเว็บไซต์แบบละเอียด)

โครงสร้างนี้ถูกออกแบบมาเพื่อรองรับข้อมูลจากไฟล์ CSV และข้อกำหนดเพิ่มเติมเรื่อง "เครือข่ายอำเภอ" และ "คลังภูมิปัญญา"

**[Public Website - Next.js 16 Frontend]**

* **1. หน้าแรก (Home)**
  * Hero Section (ภาพลักษณ์สภาวัฒนธรรมจังหวัด)
  * Latest Provincial Activities (3 กิจกรรมล่าสุดของจังหวัด)
  * Cultural Heritage Highlights (มรดกภูมิปัญญาเด่น)
  * Quick Access: 18 Districts Map (ลิงก์ไปยังหน้าอำเภอ)


* **2. เกี่ยวกับเรา (About Us)**
  * 2.1 ทำเนียบคณะกรรมการจังหวัด (Provincial Board Members)
  * 2.2 ประวัติ วิสัยทัศน์ และพันธกิจ


* **3. กิจกรรมสภาวัฒนธรรม (Activities)**
  * 3.1 **กิจกรรมระดับจังหวัด:** แสดงผลงานภาพรวมจังหวัด
  * 3.2 **ปฏิทินกิจกรรม:** ปฏิทินงานประเพณีล่วงหน้า *(⏳ ยังไม่สร้าง)*


* **4. เครือข่ายสภาวัฒนธรรมอำเภอ (District Network)**
  * 4.1 หน้ารวม 18 อำเภอ (Grid Card แสดงชื่ออำเภอและรูปสัญลักษณ์)
  * 4.2 **หน้าเฉพาะอำเภอ (District Detail Page):**
    * ข้อมูลพื้นฐานสภาวัฒนธรรมอำเภอ
    * รายชื่อคณะกรรมการประจำอำเภอ (แยกตามตำแหน่ง)
    * กิจกรรมในระดับอำเภอ (ดึงจาก Activity Collection)


* **5. คลังมรดกภูมิปัญญา (Cultural Heritage Blog)**
  * 5.1 รายการบทความ (Blog Listing) พร้อม Sidebar กรองข้อมูล
  * 5.2 แบ่ง 3 หมวดหลัก:
    * *มรดกภูมิปัญญา / แหล่งเรียนรู้ / ปราชญ์ชาวบ้าน*
  * 5.3 ระบบ Tags (เช่น #ศิลปะการแสดง #ผ้าทอ #อาหารพื้นถิ่น)


* **6. ข่าวสารและประชาสัมพันธ์ (News & PR)**
  * 6.1 ข่าวทั่วไป / 6.2 วิดีโอสื่อวัฒนธรรม / 6.3 เอกสารดาวน์โหลด (PDF)


* **7. ติดต่อเรา (Contact)**

**[Admin System - Payload CMS Dashboard]**

* Manage: Users, BoardPositions, DistrictBoardPositions, ProvincialBoard, Districts, DistrictMembers, Activities, HeritageBlog, Tags, News, Media.

---

### 2. Project Workflow (ขั้นตอนการพัฒนา)

กระบวนการนี้แบ่งเป็น 4 ระยะหลัก (Milestones):

1. **Phase 1: Environment & Infra (Infrastructure setup)** ✅ 100%
2. **Phase 2: Data Schema & CMS (The Backbone)** ✅ 100%
3. **Phase 3: Frontend & Theme (The Interface)** ✅ 94% — *(ขาด Activity Calendar)*
4. **Phase 4: Logic & Content Integration (The Engine)** 🟡 30% — เริ่มเชื่อมต่อบางส่วนแล้ว

---

### 3. Task List สำหรับ Google Antigravity Agent

#### **Task 1: Project Initialization & Docker** ✅ (Completed)

> **สิ่งที่ทำสำเร็จ:**
> - Next.js + Payload CMS + MongoDB ผ่าน Docker Compose
> - Tailwind CSS 4.1 + daisyUI 5.5 Theme "Modern Lanna"
> - Dockerfile multi-stage (dev + prod)

#### **Task 2: Define Content Collections (Schema)** ✅ (Completed)

> **Collections ทั้งหมด (11 collections):**
> 1. `Users` — ผู้ดูแลระบบ
> 2. `BoardPositions` — ตำแหน่งคณะกรรมการจังหวัด (Relationship)
> 3. `DistrictBoardPositions` — ตำแหน่งกรรมการอำเภอ (Relationship)
> 4. `ProvincialBoard` — คณะกรรมการจังหวัด (→ BoardPositions)
> 5. `Districts` — 18 อำเภอเชียงราย (พร้อมพิกัด lat/lng)
> 6. `DistrictMembers` — กรรมการอำเภอ (→ Districts, → DistrictBoardPositions)
> 7. `Activities` — กิจกรรม (→ Districts)
> 8. `HeritageBlog` — คลังมรดกภูมิปัญญา (→ Tags, → Districts)
> 9. `Tags` — แท็กจัดหมวดหมู่
> 10. `News` — ข่าวสาร
> 11. `Media` — ไฟล์สื่อ

#### **Task 3: Layout & Theme Design** ✅ (Completed)

> **สิ่งที่ทำสำเร็จ:**
> - globals.css ธีม Modern Lanna (สีคราม, สีทอง, สีแดงชาด)
> - Font: Prompt + Charmonman + Noto Serif Thai (ผ่าน `next/font/google`)
> - Navbar + Footer Components
> - Custom Admin Logo & Icon

#### **Task 4: All Frontend Pages (UI Only)** ✅ (Completed)

> **สร้างครบ 10/11 หน้า:**
> - ✅ Home, About, Board, Activities, Districts Grid
> - ✅ District Detail (`/districts/[slug]`), Heritage Blog, Heritage Article (`/heritage/[slug]`)
> - ✅ News, Contact
> - ❌ ขาดเฉพาะ Activity Calendar

#### **Task 5: Admin Dashboard Setup** ✅ (Completed)

> **สิ่งที่ทำสำเร็จ:**
> - ✅ Payload Admin accessible at `/admin`
> - ✅ Route groups: `(frontend)` + `(payload)` แยก layout ชัดเจน
> - ✅ importMap.js พร้อม Lexical RichText Editor components
> - ✅ Custom Logo & Icon components
> - ✅ Seeded ข้อมูล 18 อำเภอ (พร้อมพิกัด lat/lng)
> - ✅ BoardPositions + DistrictBoardPositions collections (Relationship)

#### **Task 6: API Integration & Content Import** 🟡 (In Progress — 30%)

> **สิ่งที่เสร็จแล้ว:**
> 1. ✅ สร้าง `src/lib/payload.ts` — API client utility (cached)
> 2. ✅ Import ข้อมูล 18 อำเภอ (พร้อมพิกัด)
>
> **สิ่งที่ยังเหลือ:**
> 3. ❌ เปลี่ยน Mock Data ทุกหน้าเป็นการ fetch จาก Payload CMS
> 4. ❌ สร้างระบบ Filter/Pagination สำหรับ Heritage Blog
> 5. ❌ Import ข้อมูลจริง: กรรมการ, กิจกรรมตัวอย่าง, บทความตัวอย่าง
> 6. ❌ สร้างหน้า Activity Calendar (`/activities/calendar`)

#### **Task 7: Performance & Optimization** 🟡 (In Progress — 50%)

> **สิ่งที่เสร็จแล้ว:**
> - ✅ Font loading ผ่าน `next/font/google` (ลด render-blocking)
> - ✅ `reactStrictMode: true`
> - ✅ `optimizePackageImports` ใน next.config.ts
> - ✅ .dockerignore optimized (ลดขนาด build context)
> - ✅ Cleanup ไฟล์ขยะ (parsed.txt, output.txt, seed scripts)
>
> **สิ่งที่ยังเหลือ:**
> - ❌ Dynamic imports สำหรับ heavy components
> - ❌ Image optimization (next/image integration)
> - ❌ Lighthouse audit

#### **Task 8 (Bonus): Production Readiness** ⏳ (Future)

> - เตรียม NEXT_PUBLIC_SERVER_URL สำหรับ production domain
> - เพิ่ม remote image domains ใน next.config.ts
> - Setup health check
> - Optimize Docker image size

---

### 4. สรุปความสัมพันธ์ข้อมูล (Relationship Map)

```
BoardPositions ←── ProvincialBoard.position
DistrictBoardPositions ←── DistrictMembers.position
Districts ←── DistrictMembers.district
Districts ←── Activities.district (optional)
Districts ←── HeritageBlog.relatedDistrict (optional)
Tags ←── HeritageBlog.tags (N:N)
Media ←── ProvincialBoard.image, Districts.image/coverImage, etc.
```

---

### 5. สถานะปัจจุบันของ Source Code

| หมวด | จำนวน | สถานะ |
|------|-------|-------|
| Collections | 11 ไฟล์ | ✅ ครบ (เพิ่ม BoardPositions + DistrictBoardPositions) |
| Components | 4 (Navbar, Footer, Admin Logo, Admin Icon) | ✅ ครบ |
| Pages | 10/11 | ⚠️ ขาด Calendar |
| API Integration | 1 utility file | 🟡 มี payload.ts แต่ยังไม่ wired ทุกหน้า |
| Admin Dashboard | Accessible | ✅ พร้อมใช้งาน |
| Data Seeded | 18 อำเภอ | ✅ พร้อมพิกัด |

**TODO ใน Source Code:**
- `src/app/(frontend)/districts/[slug]/page.tsx` → ยัง fetch จาก Mock Data
- `src/app/(frontend)/heritage/[slug]/page.tsx` → ยัง fetch จาก Mock Data
- ทุกหน้า Frontend ยังใช้ Mock Data → ต้องเปลี่ยนเป็น Payload API

**ภาพรวมความคืบหน้า: ~65%** (46/70 tasks)
