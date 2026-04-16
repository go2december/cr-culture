# Project Roadmap

## Purpose
เอกสาร canonical สำหรับภาพรวมความคืบหน้า milestone หลักของโปรเจกต์ โดยใช้คู่กับ `STATUS.md` ซึ่งเป็นสถานะสั้นแบบปัจจุบัน

## Milestones
1. **Environment & Infrastructure** — Complete
2. **Data Schema & CMS** — Complete
3. **Frontend & Theme** — Complete
4. **Logic & Content Integration** — In Progress
5. **Production Readiness** — Pending

## Current High-Level Progress
จาก legacy progress report โปรเจกต์อยู่ในช่วงหลังบ้านเชื่อมข้อมูลและเตรียม content จริง โดยโครงสร้างหลักพร้อมใช้งานแล้ว

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

## Integration Status
### Implemented
- Home page content integration
- Activities list/detail/calendar
- District list/detail
- Heritage listing and article detail
- News listing/detail
- About page global content
- Board page integration

### Still Ongoing
- Import ข้อมูลจริง: กรรมการ กิจกรรม บทความ
- ลดความหนาแน่นของ query logic ใน `src/lib/payload.ts`
- image optimization
- production readiness tasks

## Current Priorities
### High Priority
- Import real content
- Performance optimization for images/components
- Production configuration readiness

### Medium Priority
- Refactor shared query logic
- Continue canonical documentation migration
- Add verification/testing around key flows

## How to Use This File
- ใช้ไฟล์นี้เมื่ออยากรู้ภาพรวม roadmap และ milestone ระดับโปรเจกต์
- ใช้ `STATUS.md` เมื่อต้องการดูสถานะล่าสุดแบบสั้นและ actionable

## Legacy Reference
- `docs/guides/PROGRESS_REPORT.md`
- `docs/workflow/task-and-workflow.md`
