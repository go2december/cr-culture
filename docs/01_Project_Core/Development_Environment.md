# Development Environment

## Purpose
เอกสาร canonical สำหรับการรันและดูแล environment ระหว่างพัฒนาโปรเจกต์ CR-Culture

## Stack Runtime
- Next.js 16.1.1
- Payload CMS 3
- MongoDB ผ่าน Docker
- Tailwind CSS v4 + daisyUI

## Local Services
| Service | Port | Purpose |
|---------|------|---------|
| App | `3000` | Frontend + Payload Admin |
| MongoDB | `27017` | Primary database |

## Primary Access URLs
- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- MongoDB: `mongodb://localhost:27017`

## Recommended Development Mode
ใช้ Docker เป็นค่าเริ่มต้นสำหรับโปรเจกต์นี้ เพื่อให้ environment สม่ำเสมอและตรงกับกฎใน `.windsurfrules`

## Common Commands
### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Check running status
```bash
docker-compose ps
```

### View logs
```bash
docker-compose logs -f
docker-compose logs -f app
docker-compose logs -f mongodb
```

### Restart services
```bash
docker-compose restart
docker-compose restart app
docker-compose restart mongodb
```

### Rebuild containers
```bash
docker-compose up -d --build
docker-compose up -d --build app
```

## Environment Variables
### Docker development
```env
DATABASE_URI=mongodb://admin:password123@mongodb:27017/crculture?authSource=admin
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=development
```

### Local non-Docker development
```env
DATABASE_URI=mongodb://admin:password123@localhost:27017/crculture?authSource=admin
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=development
```

## Important Notes
- เมื่อรันใน Docker ให้ใช้ hostname `mongodb` แทน `localhost`
- MongoDB data ควรเก็บผ่าน volume persistence
- destructive reset เช่น `docker-compose down -v` ควรใช้เฉพาะเมื่อจำเป็นจริง

## Docker Architecture Summary
- App container เชื่อมกับ MongoDB container ผ่าน Docker network
- development mode ใช้ source mount เพื่อรองรับ hot reload
- production build ใช้ multi-stage Dockerfile

## Troubleshooting
### App ต่อ MongoDB ไม่ได้
- ตรวจ `docker-compose ps`
- ตรวจ `DATABASE_URI`
- ตรวจ log ของ mongodb

### Port ถูกใช้งานอยู่แล้ว
- ตรวจ process ที่ใช้ port 3000
- หรือเปลี่ยน mapping port ใน `docker-compose.yml`

### ต้องเข้าภายใน container
```bash
docker-compose exec app sh
docker-compose exec mongodb sh
```

## Legacy Reference
- `docs/guides/DOCKER_GUIDE.md`
