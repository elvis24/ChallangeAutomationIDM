Feature: Confirmar compra

Background:
    Given el usuario ingresa a la pagina de login
    When el usuario ingresa el usuario "standard_user" y la contraseña "secret_sauce" y hace click en el boton de login
    Then el usuario deberia ver la pagina de inventario

@checkout
Scenario: Completar una compra exitosamente
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    And el usuario accede al carrito de compras
    And el usuario inicia el proceso de compra
    And el usuario completa sus datos personales con:
        | nombre   | Juan    |
        | apellido | Ronaldo |
        | codigo   | 15001   |
    And confirma la compra
    Then el usuario deberia ver el mensaje de confirmacion "Thank you for your order!"