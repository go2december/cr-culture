# Feature Specification: Heritage Tag Filter

## 1. Overview
- **Description**: ระบบกรองบทความคลังมรดกภูมิปัญญาตาม tag จาก Payload CMS ในหน้า `/heritage`
- **Goal**: ช่วยให้ผู้ใช้สำรวจบทความตามหัวข้อ/แท็กได้ง่ายขึ้น และให้การจัดหมวดหมู่จาก CMS ถูกใช้งานจริงบนหน้าเว็บ
- **Status**: Completed

## 2. Scope
- ดึงรายการ tags แบบ dynamic จาก collection `tags`
- เพิ่มการกรองใน `getHeritageBlogs()` ผ่าน `tagSlug`
- แสดงรายการ tag ใน sidebar พร้อม active state
- รักษา tag filter ใน URL และ pagination

## 3. Requirements
- [x] เพิ่ม utility `getTags()`
- [x] รองรับ parameter `tagSlug` ใน `getHeritageBlogs()`
- [x] แปลง `tagSlug` เป็น tag ID ก่อน query heritage blog
- [x] แสดง tags ทั้งหมดจากฐานข้อมูล
- [x] แสดง active tag state
- [x] มี clear filter action
- [x] ทำงานร่วมกับ category filter ได้
- [x] pagination preserve tag filter
- [x] แสดง empty state เมื่อไม่มี tags หรือไม่มีผลลัพธ์

## 4. Data Dependencies
- **Collection**: `tags`
- **Related Feature Collection**: `heritage-blog`
- **Key Fields**:
  - `tags.name`
  - `tags.slug`
  - `tags.description`
  - `tags.color`
  - `heritage-blog.tags`

## 5. Data Flow
1. ผู้ใช้กด tag ใน sidebar
2. URL เปลี่ยนเป็น `?tag=<slug>`
3. หน้า heritage re-render ตาม `searchParams`
4. `getHeritageBlogs({ tagSlug })` ค้น tag จาก slug
5. ใช้ tag ID ไปกรอง `heritage-blog`
6. คืนผลลัพธ์ที่ match tag นั้น

## 6. UI/UX Notes
- section แท็กอยู่ใน sidebar ของหน้า heritage
- active tag ใช้ visual emphasis แบบโทน `primary`
- มีปุ่ม/ลิงก์ `ล้าง` เมื่อมี tag ที่ถูกเลือก
- page title หรือ result summary ควรสะท้อน tag ที่ active อยู่
- รองรับการใช้งานร่วมกับ category filter

## 7. URL Examples
- `/heritage?tag=pha-tho`
- `/heritage?category=intangible-heritage&tag=pha-tho`
- `/heritage?tag=pha-tho&page=2`

## 8. Technical Details
- **API Utility**: `src/lib/payload.ts`
  - `getTags()`
  - `getHeritageBlogs({ tagSlug })`
- **Page**: `src/app/(frontend)/heritage/page.tsx`
- **Query Strategy**:
  - find tag by slug
  - if found, filter heritage docs by related tag ID

## 9. Current Limitations
- ยังไม่มี tag search input
- ยังไม่แสดง article count ต่อ tag
- ยังไม่ใช้ `tags.color` จาก CMS อย่างเต็มรูปแบบ
- ยังไม่รองรับ multi-tag AND/OR logic

## 10. Future Enhancements
- tag count display
- tag color mapping from CMS
- tooltip/description for tags
- multi-select tag logic
- tighter integration with search filters UI

## 11. Files Involved
- `src/lib/payload.ts`
- `src/app/(frontend)/heritage/page.tsx`
- legacy reference: `docs/implementations/TAGS_FILTER_IMPLEMENTATION.md`
