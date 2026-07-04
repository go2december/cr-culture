# Awards Honors: Modular Architecture

## Purpose
- แยกโมดูลรางวัลเกียรติยศตามประเภทอย่างชัดเจน เพื่อลดความสับสนในหน้า Admin ของ Payload CMS
- ใช้ข้อมูลอ้างอิงร่วมเฉพาะส่วนที่จำเป็น เช่น ปี พ.ศ. และสถาบัน/โรงเรียน
- รองรับการแสดงผลหน้า public แยกตามเมนูรางวัลแต่ละประเภทใน Next.js

## Admin Information Architecture

กลุ่มเมนู `รางวัลเกียรติยศ`

1. `คนดีศรีเชียงราย` สำหรับบุคคลหรือองค์กรที่ทำคุณประโยชน์หรือมีผลงานดีเด่นทางวัฒนธรรม
2. `รางวัลเยาวชนวัฒนธรรม` สำหรับผลงานคลิปและทีมเยาวชน
3. `ครูภูมิปัญญาเมืองเชียงราย` สำหรับปราชญ์หรือครูภูมิปัญญาแยกตามสาขาองค์ความรู้

Shared collections

1. `AwardYears`
2. `Institutions`
3. `Awardees`

## Payload Collections

### 1. `KhonDeeAwards`
- ใช้เก็บประวัติและผลงานของบุคคลหรือองค์กร
- ฟิลด์หลัก:
  - `year`
  - `category`
  - `prefix`
  - `fullName`
  - `profileImage`
  - `currentPosition`
  - `contributionTitle`
  - `contributionDetail`
  - `contactPhone`

### 2. `YouthAwardHistories`
- ใช้เก็บผลงานเยาวชนวัฒนธรรมรายชิ้น
- ฟิลด์หลัก:
  - `year`
  - `projectTitle`
  - `institution`
  - `awardees` สำหรับสมาชิกในทีม
  - `coverImage`
  - `videoUrl`
  - `projectSummary`

### 3. `WisdomAwards`
- ใช้เก็บทำเนียบครูภูมิปัญญาเมืองเชียงราย
- ฟิลด์หลัก:
  - `year`
  - `wisdomCategory`
  - `prefix`
  - `fullName`
  - `avatarImage`
  - `contributionDetail`

### 4. `AwardYears`
- ใช้เก็บปี พ.ศ. วันประกาศผล วันมอบรางวัล สถานที่ และประธานผู้ลงนาม

### 5. `Institutions`
- ใช้เก็บรายชื่อโรงเรียนหรือสถาบันต้นสังกัดที่อ้างอิงร่วมกันในโมดูลเยาวชน

### 6. `Awardees`
- ใช้เก็บรายชื่อนักเรียนหรือสมาชิกทีมแบบแยกรายบุคคล เพื่อนำไปเลือกใช้ซ้ำ


## Front-end Routing

1. `/awards/khon-dee`
2. `/awards/khon-dee/[id]`
3. `/awards/youth-culture`
4. `/awards/youth-culture/[id]`
5. `/awards/wisdom-awards`
6. `/awards/wisdom-awards/[id]`

## Public UX Notes

### คนดีศรีเชียงราย
- แสดงทำเนียบรายชื่อพร้อมรายละเอียดผลงานเชิงวัฒนธรรม

### เยาวชนวัฒนธรรม
- แสดงผลงานคลิป โรงเรียน สมาชิกในทีม และคลังภาพบรรยากาศปีเดียวกัน

### ครูภูมิปัญญาเมืองเชียงราย
- แสดงรายชื่อครูภูมิปัญญา แยกตามสาขาองค์ความรู้และปีที่ได้รับการเชิดชู

## Design Direction
- ใช้ visual language เดียวกับโมดูลรางวัลเดิม เพื่อให้ navbar และหน้าภายในต่อเนื่องกัน
- หน้า list ใช้ hero, filter block, และ card grid ที่อ่านง่ายบน desktop/mobile
- หน้า detail เน้นภาพนำ, metadata สำคัญ, เนื้อหารายละเอียด, และรายการที่เกี่ยวข้อง
