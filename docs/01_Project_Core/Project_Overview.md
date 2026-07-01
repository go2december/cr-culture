# Project Overview: CR-Culture

เอกสารนี้รวบรวมรายละเอียดเทคโนโลยี ระบบผู้ช่วย Agent/Skills และแนวทางการออกแบบหลักของโครงการสภาวัฒนธรรมจังหวัดเชียงราย (CR-Culture)

---

## 1. เทคโนโลยีหลักที่ใช้พัฒนา (Core Technology Stack)

โปรเจกต์นี้ขับเคลื่อนด้วยการผสานการทำงานของ Next.js และ Payload CMS 3 (Headless CMS) แบบ Standalone และเชื่อมต่อฐานข้อมูลภายนอกดังนี้:

### Frontend & API Layer
*   **Next.js 16 (App Router)** และ **React 19**
*   **TypeScript** สำหรับเพิ่ม Type-safety ของระบบข้อมูล
*   **sharp** สำหรับปรับแต่งและบีบอัดรูปภาพแบบไดนามิก (Image Optimization)
*   **Umami Analytics** สำหรับวิเคราะห์สถิติผู้เข้าชมเว็บไซต์แบบปราศจากคุกกี้ (Privacy-Friendly & Cookieless)

### CMS & Database Layer
*   **Payload CMS 3** สำหรับเป็นระบบหลังบ้านจัดการข้อมูลวัฒนธรรม ประวัติ มรดกภูมิปัญญา รางวัลเกียรติยศ และกิจกรรมต่างๆ
*   **MongoDB** (เชื่อมต่อผ่าน `@payloadcms/db-mongodb`) เป็นฐานข้อมูลหลัก
*   **Lexical Editor** (เชื่อมต่อผ่าน `@payloadcms/richtext-lexical`) สำหรับเขียนเนื้อหาแบบ Rich Text

### Interactive & Map Layer
*   **Leaflet & React Leaflet** สำหรับแสดงแผนที่แต่ละอำเภอของจังหวัดเชียงรายแบบ Interactive

### Infrastructure
*   **Docker & Docker Compose** สำหรับบริหารจัดการสภาพแวดล้อมทั้งในระดับ Local Development และ Production Standalone (มี Volume Persistence สำหรับเก็บข้อมูล Database และ Media อัตโนมัติ)

---

## 2. ระบบ Agent & Custom Skills

การพัฒนาใช้ระบบผู้ช่วย AI แบบ Modular ที่สอดคล้องกับแนวทาง **Ponytail Minimalism Layer** เพื่อจำกัดโค้ดที่ซ้ำซ้อนและส่งเสริมการเขียนโค้ดที่เรียบง่ายและนำกลับมาใช้ใหม่ได้:

### Custom Workspace Skills
ทักษะการทำงานของ Agent ที่ฝังตัวอยู่ในโฟลเดอร์ `.agent/skills/`:
*   **api-patterns**: แนวทางการออกแบบโครงสร้าง API, การแบ่งหน้า (Pagination) และการออกแบบ Response
*   **architecture**: รูปแบบการวิจัย วิเคราะห์สถาปัตยกรรม และการบันทึกเอกสารประกอบการตัดสินใจระบบ (ADR)
*   **clean-code**: มาตรฐานการเขียนโค้ดที่สั้น ตรงประเด็น และมี Unit/Integration Test กำกับ
*   **nextjs-react-expert**: เทคนิคและแนวทางปฏิบัติระดับสูงในการเพิ่มความเร็วเว็บและจัดการ Bundle Size
*   **systematic-debugging**: ระบบการแก้บั๊ก 4 ขั้นตอนพร้อมการพิสูจน์และการหาสาเหตุหลัก (Root Cause Analysis)
*   **tailwind-patterns**: การเขียนสไตล์ผ่าน Tailwind CSS v4 แบบ CSS-first
*   **ui-ux-pro-max**: การอ้างอิงดีไซน์ พาเลทสี และองค์ประกอบ UI ที่ดูพรีเมียม
*   **webapp-testing**: หลักการและสคริปต์การทำ E2E testing ด้วย Playwright
*   **lint-and-validate**: กฎระเบียบและ QA gate ในการล้างโค้ดที่ไม่ใช้งาน

### External Plugins
*   `chrome-devtools-plugin`
*   `google-antigravity-sdk`
*   `modern-web-guidance-plugin`

---

## 3. สไตล์การออกแบบ (Design Style: Modern Lanna)

ธีมหลักที่ใช้ในการนำเสนอของเว็บไซต์คือ **"Modern Lanna"** ซึ่งเป็นการรวมกลิ่นอายศิลปะวัฒนธรรมล้านนาเชียงรายเข้ากับความเรียบง่ายและเป็นมิตรกับผู้ใช้งานยุคปัจจุบัน:

### CSS Engine & UI Plugin
*   **Tailwind CSS v4** ควบคู่กับ **daisyUI 5** (กำหนดธีมสีหลักเป็น `light` mode)

### โทนสีของแบรนด์ (Core Brand Palette)
*   **Primary (สีน้ำเงินเข้มล้านนา - `#1B2A49`)**: ใช้สร้างโครงสร้างหลักของเว็บ แถบเมนูนำทาง และข้อความหัวข้อหลักที่มีความสำคัญ
*   **Secondary (สีทองหรูหรา - `#D4AF37`)**: ใช้เป็นส่วนของการขีดเส้นตกแต่ง ไอคอน และเอฟเฟกต์การชี้ (Hover) เพื่อความสวยงามมีเอกลักษณ์
*   **Accent (สีแดงสาดวัฒนธรรม - `#C83228`)**: ใช้สำหรับการเน้นย้ำ จุดเตือน หรือปุ่ม Call to Action ที่สำคัญ
*   **Neutral / Surface**: ใช้พื้นหลังขาวสะอาดโทนอุ่น (`#FAFAFA` และ `#F4F4F5`)

### ตัวอักษร (Typography)
*   **ส่วนหัวข้อ & เมนูนำทาง**: ใช้ฟอนต์ **Prompt** (น้ำหนัก 700, letter-spacing 0.01em)
*   **ส่วนเนื้อความ (Body)**: ใช้ฟอนต์ **Sarabun** (sans-serif, line-height 1.8) เพื่อให้อ่านง่ายสบายตา

### องค์ประกอบดีไซน์ล้านนา (Lanna Decorative Elements)
*   `mask-kanok` และ `mask-woven`: ใช้ตกแต่งหรือตัดขอบภาพด้วยลวดลายกนกและลายทอล้านนา
*   `bg-lanna-pattern`: การซ้อนลวดลายล้านนาสีน้ำเงินจางๆ บนกรอบสีเพื่อเน้นย้ำความดั้งเดิม
*   `card-district` / `card-heritage`: ดีไซน์การ์ดเนื้อหาที่มีเงาสีน้ำเงินเข้มจางๆ (Navy-tinted shadow) พร้อมลูกเล่นยกตัวขึ้นและเปลี่ยนสีขอบเป็นสีทองอ่อนเมื่อเมาส์ชี้ผ่าน (Hover Effect)
