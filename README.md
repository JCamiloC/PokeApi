## Pokédex (React + GraphQL)

Aplicación React que consume la PokeAPI vía GraphQL para listar Pokémon, ver detalle, filtrar por tipo y administrar favoritos. Incluye un formulario con validación para crear Pokémon locales (mock) y tests mínimos.

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

### Hooks (mini explicación)
- `useState`: maneja estado local dentro de componentes. Ej: contador, paginación.
- `useMemo`: memoriza cálculos costosos en función de dependencias.
- `useSelector`/`useDispatch` (Redux): leen/actualizan el store global sin prop drilling.
- `useQuery` (Apollo): ejecuta una consulta GraphQL y expone `{ data, loading, error }`. Se usa para traer la lista, tipos y el detalle.

### GraphQL (mini clase)
- GraphQL te permite pedir exactamente los campos que necesitas en una sola consulta.
- Ejemplo (lista): ordenamos alfabéticamente y pedimos `id`, `name`, `types`, `sprites` y `generation_id`.
- En Apollo, definimos la consulta con `gql` y la ejecutamos con `useQuery(QUERY, { variables })`. Apollo cachea las respuestas por clave de consulta + variables.

### Validación de datos
En `src/utils/validation.ts`:
- Nombre: al menos 3 caracteres, sin caracteres especiales.
- Números: generación [1..9], altura y peso positivos.
Se usa en `CreatePage` para bloquear envíos inválidos.

### Favoritos
Slice `favoritesSlice` con `addFavorite/removeFavorite` y persistencia en localStorage. Vista en `/favorites`.

### Despliegue (GitHub Pages)
- Ya está configurado el flujo en `.github/workflows/gh-pages.yml`.
- Router: `HashRouter` para evitar 404 al refrescar en Pages.
- Pasos:
	1) Crea un repo en GitHub y haz push de `main`.
	2) En Settings → Pages, selecciona “GitHub Actions” como Source.
	3) El workflow se ejecutará en cada push a `main` y publicará la app.
	4) La URL la verás en la pestaña Actions o en Settings → Pages.

### Mockups/UX
Se siguió el estilo base del Figma referenciado (sin framework CSS). Puedes ajustar colores y spacing en los CSS.
