import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';
import { env } from './env-loader';

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
    this.appUrl = env.get('appUrl');
  }

  async init(browserName?: string) {
    const selectedBrowser = browserName || env.get('browser');
    const headless = env.get('headless');
    const slowMo = env.get('slowMo');

    console.log(`🚀 Launching ${selectedBrowser} browser (headless: ${headless})`);

    const launchOptions = { 
      headless, 
      slowMo: slowMo > 0 ? slowMo : undefined 
    };
    
    switch (selectedBrowser.toLowerCase()) {
      case 'firefox':
        this.browser = await firefox.launch(launchOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(launchOptions);
        break;
      default:
        this.browser = await chromium.launch(launchOptions);
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    
    // Set timeout from environment
    this.page.setDefaultTimeout(env.get('timeout'));
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