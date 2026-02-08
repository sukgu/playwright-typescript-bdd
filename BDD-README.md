# BDD with Playwright and Cucumber

This project demonstrates Behavior-Driven Development (BDD) using Cucumber with Playwright for end-to-end testing of the SauceDemo e-commerce application.

## Project Structure

```
├── features/                    # BDD feature files and step definitions
│   ├── support/                 # Support files for Cucumber
│   │   ├── world.ts            # Playwright world setup
│   │   └── hooks.ts            # Before/After hooks
│   ├── step-definitions/        # Step definition files
│   │   ├── authentication.steps.ts
│   │   ├── playwright-demo.steps.ts
│   │   └── product-catalog.steps.ts
│   ├── authentication.feature   # Authentication scenarios
│   ├── playwright-demo.feature  # Demo scenarios
│   └── product-catalog.feature  # Product catalog scenarios
├── tests/                      # Original Playwright tests (for reference)
├── reports/                    # Generated test reports
├── cucumber.config.js          # Cucumber configuration
└── tsconfig.json               # TypeScript configuration
```

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Running BDD Tests

### Run all BDD tests:
```bash
npm run test:bdd
```

### Run tests with specific tags:
```bash
# Run smoke tests only
npm run test:bdd:smoke

# Run authentication tests only
npm run test:bdd:auth

# Run login tests only
npm run test:bdd:login
```

### Generate HTML report:
```bash
npm run test:bdd:html
```

### Debug mode (fail fast):
```bash
npm run test:debug
```

### Generate and open report:
```bash
npm run report
```

## Feature Files

### Authentication Feature (`features/authentication.feature`)
Tests login/logout functionality with various scenarios:
- Successful login with standard user
- Login with locked out user  
- Login with invalid credentials
- Login with empty credentials
- Logout functionality

### Product Catalog Feature (`features/product-catalog.feature`)
Tests product browsing and cart functionality:
- View product catalog
- Sort products by different criteria
- View individual product details
- Add/remove products from cart

### Playwright Demo Feature (`features/playwright-demo.feature`)
Demonstrates basic BDD scenarios:
- Verify website title
- Navigate to documentation pages

## Tags

Use tags to organize and run specific test scenarios:

- `@smoke` - Critical tests that should always pass
- `@authentication` - All authentication-related tests
- `@login` - Login-specific tests
- `@logout` - Logout-specific tests
- `@product-catalog` - Product catalog tests
- `@shopping-cart` - Shopping cart functionality
- `@error-handling` - Error condition tests
- `@validation` - Input validation tests

## Writing New Tests

### 1. Create a Feature File
Write scenarios in Gherkin syntax in `features/*.feature`:

```gherkin
Feature: Your Feature Name
  As a user
  I want to do something
  So that I achieve a goal

  @tag
  Scenario: Your scenario name
    Given I am on the page
    When I do something
    Then I should see the result
```

### 2. Create Step Definitions
Implement the steps in `features/step-definitions/*.steps.ts`:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';

Given('I am on the page', async function (this: PlaywrightWorld) {
  await this.page.goto('url');
});
```

## Best Practices

1. **Use descriptive scenario names** that explain the business value
2. **Keep scenarios focused** on a single piece of functionality
3. **Use tags** to organize and group related tests
4. **Write reusable steps** that can be used across multiple scenarios
5. **Use Background** for common setup steps
6. **Use Scenario Outline** for data-driven tests

## Reports

After running tests, reports are generated in the `reports/` directory:
- `cucumber-report.html` - HTML report with detailed results
- `cucumber-report.json` - JSON report for further processing

## Browser Configuration

The default browser is Chromium running in headed mode for better debugging. You can modify the browser settings in `features/support/world.ts`.

## Traditional Playwright Tests

Original Playwright tests are still available in the `tests/` directory and can be run with:
```bash
npm test
```