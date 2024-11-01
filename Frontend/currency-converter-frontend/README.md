# Proyecto de Consulta de Tipo de Cambio - Banco de Guatemala

Este proyecto consiste en dos aplicaciones: un **backend en Spring Boot** que consume un servicio SOAP para obtener el tipo de cambio del Banco de Guatemala, y un **frontend en Next.js** que muestra esta información al usuario.

---

## Requisitos Previos

- **Java 11** o superior
- **Node.js** (versión 14 o superior)
- **Maven** para el backend (o `mvnw` incluido en el proyecto)
- **npm** o **yarn** para el frontend
- **Base de Datos** (por ejemplo, MySQL o PostgreSQL) si deseas utilizar almacenamiento persistente para la información consultada.

---

## Pasos para Ejecutar el Proyecto en Local

### 1. Clonar el Repositorio

1. Abre una terminal o línea de comandos.
2. Clona el repositorio en tu máquina local usando el siguiente comando:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
2. Instala las dependencias:
   ```bash
    npm install

3. Configura tu base de datos PostgreSQL y actualiza el archivo .env con tus credenciales.

4. Inicia el servidor de desarrollo:

   ```bash
    npm run dev
