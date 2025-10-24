## PokeApi (React + GraphQL)

[![Deploy](https://github.com/JCamiloC/PokeApi/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/JCamiloC/PokeApi/actions/workflows/gh-pages.yml)  
Demo: https://JCamiloC.github.io/PokeApi/

App en React que consume PokeAPI vía GraphQL para listar Pokémon, ver detalle, gestionar favoritos y crear Pokémon locales (mock). Incluye validación básica y tests de utilidades/estado.

### Tech
- React 19 + Vite + TypeScript
- Apollo Client (GraphQL) contra https://beta.pokeapi.co/graphql/v1beta
- Redux Toolkit (favoritos, filtros, customPokemons) con persistencia en localStorage
- React Router
- Vitest + React Testing Library

### Ejecutar

```
npm i
npm run dev
```

Build de producción y vista previa:

```
npm run build
npm run preview
```

### Estructura (simplificada)
- `src/graphql`: queries GraphQL
- `src/lib/apolloClient.ts`: cliente Apollo
- `src/store`: Redux slices y store
- `src/pages`: páginas (Home, Detail, Favorites, Create)
- `src/components`: componentes reutilizables (PokemonCard, FilterModal)
- `src/templates/MainLayout*`: layout y navegación
- `src/utils`: utilidades (validación, imagen)

### Funcionalidad
- Lista: paginada, orden configurable (nombre/número), búsqueda por nombre o número.
- Detalle: imagen, tipos, peso, altura, habilidades y estadísticas base.
- Favoritos: agregar/quitar y persistencia en localStorage.
- Crear: formulario de ejemplo con validación (nombre, números válidos).

### Validación de datos
En `src/utils/validation.ts`:
- Nombre: al menos 3 caracteres, sin caracteres especiales.
- Números: generación [1..9], altura y peso positivos.
Se usa en `CreatePage` para bloquear envíos inválidos.

### Favoritos
Slice `favoritesSlice` con `addFavorite/removeFavorite` y persistencia en localStorage. Vista en `/favorites`.

### Despliegue (GitHub Pages)
- Workflow listo en `.github/workflows/gh-pages.yml`.
- HashRouter para evitar 404 al refrescar.
- Pasos:
  1) Sube `main` al repo en GitHub.
  2) Settings → Pages → Source: “GitHub Actions”.
  3) Cada push a `main` publica la app. La URL aparece en Actions o en Settings → Pages.

### Notas y decisiones
- Apollo Client con caché por consulta/variables.
- Redux Toolkit para estado global (favoritos, filtros y customPokemons) con persistencia.
- Búsqueda y ordenamiento en cliente para mantener la UI reactiva.
- Estilos sin frameworks: CSS modular con variables y media queries.

### Aviso de uso y fuentes
- Framework: React
- API REST: https://pokeapi.co/
- GraphQL (console): https://beta.pokeapi.co/graphql/console/
Los datos y sprites pertenecen a PokeAPI y sus contribuidores. Este proyecto es de uso educativo/demostrativo.

