# Project Roadmap

## Purpose
เอกสาร canonical สำหรับภาพรวม milestone และ priority ระดับโปรเจกต์เท่านั้น

## Milestones
1. **Environment & Infrastructure** — Complete
2. **Data Schema & CMS** — Complete
3. **Frontend & Theme** — Complete
4. **Logic & Content Integration** — In Progress
5. **Production Readiness** — In Progress

## Current Roadmap Position
- โครงสร้างหลักของระบบเสร็จแล้ว
- งานปัจจุบันอยู่ที่ content integration, post-import verification, และ follow-up tuning จากข้อมูลจริง
- งานเชิง execution รายวันให้ดูใน `Site_Map_and_Workflow.md`

## Completed Foundations
### Environment & Infra
- Next.js + Payload CMS + MongoDB via Docker Compose
- Multi-stage Dockerfile
- Environment configuration

### Data Schema & CMS
- 11 collections registered
- Payload admin พร้อมใช้งาน
- 18 districts seeded

### Frontend & Theme
- Public pages หลักสร้างครบ
- Theme Modern Lanna และ utility classes พร้อมใช้
- Navbar / Footer / Admin branding พร้อม
- Shared media resolution, public-facing content typing, current background-header visual language, and typed public model mapping ถูกใช้กับหน้าหลักส่วนใหญ่แล้ว

## Milestone Priorities
### Logic & Content Integration
- Import ข้อมูลจริงของกรรมการ กิจกรรม บทความ และข่าว
- เพิ่มการตรวจสอบ flow สำคัญหลังลงข้อมูลจริง
- ทวนข้อมูลที่ import เข้ามาแล้วและเติมความครบถ้วนของ content ตาม feature specs

### Production Readiness
- ติดตาม performance หลังข้อมูลจริงเพิ่มขึ้น
- รักษา admin/runtime compatibility ให้เสถียรกับ Next.js + Turbopack
- ปรับ deployment/runtime notes เฉพาะเมื่อมี gap ใหม่จากการใช้งานจริง

## How to Use This File
- ใช้ไฟล์นี้เมื่ออยากรู้ภาพรวม roadmap และ milestone ระดับโปรเจกต์
- ใช้ `Site_Map_and_Workflow.md` เมื่อต้องการ workflow และ task ล่าสุดในที่เดียว
- ใช้ `STATUS.md` เมื่อต้องการสถานะล่าสุดแบบสั้นรายรอบ

## Legacy Reference
- `docs/guides/PROGRESS_REPORT.md`
- `docs/workflow/task-and-workflow.md`
