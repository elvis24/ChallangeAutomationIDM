import { Page, expect } from "@playwright/test";

export class ConfirmarCompraPage {

    constructor(private page: Page) {}

    async startCheckout() {

        await this.page.locator('[data-test="checkout"]').click();

    }

    async fillInformation(nombre: string, apellido: string, codigo: string) {

        await this.page.fill('[data-test="firstName"]', nombre);

        await this.page.fill('[data-test="lastName"]', apellido);

        await this.page.fill('[data-test="postalCode"]', codigo);

        await this.page.locator('[data-test="continue"]').click();

    }

    async finishPurchase() {

        await this.page.locator('[data-test="finish"]').click();

    }

    async validatePurchase(message: string) {

        await expect(
            this.page.locator('[data-test="complete-header"]')
        ).toHaveText(message);

    }

}