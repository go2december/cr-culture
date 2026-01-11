---
description: How to setup CR-Culture project with Docker, Next.js 16, Payload CMS and MongoDB
---

# CR-Culture Project Setup Workflow

## Prerequisites
- Docker Desktop installed and running
- Node.js 25+ (for local development)
- Git

## Phase 1: Environment & Infrastructure Setup

### Step 1.1: Initialize Project Structure
// turbo
```bash
mkdir -p src/app src/collections src/components src/lib public
```

### Step 1.2: Start Docker Containers
```bash
docker compose up -d
```

### Step 1.3: Verify Services Running
```bash
docker compose ps
```

## Phase 2: CMS Collections Setup

### Step 2.1: Create Payload Collections
Collections to create:
1. `ProvincialBoard` - คณะกรรมการจังหวัด
2. `Districts` - 18 อำเภอ
3. `DistrictMembers` - กรรมการอำเภอ
4. `Activities` - กิจกรรม
5. `HeritageBlog` - คลังมรดกภูมิปัญญา
6. `Tags` - แท็ก
7. `News` - ข่าวสาร
8. `Media` - สื่อและไฟล์

## Phase 3: Frontend Development

### Step 3.1: Configure Tailwind & daisyUI Theme
- Setup Modern Lanna theme colors
- Configure typography with Thai fonts

### Step 3.2: Create Layout Components
- Navbar with full Site Map menu
- Footer with contact info
- Sidebar for heritage blog

### Step 3.3: Create Pages
- `/` - Home
- `/about` - About Us
- `/about/board` - Provincial Board
- `/activities` - Activities
- `/districts` - District Network
- `/districts/[slug]` - District Detail
- `/heritage` - Cultural Heritage Blog
- `/heritage/[slug]` - Heritage Article
- `/news` - News & PR
- `/contact` - Contact

## Phase 4: Integration & Content

### Step 4.1: Connect Frontend to Payload API
- Setup API routes
- Create data fetching utilities

### Step 4.2: Import Sample Data
- Districts data from CSV
- Sample activities and heritage content

## Commands Reference

// turbo-all
### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Database Reset
```bash
docker compose down -v && docker compose up -d
```
