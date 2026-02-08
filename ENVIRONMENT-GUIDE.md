# 🌍 Environment Configuration

This project supports **multiple environment configurations** for different use cases:

## 📁 Available Environments

| Environment | File | Purpose | Headless | Browser Visible |
|-------------|------|---------|----------|-----------------|
| **Local Development** | `.env.local` | For developers | `false` | ✅ Yes |
| **CI/CD** | `.env.ci` | GitHub Actions | `true` | ❌ No |
| **Staging** | `.env.staging` | Test servers | `true` | ❌ No |
| **Production** | `.env.production` | Live monitoring | `true` | ❌ No |

## 🚀 Usage Commands

### 🖥️ Local Development
```bash
npm run test:local        # Full local environment
npm run test:headed       # Same as local (browser visible)
npm run test:debug        # Debug mode with slow motion
```

### 🤖 CI/CD Environment  
```bash
npm run test:ci           # Optimized for GitHub Actions
npm run test:headless     # Same as CI (fast headless)
```

### 🎭 Staging Tests
```bash
npm run test:staging      # Against staging servers
```

### 🏭 Production Monitoring
```bash
npm run test:production   # Smoke tests on production
```

## ⚙️ Environment Variables

Each `.env.*` file contains:

| Variable | Local | CI | Staging | Production |
|----------|-------|----|---------|-----------| 
| `HEADLESS` | `false` | `true` | `true` | `true` |
| `BROWSER` | `chromium` | `chromium` | `chromium` | `chromium` |
| `SLOW_MO` | `500ms` | `0ms` | `100ms` | `0ms` |
| `TIMEOUT` | `30s` | `60s` | `45s` | `30s` |
| `RETRIES` | `0` | `2` | `1` | `3` |
| `WORKERS` | `1` | `2` | `1` | `1` |

## 🔧 Custom Configuration

1. **Copy any environment file:**
   ```bash
   cp .env.local .env.custom
   ```

2. **Modify settings as needed**

3. **Run with custom environment:**
   ```bash
   NODE_ENV=custom npm test
   ```

## 🎯 Best Practices

- **Development**: Use `npm run test:local` (shows browser)
- **Debugging**: Use `npm run test:debug` (slow motion)
- **CI/CD**: Use `npm run test:ci` (fast, headless)
- **Quick tests**: Use `npm run test:headless`

## 🔍 Environment Detection

The system automatically detects and loads the right configuration:

```
🌍 Loading environment: LOCAL
📄 Environment file: .env.local  
⚙️  Headless: false
🌐 App URL: https://www.saucedemo.com/
🔧 Browser: chromium
```

## 📝 Environment Priority

1. **Command-line variables** (highest priority)
2. **Environment-specific file** (`.env.local`, `.env.ci`, etc.)
3. **Base .env file** (fallback)
4. **Default values** (lowest priority)