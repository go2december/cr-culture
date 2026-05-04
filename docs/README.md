# CR-Culture Documentation
 
 เอกสารชุดนี้เป็นสารบัญกลางแบบ canonical สำหรับ Obsidian และ Windsurf เพื่อชี้ไปยังแหล่งข้อมูลหลัก ลดบริบทซ้ำ และทำให้การอ้างอิงเอกสารเป็นระบบ

## Source of Truth
- ภาพรวมระบบ + workflow + task ล่าสุด: `01_Project_Core/Site_Map_and_Workflow.md`
- สถานะล่าสุดแบบย่อรายรอบ: `../STATUS.md`
- roadmap ระดับ milestone: `01_Project_Core/Project_Roadmap.md`
 
 ## แหล่งอ้างอิงหลัก
 - ภาพรวมโปรเจกต์: `../README.md`
 - กฎและบริบทของโปรเจกต์: `../.windsurfrules`
 - สถานะล่าสุดแบบย่อ: `../STATUS.md`
 - แนวทางเอกสารและ workflow: `01_Project_Core/Documentation_Workflow.md`
 - Workspace skills: `../.agent/skills/`
 
 ## Canonical Structure
 
 ### Project Core
 - [Documentation_Workflow.md](01_Project_Core/Documentation_Workflow.md)
 - [Site_Map_and_Workflow.md](01_Project_Core/Site_Map_and_Workflow.md) ← source of truth สำหรับ workflow + task
 - [Skill_Routing_with_Obsidian.md](01_Project_Core/Skill_Routing_with_Obsidian.md)
 - [Development_Environment.md](01_Project_Core/Development_Environment.md)
 - [Project_Roadmap.md](01_Project_Core/Project_Roadmap.md)
 
 ### Features
 - สเปคและรายละเอียดฟีเจอร์ใหม่ ให้เก็บใน `02_Features/`
 - ใช้ template จาก `99_Templates/Feature_Template.md`
 - [District_Committee_Profiles.md](02_Features/District_Committee_Profiles.md)
 - [Heritage_Search.md](02_Features/Heritage_Search.md)
 - [Heritage_Tag_Filter.md](02_Features/Heritage_Tag_Filter.md)
 
 ### Database
 - [Schema.md](03_Database/Schema.md)
 
 ### UI/UX
 - [Design_Tokens.md](04_UI_UX/Design_Tokens.md)
 
 ### Meeting Notes
 - [README.md](05_Meeting_Notes/README.md)
 - [Decision_Log.md](05_Meeting_Notes/Decision_Log.md)
 - บันทึกการคุย การตัดสินใจ และ next steps ให้เก็บใน `05_Meeting_Notes/`
 
 ### Templates
 - [Feature_Template.md](99_Templates/Feature_Template.md)
 - [Page_Template.md](99_Templates/Page_Template.md)
 - [Collection_Template.md](99_Templates/Collection_Template.md)
 - [Bug_Report_Template.md](99_Templates/Bug_Report_Template.md)
 - [Meeting_Note_Template.md](99_Templates/Meeting_Note_Template.md)
 - [Decision_Log_Entry_Template.md](99_Templates/Decision_Log_Entry_Template.md)
 - [Workflow_Template.md](99_Templates/Workflow_Template.md)
 
 ## Legacy Documents
 
 เอกสารเก่าใน `guides/`, `implementations/`, และ `workflow/` ยังเก็บไว้เพื่ออ้างอิงย้อนหลัง แต่ไม่ควรใช้เป็น canonical path สำหรับเอกสารใหม่
  
 หมายเหตุ: ฟีเจอร์สำคัญจาก `implementations/` ถูกสรุปเป็น canonical feature specs แล้วใน `02_Features/`
 หมายเหตุ: เอกสาร environment, roadmap, และ site map/workflow หลัก ถูกสรุปเป็น canonical docs แล้วใน `01_Project_Core/`
 
 ### Guides
 - [DOCKER_GUIDE.md](guides/DOCKER_GUIDE.md)
 - [PROGRESS_REPORT.md](guides/PROGRESS_REPORT.md)
 
 ### Implementations
 - [DISTRICT_COMMITTEE_PROFILES.md](implementations/DISTRICT_COMMITTEE_PROFILES.md)
 - [SEARCH_FEATURE_DESIGN.md](implementations/SEARCH_FEATURE_DESIGN.md)
 - [SEARCH_FEATURE_IMPLEMENTATION.md](implementations/SEARCH_FEATURE_IMPLEMENTATION.md)
 - [TAGS_FILTER_IMPLEMENTATION.md](implementations/TAGS_FILTER_IMPLEMENTATION.md)
 
 ### Workflow
 - [task-and-workflow.md](workflow/task-and-workflow.md)
 
 ## วิธีใช้งานกับ Windsurf/Obsidian
 - งานทั่วไป: ใช้ `.windsurfrules` + `STATUS.md`
 - งานที่ต้องใช้ skill: เริ่มจาก `.agent/skills/doc.md` แล้วเลือก `SKILL.md` เฉพาะงาน
 - งานฟีเจอร์: เพิ่ม `@docs/02_Features/<feature>.md`
 - งานฐานข้อมูลหรือ Payload CMS: เพิ่ม `@docs/03_Database/Schema.md`
 - งาน UI: เพิ่ม `@docs/04_UI_UX/Design_Tokens.md`
 - งานประชุมหรือสรุปการตัดสินใจ: ใช้ `05_Meeting_Notes/`
 
 ## กฎเพื่อประหยัด Token
 - ใช้เอกสารเฉพาะไฟล์ที่เกี่ยวข้องกับงานปัจจุบัน
 - ไม่เก็บข้อมูลชุดเดียวกันซ้ำหลายโฟลเดอร์
 - เอกสารใหม่ทั้งหมดให้เริ่มจากโครงสร้าง canonical ด้านบน
