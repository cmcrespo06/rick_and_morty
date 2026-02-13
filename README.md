# Rick & Morty Dashboard

Aplicación tipo dashboard de gestión de personajes del universo Rick & Morty, desarrollado como prueba técnica para **OptimaCultura** con Vue.js, Nuxt 4 y Pinia.

---

## Índice

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Scripts](#scripts)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Testing](#testing)
- [Autora](#autora)

---

## Características

### Autenticación Simulada

- Login con validación de email y contraseña
- Token simulado persistido en localStorage
- Middleware de Nuxt que protege las rutas del dashboard
- Redirección automática si no hay sesión activa

### Dashboard de Personajes

- Grid responsive con personajes de Rick & Morty
- Consumo de la API pública: `https://rickandmortyapi.com/api/character`
- Buscador con debounce de 500ms
- Paginación con botones Anterior/Siguiente
- Estados de carga con skeleton animado
- Manejo de errores con botón de recarga
- Estado vacío cuando no hay resultados

### Gestión de Favoritos

- Añadir/eliminar personajes con botón de corazón
- Vista independiente de favoritos (`/favorites`)
- Persistencia en localStorage (sobrevive recargas de página)
- Contador de favoritos en la navbar
- Modal de confirmación para limpiar todos los favoritos

---

## Stack Tecnológico

| Tecnología | Uso |
| ----------- | ----- |
| **Nuxt 4** | Framework principal (SSR/SPA) |
| **Vue 3** | Composition API |
| **Pinia** | Estado global |
| **Tailwind CSS** | Estilos utilitarios |
| **TypeScript** | Tipado estático |
| **Vitest** | Testing unitario |
| **Vue Test Utils** | Testing de componentes Vue |

---

## Arquitectura

La aplicación sigue una arquitectura por capas con separación clara de responsabilidades:

```text
┌─────────────────────────────────────────┐
│          PÁGINAS  (app/pages/)          │
│  login.vue │ index.vue │ favorites.vue  │
└───────────────────┬─────────────────────┘
                    │
┌───────────────────▼─────────────────────┐
│     COMPOSABLES (app/composables/)      │
│      useAuth.ts │ useCharacters.ts      │
└───────────────────┬─────────────────────┘
                    │
┌───────────────────▼─────────────────────┐
│          STORES  (app/stores/)          │
│         auth.ts │ favorites.ts          │
└───────────────────┬─────────────────────┘
                    │
┌───────────────────▼─────────────────────┐
│      COMPONENTES (app/components/)      │
│   ui/ │ character/ │ authentication/    │
└─────────────────────────────────────────┘
```

### Flujo de datos

```text
API Rick & Morty
      │
      ▼
useCharacters (composable)
      ├──→ characters[]  ──→ CharacterGrid ──→ CharacterCard
      ├──→ isLoading     ──→ UiLoader (skeleton)
      ├──→ error         ──→ mensaje de error + retry
      └──→ pagination    ──→ UiPagination

useFavoritesStore (pinia)
      ├──→ favorites[]   ──→ página /favorites
      ├──→ isFavorite()  ──→ botón corazón en CharacterCard
      └──→ localStorage  ──→ persistencia entre sesiones
```

---

## Instalación

### Requisitos previos

- **Node.js** v18 o superior
- **npm** v9 o superior
- **Git**

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/cmcrespo06/rick_and_morty.git

# 2. Entrar al directorio
cd rick_and_morty

# 3. Instalar dependencias Node
npm install


# 4. Instalar dependencias Nuxt y TypeScript
npx nuxi prepare

# 5. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador. Puede ser que en su terminal le indique otra ruta, en ese caso abra en su navegador la url que le ha indicado al ejecutar el último comando.

### Credenciales de prueba

> La autenticación es simulada, no requiere backend.

- **Email:** cualquier email válido (ej: `test@example.com`)
- **Contraseña:** mínimo 6 caracteres (ej: `12345678`)

---

## Variables de Entorno

Este proyecto no requiere variables de entorno. Consume la API pública de Rick and Morty y la autenticación es completamente simulada en el cliente.

---

## Scripts

```bash
# Desarrollo
npm install           # Instalar dependencias Node
npx nuxi prepare      # Preparar tipos de Nuxt
npm run dev           # Iniciar en localhost:3000

# Testing
npm run test          # Tests en modo watch (se actualiza al guardar)
npm run test:run      # Ejecuta tests una sola vez
npm run test:coverage # Tests con reporte de cobertura de código
```

---

## Estructura del Proyecto

```text
rick_and_morty/
│
├── app/                            # Código fuente principal (Nuxt 4)
│   │
│   ├── assets/
│   │   └── css/
│   │       └── styles.css          # Estilos globales + directivas Tailwind
│   │
│   ├── components/
│   │   ├── authentication/
│   │   │   └── LoginForm.vue       # Formulario con validación y show/hide password
│   │   │
│   │   ├── character/              # Componentes de dominio - personajes
│   │   │   ├── Card.vue            # Card con imagen, info, badge y botón favorito
│   │   │   ├── Grid.vue            # Grid con gestión de estados (loading/error/empty)
│   │   │   ├── Search.vue          # Buscador con debounce y contador de resultados
│   │   │   └── Empty.vue           # Pantalla vacía cuando no hay resultados
│   │   │
│   │   └── ui/                     # Componentes genéricos reutilizables
│   │       ├── Badge.vue           # Badge de estado del personaje (Alive/Dead/unknown)
│   │       ├── Button.vue          # Botón con variantes (fill/outlined/text), estilos-colores (primary/secondary/danger/base) y estado loading
│   │       ├── Input.vue           # Input con label, iconos y validación
│   │       ├── Loader.vue          # Spinner y skeleton loader animado
│   │       └── Pagination.vue      # Controles anterior/siguiente con info de página
│   │
│   ├── composables/
│   │   ├── useAuth.ts              # Lógica de autenticación, formulario y navegación
│   │   └── useCharacters.ts        # Fetch API, búsqueda con debounce y paginación
│   │
│   ├── layouts/
│   │   ├── mainlayout.vue          # Layout con navbar para el dashboard
│   │   └── emptylayout.vue         # Layout con fondo animado para el login
│   │
│   ├── middleware/
│   │   └── auth.ts                 # Protección de rutas del dashboard
│   │
│   ├── pages/
│   │   ├── favorites.vue           # Mis favoritos (/favorites)
│   │   ├── index.vue               # Grid de personajes (/)
│   │   └── login.vue               # Página de login (/login)
│   │
│   ├── stores/
│   │   ├── auth.ts                 # Estado de autenticación con Pinia
│   │   └── favorites.ts            # Estado y persistencia de favoritos con Pinia
│   │
│   ├── types-and-utils/
│   │   └── character.ts            # Interfaces TypeScript de la API de Rick & Morty
│   │   └── validators.ts           # Funciones de validación del formulario de login
│   │
│   └── app.vue                     # Componente raíz - inicializa stores
│
├── public/                         # Archivos estáticos
│   │
│   ├── icon.png                    # Icono de la aplicación
│   └── logo.png   
│
├── test/unit/                      # Test Vitest
│   │
│   ├── auth.test.ts                # Test login, logout
│   ├── favorites.test.ts           # Test añadir, eliminar y toggle de favoritos
│   └── validators.test.ts          # Test validaciones del formulario de login
│
├── .gitignore
├── nuxt.config.ts                  # Configuración de Nuxt (módulos, CSS, TypeScript)
├── package.json
├── tailwind.config.js              # Configuración de Tailwind CSS y definición de colores genéricos de la app
└── tsconfig.json                   # Configuración de TypeScript
```

---

## Decisiones Técnicas

### Nuxt 4 con carpeta `app/`

Nuxt 4 introduce la carpeta `app/` como directorio principal del código fuente, separando el código de la aplicación de los archivos de configuración en la raíz. Esto mejora la organización del proyecto.

### Composition API + Composables

La Composition API permite extraer y reutilizar lógica de forma limpia. Los composables `useAuth` y `useCharacters` encapsulan toda la lógica de negocio, dejando las páginas y componentes simples y legibles.

### Pinia sobre Vuex

Pinia es el gestor de estado oficial recomendado para Vue 3. Es más simple, tiene soporte nativo de TypeScript sin configuración adicional y elimina el boilerplate de mutations.

### Debounce en el buscador (500ms)

Para evitar una petición a la API en cada pulsación de tecla, se implementa un debounce de 500ms. Esto reduce el número de llamadas a la API y mejora la experiencia de usuario.

### Separación UI / Dominio en componentes

Los componentes `ui/` son genéricos y reutilizables en cualquier proyecto. Los componentes `character/` y `authentication/` contienen lógica específica del dominio. Esta separación facilita el mantenimiento y la escalabilidad.

### Persistencia con localStorage

Al ser una autenticación simulada sin backend, localStorage es la solución adecuada para mantener la sesión y los favoritos entre recargas. En un entorno de producción real se usarían cookies httpOnly con JWT.

---

## Testing

Los tests cubren las partes más críticas de la aplicación con **Vitest** y **Vue Test Utils**:

| Archivo | Tests | Qué prueba |
| -------- | :-----: | ----------- |
| `validators.test.ts` | 16 | Validaciones del formulario de login |
| `auth.test.ts` | 8 | Login, logout y persistencia en localStorage |
| `favorites.test.ts` | 11 | Añadir, eliminar y toggle de favoritos |

```bash
# Ejecutar todos los tests
npm run test:run
```

---

## Autora

- **Cristina María Crespo Arco**
- GitHub: [@cmcrespo06](https://github.com/cmcrespo06)
