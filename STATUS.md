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

## Recent Work (Codex Compatibility — 2026-06-25)
- **Codex readiness:** Added `AGENTS.md` guidance, ESLint flat config, and working npm scripts for Next.js 16 (`lint`, `typecheck`, `build`).
- **Offline-safe build:** Production build now uses webpack and no longer depends on `next/font/google` network fetches.
- **Verification:** `npm run lint`, `npm run typecheck`, and `npm run build` pass. Git safe directory was configured for this repo on the local machine.
- **Ponytail/Obsidian:** Obsidian docs and Ponytail instruction fallback are wired through `AGENTS.md` and canonical docs. The failed local context-proxy experiment was removed after Docker/WSL access proved unreliable in Codex sandbox.

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

## Recent Work (Awards Module — 2026-06-26)
- **Honor awards section:** Added navbar entry `รางวัลเกียรติยศ` with submenu `คนดีศรีเชียงราย`.
- **Payload CMS:** Added `award-years`, `award-categories`, and `khon-dee-awards` collections for annual cycles, award taxonomy, and recipient profiles.
- **Frontend:** Added public routes `/awards/khon-dee` and `/awards/khon-dee/[id]` with filterable list and detail view.
- **Docs:** Added canonical feature doc for the awards module and updated database schema notes.

## Recent Work (Typography Refresh โ€” 2026-06-26)
- **Frontend typography:** Updated shared typography tokens so body copy uses `Sarabun` and headings/navigation use `Prompt`.
- **Navbar polish:** Increased menu emphasis and tuned sizing to keep the header cleaner before the mobile breakpoint.

## Recent Work (Khon Dee Hero Global โ€” 2026-06-26)
- **CMS hero management:** Added `khonDee` to the `page-heroes` global so the `คนดีศรีเชียงราย` list page can manage eyebrow, title, subtitle, and hero image from Payload.
- **Frontend wiring:** Updated `/awards/khon-dee` to read hero content from the shared global with safe fallback copy when the CMS entry is still empty.

## Recent Work (Awards Expansion — 2026-06-26)
- **Modular awards IA:** Added `เยาวชนวัฒนธรรม` and `ครูภูมิปัญญาเมืองเชียงราย` under the `รางวัลเกียรติยศ` navigation group.
- **Payload CMS:** Added `wisdom-awards` and refined youth-awards admin labeling so award modules are easier to manage independently.
- **Frontend:** Added public routes for `/awards/youth-culture`, `/awards/youth-culture/[id]`, `/awards/wisdom-awards`, and `/awards/wisdom-awards/[id]`.
- **Docs:** Added a canonical modular awards architecture document covering the split collection strategy and public routing.
