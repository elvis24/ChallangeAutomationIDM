import { When, Then } from "@cucumber/cucumber";
import { InventarioPage } from "../../pages/inventarioPage";
import { CarritoPage } from "../../pages/carritoPage";
import { CustomWorld } from "../../support/world";

let inventory: InventarioPage;
let cart: CarritoPage;

When(
  "el usuario agrega el producto {string} al carrito",
  async function (this: CustomWorld, producto: string) {

    inventory = new InventarioPage(this.page);

    await inventory.addProductToCart(producto);

  }
);

Then(
  "el producto {string} deberia aparecer en el carrito",
  async function (this: CustomWorld, producto: string) {

    inventory = new InventarioPage(this.page);
    cart = new CarritoPage(this.page);

    await inventory.openCart();
    await cart.validateProductInCart(producto);

  }
);

Then(
  "el icono del carrito deberia mostrar {string} producto",
  async function (this: CustomWorld, cantidad: string) {

    inventory = new InventarioPage(this.page);

    await inventory.validateCartBadge(cantidad);

  }
);