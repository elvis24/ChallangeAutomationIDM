Feature: Agregar productos al carrito

Background:
    Given el usuario ingresa a la pagina de login
    When el usuario ingresa el usuario "standard_user" y la contraseña "secret_sauce" y hace click en el boton de login
    Then el usuario deberia ver la pagina de inventario

@agregarCarrito
Scenario: Agregar un producto al carrito
    When el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Then el producto "Sauce Labs Backpack" deberia aparecer en el carrito
    And el icono del carrito deberia mostrar "1" producto
        
          