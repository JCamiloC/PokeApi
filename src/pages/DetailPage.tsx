import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { GET_POKEMON_DETAIL } from '../graphql/queries'
import { getPokemonImage } from '../utils/image'
import './DetailPage.css'

export default function DetailPage() {
  const { name = '' } = useParams()
  type Poke = {
    id: number
    name: string
    height: number
    weight: number
    pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[]
    pokemon_v2_pokemonsprites: { sprites: string }[]
    pokemon_v2_pokemonspecy?: {
      generation_id?: number
      pokemon_v2_pokemonspeciesflavortexts?: { flavor_text: string }[]
    }
    pokemon_v2_pokemonstats?: { base_stat: number; pokemon_v2_stat: { name: string } }[]
    pokemon_v2_pokemonabilities?: { pokemon_v2_ability: { name: string } }[]
  }
  type DetailData = { pokemon_v2_pokemon: Poke[] }

  const { data, loading, error } = useQuery<DetailData>(GET_POKEMON_DETAIL, { variables: { name } })

  const poke = data?.pokemon_v2_pokemon?.[0]
  const image = poke ? getPokemonImage(poke.id, poke?.pokemon_v2_pokemonsprites?.[0]?.sprites) : undefined
  type PokeType = { pokemon_v2_type: { name: string } }
  const types: string[] = (poke?.pokemon_v2_pokemontypes || []).map((t: PokeType) => t.pokemon_v2_type?.name).filter(Boolean)
  // const generation = poke?.pokemon_v2_pokemonspecy?.generation_id
  const flavor = poke?.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text?.replace(/\f|\n|\r/g, ' ')
  const abilities = (poke?.pokemon_v2_pokemonabilities || []).map(a => a.pokemon_v2_ability.name)
  const stats = (poke?.pokemon_v2_pokemonstats || []).map(s => ({ name: s.pokemon_v2_stat.name, value: s.base_stat }))
  const statsOrder = ['hp','attack','defense','special-attack','special-defense','speed']
  const statsAbbr: Record<string, string> = { 'hp':'HP', 'attack':'ATK', 'defense':'DEF', 'special-attack':'SATK', 'special-defense':'SDEF', 'speed':'SPD' }
  const orderedStats = statsOrder.map(key => stats.find(s => s.name === key) || { name: key, value: 0 })
  const maxForBar = 160
  const primaryType = types[0] || 'normal'
  const padded = (id?: number) => id ? `#${String(id).padStart(3,'0')}` : ''

  if (loading) return <section className="page"><div className="container"><p style={{ color: 'var(--muted)' }}>Cargando…</p></div></section>
  if (error) return <section className="page"><div className="container"><p style={{ color: 'crimson' }}>Error: {String(error.message || error)}</p></div></section>
  if (!poke) return <section className="page"><div className="container"><p style={{ color: 'var(--muted)' }}>No encontrado.</p></div></section>

  return (
    <section className="detail">
      <div className="detail__top" style={{ background: `var(--type-${primaryType})` }}>
        <div className="detail__topbar">
          <Link to="/" className="back" aria-label="Volver">←</Link>
          <div className="number">{padded(poke.id)}</div>
        </div>
        <h1 className="detail__name">{poke.name}</h1>
        <div className="detail__imagewrap">
          {image && <img src={image} alt={poke.name} />}
        </div>
      </div>
      <div className="detail__card">
        <div className="detail__types">
          {types.map((t) => (
            <span key={t} className={`type-badge type-${t}`}>{t}</span>
          ))}
        </div>

        <h3 className="section-title" style={{ color: `var(--type-${primaryType})` }}>Descripción</h3>
        <div className="about-grid">
          <div className="about-item"><div className="label">Weight</div><div className="value">{(poke.weight/10).toFixed(1)} kg</div></div>
          <div className="about-item"><div className="label">Height</div><div className="value">{(poke.height/10).toFixed(1)} m</div></div>
          <div className="about-item"><div className="label">Habilidades</div><div className="value value--multiline">{abilities.length ? abilities.map(a => (<span key={a}>{a}</span>)) : '—'}</div></div>
        </div>
        {flavor && <p className="flavor">{flavor}</p>}

        <h3 className="section-title" style={{ color: `var(--type-${primaryType})` }}>Estadísticas Base</h3>
        <div className="stats">
          {orderedStats.map((s) => (
            <div className="statrow" key={s.name}>
              <div className="statrow__abbr">{statsAbbr[s.name]}</div>
              <div className="statrow__val">{s.value.toString().padStart(3, '0')}</div>
              <div className="statrow__bar">
                <div className="fill" style={{ width: `${Math.min(100, Math.round((s.value/maxForBar)*100))}%`, background: `var(--type-${primaryType})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
