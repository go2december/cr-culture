# CR-Culture Docker Setup Guide

## System Overview

This project runs on Docker with 2 services:

| Service | Container Name | Port | Description |
|---------|---------------|------|-------------|
| **MongoDB** | `crculture_mongodb` | 27017 | Database |
| **App** (Next.js + Payload CMS) | `crculture_app` | 3000 | Web Application |

## Docker Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Docker Network                         │
│                                                          │
│  ┌────────────────────┐         ┌─────────────────────┐ │
│  │   App Container    │ ──────> │  MongoDB Container  │ │
│  │  (Next.js 16.1.1)  │  :27017 │   (Mongo:latest)    │ │
│  │   Port: 3000       │         │   Port: 27017       │ │
│  └────────────────────┘         └─────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
                            ↓
                    Host Machine
                  localhost:3000
```

## Quick Start Commands

### Start All Services
```bash
docker-compose up -d
```

### Stop All Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# App only
docker-compose logs -f app

# MongoDB only
docker-compose logs -f mongodb
```

### Restart Services
```bash
# Restart app
docker-compose restart app

# Restart MongoDB
docker-compose restart mongodb

# Restart all
docker-compose restart
```

### Check Status
```bash
docker-compose ps
```

## Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Website** | http://localhost:3000 | Frontend Website |
| **Admin Panel** | http://localhost:3000/admin | Payload CMS Admin |
| **MongoDB** | mongodb://localhost:27017 | Database (external access) |

## Environment Configuration

### For Docker Development (`.env`)
```env
DATABASE_URI=mongodb://admin:password123@mongodb:27017/crculture?authSource=admin
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=development
```

**Important:** When running in Docker, use `mongodb` (service name) as the hostname, NOT `localhost`.

### For Local Development (without Docker)
```env
DATABASE_URI=mongodb://admin:password123@localhost:27017/crculture?authSource=admin
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=development
```

## Dockerfile Stages

The `Dockerfile` uses multi-stage builds:

1. **base** - Shared settings (Node.js 24 Alpine)
2. **deps** - Dependencies caching
3. **development** - Hot-reloading dev server (used by docker-compose)
4. **builder** - Production build compilation
5. **production** - Optimized runtime image

## Volumes

| Volume | Purpose |
|--------|---------|
| `mongodb_data` | Persistent MongoDB data |
| `.:/app` | Source code (development) |
| `/app/node_modules` | Node modules in container |
| `/app/.next` | Next.js build output |

## Troubleshooting

### App Cannot Connect to MongoDB
- Check that MongoDB container is running: `docker-compose ps`
- Verify `DATABASE_URI` uses `mongodb` hostname (not `localhost`)
- Check MongoDB logs: `docker-compose logs mongodb`

### Port Already in Use
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Or change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Rebuild Containers
```bash
# Force rebuild
docker-compose up -d --build

# Or recreate specific service
docker-compose up -d --build app
```

### Clear MongoDB Data (⚠️ Destructive)
```bash
docker-compose down -v  # Removes volumes
docker-compose up -d
```

## Current Status

✅ **System Status:** Running
- `crculture_app`: Up and running on port 3000
- `crculture_mongodb`: Up and running on port 27017
- Calendar page: http://localhost:3000/activities/calendar

## Useful Commands

```bash
# Execute command inside container
docker-compose exec app npm run build

# Open shell in app container
docker-compose exec app sh

# Open shell in MongoDB container
docker-compose exec mongodb sh

# View resource usage
docker stats
```
