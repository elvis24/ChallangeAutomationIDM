import { When, Then } from "@cucumber/cucumber";
import { DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";

import { InventarioPage } from "../../pages/inventarioPage";
import { ConfirmarCompraPage } from "../../pages/ConfirmarCompraPage";

let inventory: InventarioPage;
let checkout: ConfirmarCompraPage;

When("el usuario accede al carrito de compras", async function (this: CustomWorld) {

    inventory = new InventarioPage(this.page);

    await inventory.openCart();

});

When("el usuario inicia el proceso de compra", async function (this: CustomWorld) {

    checkout = new ConfirmarCompraPage(this.page);

    await checkout.startCheckout();

});

When(
    "el usuario completa sus datos personales con:",
    async function (this: CustomWorld, table: DataTable) {

        checkout = new ConfirmarCompraPage(this.page);

        const data = table.rowsHash();

        await checkout.fillInformation(
            data.nombre,
            data.apellido,
            data.codigo
        );

    }
);

When("confirma la compra", async function (this: CustomWorld) {

    checkout = new ConfirmarCompraPage(this.page);

    await checkout.finishPurchase();

});

Then(
    "el usuario deberia ver el mensaje de confirmacion {string}",
    async function (this: CustomWorld, mensaje: string) {

        checkout = new ConfirmarCompraPage(this.page);

        await checkout.validatePurchase(mensaje);

    }
);