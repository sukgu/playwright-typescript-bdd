# Playwright TypeScript BDD Framework

A robust end-to-end testing framework built with **Playwright**, **TypeScript**, and **Cucumber BDD** for comprehensive web application testing.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/sukgu/playwright-typescript-bdd.git
cd playwright-typescript-bdd

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run tests locally (with browser visible)
npm run test:local

# Run tests in CI mode (headless)
npm run test:ci
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **Git**

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

3. **Verify installation:**
   ```bash
   npm run test:local
   ```

## 🌍 Environment Configuration

The framework supports multiple environments through `.env` files:

### Available Environments

| Environment | File | Purpose | Headless |
|-------------|------|---------|----------|
| **Local** | `.env.local` | Development & debugging | ❌ No |
| **CI** | `.env.ci` | Continuous Integration | ✅ Yes |
| **Staging** | `.env.staging` | Staging environment tests | ✅ Yes |
| **Production** | `.env.production` | Production smoke tests | ✅ Yes |

### Environment Variables

```bash
# Browser Configuration
HEADLESS=true|false          # Run browser in headless mode
BROWSER=chromium|firefox|webkit  # Browser to use
SLOW_MO=0                    # Slow motion delay (ms)

# Application URLs
APP_URL=https://www.saucedemo.com/
BASE_URL=https://www.saucedemo.com/

# Test Configuration
TIMEOUT=30000                # Default timeout (ms)
WORKERS=1                    # Number of parallel workers
RETRIES=0                    # Number of retries on failure

# Features
DEBUG_MODE=false             # Enable debug mode
SCREENSHOTS=on-failure       # Screenshot capture mode
TRACE=on-failure            # Trace capture mode
```

## 🧪 Running Tests

### NPM Scripts

```bash
# Local development (browser visible)
npm run test:local

# CI/headless mode
npm run test:ci

# Specific environments
npm run test:staging
npm run test:production

# Tagged tests
npm run test:bdd:smoke      # Run only smoke tests
npm run test:bdd:auth       # Run only authentication tests
npm run test:bdd:login      # Run only login tests

# With HTML report
npm run test:bdd:html

# Debug mode (fail-fast)
npm run test:debug

# Generate report only
npm run report
```

### Command Line Options

```bash
# Run specific feature
npx cucumber-js --require-module ts-node/register --require "./features/**/*.ts" features/authentication.feature

# Run with tags
npx cucumber-js --require-module ts-node/register --require "./features/**/*.ts" --tags @smoke features

# Generate HTML report
npx cucumber-js --require-module ts-node/register --require "./features/**/*.ts" --format html:reports/cucumber-report.html features
```

## 📁 Project Structure

```
playwright-typescript-bdd/
├── 📄 README.md                    # Project documentation
├── 📄 package.json                 # Dependencies and scripts
├── 📄 playwright.config.ts         # Playwright configuration
├── 📄 cucumber.config.js           # Cucumber configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 test-page.html              # Test page for demos
├── 🌍 .env                        # Base environment variables
├── 🌍 .env.local                  # Local development settings
├── 🌍 .env.ci                     # CI environment settings
├── 🌍 .env.staging                # Staging environment settings
├── 🌍 .env.production             # Production environment settings
├── 📂 features/                   # BDD features and step definitions
│   ├── 📄 authentication.feature
│   ├── 📄 offline-demo.feature
│   ├── 📄 playwright-demo.feature
│   ├── 📄 product-catalog.feature
│   ├── 📂 step-definitions/       # Step implementations
│   │   ├── 📄 authentication.steps.ts
│   │   ├── 📄 offline-demo.steps.ts
│   │   ├── 📄 playwright-demo.steps.ts
│   │   └── 📄 product-catalog.steps.ts
│   └── 📂 support/               # Framework support files
│       ├── 📄 env-loader.ts      # Environment configuration
│       ├── 📄 hooks.ts           # Test hooks (Before/After)
│       └── 📄 world.ts           # Cucumber World context
├── 📂 reports/                   # Test reports
│   └── 📄 cucumber-report.html   # HTML test report
├── 📂 test-results/              # Test execution artifacts
├── 📂 .github/workflows/         # GitHub Actions CI/CD
│   └── 📄 playwright.yml        # CI workflow configuration
└── 📄 BDD-*.md                  # Additional documentation
```

## 🎯 Features

### ✅ Test Features Covered

- **Authentication** (`@authentication`)
  - Login/logout functionality
  - User validation
  - Session management

- **Product Catalog** (`@product-catalog`)
  - Product browsing
  - Cart management
  - Product interactions

- **Offline Demo** (`@offline`)
  - Offline functionality testing
  - Network condition simulation

- **Playwright Demo** (`@playwright-demo`)
  - Core Playwright features
  - Browser automation examples

### ✅ Framework Features

- 🔧 **Multi-environment support** (local, CI, staging, production)
- 🌐 **Cross-browser testing** (Chromium, Firefox, WebKit)
- 📊 **Rich HTML reporting** with screenshots
- 🏷️ **Tag-based test execution** (@smoke, @authentication, etc.)
- 🔄 **CI/CD ready** with GitHub Actions
- 🎯 **Page Object Model** pattern
- 🔍 **Debug mode** support
- 📝 **TypeScript** for type safety
- 🧪 **BDD approach** with Gherkin syntax

## 🔧 Configuration

### Playwright Configuration
- Located in `playwright.config.ts`
- Supports multiple browsers and projects
- Configures timeouts, retries, and reporting

### Cucumber Configuration
- Located in `cucumber.config.js`
- Configures formatters and output paths
- Defines world parameters

### Environment Loading
- Smart environment detection based on `NODE_ENV`
- Automatic `.env` file loading with override support
- Type-safe configuration with TypeScript interfaces

## 📊 Reporting

### HTML Reports
Test reports are automatically generated in the `reports/` directory:

- **cucumber-report.html** - Detailed test execution report with:
  - ✅ Passed/failed scenarios
  - 📸 Screenshots on failure
  - ⏱️ Execution timing
  - 📊 Test statistics

### Accessing Reports
```bash
# Generate and open report
npm run report

# Reports are also generated with:
npm run test:local
npm run test:ci
```

## 🚀 CI/CD Integration

### GitHub Actions
The project includes a complete CI/CD pipeline in `.github/workflows/playwright.yml`:

- ✅ **Automated testing** on push/PR
- 🔄 **Multi-environment support**
- 📊 **Artifact upload** for test reports
- ⚡ **Parallel execution** optimization
- 🔄 **Continue-on-error** for UI test stability

### Workflow Triggers
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches

## 🐛 Debugging

### Local Development
```bash
# Run with browser visible
npm run test:local

# Run in debug mode (fail-fast)
npm run test:debug

# Run specific test with debugging
NODE_ENV=local npx cucumber-js --require-module ts-node/register --require "./features/**/*.ts" --fail-fast features/authentication.feature
```

### Debug Configuration
- Set `DEBUG_MODE=true` in your `.env` file
- Use `HEADLESS=false` to see browser actions
- Set `SLOW_MO=1000` to slow down actions
- Use `--fail-fast` flag to stop on first failure

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Write your tests** following BDD principles
4. **Run tests locally**
   ```bash
   npm run test:local
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push and create a Pull Request**

### Code Style Guidelines
- Use **TypeScript** for all step definitions
- Follow **BDD naming conventions**
- Write **descriptive scenario names**
- Use **appropriate tags** for test organization
- Include **error handling** in step definitions
- Write **reusable step definitions**

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Gherkin Reference](https://cucumber.io/docs/gherkin/)

## 🏷️ Available Tags

- `@smoke` - Critical functionality tests
- `@authentication` - Login/logout related tests  
- `@product-catalog` - Product and cart functionality
- `@offline` - Offline functionality tests
- `@playwright-demo` - Framework demonstration tests

## 📞 Support

For questions or issues:
1. Check existing [GitHub Issues]()
2. Create a new issue with detailed description
3. Include test logs and environment details

---

**Happy Testing!** 🎉