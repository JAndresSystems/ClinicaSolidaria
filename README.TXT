Proyecto: Clinica Solidaria - Plataforma de Donaciones en Blockchain
1. Introducción
Bienvenido a Clinica Solidaria. Este es un proyecto de demostración de una Aplicación Descentralizada (dApp) que permite a los usuarios realizar donaciones a una causa de forma segura y transparente utilizando la tecnología blockchain.
Este documento sirve como guía completa para configurar el entorno, desplegar los componentes necesarios y ejecutar el proyecto localmente.


2. Arquitectura del Proyecto
El proyecto está organizado como un monorepo y consta de tres partes principales que deben configurarse en orden:
/packages/contrato: El Smart Contract que contiene la lógica de negocio.
/packages/subgraph: El servicio que indexa los datos de la blockchain para consultas rápidas.
/packages/interfaz: La aplicación web con la que el usuario final interactúa.


3. Prerrequisitos de Software
Antes de comenzar, asegúrate de tener instalado lo siguiente:
Node.js: Versión 18 o superior. (Descargar)
Git: Para clonar el repositorio. (Descargar)
MetaMask: Extensión de navegador que funciona como billetera digital. (Instalar)


4. Guía de Configuración y Ejecución
Para que el proyecto funcione en tu máquina, debes desplegar tu propia versión del backend (contrato y subgraph) y configurar el frontend para que se conecte a ellos. Sigue estos pasos en orden.
Paso A: Configuración Inicial del Proyecto
Clona el Repositorio:
Abre una terminal y ejecuta:

git clone [URL_DEL_REPOSITORIO_DE_GITHUB]
cd ClinicaSolidaria

Instala todas las dependencias:
Este comando instalará todo lo necesario para las tres partes del proyecto.

npm install

Prepara tu Billetera:
Abre MetaMask y cambia la red a "Sepolia Testnet".
Consigue ETH de prueba de un Faucet si no tienes. El recomendado es: https://sepolia-faucet.pk910.de/. Necesitarás al menos 0.3 ETH para estar seguro.
Paso B: Despliegue del Smart Contract
Ahora, vamos a publicar el "cerebro" del sistema en la red de pruebas.
Configura las Claves Secretas:
Navega a la carpeta del contrato: cd packages/contrato.
Crea una copia del archivo de ejemplo: cp .env.example .env (o renómbralo manualmente).
Abre el nuevo archivo .env y rellena las variables:
PRIVATE_KEY: La clave privada de tu cuenta de MetaMask.
SEPOLIA_RPC_URL: Una URL de conexión a la red. Puedes obtenerla gratis de Infura (https://www.infura.io/).
Ejecuta el Despliegue:
Desde la terminal (aún en packages/contrato), ejecuta:

npx hardhat run scripts/desplegar.js --network sepolia
```3.  **¡Guarda los Resultados!**

La terminal mostrará una Dirección de Contrato (ej. 0xaE78...) y un Número de Bloque. Cópialos y guárdalos en un bloc de notas. Son cruciales.


Paso C: Despliegue del Subgraph (La Base de Datos)
Ahora desplegaremos el servicio que lee el historial de donaciones.
Configura el Manifiesto del Subgraph:
Abre el archivo: packages/subgraph/subgraph.yaml.
Busca la sección source: y actualiza dos campos con los datos que acabas de guardar:
address: Pega la dirección de tu contrato desplegado.
startBlock: Pega el número de bloque de despliegue.
Despliega en la Plataforma de The Graph:
Ve a The Graph Studio (https://thegraph.com/studio/), crea un nuevo subgraph y obtén tu Deploy Key.
En la terminal, navega a packages/subgraph.
Autentícate con tu clave:

graph auth --studio TU_DEPLOY_KEY

Compila y despliega tu subgraph:

graph codegen && graph deploy

Sigue las instrucciones para darle un nombre (clinicasolidaria) y una versión (ej. v0.0.1).
¡Guarda la URL de la API!
La terminal te dará una URL de Queries (HTTP). Cópiala y guárdala.


Paso D: Configuración Final del Frontend
Ahora conectaremos la página web con el backend que acabas de desplegar.
Conecta con el Contrato:
Abre el archivo: packages/interfaz/src/configuracion/contrato.ts.
Actualiza el valor de DIRECCION_CONTRATO con la dirección que obtuviste en el Paso B.3.
Conecta con la Base de Datos (Subgraph):
Abre el archivo: packages/interfaz/src/componentes/TablaHistorial.tsx.
Actualiza el valor de URL_SUBGRAPH con la URL de la API que obtuviste en el Paso C.3.
Configura la Conexión de Billeteras Móviles:
Ve a WalletConnect Cloud (Reown) (https://cloud.reown.com/), crea un proyecto y copia tu projectId.
Abre el archivo: packages/interfaz/src/app/providers.tsx.
Pega tu projectId en el campo correspondiente.
Paso E: Ejecutar la Aplicación
¡Ya está todo listo!
En la terminal, navega a la carpeta de la interfaz:

cd packages/interfaz


Inicia el servidor de desarrollo:

npm run dev


Abre tu navegador y visita http://localhost:3000.