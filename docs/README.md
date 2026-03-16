# CR-Culture Documentation

เอกสารโครงการสภาวัฒนธรรมจังหวัดเชียงราย

---

## 📁 Folder Structure

```
docs/
├── README.md                 # คุณอยู่ที่นี่
├── guides/                   # คู่มือการใช้งานและข้อมูลทั่วไป
│   ├── DOCKER_GUIDE.md       # คู่มือ Docker
│   └── PROGRESS_REPORT.md    # รายงานความคืบหน้าโครงการ
├── implementations/          # เอกสารการพัฒนาฟีเจอร์
│   ├── SEARCH_FEATURE_DESIGN.md           # การออกแบบ Search Feature
│   ├── SEARCH_FEATURE_IMPLEMENTATION.md   # การใช้งาน Search Feature
│   └── TAGS_FILTER_IMPLEMENTATION.md      # การใช้งาน Tags Filter
└── workflow/                 # แผนและขั้นตอนการทำงาน
    └── task-and-workflow.md  # รายการงานและ Workflow
```

---

## 📚 Documentation Index

### 📘 Guides (คู่มือ)

| Document | Description | Link |
|----------|-------------|------|
| **Docker Guide** | คู่มือการใช้งาน Docker และ Docker Compose | [DOCKER_GUIDE.md](guides/DOCKER_GUIDE.md) |
| **Progress Report** | รายงานความคืบหน้าโครงการ (85%) | [PROGRESS_REPORT.md](guides/PROGRESS_REPORT.md) |

### 🔧 Implementations (การพัฒนาฟีเจอร์)

| Document | Description | Link |
|----------|-------------|------|
| **Search Feature Design** | การออกแบบระบบค้นหาบทความ | [SEARCH_FEATURE_DESIGN.md](implementations/SEARCH_FEATURE_DESIGN.md) |
| **Search Feature Implementation** | คู่มือการใช้งานระบบค้นหา | [SEARCH_FEATURE_IMPLEMENTATION.md](implementations/SEARCH_FEATURE_IMPLEMENTATION.md) |
| **Tags Filter Implementation** | การใช้งานระบบกรองด้วยแท็ก | [TAGS_FILTER_IMPLEMENTATION.md](implementations/TAGS_FILTER_IMPLEMENTATION.md) |

### 📋 Workflow (แผนงาน)

| Document | Description | Link |
|----------|-------------|------|
| **Task & Workflow** | รายการงานและขั้นตอนการพัฒนา | [task-and-workflow.md](workflow/task-and-workflow.md) |

---

## 🎯 Quick Links

### Development
- [Task & Workflow](workflow/task-and-workflow.md) - แผนการพัฒนาและงานทั้งหมด
- [Progress Report](guides/PROGRESS_REPORT.md) - ความคืบหน้าโครงการ

### Features
- [Search Feature](implementations/SEARCH_FEATURE_IMPLEMENTATION.md) - ระบบค้นหาบทความ
- [Tags Filter](implementations/TAGS_FILTER_IMPLEMENTATION.md) - ระบบกรองแท็ก
- [Activity Calendar](../src/app/(frontend)/activities/calendar/) - ปฏิทินกิจกรรม

### Infrastructure
- [Docker Guide](guides/DOCKER_GUIDE.md) - Docker setup และ configuration

---

## 📊 Project Status

**Overall Progress: 85%** (60/70 tasks)

```
Phase 1: Environment & Infra     [██████████] 100% ✅
Phase 2: Data Schema & CMS       [██████████] 100% ✅
Phase 3: Frontend & Theme        [██████████] 100% ✅
Phase 4: Logic & Integration     [█████████░]  85% 🟡
────────────────────────────────────────────────────
Overall Progress                 [█████████░]  85%
```

---

## 🔧 How to Use This Documentation

### For Developers
1. Start with [Progress Report](guides/PROGRESS_REPORT.md) for project overview
2. Read [Search Feature Implementation](implementations/SEARCH_FEATURE_IMPLEMENTATION.md) for search functionality
3. Check [Docker Guide](guides/DOCKER_GUIDE.md) for local development setup

### For Project Managers
1. Review [Progress Report](guides/PROGRESS_REPORT.md) for current status
2. Check [Task & Workflow](workflow/task-and-workflow.md) for remaining tasks
3. Read feature implementation docs for understanding capabilities

### For Designers
1. Read [Search Feature Design](implementations/SEARCH_FEATURE_DESIGN.md) for UX/UI decisions
2. Check component documentation for design system details

---

## 🚀 Getting Started

### Local Development
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd CR-Culture

# Start Docker
docker-compose up -d

# Access application
# Website: http://localhost:3000
# Admin: http://localhost:3000/admin
# Heritage Blog with Search: http://localhost:3000/heritage
```

### Documentation Navigation
1. Start with [Progress Report](guides/PROGRESS_REPORT.md)
2. Read relevant implementation docs based on your role
3. Check [Docker Guide](guides/DOCKER_GUIDE.md) for technical setup

---

## 📝 Document Update Policy

- **Update frequency:** After each major feature completion
- **Version control:** All docs are version-controlled via Git
- **Review process:** Review and update docs during sprint retrospectives

---

## 📞 Support

For questions about documentation:
- Check the relevant document first
- Create an issue in the repository
- Contact the development team

---

**Last Updated:** 15 มีนาคม 2569  
**Maintained by:** Development Team
