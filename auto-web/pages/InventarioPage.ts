import { Page, expect } from "@playwright/test";

export class InventarioPage {

  constructor(private page: Page) {}

  async addProductToCart(producto: string) {

    const product = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", {
        hasText: producto,
      }),
    });

    await product.locator("button").click();
  }

  async validateCartBadge(cantidad: string) {

    await expect(
      this.page.locator(".shopping_cart_badge")
    ).toHaveText(cantidad);

  }

  async openCart() {

    await this.page.locator(".shopping_cart_link").click();
  }

}