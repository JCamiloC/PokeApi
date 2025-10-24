import { Link, Outlet, NavLink, useLocation } from 'react-router-dom'
import './MainLayout.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import { setSearch } from '../store/filtersSlice'
import { useSelector as useReduxSelector } from 'react-redux'
import { useState } from 'react'
import FilterModal from '../components/FilterModal'
import { asset } from '../utils/asset'

export default function MainLayout() {
  const location = useLocation()
  const dispatch = useDispatch()
  const search = useSelector((s: RootState) => s.filters.search)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const orderBy = useReduxSelector((s: RootState) => s.filters.orderBy)
  const isDetail = /^#?\/pokemon\//.test(location.hash || location.pathname)

  return (
    <div className="layout">
      {!isDetail && (
      <header className="header header--red">
        <div className="header__brand">
          <img src={asset('pokemonico.svg')} alt="Pokémon" className="brand__icon" />
          <Link to="/" className="brand">PokeApi</Link>
        </div>
        <nav className={`nav nav--center nav--desktop`}>
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/favorites">Favoritos</NavLink>
          <NavLink to="/create">Crear</NavLink>
        </nav>
        {/* Mobile hamburger */}
        <button className="hamburger" aria-label="Abrir menú" onClick={() => setMenuOpen(v => !v)}>
          <span />
          <span />
          <span />
        </button>
        {menuOpen && (
          <div className="menu-panel" onClick={() => setMenuOpen(false)}>
            <div className="menu-panel__content" onClick={(e) => e.stopPropagation()}>
              <NavLink to="/" end onClick={() => setMenuOpen(false)}>Inicio</NavLink>
              <NavLink to="/favorites" onClick={() => setMenuOpen(false)}>Favoritos</NavLink>
              <NavLink to="/create" onClick={() => setMenuOpen(false)}>Crear</NavLink>
            </div>
          </div>
        )}
        <div className="header__spacer" />
        <div className="header__searchrow">
          <input
            className="searchbar"
            type="search"
            placeholder={orderBy === 'name' ? 'Buscar por nombre…' : 'Buscar por número…'}
            inputMode={orderBy === 'number' ? 'numeric' : 'text'}
            pattern={orderBy === 'number' ? '[0-9]*' : undefined}
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <button className="filterbtn" type="button" aria-label="Cambiar criterio de filtro" onClick={() => setFilterOpen(true)}>
            <img src={orderBy === 'name' ? asset('name.svg') : asset('number.svg')} alt="Criterio" style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </header>
      )}
      <main className={isDetail ? 'main' : 'main main--red'}>
        {isDetail ? (
          <Outlet />
        ) : (
          <div className="container">
            <div className="panel-card">
              <Outlet />
            </div>
          </div>
        )}
      </main>
      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  )
}
