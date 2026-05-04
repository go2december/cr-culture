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
- งานปัจจุบันอยู่ที่ content integration, typed data-layer cleanup, และ production readiness
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
- Shared media resolution, public-facing content typing, and current background-header visual language ถูกใช้กับหน้าหลักส่วนใหญ่แล้ว

## Milestone Priorities
### Logic & Content Integration
- Import ข้อมูลจริงของกรรมการ กิจกรรม บทความ และข่าว
- ลดความหนาแน่นของ query logic ใน `src/lib/payload.ts` และค่อยๆ ย้ายไปสู่ typed public model mapping
- เพิ่มการตรวจสอบ flow สำคัญหลังลงข้อมูลจริง

### Production Readiness
- ปิด health check และ Docker optimization
- ทวน deployment configuration และ host/runtime parity
- ติดตาม performance หลังข้อมูลจริงเพิ่มขึ้น
- รักษา admin/runtime compatibility ให้เสถียรกับ Next.js + Turbopack

## How to Use This File
- ใช้ไฟล์นี้เมื่ออยากรู้ภาพรวม roadmap และ milestone ระดับโปรเจกต์
- ใช้ `Site_Map_and_Workflow.md` เมื่อต้องการ workflow และ task ล่าสุดในที่เดียว
- ใช้ `STATUS.md` เมื่อต้องการสถานะล่าสุดแบบสั้นรายรอบ

## Legacy Reference
- `docs/guides/PROGRESS_REPORT.md`
- `docs/workflow/task-and-workflow.md`
