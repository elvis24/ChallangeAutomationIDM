Feature: Inicio de sesión

    Scenario: Login exitoso

        Given el usuario ingresa a la pagina de login
        When el usuario ingresa el usuario "standard_user" y la contraseña "secret_sauce" y hace click en el boton de login
        Then el usuario deberia ver la pagina de inventario