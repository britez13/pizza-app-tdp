# pizza-app-tdp


## Requisitos para levantar el proyecto de manera local
- Node.js
- PostgresSQL

### Pasos para ejecutar de manera local
1. Clonar repositorio
2. Navegar individualmente a las carpetas `backend` y `frontend` y ejecutar `npm install` para instalar dependencias necesarias
3. Cambiar los valores relacionados a la db dentro del archivo .env dentro de la carpeta `backend`
4. Navegar a la carpeta backend y ejecutar `npm run dev` o `node index.js`, esto levantará el server de desarrollo de Node el puerto 5000
5. Ir a la carpeta frontend y ejecutar `npm run dev`, esto levantará el server de desarrollo de React en el puerto 5173

#### Stack tecnológico
- Node.js
- Postgres con Sequelize
- Express.js
- React.js
- Material UI

## Endpoints o Rutas
 (*) Solo usuarios de tipo staff
- GET /pizzas (pública con restrincciones): Lista todas las pizzas que haya, si usuario es de tipo staff ve todas las pizzas sino solo las activas
- POST /pizzas (protegida): Crea pizza *
- PUT /pizzas/:id (protegida): Actualiza una pizza dada *
- DELETE /pizzas/:id (protegida): Actualiza una pizza dada *
- GET /pizzas/:id (pública): Devuelve una pizza 

- GET /ingredientes (pública con restrincciones): Lista todos los ingredientes que haya
- POST /ingrediente (protegida): Crea ingrediente *
- PUT /ingrediente/:id (protegida): Actualiza ingredietne *
- DELETE /pizzas/:id (protegida): Elimina ingrediente *

- POST /pizza/:id/ingrediente/:id (protegida): Agrega ingrediente a una pizza * 
- DELETE /pizza/:id/ingrediente/:id (protegida): Elimina ingrediente de una pizza *

- POST /register (pública): Crea usuario
- POST /login (pública): Loguea usuario
- GET /refresh-token (pública): Envía nuevo token de acceso
