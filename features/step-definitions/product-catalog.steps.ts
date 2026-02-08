import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';

Then('I should see at least {int} products displayed', async function (this: PlaywrightWorld, minProductCount: number) {
  const products = await this.page.locator('.inventory_item').count();
  expect(products).toBeGreaterThanOrEqual(minProductCount);
});

Then('each product should have a name, image, price, and add to cart button', async function (this: PlaywrightWorld) {
  const productCount = await this.page.locator('.inventory_item').count();
  
  for (let i = 0; i < productCount; i++) {
    const product = this.page.locator('.inventory_item').nth(i);
    await expect(product.locator('.inventory_item_name')).toBeVisible();
    await expect(product.locator('img.inventory_item_img')).toBeVisible(); // More specific selector
    await expect(product.locator('.inventory_item_price')).toBeVisible();
    await expect(product.locator('.btn_inventory')).toBeVisible();
  }
});

When('I select {string} from the sort dropdown', async function (this: PlaywrightWorld, sortOption: string) {
  await this.page.locator('.product_sort_container').selectOption({ label: sortOption });
});

Then('the products should be sorted by {string}', async function (this: PlaywrightWorld, expectedOrder: string) {
  const productNames = await this.page.locator('.inventory_item_name').allTextContents();
  const productPrices = await this.page.locator('.inventory_item_price').allTextContents();
  
  switch (expectedOrder) {
    case 'alphabetical_ascending':
      const sortedNamesAsc = [...productNames].sort();
      expect(productNames).toEqual(sortedNamesAsc);
      break;
      
    case 'alphabetical_descending':
      const sortedNamesDesc = [...productNames].sort().reverse();
      expect(productNames).toEqual(sortedNamesDesc);
      break;
      
    case 'price_ascending':
      const pricesAsc = productPrices.map(price => parseFloat(price.replace('$', '')));
      const sortedPricesAsc = [...pricesAsc].sort((a, b) => a - b);
      expect(pricesAsc).toEqual(sortedPricesAsc);
      break;
      
    case 'price_descending':
      const pricesDesc = productPrices.map(price => parseFloat(price.replace('$', '')));
      const sortedPricesDesc = [...pricesDesc].sort((a, b) => b - a);
      expect(pricesDesc).toEqual(sortedPricesDesc);
      break;
      
    default:
      throw new Error(`Unsupported sort order: ${expectedOrder}`);
  }
});

When('I click on {string} product name', async function (this: PlaywrightWorld, productName: string) {
  await this.page.locator('.inventory_item_name', { hasText: productName }).click();
});

Then('I should see the product details page', async function (this: PlaywrightWorld) {
  await expect(this.page.locator('.inventory_details .inventory_details_container')).toBeVisible();
});

Then('I should see the product name {string}', async function (this: PlaywrightWorld, productName: string) {
  await expect(this.page.locator('.inventory_details_name')).toHaveText(productName);
});

Then('I should see the product description', async function (this: PlaywrightWorld) {
  await expect(this.page.locator('.inventory_details_desc')).toBeVisible();
});

Then('I should see the product price {string}', async function (this: PlaywrightWorld, price: string) {
  await expect(this.page.locator('.inventory_details_price')).toHaveText(price);
});

Then('I should see the {string} button', async function (this: PlaywrightWorld, buttonText: string) {
  await expect(this.page.getByRole('button', { name: buttonText })).toBeVisible();
});

When('I click {string} for {string}', async function (this: PlaywrightWorld, action: string, productName: string) {
  const productItem = this.page.locator('.inventory_item').filter({ hasText: productName });
  await productItem.getByRole('button', { name: action }).click();
});

Given('I have added {string} to the cart', async function (this: PlaywrightWorld, productName: string) {
  const productItem = this.page.locator('.inventory_item').filter({ hasText: productName });
  await productItem.getByRole('button', { name: 'Add to cart' }).click();
});

Then('the button text should change to {string}', async function (this: PlaywrightWorld, expectedText: string) {
  // This step might need to be more specific depending on the product
  await expect(this.page.getByRole('button', { name: expectedText })).toBeVisible();
});

Then('the shopping cart badge should show {string}', async function (this: PlaywrightWorld, badgeText: string) {
  await expect(this.page.locator('.shopping_cart_badge')).toHaveText(badgeText);
});

Then('the shopping cart badge should not be visible', async function (this: PlaywrightWorld) {
  await expect(this.page.locator('.shopping_cart_badge')).not.toBeVisible();
});