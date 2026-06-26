# Plan: SEO & GEO Enhancements (robots.txt, sitemaps, dynamic metadata)

แผนงานยกระดับประสิทธิภาพการค้นหา (SEO) และความสามารถในการถูกอ้างอิงบนปัญญาประดิษฐ์ (GEO - Generative Engine Optimization) สำหรับเว็บไซต์สภาวัฒนธรรมจังหวัดเชียงราย

## Overview
- **Goal**: จัดทำไฟล์ `robots.txt`, `sitemap.xml` (Dynamic) และปรับปรุงให้หน้าเพจรายละเอียดหลักทั้งหมดมีระบบสร้าง Metadata แบบไดนามิก (`generateMetadata`) เพื่อดึงชื่อเรื่อง คำอธิบายย่อ และรูปภาพปกมาแสดงผลบนการแชร์ลิงก์โซเชียลมีเดียและการแสดงผลหน้าการค้นหา (เช่น Google, Bing, ChatGPT, Claude)
- **Project Type**: WEB (Next.js 16 + React 19)
- **Status**: Planning

## User Review Required

> [!IMPORTANT]
> - **การเก็บข้อมูลของบอท**: จะปิดกั้นไม่ให้บอทค้นหาทำการเก็บข้อมูลหน้าควบคุมการใช้งานหลังบ้าน (`Disallow: /admin/`) เพื่อความมั่นคงปลอดภัยและไม่ให้หน้าแอดมินแสดงบน Google
> - **แผนผังเว็บไซต์ (Sitemap)**: จะพัฒนาเป็น Dynamic Sitemap (`sitemap.ts`) ที่ดึงข้อมูล Slug ของอำเภอ ข่าว กิจกรรม และบทความมรดกทางวัฒนธรรมจากฐานข้อมูล MongoDB ผ่าน Payload API โดยตรงแบบเรียลไทม์
> - **OpenGraph (Social Share)**: การเพิ่ม `generateMetadata` ในหน้าดีเทลทั้ง 7 เส้นทาง จะดึงรูปภาพ Cover Image จริงขึ้นมาใช้เป็นภาพพรีวิวการแชร์ลิงก์ (Link Preview) ของข่าวนั้นๆ

## Success Criteria
1. สามารถเข้าถึงหน้า `http://localhost:3000/robots.txt` และ `http://localhost:3000/sitemap.xml` ได้ถูกต้อง
2. ข้อมูลใน `sitemap.xml` แสดงลิงก์เพจหลัก (Home, About, Contact, ฯลฯ) และลิงก์ย่อยแบบ Dynamic ครบถ้วน
3. การเข้าชมหน้าบทความดีเทลทุกหน้ามีค่า Meta tags (Title, Description, og:image) ที่ตรงกับเนื้อหาจริงในฐานข้อมูล
4. รันคำสั่ง `npm run build`, `npm run lint` และ `npm run typecheck` ผ่านทั้งหมดโดยไม่มีข้อผิดพลาด

## File Structure

```
src/
└── app/
    ├── robots.ts               <-- [NEW] สคริปต์ไดนามิกสำหรับสร้าง robots.txt
    ├── sitemap.ts              <-- [NEW] สคริปต์ไดนามิกสำหรับสร้าง sitemap.xml
    └── (frontend)/
        ├── activities/
        │   └── [slug]/
        │       └── page.tsx    <-- [MODIFY] เพิ่ม generateMetadata
        ├── districts/
        │   └── [slug]/
        │       └── page.tsx    <-- [MODIFY] เพิ่ม generateMetadata
        ├── heritage/
        │   └── [slug]/
        │       └── page.tsx    <-- [MODIFY] เพิ่ม generateMetadata
        ├── news/
        │   └── [slug]/
        │       └── page.tsx    <-- [MODIFY] เพิ่ม generateMetadata
        └── awards/
            ├── khon-dee/
            │   └── [id]/
            │       └── page.tsx <-- [MODIFY] เพิ่ม generateMetadata
            ├── wisdom-awards/
            │   └── [id]/
            │       └── page.tsx <-- [MODIFY] เพิ่ม generateMetadata
            └── youth-culture/
                └── [id]/
                    └── page.tsx <-- [MODIFY] เพิ่ม generateMetadata
```

---

## Technical Details & Implementation Plan

### 1. `robots.ts`
สร้างไฟล์ `src/app/robots.ts` เพื่อส่งคืนค่ากฎสำหรับบอทค้นหา:
- **User-Agent**: `*`
- **Allow**: `/`
- **Disallow**: `/admin/`, `/api/`
- **Sitemap**: `https://crculture.go.th/sitemap.xml`

### 2. `sitemap.ts`
สร้างไฟล์ `src/app/sitemap.ts` ดึงข้อมูลจาก Payload:
1. เส้นทางสแตติกหลัก: `/`, `/about`, `/contact`, `/activities`, `/activities/calendar`, `/news`, `/heritage`, `/districts`
2. เส้นทางอำเภอ: `/districts/[slug]` (ดึงจาก collection `districts`)
3. เส้นทางกิจกรรม: `/activities/[slug]` (ดึงจาก collection `activities`)
4. เส้นทางข่าวสาร: `/news/[slug]` (ดึงจาก collection `news`)
5. เส้นทางบทความมรดกวัฒนธรรม: `/heritage/[slug]` (ดึงจาก collection `heritage-blog`)
6. เส้นทางรางวัลเกียรติยศ: `/awards/khon-dee/[id]`, `/awards/youth-culture/[id]`, `/awards/wisdom-awards/[id]` (ดึงจากคอลเลกชันที่เกี่ยวข้อง)

### 3. Dynamic Metadata in Detail Pages
ปรับเปลี่ยนไฟล์หน้าแสดงผลข้อมูลดีเทลทั้ง 7 ไฟล์โดยการใส่ฟังก์ชัน:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
    // 1. ดึงค่า slug / id จากพารามิเตอร์
    // 2. คิวรีข้อมูลจาก Payload CMS
    // 3. ส่งคืนค่า Title, Description, OpenGraph tags และ รูปภาพปก (Cover Image)
}
```

---

## Task Breakdown

### Phase 1: Creating Robots & Sitemap
- **Task 1.1**: พัฒนาสคริปต์ `src/app/robots.ts`
  - **Agent**: `seo-specialist`
  - **Dependencies**: None
  - **OUTPUT**: ไฟล์ `src/app/robots.ts`
  - **VERIFY**: ตรวจสอบการเข้าถึงบนเซิร์ฟเวอร์โลคัล
- **Task 1.2**: พัฒนาสคริปต์ `src/app/sitemap.ts`
  - **Agent**: `seo-specialist`
  - **Dependencies**: None
  - **OUTPUT**: ไฟล์ `src/app/sitemap.ts`
  - **VERIFY**: ตรวจสอบการคิวรีข้อมูลอำเภอ ข่าว กิจกรรม และบทความในโครงสร้าง XML ของ sitemap

### Phase 2: Metadata Integration
- **Task 2.1**: เพิ่มระบบดึงข้อมูลในหน้าบทความมรดกภูมิปัญญา `/heritage/[slug]`
- **Task 2.2**: เพิ่มระบบดึงข้อมูลในหน้าข่าวสาร `/news/[slug]`
- **Task 2.3**: เพิ่มระบบดึงข้อมูลในหน้ารายละเอียดกิจกรรม `/activities/[slug]`
- **Task 2.4**: เพิ่มระบบดึงข้อมูลในหน้าเครือข่ายอำเภอ `/districts/[slug]`
- **Task 2.5**: เพิ่มระบบดึงข้อมูลในหน้ารางวัลเกียรติยศคนดีศรีเชียงราย `/awards/khon-dee/[id]`
- **Task 2.6**: เพิ่มระบบดึงข้อมูลในหน้ารางวัลครูภูมิปัญญา `/awards/wisdom-awards/[id]`
- **Task 2.7**: เพิ่มระบบดึงข้อมูลในหน้ารางวัลเยาวชนวัฒนธรรม `/awards/youth-culture/[id]`

---

## Phase X: Verification Checklist

### Automated Script Verification
```bash
npm run typecheck
npm run lint
npm run build
```

### Functional Checklist
- [ ] เข้าหน้า `http://localhost:3000/robots.txt` แล้วแสดงผลลัพธ์เป็นข้อความกฎการ disallow `/admin/` ได้ถูกต้อง
- [ ] เข้าหน้า `http://localhost:3000/sitemap.xml` แล้วสามารถดาวน์โหลด/พรีวิวเอกสารแผนผัง XML ที่มีลิงก์หน้าดีเทลต่างๆ ได้ครบถ้วน
- [ ] เข้าหน้ารายละเอียด เช่น ข่าวหรือกิจกรรม ตรวจดูโครงสร้าง HTML ผ่าน View Source แล้วพบแท็ก `<title>`, `<meta name="description">` และ `<meta property="og:image">` ตรงกับเนื้อหานั้นๆ
