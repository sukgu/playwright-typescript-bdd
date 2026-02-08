import dotenv from 'dotenv';
import path from 'path';

/**
 * Environment Configuration Loader
 * Loads the appropriate .env file based on NODE_ENV
 */
export class EnvLoader {
  private static instance: EnvLoader;
  private config: { [key: string]: string } = {};

  private constructor() {
    this.loadEnvironment();
  }

  public static getInstance(): EnvLoader {
    if (!EnvLoader.instance) {
      EnvLoader.instance = new EnvLoader();
    }
    return EnvLoader.instance;  
  }

  private loadEnvironment(): void {
    const nodeEnv = process.env.NODE_ENV || 'local';
    
    // Load base .env file first (if exists)
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
    
    // Load environment-specific .env file (overrides base)
    const envFile = `.env.${nodeEnv}`;
    const envPath = path.resolve(process.cwd(), envFile);
    
    console.log(`🌍 Loading environment: ${nodeEnv.toUpperCase()}`);
    console.log(`📄 Environment file: ${envFile}`);
    
    dotenv.config({ path: envPath });
    
    // Store processed config
    this.config = {
      // Browser Settings
      headless: this.getBool('HEADLESS', nodeEnv === 'ci' || nodeEnv === 'production').toString(),
      browser: process.env.BROWSER || 'chromium',
      slowMo: this.getNumber('SLOW_MO', 0).toString(),
      
      // URLs
      appUrl: process.env.APP_URL || 'https://www.saucedemo.com/',
      baseUrl: process.env.BASE_URL || process.env.APP_URL || 'https://www.saucedemo.com/',
      
      // Test Configuration  
      timeout: this.getNumber('TIMEOUT', 30000).toString(),
      workers: this.getNumber('WORKERS', 1).toString(),
      retries: this.getNumber('RETRIES', 0).toString(),
      
      // Features
      debugMode: this.getBool('DEBUG_MODE', false).toString(),
      screenshots: process.env.SCREENSHOTS || 'on-failure',
      trace: process.env.TRACE || 'on-failure',
      
      // Environment
      environment: nodeEnv
    };
    
    console.log(`⚙️  Headless: ${this.config.headless}`);
    console.log(`🌐 App URL: ${this.config.appUrl}`);
    console.log(`🔧 Browser: ${this.config.browser}`);
  }

  private getBool(key: string, defaultValue: boolean): boolean {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true';
  }

  private getNumber(key: string, defaultValue: number): number {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  public get(key: keyof typeof EnvLoader.prototype.config): any {
    return this.config[key];
  }

  public getAll(): { [key: string]: string } {
    return { ...this.config };
  }
}

// Export singleton instance
export const env = EnvLoader.getInstance();