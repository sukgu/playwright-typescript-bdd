import dotenv from 'dotenv';
import path from 'path';

/**
 * Configuration interface for environment settings
 */
export interface Config {
  // Browser Settings
  headless: boolean;
  browser: string;
  slowMo: number;
  
  // URLs
  appUrl: string;
  baseUrl: string;
  
  // Test Configuration
  timeout: number;
  workers: number;
  retries: number;
  
  // Features
  debugMode: boolean;
  screenshots: string;
  trace: string;
  
  // Environment
  environment: string;
}

/**
 * Environment Configuration Loader
 * Loads the appropriate .env file based on NODE_ENV
 */
export class EnvLoader {
  private static instance: EnvLoader;
  private config: Config = {} as Config;

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
    
    dotenv.config({ path: envPath, override: true });
    
    // Store processed config
    this.config = {
      // Browser Settings
      headless: this.getBool('HEADLESS', nodeEnv === 'ci' || nodeEnv === 'production'),
      browser: process.env.BROWSER || 'chromium',
      slowMo: this.getNumber('SLOW_MO', 0),
      
      // URLs
      appUrl: process.env.APP_URL || 'https://www.saucedemo.com/',
      baseUrl: process.env.BASE_URL || process.env.APP_URL || 'https://www.saucedemo.com/',
      
      // Test Configuration  
      timeout: this.getNumber('TIMEOUT', 30000),
      workers: this.getNumber('WORKERS', 1),
      retries: this.getNumber('RETRIES', 0),
      
      // Features
      debugMode: this.getBool('DEBUG_MODE', false),
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

  public get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }

  public getAll(): Config {
    return { ...this.config };
  }
}

// Export singleton instance
export const env = EnvLoader.getInstance();