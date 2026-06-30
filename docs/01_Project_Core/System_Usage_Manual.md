# System Usage Manual

## Purpose
คู่มือนี้เป็นคู่มือการใช้งานระบบ CR-Culture สำหรับทีมดูแลระบบและผู้ดูแลเนื้อหา โดยเน้นการใช้งานจริงของเว็บไซต์ฝั่ง public และฝั่งหลังบ้าน Payload CMS

คู่มือนี้ไม่ใช่คู่มือเชิงพัฒนาระบบโดยละเอียด หากต้องแก้โค้ดหรือโครงสร้างข้อมูล ให้เปิดเอกสาร canonical อื่นใน `docs/` เพิ่มเติม

## Quick Start
### สิ่งที่ต้องมี
- Node.js 20 ขึ้นไป
- npm 10 ขึ้นไป
- Docker Desktop ถ้าต้องการรัน MongoDB ผ่าน Docker

### เริ่มระบบแบบ local
1. ติดตั้ง dependency
   ```bash
   npm install
   ```
2. ตั้งค่าไฟล์แวดล้อมโดยคัดลอกจาก `.env.example` เป็น `.env`
3. ถ้าต้องการฐานข้อมูลผ่าน Docker ให้รัน
   ```bash
   docker compose up -d
   ```
4. เริ่มระบบ
   ```bash
   npm run dev
   ```
5. เปิดเว็บไซต์ที่ `http://localhost:3000`
6. เปิดหลังบ้านที่ `http://localhost:3000/admin`

### จุดเข้าใช้งานหลัก
- เว็บไซต์สาธารณะ: `http://localhost:3000`
- หลังบ้าน Payload CMS: `http://localhost:3000/admin`
- ตรวจสุขภาพระบบ: `http://localhost:3000/api/health`
- seed ข้อมูลตัวอย่าง: `http://localhost:3000/api/seed`

## Frontend Operations
### โครงหน้าสาธารณะหลัก
- `/` หน้าแรก แสดงภาพรวมเว็บไซต์, ข่าวสารล่าสุด, กิจกรรมเด่น, ทางลัดไปยังหมวดสำคัญ
- `/about` ข้อมูลองค์กร
- `/about/board` รายชื่อคณะกรรมการจังหวัด
- `/activities` รายการกิจกรรม
- `/activities/calendar` ปฏิทินกิจกรรม
- `/activities/[slug]` หน้ารายละเอียดกิจกรรม
- `/districts` เครือข่ายอำเภอ พร้อมแผนที่ interactive
- `/districts/[slug]` รายละเอียดอำเภอ
- `/heritage` คลังมรดกภูมิปัญญา พร้อมตัวกรองและการค้นหา
- `/heritage/[slug]` รายละเอียดบทความมรดกภูมิปัญญา
- `/news` ข่าวสารและประชาสัมพันธ์
- `/news/[slug]` รายละเอียดข่าว
- `/awards/khon-dee` ทำเนียบรางวัลคนดีศรีเชียงราย
- `/awards/youth-culture` ทำเนียบเยาวชนวัฒนธรรม
- `/awards/wisdom-awards` ทำเนียบครูภูมิปัญญาเมืองเชียงราย
- `/contact` หน้าติดต่อ
- `/privacy` นโยบายความเป็นส่วนตัว
- `/terms` ข้อกำหนดการใช้งาน

### หน้า public ใช้ทำอะไร
- หน้าแรก เหมาะสำหรับตรวจภาพรวมว่าข้อมูลล่าสุดจากหลายหมวดแสดงครบ
- หน้า `activities`, `heritage`, `news` ใช้ตรวจว่ารายการที่เผยแพร่ใหม่ปรากฏบนหน้ารวม
- หน้า `districts` ใช้ตรวจข้อมูลอำเภอ, ภาพ, และตำแหน่งบนแผนที่
- หน้า awards ใช้ตรวจข้อมูลรางวัลที่แยกตามโมดูล

### วิธีตรวจหน้า public หลังแก้ content
1. บันทึกข้อมูลในหลังบ้าน
2. เปิดหน้ารวมของหมวดนั้นก่อน เช่น `/activities`, `/heritage`, `/news`, `/districts`
3. ตรวจว่ารายการใหม่หรือรายการที่แก้ไขแสดงผลตามคาด
4. คลิกเข้าหน้ารายละเอียดเพื่อตรวจ slug, รูปภาพ, วันที่, และข้อความ
5. ถ้าเป็นหน้า hero หรือข้อมูล global ให้ตรวจทั้ง desktop และ mobile

### จุดที่ควรเช็กเป็นประจำ
- ภาพ hero ของหน้าหลักไม่หายและสัดส่วนยังเหมาะสม
- slug ของกิจกรรม, ข่าว, บทความ, และอำเภอเปิดหน้าได้จริง
- หน้า `/heritage` ยังใช้งาน filter และ search ได้
- หน้า `/districts` ยังแสดงแผนที่และลิงก์ไปหน้าอำเภอได้
- หน้า awards ทั้ง 3 หมวดยังแสดงข้อมูลถูกต้อง

## Backend / CMS Operations
### เข้าใช้งานหลังบ้าน
1. เปิด `/admin`
2. เข้าสู่ระบบด้วยบัญชีใน collection `users`
3. เมนูหลักในหลังบ้านจะประกอบด้วย collections และ globals ที่ใช้ดูแลเนื้อหาเว็บไซต์

### กลุ่มข้อมูลสำคัญใน CMS
#### เนื้อหาหลัก
- `provincial-board` ข้อมูลคณะกรรมการจังหวัด
- `districts` ข้อมูลอำเภอ
- `district-members` กรรมการระดับอำเภอ
- `activities` กิจกรรม
- `heritage-blog` บทความมรดกภูมิปัญญา
- `news` ข่าวสาร
- `media` ไฟล์ภาพ, PDF, และวิดีโอบางประเภท

#### ข้อมูลอ้างอิง
- `board-positions`
- `district-board-positions`
- `tags`
- `award-years`
- `award-categories`
- `youth-award-categories`
- `wisdom-categories`
- `prefixes`
- `institutions`
- `awardees`

#### โมดูลรางวัล
- `khon-dee-awards`
- `youth-award-histories`
- `award-galleries`
- `wisdom-awards`

### Globals ที่ต้องรู้
- `about-page` จัดการข้อมูลหน้าเกี่ยวกับเรา
- `page-heroes` จัดการ hero ของหน้าหลักและหน้ารวมหลายหมวด
- `site-settings` ตั้งค่าระบบระดับเว็บไซต์ เช่น theme เริ่มต้น
- `analytics-report` หน้าดูรายงานสถิติจาก Umami สำหรับผู้ใช้ role `admin`

### วิธีเพิ่มหรือแก้ข้อมูลใน collection สำคัญ
#### กิจกรรม
1. เข้า `activities`
2. กรอก `title`, `slug`, `date`
3. เลือกระดับ `level`
4. ถ้าเป็นกิจกรรมระดับอำเภอ ให้เลือก `district`
5. ใส่ `summary`, `content`, `coverImage` และแกลเลอรีถ้าต้องการ
6. เปิด `isPublished` ถ้าต้องการให้หน้า public เห็นรายการนี้

#### มรดกภูมิปัญญา
1. เข้า `heritage-blog`
2. กรอก `title`, `slug`, `category`
3. ใส่ `content`, `excerpt`, `coverImage`
4. ผูก `tags` และ `relatedDistrict` ถ้ามี
5. เปิด `isPublished` เมื่อต้องการเผยแพร่

#### ข่าว
1. เข้า `news`
2. กรอก `title`, `slug`, `publishedAt`
3. เลือก `type`
4. ถ้าเป็นข่าวทั่วไป ให้ใส่ `content`
5. ถ้าเป็นวิดีโอ ให้ใส่ `videoUrl`
6. ถ้าเป็นเอกสาร ให้แนบ `document`
7. เปิด `isPublished` เมื่อต้องการเผยแพร่

#### อำเภอ
1. เข้า `districts`
2. กรอก `name`, `slug`
3. ใส่ข้อมูลภาพ, คำอธิบาย, และข้อมูลติดต่อ
4. ใส่ `latitude` และ `longitude` เพื่อให้แผนที่แสดงตำแหน่งถูกต้อง
5. ใช้ `order` เพื่อจัดลำดับการแสดงผล

### วิธีแก้ hero และข้อมูล global
#### Hero ของหน้ารวม
1. เข้า `page-heroes`
2. เลือกกลุ่มหน้าที่ต้องการ เช่น `home`, `activities`, `news`, `heritage`, `districts`, `khonDee`, `youthCulture`, `wisdomAwards`
3. แก้ `eyebrow`, `title`, `subtitle`, และ `heroImage`
4. บันทึกแล้วตรวจหน้า public ที่เกี่ยวข้อง

หมายเหตุ:
- ระบบมี hook ลบรูป hero เก่าที่ถูกแทนที่ในบางกรณี จึงควรตรวจหน้า public หลังอัปเดตรูปทุกครั้ง

#### About Page
- เข้า `about-page` เพื่อแก้ `vision`, `missions`, และเนื้อหาประวัติ

#### Site Settings
- เข้า `site-settings` เพื่อเปลี่ยนค่า theme เริ่มต้นของเว็บไซต์

#### Analytics
- เข้า `analytics-report` เพื่อดูรายงานสถิติ
- ผู้ใช้ต้องมี role เป็น `admin` จึงจะอ่านข้อมูลส่วนนี้ได้

## Media Management
### ประเภทไฟล์ที่รองรับ
- รูปภาพ `image/*`
- PDF `application/pdf`
- วิดีโอ `video/mp4`
- วิดีโอ `video/webm`

### ข้อจำกัดไฟล์
- ขนาดไฟล์อัปโหลดสูงสุด 10MB ต่อไฟล์

### แนวทางใช้งาน media
- ใส่ `alt` ให้รูปภาพทุกครั้งถ้าเป็นรูปที่แสดงบนเว็บ
- ใช้รูปปกที่ชัดและเหมาะกับสัดส่วนแนวนอน
- ถ้าหน้า public ต้องใช้รูปเดียวกันหลายจุด ควรตรวจว่าผูกกับ record ถูกต้องก่อนลบไฟล์ออกจาก `media`

## Seed และ Health Check
### Seed ข้อมูลตัวอย่าง
- เรียก `GET /api/seed`
- ใช้สำหรับเติมข้อมูลตัวอย่างและข้อมูลอ้างอิงหลักของระบบ
- endpoint นี้จะสร้างหรืออัปเดตข้อมูลหลาย collection และอัปเดต global บางตัว

### Clean seed
- เรียก `GET /api/seed?clean=true`
- ใช้ล้างข้อมูลตัวอย่างในหลาย collection และรีเซ็ตบาง global

ข้อควรระวัง:
- ไม่ควรใช้ `clean=true` บนระบบที่มีข้อมูลจริงแล้ว
- ถ้าจำเป็นต้องใช้ ให้สำรองข้อมูลก่อนเสมอ

### Health check
- เรียก `GET /api/health`
- ถ้าระบบปกติจะได้สถานะ `ok`
- endpoint นี้ใช้เช็กการเชื่อมต่อ Payload และฐานข้อมูลเบื้องต้น

## Operational Checklist
### หลังเพิ่มหรือแก้ content
- เปิดหน้ารวมของหมวดที่เกี่ยวข้อง
- เปิดหน้ารายละเอียดของรายการที่เพิ่งแก้
- ตรวจรูปภาพ, ข้อความ, วันที่, และลิงก์
- ตรวจว่า `isPublished` ถูกตั้งค่าตามต้องการ
- ตรวจ slug ว่าไม่ซ้ำและเปิดได้จริง

### Manual QA ขั้นต่ำที่ควรทำ
- `/heritage` ตรวจ filter, tag, search และหน้า detail
- `/activities` ตรวจหน้ารวม, ปฏิทิน, และหน้า detail
- `/news` ตรวจข่าวทั่วไป, ข่าววิดีโอ, และข่าวเอกสารถ้ามี
- `/districts` ตรวจรายการอำเภอ, แผนที่, และหน้า detail
- `/awards/khon-dee`, `/awards/youth-culture`, `/awards/wisdom-awards` ตรวจรายการและหน้า detail

## Common Issues
### บันทึกแล้วแต่หน้าเว็บไม่ขึ้น
- ตรวจว่าเปิด `isPublished` แล้ว
- ตรวจว่า slug ไม่ซ้ำ
- ตรวจว่ากำลังดูหน้ารวมและหน้ารายละเอียดที่ถูกต้อง

### กิจกรรมระดับอำเภอไม่ขึ้นตามที่คาด
- ตรวจว่า `level` เป็น `district`
- ตรวจว่าเลือก `district` แล้ว

### หน้าแผนที่อำเภอแสดงไม่ครบ
- ตรวจค่า `latitude` และ `longitude` ของอำเภอนั้น
- ตรวจว่า record อำเภอเปิดใช้งานอยู่

### ข่าวเอกสารหรือวิดีโอแสดงผิด
- ตรวจ `type` ของข่าว
- ตรวจว่ากรอก `videoUrl` หรือแนบ `document` ตรงกับประเภทที่เลือก

### หน้า hero ใช้รูปไม่ถูก
- ตรวจ `page-heroes` ว่าแก้กลุ่มหน้าถูกตัว
- บันทึกแล้วรีเฟรชหน้า public เพื่อตรวจผลจริง

### เปิด analytics ไม่ได้
- ตรวจ role ของผู้ใช้ใน `users`
- ส่วนนี้อ่านได้เฉพาะ `admin`

## Related Canonical Docs
- `STATUS.md`
- `docs/01_Project_Core/Site_Map_and_Workflow.md`
- `docs/01_Project_Core/Documentation_Workflow.md`
- `docs/03_Database/Schema.md`
