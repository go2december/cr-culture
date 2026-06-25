## สถานะปัจจุบัน (อัปเดตทุกครั้งที่หยุดพัฒนา)

ไฟล์นี้เป็นสรุปสถานะสั้นแบบ canonical เพื่อลดข้อมูลซ้ำในโปรเจกต์
อัปเดตล่าสุด: 25 มิถุนายน 2569

## 📌 Project Status

## Current Focus
- ตรวจสอบฟรอนต์เอนด์ ปรับปรุงความเรียบร้อยของตัวกรอง และเดินหน้า Real content import Batch 2
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

## Recent Work (QA Snapshot — 2026-06-25)
- **Batch 1 Import:** Seeder executed and verification passed (`verification.passed = true`). Per-collection counts verified after import.
- **Frontend fixes:** Heritage tag filter links updated to preserve `category` and set `tag` using slug; `ActiveFilters` now shows the tag name when available. Files: [src/app/(frontend)/heritage/page.tsx](src/app/(frontend)/heritage/page.tsx), [src/components/heritage/ActiveFilters.tsx](src/components/heritage/ActiveFilters.tsx), [src/lib/payload.ts](src/lib/payload.ts).
- **Dev server & endpoints:** Dev server running and listening on port 3000 (local PID observed during check). Endpoints `/api/seed` and `/heritage` returned HTTP 200 OK when checked with `curl.exe`.
- **Manual QA required:** Please open http://localhost:3000/heritage and verify these UX scenarios: selecting a `category` then clicking a tag produces a URL containing both `category` and `tag`; `ActiveFilters` displays `🏷️ #<tag name>`; `page` param resets when filters change.

## Compact Handoff (2026-06-25)
- **Done:** Batch 1 import executed and verified; heritage tag filter UI updated to preserve `category` and display tag `name`; dev server and endpoints (`/api/seed`, `/heritage`) responded OK during local checks.
- **Verify (quick):** Open http://localhost:3000/heritage → select a category → click a tag. Expect URL with both `category` and `tag`, `ActiveFilters` shows the tag name, and no `page=` in filter links.
- **Next owner actions:** (1) Manual browser QA and sign-off, (2) run performance baseline + Docker prod smoke (optional next step), (3) merge/commit & deploy when ready.


## เอกสารอ้างอิงหลัก
- กฎและสถาปัตยกรรม: `.agent/rules/GEMINI.md`
- ภาพรวมโปรเจกต์: `README.md`
- สารบัญเอกสาร: `docs/README.md`
- workflow + task: `docs/01_Project_Core/Site_Map_and_Workflow.md`
- roadmap: `docs/01_Project_Core/Project_Roadmap.md`
- meeting notes: `docs/05_Meeting_Notes/README.md`
- decision log: `docs/05_Meeting_Notes/Decision_Log.md`