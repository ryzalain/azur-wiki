# Deployment Guide

This guide covers deploying the Azur Lane Wiki to various platforms.

## Prerequisites

- Node.js 18+ installed
- Database (PostgreSQL recommended)
- Domain name (optional)
- SSL certificate (for production)

## Environment Setup

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/azur_lane_wiki"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Optional: External APIs
AZUR_LANE_API_KEY="your-api-key"
DISCORD_BOT_TOKEN="your-bot-token"

# Environment
NODE_ENV="production"
```

### 2. Database Setup

#### PostgreSQL (Recommended)
```bash
# Install PostgreSQL
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/

# Create database
createdb azur_lane_wiki

# Run migrations
npm run db:migrate
```

#### Alternative: SQLite (Development)
```bash
# Update DATABASE_URL in .env.local
DATABASE_URL="file:./dev.db"
```

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Setup
1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required environment variables

3. **Database Setup**
   - Use Vercel Postgres or external database
   - Update `DATABASE_URL` in environment variables

4. **Deploy**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 2. Netlify

#### Setup
1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   - Add all required environment variables in Netlify dashboard

#### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/azur_lane_wiki
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=azur_lane_wiki
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 4. Self-Hosted (VPS/Cloud)

#### Server Requirements
- **CPU**: 2+ cores
- **RAM**: 4GB+ (8GB recommended)
- **Storage**: 20GB+ SSD
- **OS**: Ubuntu 20.04+ or CentOS 8+

#### Setup Steps
1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PostgreSQL**
   ```bash
   sudo apt-get install postgresql postgresql-contrib
   ```

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Deploy Application**
   ```bash
   git clone https://github.com/ryzalain/azur-wiki.git
   cd azur-wiki
   npm install
   npm run build
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "azur-wiki" -- start
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Database Migrations

### Development
```bash
# Create migration
npm run db:migrate

# Reset database
npm run db:reset

# Seed database
npm run db:seed
```

### Production
```bash
# Run migrations
npm run db:migrate:deploy

# Generate Prisma client
npm run db:generate
```

## Monitoring and Maintenance

### Health Checks
```bash
# Check application health
curl http://localhost:3000/api/health

# Check database connection
npm run db:status
```

### Logs
```bash
# PM2 logs
pm2 logs azur-wiki

# Docker logs
docker logs azur-wiki-app
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Run migrations
npm run db:migrate

# Restart application
pm2 restart azur-wiki
```

## Performance Optimization

### 1. Caching
- Enable Redis for session storage
- Use CDN for static assets
- Implement API response caching

### 2. Database Optimization
- Add database indexes
- Use connection pooling
- Monitor query performance

### 3. CDN Setup
- Use Cloudflare or AWS CloudFront
- Optimize images with next/image
- Enable gzip compression

## Security Considerations

### 1. Environment Variables
- Never commit `.env` files
- Use secure secret management
- Rotate secrets regularly

### 2. Database Security
- Use strong passwords
- Enable SSL connections
- Restrict database access

### 3. Application Security
- Enable HTTPS
- Use security headers
- Implement rate limiting
- Regular security updates

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

#### Database Connection Issues
```bash
# Check database status
npm run db:status

# Reset connection
npm run db:reset
```

#### Memory Issues
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Support
- 📧 Email: support@azurlanewiki.com
- 💬 Discord: [Community Server](https://discord.gg/azurlanewiki)
- 📖 Documentation: [docs.azurlanewiki.com](https://docs.azurlanewiki.com)
