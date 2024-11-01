# EF-Spring-Next
# Currency Exchange Rate Application

Este proyecto consiste en una aplicación de consulta del tipo de cambio de moneda en tiempo real usando el Banco de Guatemala como fuente de datos. La aplicación se divide en dos partes: un **backend** en Java con Spring Boot y un **frontend** en JavaScript con Next.js. A continuación se describen las características principales y se detallan las instrucciones para la ejecución de cada componente.

## Tecnologías Utilizadas
- **Backend:** Java, Spring Boot, servicio SOAP, persistencia en base de datos, API REST.
- **Frontend:** JavaScript, Next.js, Tailwind CSS para estilos.
- **Comunicación:** La API REST expuesta por el backend es consumida por el frontend para obtener la información de tipo de cambio en tiempo real.

---

## Estructura del Proyecto
- **Backend (Carpeta `backend`)**  
  Esta parte del proyecto consiste en un servicio Spring Boot que consume el servicio SOAP del Banco de Guatemala para obtener el tipo de cambio de divisas en tiempo real. También incluye persistencia de datos y expone un endpoint REST para acceder a la información.

- **Frontend (Carpeta `frontend`)**  
  Esta es la interfaz gráfica de usuario, construida en Next.js. Consulta el tipo de cambio a través del backend y lo muestra al usuario. Incluye animaciones y estilos para una experiencia de usuario más agradable.

---

## Configuración e Instalación

### Requisitos Previos
- **Java Development Kit (JDK)** versión 11 o superior.
- **Node.js** versión 14 o superior.
- **Maven** para gestionar dependencias en el backend.
- **npm** o **yarn** para gestionar dependencias en el frontend.

### Clonar el Repositorio
```bash
git clone https://github.com/usuario/currency-exchange-rate.git
cd currency-exchange-rate

