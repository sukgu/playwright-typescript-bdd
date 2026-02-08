import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export class PlaywrightWorld extends World {
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  public appUrl: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.appUrl = options.parameters.appUrl || 'https://www.saucedemo.com/';
  }

  async init(browserName: string = 'chromium') {
    switch (browserName.toLowerCase()) {
      case 'firefox':
        this.browser = await firefox.launch({ headless: false });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless: false });
        break;
      default:
        this.browser = await chromium.launch({ headless: false });
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async cleanup() {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(PlaywrightWorld);