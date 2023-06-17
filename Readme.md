
# Sistema De Gestion De Tareas

## Descripcion
Este es proyecto es una API de tipo Rest desarrollada con JavaScript y NodeJs,
esta API cuenta con la funcionalidad de visualizar informacion breve de todas las tareas, visualizar toda la informacion de una tarea, actualizar una tarea en especifico y eliminar una tarea en especifico y todo lo relacionado a esa tarea incluyendo los comentarios de esa tarea.

Una tarea tiene lo siguiente: Titulo, Descripcion, Estatus de Completitud, Etiquetas y Comentarios. Todo eso esta separado en 3 tablas pero eso lo veremos mas adelante.

## Instalación
1. Primero verifica que tienes instalado Node y su gestor de paquetes npm junto a Git o algun sistema de control de versiones.

2. Clona este repositorio con el siguiente comando en caso de que tengas Git:
    - `git clone https://github.com/Max-500/reto-backend-gestion-tareas.git`

3. Ejecuta el siguiente comando para bajar las dependencias necesarias:
    - `npm install`

4. Ejecuta el siguiente comando para bajar las dependencias necesarias:
    - `npm run pre-start`

5. #### Ahora modifica el archivo .env que se acaba de crear y que esta a la altura de la carpeta src junto a la carpeta node_modules que contenga lo siguiente:

        PORT=<Puerto donde quieres que corra la aplicacion> (Si no le asignas valor por defecta correra en el puerto 3000) 
        DB_DATABASE=<Nombre de la base de datos> (Ya debe de estar creada la base de datos)
        DB_USER=<Usuario de tu servicio de base de datos>
        DB_PASSWORD=<Contraseña del usuario para accesar a la base de datos>
        DB_HOST=<Host donde tienes tu servicio de base de datos>
        DB_PORT=<Puerto donde tienes tu servicio de base de datos>

## Instrucciones De Uso

1. Ejecuta los siguiente comandos para correr el proyecto:
    - `npm run start`: Ejecuta este comando si quieres correrlo con node.
    - `npm run dev`: Ejecuta este comando si quieres correrlo en modo desarrollador con la dependencia de nodemon para que con cada cambio que hagas al codigo vuelva a correr en automatico.

2. Ve las colecciones de Postman que estan añadidas en la carpeta configurations que estan dentro de la carpeta ***src/configurations***.

3. Ahora con la ayuda de esas colecciones puedes empezar a probar todos los endpoints y funcionalidades de la API. Tambien podras ver el mapa entidad relacion de la base de datos para ver el como estan las relaciones de las tablas.

## Estructura Del Proyecto
Primeramente podemos ver la carpeta de node_modules, el archivo .env que se creo en el proceso de Instalación, el package.json, el package-lock.json y la carpeta src que es lo que nos importa mas por ahora.

Dentro de la carpeta src, tenemos las siguientes carpetas:

- configurations: Dentro de esta carpeta tenemos, las colecciones de Postman en formato json llamada `Gestion-Tareas.postman_collection.json`, el archivo `validationRules.js` que son las reglas de validacion para los endpoints, el archivo `rateLimiter.js` que limita cuantas peticiones puedes a hacer a la API que ahora esta configurada dentro de 5 minutos y un pdf llamado `Mapa_Entidad_Relacion_Gestion_Tareas.pdf` que contiene el mapa de entidad de relacion de la base de datos.

- controllers: Dentro de esta carpeta estan todos los archivos que contienen los controladores, el archivo `commentController.js` tiene todas las funciones para el manejo de los comentarios. El archivo `tagController.js` tiene todas las funciones para el manejo de las etiquetas y `taskController.js` tiene todas las funciones para el manejo de las tareas.

- database: Dentro de esto tenemos una carpeta llamada Models, que tiene los 3 modelos para cada tabla como se habia mencionado en la Descripcion de este Readme, tenemos a `Task.js`, `Tag.js` y `Comment.js` que cada una sera una tabla y que definen los atributos que tendran la tablas `tasks`, `tags` y `comments`.

Y ya fuera de la carpeta Models, tenemos el archivo connection.js donde hacemos uso de las variables de entorno de nuestro archivo .env que creamos en la Instalación para realizar la conexion a la base de datos. Y por ultimo tenemos el archivo `asociations.js` donde hacemos las relaciones de nuestras tablas con el uso de los modelos y al ejecutar ese archivo ya se crean las tablas con sus relaciones.

- services: Dentro de esta carpeta tenemos los archivos `commentService.js` y este se encarga a todo lo relacionado a la visualizacion, creacion, actualizacion y eliminacion de los comentarios, `taskService.js` y este se encarga a todo lo relacionado a la visualizacion, creacion, actualizacion y eliminacion de las tareas y por ultimo `tagService.js` que se encarga a todo lo relacionado a la visualizacion, creacion, actualizacion y eliminacion de los comentarios. Y cada informacion regresa a su respectivo controlador y el `taskService.js` en algunas funciones llama a distintos controladores o servicios.

- v1: Dentro de esta carpeta tenemos la carpeta routes y este tiene 2 archivos, `commentRoutes.js` y `taskRoutes.js`. Cada archivo tiene las rutas relacionada a lo suyo, sean comentarios y tareas. 

- index.js: Y que al ejecutar este archivo levanta todo la API

## Autor
Esta API fue hecha todo por su servidor, Leonardo Javier Cancino Montoya, actualmente me encuentro estudiando la carrera en Ingenieria En Software y que tambien cabe decir que soy autodidacta y amante de NodeJs y de la programacióbn. Retomando el punto inicial este proyecto fue hecho por mi cuenta.