import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { PlaywrightWorld } from './world';

BeforeAll(async function () {
  // Global setup if needed
});

Before(async function (this: PlaywrightWorld) {
  // Initialize browser for each scenario
  await this.init('chromium');
});

After(async function (this: PlaywrightWorld) {
  // Cleanup after each scenario
  await this.cleanup();
});

AfterAll(async function () {
  // Global cleanup if needed
});