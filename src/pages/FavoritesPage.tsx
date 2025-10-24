import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import PokemonCard from '../components/PokemonCard'

export default function FavoritesPage() {
  const items = useSelector((s: RootState) => Object.values(s.favorites.items))

  return (
    <section className="page">
      <div className="container" style={{ width: '100%' }}>
        {!items.length ? (
          <p style={{ color: 'var(--muted)' }}>No has agregado favoritos aún.</p>
        ) : (
          <div className="grid">
            {items.map((p) => (
              <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} types={p.types} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
