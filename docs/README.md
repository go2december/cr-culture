# CR-Culture Documentation

จุดเริ่มต้นหลักของ docs ทั้งหมดใน Obsidian

## Start Here
- งานประจำวัน: [Site_Map_and_Workflow.md](01_Project_Core/Site_Map_and_Workflow.md)
- สถานะล่าสุด: [STATUS.md](../STATUS.md)
- วิธีใช้เอกสาร: [Documentation_Workflow.md](01_Project_Core/Documentation_Workflow.md)
- กฎและบริบท: [GEMINI.md](../.agent/rules/GEMINI.md)

## Canonical Docs

### Project Core
- [Site_Map_and_Workflow.md](01_Project_Core/Site_Map_and_Workflow.md)
- [Documentation_Workflow.md](01_Project_Core/Documentation_Workflow.md)
- [Skill_Routing_with_Obsidian.md](01_Project_Core/Skill_Routing_with_Obsidian.md)
- [Development_Environment.md](01_Project_Core/Development_Environment.md)
- [Project_Roadmap.md](01_Project_Core/Project_Roadmap.md)

### Features
- สเปคฟีเจอร์ใหม่เก็บใน `02_Features/`
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
- บันทึกการคุยและการตัดสินใจเก็บใน `05_Meeting_Notes/`

### Templates
- [Feature_Template.md](99_Templates/Feature_Template.md)
- [Page_Template.md](99_Templates/Page_Template.md)
- [Collection_Template.md](99_Templates/Collection_Template.md)
- [Bug_Report_Template.md](99_Templates/Bug_Report_Template.md)
- [Meeting_Note_Template.md](99_Templates/Meeting_Note_Template.md)
- [Decision_Log_Entry_Template.md](99_Templates/Decision_Log_Entry_Template.md)
- [Workflow_Template.md](99_Templates/Workflow_Template.md)

## Legacy Docs

`guides/`, `implementations/`, and `workflow/` are historical reference only. If useful content remains, summarize it into canonical docs instead of linking it directly.

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

## Token-Efficient Rules
- ใช้ไฟล์ canonical เฉพาะที่เกี่ยวข้องกับงานปัจจุบัน
- ไม่เก็บข้อมูลชุดเดียวกันซ้ำหลายโฟลเดอร์
- เริ่มจาก [Site_Map_and_Workflow.md](01_Project_Core/Site_Map_and_Workflow.md) แล้วค่อยเปิดไฟล์อื่นตาม need
