Feature: sample karate test script
  for help, see: https://github.com/karatelabs/karate/wiki/IDE-Support

  Background:
    * url 'https://serverest.dev/'

  Scenario: obtener todos los usuarios
    Given path 'usuarios'
    When method get
    Then status 200

   #####################################################

  Scenario: obtener los usuarios por ID
    Given path '/usuarios/0uxuPY0cbmQhpEz1'
    When method GET
    Then  status 200


    ######################################################
  Scenario: Crear nuevo usuario
    Given path 'usuarios'
    And request
    """
    {
      "nome": "RONALDINHO",
      "email": "mundial2006@qa.com",
      "password": "teste",
      "administrador": "true"
    }
    """
    When method POST
    Then status 201

    #################################################################

  Scenario: Actualizar usuario

    * def nuevo =
    """
    {
      "nome": "Test Modificado",
      "email": "juan123@test.com",
      "password": "123456",
      "administrador": "true"
    }
    """

    Given path 'usuarios', 'lMLwmnoptFpFA8YK'
    And request nuevo
    When method PUT
    Then status 200
    And match response.message == 'Registro alterado com sucesso'

      ###########################################################

  Scenario: Crear y eliminar usuario

    Given path 'usuarios'
    And request
    """
    {
      "nome": "Juan",
      "email": "juan123w@test.com",
      "password": "123456",
      "administrador": "true"
    }
    """
    When method POST
    Then status 201

    * def id = response._id

    Given path 'usuarios', id
    When method DELETE
    Then status 200
    * print response
    And match response.message contains 'Registro excluído'

############################## CASOS NEGATIVOS ######################################

  Scenario: Consultar un usuario que no existe
    Given path 'usuarios', 'lMLwmnoptFpFA8Y9'
    When method GET
    Then status 400
    * print response.message
    And match response.message == 'Usuário não encontrado'

  Scenario: No permitir crear un usuario con email inválido

    Given path 'usuarios'
    And request
    """
    {
      "nome": "Juan",
      "email": "correo-invalido",
      "password": "123456",
      "administrador": "true"
    }
    """
    When method POST
    Then status 400


  Scenario: Eliminar un usuario inexistente

    Given path 'usuarios', 'idInexistente123'
    When method DELETE
    Then status 200
    And match response.message == 'Nenhum registro excluído'
