## Decision: Documentation Workflow Standard for Feature Development
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../01_Project_Core/Documentation_Workflow.md`
  - `../99_Templates/Feature_Template.md`

### Context
- ไม่มี standard workflow เดียวกันสำหรับการเขียน feature documentation ทำให้เอกสารอาจขาดข้อมูลหรือวางตำแหน่งไม่ตรงทางเดียวกัน
- ผู้พัฒนากับ Agent ต้องรู้ว่าควรเรียมอะไรและเขียนโดยมีเป้าหมายชัดเจน

### Decision
- Feature ใหม่ทั้งหมดต้องเริ่มจาก template `docs/99_Templates/Feature_Template.md` วางลงใน `docs/02_Features/`
- ไฟล์ spec นี้ต้องมี sections: Overview, Context/Motivation, Requirements, UI/UX Approach, Data Model, Implementation Notes
- ทำ spec ให้เสร็จก่อนเริ่ม code implementation เพื่อให้ทีมอ่านและ align ได้ก่อนทำเสีย
- Update STATUS.md เมื่องาน feature เข้มขัดเข้ามาใหม่ และ Decision Log ถ้ามีการตัดสินใจระบบใหม่

### Consequences
- Positive:
  - feature docs เป็นระบบเดียวกัน อ่าน maintain ง่ายขึ้น
  - spec ก่อน code ช่วยลดปัญหาสุมปะโลมที่เชื้อสายทีม
  - Agent มีรูปแบบชัดเจนให้ทำความเข้าใจ feature ที่อยากจะ implement
- Trade-offs:
  - ต้องใช้เวลาเขียน spec เสียก่อนเริ่ม coding
  - Feature เล็กน้อยอาจอบเน่า spec ที่ verbose เกินไป แต่ยังคงต้องเขียนให้ครบ

### Follow-up
- ทบทวนและปรับ Feature_Template.md ถ้าพบ sections ที่ไม่จำเป็นหรือหายไป

---

## Decision: Legacy Documentation Deprecation and Migration Policy
- **Date**: 2026-04-16
- **Status**: Accepted
- **Related Meeting Note**: `Sessions/2026-04-16_obsidian-documentation-system.md`
- **Related Docs**:
  - `../01_Project_Core/Documentation_Workflow.md`

### Context
- โปรเจกต์มี legacy docs ใน `implementations/`, `guides/`, `workflow/` folders ที่ยังมีข้อมูลเก่าและข้อมูลดีบ้าง
- ไม่ชัดว่า docs ไหนควรอ้าง docs ไหนหลีกเลี่ยง ทำให้ Agent มึนงง

### Decision
- ประกาศ legacy docs เป็น historical reference เท่านั้น (ไม่ใช่ source of truth)
- ให้ Agents ใช้ canonical docs ใน `01_Project_Core/`, `02_Features/`, `03_Database/`, `04_UI_UX/` เป็น priority หลัก
- ถ้าหา legacy docs ที่ยังมีคุณค่า ให้ summarize หรือ migrate ข้อมูลนั้นเข้าไป canonical docs ที่เหมาะสม แทนการอ้าง legacy docs โดยตรง
- เมื่อจบ feature/task ควร check ว่ามี legacy info ที่ยังมีประโยชน์ - ถ้ามี ให้ move/summarize เข้า canonical
- ไม่ต้องลบ legacy folders สำหรับตอนนี้ (เก็บไว้เพื่อ git history) แต่ให้อัปเดต README ใน legacy folder บอกว่า "Deprecated - for reference only"

### Consequences
- Positive:
  - ลดความสับสนใน Agent ว่าควรอ้างไหน
  - ข้อมูลที่มีคุณค่า migrate ขึ้นมา canonical ทำให้ไม่หาย
  - ทำให้ clean transition ไประบบเอกสารใหม่ค่อยๆ ไม่เฉียบพลัน
- Trade-offs:
  - ต้องใช้เวลา migrate ข้อมูลดีจาก legacy docs บ้าง
  - Git history ยังมี legacy folders อยู่ทำให้ repo ยังมีเอกสารเดิมอยู่

### Follow-up
- สร้าง README ใน legacy folder directories ให้ชี้ว่า "See /docs/01_Project_Core/, /docs/02_Features/ for latest docs"
- ให้ Agent/developer นิสัยปกติคือเมื่อจบงาน ให้ check ว่ามี legacy info ที่ควร migrate ขึ้นมา
