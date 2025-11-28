# Aplicación Full-Stack: Carrito de Compras

Esta es una aplicación web full-stack construida con React en el frontend y Spring Boot en el backend. El proyecto implementa una funcionalidad de carrito de compras.

**[ACCIÓN REQUERIDA]** *Puedes mejorar esta descripción con más detalles sobre tu proyecto.*

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Licencia](#licencia)

---

## Características

**[ACCIÓN REQUERIDA]** *Lista aquí las características más importantes de tu aplicación. Ejemplos:*
- **Visualización de Productos:** Muestra un catálogo de productos desde la base de datos.
- **Gestión de Carrito:** Permite a los usuarios agregar, ver y eliminar productos del carrito.
- **Cálculo de Total:** Calcula el precio total de los productos en el carrito.

## Tecnologías Utilizadas

Aquí se detalla el stack tecnológico del proyecto.

### Frontend

- **HTML5 / CSS3**
- **React:** Librería de JavaScript para construir la interfaz de usuario.
- **Vite:** Herramienta de construcción y servidor de desarrollo.
- **Bootstrap 5:** Para el diseño responsivo y componentes de UI.
- **Sass (SCSS):** Como preprocesador de CSS.
- **Node.js & npm:** Para la gestión de dependencias.

### Backend

- **Lenguaje:** Java 21
- **Framework:** Spring Boot 3
- **Persistencia de Datos:** Spring Data JPA / Hibernate
- **Base de Datos:** MySQL
- **Build Tool:** Maven
- **Documentación API:** SpringDoc (Swagger UI)

## Prerrequisitos

Software necesario para instalar y correr el proyecto localmente:

- **JDK (Java Development Kit):** Versión 21 o superior.
- **Node.js:** Versión 18.x o superior.
- npm (normalmente viene con Node.js)
- **MySQL:** Una instancia de base de datos en ejecución.

## Instalación

Una guía paso a paso sobre cómo poner a funcionar el proyecto localmente.

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/FullstackFinal.git
    cd FullstackFinal
    ```

2.  **Instala las dependencias del Frontend:**
    ```bash
    cd Frontend
    npm install # o yarn install
    ```

3.  **Configura el Backend:**
    - Abre el proyecto `Backend` en tu IDE de Java preferido.
    - En `src/main/resources/`, crea un archivo `application.properties`.
    - Añade la configuración de tu base de datos MySQL. Ejemplo:
      ```properties
      spring.datasource.url=jdbc:mysql://localhost:3306/nombre_tu_db
      spring.datasource.username=tu_usuario
      spring.datasource.password=tu_contraseña
      spring.jpa.hibernate.ddl-auto=update
      ```

4.  **Construye el proyecto Backend:**
    Maven descargará las dependencias automáticamente. Desde la carpeta `Backend`, puedes ejecutar:
    ```bash
    ./mvnw clean install
    ```

## Uso

Instrucciones sobre cómo iniciar la aplicación.

1.  **Iniciar el servidor del Backend:**
    ```bash
    cd Backend
    ./mvnw spring-boot:run
    ```
    El servidor se iniciará en `http://localhost:8080`.

2.  **Iniciar la aplicación del Frontend:**
    ```bash
    cd Frontend
    npm run dev
    ```
    La aplicación de React se abrirá, normalmente en `http://localhost:5173`.

Abre tu navegador y visita la URL del frontend (`http://localhost:5173`).

## API Endpoints

Gracias a SpringDoc, la documentación de la API se genera automáticamente. Una vez que el backend esté en ejecución, puedes explorarla en:

**http://localhost:8080/swagger-ui.html**

Ejemplos de endpoints comunes para una app de carrito:

| Método HTTP | Endpoint          | Descripción                        |
| :---------- | :---------------- | :--------------------------------- |
| `GET`       | `/api/products`   | Obtiene una lista de todos los productos. |
| `POST`      | `/api/cart`       | Agrega un producto al carrito.     |

## Licencia

Este proyecto no tiene una licencia especificada. Puedes agregar una fácilmente eligiendo una en choosealicense.com. La licencia MIT es una opción popular y simple.