นี่คือการออกแบบ **Site Map** และ **Workflow/Tasks** ที่มีความละเอียดและชัดเจนที่สุด เพื่อให้คุณนำไปป้อนคำสั่ง (Prompt) ให้กับ **Google Antigravity Agent** ทำงานได้อย่างไร้รอยต่อครับ

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
* 3.2 **ปฏิทินกิจกรรม:** ปฏิทินงานประเพณีล่วงหน้า


* **4. เครือข่ายสภาวัฒนธรรมอำเภอ (District Network)**
* 4.1 หน้ารวม 18 อำเภอ (Grid Card แสดงชื่ออำเภอและรูปสัญลักษณ์)
* 4.2 **หน้าเฉพาะอำเภอ (District Detail Page):**
* ข้อมูลพื้นฐานสภาวัฒนธรรมอำเภอ
* รายชื่อคณะกรรมการประจำอำเภอ (แยกตามตำแหน่ง)
* กิจกรรมในระดับอำเภอ (ดึงจาก Activity Collection)




* **5. คลังมรดกภูมิปัญญา (Cultural Heritage Blog)**
* 5.1 รายการบทความ (Blog Listing) พร้อม Sidebar กรองข้อมูล
* 5.2 แบ่ง 4 หมวดหลัก:
* *มรดกภูมิปัญญา / ศูนย์เชียงรายศึกษา / แหล่งเรียนรู้ / ปราชญ์ชาวบ้าน*


* 5.3 ระบบ Tags (เช่น #ศิลปะการแสดง #ผ้าทอ #อาหารพื้นถิ่น)


* **6. ข่าวสารและประชาสัมพันธ์ (News & PR)**
* 6.1 ข่าวทั่วไป / 6.2 วิดีโอสื่อวัฒนธรรม / 6.3 เอกสารดาวน์โหลด (PDF)


* **7. ติดต่อเรา (Contact)**

**[Admin System - Payload CMS Dashboard]**

* Manage: Boards, Districts, Members, Activities, Blogs, Tags, News, Users.

---

### 2. Project Workflow (ขั้นตอนการพัฒนา)

กระบวนการนี้แบ่งเป็น 4 ระยะหลัก (Milestones):

1. **Phase 1: Environment & Infra (Infrastructure setup)**
2. **Phase 2: Data Schema & CMS (The Backbone)** - กำหนดความสัมพันธ์ของข้อมูล
3. **Phase 3: Frontend & Theme (The Interface)** - Tailwind 4.1 + daisyUI 5.5
4. **Phase 4: Logic & Content Integration (The Engine)** - เชื่อมต่อ Frontend กับ API

---

### 3. Task List สำหรับ Google Antigravity Agent

คุณสามารถคัดลอก Tasks เหล่านี้ไปสั่งงาน Agent ทีละข้อตามลำดับได้เลย:

#### **Task 1: Project Initialization & Docker**

> **Prompt:** "สร้างโครงสร้างโปรเจกต์ Next.js 16.1.1 ร่วมกับ Payload CMS โดยใช้ Node.js 25 ให้จัดเตรียมไฟล์ `docker-compose.yml` สำหรับการรัน Container ของ App และ MongoDB เวอร์ชั่นล่าสุด พร้อมติดตั้ง Tailwind CSS 4.1 และ daisyUI 5.5.14 ให้พร้อมใช้งาน"

#### **Task 2: Define Content Collections (Schema)**

> **Prompt:** "กำหนด Collections ใน Payload CMS ดังนี้:
> 1. `ProvincialBoard`: ฟิลด์ (Name, Position, Image, Bio)
> 2. `Districts`: ฟิลด์ (DistrictName [18 อำเภอ], Location, Contact)
> 3. `DistrictMembers`: ฟิลด์ (Name, Position) และ `Relationship` เชื่อมไปยัง `Districts`
> 4. `Activities`: ฟิลด์ (Title, Date, Level [Province/District], Content, Gallery) และ `Relationship` (Optional) เชื่อมไปยัง `Districts`
> 5. `HeritageBlog`: ฟิลด์ (Title, Content, Cover, Category [4 หมวด]) และ `Relationship` เชื่อมกับ `Tags` และ `Districts`
> 6. `Tags`: ฟิลด์ (TagName)"
> 
> 

#### **Task 3: Layout & Theme Design**

> **Prompt:** "ออกแบบไฟล์ `globals.css` โดยใช้ Tailwind 4.1 Engine ใหม่ และตั้งค่าธีม daisyUI 5.5 ให้เป็นสไตล์ 'Modern Lanna' (สีม่วงเชียงราย, สีทองเมทัลลิก, พื้นหลังสีขาวนวล) และสร้าง Navigation Bar ที่มีเมนูครบตาม Site Map ที่กำหนด"

#### **Task 4: District Detail & Committee Logic**

> **Prompt:** "สร้างหน้า Dynamic Route `/districts/[slug]` ใน Next.js ให้ดึงข้อมูลจาก `Districts` และเขียน Logic เพื่อดึงรายชื่อจาก `DistrictMembers` ทั้งหมดที่สังกัดอำเภอนั้นมาแสดงผลเป็นตารางกรรมการ และดึง `Activities` ที่มี Level เป็น 'District' ของอำเภอนั้นมาโชว์ด้วย"

#### **Task 5: Heritage Blog Engine**

> **Prompt:** "สร้างหน้าคลังมรดกภูมิปัญญา `/heritage` ที่แสดงบทความแบบ Blog Grid โดยมีฟังก์ชันการ Filter ตามหมวดหมู่ (Category) และ Tags และหน้าอ่านบทความ `/heritage/[slug]` ที่รองรับ Rich Text และแกลเลอรีรูปภาพ"

---

### 4. สรุปความสัมพันธ์ข้อมูล (Relationship Map) สำหรับ Agent

เพื่อให้ Agent ไม่สับสนเวลาเขียน Code:

* **Districts** คือศูนย์กลาง (Hub)
* **DistrictMembers** ต้องเลือก **District** (1:N)
* **HeritageBlog** ต้องเลือก **Tags** (N:N) และ **Category** (Fixed)
* **Activities** ต้องระบุ **Level** (Province หรือ District) หากเป็น District ต้องเลือก **District**

