# Deployment Guide

## Quick Start Deployment

### Option 1: Netlify (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select your repository

2. **Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Environment variables: (see below)

3. **Environment Variables**

   ```
   VITE_API_URL=https://your-domain.netlify.app
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Option 2: Vercel

1. **Import Project**
   - Go to https://vercel.com/new
   - Select "Other"
   - Import your GitHub repository

2. **Configuration**
   - Framework: Other
   - Build command: `pnpm build`
   - Output directory: `dist`
   - Install command: `pnpm install`

3. **Environment Variables**

   ```
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in seconds

### Option 3: Docker

1. **Build Image**

   ```bash
   docker build -t salesforge:latest .
   ```

2. **Run Container**

   ```bash
   docker run -p 3000:3000 \
     -e GROQ_API_KEY=your_key \
     salesforge:latest
   ```

3. **Push to Registry**
   ```bash
   docker push your-registry/salesforge:latest
   ```

### Option 4: Self-Hosted (VPS)

1. **Server Setup**

   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install pnpm
   npm install -g pnpm

   # Clone repository
   git clone your-repo
   cd salesforge
   ```

2. **Build & Run**

   ```bash
   # Install dependencies
   pnpm install

   # Build
   pnpm build

   # Start production server
   pnpm start
   ```

3. **Process Management** (using PM2)

   ```bash
   npm install -g pm2
   pm2 start "pnpm start" --name salesforge
   pm2 save
   pm2 startup
   ```

4. **Nginx Reverse Proxy**

   ```nginx
   upstream salesforge {
     server localhost:3000;
   }

   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://salesforge;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## Environment Configuration

### Required Variables

```env
# API Configuration
VITE_API_URL=https://your-api-domain.com
NODE_ENV=production

# Groq API (for LLM)
GROQ_API_KEY=your_api_key_from_console.groq.com

# MongoDB (for chat history)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Vector Database
VECTOR_DB=chromadb
EMBEDDING_MODEL=all-MiniLM-L6-v2
```

### Optional Variables

```env
# Forecasting
DEFAULT_FORECAST_DAYS=30
DEFAULT_FORECAST_MODEL=prophet

# LLM Settings
LLM_TEMPERATURE=0.7
LLM_MODEL=llama3

# Chunk Settings
CHUNK_SIZE=512
TOP_K_RETRIEVAL=5
SEMANTIC_SPLITTING=true
```

## Database Setup

### MongoDB (Chat History)

1. **Create Cluster**
   - Go to https://mongodb.com
   - Create free tier cluster
   - Get connection string

2. **Set Environment Variable**
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/salesforge?retryWrites=true&w=majority
   ```

### ChromaDB (Vector Storage)

ChromaDB runs in-process (no setup needed). For production:

1. **Persistent Storage**

   ```python
   import chromadb
   client = chromadb.PersistentClient(path="/data/chroma")
   ```

2. **Docker Support**
   ```bash
   docker run -p 8000:8000 \
     -v chroma-data:/chroma/data \
     chromadb/chroma:latest
   ```

## Groq API Setup

1. **Create Account**
   - Go to https://console.groq.com
   - Sign up for free

2. **Get API Key**
   - Navigate to "Keys" section
   - Create new API key
   - Copy and save securely

3. **Set Environment Variable**
   ```env
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
   ```

## SSL/TLS Certificate

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renewal (automatic with certbot)
sudo systemctl enable certbot.timer
```

## Performance Optimization

### Frontend

- Enable minification in Vite config
- Use code splitting for routes
- Optimize images and assets
- Cache static files

### Backend

- Enable gzip compression
- Use connection pooling for databases
- Implement rate limiting
- Cache API responses

### Deployment

- Use CDN for static files (CloudFlare, Netlify)
- Enable HTTP/2
- Set proper cache headers
- Monitor performance with tools

## Monitoring & Logging

### Server Logs

```bash
# Development
pnpm dev

# Production with logging
pm2 start "pnpm start" --name salesforge --output logs/out.log --error logs/error.log
```

### Health Checks

- Endpoint: `GET /api/health`
- Returns service status
- Configure monitoring tools to check regularly

### Error Tracking

```bash
# Install Sentry (optional)
npm install @sentry/node

# Initialize in server/index.ts
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

## Security Checklist

- [ ] Set all environment variables securely
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use strong database passwords
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Monitor for unauthorized access
- [ ] Backup database regularly
- [ ] Use secrets management (AWS Secrets, HashiCorp Vault)

## Backup Strategy

### Database Backups

```bash
# MongoDB Atlas automatic backups (enabled by default)

# Manual backup
mongodump --uri "mongodb+srv://..." --archive > backup.archive
mongorestore --archive < backup.archive
```

### File Backups

```bash
# Backup uploaded files and data
tar -czf salesforge-backup.tar.gz /path/to/data/
```

## Scaling

### Horizontal Scaling

- Use load balancer (nginx, HAProxy)
- Multiple app server instances
- Shared database connection
- Session storage (Redis)

### Vertical Scaling

- Upgrade server hardware
- Optimize database queries
- Increase cache memory
- Use efficient algorithms

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Module Not Found

```bash
# Reinstall dependencies
pnpm install --no-frozen-lockfile
```

### API Not Responding

```bash
# Check server status
curl http://localhost:3000/api/health

# Check logs
tail -f logs/error.log
```

### High Memory Usage

```bash
# Check memory consumption
node --max-old-space-size=4096 dist/server/node-build.mjs
```

## Rollback Procedure

1. **Version Control**

   ```bash
   # Identify last working commit
   git log --oneline

   # Revert to previous version
   git checkout <commit-hash>
   ```

2. **Rebuild and Redeploy**

   ```bash
   pnpm install
   pnpm build
   pnpm start
   ```

3. **Database Rollback**
   ```bash
   mongorestore --archive < backup.archive
   ```

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
pnpm outdated

# Update packages
pnpm update

# Security audit
pnpm audit
```

### Database Maintenance

```bash
# MongoDB index optimization
db.sales.createIndex({ date: 1 })

# Cleanup old chat history
db.chats.deleteMany({ createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) } })
```

---

For more help, check the main README.md or contact support.
