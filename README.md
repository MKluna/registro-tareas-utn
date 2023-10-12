# Gestion de Tareas

## Requisitos Previos

Asegúrate de cumplir con estos requisitos antes de comenzar:

- Node.js y npm instalados en tu sistema.
- PostgreSQL o la base de datos que prefieras configurada con las credenciales adecuadas.

## Configuración

**1. Clonar el Repositorio**
```
cd gestion-tareas-nodejs
```
**2. Instalar las Dependencias**
```
npm install
```

**3. Configurar la Base de Datos**
- Crea una base de datos en PostgreSQL.
- Configura las credenciales de la base de datos en el archivo \config/database.js\.

**4. Configurar la Clave Secreta JWT**
- En el archivo \controllers/userController.js\, establece la clave secreta JWT adecuada en la función \login\.

**5. Iniciar la Aplicación**
```
npm start
```

La aplicación debería estar disponible en \http://localhost:3000\. Asegúrate de que el puerto coincida con tu configuración.

## Uso

### Registro de Usuarios
- **Ruta**: POST /users/register

```
{
  "username": "tu-usuario",
  "password": "tu-contrasena"
}
```

### Inicio de Sesión

- **Ruta**: \POST /users/login\

Inicia sesión con tu nombre de usuario y contraseña. La ruta devolverá un token JWT que debes incluir en los encabezados de las solicitudes futuras:
```
{
  "username": "tu-usuario",
  "password": "tu-contrasena"
}
````

### Cierre de Sesión

- **Ruta**: POST /users/logout\

Cierra la sesión y elimina el token JWT.

### Gestión de Tareas

- **Ruta**: GET /tasks

Obtén una lista de tareas. Asegúrate de incluir el token JWT en el encabezado de autorización.

- **Ruta**: POST /tasks

Crea una nueva tarea enviando un cuerpo JSON con los detalles de la tarea:
```
{
  "title": "Título de la tarea",
  "description": "Descripción de la tarea",
  "completed": false
}
```

- **Ruta**: GET /tasks/:id

Obtén los detalles de una tarea específica por su ID.

- **Ruta**: \PUT /tasks/:id\

Actualiza una tarea existente. Envía un cuerpo JSON con los cambios que deseas realizar:
```
{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "completed": true
}
```

- **Ruta**: DELETE /tasks/:id

Elimina una tarea por su ID.