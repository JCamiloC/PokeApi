import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom'
import MainLayout from '../templates/MainLayout'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
import FavoritesPage from '../pages/FavoritesPage'
import CreatePage from '../pages/CreatePage'

// Usamos HashRouter para compatibilidad con GitHub Pages (evita 404 al refrescar rutas nested)
const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="pokemon/:name" element={<DetailPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="create" element={<CreatePage />} />
    </Route>
  )
)

export default router
