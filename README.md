# Equipment Inventory

Aplicacion full stack para gestionar un inventario de equipos de computo.
Permite consultar, registrar, editar y eliminar equipos, incluyendo su estado,
numero de serie, fecha de adquisicion y descripcion.

## Tecnologias

- Frontend: React, Vite, TypeScript, Tailwind CSS y shadcn/ui
- Backend: NestJS, TypeScript y Prisma ORM
- Base de datos: PostgreSQL
- Documentacion de la API: Swagger
- Orquestacion: Docker Compose

## Estructura del proyecto

```text
.
├── backend/            # API NestJS y Prisma
├── frontend/           # Aplicacion React
├── docker-compose.yml  # Orquestacion de los tres servicios
├── .env.example        # Variables necesarias para Docker
└── README.md
```

## Requisitos previos

- Git
- Docker Desktop con el motor de Docker en ejecucion
- Docker Compose

Puedes comprobar la instalacion con:

```bash
docker --version
docker compose version
```

## Configuracion de variables de entorno

Copia el archivo de ejemplo de la raiz para crear tu configuracion local:

```bash
cp .env.example .env
```

En Windows PowerShell puedes usar:

```powershell
Copy-Item .env.example .env
```

El archivo `.env.example` contiene:

```env
POSTGRES_DB=equipment_inventory
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
FRONTEND_API_URL=http://localhost:3000/api
```

El archivo `.env` es local y no debe subirse al repositorio. Docker Compose utiliza
estas variables para configurar PostgreSQL, la conexion del backend y la URL de
la API consumida por el frontend.

Dentro de la red de Docker, el backend se conecta a PostgreSQL usando el servicio
`db`, no `localhost`.

## Ejecutar con Docker

Desde la raiz del repositorio, ejecuta los siguientes pasos:

### 1. Clonar el repositorio

```bash
git clone <URL_PUBLICA_DEL_REPOSITORIO>
cd prueba-tecnica
```

### 2. Crear el archivo de variables

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 3. Levantar toda la aplicacion

El comando solicitado para iniciar los servicios es:

```bash
docker-compose up
```

Si tu instalacion utiliza la sintaxis moderna de Docker Compose, usa:

```bash
docker compose up
```

Para reconstruir las imagenes antes de iniciar, ejecuta:

```bash
docker-compose up --build
```

Docker Compose levantara estos tres servicios:

1. `db`: PostgreSQL usando la imagen oficial `postgres:16-alpine`.
2. `backend`: API NestJS en el puerto `3000`.
3. `frontend`: aplicacion React/Vite en el puerto `5173`.

El backend espera a que PostgreSQL este saludable, aplica las migraciones de
Prisma y despues inicia la API.

## URLs de acceso

- Frontend: http://localhost:5173
- API: http://localhost:3000/api
- Documentacion Swagger: http://localhost:3000/docs

La ruta de Swagger es `/docs`. El prefijo global de la API es `/api`.

## Verificar los servicios

En otra terminal puedes consultar el estado de los contenedores:

```bash
docker-compose ps
```

Tambien puedes consultar los logs:

```bash
docker-compose logs -f
```

## Detener la aplicacion

Para detener los contenedores sin eliminar los datos de PostgreSQL:

```bash
docker-compose down
```

Para detenerlos y eliminar tambien el volumen de la base de datos:

```bash
docker-compose down -v
```

El segundo comando elimina los datos persistidos y debe utilizarse solo cuando se
quiera reiniciar la base de datos desde cero.

## Ejecucion local sin Docker

El backend utiliza un archivo `backend/.env` para ejecucion local directa. En ese
caso, `DATABASE_URL` puede apuntar a PostgreSQL mediante `localhost`, por ejemplo:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/equipment_inventory"
```

Esta configuracion es independiente de la conexion utilizada por Docker Compose.

## Validacion

Para validar la configuracion de Docker Compose sin iniciar los servicios:

```bash
docker-compose config
```

Para construir las imagenes y levantar la aplicacion:

```bash
docker-compose up --build
```
