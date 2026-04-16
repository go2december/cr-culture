# Feature Specification: Real Content Import Batch 2

## 1. Overview
- Description: นำเข้าข้อมูลจริงชุดที่ 2 โดยขยายปริมาณข้อมูลและความครอบคลุมของความสัมพันธ์ข้ามคอลเลกชัน
- Goal: เพิ่มความสมบูรณ์ของข้อมูล production candidate หลังจาก Batch 1 ผ่านการตรวจสอบแล้ว
- Status: Draft

## 2. Scope (Batch 2)
- [ ] เพิ่มจำนวนข้อมูลใน collections เดิมให้ใกล้เคียงข้อมูลใช้งานจริง
- [ ] เติม gallery และ document/video records ที่ยังไม่ครบจาก Batch 1
- [ ] ปรับปรุงคุณภาพข้อมูล (slug consistency, metadata, source attribution)
- [ ] ทวนสอบความถูกต้องของ relationship และการแสดงผลหน้าเว็บทั้งหมดที่เกี่ยวข้อง

## 3. Dependencies
- [ ] Batch 1 ต้องผ่าน Done Criteria และไม่มี regression สำคัญ
- [ ] มี mapping table ล่าสุดจาก `REAL_CONTENT_IMPORT_BATCH_1.md`
- [ ] มีรายการ media ที่พร้อมใช้งานและผ่านข้อกำหนด mime types

## 4. Technical Plan
- API Routes:
  - `src/app/api/seed/route.ts` (เพิ่มโหมด batch2 หรือรับพารามิเตอร์ชุดข้อมูล)
- Collections:
  - `districts`, `district-members`, `activities`, `news`, `heritage-blog`, `media`
- Data Access Validation:
  - `src/lib/payload.ts` ตรวจ query หลักหลัง import

## 5. Tasks
- [ ] เตรียมไฟล์ข้อมูลชุด Batch 2 พร้อม data quality checks
- [ ] รัน dry-run และบันทึกผล created/updated/skipped/failed
- [ ] แก้ไขข้อมูลที่ fail จาก dry-run แล้ว rerun
- [ ] รัน import จริง
- [ ] ตรวจหน้า frontend ตามเส้นทางหลักและจุดที่มี filter/search
- [ ] อัปเดต `STATUS.md` และเอกสาร feature นี้เมื่อเสร็จ

## 6. Validation Checklist
- [ ] Slug ไม่ซ้ำทุกคอลเลกชันที่มี unique constraint
- [ ] Relationship ไม่ dangling (district/tag/position/media ครบ)
- [ ] ข่าว type=document มี document ครบ
- [ ] ข่าว type=video มี videoUrl ที่ใช้งานได้
- [ ] กิจกรรม level=district มี district ครบ
- [ ] หน้า heritage/search/filter ยังทำงานถูกต้อง

## 7. Notes
- ใช้ mapping table และ Import Execution Rules จาก `REAL_CONTENT_IMPORT_BATCH_1.md` เป็น baseline
- ถ้ามีการเปลี่ยนแปลงเชิงระบบ ให้บันทึกลง `docs/05_Meeting_Notes/Decision_Log.md`
