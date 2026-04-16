# Documentation Workflow

## Purpose
ไฟล์นี้กำหนดวิธีใช้เอกสารในโปรเจกต์ให้เป็นระบบสำหรับ Obsidian และ Windsurf โดยลด context ซ้ำและใช้ token อย่างมีประสิทธิภาพ

## Canonical Sources
- Project rules: `../../.windsurfrules`
- Current status: `../../STATUS.md`
- Documentation index: `../README.md`
- Workspace skills index: `../../.agent/skills/doc.md`
- Skill routing guide: `Skill_Routing_with_Obsidian.md`
- Development environment: `Development_Environment.md`
- Project roadmap: `Project_Roadmap.md`
- Site map and workflow: `Site_Map_and_Workflow.md`
- Meeting notes index: `../05_Meeting_Notes/README.md`
- Decision log: `../05_Meeting_Notes/Decision_Log.md`
- Feature specs: `../02_Features/`
- Database schema: `../03_Database/Schema.md`
- UI rules: `../04_UI_UX/Design_Tokens.md`

## Workflow
### 1. Start of task
- อ่าน `.windsurfrules` และ `STATUS.md`
- เลือกอ่านเฉพาะ note ที่เกี่ยวข้องกับงาน
- เลือก skill ที่เกี่ยวข้องจาก `.agent/skills/` โดยเริ่มจาก `doc.md` และ `Skill_Routing_with_Obsidian.md`
- ถ้างานเกี่ยวกับ environment หรือการรันระบบ ให้เริ่มที่ `Development_Environment.md`
- ถ้างานเกี่ยวกับ milestone หรือภาพรวมโปรเจกต์ ให้เริ่มที่ `Project_Roadmap.md`
- ถ้างานเกี่ยวกับขอบเขตระบบหรือ flow หลัก ให้เริ่มที่ `Site_Map_and_Workflow.md`

### 2. Feature work
- สร้างหรืออัปเดต spec ใน `02_Features/`
- ใช้ `99_Templates/Feature_Template.md` เป็นฐาน

### 3. UI work
- อ้างอิง `04_UI_UX/Design_Tokens.md`
- ถ้าเป็นงานออกแบบหรือปรับ UX ให้ใช้ `.agent/skills/ui-ux-pro-max/SKILL.md` และ scripts ของ skill ร่วมด้วย
- ถ้างานเป็นหน้าใหม่หรือ refactor ใหญ่ ให้เพิ่ม page note แยกต่างหาก

### 4. Data/CMS work
- อ้างอิง `03_Database/Schema.md`
- ถ้ามี collection ใหม่หรือเปลี่ยน schema ให้บันทึกสรุปไว้ในเอกสารเสมอ

### 5. End of task
- อัปเดต `STATUS.md` แบบสั้น
- ถ้ามีความรู้ใหม่ที่ใช้ซ้ำได้ ให้บันทึกลง docs ตามหมวดที่ถูกต้อง
- ถ้ามีการตัดสินใจเชิงระบบ ให้เพิ่ม entry ลง `../05_Meeting_Notes/Decision_Log.md`
- หากมีการเปลี่ยนแปลง skill usage หรือ command path ให้บันทึกไว้ใน `Skill_Routing_with_Obsidian.md`

## Token-Efficient Rules
- ใช้ context เฉพาะไฟล์ที่จำเป็น
- ไม่เก็บข้อมูลชุดเดียวกันซ้ำหลายที่
- เริ่มจากเอกสาร canonical ก่อน legacy docs

## Legacy Docs Policy
- โฟลเดอร์ `guides/`, `implementations/`, และ `workflow/` ใช้เพื่ออ้างอิงย้อนหลัง
- เอกสารใหม่ทั้งหมดให้เขียนในโครงสร้าง canonical เท่านั้น
- ถ้าข้อมูลใน legacy docs ยังมีประโยชน์ ให้สรุปหรือย้ายเข้าไฟล์ canonical ที่เหมาะสมแทนการอ้าง legacy docs โดยตรง
