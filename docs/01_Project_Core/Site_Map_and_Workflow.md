# Site Map and Workflow

## Purpose
เอกสาร canonical สำหรับภาพรวม site map, ขอบเขต public/admin system, และ workflow ระดับ milestone ของโปรเจกต์

## Public Website Site Map
### 1. Home
- Hero section
- Latest provincial activities
- Cultural heritage highlights
- Quick access to district network

### 2. About
- Provincial board members
- Vision, mission, history

### 3. Activities
- Provincial activities listing
- Activity calendar
- Activity detail pages

### 4. District Network
- District listing page
- District detail page
  - district information
  - committee members
  - district-level activities

### 5. Heritage
- Heritage listing with filters
- Heritage detail page
- Category, tag, and search-based discovery

### 6. News & PR
- General news
- Video media
- Downloadable documents
- News detail page

### 7. Contact
- Contact page

## Admin System Scope
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

## Delivery Milestones
1. Environment & Infra
2. Data Schema & CMS
3. Frontend & Theme
4. Logic & Content Integration
5. Production Readiness

## Current State Summary
- Site structure is broadly implemented
- CMS schema is established
- Core pages exist
- Integration is mostly complete
- Remaining work centers on real content import, optimization, and production readiness

## Remaining Work Themes
- Content import and editorial population
- Performance tuning
- Deployment hardening
- Continued documentation cleanup

## Relationship Snapshot
- `BoardPositions <- ProvincialBoard.position`
- `DistrictBoardPositions <- DistrictMembers.position`
- `Districts <- DistrictMembers.district`
- `Districts <- Activities.district`
- `Districts <- HeritageBlog.relatedDistrict`
- `Tags <- HeritageBlog.tags`
- `Media <- multiple content/image fields`

## How to Use This File
- ใช้เพื่อทำความเข้าใจขอบเขตระบบแบบ top-down
- ใช้ร่วมกับ `Project_Roadmap.md` สำหรับมุมมอง milestone
- ใช้ร่วมกับ `Schema.md` สำหรับความสัมพันธ์เชิง implementation

## Legacy Reference
- `docs/workflow/task-and-workflow.md`
