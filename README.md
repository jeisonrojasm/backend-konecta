# Konecta Backend

API REST para manejar los datos de un sistema de gestión de tareas.

## 🛠️ Construido con

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker

## ✅ Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- ✅ [*Git*](https://git-scm.com/)
- ✅ [*Docker* y Docker Compose](https://www.docker.com/get-started) instalados y en ejecución

## 📥 Obtener el proyecto

Clona el repositorio:

```bash
#Clona el repositorio
git clone https://github.com/jeisonrojasm/backend-konecta.git
cd backend-konecta
```

## 🚀 Ejecutar

### 1. **Archivo `.env` requerido**

El archivo `.env` contiene variables sensibles necesarias para ejecutar el proyecto (como credenciales, tokens y URLs de servicios).
Por motivos de seguridad **no está incluido en el repositorio**.

> 🔐 **En el correo que te llegó encontrarás el archivo `.env` necesario para que la ejecución del backend funcione correctamente.**

Una vez lo tengas, colócalo en la raíz del proyecto.

### 2. Levantar el entorno de desarrollo con Docker

Basta con ejecutar el siguiente comando desde la raíz del proyecto para construir la imagen y levantar el contenedor del backend:

```bash
docker-compose up --build
```

Una vez finalizado el proceso, el backend quedará disponible en:

```arduino
http://localhost:3000
```

## 👨‍💻 Autor

Desarrollado por **Jeison Rojas** - *Desarrollador Fullstack* - [jeisonrojasm](https://github.com/jeisonrojasm)
