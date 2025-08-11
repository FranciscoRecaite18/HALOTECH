# Documentación del Proyecto HALOTECH

## Descripción General

HALOTECH es una aplicación web desarrollada con Next.js y TypeScript. Su objetivo principal es servir como plataforma para la publicación y administración de contenido, con funcionalidades de autenticación, administración, y visualización de posts.

## Estructura de Carpetas

- **app/**: Contiene las páginas principales y subrutas de la aplicación.
  - `globals.css`: Estilos globales.
  - `layout.tsx`: Layout principal de la app.
  - `loading.tsx`: Componente de carga.
  - `page.tsx`: Página principal.
  - `sitemap.ts`: Generación de sitemap.
  - **about/**: Página de información sobre la plataforma.
  - **admin/**: Sección administrativa, incluye editor de contenido.
    - `editor/`: Editor de posts, con soporte para edición por ID.
  - **login/**: Página de autenticación (ahora usando Supabase Auth).
  - **posts/**: Visualización de posts individuales por slug.

- **components/**: Componentes reutilizables de UI.
  - Ejemplos: `category-bar.tsx`, `hero.tsx`, `post-card.tsx`, `search-bar.tsx`, `site-footer.tsx`, `site-header.tsx`, `theme-provider.tsx`.
  - **ui/**: Componentes de interfaz como `badge`, `button`, `input`, `label`, `select`.

- **lib/**: Funciones auxiliares y lógica de negocio.
  - `supabaseClient.ts`: Cliente de Supabase para autenticación y operaciones de base de datos.
  - `data.ts`: Manejo de datos de posts (migrado a Supabase con fallback a datos demo).
  - `utils.ts`: Utilidades generales para combinar clases CSS.

- **public/**: Archivos estáticos e imágenes.

- **styles/**: Archivos de estilos CSS.

## Archivos de Configuración

- `package.json`: Dependencias y scripts del proyecto.
- `tsconfig.json`: Configuración de TypeScript.
- `next.config.mjs`: Configuración de Next.js.
- `postcss.config.mjs`: Configuración de PostCSS.
- `pnpm-lock.yaml`: Bloqueo de dependencias para pnpm.

## Funcionalidades Principales

- Visualización de posts y páginas informativas.
- Autenticación de usuarios con Supabase Auth.
- Panel de administración para edición y gestión de contenido.
- Componentes UI reutilizables y personalizables.
- Soporte para rutas dinámicas (posts por slug, edición por ID).

## Requisitos

- Node.js y pnpm instalados.
- Entorno compatible con Next.js y TypeScript.

## Instalación

1. Instalar dependencias:
   ```
   pnpm install
   ```
2. Ejecutar el proyecto:
   ```
   pnpm dev
   ```

## Configuración de Supabase

1. Crea un proyecto en https://supabase.com y copia la URL y la clave pública (anon key).
2. Agrega las variables en tu archivo `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
  NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
  ```
3. Crea las siguientes tablas en tu base de datos de Supabase:

### Tabla `posts`:
```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text,
  tags text[],
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  published boolean default false
);
```

### Tabla `users` (opcional para información adicional):
```sql
create table users (
  id uuid primary key references auth.users(id),
  email text unique not null,
  name text,
  role text default 'editor'
);
```

4. El login utiliza `supabase.auth.signInWithPassword` y los posts se obtienen desde Supabase con fallback a datos demo.

## Contribución

Para contribuir, crea una rama, realiza tus cambios y envía un pull request.
