import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';

Given('I am on the Playwright website', async function (this: PlaywrightWorld) {
  await this.page.goto('https://playwright.dev/');
});

When('I click on the {string} link', async function (this: PlaywrightWorld, linkText: string) {
  await this.page.getByRole('link', { name: linkText }).click();
});

Then('the page title should contain {string}', async function (this: PlaywrightWorld, expectedTitlePart: string) {
  await expect(this.page).toHaveTitle(new RegExp(expectedTitlePart));
});

Then('I should see the {string} heading', async function (this: PlaywrightWorld, headingText: string) {
  await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible();
});