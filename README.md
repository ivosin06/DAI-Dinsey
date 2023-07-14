# TP-personajes

Este trabajo se trata de una interacción entre el usuario, películas y personajes de las mismas. Permite al usuario realizar diferentes consultas para llamar, borrar, crear y actualizar personajes y películas.

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Llamadas a la API](#llamadas-a-la-api)

## Características

- Desarrollado con Visual Studio Code.
- Utiliza Microsoft SQL Management Studio para el manejo de la base de datos.
- Hecho por Lorenzo Shammah Zalba e Ivo Singer.
- Utiliza Postman y Swagger para realizar las consultas.

## Instalación

1. Crea una carpeta en tu dispositivo donde deseas clonar el proyecto.
2. Abre la carpeta en Visual Studio Code.
3. En la terminal de Visual Studio Code, ejecuta el siguiente comando para clonar el proyecto en tu dispositivo:

   ``` bash
   git clone https://github.com/ivosin06/DAI-Dinsey.git
  ```

4. Después de clonar el proyecto, asegúrate de tener Node.js instalado en tu dispositivo.
5. En la terminal, navega hasta la carpeta del proyecto clonado.
6. Ejecuta el siguiente comando para instalar las dependencias necesarias:

  ``` bash
  npm i 
  ```

Este comando descargará y configurará las dependencias del proyecto, incluyendo la carpeta `node_modules`.

Una vez completados estos pasos, el proyecto estará listo para ser utilizado. Asegúrate de seguir las instrucciones adicionales en la sección "Uso" para ejecutar y utilizar correctamente el TP-personajes.

## Uso

Una vez instalado el proyecto, sigue los siguientes pasos:

1. Ejecuta las queries en SQL, "createandloginDisney.sql" y "Disney.sql", para crear y poblar la base de datos con los datos de los personajes y películas.

2. Una vez que la base de datos esté configurada, levanta el proyecto ejecutando el siguiente comando en la terminal:

```bash
npm run start
```

Este comando iniciará el proyecto y permitirá su acceso a través de un servidor local.

3. Antes de realizar consultas a la API, necesitarás obtener un token de acceso. Para hacerlo, utiliza una herramienta como Postman o Swagger y realiza una solicitud HTTP POST al siguiente endpoint:

```bash
http://localhost:5000/auth/login
```

Asegúrate de reemplazar `localhost:5000` con la dirección y el puerto donde se está ejecutando tu proyecto.

4. Una vez que hayas obtenido el token de acceso, inclúyelo en los encabezados de tus consultas a la API para autenticarte correctamente.

Ahora podrás realizar consultas a la API utilizando Postman, Swagger u otras herramientas similares, utilizando el token de acceso obtenido previamente.

## Llamadas a la API

Aquí se describen las diferentes llamadas a la API disponibles:

### Obtener detalles de una película por ID (GET)
GET
```bash
 http://localhost:5000/movies/1
```

Esta llamada trae todos los detalles de una película que tenga el ID igual al número al final de la consulta, incluyendo los nombres de los personajes que aparecen en ella.

### Actualizar una película (PUT)
PUT 
```bash
 http://localhost:5000/movies/2
```

Esta llamada cambia los valores de la película que tenga el ID igual al número al final de la consulta. Puedes proporcionar los nuevos valores para actualizar la película.

### Crear una película (POST)
POST 
```bash
 http://localhost:5000/movies
```

Esta llamada crea una nueva película con los valores que desees proporcionar.

### Borrar una película (DELETE)

DELETE 
```bash
 http://localhost:5000/movies/3
```
Esta llamada borra de la base de datos la película que tenga el ID igual al número al final de la consulta.

### Obtener películas (GET)
GET 
```bash
 http://localhost:5000/movies/?orden=DESC&nombre=Rio%20mistico
```

Esta llamada trae todas las películas de la base de datos. Puedes filtrar las películas por nombre y ordenarlas en forma ascendente o descendente.

### Obtener detalles de un personaje por ID (GET)






   
