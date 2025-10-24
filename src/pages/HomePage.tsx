import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_POKEMONS, GET_POKEMONS_BY_TYPE } from '../graphql/queries'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import PokemonCard from '../components/PokemonCard'
import { getPokemonImage } from '../utils/image'

export default function HomePage() {
  const [limit, setLimit] = useState(48)
  const type = useSelector((s: RootState) => s.filters.type)
  const search = useSelector((s: RootState) => s.filters.search)
  const orderBy = useSelector((s: RootState) => s.filters.orderBy)

  const query = type === 'all' ? GET_POKEMONS : GET_POKEMONS_BY_TYPE
  const variables = type === 'all' ? { limit, offset: 0 } : { limit, offset: 0, type }

  const { data, loading, error } = useQuery(query, { variables })

  type GqlPokemon = {
    id: number
    name: string
    pokemon_v2_pokemonsprites: { sprites: string }[]
    pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[]
  }

  type ListData = { pokemon_v2_pokemon: GqlPokemon[] }

  const list = useMemo(() => {
    const api: GqlPokemon[] = (data as ListData | undefined)?.pokemon_v2_pokemon ?? []
    const mapped = api.map((p) => {
      const img = getPokemonImage(p.id, p?.pokemon_v2_pokemonsprites?.[0]?.sprites)
      const types = (p?.pokemon_v2_pokemontypes || []).map((t) => t.pokemon_v2_type?.name).filter(Boolean) as string[]
      return { id: p.id, name: p.name, image: img, types }
    })
    let out = mapped
    if (orderBy === 'name') {
      out = [...out].sort((a, b) => a.name.localeCompare(b.name))
    } else {
      out = [...out].sort((a, b) => a.id - b.id)
    }
    if (!search) return out
    const q = search.trim().toLowerCase()
    if (orderBy === 'number') {
      // Buscar por número (id). Permitimos coincidencia parcial por texto.
      return out.filter((p) => String(p.id).includes(q.replace(/[^0-9]/g, '')))
    }
    return out.filter((p) => p.name.toLowerCase().includes(q))
  }, [data, search, orderBy])

  return (
    <section className="page">
      <div className="container" style={{ width: '100%' }}>
  {/* Filtro por tipo se maneja en el botón del header (modal). */}

        {loading && <p style={{ color: 'var(--muted)' }}>Cargando…</p>}
        {error && <p style={{ color: 'crimson' }}>Error: {String(error.message || error)}</p>}

        <div className="grid">
          {list.map((p) => (
            <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} types={p.types} />
          ))}
        </div>

        <div style={{ display: 'grid', placeItems: 'center', marginTop: 16 }}>
          <button onClick={() => setLimit((v) => v + 48)}>Cargar más</button>
        </div>
      </div>
    </section>
  )
}
