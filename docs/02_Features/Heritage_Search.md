# Feature Specification: Heritage Search

## 1. Overview
- **Description**: ระบบค้นหาบทความคลังมรดกภูมิปัญญาในหน้า `/heritage` รองรับ keyword search และทำงานร่วมกับ category/tag filters
- **Goal**: ช่วยให้ผู้ใช้ค้นหาบทความที่ต้องการได้เร็วขึ้น โดยไม่ต้องไล่ดูรายการทั้งหมด
- **Status**: Completed

## 2. Scope
- เพิ่ม search parameter ให้ `getHeritageBlogs()`
- สร้าง search UI และ active filters UI
- เชื่อม search กับหน้า `src/app/(frontend)/heritage/page.tsx`
- รักษา filter state ผ่าน URL และ pagination

## 3. Requirements
- [x] ค้นหาด้วย keyword
- [x] ค้นหาใน `title`, `excerpt`, และ `content`
- [x] ค้นหาแบบ case-insensitive
- [x] รองรับ debounced search (`300ms`)
- [x] อัปเดต URL อัตโนมัติเมื่อค้นหา
- [x] reset pagination เมื่อมี search ใหม่
- [x] แสดง active filters พร้อมลบทีละตัวได้
- [x] ใช้งานร่วมกับ category และ tag filters ได้
- [x] pagination ต้อง preserve filters ทั้งหมด
- [x] มี empty state เมื่อไม่พบผลลัพธ์

## 4. Search Parameters
- `search`: keyword
- `category`: category slug/value
- `tag`: tag slug
- `page`: pagination page
- future candidates from design phase:
  - `author`
  - `district`

## 5. Searchable Fields
- `title` — high priority
- `excerpt` — high priority
- `content` — full article content

## 6. UI Components
- **SearchBox**
  - location: `src/components/heritage/SearchBox.tsx`
  - behavior:
    - debounce 300ms
    - clear button
    - search icon
    - auto-update URL
- **ActiveFilters**
  - location: `src/components/heritage/ActiveFilters.tsx`
  - behavior:
    - show active search/category/tag
    - remove individual filters
    - clear all filters

## 7. UI/UX Notes
- Search box อยู่ด้านบนของ sidebar
- focus state ใช้โทน `primary`
- active filter badges ใช้พื้นหลัง `primary/10` หรือใกล้เคียง
- ควรแสดง query ใน page title หรือ result summary
- empty state ควรสื่อสาร keyword ที่ค้นหาและมีทางกลับไปยังรายการทั้งหมด

## 8. Technical Details
- **API Utility**: `src/lib/payload.ts`
- **Page**: `src/app/(frontend)/heritage/page.tsx`
- **Components**:
  - `src/components/heritage/SearchBox.tsx`
  - `src/components/heritage/ActiveFilters.tsx`
- **Search Logic**:
  - normalize keyword เป็น lowercase
  - filter เอกสารด้วย `includes()` บน `title`, `excerpt`, `JSON.stringify(content)`
  - ใช้ post-filtering เพื่อให้ผลลัพธ์แม่นยำ

## 9. URL Examples
- `/heritage`
- `/heritage?search=ผ้าทอ`
- `/heritage?search=ผ้า&category=intangible-heritage`
- `/heritage?search=ผ้า&tag=pha-tho`
- `/heritage?search=ผ้า&category=intangible-heritage&tag=pha-tho&page=2`

## 10. Performance Notes
- เหมาะกับ dataset ขนาดเล็กถึงกลาง
- debounce 300ms ช่วยลดการอัปเดตถี่เกินไป
- มีข้อเสนอในอนาคตสำหรับ MongoDB text index หรือ external search service หากข้อมูลโตมากขึ้น

## 11. Future Enhancements
- author filter
- district filter
- relevance scoring
- autocomplete / suggestions
- highlighted search terms
- search analytics

## 12. Files Involved
- `src/lib/payload.ts`
- `src/app/(frontend)/heritage/page.tsx`
- `src/components/heritage/SearchBox.tsx`
- `src/components/heritage/ActiveFilters.tsx`
- legacy references:
  - `docs/implementations/SEARCH_FEATURE_DESIGN.md`
  - `docs/implementations/SEARCH_FEATURE_IMPLEMENTATION.md`
