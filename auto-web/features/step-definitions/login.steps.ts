import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/LoginPage";
import { CustomWorld } from "../../support/world";

let login: LoginPage;

Given("el usuario ingresa a la pagina de login", async function (this: CustomWorld) {
console.log("Page:", this.page);
  login = new LoginPage(this.page);
  await login.open();
});

When(
  "el usuario ingresa el usuario {string} y la contraseña {string} y hace click en el boton de login",
  async function (this: CustomWorld, username: string, password: string) {
    await login.login(username, password);
  }
);

Then("el usuario deberia ver la pagina de inventario", async function () {
  await login.validateLogin();
});

// unHappy login
Then("el usuario deberia ver un mensaje de error de login", async function (this: CustomWorld) {
  await login.validateLoginError();
});