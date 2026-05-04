# Documentation Workflow

## Purpose
ไฟล์นี้กำหนดวิธีใช้เอกสารในโปรเจกต์ให้เป็นระบบสำหรับ Obsidian และ Windsurf โดยลด context ซ้ำและใช้ token อย่างมีประสิทธิภาพ

## Start Here
- Project rules: `../../.windsurfrules`
- Status summary: `../../STATUS.md`
- Workflow + tasks: `Site_Map_and_Workflow.md`
- Docs index: `../README.md`
- Skill routing: `Skill_Routing_with_Obsidian.md`

## Workflow
### 1. Start of task
- อ่าน `.windsurfrules` และ `STATUS.md`
- เปิดเฉพาะ canonical doc ที่ตรงกับงาน
- ถ้าต้องใช้ skill ให้เริ่มจาก `.agent/skills/doc.md` และ `Skill_Routing_with_Obsidian.md`

### 2. Feature work
- อัปเดต spec ใน `02_Features/`
- ใช้ `99_Templates/Feature_Template.md` เมื่อต้องสร้างใหม่

### 3. UI work
- อ้างอิง `04_UI_UX/Design_Tokens.md`
- ถ้าเป็นงานออกแบบหรือปรับ UX ให้ใช้ skill ที่ map ไว้ใน `Skill_Routing_with_Obsidian.md`

### 4. Data/CMS work
- อ้างอิง `03_Database/Schema.md`
- ถ้ามี collection ใหม่หรือเปลี่ยน schema ให้สรุปไว้ใน docs ที่เกี่ยวข้อง

### 5. End of task
- อัปเดต `STATUS.md` แบบสั้น
- ถ้ามีความรู้ใหม่ที่ใช้ซ้ำได้ ให้บันทึกลง canonical docs ตามหมวด
- ถ้ามีการตัดสินใจเชิงระบบ ให้เพิ่ม entry ลง `../05_Meeting_Notes/Decision_Log.md`
- หากมีการเปลี่ยนแปลง skill usage หรือ command path ให้บันทึกไว้ใน `Skill_Routing_with_Obsidian.md`

## Token-Efficient Rules
- ใช้ context เฉพาะไฟล์ที่จำเป็น
- ไม่เก็บข้อมูลชุดเดียวกันซ้ำหลายที่
- เริ่มจากเอกสาร canonical ก่อน legacy docs

## Legacy Docs Policy
- โฟลเดอร์ `guides/`, `implementations/`, และ `workflow/` ใช้เพื่ออ้างอิงย้อนหลัง
- เอกสารใหม่ทั้งหมดให้เขียนในโครงสร้าง canonical เท่านั้น
- ถ้าข้อมูลใน legacy docs ยังมีประโยชน์ ให้สรุปเข้าไฟล์ canonical ที่เหมาะสมแทนการอ้างตรง
