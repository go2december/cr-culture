# Feature Specification: District Committee Profiles

## 1. Overview
- **Description**: แสดงข้อมูลคณะกรรมการสภาวัฒนธรรมระดับอำเภอในหน้ารายละเอียดอำเภอด้วย card layout ที่มีรูปโปรไฟล์ ตำแหน่ง และเบอร์โทรศัพท์
- **Goal**: ทำให้ผู้ใช้เห็นรายชื่อกรรมการอำเภอได้ชัดเจน อ่านง่าย ใช้งานบนมือถือได้ดี และติดต่อได้สะดวก
- **Status**: Completed

## 2. Scope
- แสดงข้อมูลกรรมการอำเภอในหน้า `src/app/(frontend)/districts/[slug]/page.tsx`
- ใช้ข้อมูลจาก collection `district-members`
- รองรับรูปภาพโปรไฟล์ เบอร์โทรศัพท์ และสถานะเปิดใช้งาน
- แสดง empty state เมื่อไม่มีข้อมูล

## 3. Requirements
- [x] ดึงข้อมูล `name`, `position`, `positionOrder`, `image`, `phone`, `isActive`
- [x] เปลี่ยนการแสดงผลจากลักษณะตารางเป็น card grid
- [x] รองรับ responsive layout: 1 / 2 / 3 columns
- [x] แสดงรูปโปรไฟล์แบบวงกลม
- [x] แสดง badge ตำแหน่งตามลำดับความสำคัญ
- [x] เบอร์โทรศัพท์กดโทรได้ผ่าน `tel:` link
- [x] มี default avatar เมื่อไม่มีรูปภาพ
- [x] มี empty state หากไม่มีกรรมการอำเภอ

## 4. Data Dependencies
- **Collection**: `district-members`
- **Related Collections**:
  - `district-board-positions`
  - `districts`
  - `media`
- **Key Fields**:
  - `name`
  - `position`
  - `positionOrder`
  - `district`
  - `image`
  - `phone`
  - `isActive`

## 5. UI/UX Notes
- ใช้ card-based layout แทน table
- รูปโปรไฟล์ทรงกลม ขนาดประมาณ 96x96
- badge ตำแหน่งวางเด่นใกล้รูปโปรไฟล์
- โค้ดสีตำแหน่ง:
  - President: `bg-primary`
  - Vice President / senior committee: `bg-secondary`
  - Member: `bg-base-200`
- card ควรมี hover state และ transition ที่นุ่มนวล
- ชื่อกรรมการควรอ่านง่าย จัดกลาง และจำกัดจำนวนบรรทัดเมื่อจำเป็น

## 6. Responsive Behavior
- Mobile: `grid-cols-1`
- Tablet: `sm:grid-cols-2`
- Desktop: `lg:grid-cols-3`
- ระยะห่าง card ใช้ประมาณ `gap-6`

## 7. Accessibility
- รูปภาพต้องมี `alt`
- ลิงก์เบอร์โทรต้อง focus ได้
- ควรคง contrast ของ badge และข้อความให้อ่านได้ชัด
- สามารถเพิ่ม ARIA label ให้ badge ตำแหน่งได้ในอนาคต

## 8. Technical Details
- **Page**: `src/app/(frontend)/districts/[slug]/page.tsx`
- **Data Mapping**:
  - map raw member data ให้พร้อมใช้ใน UI layer
  - fallback ตำแหน่งเป็น `กรรมการ` เมื่อข้อมูลไม่ครบ
  - fallback ลำดับเป็น `99`
- **Image Handling**:
  - ใช้ URL จาก media relation
  - ถ้าไม่มีรูป ให้แสดง default avatar state

## 9. Current Implementation Status
- ใช้งานได้แล้วในระดับ production-ready ตามเอกสารเดิม
- ยังมี enhancement ที่เป็นไปได้:
  - social links
  - email contact
  - biography modal
  - print-friendly view
  - ใช้ `next/image` อย่างเต็มรูปแบบ

## 10. Files Involved
- `src/app/(frontend)/districts/[slug]/page.tsx`
- legacy reference: `docs/implementations/DISTRICT_COMMITTEE_PROFILES.md`
