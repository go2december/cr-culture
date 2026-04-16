# Skill Routing with Obsidian

## Purpose
ไฟล์นี้กำหนดวิธีเลือกและใช้งาน workspace skills ใน `.agent/skills/` ให้สอดคล้องกับโครง canonical ของ Obsidian และลด context ซ้ำ

## Related Decision
- `../05_Meeting_Notes/Decision_Log.md#decision-skill-to-obsidian-canonical-routing-standard`

## Canonical Skill Entry Points
- Skill index: `../../.agent/skills/doc.md`
- UI/UX skill: `../../.agent/skills/ui-ux-pro-max/SKILL.md`
- Next.js/React performance: `../../.agent/skills/nextjs-react-expert/SKILL.md`
- Architecture decisions: `../../.agent/skills/architecture/SKILL.md`
- Lint and validation: `../../.agent/skills/lint-and-validate/SKILL.md`

## Routing Rules
1. เริ่มทุกงานด้วย `.windsurfrules` + `STATUS.md` + `Documentation_Workflow.md`
2. เลือก skill เฉพาะงานจาก `.agent/skills/doc.md` เท่านั้น
3. โหลดเฉพาะ `SKILL.md` ที่เกี่ยวข้อง หลีกเลี่ยงโหลดหลาย skill โดยไม่จำเป็น
4. เมื่อใช้ skill แล้ว ให้บันทึกผลลง canonical docs ตามหมวดงาน

## Skill-to-Doc Mapping
- UI/UX changes:
  - Skill: `ui-ux-pro-max`
  - Docs: `../04_UI_UX/Design_Tokens.md`
  - Feature spec: `../02_Features/<feature>.md`
- Performance optimization:
  - Skill: `nextjs-react-expert`
  - Docs: `../01_Project_Core/Project_Roadmap.md` (progress/milestone impact)
- Architecture or system decisions:
  - Skill: `architecture`
  - Docs: `../05_Meeting_Notes/Decision_Log.md`
- Quality gate after edits:
  - Skill: `lint-and-validate`
  - Docs: `../../STATUS.md` (result summary)

## Command Path Standard (Workspace)
สำหรับ scripts ใน skill ให้ใช้พาธจาก root ของโปรเจกต์ดังนี้:
- `.agent/skills/ui-ux-pro-max/scripts/search.py`
- `.agent/skills/lint-and-validate/scripts/lint_runner.py`

ตัวอย่าง:
```bash
py -3.12 .agent/skills/ui-ux-pro-max/scripts/search.py "government portal accessibility" --design-system -p "CR-Culture"
```

## End-of-Task Logging
- ถ้า skill usage ทำให้เกิดมาตรฐานใหม่ ให้เพิ่ม entry ใน `../05_Meeting_Notes/Decision_Log.md`
- ถ้าเป็นการทำงานปกติ ให้สรุปสั้นใน `../../STATUS.md`
