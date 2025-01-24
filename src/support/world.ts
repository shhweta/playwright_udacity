import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { Browser, chromium, Page } from '@playwright/test';

interface UIResult {
  title: string | null;
  description: string | null;
}

interface APIResult {
  title: string | null;
  description: string | null;
}

export class World extends CucumberWorld {
  searchTerm: string;
  apiResults: APIResult[];
  uiResults: UIResult[];
  noResultsMessage: string | null;
  page!: Page;
  private browser!: Browser;

  constructor(options: any) {
    super(options);
    this.searchTerm = '';
    this.apiResults = [];
    this.uiResults = [];
    this.noResultsMessage = '';
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.page.setDefaultTimeout(30000);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(World);
