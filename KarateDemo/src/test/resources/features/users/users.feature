Feature: Validar servicio usuarios


  Background:

    * url baseUrl


  Scenario: Obtener usuario correctamente
    Given path '/users/1'

    When method GET

    Then status 200

    And match response.id == 1

    And match response.name == '#string'

