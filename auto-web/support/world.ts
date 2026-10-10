import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  scenarioName = "";
  stepScreenshots: Array<{
    text: string;
    status: string;
    screenshot?: Buffer;
  }> = [];

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);