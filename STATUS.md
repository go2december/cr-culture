## สถานะปัจจุบัน (อัปเดตทุกครั้งที่หยุดพัฒนา)

ไฟล์นี้เป็นสรุปสถานะสั้นแบบ canonical เพื่อลดข้อมูลซ้ำในโปรเจกต์
อัปเดตล่าสุด: 6 พฤษภาคม 2569

## 📌 Project Status

## Current Focus
- Real content import ชุดแรกสำหรับ board, activities, heritage, และ news
- เพิ่ม verification หลัง import ให้ครอบคลุม flow สำคัญ
- ติดตาม performance และ maintenance หลังข้อมูลจริงเริ่มเข้า
- รักษา workflow/state docs ให้ตรงกับสถานะจริงหลังเพิ่ม `page-heroes` global, interactive district map, typed public model mapping, และ Docker/runtime parity

## Current Snapshot
- โครงสร้างหลักของระบบ, CMS schema, public pages, และ admin ใช้งานได้แล้ว
- Frontend audit, performance hardening, media handling hardening, production build verification, typed public model mapping, และ Docker/runtime parity validation ผ่านแล้ว
- Shared public content/organization types ถูกเพิ่ม และ data layer ถูก refactor ให้คืนค่ารูปแบบ public model ชัดขึ้นแล้ว
- Header direction ของหน้า home/list/content หลักถูกปรับให้อยู่ใน visual language เดียวกันมากขึ้น
- หน้า districts ใช้แผนที่แบบ interactive และ page hero content ถูก centralize ไว้ที่ global เดียว
- API health endpoint และ Docker healthchecks พร้อมใช้งานแล้ว
- จุดที่ยังต้องตามต่อหลักๆ คือ content import, verification หลัง import, และ follow-up tuning จากข้อมูลจริง

## Next Steps
- ลงข้อมูลจริงตาม feature specs
- เพิ่ม verification ให้ flow สำคัญหลัง import ข้อมูล
- ปรับจูน performance และ admin/runtime maintenance ตามข้อมูลจริง
- อัปเดต workflow/task docs เมื่อ milestone หรือ scope เปลี่ยน

## เอกสารอ้างอิงหลัก
- กฎและสถาปัตยกรรม: `.windsurfrules`
- ภาพรวมโปรเจกต์: `README.md`
- สารบัญเอกสาร: `docs/README.md`
- workflow + task: `docs/01_Project_Core/Site_Map_and_Workflow.md`
- roadmap: `docs/01_Project_Core/Project_Roadmap.md`
- meeting notes: `docs/05_Meeting_Notes/README.md`
- decision log: `docs/05_Meeting_Notes/Decision_Log.md`