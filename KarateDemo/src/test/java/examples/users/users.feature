Feature: sample karate test script
  for help, see: https://github.com/karatelabs/karate/wiki/IDE-Support

  Background:
    * url 'https://jsonplaceholder.typicode.com'

  Scenario: obtener todos los usuarios y luego obtener el primer usuario por id
    Given path 'users'
    When method get
    Then status 200

    * def first = response[0]

    Given path 'users', first.id
    When method get
    Then status 200

  Scenario: create a user and then get it by id
    * def user =
      """
      {
        "name": "Test User",
        "username": "testuser",
        "email": "test@user.com",
        "address": {
          "street": "Has No Name",
          "suite": "Apt. 123",
          "city": "Electri",
          "zipcode": "54321-6789"
        }
      }
      """

    Given url 'https://jsonplaceholder.typicode.com/users'
    And request user
    When method post
    Then status 201

    * def id = response.id
    * print 'created id is: ', id

    Given path id
    # When method get
    # Then status 200
    # And match response contains user


  Scenario: Crear usuario

    Given path '/users'
    And request
"""
{
 "name":"Juan",
 "email":"juan@test.com"
}
"""


    When method POST
    Then status 201
    And match response.name == "Juan"



  Scenario: Usuario no existe

    Given path '/users/99999'
    When method GET
    Then status 404


  Scenario: Actualizar usuario existente
    Given path '/users/1'
    And request
"""
{
nombre:"Carlos",
email:"carlos@test.com"
}
"""
    When method PUT
    Then status 200
    And match response.nombre =="Carlos"



  Scenario: Actualizar usuario que no existente
    Given path '/usuarios/99999'


    And request
"""
{
nombre:"Test"
}
"""


    When method PUT


    Then status 404