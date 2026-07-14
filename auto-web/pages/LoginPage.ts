import { Page, expect } from "@playwright/test";

export class LoginPage {

  constructor(private page: Page) {}

  async open() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {

    await this.page.fill('[data-test="username"]', username);

    await this.page.fill('[data-test="password"]', password);

    await this.page.click('[data-test="login-button"]');

  }

  async validateLogin() {

    await expect(this.page).toHaveURL(/inventory/);

  }

  async validateLoginError() {

  await expect(this.page.locator('[data-test="error"]'))
    .toContainText('el usuario o contraseña no coinciden con ningun usuario');
  }

}