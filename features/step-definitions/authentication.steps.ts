import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';

Given('I am on the SauceDemo login page', async function (this: PlaywrightWorld) {
  await this.page.goto(this.appUrl);
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});

Given('I am logged in as {string} with password {string}', async function (this: PlaywrightWorld, username: string, password: string) {
  await this.page.goto(this.appUrl);
  await this.page.locator('[data-test="username"]').fill(username);
  await this.page.locator('[data-test="password"]').fill(password);
  await this.page.locator('[data-test="login-button"]').click();
  await expect(this.page).toHaveURL(`${this.appUrl}inventory.html`);
});

When('I enter {string} as username', async function (this: PlaywrightWorld, username: string) {
  await this.page.locator('[data-test="username"]').fill(username);
});

When('I enter {string} as password', async function (this: PlaywrightWorld, password: string) {
  await this.page.locator('[data-test="password"]').fill(password);
});

When('I leave the username field empty', async function (this: PlaywrightWorld) {
  await this.page.locator('[data-test="username"]').fill('');
});

When('I leave the password field empty', async function (this: PlaywrightWorld) {
  await this.page.locator('[data-test="password"]').fill('');
});

When('I click the login button', async function (this: PlaywrightWorld) {
  await this.page.locator('[data-test="login-button"]').click();
});

When('I click the hamburger menu', async function (this: PlaywrightWorld) {
  await this.page.locator('#react-burger-menu-btn').click();
});

When('I click the logout option', async function (this: PlaywrightWorld) {
  await this.page.locator('#logout_sidebar_link').click();
});

Then('I should be successfully logged in', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(`${this.appUrl}inventory.html`);
});

Then('I should see the products page', async function (this: PlaywrightWorld) {
  await expect(this.page.getByText('Products')).toBeVisible();
});

Then('the page title should be {string}', async function (this: PlaywrightWorld, expectedTitle: string) {
  await expect(this.page).toHaveTitle(expectedTitle);
});

Then('I should see {string} heading', async function (this: PlaywrightWorld, headingText: string) {
  await expect(this.page.getByText(headingText)).toBeVisible();
});

Then('I should see {string} product', async function (this: PlaywrightWorld, productName: string) {
  await expect(this.page.getByText(productName)).toBeVisible();
});

Then('I should see the error message {string}', async function (this: PlaywrightWorld, errorMessage: string) {
  await expect(this.page.locator('[data-test="error"]')).toHaveText(errorMessage);
});

Then('I should remain on the login page', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(this.appUrl);
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});

Then('the username field should contain {string}', async function (this: PlaywrightWorld, expectedValue: string) {
  await expect(this.page.locator('[data-test="username"]')).toHaveValue(expectedValue);
});

Then('I should see an appropriate error message', async function (this: PlaywrightWorld) {
  await expect(this.page.locator('[data-test="error"]')).toBeVisible();
});

Then('I should be logged out successfully', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(this.appUrl);
});

Then('I should be redirected to the login page', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(this.appUrl);
});

Then('I should see the login form', async function (this: PlaywrightWorld) {
  await expect(this.page.locator('[data-test="username"]')).toBeVisible();
  await expect(this.page.locator('[data-test="password"]')).toBeVisible();
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});