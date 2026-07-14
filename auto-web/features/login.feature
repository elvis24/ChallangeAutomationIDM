Feature: Inicio de sesión

    @loginHappy
    Scenario: Login exitoso
        Given el usuario ingresa a la pagina de login
        When el usuario ingresa el usuario "<usuario>" y la contraseña "<password>" y hace click en el boton de login
        Then el usuario deberia ver la pagina de inventario

        Examples:
        | usuario                | password     |
        | standard_user          | secret_sauce |


    @loginInvalido
    Scenario: Login con credenciales invalidas
        Given el usuario ingresa a la pagina de login
        When el usuario ingresa el usuario "<usuario>" y la contraseña "<password>" y hace click en el boton de login
        Then el usuario deberia ver un mensaje de error de login

         Examples:
        | usuario                | password     |
        | standard_user          | clave_incorrecta |  
