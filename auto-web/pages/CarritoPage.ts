import { Page, expect } from "@playwright/test";

export class CarritoPage {

  constructor(private page: Page) {}

  async validateProductInCart(producto: string) {

    await expect(
      this.page.locator(".inventory_item_name", {
        hasText: producto,
      })
    ).toBeVisible();

  }

}