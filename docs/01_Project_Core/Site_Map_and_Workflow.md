# Site Map, Workflow, and Tasks

## Purpose
เอกสาร canonical ฉบับเดียวสำหรับ 3 เรื่อง: ขอบเขตระบบ, workflow ระดับโปรเจกต์, และ task ปัจจุบันแบบย่อ

## Current State
- Milestone 1: Environment & Infrastructure - Complete
- Milestone 2: Data Schema & CMS - Complete
- Milestone 3: Frontend & Theme - Complete
- Milestone 4: Logic & Content Integration - In Progress
- Milestone 5: Production Readiness - In Progress

## Current Snapshot
- Core public pages, CMS schema, and admin routes are working end to end
- Page hero content is now driven by the `page-heroes` global across the main public pages
- District Network now includes an interactive map with district coordinates and detail navigation
- Frontend audit, media hardening, production build verification, typed public model mapping, and Docker/runtime parity validation have already been completed
- Remaining work is centered on real content import, post-import verification, and follow-up performance tuning as data volume grows

## Current Tasks
### Now
- Execute the first real content import batch for board, activities, heritage, and news
- Add verification around key content flows after the real data import lands
- Continue performance tuning as content volume increases

### Next
- Review remaining admin maintenance surfaces after the recent import-map compatibility fix
- Revisit deployment/runtime notes only if new host or container gaps appear after content import

### Done Recently
- Core public pages and admin routes are implemented
- CMS schema and main collections are in place
- Frontend UX/a11y audit on key public pages is complete
- Shared media handling was hardened for Payload uploads, public access, localhost URL normalization, and WebP output
- Shared public content and organization types were added to reduce `any` usage across the frontend
- `src/lib/payload.ts` was refactored with typed public model mapping to reduce query concentration and repeated casts
- Home, list pages, and content detail headers were standardized around the current background-header direction
- The district listing now uses an interactive Leaflet map backed by district coordinates and fallback map points
- Page hero data is centralized in the `page-heroes` global for consistent public page headings
- API health endpoint and container healthchecks were added for runtime parity
- Docker runtime parity now includes both development and production compose profiles validated against the shared health endpoint
- Production build passed after Payload/Next configuration fixes, frontend type cleanup, and Payload admin import-map compatibility fixes

## Public Site Map
### Home
- Hero
- Latest activities
- Heritage highlights
- District quick access

### About
- Provincial board
- Vision, mission, history

### Activities
- Activity listing
- Calendar
- Detail pages

### District Network
- District listing
- District listing with interactive map
- District detail: info, committee members, district activities

### Heritage
- Listing with filters/search
- Detail page
- Category and tag discovery

### News & PR
- News listing
- Media/documents
- Detail page

### Contact
- Contact page

## Admin Scope
Payload CMS manages:
- users
- board-positions
- district-board-positions
- provincial-board
- districts
- district-members
- activities
- heritage-blog
- tags
- news
- media
- about-page global
- page-heroes global

## Data Relationship Snapshot
- `BoardPositions <- ProvincialBoard.position`
- `DistrictBoardPositions <- DistrictMembers.position`
- `Districts <- DistrictMembers.district`
- `Districts <- Activities.district`
- `Districts <- HeritageBlog.relatedDistrict`
- `Tags <- HeritageBlog.tags`
- `Media <- multiple content/image fields`

## Use This File When
- ต้องการดูภาพรวมระบบแบบสั้น
- ต้องการดู workflow และ task ล่าสุดในที่เดียว
- ต้องการรู้ว่าตอนนี้ project ทำถึงไหนและควรทำอะไรต่อ

## Update Cadence
- อัปเดตสั้นๆ ทุกครั้งที่มี milestone เปลี่ยน, content import เพิ่ม, หรือ workflow execution เปลี่ยน
- ถ้าข้อมูลยาวหรือเชิงตัดสินใจ ให้สรุปไว้ใน `05_Meeting_Notes/Decision_Log.md`

## Supporting References
- `STATUS.md` สำหรับสถานะย่อรายรอบล่าสุด
- `Project_Roadmap.md` สำหรับ milestone view แยกเฉพาะ roadmap
- `Schema.md` สำหรับรายละเอียดความสัมพันธ์เชิง implementation

## Legacy Reference
- `docs/workflow/task-and-workflow.md`
