# Site Map, Workflow, and Tasks

## Purpose
เอกสาร canonical ฉบับเดียวสำหรับ 3 เรื่อง: ขอบเขตระบบ, workflow ระดับโปรเจกต์, และ task ปัจจุบันแบบย่อ

## Current State
- Milestone 1: Environment & Infrastructure - Complete
- Milestone 2: Data Schema & CMS - Complete
- Milestone 3: Frontend & Theme - Complete
- Milestone 4: Logic & Content Integration - In Progress
- Milestone 5: Production Readiness - In Progress

## Current Tasks
### Now
- Execute real content import batch แรกสำหรับ board, activities, heritage, และ news
- Refactor `src/lib/payload.ts` ให้ลด query concentration และคืนค่าที่สอดคล้องกับ shared public models มากขึ้น
- Close production-readiness gap ที่เหลือ เช่น health check, Docker optimization, และ admin/runtime parity

### Next
- Add verification around key content flows after real data import
- Continue performance tuning where content volume increases
- Review remaining admin maintenance surfaces after the recent import-map compatibility fix

### Done Recently
- Core public pages and admin routes are implemented
- CMS schema and main collections are in place
- Frontend UX/a11y audit on key public pages is complete
- Shared media handling was hardened for Payload uploads, public access, localhost URL normalization, and WebP output
- Shared public content and organization types were added to reduce `any` usage across the frontend
- Home, list pages, and content detail headers were standardized around the current background-header direction
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

## Supporting References
- `STATUS.md` สำหรับสถานะย่อรายรอบล่าสุด
- `Project_Roadmap.md` สำหรับ milestone view แยกเฉพาะ roadmap
- `Schema.md` สำหรับรายละเอียดความสัมพันธ์เชิง implementation

## Legacy Reference
- `docs/workflow/task-and-workflow.md`
