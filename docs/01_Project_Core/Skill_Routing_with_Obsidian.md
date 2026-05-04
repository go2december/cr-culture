# Skill Routing with Obsidian

## Purpose
ไฟล์นี้กำหนดวิธีเลือกและใช้งาน workspace skills ใน `.agent/skills/` ให้สอดคล้องกับ canonical docs และลด context ซ้ำ

## Related Decision
- `../05_Meeting_Notes/Decision_Log.md#decision-skill-to-obsidian-canonical-routing-standard`

## Canonical Skill Entry Points
- Skill index: `../../.agent/skills/doc.md`
- UI/UX skill: `../../.agent/skills/ui-ux-pro-max/SKILL.md`
- Next.js/React performance: `../../.agent/skills/nextjs-react-expert/SKILL.md`
- Architecture decisions: `../../.agent/skills/architecture/SKILL.md`
- Lint and validation: `../../.agent/skills/lint-and-validate/SKILL.md`

## Routing Rules
1. เริ่มทุกงานด้วย `.windsurfrules` + `STATUS.md` + `Site_Map_and_Workflow.md`
2. เลือก skill เฉพาะงานจาก `.agent/skills/doc.md` เท่านั้น
3. โหลดเฉพาะ `SKILL.md` ที่เกี่ยวข้อง หลีกเลี่ยงโหลดหลาย skill โดยไม่จำเป็น
4. เมื่อใช้ skill แล้ว ให้บันทึกผลลง canonical docs ตามหมวดงาน

## Canonical Flow
- ใช้ `Site_Map_and_Workflow.md` เมื่อต้องรู้ขอบเขตงาน, workflow, และ task ปัจจุบัน
- ใช้ `STATUS.md` เมื่อต้องการสถานะย่อล่าสุด
- ใช้ `Documentation_Workflow.md` เมื่อต้องทำงานด้านโครงสร้างเอกสารหรือรูปแบบเอกสารโดยตรง

## Skill-to-Doc Mapping
- UI/UX changes: `ui-ux-pro-max` -> `../04_UI_UX/Design_Tokens.md` + `../02_Features/<feature>.md`
- Performance optimization: `nextjs-react-expert` -> `../01_Project_Core/Project_Roadmap.md`
- Architecture/system decisions: `architecture` -> `../05_Meeting_Notes/Decision_Log.md`
- Quality gate after edits: `lint-and-validate` -> `../../STATUS.md`

## Command Path Standard (Workspace)
สำหรับ scripts ใน skill ให้ใช้พาธจาก root ของโปรเจกต์:
- `.agent/skills/ui-ux-pro-max/scripts/search.py`
- `.agent/skills/lint-and-validate/scripts/lint_runner.py`

Example:
```bash
py -3.12 .agent/skills/ui-ux-pro-max/scripts/search.py "government portal accessibility" --design-system -p "CR-Culture"
```

## End-of-Task Logging
- ถ้า skill usage ทำให้เกิดมาตรฐานใหม่ ให้เพิ่ม entry ใน `../05_Meeting_Notes/Decision_Log.md`
- ถ้าเป็นการทำงานปกติ ให้สรุปสั้นใน `../../STATUS.md`
