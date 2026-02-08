import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';
import * as fs from 'fs';
import * as path from 'path';

let htmlPagePath: string;

Given('I create a simple HTML page with title {string}', async function (this: PlaywrightWorld, title: string) {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
</head>
<body>
    <h1>Welcome to BDD Testing</h1>
    <p>This is a local test page for demonstrating BDD with Playwright and Cucumber.</p>
    <button id="testButton">Click Me</button>
</body>
</html>`;

  htmlPagePath = path.join(__dirname, '../../test-page.html');
  fs.writeFileSync(htmlPagePath, htmlContent);
});

When('I navigate to the local HTML page', async function (this: PlaywrightWorld) {
  await this.page.goto(`file://${htmlPagePath}`);
});

Then('I should see the heading {string}', async function (this: PlaywrightWorld, headingText: string) {
  await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible();
});