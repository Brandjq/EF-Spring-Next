# Proyecto de Backend para Consulta de Tipo de Cambio - Banco de Guatemala

Este proyecto es un servicio backend en Spring Boot que consume el tipo de cambio de moneda del Banco de Guatemala a través de un servicio SOAP, y expone la información en un endpoint REST.

---

## Requisitos Previos

- **Java 11** o superior
- **Maven** para la administración de dependencias (o `mvnw` incluido en el proyecto para no instalar Maven globalmente)
- **Base de Datos** (por ejemplo, MySQL o PostgreSQL) si deseas utilizar almacenamiento persistente para la información consultada.

## Pasos para Ejecutar el Proyecto en Local

### 1. Clonar y Ejecutar el Proyecto

1. Abre una terminal o línea de comandos.
2. Clona el repositorio en tu máquina local usando el siguiente comando:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ./mvnw spring-boot:run

