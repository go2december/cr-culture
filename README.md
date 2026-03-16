# CR-Culture

สภาวัฒนธรรมจังหวัดเชียงราย - Cultural Council of Chiang Rai Province Website

## 📚 Documentation

เอกสารโครงการทั้งหมดอยู่ใน [docs/](docs/) folder:

- **[Progress Report](docs/guides/PROGRESS_REPORT.md)** - รายงานความคืบหน้าโครงการ (85%)
- **[Docker Guide](docs/guides/DOCKER_GUIDE.md)** - คู่มือ Docker และ deployment
- **[Task & Workflow](docs/workflow/task-and-workflow.md)** - แผนการพัฒนาและรายการงาน
- **[Search Feature](docs/implementations/SEARCH_FEATURE_IMPLEMENTATION.md)** - ระบบค้นหาบทความ
- **[Tags Filter](docs/implementations/TAGS_FILTER_IMPLEMENTATION.md)** - ระบบกรองแท็ก

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker Desktop
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/cr-culture.git
cd cr-culture
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Start with Docker:
```bash
docker compose up -d
```

4. Or run locally:
```bash
npm install
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
cr-culture/
├── docs/                 # 📚 Documentation
│   ├── guides/          # User guides and setup
│   ├── implementations/ # Feature implementations
│   └── workflow/        # Project planning
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (frontend)/ # Public pages
│   │   ├── admin/      # Payload CMS Admin
│   │   └── api/        # API routes
│   ├── collections/    # Payload CMS Collections
│   ├── components/     # React components
│   │   ├── heritage/  # Heritage-specific components
│   │   ├── admin/     # Admin components
│   │   └── ...
│   ├── lib/           # Utilities
│   └── payload.config.ts
├── public/            # Static assets
├── docker-compose.yml # Docker configuration
└── package.json
```

## 🗺️ Site Map

### Public Pages
- `/` - Home
- `/about` - About Us
- `/about/board` - Provincial Board
- `/activities` - Activities
- `/activities/calendar` - Activity Calendar
- `/districts` - District Network (18 districts)
- `/districts/[slug]` - District Detail
- `/heritage` - Cultural Heritage Blog
- `/heritage/[slug]` - Heritage Article
- `/news` - News & PR
- `/contact` - Contact

### Admin Dashboard
- `/admin` - Payload CMS Admin Panel

## 📊 CMS Collections

| Collection | Description |
|------------|-------------|
| Users | System users |
| ProvincialBoard | Provincial Committee Members |
| Districts | 18 Districts of Chiang Rai |
| DistrictMembers | District Committee Members |
| Activities | Cultural Activities |
| HeritageBlog | Cultural Heritage Articles |
| Tags | Article Tags |
| News | News & Announcements |
| Media | File Uploads |

## 🎨 Theme: Modern Lanna

- **Primary**: Purple (#6B21A8) - สีม่วงเชียงราย
- **Secondary**: Metallic Gold (#D4AF37) - สีทองเมทัลลิก
- **Base**: Cream White (#FFFAF0) - พื้นหลังสีขาวนวล

## 📝 License

Copyright © 2026 สภาวัฒนธรรมจังหวัดเชียงราย
