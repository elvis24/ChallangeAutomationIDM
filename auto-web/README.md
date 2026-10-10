# Automatización web

Proyecto de pruebas automatizadas end-to-end para SauceDemo. Los escenarios están escritos en Gherkin con Cucumber y ejecutan las interacciones del navegador mediante Playwright.

## Objetivo

Validar los flujos principales de una tienda web:

- Inicio de sesión válido e inválido.
- Agregar un producto al carrito y comprobar su contador.
- Completar el checkout y comprobar el mensaje de confirmación.
- Generar un reporte Word con el resultado y una captura de pantalla por cada paso ejecutado.

## Stack

- Node.js y npm para dependencias y ejecución.
- TypeScript, cargado en tiempo de ejecución con `ts-node`.
- Cucumber.js 11 y Gherkin para los escenarios BDD.
- Playwright Test 1.61 para controlar Chromium a través de Google Chrome.
- `docx` para crear el reporte `.docx`.

## Estructura

```text
auto-web/
├── features/                    # Escenarios Gherkin
│   ├── login.feature
│   ├── carrito.feature
│   ├── confirmarCompra.feature
│   └── step-definitions/        # Implementación de Given/When/Then
├── pages/                       # Page Objects y acciones de la aplicación
├── support/
│   ├── hooks.ts                 # Navegador, capturas y reporte Word
│   └── world.ts                 # Estado de Playwright por escenario
├── reports/                     # Reportes Word generados (excluidos de Git)
├── cucumber.js                  # Configuración del runner de Cucumber
├── package.json                 # Dependencias y scripts npm
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## Requisitos previos

- Node.js y npm. Se recomienda Node.js 22 LTS o superior, ya que una dependencia transitiva de `docx` declara ese requisito. El desarrollo actual se ha probado también con Node.js 18.16, aunque npm muestra una advertencia de compatibilidad.
- Google Chrome instalado. Los hooks lo lanzan por el canal `chrome`, en modo visible y con una pausa entre acciones.
- Acceso a Internet para abrir `https://www.saucedemo.com/`.

## Instalación

Desde la raíz del repositorio, entra al proyecto y descarga las dependencias fijadas en el lockfile:

```bash
cd auto-web
npm ci
```

Si trabajas directamente desde la carpeta `auto-web`, basta con ejecutar `npm ci` allí.

## Ejecución de pruebas

Ejecutar todos los archivos `.feature`:

```bash
npm test
```

Ejecutar escenarios por etiqueta:

```bash
npx cucumber-js --tags "@loginHappy"
npx cucumber-js --tags "@loginInvalido"
npx cucumber-js --tags "@agregarCarrito"
npx cucumber-js --tags "@checkout"
```

Cucumber busca automáticamente los escenarios bajo `features/**/*.feature` y carga los hooks y step definitions configurados en `cucumber.js`. Cada escenario abre una instancia de Chrome.

## Reporte Word

Al finalizar la ejecución, el hook `AfterAll` genera un archivo con nombre único por fecha y hora:

```text
reports/reporte-<fecha-y-hora>.docx
```

El documento incluye el nombre de cada escenario, el texto y estado de cada paso y la captura de pantalla tomada después del paso. Los pasos omitidos (`SKIPPED`) se registran sin captura. Los archivos de `reports/` se conservan localmente, pero están excluidos del control de versiones.

El reporte se genera aunque uno o más escenarios fallen, siempre que Cucumber alcance el hook de cierre. Si no se ejecuta ningún escenario, no se crea un documento.

## Escenarios actuales

| Archivo | Cobertura | Etiqueta |
| --- | --- | --- |
| `features/login.feature` | Login exitoso | `@loginHappy` |
| `features/login.feature` | Login con credenciales inválidas | `@loginInvalido` |
| `features/carrito.feature` | Agregar mochila y validar el carrito | `@agregarCarrito` |
| `features/confirmarCompra.feature` | Completar una compra | `@checkout` |

## Resultado de referencia

En la última ejecución de validación de este proyecto se obtuvieron **4 escenarios: 3 aprobados y 1 fallido; 21 pasos: 20 aprobados y 1 fallido**. El escenario de login con credenciales inválidas agotó el timeout de Cucumber (5 segundos) al comprobar el mensaje de error. Los otros tres escenarios finalizaron correctamente y se generó el reporte Word correspondiente.

Este resultado es una referencia de la ejecución de validación, no un resultado garantizado para corridas posteriores. Ejecuta `npm test` para obtener el estado actual y su nuevo reporte.

## Notas de mantenimiento

- Agrega escenarios en `features/` y sus implementaciones en `features/step-definitions/`.
- Mantén las acciones y selectores de UI en los Page Objects de `pages/`.
- Los hooks y la creación del reporte están centralizados en `support/hooks.ts`.
- La comprobación global `npx tsc --noEmit` actualmente detecta imports de Page Objects cuya capitalización no coincide con los nombres de archivo en los pasos del carrito. Esto es independiente de la generación del reporte y debe corregirse para que la compilación global quede limpia.