## สถานะปัจจุบัน (อัปเดตทุกครั้งที่หยุดพัฒนา)

ไฟล์นี้เป็นสรุปสถานะสั้นแบบ canonical เพื่อลดข้อมูลซ้ำในโปรเจกต์
อัปเดตล่าสุด: 1 กรกฎาคม 2569

## Recent Work (ปรับปรุงแหล่งข้อมูลกรรมการจังหวัด และผลงานเด่นคนดีศรีเชียงราย — 1 กรกฎาคม 2569)
- **Unified Board Page Lookup**: ปรับปรุงหน้าคณะกรรมการจังหวัด `/about/board` ให้ทำการแปลงที่มาข้อมูลและสร้างลิงก์เชื่อมโยงไปยังหน้าประวัติอำเภอให้กับทุกระดับตำแหน่ง (ประธาน, รองประธาน, กรรมการประสานงาน, เลขานุการ) หากตั้งค่าเป็นดึงข้อมูลจากประธานอำเภอ
- **Multiple Contribution Titles**: แก้ไขคอลเลกชัน `khon-dee-awards` และเพิ่มฟิลด์ `contributionTitle` เป็นแบบอาร์เรย์ (Array of strings) เพื่อให้กรอกผลงานหรือโครงการเด่นได้มากกว่า 1 ผลงาน พร้อมปรับปรุงระบบค้นหา คอร์สข้อมูลตั้งต้น (Seeding) และการเรนเดอร์ในหน้ารายละเอียดให้ออกมาเป็นรายการแบบจุดนำสายตา (Bullet list) อย่างกลมกลืนและรองรับข้อมูลโครงสร้างเก่าโดยไม่พัง
- **Verification**: ผ่านการตรวจสอบคุณภาพแบบครบวงจร 100% ทั้ง ESLint (`npm run lint`), TypeScript (`npm run typecheck`), และ Next.js Production Build (`npm run build`) คลีนไม่มีจุดติดขัด

## Recent Work (ปรับลำดับเมนูและเปลี่ยนคำเรียกรางวัลเกียรติยศ — 30 มิถุนายน 2569)
- **Navbar Reordering**: ปรับลำดับเมนูใน Navbar ภายใต้กลุ่ม "รางวัลเกียรติยศ" เรียงจาก "คนดีศรีเชียงราย", "ครูภูมิผญาเมืองเชียงราย", และ "ยุวชนวัฒนธรรม"
- **Terminology Updates**: เปลี่ยนคำเรียกในโปรเจกต์จาก "ครูภูมิปัญญาเมืองเชียงราย" เป็น **"ครูภูมิผญาเมืองเชียงราย"** และจาก "เยาวชนวัฒนธรรม" เป็น **"ยุวชนวัฒนธรรม"** ทั้งในส่วนแสดงผลฟรอนต์เอนด์ หน้าของระบบ CMS โครงสร้างข้อมูลตั้งต้น (Seeding) และ Global Page Heroes
- **Verification**: ทดสอบกระบวนการตรวจสอบคุณภาพผ่านครบถ้วน 100% (`npm run lint`, `npm run typecheck`, `npm run build`) และการันตีการตอบสนองผ่าน Health check (`/api/health`) ราบรื่นเรียบร้อย

## Recent Work (ย้ายแผงขยายภาพ Lightbox ให้แสดงนอกเฟรมเพจหลักแบบครอบคลุมทั้งหน้าจอ — 30 มิถุนายน 2569)
- **React Portal Lightbox**: ติดตั้งกลไก `createPortal` ในคอมโพเนนต์ `<ActivityDetailGallery>` และ `<SingleActivityGallery>` สำหรับการนำส่งโค้ดแสดงผลรูปขยาย (Lightbox) ไปเรนเดอร์แนบกับ `document.body` โดยตรง เพื่อหลีกเลี่ยง CSS Stacking Context ที่ติดอยู่ภายในกรอบเนื้อหาบทความ ปรับ z-index ระดับ `z-9999` ช่วยให้ภาพขยายเต็มจอเบราว์เซอร์ทับ Navbar และ sidebar ทั่วทั้งเว็บเพจอย่างแท้จริง
- **Header Term Adjustment**: เปลี่ยนข้อความพาดหัวแกลเลอรีในหน้าข้อมูลบทความกิจกรรมจาก "แกลเลอรีภาพกิจกรรม" เป็นคำว่า **"แกลเลอรี"**
- **Verification**: การทดสอบผ่านกระบวนการคุณภาพสมบูรณ์ครบ 100% (`npm run lint`, `npm run typecheck`, `npm run build`)

## Recent Work (แยกคลังภาพกิจกรรมและเพิ่มหน้ารายละเอียดรูปภาพเฉพาะ — 30 มิถุนายน 2569)
- **Grouped Activity Gallery**: ปรับปรุงหน้าหลักของภาพกิจกรรม `/activities/gallery` และสร้างคอมโพเนนต์ `<ActivityListGallery>` จัดเรียงการแสดงผลในสไตล์การ์ดรายกิจกรรม (แสดงภาพปก 1 ภาพต่อกิจกรรม) พร้อมระบุจำนวนรูปภาพในคลัง
- **Dedicated Gallery Detail Page**: สร้างหน้าเส้นทางย่อยแบบไดนามิก `/activities/gallery/[slug]` และคอมโพเนนต์ `<SingleActivityGallery>` ดึงเฉพาะรูปภาพทั้งหมดภายในกิจกรรมนั้นมาแสดงในรูปแบบกริด พร้อมติดตั้งระบบ Lightbox ขยายเต็มจอควบคุมผ่านแป้นพิมพ์
- **Navbar & Seeding Updates**: เปลี่ยนชื่อเมนูหลักใน Navbar เป็น **"กิจกรรมสภาวัฒนธรรม"** และติดตั้งสคริปต์สุ่มสร้างภาพกิจกรรมจำลองดึงภาพปกและแกลเลอรีจากคอลเลกชัน `media` อัตโนมัติ
- **Cleanup & Verification**: ลบส่วนประกอบโค้ดที่ไม่ได้ใช้งานออก และทดสอบความปลอดภัยครบถ้วนบิลด์ระบบสำเร็จ 100% (`npm run lint`, `npm run typecheck`, `npm run build`)

## Recent Work (ปรับปรุงตำแหน่งกรรมการจังหวัดอัตโนมัติ — 30 มิถุนายน 2569)
- **Dynamic Committee Members**: เปลี่ยนหน้ารายชื่อคณะกรรมการจังหวัด (หมวดหมู่ "กรรมการ") ให้ดึงข้อมูลรายชื่อประธานสภาวัฒนธรรมอำเภอจากทั้ง 18 อำเภอมาแสดงผลโดยอัตโนมัติ
- **Link Mapping**: ปรับปรุงการ์ดกรรมการให้สามารถคลิกนำทางไปยังหน้าประวัติอำเภอนั้นๆ ได้โดยตรงผ่านลิงก์ `districtSlug`
- **Redundant Layout Cleanup**: ลบตารางแสดงรายชื่อประธานสภาวัฒนธรรมอำเภอที่เคยซ้ำซ้อนบริเวณท้ายหน้าออก
- **Verification**: ทดสอบผ่านกระบวนการคุณภาพครบถ้วน (`npm run lint`, `npm run typecheck`, และบิลด์โปรดักชันผ่านเรียบร้อย)

## Recent Work (ติดตั้งระบบวิเคราะห์สถิติ Umami Analytics — 28 มิถุนายน 2569)
- **Umami Integration**: เพิ่มการโหลดสคริปต์แทร็กสถิติเข้าชมเว็บไซต์แบบปราศจากคุกกี้ (Privacy-Friendly) ด้วย Umami Analytics ผ่านคอมโพเนนต์ `next/script`
- **Payload Admin Sidebar & Custom View**: เพิ่มเมนูเมนูด่วนด้านซ้ายชื่อ **"รายงานสถิติ"** (ระบบวิเคราะห์สถิติ) และสร้างหน้ารายงานแบบเต็มจอ (Full Screen) ผ่านคอมโพเนนต์ `AnalyticsView` ที่เชื่อมโยงเข้ากับระบบจำกัดสิทธิ์แอดมินเท่านั้น
- **Payload Admin Widget**: ติดตั้งวิดเจ็ตสถิติด่วน `AnalyticsWidget` หลังหน้ารวมคอลเลกชันในหน้าหลักของแผงแอดมินโดยอัตโนมัติ (`admin.components.afterDashboard`)
- **Environment Config**: กำหนดตัวแปรสภาพแวดล้อมจริงเข้าระบบในไฟล์ `.env`
- **Verification**: ทดสอบผ่านทุกกระบวนการ (`npm run lint`, `npm run typecheck` และบิลด์โปรดักชันสำเร็จเรียบร้อย)

## Recent Work (แยกประเภทรางวัลเยาวชนวัฒนธรรม — 28 มิถุนายน 2569)
- **CMS Schema**: สร้างคอลเลกชัน `youth-award-categories` แยกจาก `award-categories` เพื่อแยกประเภทรางวัลเยาวชนวัฒนธรรมและคนดีศรีเชียงรายไม่ให้ปะปนกัน
- **Youth Award Histories**: อัปเดตฟิลด์ `category` ในคอลเลกชัน `youth-award-histories` ให้ชี้ไปที่คอลเลกชัน `youth-award-categories` ตัวใหม่แทน
- **Data Layer & Seeding**: อัปเดต public types, mappers (`mapYouthAwardCategory`) และ helper functions ใน frontend รวมถึงปรับปรุงไฟล์ `src/app/api/seed/route.ts` ให้ทำการเคลียร์และใส่ข้อมูลตั้งต้นหมวดหมู่เยาวชนวัฒนธรรมใหม่ทั้งหมด
- **Verification**: รันการทดสอบและ build ผ่านเรียบร้อยครบ 100% (`npm run lint`, `npm run typecheck`, `npm run build`)

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

## Recent Work (Typography Refresh — 2026-06-26)
- **Frontend typography:** Updated shared typography tokens so body copy uses `Sarabun` and headings/navigation use `Prompt`.
- **Navbar polish:** Increased menu emphasis and tuned sizing to keep the header cleaner before the mobile breakpoint.

## Recent Work (Khon Dee Hero Global — 2026-06-26)
- **CMS hero management:** Added `khonDee` to the `page-heroes` global so the `คนดีศรีเชียงราย` list page can manage eyebrow, title, subtitle, and hero image from Payload.
- **Frontend wiring:** Updated `/awards/khon-dee` to read hero content from the shared global with safe fallback copy when the CMS entry is still empty.

## Recent Work (Awards Expansion — 2026-06-26)
- **Modular awards IA:** Added `เยาวชนวัฒนธรรม` and `ครูภูมิปัญญาเมืองเชียงราย` under the `รางวัลเกียรติยศ` navigation group.
- **Payload CMS:** Added `wisdom-awards` and refined youth-awards admin labeling so award modules are easier to manage independently.
- **Frontend:** Added public routes for `/awards/youth-culture`, `/awards/youth-culture/[id]`, `/awards/wisdom-awards`, and `/awards/wisdom-awards/[id]`.
- **Docs:** Added a canonical modular awards architecture document covering the split collection strategy and public routing.

## Recent Work (Privacy & Terms — 2026-06-26)
- **Privacy Policy Page:** Created public route `/privacy` with comprehensive Thai PDPA-compliant terms.
- **Terms of Use Page:** Created public route `/terms` with acceptable use, limitation of liability, and Lanna cultural archive copyright clauses.
- **Footer Navigation:** Links at Footer now navigate to `/privacy` and `/terms` correctly.
- **Verification:** `npm run lint`, `npm run typecheck`, and `npm run build` pass.

## Recent Work (Calendar UI Polish — 2026-06-26)
- **Month Dropdown:** Removed the AD/CE year suffix from the month options text to keep it cleaner.
- **Year Dropdown & Heading:** Converted the year display on the calendar UI (both year select and title header) from CE to Thai Buddhist Era (BE) by adding +543, while maintaining the correct backend queries using CE values.

## Recent Work (SEO & GEO Enhancements — 2026-06-26)
- **Search Console Readiness:** Added `robots.ts` and dynamic `sitemap.ts` endpoints. Dynamic sitemap queries Payload CMS for districts, activities, heritage blogs, news, and all three categories of honor awards (khon-dee, wisdom-awards, youth-culture).
- **Dynamic Meta & Social Sharing:** Implemented Next.js `generateMetadata` for dynamic detail pages of all 7 sections to ensure correct search indexation and rich link previews (OpenGraph tags with covers/avatars).
- **Code Health & Type Safety:** Fixed typescript compiler errors in sitemap date mapping and district model summaries. Cleared unused imports.
- **Verification:** Verified with `npm run typecheck`, `npm run lint`, and `npm run build` passing 100%.

## Recent Work (Production Docker Setup — 2026-06-26)
- **Production Orchestration:** Created `docker-compose.prod.yml` configured to use Next.js standalone production build stage.
- **Data Persistence:** Integrated persistent volumes (`media_prod_data` mapping to `/app/media` and `mongodb_prod_data` mapping to `/data/db`) to guarantee media uploads and DB data persist across container restarts.
- **Security Hardening:** Hid MongoDB port 27017 from public access, exposing it only inside the internal Docker network.
- **Configuration Templates:** Created `.env.prod.example` for secure production environment management, and updated `docs/guides/DOCKER_GUIDE.md` with step-by-step production deployment commands.

## Recent Work (Production Optimization & Readiness — 2026-06-27)
- **Dynamic Imports:** Dynamically imported `CalendarView` in the calendar page, splitting off heavy calendar code and speeding up initial page loads.
- **Dynamic Image Domain & Optimization:** Configured `CmsImage.tsx` and `next.config.ts` to dynamically extract and add production/staging domains (and `cr-culture.com`) to image remote patterns, enabling full Next.js image optimization instead of using `unoptimized`.
- **Production Alignment:** Resolved hardcoded domains in sitemaps, robots, and metadata base layout to dynamically adapt to the production URL `https://cr-culture.com/`.
- **Cache Prevention:** Forced dynamic behavior (`force-dynamic`) on `/api/health` check endpoint.
- **Docker Optimization:** Re-architected Dockerfile production stage to base off clean alpine node and omit python3/make/g++, shrinking final image size by ~200-300MB.
- **Verification:** Verified with `npm run lint`, `npm run typecheck`, and production builds succeeding. Ran a Lighthouse audit against local production standalone server yielding scores of **99% Performance**, **85% Accessibility**, and **100% SEO**.
