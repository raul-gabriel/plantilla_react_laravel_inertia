# Plantilla Laravel + React + Inertia.js + ShadCN UI

Este repositorio es una plantilla base para iniciar proyectos utilizando **Laravel** como backend y **React + Inertia.js** en el frontend, con integración de **ShadCN UI** y algunos componentes útiles como `button` y `card`. 

Diseñado como base para proyectos de **Guimae** / **GTUP**.

---

## Requisitos

- PHP 8.1+
- Composer
- Node.js & npm
- MySQL
- Laravel CLI (`laravel`)

---


## base de datos
```sql
DROP DATABASE IF EXISTS db_turismo;
CREATE DATABASE IF NOT EXISTS db_turismo;
USE db_turismo;

/*
INSERT INTO usuarios (nombres, celular, dni, rol, correo, password, estado) VALUES 
('Administrador del Sistema', '987654321', '12345678', 'administrador', 'admin@gmail.com', SHA2('123456', 256), 'activo');
*/


drop table if exists usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    celular varchar(9),
    dni varchar(8) not null,
    rol  ENUM('administrador', 'visitante') DEFAULT 'visitante',
	correo varchar(50) not null,
    password varchar(300) not null,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);
```

## 🛠️ Instalación

### 1. Crear un nuevo proyecto

```bash
laravel new nombre-del-proyecto
```

Durante la instalación, selecciona:
```bash
Which authentication provider do you prefer?
> none
```

2. Instalar dependencias frontend
```bash
npm install
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card
npm install lucide-react
```

3. Configurar la base de datos
Edita tu archivo .env:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_basededatos
DB_USERNAME=root
DB_PASSWORD=
```




Limpia la caché de configuración:
```bash
php artisan config:clear
composer run dev
```




## 📁 Cambios Realizados en la Plantilla

Se realizaron las siguientes modificaciones en la estructura del proyecto base de Laravel + Inertia.js + React:

### 📄 Estilos

- `resources/css/app.css`  
  Se agregaron estilos personalizados globales para la plantilla.

---

### 👤 Modelo de Usuario

- `app/Models/Usuario.php`  
  Se creó un modelo personalizado `Usuario` (en lugar del modelo `User` por defecto). Puedes adaptarlo a tus necesidades según las tablas de tu base de datos.

---

### 🔐 Controladores de Autenticación

- `app/Http/Controllers/Auth/`  
  Se agregó un sistema de autenticación personalizado (login y logout) sin usar Breeze, Jetstream ni Fortify.  
  Los controladores incluyen métodos como:
  
```php
  public function index() // Muestra vista de login
  public function iniciarSesion(Request $request) // Procesa login
  public function destroy() // Logout
```


🛡️ Middleware Personalizado

app/Http/Middleware/CheckLogin.php
Middleware creado para proteger rutas que requieren autenticación manual.
Este middleware verifica si el usuario ha iniciado sesión, y si no, redirige al login.

```php
Route::middleware(CheckLogin::class)->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
```

🧭 Rutas Personalizadas
Archivo: routes/web.php
Se agregaron rutas manuales para login, logout y dashboard protegido:

Ejemplo de uso:
```php
Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'iniciarSesion']);
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

//Ruta protegida:
Route::middleware(CheckLogin::class)->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
```


crear controlador
```bash
php artisan make:controller NombreDelControlador --resource
```




