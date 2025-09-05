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
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_basededatos
DB_USERNAME=root
DB_PASSWORD=


Limpia la caché de configuración:
```bash
php artisan config:clear
composer run dev
```

