import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";

Before(async function (this: CustomWorld) {

  console.log("Ejecutando Before Hook");

  this.browser = await chromium.launch({
    channel: "chrome",     // Usa Google Chrome
    headless: false,       // Muestra el navegador
    slowMo: 500            // Ejecuta paso a paso
  });

  this.context = await this.browser.newContext();

  this.page = await this.context.newPage();

  console.log(this.page);

});

After(async function (this: CustomWorld) {

  await this.browser.close();

});