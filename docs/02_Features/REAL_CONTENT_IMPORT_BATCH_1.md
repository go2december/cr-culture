# Feature Specification: Real Content Import Batch 1

## 1. Overview
- Description: นำเข้าข้อมูลจริงชุดแรกเข้าสู่ระบบ Payload CMS สำหรับกรรมการจังหวัด/อำเภอ กิจกรรม และข่าว/บทความมรดกวัฒนธรรม
- Goal: ให้หน้า public ของเว็บไซต์แสดงข้อมูลจริงแทนข้อมูลตัวอย่าง พร้อมโครงสร้างข้อมูลที่สอดคล้องกับ schema ปัจจุบัน
- Status: Draft

## 2. Requirements
- [ ] เตรียมชุดข้อมูลจริงที่ต้องนำเข้า (districts, district-members, activities, news, heritage-blog)
- [ ] ตรวจสอบฟิลด์บังคับให้ครบตาม `docs/03_Database/Schema.md`
- [ ] รองรับความสัมพันธ์ข้อมูลหลัก เช่น district-member -> district
- [ ] จัดการ media ให้ผ่าน `media` collection แบบรวมศูนย์
- [ ] ต้องไม่ทำให้หน้าเดิมพัง (no regression) หลัง import

## 3. UI/UX Notes
- อ้างอิง Design Tokens: `../04_UI_UX/Design_Tokens.md`
- ตรวจสอบผลกระทบหน้า:
  - `src/app/(frontend)/districts/page.tsx`
  - `src/app/(frontend)/districts/[slug]/page.tsx`
  - `src/app/(frontend)/activities/page.tsx`
  - `src/app/(frontend)/activities/calendar/page.tsx`
  - `src/app/(frontend)/news/page.tsx`
  - `src/app/(frontend)/heritage/page.tsx`
- หากข้อมูลยาวหรือภาพขนาดใหญ่ ให้คง readability และโหลดเร็วตามแนวทางเดิม

## 4. Technical Details
- API Routes:
  - `src/app/api/seed/route.ts` (ใช้/ปรับเพื่อ import)
- Database Collections:
  - `src/collections/Districts.ts`
  - `src/collections/DistrictMembers.ts`
  - `src/collections/Activities.ts`
  - `src/collections/News.ts`
  - `src/collections/HeritageBlog.ts`
  - `src/collections/Media.ts`
- Components/Data Access:
  - `src/lib/payload.ts` (ตรวจการอ่านข้อมูลหลัง import)

## 4.1 Mapping Table (Source -> Payload)

### Districts (`districts`)
| Source field | Payload field | Type/Format | Required | Notes |
|---|---|---|---|---|
| district_name | name | text | Yes | ชื่ออำเภอภาษาไทย |
| district_slug | slug | text (unique) | Yes | kebab-case, ไม่ซ้ำ |
| district_code | code | text | No | เช่น 5701 |
| district_description | description | textarea | No | รายละเอียดสั้น |
| lat | latitude | number | No | ทศนิยม |
| lng | longitude | number | No | ทศนิยม |
| address | contact.address | textarea | No | ที่อยู่ |
| phone | contact.phone | text | No | normalize รูปแบบเดียวกัน |
| email | contact.email | email | No | ต้องเป็น email format |
| facebook_url | contact.facebook | text | No | URL |
| logo_media_key | image | upload(media id) | No | map ผ่าน media ที่ import แล้ว |
| cover_media_key | coverImage | upload(media id) | No | map ผ่าน media ที่ import แล้ว |
| display_order | order | number | No | default 99 หากไม่มี |
| active_flag | isActive | checkbox | No | default true |

### District Members (`district-members`)
| Source field | Payload field | Type/Format | Required | Notes |
|---|---|---|---|---|
| full_name | name | text | Yes | ชื่อ-นามสกุล |
| position_title | position | relationship | Yes | map title -> district-board-positions.id |
| position_order | positionOrder | number | No | default 99 |
| district_slug | district | relationship | Yes | map slug -> districts.id |
| profile_media_key | image | upload(media id) | No | map ผ่าน media |
| phone | phone | text | No | normalize รูปแบบเดียวกัน |
| active_flag | isActive | checkbox | No | default true |

### Activities (`activities`)
| Source field | Payload field | Type/Format | Required | Notes |
|---|---|---|---|---|
| title | title | text | Yes | ชื่อกิจกรรม |
| slug | slug | text (unique) | Yes | kebab-case |
| start_date | date | date | Yes | ISO-8601 |
| end_date | endDate | date | No | ISO-8601 |
| level | level | select(province/district) | Yes | ค่าต้องตรง options |
| district_slug | district | relationship | Conditional | ต้องมีเมื่อ level=district |
| cover_media_key | coverImage | upload(media id) | No | map ผ่าน media |
| summary | summary | textarea (<=300) | No | ตัดความยาวถ้าเกิน |
| content_richtext | content | richText | No | แปลงจาก plain/html ตามรูปแบบ seed |
| location | location | text | No | สถานที่ |
| published_flag | isPublished | checkbox | No | default true |
| featured_flag | isFeatured | checkbox | No | default false |

### News (`news`)
| Source field | Payload field | Type/Format | Required | Notes |
|---|---|---|---|---|
| title | title | text | Yes | หัวข้อข่าว |
| slug | slug | text (unique) | Yes | kebab-case |
| type | type | select(general/video/document) | Yes | ค่าต้องตรง options |
| published_at | publishedAt | date | Yes | ISO-8601 |
| cover_media_key | coverImage | upload(media id) | No | map ผ่าน media |
| excerpt | excerpt | textarea (<=300) | No | ตัดความยาวถ้าเกิน |
| content_richtext | content | richText | Conditional | ใช้เมื่อ type != document |
| video_url | videoUrl | text | Conditional | ใช้เมื่อ type=video |
| document_media_key | document | upload(media id) | Conditional | ใช้เมื่อ type=document |
| published_flag | isPublished | checkbox | No | default true |
| pinned_flag | isPinned | checkbox | No | default false |

### Heritage Blog (`heritage-blog`)
| Source field | Payload field | Type/Format | Required | Notes |
|---|---|---|---|---|
| title | title | text | Yes | ชื่อบทความ |
| slug | slug | text (unique) | Yes | kebab-case |
| category | category | select | Yes | intangible-heritage/learning-resources/local-wisdom |
| cover_media_key | coverImage | upload(media id) | No | map ผ่าน media |
| excerpt | excerpt | textarea (<=500) | No | ตัดความยาวถ้าเกิน |
| content_richtext | content | richText | Yes | ต้องไม่ว่าง |
| tag_names | tags | relationship(hasMany) | No | map name -> tags.id |
| district_slug | relatedDistrict | relationship | No | map slug -> districts.id |
| author_name | author | text | No | ผู้เขียน |
| source_ref | source | text | No | แหล่งที่มา |
| published_flag | isPublished | checkbox | No | default true |
| featured_flag | isFeatured | checkbox | No | default false |

### Media (`media`)
| Source field | Payload field | Type/Format | Required | Notes |
|---|---|---|---|---|
| file_path_or_url | file upload body | binary | Yes | ต้องเป็น mime ที่อนุญาต |
| alt_text | alt | text | No | แนะนำให้ใส่เพื่อ accessibility |
| caption_text | caption | text | No | คำบรรยาย |

## 4.2 Import Execution Rules
- Import order: media -> districts -> district-board-positions (ถ้าต้องเพิ่ม) -> district-members -> activities -> news -> heritage-blog
- Unique constraints: `slug` ใน districts/activities/news/heritage-blog ต้องไม่ซ้ำ
- Relationship resolution ใช้ lookup map ล่วงหน้า เช่น `districtSlugToId`, `positionTitleToId`, `tagNameToId`, `mediaKeyToId`
- Dry-run ต้องรายงานสถิติ: total, created, updated, skipped, failed พร้อมเหตุผลต่อ record
- สำหรับ field conditional (`news.type`, `activities.level`) ให้ validate ก่อนส่งเข้า Payload

## 5. Tasks
- [ ] รวบรวมและทำความสะอาดข้อมูลจริง (normalize ชื่อเขต, วันที่, เบอร์โทร, URL)
- [ ] วาง mapping ตารางข้อมูล -> schema Payload
- [ ] ทดสอบ import แบบ dry-run กับข้อมูลย่อย
- [ ] import ข้อมูล Batch 1 ผ่าน route/script ที่กำหนด
- [ ] ตรวจสอบความถูกต้องหน้า frontend หลักหลัง import
- [ ] อัปเดต `STATUS.md` หลังจบ batch
- [ ] ถ้ามีการตัดสินใจระบบใหม่ ให้เพิ่มใน `../05_Meeting_Notes/Decision_Log.md`

## 6. Start Checklist (Canonical)
- [ ] อ่าน `.windsurfrules`
- [ ] อ่าน `STATUS.md`
- [ ] อ่าน `docs/01_Project_Core/Documentation_Workflow.md`
- [ ] อ่าน `docs/03_Database/Schema.md` ก่อนเริ่ม mapping/import
- [ ] ยืนยันลำดับงาน: spec -> validate data -> import -> verify pages

## 7. Done Criteria
- [ ] มีข้อมูลจริงอย่างน้อย 1 ชุดต่อ collection เป้าหมาย
- [ ] หน้า districts, activities, news, heritage แสดงผลด้วยข้อมูลจริงได้
- [ ] ไม่มี error ใหม่ในเส้นทางหลักของ frontend
- [ ] ทีมสามารถทำ Batch 2 ต่อได้จากแนวทางเดียวกัน
