Requisitos previos

Antes de ejecutar el proyecto instalar:

Java

Validar instalación:

java -version

Versión recomendada:

Java 17 o superior

*Instalación del proyecto*

Clonar el repositorio:

git clone <repository-url>

Ingresar al proyecto:

cd karate-api-users-framework

Instalar dependencias:

mvn clean install



Casos automatizados
GET /usuarios
Caso positivo

Validaciones:

Código HTTP 200
Respuesta tipo array
Validación estructura JSON

Ejemplo:

Scenario: Listar usuarios correctamente

Given path '/users'

When method GET

Then status 200